export function DataThread() {
  const nodes = [
    { label: "ingest", left: "7%", top: "65%" },
    { label: "model", left: "31%", top: "30%" },
    { label: "serve", left: "62%", top: "58%" },
    { label: "ship", left: "88%", top: "22%" },
  ];

  return (
    <div className="data-thread" aria-label="A data thread from ingest to shipped product">
      <svg viewBox="0 0 1000 270" role="img" aria-hidden="true" preserveAspectRatio="none">
        <path d="M20 192 C150 190 215 80 350 86 S540 200 670 158 S835 54 980 68" />
      </svg>
      {nodes.map((node, index) => (
        <span className="thread-node" key={node.label} style={{ left: node.left, top: node.top }}>
          <i aria-hidden="true" />
          <span>{String(index + 1).padStart(2, "0")} · {node.label}</span>
        </span>
      ))}
    </div>
  );
}
