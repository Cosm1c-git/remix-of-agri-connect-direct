import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Sprout, Globe2, ShieldCheck, TrendingUp, Users, Package, ArrowRight, Leaf } from "lucide-react";
import heroImg from "@/assets/hero-farm.jpg";
import { useStore, COUNTRY_DEMAND } from "@/lib/mock-store";

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

function Home() {
  const { crops, requests } = useStore();
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto grid items-center gap-10 px-4 py-12 md:grid-cols-2 md:py-20">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border bg-secondary px-3 py-1 text-xs font-medium text-primary">
              <Leaf className="h-3.5 w-3.5" /> Farm-direct • Export-ready
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
              Agri Export <span className="bg-gradient-hero bg-clip-text text-transparent">Connect</span>
            </h1>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              A direct marketplace that links farmers to domestic and international
              buyers. Cut the middlemen, score your export readiness, and pool produce
              with peers to fulfill global orders.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild size="lg" className="bg-gradient-hero text-primary-foreground shadow-soft">
                <Link to="/farmer"><Sprout className="mr-2 h-4 w-4" /> Farmer Login</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/buyer"><Globe2 className="mr-2 h-4 w-4" /> Buyer Login</Link>
              </Button>
            </div>
          </div>
          <div className="relative">
            <img src={heroImg} alt="Aerial view of green farmland at golden hour" width={1600} height={1024} className="rounded-2xl shadow-soft" />
            <div className="absolute -bottom-4 -left-4 hidden rounded-xl border bg-card p-3 shadow-card md:block">
              <div className="text-xs text-muted-foreground">Live listings</div>
              <div className="text-2xl font-bold">{crops.length} crops</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y bg-gradient-soft py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Why Agri Export Connect</h2>
          <p className="mt-2 text-muted-foreground">Built for smallholder farmers and serious global buyers.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { icon: Users, title: "No Middlemen", body: "Direct farmer-to-buyer transactions. Keep more of what you grow." },
              { icon: ShieldCheck, title: "Export Readiness Score", body: "Instantly know how export-ready a listing is and how to improve it." },
              { icon: Package, title: "Smart Pooling", body: "Combine multiple farmers' produce to fulfill large international orders." },
              { icon: Globe2, title: "Country Demand", body: "See which countries are buying what — at a glance." },
              { icon: TrendingUp, title: "Better Profits", body: "Premium pricing for certified, well-packaged, high-grade produce." },
              { icon: Leaf, title: "Sustainable Trade", body: "Transparent supply chain from farm gate to port." },
            ].map((f) => (
              <Card key={f.title} className="shadow-card">
                <CardContent className="p-5">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary">
                    <f.icon className="h-5 w-5" />
                  </div>
                  <div className="font-semibold">{f.title}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 rounded-2xl bg-gradient-hero p-8 text-primary-foreground md:grid-cols-4">
            {[
              { v: "1,250+", l: "Registered Farmers" },
              { v: "320+", l: "Verified Buyers" },
              { v: `${crops.length}`, l: "Active Listings" },
              { v: `${requests.length}`, l: "Open Export Requests" },
            ].map((s) => (
              <div key={s.l} className="text-center">
                <div className="text-3xl font-bold md:text-4xl">{s.v}</div>
                <div className="mt-1 text-sm opacity-90">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Country demand */}
      <section className="border-t bg-gradient-soft py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold">Export markets in demand</h2>
          <p className="mt-2 text-muted-foreground">Real-time signals of what international buyers are sourcing.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {COUNTRY_DEMAND.map((c) => (
              <Card key={c.country} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="text-2xl">{c.flag}</div>
                    <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-primary">{c.trend}</span>
                  </div>
                  <div className="mt-2 font-semibold">{c.country}</div>
                  <div className="mt-1 text-xs text-muted-foreground">{c.crops.join(", ")}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-16">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">Get in touch</h2>
            <p className="mt-2 text-muted-foreground">Questions about listings, exports, or pooling? Reach out.</p>
            <ul className="mt-6 space-y-2 text-sm">
              <li><span className="font-medium">Email:</span> hello@agriexportconnect.org</li>
              <li><span className="font-medium">Phone:</span> +91 98765 43210</li>
              <li><span className="font-medium">Office:</span> Agri Innovation Hub, Bengaluru, India</li>
            </ul>
          </div>
          <Card className="shadow-card">
            <CardContent className="space-y-3 p-6">
              <h3 className="text-lg font-semibold">Ready to start?</h3>
              <p className="text-sm text-muted-foreground">Pick a side and explore the prototype.</p>
              <div className="flex flex-wrap gap-2">
                <Button asChild><Link to="/farmer">I'm a Farmer <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                <Button asChild variant="outline"><Link to="/buyer">I'm a Buyer <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Agri Export Connect — A first-year engineering interdisciplinary project.
        </div>
      </footer>
    </div>
  );
}
