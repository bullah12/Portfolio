"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  connectedNodeIds,
  graphNodes,
  graphRelationships,
  nodeById,
  relationshipsFor,
  sectors,
  type GraphNode,
  type GraphRelationship,
} from "./graph-data";

const WORLD_WIDTH = 1900;
const WORLD_HEIGHT = 1090;
const MIN_SCALE = 0.36;
const MAX_SCALE = 1.45;

type ViewTransform = { x: number; y: number; scale: number };
type PointerPosition = { x: number; y: number };

function relatedNodes(nodeId: string) {
  return relationshipsFor(nodeId)
    .map((relationship) => nodeById.get(relationship.source === nodeId ? relationship.target : relationship.source))
    .filter((node): node is GraphNode => Boolean(node));
}

function accessibleNodeLabel(node: GraphNode) {
  const related = relatedNodes(node.id);
  if (node.type === "technology") {
    const connectedSectors = related.filter((item) => item.type === "sector").map((item) => item.title);
    return `${node.title} technology${connectedSectors.length ? `, connected to the ${connectedSectors.join(" and ")} sector${connectedSectors.length > 1 ? "s" : ""}` : ""}.`;
  }
  if (node.type === "sector") {
    const technologies = related.filter((item) => item.type === "technology").length;
    const work = related.filter((item) => item.type === "work").length;
    return `${node.title} sector, ${node.scale}, connected to ${technologies} technologies and ${work} work snippets.`;
  }
  const sector = related.find((item) => item.type === "sector");
  return `${node.title} work snippet${sector ? `, delivered in the ${sector.title} sector` : ""}.`;
}

function edgePath(relationship: GraphRelationship) {
  const source = nodeById.get(relationship.source);
  const target = nodeById.get(relationship.target);
  if (!source || !target) return "";
  if (relationship.type === "related-to") {
    const bend = Math.min(source.y, target.y) - 42;
    return `M ${source.x} ${source.y} C ${source.x} ${bend}, ${target.x} ${bend}, ${target.x} ${target.y}`;
  }
  const midpoint = (source.y + target.y) / 2;
  return `M ${source.x} ${source.y} C ${source.x} ${midpoint}, ${target.x} ${midpoint}, ${target.x} ${target.y}`;
}

