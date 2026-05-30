import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useStore, poolForRequest } from "@/lib/mock-store";
import { Combine } from "lucide-react";

export const Route = createFileRoute("/pooling")({
  head: () => ({
    meta: [
      { title: "Smart Export Pooling — Agri Export Connect" },
      { name: "description", content: "Combine multiple farmers' produce to fulfill large international export orders." },
    ],
  }),
  component: PoolingPage,
});

function PoolingPage() {
  const { crops, requests } = useStore();
  const [crop, setCrop] = useState("Turmeric");
  const [need, setNeed] = useState(50);

  const result = useMemo(() => poolForRequest(crops, crop, need), [crops, crop, need]);
  const pct = Math.min(100, Math.round((result.totalPooled / Math.max(need, 1)) * 100));

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground"><Combine className="h-5 w-5" /></div>
          <div>
            <h1 className="text-2xl font-bold">Smart Export Pooling</h1>
            <p className="text-sm text-muted-foreground">Combine multiple farmers to fulfill a single large order.</p>
          </div>
        </div>

        <Card className="mb-6 shadow-card">
          <CardHeader><CardTitle>Buyer Request</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-3">
            <div className="space-y-1.5"><Label>Crop</Label><Input value={crop} onChange={(e) => setCrop(e.target.value)} /></div>
            <div className="space-y-1.5"><Label>Quantity needed (tons)</Label><Input type="number" value={need} onChange={(e) => setNeed(Number(e.target.value))} /></div>
            <div className="flex flex-wrap gap-2 self-end">
              {requests.slice(0, 3).map((r) => (
                <Button key={r.id} variant="outline" size="sm" onClick={() => { setCrop(r.cropName); setNeed(r.quantityTons); }}>
                  {r.cropName} {r.quantityTons}t
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className="shadow-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Total Pooled</CardTitle></CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{result.totalPooled}t</div>
              <Progress value={pct} className="mt-2 h-2" />
              <div className="mt-1 text-xs text-muted-foreground">{pct}% of {need}t requested</div>
            </CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Estimated Order Value</CardTitle></CardHeader>
            <CardContent><div className="text-3xl font-bold">${result.totalValue.toLocaleString()}</div></CardContent>
          </Card>
          <Card className="shadow-card">
            <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">Shortfall</CardTitle></CardHeader>
            <CardContent><div className={`text-3xl font-bold ${result.shortfall > 0 ? "text-destructive" : "text-primary"}`}>{result.shortfall}t</div></CardContent>
          </Card>
        </div>

        <Card className="mt-6 shadow-card">
          <CardHeader><CardTitle>Participating Farmers & Profit Share</CardTitle></CardHeader>
          <CardContent>
            {result.selected.length === 0 ? (
              <div className="text-sm text-muted-foreground">No matching listings.</div>
            ) : (
              <div className="space-y-2">
                {result.selected.map(({ crop: c, allocated }) => {
                  const value = allocated * c.pricePerTon;
                  const share = result.totalValue ? Math.round((value / result.totalValue) * 100) : 0;
                  return (
                    <div key={c.id} className="rounded-lg border p-3">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <div className="font-semibold">{c.farmerName} <span className="text-xs font-normal text-muted-foreground">• {c.region}</span></div>
                          <div className="text-xs text-muted-foreground">Grade {c.grade} • {c.packaging} {c.certified && "• Certified"}</div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="secondary">{allocated}t allocated</Badge>
                          <Badge variant="outline">${value.toLocaleString()}</Badge>
                          <Badge className="bg-primary text-primary-foreground">{share}% share</Badge>
                        </div>
                      </div>
                      <Progress value={share} className="mt-2 h-1.5" />
                    </div>
                  );
                })}
                {result.shortfall > 0 && (
                  <div className="mt-3 rounded-md border border-dashed p-3 text-sm text-muted-foreground">
                    Need {result.shortfall} more tons to fulfill. Invite more farmers from the region to list.
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
