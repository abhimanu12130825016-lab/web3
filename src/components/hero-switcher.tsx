import { useState } from "react";
import hoodieCutout from "@/assets/hoodie-cutout.png";
import teeCutout from "@/assets/tee-cutout.png";
import jacketCutout from "@/assets/jacket-cutout.png";
import backdropHoodie from "@/assets/backdrop-hoodie.jpg";
import backdropTee from "@/assets/backdrop-tee.jpg";
import backdropJacket from "@/assets/backdrop-jacket.jpg";

const DROPS = [
  {
    id: "midnight-mono",
    name: "Midnight Mono",
    lede: "An oversized heavyweight hoodie in washed black — a small embroidered mark on the chest, the whole statement from the back.",
    cutout: hoodieCutout,
    backdrop: backdropHoodie,
  },
  {
    id: "signal-noise",
    name: "Signal Noise",
    lede: "A boxy, heavyweight tee in washed cream with a hand-pulled graphic across the chest. The everyday piece that started the label.",
    cutout: teeCutout,
    backdrop: backdropTee,
  },
  {
    id: "calcutta-heat",
    name: "Calcutta Heat",
    lede: "A workwear chore jacket with acid-yellow embroidery. Built for the monsoon, tuned for the street.",
    cutout: jacketCutout,
    backdrop: backdropJacket,
  },
] as const;

type Drop = (typeof DROPS)[number];

function CutoutSlot({
  drop,
  side,
  onSelect,
}: {
  drop: Drop;
  side: "left" | "right";
  onSelect: (id: string) => void;
}) {
  const anchor = side === "left" ? "right" : "left";
  return (
    <button
      type="button"
      onClick={() => onSelect(drop.id)}
      aria-label={`Feature ${drop.name}`}
      className={[
        "cutout-slot absolute top-1/2 w-24 -translate-y-1/2 sm:w-32 md:w-40",
        anchor === "right"
          ? "right-[calc(50%+6.5rem)] sm:right-[calc(50%+8.5rem)] md:right-[calc(50%+11rem)]"
          : "left-[calc(50%+6.5rem)] sm:left-[calc(50%+8.5rem)] md:left-[calc(50%+11rem)]",
      ].join(" ")}
    >
      {DROPS.map((d) => (
        <img
          key={d.id}
          src={d.cutout}
          alt=""
          width={1024}
          height={1024}
          className={d.id === drop.id ? "is-shown" : undefined}
        />
      ))}
      <span className="slot-label left-1/2 hidden -translate-x-1/2 sm:block">{drop.name}</span>
    </button>
  );
}

export function HeroSwitcher() {
  const [featuredId, setFeaturedId] = useState<Drop["id"]>("midnight-mono");
  const [navOpen, setNavOpen] = useState(false);

  const featuredIndex = DROPS.findIndex((d) => d.id === featuredId);
  const featured = DROPS[featuredIndex]!;
  const left = DROPS[(featuredIndex + 1) % DROPS.length]!;
  const right = DROPS[(featuredIndex + 2) % DROPS.length]!;

  const show = (id: string) => {
    if (id === featuredId) return;
    setFeaturedId(id as Drop["id"]);
  };

  return (
    <section id="top" className="anim relative h-svh min-h-[620px] overflow-hidden">
      {/* backdrops — one per drop, crossfaded */}
      <div className="absolute inset-0" aria-hidden="true">
        {DROPS.map((d) => (
          <img
            key={d.id}
            src={d.backdrop}
            alt=""
            width={1920}
            height={1088}
            className={[
              "absolute inset-0 h-full w-full object-cover transition-opacity duration-500",
              d.id === featuredId ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        ))}
        <div className="absolute inset-0" style={{ background: "var(--hero-overlay)" }} />
      </div>

      {/* nav */}
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex h-[74px] max-w-6xl items-center justify-between px-5 sm:px-8 md:h-[88px]">
          <a href="#top" className="display shrink-0 text-lg tracking-tight">
            fomo<span className="text-primary">studio</span>
          </a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
            <a className="nav-link" href="#collection">Collection</a>
            <a className="nav-link" href="#story">Story</a>
            <a className="nav-link" href="#visit">Visit</a>
            <a className="pill pill-accent px-5 py-2.5 text-sm" href="#visit">WhatsApp us</a>
          </nav>
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 flex-col items-center justify-center gap-1.5 md:hidden"
            aria-label={navOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={navOpen}
            aria-controls="site-nav"
            onClick={(e) => {
              e.stopPropagation();
              setNavOpen((v) => !v);
            }}
          >
            <span className={`block h-0.5 w-6 rounded-full bg-foreground transition-transform duration-300 ${navOpen ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-foreground transition-opacity duration-200 ${navOpen ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-6 rounded-full bg-foreground transition-transform duration-300 ${navOpen ? "-translate-y-2 -rotate-45" : ""}`} />
          </button>
        </div>
        {navOpen ? (
          <div
            id="site-nav"
            className="absolute right-4 top-[84px] z-40 w-[min(20rem,calc(100vw-2.5rem))] rounded-2xl border border-border bg-popover/90 p-2 shadow-xl backdrop-blur-xl md:hidden"
          >
            <a className="nav-link block px-4 py-3.5" href="#collection" onClick={() => setNavOpen(false)}>Collection</a>
            <a className="nav-link block border-t border-border px-4 py-3.5" href="#story" onClick={() => setNavOpen(false)}>Story</a>
            <a className="nav-link block border-t border-border px-4 py-3.5" href="#visit" onClick={() => setNavOpen(false)}>Visit</a>
            <a className="pill pill-accent mt-2 w-full py-3" href="#visit" onClick={() => setNavOpen(false)}>WhatsApp us</a>
          </div>
        ) : null}
      </header>

      {/* copy */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 pb-16 pt-20 text-center">
        <div key={featured.id} className="flex flex-col items-center">
          <p className="eyebrow rise d1">Featured drop</p>
          <h1 className="display rise d2 mt-4 text-5xl uppercase leading-none tracking-wide sm:text-7xl md:text-[6.5rem]">
            {featured.name}
          </h1>
          <span className="rule-line draw d3 mt-7" />
          <p className="rise d4 mt-6 max-w-md text-pretty text-[0.95rem] leading-relaxed text-foreground/90 sm:text-base">
            {featured.lede}
          </p>
          <div className="settle d5 relative mt-10 flex items-center justify-center">
            <CutoutSlot drop={left} side="left" onSelect={show} />
            <a href="#collection" className="pill mx-2 sm:mx-6">See the collection</a>
            <CutoutSlot drop={right} side="right" onSelect={show} />
          </div>
          <p className="mt-5 text-[0.68rem] font-semibold uppercase tracking-[0.28em] text-muted-foreground sm:hidden">
            Tap a garment to feature it
          </p>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#collection"
        aria-label="Scroll to the collection"
        className="settle d8 absolute bottom-7 left-1/2 z-20 grid h-14 w-14 -translate-x-1/2 place-items-center rounded-full border border-border bg-foreground/5 backdrop-blur transition-colors hover:bg-foreground/10"
      >
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
          <path d="M12 4v15M5.5 13 12 19.5 18.5 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  );
}
