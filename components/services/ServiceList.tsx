"use client";

import { ServiceItem } from "@/components/services/ServiceItem";
import { Reveal } from "@/components/motion/Reveal";
import { services, type Service } from "@/data/services";
import { useState } from "react";

type ServiceListProps = {
  items?: Service[];
};

export function ServiceList({ items = services }: ServiceListProps) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  return (
    <div className="border-t border-border-subtle">
      {items.map((service, index) => (
        <Reveal key={service.id} delay={Math.min(index * 0.04, 0.2)}>
          <ServiceItem
            service={service}
            open={openId === service.id}
            onToggle={() =>
              setOpenId((current) =>
                current === service.id ? null : service.id,
              )
            }
            highlighted={highlightedId === service.id}
            onHighlight={(active) =>
              setHighlightedId(active ? service.id : null)
            }
          />
        </Reveal>
      ))}
    </div>
  );
}
