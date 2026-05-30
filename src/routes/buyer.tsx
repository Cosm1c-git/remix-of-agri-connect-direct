import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useStore, store, calcExportScore } from "@/lib/mock-store";
import { toast } from "sonner";
import { Globe2, LogOut, Search } from "lucide-react";

export const Route = createFileRoute("/buyer")({
  head: () => ({
    meta: [
      { title: "Buyer Dashboard — Agri Export Connect" },
      { name: "description", content: "Browse certified crops directly from farmers and place export requests." },
    ],
  }),
  component: BuyerPage,
});

function BuyerPage() {
  const s = useStore();
  if (!s.currentBuyer) return <BuyerLogin />;
  return <BuyerDashboard />;
}

function BuyerLogin() {
  const [name, setName] = useState("");
  const [country, setCountry] = useState("UAE");
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto flex max-w-md px-4 py-12">
        <Card className="w-full shadow-card">
          <CardHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">
              <Globe2 className="h-6 w-6" />
            </div>
            <CardTitle className="text-center">Buyer Login</CardTitle>
            <p className="text-center text-sm text-muted-foreground">Demo login — no password required.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5"><Label>Company Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Dubai Spice Co." /></div>
            <div className="space-y-1.5">
              <Label>Country</Label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {["UAE", "Germany", "USA", "Japan", "UK", "India"].map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full bg-gradient-hero" onClick={() => {
              if (!name) return toast.error("Enter company name");
              store.loginBuyer(name, country);
              toast.success(`Welcome, ${name}`);
            }}>Continue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function BuyerDashboard() {
  const s = useStore();
  const buyer = s.currentBuyer!;
  const [q, setQ] = useState("");
  const [gradeFilter, setGradeFilter] = useState<string>("all");
  const [certifiedOnly, setCertifiedOnly] = useState(false);

  const filtered = useMemo(() => s.crops.filter((c) => {
    if (q && !c.name.toLowerCase().includes(q.toLowerCase()) && !c.region.toLowerCase().includes(q.toLowerCase())) return false;
    if (gradeFilter !== "all" && c.grade !== gradeFilter) return false;
    if (certifiedOnly && !c.certified) return false;
    return true;
  }), [s.crops, q, gradeFilter, certifiedOnly]);

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Buyer Dashboard</div>
            <h1 className="text-2xl font-bold">{buyer.name}</h1>
            <div className="text-sm text-muted-foreground">{buyer.country}</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => store.logoutBuyer()}><LogOut className="mr-1.5 h-4 w-4" /> Logout</Button>
        </div>

        <Card className="mb-6 shadow-card">
          <CardContent className="grid gap-3 p-4 md:grid-cols-4">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input className="pl-9" placeholder="Search crops or regions…" value={q} onChange={(e) => setQ(e.target.value)} />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger><SelectValue placeholder="Grade" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Grades</SelectItem>
                <SelectItem value="A">Grade A</SelectItem>
                <SelectItem value="B">Grade B</SelectItem>
                <SelectItem value="C">Grade C</SelectItem>
              </SelectContent>
            </Select>
            <Button variant={certifiedOnly ? "default" : "outline"} onClick={() => setCertifiedOnly((v) => !v)}>
              {certifiedOnly ? "✓ Certified only" : "Certified only"}
            </Button>
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => {
            const { score } = calcExportScore(c);
            return (
              <Card key={c.id} className="shadow-card transition hover:shadow-soft">
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{c.name}</CardTitle>
                    <Badge className="bg-primary text-primary-foreground">{score}/100</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{c.region}</div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div><div className="text-muted-foreground">Quantity</div><div className="font-medium">{c.quantityTons}t</div></div>
                    <div><div className="text-muted-foreground">Grade</div><div className="font-medium">{c.grade}</div></div>
                    <div><div className="text-muted-foreground">Packaging</div><div className="font-medium">{c.packaging}</div></div>
                    <div><div className="text-muted-foreground">Price/Ton</div><div className="font-medium">${c.pricePerTon}</div></div>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {c.certified && <Badge variant="secondary">Certified</Badge>}
                    <Badge variant="outline">Harvest {c.harvestDate}</Badge>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full bg-gradient-hero" size="sm">View & Request</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader><DialogTitle>{c.name} — {c.farmerName}</DialogTitle></DialogHeader>
                      <div className="space-y-2 text-sm">
                        <div><b>Region:</b> {c.region}</div>
                        <div><b>Quantity:</b> {c.quantityTons} tons</div>
                        <div><b>Grade:</b> {c.grade} • <b>Packaging:</b> {c.packaging}</div>
                        <div><b>Certified:</b> {c.certified ? "Yes" : "No"}</div>
                        <div><b>Harvest:</b> {c.harvestDate}</div>
                        <div><b>Price:</b> ${c.pricePerTon}/ton</div>
                      </div>
                      <PurchaseForm cropName={c.name} buyer={buyer} defaultQty={c.quantityTons} />
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            );
          })}
          {filtered.length === 0 && <div className="col-span-full text-center text-muted-foreground">No matching crops.</div>}
        </div>

        {/* Buyer's requests */}
        <div className="mt-10">
          <h2 className="mb-3 text-xl font-semibold">Your Requests</h2>
          <div className="grid gap-3 md:grid-cols-2">
            {s.requests.filter((r) => r.buyerName === buyer.name).map((r) => (
              <Card key={r.id} className="shadow-card">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{r.cropName} — {r.quantityTons}t</div>
                      <div className="text-xs text-muted-foreground">{r.country} • {new Date(r.createdAt).toLocaleString()}</div>
                    </div>
                    <Badge>{r.status}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
            {s.requests.filter((r) => r.buyerName === buyer.name).length === 0 && (
              <div className="text-sm text-muted-foreground">No requests yet.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function PurchaseForm({ cropName, buyer, defaultQty }: { cropName: string; buyer: { id: string; name: string; country: string }; defaultQty: number }) {
  const [qty, setQty] = useState(defaultQty);
  return (
    <div className="mt-3 flex items-end gap-2 border-t pt-3">
      <div className="flex-1 space-y-1.5">
        <Label>Quantity needed (tons)</Label>
        <Input type="number" value={qty} onChange={(e) => setQty(Number(e.target.value))} />
      </div>
      <Button className="bg-gradient-hero" onClick={() => {
        store.addRequest({ buyerId: buyer.id, buyerName: buyer.name, cropName, quantityTons: qty, country: buyer.country });
        toast.success("Purchase request placed");
      }}>Place Request</Button>
    </div>
  );
}
