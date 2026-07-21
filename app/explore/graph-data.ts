export type GraphNodeType = "technology" | "sector" | "work";
export type RelationshipType = "used-within" | "delivered" | "related-to";

export type GraphNode = {
  id: string;
  type: GraphNodeType;
  title: string;
  description: string;
  x: number;
  y: number;
  shortLabel?: string;
  supportingLabel?: string;
  scale?: string;
  logo?: { src: string; alt: string };
  symbol?: string;
};

export type GraphRelationship = {
  source: string;
  target: string;
  type: RelationshipType;
};

const technologyNodes: GraphNode[] = [
  { id: "databricks", type: "technology", title: "Databricks", description: "Lakehouse platform used to build governed data products and production pipelines.", x: 90, y: 86, logo: { src: "/tech/databricks.svg", alt: "Databricks mark" } },
  { id: "data-pipelines", type: "technology", title: "Data Pipelines", description: "Resilient, observable ingestion and transformation workflows.", x: 305, y: 86, symbol: "→" },
  { id: "databricks-asset-bundles", type: "technology", title: "Databricks Asset Bundles", shortLabel: "Asset Bundles", description: "Repeatable, environment-aware deployment packaging for Databricks resources.", x: 520, y: 86, symbol: "DAB" },
  { id: "databricks-labs-dqx", type: "technology", title: "Databricks Labs DQX", shortLabel: "Labs DQX", description: "Reusable data-quality checks integrated into enterprise pipelines.", x: 735, y: 86, symbol: "DQX" },
  { id: "delta-lake", type: "technology", title: "Delta Lake", description: "Reliable lakehouse storage patterns for production ingestion and medallion layers.", x: 950, y: 86, logo: { src: "/tech/delta-lake.svg", alt: "Delta Lake mark" } },
  { id: "azure-data-factory", type: "technology", title: "Azure Data Factory", shortLabel: "Azure Data Factory", description: "Orchestrated validation and ingestion workflows on Azure.", x: 1165, y: 86, symbol: "ADF" },
  { id: "snowflake", type: "technology", title: "Snowflake", description: "Cloud data platform used for matching, enrichment and scalable batch processing.", x: 1380, y: 86, logo: { src: "/tech/snowflake.svg", alt: "Snowflake mark" } },
  { id: "dbt", type: "technology", title: "dbt", description: "Version-controlled transformations, models and quality-control gates.", x: 1595, y: 86, logo: { src: "/tech/dbt.svg", alt: "dbt mark" } },
  { id: "mlflow", type: "technology", title: "MLflow", description: "Experiment tracking and model registration for explainable machine-learning work.", x: 1810, y: 86, logo: { src: "/tech/mlflow.svg", alt: "MLflow mark" } },
  { id: "data-quality", type: "technology", title: "Data Quality", description: "Standards, checks and gates that make delivery dependable.", x: 90, y: 274, symbol: "✓" },
  { id: "medallion-architecture", type: "technology", title: "Medallion Architecture", shortLabel: "Medallion", description: "Layered bronze, silver and gold data-product architecture.", x: 305, y: 274, symbol: "B/S/G" },
  { id: "ci-cd", type: "technology", title: "CI/CD", description: "Automated validation and repeatable deployment workflows.", x: 520, y: 274, symbol: "CI" },
  { id: "entity-resolution", type: "technology", title: "Entity Resolution", description: "Explainable candidate generation, matching and enrichment.", x: 735, y: 274, symbol: "ER" },
  { id: "batch-processing", type: "technology", title: "Batch Processing", description: "Repeatable, scalable processing driven by orchestrated task graphs.", x: 950, y: 274, symbol: "∑" },
  { id: "azure", type: "technology", title: "Microsoft Azure", shortLabel: "Azure", description: "Cloud platform for secure data-engineering workloads and orchestration.", x: 1165, y: 274, logo: { src: "/tech/microsoft-azure.svg", alt: "Microsoft Azure mark" } },
  { id: "machine-learning", type: "technology", title: "Machine Learning", description: "Explainable modelling, embeddings and clustering for operational use cases.", x: 1380, y: 274, symbol: "ML" },
  { id: "cortex-search", type: "technology", title: "Cortex Search", description: "Snowflake-native retrieval used for matching candidate generation.", x: 1595, y: 274, symbol: "CS" },
];

const sectorNodes: GraphNode[] = [
  {
    id: "energy-network",
    type: "sector",
    title: "Energy infrastructure",
    supportingLabel: "Large UK electricity network operator",
    scale: "Large enterprise / regulated network operator",
    description: "Modernised a regulated energy data platform with production-grade lakehouse ingestion and repeatable deployment patterns.",
    x: 330,
    y: 520,
  },
  {
    id: "international-airline",
    type: "sector",
    title: "Aviation",
    supportingLabel: "Major international airline",
    scale: "Large enterprise",
    description: "Delivered explainable optimisation, resilient ingestion, quality standards and maintainable medallion-layer engineering.",
    x: 975,
    y: 520,
  },
  {
    id: "business-data-platform",
    type: "sector",
    title: "Business data and identity",
    supportingLabel: "Growth-stage business data platform",
    scale: "Growth-stage technology company",
    description: "Led an explainable matching and enrichment solution with scalable Snowflake processing and dbt quality controls.",
    x: 1620,
    y: 520,
  },
];

