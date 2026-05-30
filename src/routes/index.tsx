import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Sprout, Globe2, ShieldCheck, TrendingUp, Users, Package, ArrowRight, Leaf,
  Truck, BarChart3, Sparkles, Star, CheckCircle2, Quote,
} from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import { useStore, COUNTRY_DEMAND } from "@/lib/mock-store";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agri Export Connect — Farm to World Marketplace" },
      { name: "description", content: "Direct-to-buyer marketplace helping farmers sell crops domestically and globally — no middlemen, better profits." },
      { property: "og:title", content: "Agri Export Connect" },
      { property: "og:description", content: "Direct-to-buyer agricultural marketplace with export readiness scoring and smart pooling." },
    ],
  }),
  component: Home,
});

const trendData = [
  { m: "Jan", v: 24 }, { m: "Feb", v: 32 }, { m: "Mar", v: 28 }, { m: "Apr", v: 45 },
  { m: "May", v: 52 }, { m: "Jun", v: 61 }, { m: "Jul", v: 74 }, { m: "Aug", v: 88 },
];

function Home() {
  const { crops, requests } = useStore();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="grid-pattern absolute inset-0 opacity-60" aria-hidden />
        <div className="container relative mx-auto grid items-center gap-10 px-4 py-14 md:grid-cols-2 md:py-24">
          <div className="animate-fade-in-up">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-xs font-medium text-primary shadow-card backdrop-blur">
              <Sparkles className="h-3.5 w-3.5" /> Farm-direct • Export-ready • AI scored
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              From the field to the <span className="text-gradient">global market</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              Agri Export Connect links farmers directly to domestic and international
              buyers. Skip middlemen, score your export readiness, and pool produce
              with peers to fulfill large global orders.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-95">
                <Link to="/farmer"><Sprout className="mr-2 h-4 w-4" /> Farmer Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/buyer"><Globe2 className="mr-2 h-4 w-4" /> Buyer Login</Link>
              </Button>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> No middlemen</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> APEDA-aligned</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 className="h-3.5 w-3.5 text-primary" /> 12+ export markets</span>
            </div>
          </div>

          <div className="relative animate-fade-in-up delay-200">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-hero opacity-20 blur-2xl" />
            <img src={heroImg} alt="Aerial view of green farmland at golden hour" width={1600} height={1024} className="rounded-2xl shadow-soft glow-ring" />

            {/* Floating stat card */}
            <div className="absolute -bottom-6 -left-4 hidden rounded-xl border bg-card p-3 shadow-soft md:flex md:items-center md:gap-3 animate-float">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                <TrendingUp className="h-5 w-5" />
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Avg. farmer profit</div>
                <div className="text-lg font-bold text-primary">+38%</div>
              </div>
            </div>

            {/* Floating score card */}
            <div className="absolute -right-3 top-6 hidden rounded-xl border bg-card p-3 shadow-soft md:block animate-float" style={{ animationDelay: "1s" }}>
              <div className="text-[10px] uppercase tracking-wide text-muted-foreground">Export Score</div>
              <div className="text-2xl font-bold text-gradient">92/100</div>
              <div className="mt-1 h-1.5 w-32 rounded-full bg-secondary">
                <div className="h-full w-[92%] rounded-full bg-gradient-hero" />
              </div>
            </div>
          </div>
        </div>

        {/* Logo strip */}
        <div className="border-y bg-card/50 backdrop-blur">
          <div className="container mx-auto flex flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 py-5 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            <span>Trusted across</span>
            {["APEDA", "NABARD", "FPO Network", "AgriStack", "Spices Board", "ICAR"].map((b) => (
              <span key={b} className="opacity-70 hover:opacity-100 transition">{b}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gradient-soft py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Platform</div>
            <h2 className="text-3xl font-bold md:text-4xl">Everything you need to go global</h2>
            <p className="mt-3 text-muted-foreground">Built for smallholder farmers and serious international buyers — on one transparent platform.</p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { icon: Users, title: "No Middlemen", body: "Direct farmer-to-buyer transactions. Keep more of what you grow." },
              { icon: ShieldCheck, title: "Export Readiness Score", body: "Instantly know how export-ready a listing is and how to improve it." },
              { icon: Package, title: "Smart Pooling", body: "Combine multiple farmers' produce to fulfill large international orders." },
              { icon: Globe2, title: "Country Demand", body: "See which countries are buying what — at a glance." },
              { icon: TrendingUp, title: "Better Profits", body: "Premium pricing for certified, well-packaged, high-grade produce." },
              { icon: Leaf, title: "Sustainable Trade", body: "Transparent supply chain from farm gate to port." },
            ].map((f, i) => (
              <Card key={f.title} className="hover-lift border-border/60 shadow-card animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-card">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="text-lg font-semibold">{f.title}</div>
                  <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">How it works</div>
            <h2 className="text-3xl font-bold md:text-4xl">Three steps to export</h2>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {[
              { step: "01", icon: Sprout, title: "List your crop", body: "Farmers add crop details — quantity, grade, packaging, certification." },
              { step: "02", icon: BarChart3, title: "Score & match", body: "Get an instant Export Readiness Score. Buyers discover matching produce." },
              { step: "03", icon: Truck, title: "Pool & ship", body: "Smart pooling combines listings to fulfill large international orders." },
            ].map((s, i) => (
              <div key={s.step} className="relative rounded-2xl border bg-card p-6 shadow-card hover-lift animate-fade-in-up" style={{ animationDelay: `${i * 120}ms` }}>
                <div className="absolute -top-3 left-6 rounded-full bg-gradient-hero px-3 py-0.5 text-xs font-bold text-primary-foreground">{s.step}</div>
                <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary"><s.icon className="h-5 w-5" /></div>
                <div className="font-semibold">{s.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats with chart */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 rounded-3xl bg-gradient-hero p-8 text-primary-foreground shadow-soft md:grid-cols-5 md:p-10">
            <div className="md:col-span-2">
              <div className="text-xs font-medium uppercase tracking-wider opacity-80">By the numbers</div>
              <h3 className="mt-1 text-2xl font-bold md:text-3xl">Real impact, in real time.</h3>
              <p className="mt-2 text-sm opacity-90">Every listing strengthens India's agri-export pipeline.</p>
              <div className="mt-6 grid grid-cols-2 gap-4">
                {[
                  { v: "1,250+", l: "Farmers" },
                  { v: "320+", l: "Buyers" },
                  { v: `${crops.length}`, l: "Listings" },
                  { v: `${requests.length}`, l: "Requests" },
                ].map((s, i) => (
                  <div key={s.l} className="animate-count-up" style={{ animationDelay: `${i * 120}ms` }}>
                    <div className="text-3xl font-bold md:text-4xl">{s.v}</div>
                    <div className="mt-0.5 text-xs opacity-85">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-card/10 p-4 backdrop-blur md:col-span-3">
              <div className="mb-2 flex items-center justify-between text-xs">
                <span className="font-medium opacity-90">Export volume (tons)</span>
                <span className="rounded-full bg-card/20 px-2 py-0.5 font-medium">+42% YoY</span>
              </div>
              <div className="h-48">
                <ResponsiveContainer>
                  <AreaChart data={trendData}>
                    <defs>
                      <linearGradient id="g" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="white" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="white" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="m" stroke="white" tick={{ fontSize: 11, fill: "white", opacity: 0.7 }} axisLine={false} tickLine={false} />
                    <YAxis hide />
                    <Tooltip contentStyle={{ background: "white", border: "none", borderRadius: 8, fontSize: 12 }} />
                    <Area type="monotone" dataKey="v" stroke="white" strokeWidth={2} fill="url(#g)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Country demand */}
      <section className="border-t bg-gradient-soft py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Markets</div>
            <h2 className="text-3xl font-bold md:text-4xl">Export demand, today</h2>
            <p className="mt-3 text-muted-foreground">Live signals on what international buyers are sourcing.</p>
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {COUNTRY_DEMAND.map((c, i) => (
              <Card key={c.country} className="hover-lift shadow-card animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{c.flag}</div>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{c.trend}</span>
                  </div>
                  <div className="mt-3 font-semibold">{c.country}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.crops.join(" · ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-primary">Voices</div>
            <h2 className="text-3xl font-bold md:text-4xl">Trusted by farmers & buyers</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              { quote: "I sold 18 tons of turmeric straight to a Dubai buyer. My margin nearly doubled.", who: "Ravi Kumar", role: "Farmer · Karnataka" },
              { quote: "Pooling let us fulfill a 50-ton basmati order from five smallholders in one click.", who: "EU Foods Ltd.", role: "Buyer · Germany" },
              { quote: "The Export Score told me exactly what to fix — packaging and certification.", who: "Lakshmi Devi", role: "Farmer · Andhra" },
            ].map((t, i) => (
              <Card key={t.who} className="hover-lift shadow-card animate-fade-in-up" style={{ animationDelay: `${i * 100}ms` }}>
                <CardContent className="p-6">
                  <Quote className="h-6 w-6 text-primary/40" />
                  <p className="mt-3 text-sm">{t.quote}</p>
                  <div className="mt-4 flex items-center gap-3 border-t pt-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-hero text-sm font-bold text-primary-foreground">
                      {t.who[0]}
                    </div>
                    <div>
                      <div className="text-sm font-semibold">{t.who}</div>
                      <div className="text-xs text-muted-foreground">{t.role}</div>
                    </div>
                    <div className="ml-auto flex">
                      {[0,1,2,3,4].map((s) => <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl border bg-card p-8 shadow-soft md:p-12">
            <div className="grid-pattern absolute inset-0 opacity-50" aria-hidden />
            <div className="relative grid items-center gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold md:text-4xl">Ready to export smarter?</h2>
                <p className="mt-3 text-muted-foreground">Pick a side and explore the prototype — no signup needed.</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button asChild size="lg" className="bg-gradient-hero shadow-soft"><Link to="/farmer">I'm a Farmer <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
                  <Button asChild size="lg" variant="outline"><Link to="/buyer">I'm a Buyer <ArrowRight className="ml-1.5 h-4 w-4" /></Link></Button>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl border bg-card/80 p-4 shadow-card backdrop-blur">
                  <div className="text-xs text-muted-foreground">Email</div>
                  <div className="font-medium">hello@agriexportconnect.org</div>
                </div>
                <div className="rounded-xl border bg-card/80 p-4 shadow-card backdrop-blur">
                  <div className="text-xs text-muted-foreground">Phone</div>
                  <div className="font-medium">+91 98765 43210</div>
                </div>
                <div className="rounded-xl border bg-card/80 p-4 shadow-card backdrop-blur">
                  <div className="text-xs text-muted-foreground">Office</div>
                  <div className="font-medium">Agri Innovation Hub, Bengaluru</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3 px-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-hero text-primary-foreground"><Sprout className="h-4 w-4" /></div>
            <span>© {new Date().getFullYear()} Agri Export Connect</span>
          </div>
          <div>A first-year engineering interdisciplinary project.</div>
        </div>
      </footer>
    </div>
  );
}
