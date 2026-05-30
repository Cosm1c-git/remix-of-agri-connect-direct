import { Link } from "@tanstack/react-router";
import { Sprout, Bell } from "lucide-react";
import { useStore, store } from "@/lib/mock-store";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const s = useStore();
  const unread = s.notifications.filter((n) => !n.read).length;

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-hero text-primary-foreground">
            <Sprout className="h-5 w-5" />
          </div>
          <div className="leading-tight">
            <div className="font-semibold">Agri Export Connect</div>
            <div className="text-xs text-muted-foreground">Farm to World</div>
          </div>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          <Link to="/" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" activeOptions={{ exact: true }} activeProps={{ className: "bg-secondary text-primary font-medium" }}>Home</Link>
          <Link to="/farmer" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" activeProps={{ className: "bg-secondary text-primary font-medium" }}>Farmer</Link>
          <Link to="/buyer" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" activeProps={{ className: "bg-secondary text-primary font-medium" }}>Buyer</Link>
          <Link to="/pooling" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" activeProps={{ className: "bg-secondary text-primary font-medium" }}>Pooling</Link>
          <Link to="/admin" className="rounded-md px-3 py-2 text-sm hover:bg-secondary" activeProps={{ className: "bg-secondary text-primary font-medium" }}>Admin</Link>
        </nav>
        <div className="flex items-center gap-2">
          <Popover onOpenChange={(o) => { if (!o) store.markNotificationsRead(); }}>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
                <Bell className="h-5 w-5" />
                {unread > 0 && (
                  <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80 p-0">
              <div className="border-b p-3 font-medium">Notifications</div>
              <div className="max-h-80 overflow-y-auto">
                {s.notifications.length === 0 && (
                  <div className="p-4 text-sm text-muted-foreground">All caught up.</div>
                )}
                {s.notifications.map((n) => (
                  <div key={n.id} className="border-b p-3 last:border-0">
                    <div className="text-sm font-medium">{n.title}</div>
                    <div className="text-xs text-muted-foreground">{n.body}</div>
                  </div>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <nav className="flex items-center justify-around border-t px-2 py-1 md:hidden">
        {[
          { to: "/", label: "Home" },
          { to: "/farmer", label: "Farmer" },
          { to: "/buyer", label: "Buyer" },
          { to: "/pooling", label: "Pool" },
          { to: "/admin", label: "Admin" },
        ].map((l) => (
          <Link key={l.to} to={l.to} className="rounded-md px-2 py-1.5 text-xs" activeOptions={l.to === "/" ? { exact: true } : undefined} activeProps={{ className: "text-primary font-semibold" }}>
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
