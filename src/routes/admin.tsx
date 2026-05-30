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
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">Platform analytics and overview.</p>

        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {[
            { icon: Users, label: "Total Farmers", value: 1250 + uniqueFarmers },
            { icon: ShoppingBag, label: "Total Buyers", value: 320 + uniqueBuyers },
            { icon: Sprout, label: "Crop Listings", value: crops.length },
            { icon: Globe2, label: "Export Requests", value: requests.length },
          ].map((s) => (
            <Card key={s.label} className="shadow-card">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-primary"><s.icon className="h-5 w-5" /></div>
                <div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                  <div className="text-2xl font-bold">{s.value}</div>
                </div>
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
