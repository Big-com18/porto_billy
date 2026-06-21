import Image from "next/image";
import { profile } from "@/lib/content";

export default function Hero() {
  return (
    <section
      id="home"
      className="border-b border-rule px-5 py-16 sm:px-10 sm:py-24 lg:px-16"
    >
      <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber">
            // home.tsx — selamat datang
          </p>
          <h1 className="mt-5 font-display text-4xl font-bold leading-[1.08] text-paper sm:text-5xl lg:text-6xl">
            Halo, saya{" "}
            <span className="text-amber">{profile.name.split(" ")[0]}</span>
            <span className="blink-cursor" />
          </h1>
          <p className="mt-5 font-mono text-sm text-teal sm:text-base">
            const role ={" "}
            <span className="text-rose">&quot;{profile.role}&quot;</span>;
          </p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/80 sm:text-lg">
            {profile.intro}
          </p>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/60">
            {profile.bio}
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm bg-amber px-5 py-2.5 font-mono text-sm font-semibold text-ink transition hover:bg-amber-dim"
            >
              Lihat CV ↗
            </a>
            <a
              href="#contact"
              className="rounded-sm border border-rule px-5 py-2.5 font-mono text-sm text-paper/80 transition hover:border-teal hover:text-teal"
            >
              hubungi();
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xs">
          <div className="absolute -inset-3 -z-10 rotate-2 rounded-sm border border-rule" />
          <div className="relative overflow-hidden rounded-sm border border-rule bg-panel">
            <div className="flex items-center gap-1.5 border-b border-rule bg-panelLight px-3 py-1.5">
              <span className="h-2 w-2 rounded-full bg-rose/70" />
              <span className="h-2 w-2 rounded-full bg-amber/70" />
              <span className="h-2 w-2 rounded-full bg-teal/70" />
              <span className="ml-2 font-mono text-[10px] text-muted">
                profile.jpg
              </span>
            </div>
            <div className="relative aspect-[4/5] w-full">
              <Image
                src={profile.photo}
                alt={`Foto profil ${profile.name}`}
                fill
                sizes="(max-width: 768px) 80vw, 320px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
