import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { Search, Menu, LogOut, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Updates", path: "/updates" },
  { name: "Reviews", path: "/reviews" },
  { name: "RTD Guide", path: "/rtd" },
  { name: "Resources", path: "/resources" },
  { name: "Organizations", path: "/organizations" },
  { name: "About", path: "/about" },
];

const today = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated } = useAuth();

  const isActive = (path: string) => (path === "/" ? location === "/" : location.startsWith(path));

  return (
    <header className="bg-background">
      {/* Masthead */}
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between py-4 lg:py-6 gap-4">
          <div className="hidden md:block w-56 text-xs text-muted-foreground leading-snug">
            <div className="font-semibold text-foreground">{today}</div>
            <div>DOT drug &amp; alcohol compliance news</div>
          </div>

          <Link href="/" className="md:text-center" data-testid="link-logo">
            <span className="font-serif font-bold tracking-tight text-3xl lg:text-5xl text-foreground">The SAP Insider</span>
          </Link>

          <div className="flex items-center justify-end gap-1 md:w-56">
            <Button variant="ghost" size="icon" onClick={() => setSearchOpen((v) => !v)} aria-label="Search" data-testid="button-search">
              <Search className="h-5 w-5" />
            </Button>
            <ThemeToggle />
            {isAuthenticated && user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full" data-testid="button-user-menu">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.profileImageUrl || undefined} alt={user.email || "User"} />
                      <AvatarFallback>{user.firstName?.[0] || user.email?.[0] || "U"}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link href="/favorites"><div className="flex items-center w-full cursor-pointer"><Heart className="mr-2 h-4 w-4" />Saved</div></Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <a href="/api/logout" className="flex items-center cursor-pointer"><LogOut className="mr-2 h-4 w-4" />Log out</a>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col mt-8 divide-y">
                  {navigation.map((item) => (
                    <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                      <span className={`block py-3 font-serif text-lg ${isActive(item.path) ? "font-bold" : ""}`}>{item.name}</span>
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {searchOpen && (
          <div className="pb-4">
            <Input autoFocus type="search" placeholder="Search updates, providers, resources" value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} className="max-w-xl mx-auto" data-testid="input-search" />
          </div>
        )}
      </div>

      {/* Section nav */}
      <div className="sticky top-0 z-50 border-y-2 border-foreground/90 bg-background/95 backdrop-blur hidden md:block">
        <nav className="container mx-auto px-4 lg:px-8 flex items-center justify-center gap-1 h-11">
          {navigation.map((item) => (
            <Link key={item.path} href={item.path}
              data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
              className={`px-3 h-full flex items-center text-[13px] font-semibold uppercase tracking-wide border-b-2 -mb-[2px] transition-colors ${
                isActive(item.path) ? "border-[hsl(4_72%_44%)] text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"
              }`}>
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      <div className="md:hidden border-t-2 border-foreground/90" />
    </header>
  );
}
