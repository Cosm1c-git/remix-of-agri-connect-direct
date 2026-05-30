import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ExportScoreCard } from "@/components/ExportScoreCard";
import { useStore, store, type Grade, calcExportScore } from "@/lib/mock-store";
import { toast } from "sonner";
import { LogOut, Sprout } from "lucide-react";

export const Route = createFileRoute("/farmer")({
  head: () => ({
    meta: [
      { title: "Farmer Dashboard — Agri Export Connect" },
      { name: "description", content: "List your crops, check export readiness, and reach global buyers directly." },
    ],
  }),
  component: FarmerPage,
});

function FarmerPage() {
  const s = useStore();
  if (!s.currentFarmer) return <FarmerLogin />;
  return <FarmerDashboard />;
}

function FarmerLogin() {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto flex max-w-md flex-col px-4 py-12">
        <Card className="shadow-card">
          <CardHeader>
            <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-hero text-primary-foreground">
              <Sprout className="h-6 w-6" />
            </div>
            <CardTitle className="text-center">Farmer Login</CardTitle>
            <p className="text-center text-sm text-muted-foreground">Demo login — no password required.</p>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1.5"><Label>Full Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ravi Kumar" /></div>
            <div className="space-y-1.5"><Label>Region</Label><Input value={region} onChange={(e) => setRegion(e.target.value)} placeholder="Karnataka, IN" /></div>
            <Button className="w-full bg-gradient-hero" onClick={() => {
              if (!name || !region) return toast.error("Enter name and region");
              store.loginFarmer(name, region);
              toast.success(`Welcome, ${name}`);
            }}>Continue</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FarmerDashboard() {
  const s = useStore();
  const farmer = s.currentFarmer!;
  const myCrops = s.crops.filter((c) => c.farmerName === farmer.name);

  const [name, setName] = useState("Turmeric");
  const [qty, setQty] = useState(10);
  const [date, setDate] = useState("");
  const [grade, setGrade] = useState<Grade>("A");
  const [packaging, setPackaging] = useState("Jute Sacks");
  const [certified, setCertified] = useState(false);
  const [price, setPrice] = useState(2200);

  const handleSubmit = () => {
    if (!name || !date || qty <= 0) return toast.error("Fill all fields");
    store.addCrop({ farmerId: farmer.id, farmerName: farmer.name, region: farmer.region, name, quantityTons: Number(qty), harvestDate: date, grade, packaging, certified, pricePerTon: Number(price) });
    toast.success("Crop listed");
  };

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <div className="text-sm text-muted-foreground">Farmer Dashboard</div>
            <h1 className="text-2xl font-bold">Welcome, {farmer.name}</h1>
            <div className="text-sm text-muted-foreground">{farmer.region}</div>
          </div>
          <Button variant="outline" size="sm" onClick={() => store.logoutFarmer()}><LogOut className="mr-1.5 h-4 w-4" /> Logout</Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="shadow-card lg:col-span-2">
            <CardHeader><CardTitle>Add Crop Listing</CardTitle></CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1.5"><Label>Crop Name</Label><Input value={name} onChange={(e) => setName(e.target.value)} /></div>
              <div className="space-y-1.5"><Label>Quantity (tons)</Label><Input type="number" min={0} value={qty} onChange={(e) => setQty(Number(e.target.value))} /></div>
              <div className="space-y-1.5"><Label>Expected Harvest Date</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
              <div className="space-y-1.5">
                <Label>Quality Grade</Label>
                <Select value={grade} onValueChange={(v) => setGrade(v as Grade)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A">A — Premium</SelectItem>
                    <SelectItem value="B">B — Standard</SelectItem>
                    <SelectItem value="C">C — Basic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Packaging</Label>
                <Select value={packaging} onValueChange={setPackaging}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Jute Sacks">Jute Sacks</SelectItem>
                    <SelectItem value="PP Woven Bags">PP Woven Bags</SelectItem>
                    <SelectItem value="Cartons">Cartons</SelectItem>
                    <SelectItem value="Vacuum Pack">Vacuum Pack</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5"><Label>Price / Ton (USD)</Label><Input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} /></div>
              <div className="flex items-center justify-between rounded-md border p-3 md:col-span-2">
                <div>
                  <Label>Certification Status</Label>
                  <p className="text-xs text-muted-foreground">Organic / APEDA / Fairtrade</p>
                </div>
                <Switch checked={certified} onCheckedChange={setCertified} />
              </div>
              <div className="md:col-span-2">
                <Button className="bg-gradient-hero" onClick={handleSubmit}>Submit Listing</Button>
              </div>
            </CardContent>
          </Card>

          <ExportScoreCard grade={grade} quantityTons={qty} packaging={packaging} certified={certified} />
        </div>

        <div className="mt-8">
          <h2 className="mb-3 text-xl font-semibold">Your Listings</h2>
          {myCrops.length === 0 ? (
            <Card className="shadow-card"><CardContent className="p-8 text-center text-muted-foreground">No listings yet — submit your first crop above.</CardContent></Card>
          ) : (
            <div className="grid gap-3 md:grid-cols-2">
              {myCrops.map((c) => {
                const { score } = calcExportScore(c);
                return (
                  <Card key={c.id} className="shadow-card">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{c.name}</div>
                          <div className="text-sm text-muted-foreground">{c.quantityTons}t • Grade {c.grade} • {c.packaging}</div>
                          <div className="text-xs text-muted-foreground">Harvest: {c.harvestDate}</div>
                        </div>
                        <Badge className="bg-primary text-primary-foreground">{score}/100</Badge>
                      </div>
                      <div className="mt-2 flex gap-2">
                        {c.certified && <Badge variant="secondary">Certified</Badge>}
                        <Badge variant="outline">${c.pricePerTon}/t</Badge>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
