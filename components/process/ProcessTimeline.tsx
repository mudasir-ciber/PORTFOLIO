"use client";

import { ProcessStepItem } from "@/components/process/ProcessStep";
import { Reveal } from "@/components/motion/Reveal";
import { processSteps, type ProcessStep } from "@/data/process";
import { useState } from "react";

type ProcessTimelineProps = {
  steps?: ProcessStep[];
};

export function ProcessTimeline({ steps = processSteps }: ProcessTimelineProps) {
  const [openId, setOpenId] = useState<string | null>(steps[0]?.id ?? null);
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <div className="mt-2">
      {/* Desktop progress strip */}
      <div
        className="mb-10 hidden items-center gap-2 lg:flex"
        aria-hidden
      >
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-1 items-center gap-2">
            <span
              className={
                openId === step.id || activeId === step.id
                  ? "text-label text-accent"
                  : "text-label text-text-muted"
              }
            >
              {step.number}
            </span>
            {index < steps.length - 1 ? (
              <span className="h-px flex-1 bg-border-subtle" />
            ) : null}
          </div>
        ))}
      </div>

      <ol className="m-0 list-none p-0">
        {steps.map((step, index) => (
          <li key={step.id}>
            <Reveal delay={Math.min(index * 0.04, 0.2)}>
              <ProcessStepItem
                step={step}
                open={openId === step.id}
                onToggle={() =>
                  setOpenId((current) =>
                    current === step.id ? null : step.id,
                  )
                }
                active={activeId === step.id}
                onActivate={(active) =>
                  setActiveId(active ? step.id : null)
                }
                isLast={index === steps.length - 1}
              />
            </Reveal>
          </li>
        ))}
      </ol>
    </div>
  );
}
