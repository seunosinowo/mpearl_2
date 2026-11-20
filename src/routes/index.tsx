import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Clock3,
  HeartPulse,
  Mail,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ScanLine,
  Search,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  labInvestigations,
  imagingServices,
  healthPackages,
  signaturePackages,
} from "@/lib/mpearl-content";
import clinicPhoto from "@/assets/mpearl-clinic-hero.png";
import clinicLogo from "@/assets/mpearl-logo.jpeg";
import clinicSymbol from "@/assets/mpearl-symbol.jpeg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mpearl Diagnostics | Care you can trust in Lagos" },
      {
        name: "description",
        content:
          "Explore clinical laboratory investigations, ultrasound services, and thoughtfully designed health packages at Mpearl in Surulere, Lagos.",
      },
      { property: "og:title", content: "Mpearl Diagnostics | Care you can trust in Lagos" },
      {
        property: "og:description",
        content:
          "Clinical laboratory investigations, ultrasound services, and health packages in Surulere, Lagos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: HomePage,
});

const inquiryPhone = "09046403013";
function enquiryUrl(message: string) {
  return `https://wa.me/2349046403013?text=${encodeURIComponent(message)}`;
}

const whatsappUrl = enquiryUrl(
  "Hello Mpearl, I would like to make an enquiry about your services.",
);
const groups = ["All", ...new Set(labInvestigations.map((investigation) => investigation.group))];

function Brand() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <img
        src={clinicSymbol}
        alt=""
        width={46}
        height={46}
        className="aspect-square rounded-full bg-white object-contain"
      />
      <span className="leading-none">
        <span className="block font-display text-2xl font-semibold">Mpearl</span>
        <span className="mt-1 block text-xs font-medium">Clinical Laboratory & Diagnostics</span>
      </span>
    </span>
  );
}

