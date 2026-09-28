import { useEffect } from "react";
import hoodieCutout from "@/assets/hoodie-cutout.png";
import teeCutout from "@/assets/tee-cutout.png";
import jacketCutout from "@/assets/jacket-cutout.png";
import flatlay from "@/assets/collection-flatlay.jpg";
import storeInterior from "@/assets/store-interior.jpg";

const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=FOMO%20studio%20Bhowanipore%20Kolkata";

const PIECES = [
  {
    name: "Midnight Mono Hoodie",
    type: "Heavyweight fleece",
    img: hoodieCutout,
    isCutout: true,
  },
  {
    name: "Signal Noise Tee",
    type: "Boxy graphic tee",
    img: teeCutout,
    isCutout: true,
  },
  {
    name: "Calcutta Heat Jacket",
    type: "Workwear chore",
    img: jacketCutout,
    isCutout: true,
  },
] as const;

export function useRevealOnScroll() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal-item"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

export function CollectionSection() {
  return (
    <section id="collection" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="reveal-item text-center">
        <p className="eyebrow">The collection</p>
        <h2 className="display mt-4 text-4xl sm:text-5xl">In store right now</h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground">
          Browse what's on the rail — everything shown lives in the store on Paddapukur
          Road. New drops land here first.
        </p>
      </div>

      <div className="mt-14 grid gap-5 sm:grid-cols-3">
        {PIECES.map((piece, i) => (
          <article
            key={piece.name}
            className="reveal-item group rounded-3xl border border-border bg-card p-6"
            style={{ transitionDelay: `${i * 90}ms` }}
          >
            <div className="grid aspect-square place-items-center overflow-hidden rounded-2xl bg-background/60">
              <img
                src={piece.img}
                alt={piece.name}
                loading="lazy"
                width={1024}
                height={1024}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
              />
            </div>
            <div className="mt-5 flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 className="display text-lg">{piece.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{piece.type}</p>
              </div>
              <span className="mt-1 shrink-0 rounded-full border border-border px-2.5 py-1 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                In store
              </span>
            </div>
          </article>
        ))}
      </div>

      <div className="reveal-item mt-5 grid overflow-hidden rounded-3xl border border-border bg-card md:grid-cols-2">
        <div className="min-h-64 overflow-hidden">
          <img
            src={flatlay}
            alt="Folded streetwear pieces laid out on concrete"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
          />
        </div>
        <div className="flex flex-col justify-center gap-4 p-8 sm:p-12">
          <p className="eyebrow">Everyday carry</p>
          <h3 className="display text-2xl sm:text-3xl">The Essentials Stack</h3>
          <p className="text-pretty text-muted-foreground">
            Tees, sweats, caps and socks in black and bone — restocked weekly, priced so
            you can wear them daily. Ask for the stack at the counter.
          </p>
          <a href="#visit" className="pill pill-ghost mt-2 self-start px-6 py-3 text-sm">
            Ask in store
          </a>
        </div>
      </div>
    </section>
  );
}

export function StorySection() {
  return (
    <section id="story" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-24 sm:px-8 sm:py-32 md:grid-cols-2">
        <div className="reveal-item overflow-hidden rounded-3xl border border-border">
          <img
            src={storeInterior}
            alt="Inside the FOMO Studio store"
            loading="lazy"
            width={1920}
            height={1024}
            className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
          />
        </div>
        <div className="reveal-item">
          <p className="eyebrow">The studio</p>
          <h2 className="display mt-4 text-4xl sm:text-5xl">One room, one rail, real drops</h2>
          <p className="mt-6 text-pretty leading-relaxed text-muted-foreground">
            FOMO Studio is a small independent clothing store in Bhowanipore, Kolkata.
            No mall racks, no filler — just pieces we'd wear ourselves: limited drops,
            local graphics, heavyweight fabrics and everyday staples.
          </p>
          <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
            Walk in, try it on, talk to us. If a size runs out, the next drop is never
            far away.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <span className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              4.9 ★ on Google
            </span>
            <span className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Independent · Kolkata
            </span>
            <span className="rounded-full border border-border bg-background px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              New drops monthly
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function VisitSection() {
  return (
    <section id="visit" className="mx-auto max-w-6xl px-5 py-24 sm:px-8 sm:py-32">
      <div className="reveal-item rounded-3xl border border-border bg-card p-8 sm:p-12">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <p className="eyebrow">Visit</p>
            <h2 className="display mt-4 text-4xl sm:text-5xl">Come see it in person</h2>
            <p className="mt-5 text-pretty text-muted-foreground">
              Sizes, fits and fabrics are better in person. The rail changes weekly —
              drop by or message us before you come.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a className="pill pill-accent px-6 py-3 text-sm" href={MAPS_URL} target="_blank" rel="noreferrer">
                Get directions
              </a>
              <a className="pill pill-ghost px-6 py-3 text-sm" href="#top">
                Back to top
              </a>
            </div>
          </div>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Address</p>
              <p className="mt-2 leading-relaxed">
                6, Paddapukur Rd, Jadubabar Bazar,<br />
                Bhowanipore, Kolkata, West Bengal 700020
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Hours</p>
              <p className="mt-2">Tuesday – Sunday · 12 pm – 9 pm</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Reach us</p>
              <p className="mt-2">
                WhatsApp & Instagram links go here — send us your number and handle and
                they'll be wired in.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-5 py-10 sm:flex-row sm:px-8">
        <a href="#top" className="display text-lg tracking-tight">
          fomo<span className="text-primary">studio</span>
        </a>
        <nav className="flex items-center gap-6" aria-label="Footer">
          <a className="nav-link text-sm" href="#collection">Collection</a>
          <a className="nav-link text-sm" href="#story">Story</a>
          <a className="nav-link text-sm" href="#visit">Visit</a>
        </nav>
        <p className="text-xs text-muted-foreground">Streetwear · Bhowanipore, Kolkata</p>
      </div>
    </footer>
  );
}
