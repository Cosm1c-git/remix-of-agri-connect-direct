// Simple in-memory + localStorage mock data store for the prototype.
import { useEffect, useState } from "react";

export type Grade = "A" | "B" | "C";

export interface Crop {
  id: string;
  farmerId: string;
  farmerName: string;
  region: string;
  name: string;
  quantityTons: number;
  harvestDate: string;
  grade: Grade;
  packaging: string;
  certified: boolean;
  pricePerTon: number;
  image?: string;
  createdAt: number;
}

export interface PurchaseRequest {
  id: string;
  buyerId: string;
  buyerName: string;
  cropName: string;
  quantityTons: number;
  country: string;
  status: "pending" | "pooled" | "fulfilled";
  createdAt: number;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  createdAt: number;
  read?: boolean;
}

const KEY = "agri-export-connect:v1";

interface Store {
  crops: Crop[];
  requests: PurchaseRequest[];
  notifications: Notification[];
  currentFarmer: { id: string; name: string; region: string } | null;
  currentBuyer: { id: string; name: string; country: string } | null;
}

const seedCrops: Crop[] = [
  { id: "c1", farmerId: "f1", farmerName: "Ravi Kumar", region: "Karnataka, IN", name: "Turmeric", quantityTons: 15, harvestDate: "2026-08-12", grade: "A", packaging: "Jute Sacks", certified: true, pricePerTon: 2400, createdAt: Date.now() - 86400000 * 5 },
  { id: "c2", farmerId: "f2", farmerName: "Anita Singh", region: "Punjab, IN", name: "Basmati Rice", quantityTons: 30, harvestDate: "2026-09-01", grade: "A", packaging: "PP Woven Bags", certified: true, pricePerTon: 1800, createdAt: Date.now() - 86400000 * 4 },
  { id: "c3", farmerId: "f3", farmerName: "Mahesh Patel", region: "Gujarat, IN", name: "Turmeric", quantityTons: 20, harvestDate: "2026-08-20", grade: "B", packaging: "Jute Sacks", certified: false, pricePerTon: 2100, createdAt: Date.now() - 86400000 * 3 },
  { id: "c4", farmerId: "f4", farmerName: "Lakshmi Devi", region: "Andhra, IN", name: "Red Chilli", quantityTons: 12, harvestDate: "2026-07-30", grade: "A", packaging: "Cartons", certified: true, pricePerTon: 3200, createdAt: Date.now() - 86400000 * 2 },
  { id: "c5", farmerId: "f5", farmerName: "Suresh Reddy", region: "Telangana, IN", name: "Turmeric", quantityTons: 15, harvestDate: "2026-08-18", grade: "A", packaging: "Vacuum Pack", certified: true, pricePerTon: 2500, createdAt: Date.now() - 86400000 * 1 },
  { id: "c6", farmerId: "f6", farmerName: "Joseph Thomas", region: "Kerala, IN", name: "Black Pepper", quantityTons: 8, harvestDate: "2026-10-05", grade: "A", packaging: "Vacuum Pack", certified: true, pricePerTon: 6500, createdAt: Date.now() },
];

const seedRequests: PurchaseRequest[] = [
  { id: "r1", buyerId: "b1", buyerName: "Dubai Spice Co.", cropName: "Turmeric", quantityTons: 50, country: "UAE", status: "pending", createdAt: Date.now() - 86400000 },
  { id: "r2", buyerId: "b2", buyerName: "EU Foods Ltd.", cropName: "Basmati Rice", quantityTons: 25, country: "Germany", status: "pending", createdAt: Date.now() - 3600000 },
];

const seedNotifications: Notification[] = [
  { id: "n1", title: "New Buyer Request", body: "Dubai Spice Co. requested 50 tons of Turmeric.", createdAt: Date.now() - 3600000 },
  { id: "n2", title: "Export Tip", body: "Germany demand for organic Basmati is up 18% this quarter.", createdAt: Date.now() - 7200000 },
];

function load(): Store {
  if (typeof window === "undefined") {
    return { crops: seedCrops, requests: seedRequests, notifications: seedNotifications, currentFarmer: null, currentBuyer: null };
  }
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const initial: Store = { crops: seedCrops, requests: seedRequests, notifications: seedNotifications, currentFarmer: null, currentBuyer: null };
  localStorage.setItem(KEY, JSON.stringify(initial));
  return initial;
}

let state: Store = load();
const listeners = new Set<() => void>();

