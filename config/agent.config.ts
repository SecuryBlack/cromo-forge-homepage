export interface InstallCommand {
  os: "Linux" | "Windows";
  /** `{version}` is replaced with the latest release, without the "v". */
  cmd: string;
  badge?: string;
  /** Shown under the command, for steps the command itself does not do. */
  note?: string;
}

export interface StatItem {
  label: string;
  value: string;
  note: string;
}

export interface BentoFeature {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  colSpan?: "col-span-1" | "col-span-2" | "col-span-3";
  tag: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  feature: string;
  agent: string | boolean;
  bashScript: string | boolean;
  competitors: string | boolean;
}

export interface AgentTheme {
  primary: string; // e.g. #06B6D4 (Cyan for TitanVault)
  primaryDark: string; // e.g. #0891B2
  primaryLight: string; // e.g. #38BDF8
  glow: string; // rgba
  accentTag: string; // Tailwind color class for badges
}

export interface EcosystemAgent {
  id: string;
  name: string;
  role: string;
  tagline: string;
  url: string;
  githubUrl: string;
  color: string;
  badge: string;
}

export const ecosystemAgents: EcosystemAgent[] = [
  {
    id: "oxipulse",
    name: "OxiPulse",
    role: "Metrics",
    tagline: "Host metrics agent that exports over OTLP.",
    url: "https://oxipulse.dev",
    githubUrl: "https://github.com/securyblack/oxi-pulse",
    color: "#33E1BF",
    badge: "OTLP Metrics",
  },
  {
    id: "ferrosentry",
    name: "FerroSentry",
    role: "Security audit",
    tagline: "Server security audit agent.",
    url: "https://ferrosentry.dev",
    githubUrl: "https://github.com/securyblack/ferro-sentry",
    color: "#F43F5E",
    badge: "Security",
  },
  {
    id: "cupraflow",
    name: "CupraFlow",
    role: "Networking (in development)",
    tagline: "Networking and high availability (in development).",
    url: "https://cupraflow.dev",
    githubUrl: "https://github.com/securyblack/cupra-flow",
    color: "#F97316",
    badge: "In development",
  },
  {
    id: "cromoforge",
    name: "CromoForge",
    role: "Deploys, Docker & PostgreSQL",
    tagline: "GitHub deploys, Docker containers and PostgreSQL management.",
    url: "https://cromoforge.dev",
    githubUrl: "https://github.com/securyblack/cromo-forge",
    color: "#6366F1",
    badge: "Deploys",
  },
  {
    id: "titanvault",
    name: "TitanVault",
    role: "Backups",
    tagline: "Scheduled PostgreSQL and file backups to S3-compatible storage.",
    url: "https://titanvault.dev",
    githubUrl: "https://github.com/securyblack/titan-vault",
    color: "#06B6D4",
    badge: "Backups",
  },
];

export interface AgentConfig {
  id: string;
  name: string;
  binaryName: string;
  productTitle: string;
  badge: string;
  version: string;
  tagline: string;
  description: string;
  theme: AgentTheme;
  githubUrl: string;
  docsUrl: string;
  installCommands: InstallCommand[];
  stats: StatItem[];
  statsFootnote?: string;
  statsSourceUrl?: string;
  features: BentoFeature[];
  comparisonRows: ComparisonRow[];
  faq: FAQItem[];
}

/* ==========================================================================
   CromoForge (Indigo / Chrome) — GitHub deploys, Docker and PostgreSQL
   ========================================================================== */