function Logo({ node }: { node: GraphNode }) {
  const [failed, setFailed] = useState(false);
  if (!node.logo || failed) return <span className="graph-node-symbol" aria-hidden="true">{node.symbol ?? node.title.slice(0, 2).toUpperCase()}</span>;
  return (
    <span className="graph-node-logo">
      {/* Technology names remain visible, so the mark is supplementary. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={node.logo.src} alt={node.logo.alt} draggable={false} onError={() => setFailed(true)} />
    </span>
  );
}

export function ExploreGraph() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const pointersRef = useRef(new Map<number, PointerPosition>());
  const gestureRef = useRef<{ centroid: PointerPosition; distance: number } | null>(null);
  const movedRef = useRef(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [view, setView] = useState<ViewTransform>({ x: 24, y: 24, scale: 0.58 });

  const selectedNode = selectedId ? nodeById.get(selectedId) ?? null : null;
  const connectedIds = useMemo(() => selectedId ? connectedNodeIds(selectedId) : new Set<string>(), [selectedId]);

  const updateUrl = useCallback((nodeId: string | null) => {
    const url = new URL(window.location.href);
    if (nodeId) url.searchParams.set("node", nodeId);
    else url.searchParams.delete("node");
    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`);
  }, []);

  const selectNode = useCallback((nodeId: string | null) => {
    setSelectedId(nodeId);
    updateUrl(nodeId);
  }, [updateUrl]);

  const resetView = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const scale = Math.min((viewport.clientWidth - 48) / WORLD_WIDTH, (viewport.clientHeight - 48) / WORLD_HEIGHT, 1);
    setView({
      x: (viewport.clientWidth - WORLD_WIDTH * scale) / 2,
      y: (viewport.clientHeight - WORLD_HEIGHT * scale) / 2,
      scale,
    });
  }, []);

  useEffect(() => {
    resetView();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(resetView);
    observer.observe(viewport);
    return () => observer.disconnect();
  }, [resetView]);

  useEffect(() => {
    const readDeepLink = () => {
      const nodeId = new URL(window.location.href).searchParams.get("node");
      setSelectedId(nodeId && nodeById.has(nodeId) ? nodeId : null);
    };
    readDeepLink();
    window.addEventListener("popstate", readDeepLink);
    return () => window.removeEventListener("popstate", readDeepLink);
  }, []);

  function zoomAt(factor: number, origin?: PointerPosition) {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const point = origin ?? { x: viewport.clientWidth / 2, y: viewport.clientHeight / 2 };
    setView((current) => {
      const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, current.scale * factor));
      return {
        scale,
        x: point.x - ((point.x - current.x) / current.scale) * scale,
        y: point.y - ((point.y - current.y) / current.scale) * scale,
      };
    });
  }

  function pointerCentroid() {
    const points = [...pointersRef.current.values()];
    return {
      x: points.reduce((total, point) => total + point.x, 0) / points.length,
      y: points.reduce((total, point) => total + point.y, 0) / points.length,
    };
  }

  function pointerDistance() {
    const points = [...pointersRef.current.values()];
    return points.length < 2 ? 0 : Math.hypot(points[0].x - points[1].x, points[0].y - points[1].y);
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (event.button !== 0 && event.pointerType === "mouse") return;
    event.currentTarget.setPointerCapture(event.pointerId);
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    gestureRef.current = { centroid: pointerCentroid(), distance: pointerDistance() };
    movedRef.current = false;
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (!pointersRef.current.has(event.pointerId) || !gestureRef.current) return;
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY });
    const centroid = pointerCentroid();
    const distance = pointerDistance();
    const previous = gestureRef.current;
    const dx = centroid.x - previous.centroid.x;
    const dy = centroid.y - previous.centroid.y;
    if (Math.abs(dx) + Math.abs(dy) > 1 || Math.abs(distance - previous.distance) > 1) movedRef.current = true;

    setView((current) => {
      if (pointersRef.current.size > 1 && previous.distance > 0 && distance > 0) {
        const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, current.scale * (distance / previous.distance)));
        return {
          scale,
          x: centroid.x - ((previous.centroid.x - current.x) / current.scale) * scale,
          y: centroid.y - ((previous.centroid.y - current.y) / current.scale) * scale,
        };
      }
      return { ...current, x: current.x + dx, y: current.y + dy };
    });
    gestureRef.current = { centroid, distance };
  }

  function handlePointerEnd(event: React.PointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(event.pointerId);
    gestureRef.current = pointersRef.current.size ? { centroid: pointerCentroid(), distance: pointerDistance() } : null;
  }

  const selectedRelationships = selectedNode ? relationshipsFor(selectedNode.id) : [];
  const selectedRelatedNodes = selectedNode ? relatedNodes(selectedNode.id) : [];
  const selectedTechnologies = selectedRelatedNodes.filter((node) => node.type === "technology");
  const selectedWork = selectedRelatedNodes.filter((node) => node.type === "work");

  return (
    <>
      <div className={`explore-workspace${selectedNode ? " has-selection" : ""}`}>
        <div className="workspace-toolbar" aria-label="Graph controls">
          <div>
            <span className="workspace-live" aria-hidden="true" />
            <span>knowledge_graph.live</span>
          </div>
          <div className="graph-controls">
            <button type="button" onClick={() => zoomAt(1.18)} aria-label="Zoom in">+</button>
            <button type="button" onClick={() => zoomAt(0.84)} aria-label="Zoom out">−</button>
            <button type="button" onClick={resetView}>Reset view</button>
          </div>
        </div>

        <div className="workspace-body">
          <div
            className="graph-viewport"
            ref={viewportRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerEnd}
            onPointerCancel={handlePointerEnd}
            onClick={() => { if (!movedRef.current) selectNode(null); }}
            onWheel={(event) => {
              event.preventDefault();
              const rect = event.currentTarget.getBoundingClientRect();
              zoomAt(event.deltaY < 0 ? 1.1 : 0.9, { x: event.clientX - rect.left, y: event.clientY - rect.top });
            }}
            aria-label="Interactive knowledge graph. Drag to pan, use the controls or mouse wheel to zoom, and select a node for details."
          >
            <div
              className="graph-world"
              style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT, transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})` }}
            >
              <div className="graph-zone graph-zone-technologies" aria-hidden="true"><span>01 / technologies</span></div>
              <div className="graph-zone graph-zone-sectors" aria-hidden="true"><span>02 / anonymised sectors</span></div>
              <div className="graph-zone graph-zone-work" aria-hidden="true"><span>03 / delivered work</span></div>
              <svg className="graph-edges" viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`} aria-hidden="true">
                {graphRelationships.map((relationship) => {
                  const isActive = selectedId === relationship.source || selectedId === relationship.target;
                  return (
                    <path
                      className={`graph-edge edge-${relationship.type}${selectedId ? isActive ? " is-active" : " is-dimmed" : ""}`}
                      d={edgePath(relationship)}
                      key={`${relationship.source}-${relationship.target}-${relationship.type}`}
                    />
                  );
                })}
              </svg>

              {graphNodes.map((node) => {
                const isSelected = selectedId === node.id;
                const isConnected = connectedIds.has(node.id);
                const isDimmed = Boolean(selectedId && !isConnected);
                return (
                  <button
                    type="button"
                    key={node.id}
                    className={`graph-node node-${node.type}${isSelected ? " is-selected" : ""}${isConnected && !isSelected ? " is-connected" : ""}${isDimmed ? " is-dimmed" : ""}`}
                    style={{ left: node.x, top: node.y }}
                    aria-label={accessibleNodeLabel(node)}
                    aria-pressed={isSelected}
                    onPointerDown={(event) => event.stopPropagation()}
                    onClick={(event) => { event.stopPropagation(); selectNode(node.id); }}
                  >
                    <span className="node-type-label">{node.type === "work" ? "work" : node.type}</span>
                    {node.type === "technology" ? <Logo node={node} /> : null}
                    <strong>{node.shortLabel ?? node.title}</strong>
                    {node.type === "sector" ? (
                      <>
                        <span className="sector-support">{node.supportingLabel}</span>
                        <span className="sector-scale">{node.scale}</span>
                      </>
                    ) : null}
                  </button>
                );
              })}
            </div>
            <p className="graph-hint">drag to pan · scroll or pinch to zoom · select a node</p>
          </div>

          <div className="mobile-relationship-view" aria-label="Structured relationship view">
            {sectors.map((sector) => {
              const relationships = relationshipsFor(sector.id);
              const technologies = relationships
                .filter((relationship) => relationship.type === "used-within")
                .map((relationship) => nodeById.get(relationship.source))
                .filter((node): node is GraphNode => Boolean(node));
              const work = relationships
                .filter((relationship) => relationship.type === "delivered")
                .map((relationship) => nodeById.get(relationship.target))
                .filter((node): node is GraphNode => Boolean(node));
              return (
                <section className="mobile-sector-card" key={sector.id}>
                  <button type="button" className="mobile-sector-heading" onClick={() => selectNode(sector.id)}>
                    <span>sector</span><strong>{sector.title}</strong><small>{sector.supportingLabel} · {sector.scale}</small>
                  </button>
                  <div className="mobile-tech-list" aria-label={`${sector.title} technologies`}>
                    {technologies.map((technology) => <button type="button" key={technology.id} onClick={() => selectNode(technology.id)}>{technology.title}</button>)}
                  </div>
                  <div className="mobile-work-list">
                    {work.map((item) => <button type="button" key={item.id} onClick={() => selectNode(item.id)}><span aria-hidden="true">↳</span>{item.description}</button>)}
                  </div>
                </section>
              );
            })}
          </div>

          <aside className={`graph-details${selectedNode ? " is-open" : ""}`} aria-live="polite" aria-label="Selected node details">
            {selectedNode ? (
              <>
                <div className="details-heading">
                  <div><span>{selectedNode.type === "work" ? "work snippet" : selectedNode.type}</span><h2>{selectedNode.title}</h2></div>
                  <button type="button" aria-label="Close details" onClick={() => selectNode(null)}>×</button>
                </div>
                {selectedNode.type === "sector" ? <p className="details-scale">{selectedNode.supportingLabel}<br />{selectedNode.scale}</p> : null}
                <p>{selectedNode.description}</p>
                <div className="relationship-count"><span>{String(selectedRelationships.length).padStart(2, "0")}</span> direct relationships</div>

                {selectedTechnologies.length ? (
                  <section className="details-section" aria-labelledby="details-technologies">
                    <h3 id="details-technologies">Technologies used</h3>
                    <div className="details-tags">
                      {selectedTechnologies.map((technology) => <button type="button" key={technology.id} onClick={() => selectNode(technology.id)}>{technology.title}</button>)}
                    </div>
                  </section>
                ) : null}

                {selectedWork.length ? (
                  <section className="details-section" aria-labelledby="details-work">
                    <h3 id="details-work">Work delivered</h3>
                    <ul>{selectedWork.map((item) => <li key={item.id}><button type="button" onClick={() => selectNode(item.id)}>{item.description}</button></li>)}</ul>
                  </section>
                ) : null}

                {!selectedTechnologies.length && !selectedWork.length && selectedRelatedNodes.length ? (
                  <section className="details-section" aria-labelledby="details-relationships">
                    <h3 id="details-relationships">Relationships</h3>
                    <ul>
                      {selectedRelationships.map((relationship) => {
                        const related = nodeById.get(relationship.source === selectedNode.id ? relationship.target : relationship.source);
                        if (!related) return null;
                        const relation = relationship.type === "used-within" ? "used within" : relationship.type === "delivered" ? "delivered" : "works with";
                        return <li key={`${relationship.source}-${relationship.target}`}><button type="button" onClick={() => selectNode(related.id)}>{relation}: {related.title}</button></li>;
                      })}
                    </ul>
                  </section>
                ) : null}
              </>
            ) : (
              <div className="details-empty">
                <span aria-hidden="true">◎</span>
                <h2>Trace a connection</h2>
                <p>Select a technology, sector or work snippet to inspect the delivery relationships behind it.</p>
              </div>
            )}
          </aside>
        </div>
      </div>

      <section className="sr-only" aria-labelledby="relationship-summary-title">
        <h2 id="relationship-summary-title">Text relationship summary</h2>
        {sectors.map((sector) => {
          const relationships = relationshipsFor(sector.id);
          const technologyNames = relationships.filter((item) => item.type === "used-within").map((item) => nodeById.get(item.source)?.title).filter(Boolean);
          const workDescriptions = relationships.filter((item) => item.type === "delivered").map((item) => nodeById.get(item.target)?.description).filter(Boolean);
          return <section key={sector.id}><h3>{sector.title}</h3><p>{sector.supportingLabel}. {sector.scale}. Technologies used: {technologyNames.join(", ")}.</p><ul>{workDescriptions.map((description) => <li key={description}>{description}</li>)}</ul></section>;
        })}
      </section>
    </>
  );
}
