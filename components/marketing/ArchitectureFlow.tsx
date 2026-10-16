"use client";

import React from "react";
import { Badge } from "@/components/catalyst/badge";
import { Download, Hammer, CheckCircle2, Globe } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: Download,
    title: "Fetch",
    desc: "Downloads the tarball of the exact commit from the GitHub API, with a token the panel sends for that deploy.",
    tag: "GitHub",
  },
  {
    step: "02",
    icon: Hammer,
    title: "Build",
    desc: "Builds the image with Railpack against a local BuildKit container capped at half the CPUs and up to 4 GB of RAM. Build logs stream to the panel and the cache is pruned after each build.",
    tag: "Railpack",
  },
  {
    step: "03",
    icon: CheckCircle2,
    title: "Check",
    desc: "Starts the new container next to the old one. Web apps must answer an HTTP healthcheck; workers must stay up 30 s without restarts. If the check fails, the new container is removed and the old one keeps running.",
    tag: "Healthcheck",
  },
  {
    step: "04",
    icon: Globe,
    title: "Switch",
    desc: "Points the app's domain to the new container in Caddy, with HTTPS from Let's Encrypt, then stops the previous version. Recent images stay on the host for rollbacks.",
    tag: "Caddy",
  },
];

export function ArchitectureFlow() {

  return (
    <section id="architecture" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <Badge variant="neutral" className="mb-3">
          How it works
        </Badge>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
          From a commit to a running app
        </h2>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400 text-sm sm:text-base">
          The whole agent is under 3,000 lines of Rust. Read it on GitHub.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
        {steps.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div
              key={idx}
              className="p-6 rounded-2xl border border-zinc-200/90 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/30 flex flex-col justify-between relative group hover:border-zinc-300 dark:hover:border-zinc-700 shadow-xs transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 font-bold">
                    STEP {item.step}
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {item.tag}
                  </span>
                </div>

                <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700/60 flex items-center justify-center text-[var(--agent-primary-dark)] dark:text-[var(--agent-primary-light)] mb-4">
                  <Icon className="size-5" />
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>

            </div>
          );
        })}
      </div>
    </section>
  );
}
