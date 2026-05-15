export type Metric = {
  value: string;
  label: string;
  detail?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
};

export type CaseStudy = {
  problem: string;
  approach: string;
  outcome: string;
  architecture: { layer: string; nodes: string[] }[];
};

export type Project = {
  id: string;
  name: string;
  client: string;
  tagline: string;
  description: string;
  impact: string[];
  stack: string[];
  domain: string;
  accent: 'cyan' | 'violet' | 'gold';
  caseStudy?: CaseStudy;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export type Education = {
  degree: string;
  institution: string;
  detail?: string;
};

export const HERO_METRICS: Metric[] = [
  { value: '$2M+', label: 'annual cost saved', detail: 'Illumio observability rebuild' },
  { value: '50K+', label: 'events / day', detail: 'real-time pipelines' },
  { value: '45%', label: 'lower MTTR', detail: 'SLO-driven alerting' },
  { value: '100+', label: 'microservices', detail: 'multi-tenant SaaS' },
];

export const ACHIEVEMENTS: Metric[] = [
  { value: '$2M+', label: 'annual licensing saved', detail: 'self-hosted LGTM stack at Illumio' },
  { value: '50K+', label: 'telemetry events / day', detail: 'sub-second Kafka → BigQuery' },
  { value: '99.5%', label: 'message delivery', detail: 'event-driven command platform' },
  { value: '70%', label: 'alert volume cut', detail: 'noise-reduction & SLO strategy' },
  { value: '60%', label: 'faster incident response', detail: '100+ alerts on Helm-managed Alertmanager' },
  { value: '75%', label: 'faster cluster setup', detail: 'Terraform + ArgoCD GitOps' },
  { value: '50%', label: 'lower MTTD', detail: 'full LGTM rollout on Kubernetes' },
  { value: '100%', label: 'trace coverage', detail: 'OpenTelemetry across 5+ services' },
];

export const EXPERIENCES: Experience[] = [
  {
    company: 'Sarvaha Systems Pvt. Ltd.',
    role: 'Senior Software Engineer',
    period: 'Dec 2019 — Present',
    location: 'India · Remote',
    summary:
      'Trusted platform partner across six enterprise products — from Illumio’s observability rebuild to Tesla’s real-time fleet telemetry. Own architecture, rollout and reliability for distributed systems running in production at global scale.',
    highlights: [
      'Designed multi-tenant SaaS platforms across 100+ microservices, 20+ tenant deployments.',
      'Drove $2M+ in annual cost savings through a self-hosted observability platform migration.',
      'Owned Kafka-on-Kubernetes architecture, GitOps rollouts, and SLO-based reliability.',
      'Cross-functional lead on architecture decisions and platform rollouts for global enterprise clients.',
    ],
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'illumio',
    name: 'Enterprise Observability Platform Migration',
    client: 'Illumio',
    domain: 'Reliability · SRE',
    tagline: 'A self-hosted LGTM rebuild that retired a $2M SaaS bill.',
    description:
      'Led the migration from Observe SaaS to a fully self-hosted Prometheus / Loki / Tempo / Grafana stack across three production environments, with SLO-driven alerting on top.',
    impact: [
      'Eliminated $2M+ in annual licensing spend, cut environment-specific incidents by 40%.',
      'Built 15+ production dashboards and PromQL / LogQL / TraceQL queries across 50+ services.',
      'Migrated 100+ alerts to Helm-managed Alertmanager — 60% faster incident response.',
      'SLO-based alerting reduced alert volume by 70% and improved MTTR by 45%.',
    ],
    stack: ['Prometheus', 'Grafana', 'Loki', 'Tempo', 'Alertmanager', 'PromQL', 'LogQL', 'PagerDuty'],
    accent: 'cyan',
    caseStudy: {
      problem:
        'Vendor SaaS observability (Observe) had ballooned to $2M+/yr with cardinality drift, brittle alerting, and limited query flexibility across three production environments. On-call satisfaction was sliding fast.',
      approach:
        'Stood up a parallel LGTM stack on Kubernetes, mirrored 50+ critical services for four weeks to validate signal parity, then rolled out Helm-managed Alertmanager with SLO-based routing. Old vendor was deprecated in stages tied to runbook coverage — not the calendar.',
      outcome:
        '$2M+ annual licensing eliminated, alert volume cut 70% via SLO refactor, MTTR -45%, and on-call alert-fatigue scores dropped 60% in the first quarter post-migration.',
      architecture: [
        { layer: 'Telemetry', nodes: ['OpenTelemetry SDK', 'Promtail', 'Tempo agent'] },
        { layer: 'Storage', nodes: ['Mimir (long-term Prometheus)', 'Loki', 'Tempo'] },
        { layer: 'Query · Alerting', nodes: ['Grafana', 'PromQL / LogQL / TraceQL', 'Alertmanager (SLO routes)'] },
        { layer: 'Delivery', nodes: ['PagerDuty', 'Slack incident channels'] },
      ],
    },
  },
  {
    id: 'apexaiq',
    name: 'Asset Management & Cybersecurity SaaS',
    client: 'ApexaIQ',
    domain: 'Platform · Security',
    tagline: 'A real-time vulnerability pipeline on Kafka, hardened for 20+ tenants.',
    description:
      'Architected a sub-second vulnerability detection pipeline on Kafka, fully automated on EKS with GitOps and tier-1 multi-tenant observability.',
    impact: [
      '10K+ records/day processed at sub-second latency across 20+ multi-tenant deployments.',
      'Terraform + Helm cut Kafka-on-EKS spin-up from 2 days to 30 minutes.',
      'ArgoCD GitOps shipped 50+ zero-downtime releases per month.',
      '4-tier Grafana dashboards (Global / Tenant / Security / Ops) across 6 metric domains.',
      '35% faster queries via per-accelerator partitioning; auto-routed 500+ tickets/month via Workato.',
    ],
    stack: ['Kafka', 'Kubernetes', 'AWS EKS', 'Terraform', 'ArgoCD', 'OpenTelemetry', 'Vue.js', 'Spring Boot', 'PostgreSQL'],
    accent: 'violet',
    caseStudy: {
      problem:
        'Multi-tenant cybersecurity SaaS needed sub-second vulnerability detection across 20+ tenants, but the existing batch pipeline took hours. Tenant onboarding was a two-day manual process — sales was blocked on infra.',
      approach:
        'Designed a Kafka streaming ingestion layer on EKS, partitioned per tenant and per accelerator type. Terraform + Helm modules made Kafka-on-EKS reproducible; ArgoCD GitOps shipped zero-downtime releases. Built a 4-tier observability layer (Global / Tenant / Security / Ops) so noisy tenants stayed visible without polluting the global view.',
      outcome:
        'Sub-second detection at 10K+ records/day per tenant. Onboarding cut from 2 days → 30 min. 50+ zero-downtime releases per month. Workato auto-routed 500+ tickets/month.',
      architecture: [
        { layer: 'Ingestion', nodes: ['Kafka (per-tenant partitions)', 'Connectors · CDC'] },
        { layer: 'Runtime', nodes: ['AWS EKS', 'Terraform modules', 'Spring Boot services'] },
        { layer: 'Delivery', nodes: ['ArgoCD GitOps', 'Helm charts'] },
        { layer: 'Insight', nodes: ['Grafana (4-tier dashboards)', 'OpenTelemetry traces', 'Workato auto-routing'] },
      ],
    },
  },
  {
    id: 'gis',
    name: 'Google Integration Service',
    client: 'Multi-Tenant Command Orchestration',
    domain: 'Event-Driven · Java',
    tagline: 'Event-driven command orchestration with 99.5% delivery reliability.',
    description:
      'Designed and shipped a Java + Kafka command-execution platform orchestrating concurrent device commands across isolated tenants, integrated with Google GAC APIs.',
    impact: [
      '500+ concurrent device commands across 10+ isolated tenants.',
      'Configurable retry & expiry orchestration — 80% lower command failure rate.',
      '99.5% message delivery reliability under production load.',
      'Indexed schema scaling to 100K+ batch, device and command records.',
    ],
    stack: ['Java 17', 'Spring Boot 6', 'Apache Kafka', 'Google GAC API', 'PostgreSQL'],
    accent: 'gold',
    caseStudy: {
      problem:
        'A multi-tenant command-orchestration platform for fleet devices had sub-90% delivery reliability and no way to isolate noisy tenants. Operators were losing trust in the queue.',
      approach:
        'Designed a Kafka-backed Java/Spring Boot command platform with per-tenant topic isolation, a configurable retry + expiry orchestrator, and an indexed schema that scaled to 100K+ batch/device/command records. Integrated with Google GAC APIs for outbound delivery.',
      outcome:
        '99.5% delivery reliability under production load. 500+ concurrent device commands across 10 tenants. 80% lower command failure rate.',
      architecture: [
        { layer: 'API', nodes: ['Spring Boot 6 ingress', 'Idempotency layer'] },
        { layer: 'Queue', nodes: ['Kafka (tenant-scoped topics)', 'Retry / expiry orchestrator'] },
        { layer: 'Delivery', nodes: ['Google GAC API', 'Device fleet'] },
        { layer: 'State', nodes: ['PostgreSQL (indexed commands · batches · devices)'] },
      ],
    },
  },
  {
    id: 'connected-cars',
    name: 'Real-Time Fleet Telemetry Platform',
    client: 'Connected Cars (Tesla EV)',
    domain: 'Streaming · IoT',
    tagline: '50K+ telemetry events/day from a Tesla EV fleet, into BigQuery sub-second.',
    description:
      'Architected the ingestion pipeline for a connected-car program — streaming Tesla EV telemetry into BigQuery in real time, with Strimzi-managed Kafka on AKS and GitOps rollouts.',
    impact: [
      '50K+ events/day streamed sub-second into BigQuery.',
      'Terraform + ArgoCD provisioning cut cluster setup time by 75%.',
      '30+ automated deployments per month with zero downtime.',
      '8+ analytics REST APIs powering vehicle performance and driver-behavior insights.',
    ],
    stack: ['Apache Kafka', 'Strimzi', 'Azure AKS', 'Terraform', 'ArgoCD', 'BigQuery', 'Node.js', 'Flutter'],
    accent: 'cyan',
    caseStudy: {
      problem:
        'A connected-car program needed Tesla EV telemetry to land in BigQuery in real time for analytics, but Kafka cluster provisioning was manual, inconsistent, and slow. Cluster setup blocked the data team.',
      approach:
        'Architected a Strimzi-managed Kafka pipeline on AKS, fully provisioned via Terraform and rolled out by ArgoCD. Built 8 analytics REST APIs on Node.js for vehicle performance and driver-behavior insights, surfaced through a Flutter dashboard.',
      outcome:
        '50K+ events/day streamed sub-second into BigQuery. Cluster setup time -75%. 30+ zero-downtime deploys / month.',
      architecture: [
        { layer: 'Edge', nodes: ['Tesla EV fleet', 'Flutter dashboard'] },
        { layer: 'Stream', nodes: ['Strimzi Kafka on AKS', 'Schema registry'] },
        { layer: 'Infra', nodes: ['Terraform IaC', 'ArgoCD GitOps'] },
        { layer: 'Analytics', nodes: ['BigQuery sink', 'Node.js REST APIs (×8)'] },
      ],
    },
  },
  {
    id: 'agentic-ai',
    name: 'Personalized AI Customer Support Platform',
    client: 'Agentic-AI',
    domain: 'AI · Observability',
    tagline: 'Full LGTM stack instrumenting an AI agent fleet end-to-end.',
    description:
      'Modernised diagnostics for a distributed AI customer-support platform — full LGTM stack on Kubernetes with OpenTelemetry tracing across every microservice.',
    impact: [
      'MTTD reduced by 50% across distributed AI services.',
      '100% trace coverage on 5+ instrumented microservices.',
      'End-to-end signal correlation cut debug time by 60%.',
    ],
    stack: ['OpenTelemetry', 'Grafana LGTM', 'Winston-Loki', 'Kubernetes', 'Next.js', 'NestJS', 'Python'],
    accent: 'violet',
    caseStudy: {
      problem:
        'A distributed AI agent fleet had near-zero observability. When customer calls failed, diagnostics took hours of grep across siloed logs. MTTD was unacceptable for a customer-facing AI product.',
      approach:
        'Instrumented the entire microservice mesh with OpenTelemetry — Node/NestJS, Next.js, and Python services. Deployed the full LGTM stack on Kubernetes with Winston-Loki log shipping, and stitched a single trace ID across every hop of an agent conversation.',
      outcome:
        'MTTD -50%. 100% trace coverage across 5+ services. Stitched signal correlation cut debug time by 60%.',
      architecture: [
        { layer: 'Agent fleet', nodes: ['Next.js UI', 'NestJS orchestrator', 'Python tool workers'] },
        { layer: 'Signals', nodes: ['OpenTelemetry SDK (traces · metrics)', 'Winston-Loki (logs)'] },
        { layer: 'Storage', nodes: ['Prometheus', 'Loki', 'Tempo'] },
        { layer: 'Surface', nodes: ['Grafana (correlated trace · log · metric)'] },
      ],
    },
  },
  {
    id: 'omop-etl',
    name: 'Clinical Data Pipeline',
    client: 'OMOP ETL',
    domain: 'Data · Healthcare',
    tagline: 'Customer databases → OMOP Common Data Model, 10+ DBT mappings.',
    description:
      'Modelled DBT-driven ETL pipelines converting heterogeneous customer databases into the OMOP Common Data Model, authoring spec across 20+ modules.',
    impact: [
      '10+ DBT-driven mappings into OMOP CDM.',
      'Technical specs authored across 20+ modules.',
      'Standards-aligned pipeline ready for OHDSI tooling.',
    ],
    stack: ['Google BigQuery', 'OMOP CDM', 'DBT', 'OHDSI', 'Athena'],
    accent: 'gold',
    caseStudy: {
      problem:
        'Customers had heterogeneous clinical databases. Without OMOP CDM standardisation, cross-customer analytics — and any OHDSI tooling on top — was impossible. The data team needed a repeatable mapping pattern, not a bespoke pipeline per customer.',
      approach:
        'Authored DBT-driven mappings into OMOP CDM, modular by clinical domain. Wrote technical specs across 20+ modules so downstream teams could review semantic decisions independent of code. BigQuery as the target warehouse; Athena for ad-hoc exploration.',
      outcome:
        '10+ DBT-driven mappings shipped. Technical specs cover 20+ modules. Foundation laid for OHDSI tooling adoption across the customer base.',
      architecture: [
        { layer: 'Sources', nodes: ['Customer DBs (heterogeneous)'] },
        { layer: 'Transform', nodes: ['DBT models', 'OMOP semantic specs (×20)'] },
        { layer: 'Warehouse', nodes: ['BigQuery (OMOP CDM)'] },
        { layer: 'Analysis', nodes: ['Athena', 'OHDSI-ready surfaces'] },
      ],
    },
  },
];

export const SKILL_GROUPS: SkillGroup[] = [
  { category: 'Languages', items: ['Java', 'TypeScript', 'JavaScript', 'Python'] },
  { category: 'Backend', items: ['Spring Boot', 'Node.js', 'Express.js', 'NestJS'] },
  { category: 'Frontend', items: ['React', 'Vue.js', 'Angular'] },
  {
    category: 'Cloud & DevOps',
    items: ['AWS (EKS)', 'Azure (AKS)', 'GCP', 'Kubernetes', 'Terraform', 'Docker', 'Helm', 'ArgoCD'],
  },
  { category: 'Streaming & Data', items: ['Apache Kafka', 'Strimzi', 'PostgreSQL', 'MongoDB', 'BigQuery'] },
  {
    category: 'Observability',
    items: ['Grafana', 'Prometheus', 'Loki', 'Tempo', 'Mimir', 'OpenTelemetry', 'Alertmanager', 'PagerDuty'],
  },
  { category: 'AI / ML', items: ['LangChain', 'OpenAI', 'TensorFlow'] },
];

export const HERO_TECH_BADGES = [
  'Apache Kafka',
  'Kubernetes',
  'Terraform',
  'OpenTelemetry',
  'Grafana LGTM',
  'ArgoCD',
  'Spring Boot',
  'AWS · Azure · GCP',
];

export const EDUCATION: Education[] = [
  {
    degree: 'B.Tech, Computer Science and Engineering',
    institution: 'SGGSIET, Nanded',
    detail: 'Autonomous Institute of the Government of India',
  },
];

export const CORE_EXPERTISE = [
  'Distributed Systems',
  'Event-Driven Architecture',
  'Kafka Streaming',
  'Kubernetes & GitOps',
  'Observability Engineering',
  'Cloud Infrastructure',
  'Real-Time Data Pipelines',
  'Platform Engineering',
  'Multi-Tenant SaaS',
  'DevOps Automation',
  'SRE & Reliability',
  'Microservices',
];
