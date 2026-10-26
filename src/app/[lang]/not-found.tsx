import { ArrowLeft } from "lucide-react";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";
import { localizePath } from "@/lib/utils";
import { ButtonLink } from "@/components/ui/button";

export default async function NotFound() {
  const locale = await getLocale();
  const dict = await getDictionary(locale);

  return (
    <section className="container-site relative py-32 sm:py-40">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-blueprint [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]"
      />
      <div className="relative">
        <p className="font-mono text-[clamp(5rem,20vw,14rem)] font-semibold leading-none tracking-tighter text-white/[0.06]">
          {dict.notFound.code}
        </p>
        <h1 className="-mt-6 text-headline font-semibold sm:-mt-12">{dict.notFound.title}</h1>
        <p className="mt-4 max-w-md text-lg text-muted">{dict.notFound.text}</p>
        <ButtonLink
          href={localizePath(locale)}
          variant="secondary"
          className="mt-10"
          icon={<ArrowLeft className="size-4" />}
        >
          {dict.notFound.cta}
        </ButtonLink>
      </div>
    </section>
  );
}
