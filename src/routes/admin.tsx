import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/SiteHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStore } from "@/lib/mock-store";
import { Users, ShoppingBag, Sprout, Globe2 } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Agri Export Connect" },
      { name: "description", content: "Platform overview: farmers, buyers, listings, and export demand analytics." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const { crops, requests } = useStore();

  const uniqueFarmers = new Set(crops.map((c) => c.farmerName)).size;
  const uniqueBuyers = new Set(requests.map((r) => r.buyerName)).size;

  const byCrop = Object.entries(
    crops.reduce<Record<string, number>>((acc, c) => { acc[c.name] = (acc[c.name] || 0) + c.quantityTons; return acc; }, {})
  ).map(([name, tons]) => ({ name, tons }));

  const byGrade = ["A", "B", "C"].map((g) => ({ name: `Grade ${g}`, value: crops.filter((c) => c.grade === g).length }));

  const byCountry = Object.entries(
    requests.reduce<Record<string, number>>((acc, r) => { acc[r.country] = (acc[r.country] || 0) + r.quantityTons; return acc; }, {})
  ).map(([country, tons]) => ({ country, tons }));

  const colors = ["oklch(0.52 0.15 150)", "oklch(0.72 0.18 145)", "oklch(0.65 0.15 90)", "oklch(0.6 0.18 50)", "oklch(0.45 0.1 200)"];

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="animate-fade-in-up">
          <div className="text-xs font-semibold uppercase tracking-wider text-primary">Admin</div>
          <h1 className="text-3xl font-bold">Platform Dashboard</h1>
          <p className="text-sm text-muted-foreground">Live analytics across farmers, buyers, and exports.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: "Total Farmers", value: 1250 + uniqueFarmers, delta: "+12%" },
            { icon: ShoppingBag, label: "Total Buyers", value: 320 + uniqueBuyers, delta: "+8%" },
            { icon: Sprout, label: "Crop Listings", value: crops.length, delta: "+24%" },
            { icon: Globe2, label: "Export Requests", value: requests.length, delta: "+15%" },
          ].map((s, i) => (
            <Card key={s.label} className="hover-lift shadow-card animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <CardContent className="p-5">
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground shadow-card"><s.icon className="h-5 w-5" /></div>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">{s.delta}</span>
                </div>
                <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</div>
                <div className="text-3xl font-bold">{s.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <Card className="shadow-card">
            <CardHeader><CardTitle>Listings by Crop (tons)</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byCrop}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="tons" fill="oklch(0.52 0.15 150)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card">
            <CardHeader><CardTitle>Quality Grade Mix</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={byGrade} dataKey="value" nameKey="name" outerRadius={90} label>
                    {byGrade.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-card lg:col-span-2">
            <CardHeader><CardTitle>Export Demand by Country (tons)</CardTitle></CardHeader>
            <CardContent className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byCountry}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                  <XAxis dataKey="country" tick={{ fontSize: 12 }} />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Bar dataKey="tons" fill="oklch(0.72 0.18 145)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