function save() {
  if (typeof window !== "undefined") localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

export const store = {
  get: () => state,
  reset: () => {
    state = { crops: seedCrops, requests: seedRequests, notifications: seedNotifications, currentFarmer: null, currentBuyer: null };
    save();
  },
  addCrop: (c: Omit<Crop, "id" | "createdAt">) => {
    const crop: Crop = { ...c, id: `c${Date.now()}`, createdAt: Date.now() };
    state = { ...state, crops: [crop, ...state.crops] };
    state.notifications = [{ id: `n${Date.now()}`, title: "New Crop Listed", body: `${crop.farmerName} listed ${crop.quantityTons}t of ${crop.name}.`, createdAt: Date.now() }, ...state.notifications];
    save();
    return crop;
  },
  addRequest: (r: Omit<PurchaseRequest, "id" | "createdAt" | "status">) => {
    const req: PurchaseRequest = { ...r, id: `r${Date.now()}`, status: "pending", createdAt: Date.now() };
    state = { ...state, requests: [req, ...state.requests] };
    state.notifications = [{ id: `n${Date.now()}`, title: "New Buyer Request", body: `${req.buyerName} requested ${req.quantityTons}t of ${req.cropName}.`, createdAt: Date.now() }, ...state.notifications];
    save();
    return req;
  },
  loginFarmer: (name: string, region: string) => {
    state = { ...state, currentFarmer: { id: `f${Date.now()}`, name, region } };
    save();
  },
  loginBuyer: (name: string, country: string) => {
    state = { ...state, currentBuyer: { id: `b${Date.now()}`, name, country } };
    save();
  },
  logoutFarmer: () => { state = { ...state, currentFarmer: null }; save(); },
  logoutBuyer: () => { state = { ...state, currentBuyer: null }; save(); },
  markNotificationsRead: () => {
    state = { ...state, notifications: state.notifications.map((n) => ({ ...n, read: true })) };
    save();
  },
};

export function useStore() {
  const [, force] = useState(0);
  useEffect(() => {
    const fn = () => force((x) => x + 1);
    listeners.add(fn);
    return () => { listeners.delete(fn); };
  }, []);
  return store.get();
}

// Export readiness score logic
export function calcExportScore(c: { grade: Grade; quantityTons: number; packaging: string; certified: boolean }) {
  let score = 0;
  const strengths: string[] = [];
  const improvements: string[] = [];

  // Grade (35)
  const gradeMap = { A: 35, B: 22, C: 10 } as const;
  score += gradeMap[c.grade];
  if (c.grade === "A") strengths.push("Top quality grade (A)");
  else improvements.push(`Improve quality from grade ${c.grade} to A`);

  // Quantity (25)
  if (c.quantityTons >= 20) { score += 25; strengths.push("Export-scale quantity"); }
  else if (c.quantityTons >= 10) { score += 18; strengths.push("Healthy quantity"); }
  else if (c.quantityTons >= 5) { score += 10; improvements.push("Increase quantity to at least 20 tons"); }
  else improvements.push("Quantity too low — pool with other farmers");

  // Packaging (20)
  const premiumPack = ["Vacuum Pack", "Cartons", "PP Woven Bags"];
  if (premiumPack.includes(c.packaging)) { score += 20; strengths.push("Export-grade packaging"); }
  else { score += 10; improvements.push("Upgrade to vacuum-sealed or carton packaging"); }

  // Certification (20)
  if (c.certified) { score += 20; strengths.push("Certified produce"); }
  else improvements.push("Obtain organic / APEDA certification");

  const recommendations: string[] = [];
  if (score < 60) recommendations.push("Focus on certification and packaging upgrades first.");
  if (score >= 60 && score < 85) recommendations.push("You're close to export-ready — small upgrades boost margins.");
  if (score >= 85) recommendations.push("Excellent — list on premium export channels and pool with peers.");

  return { score: Math.min(100, score), strengths, improvements, recommendations };
}

// Pooling logic
export function poolForRequest(crops: Crop[], cropName: string, neededTons: number) {
  const matches = crops
    .filter((c) => c.name.toLowerCase() === cropName.toLowerCase())
    .sort((a, b) => (b.grade < a.grade ? 1 : -1));
  const selected: { crop: Crop; allocated: number }[] = [];
  let remaining = neededTons;
  for (const c of matches) {
    if (remaining <= 0) break;
    const take = Math.min(c.quantityTons, remaining);
    selected.push({ crop: c, allocated: take });
    remaining -= take;
  }
  const totalPooled = selected.reduce((s, x) => s + x.allocated, 0);
  const totalValue = selected.reduce((s, x) => s + x.allocated * x.crop.pricePerTon, 0);
  return { selected, totalPooled, totalValue, shortfall: Math.max(0, neededTons - totalPooled) };
}

export const COUNTRY_DEMAND = [
  { country: "UAE", flag: "🇦🇪", crops: ["Turmeric", "Basmati Rice", "Red Chilli"], trend: "+12%" },
  { country: "Germany", flag: "🇩🇪", crops: ["Organic Basmati", "Black Pepper"], trend: "+18%" },
  { country: "USA", flag: "🇺🇸", crops: ["Red Chilli", "Turmeric"], trend: "+9%" },
  { country: "Japan", flag: "🇯🇵", crops: ["Black Pepper", "Basmati Rice"], trend: "+7%" },
  { country: "UK", flag: "🇬🇧", crops: ["Basmati Rice", "Turmeric"], trend: "+11%" },
];