function HomePage() {
  const [search, setSearch] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showAllTests, setShowAllTests] = useState(false);

  const filteredInvestigations = useMemo(() => {
    const query = search.trim().toLowerCase();
    return labInvestigations.filter((item) => {
      const matchesGroup = selectedGroup === "All" || item.group === selectedGroup;
      const matchesQuery =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.group.toLowerCase().includes(query);
      return matchesGroup && matchesQuery;
    });
  }, [search, selectedGroup]);
  const visibleInvestigations =
    showAllTests || search || selectedGroup !== "All"
      ? filteredInvestigations
      : filteredInvestigations.slice(0, 12);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <div id="home" className="bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:bg-background focus:p-3"
      >
        Skip to main content
      </a>
      <div className="bg-primary text-primary-foreground">
        <div className="page-frame flex min-h-9 flex-wrap items-center justify-center gap-x-6 gap-y-1 py-2 text-[0.69rem] font-medium sm:justify-between sm:text-xs">
          <span className="inline-flex items-center gap-2">
            <MapPin className="size-3.5 text-brand-gold" /> 78 Bode Thomas Street, Surulere, Lagos
          </span>
          <a
            className="inline-flex items-center gap-2 transition-colors hover:text-brand-gold"
            href={`tel:${inquiryPhone}`}
          >
            <Phone className="size-3.5 text-brand-gold" /> Speak with our team{" "}
            <ArrowRight className="size-3" />
          </a>
        </div>
      </div>

      <header className="relative z-20 border-b border-border/70 bg-background/95">
        <div className="page-frame flex h-[76px] items-center justify-between gap-4">
          <a href="#home" aria-label="Mpearl Diagnostics home" onClick={closeMobileMenu}>
            <Brand />
          </a>
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Main navigation">
            <a
              className="text-sm font-semibold transition-colors hover:text-primary"
              href="#services"
            >
              Services
            </a>
            <a
              className="text-sm font-semibold transition-colors hover:text-primary"
              href="#packages"
            >
              Health packages
            </a>
            <a
              className="text-sm font-semibold transition-colors hover:text-primary"
              href="#signature"
            >
              Signature care
            </a>
            <a
              className="text-sm font-semibold transition-colors hover:text-primary"
              href="#contact"
            >
              Find us
            </a>
          </nav>
          <div className="hidden sm:block">
            <Button
              asChild
              className="h-10 gap-2 rounded-sm px-5 text-sm font-semibold shadow-none"
            >
              <a href={whatsappUrl} target="_blank" rel="noreferrer">
                Make an enquiry <ArrowUpRight className="size-4" />
              </a>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-controls="mobile-navigation"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
        <div id="mobile-navigation" hidden={!mobileMenuOpen}>
          <nav
            className="absolute inset-x-0 top-full border-b border-border bg-background px-6 pb-5 pt-2 shadow-lg lg:hidden"
            aria-label="Mobile navigation"
          >
            {[
              ["Services", "#services"],
              ["Health packages", "#packages"],
              ["Signature care", "#signature"],
              ["Find us", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                onClick={closeMobileMenu}
                className="flex min-h-12 items-center justify-between border-b border-border/70 text-sm font-semibold last:border-0"
              >
                {label}
                <ArrowRight className="size-4 text-primary" />
              </a>
            ))}
          </nav>
        </div>
      </header>

      <main id="main-content" className="overflow-hidden" tabIndex={-1}>
        <section className="page-frame grid items-center gap-8 pb-12 pt-8 md:min-h-[610px] md:grid-cols-[0.92fr_1.08fr] md:gap-7 md:py-12 lg:min-h-[650px] lg:grid-cols-[0.9fr_1.1fr]">
          <div className="relative z-10 py-4 md:py-9">
            <p className="mb-6 inline-flex items-center gap-2 text-[0.7rem] font-bold uppercase tracking-[0.12em] text-primary">
              <span className="size-2 rounded-full bg-brand-gold" /> Your health, in caring hands
            </p>
            <h1 className="max-w-[600px] text-[clamp(2.5rem,7vw,4.7rem)] font-semibold leading-[1.05] text-primary">
              Laboratory tests and <span className="text-brand-forest">ultrasound in Surulere</span>
            </h1>
            <p className="mt-6 max-w-[465px] text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              Browse our tests, scans, and health packages, or contact our team to arrange a visit.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                asChild
                className="h-12 gap-2 rounded-sm px-6 text-sm font-semibold shadow-none"
              >
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Talk to our team <ArrowRight className="size-4" />
                </a>
              </Button>
              <a
                href="#services"
                className="inline-flex h-12 items-center gap-2 px-3 text-sm font-semibold text-foreground transition-colors hover:text-primary"
              >
                Explore services <ArrowDown className="size-4" />
              </a>
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-border pt-6 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-2">
                <ShieldCheck className="size-[17px] text-primary" /> Patient-first care
              </span>
              <span className="inline-flex items-center gap-2">
                <Microscope className="size-[17px] text-primary" /> Lab & diagnostic services
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[720px] md:ml-auto md:mr-0">
            <div className="relative aspect-[1.26/1] max-h-[510px] overflow-hidden rounded-sm bg-secondary md:aspect-[1.02/1] lg:aspect-[1.1/1]">
              <img
                src={clinicPhoto}
                alt="A Mpearl laboratory professional speaking with a patient at the diagnostic centre"
                className="h-full w-full object-cover object-[60%_center]"
                fetchPriority="high"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-primary/5" />
              <div className="absolute bottom-5 left-5 right-5 bg-background/95 p-4 shadow-sm sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-[310px] sm:p-5">
                <div className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center bg-secondary text-primary">
                    <HeartPulse className="size-5" />
                  </span>
                  <div>
                    <p className="font-display text-base font-semibold">More than a test result</p>
                    <p className="mt-1 text-sm leading-5 text-muted-foreground">
                      A warmer, more personal experience from the very first visit.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -right-2 -top-4 -z-10 size-24 border-r border-t border-brand-gold sm:-right-5 sm:-top-5 sm:size-32" />
          </div>
        </section>

        <div className="border-y border-border/70 bg-card">
          <div className="page-frame grid grid-cols-2 divide-x divide-border py-5 sm:grid-cols-4 sm:py-6">
            <div className="px-3 text-center sm:px-5">
              <p className="font-display text-2xl font-semibold text-primary">
                {labInvestigations.length}
              </p>
              <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-sm">
                laboratory investigations
              </p>
            </div>
            <div className="px-3 text-center sm:px-5">
              <p className="font-display text-2xl font-semibold text-primary">
                {imagingServices.length}
              </p>
              <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-sm">
                ultrasound scan options
              </p>
            </div>
            <div className="mt-4 border-l-0 px-3 text-center sm:mt-0 sm:border-l sm:px-5">
              <p className="font-display text-2xl font-semibold text-primary">
                {healthPackages.length + signaturePackages.length}
              </p>
              <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-sm">
                health packages
              </p>
            </div>
            <div className="mt-4 border-l-0 px-3 text-center sm:mt-0 sm:border-l sm:px-5">
              <p className="inline-flex items-center gap-1.5 font-display text-2xl font-semibold text-primary">
                <MapPin className="size-5" /> Lagos
              </p>
              <p className="mt-1 text-[0.68rem] text-muted-foreground sm:text-sm">Surulere</p>
            </div>
          </div>
        </div>

        <section id="services" className="scroll-mt-6 py-16 sm:py-20 lg:py-24">
          <div className="page-frame">
            <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
              <div className="max-w-[650px]">
                <p className="text-xs font-bold uppercase tracking-[0.11em] text-primary">
                  What we do
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-[2.7rem]">
                  Good answers begin with <span className="text-brand-forest">the right care.</span>
                </h2>
                <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                  From routine laboratory checks to diagnostic scans, our team is here to help you
                  take the next step with confidence.
                </p>
              </div>
              <Button
                asChild
                variant="outline"
                className="h-11 w-fit gap-2 rounded-sm border-primary/25 bg-transparent px-4 text-sm font-semibold shadow-none hover:bg-secondary"
              >
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Ask about a test <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>

            <div className="mt-10 grid min-w-0 gap-6 lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
              <div className="min-w-0 border border-border bg-card p-5 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="flex size-11 items-center justify-center bg-secondary text-primary">
                      <Microscope className="size-5" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold">
                        Laboratory investigations
                      </h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        Browse tests by name or area of care.
                      </p>
                    </div>
                  </div>
                  <span className="bg-secondary px-2.5 py-1 text-xs font-semibold text-primary">
                    {filteredInvestigations.length} tests
                  </span>
                </div>
                <label className="mt-6 flex h-11 items-center gap-2.5 border border-input bg-background px-3 focus-within:ring-1 focus-within:ring-ring">
                  <Search className="size-4 shrink-0 text-muted-foreground" />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search an investigation…"
                    aria-label="Search laboratory investigations"
                    className="h-full w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                  />
                  {search && (
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label="Clear search"
                      className="size-7 shrink-0"
                      onClick={() => setSearch("")}
                    >
                      <X className="size-4" />
                    </Button>
                  )}
                </label>
                <div
                  className="-mx-1 mt-4 flex gap-2 overflow-x-auto px-1 pb-2"
                  aria-label="Filter by investigation area"
                >
                  {groups.map((group) => (
                    <Button
                      key={group}
                      type="button"
                      aria-pressed={selectedGroup === group}
                      variant={selectedGroup === group ? "default" : "outline"}
                      size="sm"
                      className="h-8 shrink-0 rounded-sm px-3 text-xs shadow-none"
                      onClick={() => {
                        setSelectedGroup(group);
                        setShowAllTests(false);
                      }}
                    >
                      {group}
                    </Button>
                  ))}
                </div>
                <div
                  className="mt-2 divide-y divide-border/80 border-t border-border"
                  aria-live="polite"
                >
                  {visibleInvestigations.map((investigation) => (
                    <div
                      key={investigation.name}
                      className="flex min-h-[48px] items-center justify-between gap-4 py-2.5"
                    >
                      <span className="text-sm font-medium">{investigation.name}</span>
                      <span className="shrink-0 text-[0.68rem] text-muted-foreground sm:text-xs">
                        {investigation.group}
                      </span>
                    </div>
                  ))}
                  {visibleInvestigations.length === 0 && (
                    <p className="py-9 text-center text-sm text-muted-foreground">
                      No tests found. Try another search.
                    </p>
                  )}
                </div>
                {!search && selectedGroup === "All" && filteredInvestigations.length > 12 && (
                  <Button
                    type="button"
                    variant="ghost"
                    className="mt-2 h-10 w-full gap-2 font-semibold text-primary hover:bg-secondary"
                    onClick={() => setShowAllTests((show) => !show)}
                  >
                    {showAllTests ? "Show fewer investigations" : "See all investigations"}
                    <ChevronDown
                      className={`size-4 transition-transform ${showAllTests ? "rotate-180" : ""}`}
                    />
                  </Button>
                )}
              </div>

              <div className="flex min-w-0 flex-col border border-border bg-card p-5 sm:p-7">
                <div className="flex items-center gap-3">
                  <span className="flex size-11 items-center justify-center bg-secondary text-primary">
                    <ScanLine className="size-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl font-semibold">Ultrasound scans</h3>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      Specialist imaging, personal attention.
                    </p>
                  </div>
                </div>
                <div className="mt-6 grid flex-1 content-start grid-cols-1 divide-y divide-border/80 border-t border-border sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {imagingServices.map((service) => (
                    <div
                      key={service.name}
                      className="flex min-h-[45px] items-center gap-2.5 py-2.5 text-sm"
                    >
                      <span className="size-1.5 shrink-0 rounded-full bg-brand-gold" />
                      <span className="font-medium">{service.name}</span>
                    </div>
                  ))}
                </div>
                <a
                  className="mt-6 inline-flex items-center gap-2 border-t border-border pt-5 text-sm font-semibold text-primary transition-colors hover:text-brand-forest"
                  href={whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Ask our team about a scan <ArrowRight className="size-4" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary py-14 text-primary-foreground sm:py-16">
          <div className="page-frame grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-gold">
                A more personal visit
              </p>
              <h2 className="mt-3 font-display text-3xl font-semibold leading-tight sm:text-[2.55rem]">
                A little more reassurance, at every step.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-primary-foreground/75">
                From your first question to your appointment, we make it easy to speak with our team
                and find the care that feels right.
              </p>
            </div>
            <Button
              asChild
              variant="secondary"
              className="h-12 w-fit gap-2 rounded-sm bg-background px-5 text-sm font-semibold text-primary shadow-none hover:bg-brand-paper"
            >
              <a href={`tel:${inquiryPhone}`}>
                Call 09046403013 <Phone className="size-4" />
              </a>
            </Button>
          </div>
        </section>

        <section id="packages" className="scroll-mt-5 py-16 sm:py-20 lg:py-24">
          <div className="page-frame">
            <div className="max-w-[640px]">
              <p className="text-xs font-bold uppercase tracking-[0.11em] text-primary">
                Care, thoughtfully put together
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-[2.7rem]">
                Health packages for <span className="text-brand-forest">life as it is.</span>
              </h2>
              <p className="mt-4 leading-7 text-muted-foreground">
                Focused screening and wellness checks for individuals, families, couples, and
                organisations.
              </p>
            </div>
            <div className="mt-9 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
              {healthPackages.map((item) => (
                <article key={item.name} className="bg-card p-5 sm:p-6">
                  <h3 className="font-display text-lg font-semibold leading-snug text-primary">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.detail}</p>
                </article>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Not sure which package fits?{" "}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-primary underline decoration-brand-gold underline-offset-4"
              >
                Ask our team for guidance.
              </a>
            </p>
          </div>
        </section>

        <section
          id="signature"
          className="scroll-mt-5 border-y border-border bg-secondary/65 py-16 sm:py-20 lg:py-24"
        >
          <div className="page-frame">
            <div className="grid gap-7 lg:grid-cols-[0.78fr_1.22fr] lg:items-end">
              <div>
                <p className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.11em] text-primary">
                  <Sparkles className="size-4 text-brand-gold" /> Mpearl Signature
                </p>
                <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-[2.65rem]">
                  More than a check-up. <span className="text-brand-forest">A deeper look.</span>
                </h2>
              </div>
              <p className="max-w-xl leading-7 text-muted-foreground lg:justify-self-end">
                Three considered levels of preventive screening, built around your health and the
                kind of reassurance you’re looking for.
              </p>
            </div>
            <div className="mt-9 grid gap-5 md:grid-cols-3">
              {signaturePackages.map((item, index) => (
                <article
                  key={item.name}
                  className={`flex flex-col border bg-card p-6 sm:p-7 ${index === 1 ? "border-brand-gold" : "border-border"}`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-bold uppercase tracking-[0.1em] text-primary">
                      {item.name}
                    </p>
                    {index === 1 && (
                      <span className="bg-brand-gold/20 px-2 py-1 text-[0.65rem] font-semibold text-primary">
                        Signature
                      </span>
                    )}
                  </div>
                  <p className="mt-4 min-h-12 font-display text-lg font-semibold leading-6">
                    {item.detail}
                  </p>
                  <ul className="mt-5 flex-1 space-y-3 border-t border-border pt-5">
                    {item.includes.map((line) => (
                      <li
                        key={line}
                        className="flex gap-2.5 text-sm leading-5 text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                        {line}
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    variant="outline"
                    className="mt-7 h-10 w-full gap-2 rounded-sm border-primary/25 bg-transparent font-semibold shadow-none hover:bg-secondary"
                  >
                    <a
                      href={enquiryUrl(
                        `Hello Mpearl, I would like to ask about the ${item.name} package.`,
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Ask about {item.name} <ArrowUpRight className="size-4" />
                    </a>
                  </Button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="scroll-mt-5 py-16 sm:py-20 lg:py-24">
          <div className="page-frame grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.11em] text-primary">
                A warm welcome awaits
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight text-primary sm:text-[2.65rem]">
                Let’s take care of <span className="text-brand-forest">your next step.</span>
              </h2>
              <p className="mt-4 max-w-md leading-7 text-muted-foreground">
                Reach out with a question, ask about an investigation, or speak to our team about
                planning your visit.
              </p>
              <Button asChild className="mt-7 h-12 gap-2 rounded-sm px-6 font-semibold shadow-none">
                <a href={whatsappUrl} target="_blank" rel="noreferrer">
                  Message Mpearl <ArrowUpRight className="size-4" />
                </a>
              </Button>
            </div>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              <a
                href="https://maps.google.com/?q=78+Bode+Thomas+Street+Surulere+Lagos"
                target="_blank"
                rel="noreferrer"
                className="group min-h-[172px] bg-card p-5 transition-colors hover:bg-secondary/50 sm:p-6"
              >
                <span className="flex size-10 items-center justify-center bg-secondary text-primary">
                  <MapPin className="size-5" />
                </span>
                <p className="mt-4 font-display font-semibold">
                  Come visit us{" "}
                  <ArrowUpRight className="ml-1 inline size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
                <p className="mt-1.5 text-sm leading-5 text-muted-foreground">
                  78 Bode Thomas Street, Surulere, Lagos. Opposite Chicken Republic, same building
                  with Konga, first floor.
                </p>
              </a>
              <div className="min-h-[172px] bg-card p-5 sm:p-6">
                <span className="flex size-10 items-center justify-center bg-secondary text-primary">
                  <Phone className="size-5" />
                </span>
                <p className="mt-4 font-display font-semibold">Call our team</p>
                <a
                  href="tel:09046403013"
                  className="mt-1.5 block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  09046403013
                </a>
                <a
                  href="tel:07060991444"
                  className="mt-1 block text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  07060991444
                </a>
              </div>
              <a
                href="mailto:mpearldiagnostics@gmail.com"
                className="group min-h-[140px] bg-card p-5 transition-colors hover:bg-secondary/50 sm:p-6"
              >
                <span className="flex size-10 items-center justify-center bg-secondary text-primary">
                  <Mail className="size-5" />
                </span>
                <p className="mt-4 font-display font-semibold">
                  Write to us{" "}
                  <ArrowUpRight className="ml-1 inline size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </p>
                <p className="mt-1.5 break-all text-sm text-muted-foreground">
                  mpearldiagnostics@gmail.com
                </p>
              </a>
              <div className="min-h-[140px] bg-card p-5 sm:p-6">
                <span className="flex size-10 items-center justify-center bg-secondary text-primary">
                  <Clock3 className="size-5" />
                </span>
                <p className="mt-4 font-display font-semibold">Plan your visit</p>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  Contact us to discuss your test or arrange a convenient visit.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-primary text-primary-foreground">
        <div className="page-frame flex flex-col gap-5 py-7 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" aria-label="Mpearl Diagnostics home">
            <img
              src={clinicLogo}
              alt="Mpearl Clinical Laboratory & Diagnostic Services"
              width={120}
              height={102}
              loading="lazy"
              className="rounded-md bg-white p-1"
            />
          </a>
          <p className="text-sm text-primary-foreground/75">
            Thoughtful diagnostic care, right here in Surulere.
          </p>
          <a
            href="#home"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-brand-gold"
          >
            Back to top <ArrowUpRight className="size-4" />
          </a>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="page-frame flex flex-col gap-2 py-4 text-xs text-primary-foreground/60 sm:flex-row sm:justify-between">
            <span>
              © {new Date().getFullYear()} Mpearl Clinical Laboratory & Diagnostics Services Ltd.
            </span>
            <span>78 Bode Thomas Street, Surulere, Lagos, Nigeria</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