const workNodes: GraphNode[] = [
  { id: "energy-platform-migration", type: "work", title: "Platform migration", description: "Migrated a legacy electricity-distribution data platform to Azure Databricks.", x: 90, y: 790 },
  { id: "energy-production-ingestion", type: "work", title: "Production ingestion", description: "Delivered two production ingestion pipelines and developed two more through production testing.", x: 270, y: 790 },
  { id: "energy-reusable-notebooks", type: "work", title: "Reusable notebooks", description: "Built parameterised notebooks with environment-aware configuration and managed secrets.", x: 450, y: 790 },
  { id: "energy-delta-practices", type: "work", title: "Delta practices", description: "Applied Delta Lake practices to production data ingestion.", x: 90, y: 980 },
  { id: "energy-repeatable-deployments", type: "work", title: "Repeatable deployments", description: "Used Databricks Asset Bundles for maintainable and repeatable deployments.", x: 270, y: 980 },
  { id: "energy-technical-leadership", type: "work", title: "Technical leadership", description: "Worked as deputy technical lead and collaborated directly with sector stakeholders.", x: 450, y: 980 },

  { id: "aviation-fuel-optimisation", type: "work", title: "Fuel optimisation", description: "Built an explainable arrival-delay fuel-optimisation solution.", x: 670, y: 790 },
  { id: "aviation-medallion-layers", type: "work", title: "Medallion layers", description: "Developed silver and gold medallion layers in Databricks.", x: 850, y: 790 },
  { id: "aviation-hurdle-model", type: "work", title: "Registered hurdle model", description: "Trained and registered a hurdle model using MLflow.", x: 1030, y: 790 },
  { id: "aviation-resilient-ingestion", type: "work", title: "Resilient ingestion", description: "Built resilient weather and aviation-data ingestion pipelines.", x: 1210, y: 790 },
  { id: "aviation-dqx-integration", type: "work", title: "DQX integration", description: "Led the integration of Databricks Labs DQX into enterprise pipelines.", x: 670, y: 980 },
  { id: "aviation-quality-standards", type: "work", title: "Quality standards", description: "Designed reusable Silver Layer and data-quality standards.", x: 850, y: 980 },
  { id: "aviation-adf-validation", type: "work", title: "ADF validation", description: "Built Azure Data Factory validation workflows with CI/CD.", x: 1030, y: 980 },
  { id: "aviation-maintenance-analytics", type: "work", title: "Maintenance analytics", description: "Delivered aircraft-maintenance ingestion, embeddings, clustering and analytics.", x: 1210, y: 980 },

  { id: "identity-cortex-search", type: "work", title: "Search matching", description: "Led a Snowflake Cortex Search matching and enrichment solution.", x: 1420, y: 790 },
  { id: "identity-explainable-scoring", type: "work", title: "Explainable scoring", description: "Generated matching candidates and designed an explainable scoring process.", x: 1600, y: 790 },
  { id: "identity-task-graphs", type: "work", title: "Snowflake task graphs", description: "Built scalable Snowflake task graphs for repeatable batch processing.", x: 1780, y: 790 },
  { id: "identity-dbt-quality", type: "work", title: "dbt quality gates", description: "Created dbt models and quality-control gates.", x: 1420, y: 980 },
  { id: "identity-cost-optimisation", type: "work", title: "Cost optimisation", description: "Improved performance and cost through warehouse and query optimisation.", x: 1600, y: 980 },
  { id: "identity-controlled-extract", type: "work", title: "Controlled extract", description: "Delivered a quality-controlled client extract.", x: 1780, y: 980 },
];

const sectorTechnologyLinks: Record<string, string[]> = {
  "energy-network": ["databricks", "data-pipelines", "databricks-asset-bundles", "delta-lake", "ci-cd", "azure"],
  "international-airline": ["databricks", "data-pipelines", "databricks-labs-dqx", "data-quality", "mlflow", "medallion-architecture", "azure-data-factory", "ci-cd", "machine-learning"],
  "business-data-platform": ["snowflake", "dbt", "data-pipelines", "data-quality", "entity-resolution", "batch-processing", "cortex-search"],
};

const relatedTechnologyPairs: Array<[string, string]> = [
  ["databricks", "delta-lake"],
  ["databricks-asset-bundles", "ci-cd"],
  ["databricks-labs-dqx", "data-quality"],
  ["azure", "azure-data-factory"],
  ["mlflow", "machine-learning"],
  ["snowflake", "dbt"],
  ["entity-resolution", "cortex-search"],
  ["data-pipelines", "batch-processing"],
];

const workLinks = workNodes.map((node) => ({
  source: node.x < 600 ? "energy-network" : node.x < 1350 ? "international-airline" : "business-data-platform",
  target: node.id,
  type: "delivered" as const,
}));

export const graphNodes = [...technologyNodes, ...sectorNodes, ...workNodes];

export const graphRelationships: GraphRelationship[] = [
  ...Object.entries(sectorTechnologyLinks).flatMap(([sectorId, technologyIds]) =>
    technologyIds.map((technologyId) => ({ source: technologyId, target: sectorId, type: "used-within" as const })),
  ),
  ...workLinks,
  ...relatedTechnologyPairs.map(([source, target]) => ({ source, target, type: "related-to" as const })),
];

export const nodeById = new Map(graphNodes.map((node) => [node.id, node]));

export function relationshipsFor(nodeId: string) {
  return graphRelationships.filter((relationship) => relationship.source === nodeId || relationship.target === nodeId);
}

export function connectedNodeIds(nodeId: string) {
  const ids = new Set([nodeId]);
  for (const relationship of relationshipsFor(nodeId)) {
    ids.add(relationship.source);
    ids.add(relationship.target);
  }
  return ids;
}

export const sectors = sectorNodes;
