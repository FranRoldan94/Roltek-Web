import { CodeXml, Network, Smartphone, Terminal, type LucideIcon } from "lucide-react";
import type { Dictionary } from "@/i18n/get-dictionary";
import { SectionHeader } from "@/components/ui/section-header";
import { Reveal } from "@/components/ui/reveal";
import { Tag } from "@/components/ui/tag";

const icons: LucideIcon[] = [Terminal, CodeXml, Smartphone, Network];

export function Expertise({ dict }: { dict: Dictionary }) {
  const { expertise } = dict;

  return (
    <section aria-labelledby="expertise-title" className="container-site py-20 sm:py-28">
      <SectionHeader
        id="expertise-title"
        index={expertise.index}
        label={expertise.label}
        title={expertise.title}
      />

      <ol className="mt-14 border-t border-line">
        {expertise.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <Reveal as="li" key={item.title} delay={0.06 * i} className="border-b border-line">
              <div className="group grid gap-4 py-8 transition-colors md:grid-cols-12 md:gap-8 md:py-10">
                <div className="flex items-center gap-4 md:col-span-3">
                  <span className="font-mono text-xs text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex size-10 items-center justify-center rounded-lg border border-line bg-surface text-muted transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
                    <Icon aria-hidden="true" className="size-[18px]" strokeWidth={1.5} />
                  </span>
                </div>
                <h3 className="text-2xl font-semibold tracking-tight md:col-span-4 lg:text-3xl">
                  {item.title}
                </h3>
                <div className="md:col-span-5">
                  <p className="leading-relaxed text-muted">{item.description}</p>
                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <li key={tag}>
                        <Tag>{tag}</Tag>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </ol>
    </section>
  );
}