export const cromoForgeConfig: AgentConfig = {
  id: "cromo-forge",
  name: "CromoForge",
  binaryName: "cromoforge",
  productTitle: "CromoForge — Deploy agent for your own servers",
  badge: "Open source · Apache 2.0 · Rust",
  version: "v0.4.0",
  tagline: "Deploy from GitHub to your own server",
  description:
    "A small Rust agent for the SecuryBlack panel. It builds your GitHub repository on your server with Railpack, starts it after a healthcheck and serves it on your domains over HTTPS. It also handles Docker containers and day-to-day PostgreSQL tasks. GitHub deploys are in beta and free while the beta lasts.",
  theme: {
    primary: "#6366F1", // Indigo / Chrome
    primaryDark: "#4F46E5",
    primaryLight: "#818CF8",
    glow: "rgba(99, 102, 241, 0.15)",
    accentTag: "indigo",
  },
  githubUrl: "https://github.com/securyblack/cromo-forge",
  docsUrl: "https://github.com/securyblack/cromo-forge#readme",
  installCommands: [
    {
      os: "Linux",
      cmd: "curl -fsSL https://install.cromoforge.dev | sudo bash -s -- --token <TOKEN>",
      badge: "Recommended",
      note: "You normally copy this command, with your server token, from the SecuryBlack panel at app.securyblack.com. Deploys need Docker Engine with the buildx plugin: if Docker is missing the script installs it, along with Railpack (--no-docker skips it).",
    },
  ],
  stats: [
    { label: "App types", value: "3", note: "Web, worker, cron" },
    { label: "Build", value: "Railpack", note: "On your server, via BuildKit" },
    { label: "HTTPS", value: "Automatic", note: "Caddy + Let's Encrypt" },
    { label: "Rollback", value: "No rebuild", note: "Last 3 images kept" },
  ],
  features: [
    {
      id: "deploys",
      title: "Deploy from GitHub",
      subtitle: "Beta",
      description:
        "Connect a repository in the SecuryBlack panel and deploy on push or by hand. CromoForge fetches that commit, builds it with Railpack on your server and streams the build log to the panel. Web apps, background workers and cron jobs (5-field schedule, UTC).",
      colSpan: "col-span-2",
      tag: "Deploys",
    },
    {
      id: "https",
      title: "Your domains, with HTTPS",
      subtitle: "Managed Caddy",
      description:
        "Installs a Caddy container and routes each web app's domains to it, with certificates from Let's Encrypt. Extra domains can redirect to the main one (www ↔ apex) or serve the app too. Routes go through Caddy's local admin API, never a hand-edited Caddyfile.",
      colSpan: "col-span-1",
      tag: "Proxy",
    },
    {
      id: "rollback",
      title: "Rollback without rebuilding",
      subtitle: "Images kept on the host",
      description:
        "Keeps the newest images of each app, three by default. A rollback starts one of them again instead of building the old commit.",
      colSpan: "col-span-1",
      tag: "Operations",
    },
    {
      id: "postgres",
      title: "Containers and PostgreSQL",
      subtitle: "Day-to-day tasks",
      description:
        "List, start, stop and restart Docker containers, see CPU and memory per container and follow logs live, one container or a whole Compose project merged by time. For PostgreSQL, on the host or in a container: connections, size, cache hit ratio, slow and active queries, table bloat and unused indexes, plus cancel, terminate, vacuum, reindex and install-extension actions.",
      colSpan: "col-span-2",
      tag: "Operations",
    },
  ],
  comparisonRows: [
    {
      feature: "Where the app runs",
      agent: "Your server",
      bashScript: "Your server",
      competitors: "The provider's infrastructure",
    },
    {
      feature: "Build",
      agent: "Railpack on your server, BuildKit capped at half the CPUs",
      bashScript: "Whatever you script",
      competitors: "The provider's builders",
    },
    {
      feature: "Trigger",
      agent: "Push to GitHub, or a click in the panel",
      bashScript: "SSH in and run the script",
      competitors: "Push to GitHub",
    },
    {
      feature: "Check before switching",
      agent: "HTTP healthcheck (web), 30 s stability (worker)",
      bashScript: "If you write it",
      competitors: "Depends on the provider",
    },
    {
      feature: "Custom domains, www redirect and HTTPS",
      agent: "Caddy with Let's Encrypt, set up by the agent",
      bashScript: "Set up by hand",
      competitors: "Included",
    },
    {
      feature: "Rollback",
      agent: "Starts a kept image, no rebuild",
      bashScript: "Rebuild or retag by hand",
      competitors: "Depends on the provider",
    },
  ],
  faq: [
    {
      question: "Do I need a SecuryBlack account?",
      answer:
        "Yes. CromoForge is Apache 2.0, but it takes its orders (deploys, container and PostgreSQL actions) from the SecuryBlack panel and has no standalone mode or local UI. Install it from app.securyblack.com, which gives you the command with your server token.",
    },
    {
      question: "What does a server need for deploys?",
      answer:
        "Linux with systemd, x86_64 or arm64, and Docker Engine with the buildx plugin. The install script adds Railpack (pinned version, checksum verified) and installs Docker with buildx if it's missing, from the distro's packages or get.docker.com; --no-docker skips it. The agent creates the BuildKit and Caddy containers it uses.",
    },
    {
      question: "What happens if a deploy fails?",
      answer:
        "If the build, the start or the healthcheck fails, the new container is removed, the domain keeps pointing to the version that was running, and the panel shows the failed stage and the container logs. Only one deploy per app runs at a time.",
    },
    {
      question: "How are secrets handled?",
      answer:
        "Runtime environment variables reach the container through an env file readable only by root (0600) that is deleted right after docker run, so they never appear in docker run's arguments. Cron apps keep theirs in a 0600 file under /var/lib/cromoforge/cron for the next run. Build-time variables are passed to Railpack on its command line while the build runs.",
    },
    {
      question: "Can the panel run arbitrary commands on my server?",
      answer:
        "No. The agent only accepts a fixed set of commands: deploy, remove app, proxy, container and PostgreSQL actions, and update. Commands carry an ed25519 signature with an expiry and replay protection. During the current rollout the agent still accepts commands that fail verification and logs a warning.",
    },
    {
      question: "How does it update?",
      answer:
        "It checks GitHub Releases once a day and only installs releases with a valid ed25519 signature, then restarts through systemd.",
    },
  ],
};

export const activeAgentConfig: AgentConfig = cromoForgeConfig;
