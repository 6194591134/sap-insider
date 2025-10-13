import { Link, useLocation } from "wouter";
import { ThemeToggle } from "./theme-toggle";
import { Search, Menu, LogIn, LogOut, User, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
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

export function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, isLoading } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">The SAP Insider</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  size="sm"
                  data-testid={`link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover-elevate"
                >
                  {item.name}
                </Button>
              </Link>
            ))}
          </nav>

          {/* Search & Theme Toggle */}
          <div className="flex items-center gap-3">
            <div className="hidden lg:flex items-center relative">
              <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 w-64"
                data-testid="input-search"
              />
            </div>

            {/* Auth Section */}
            {!isLoading && (
              <>
                {isAuthenticated && user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative rounded-full" data-testid="button-user-menu">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.profileImageUrl || undefined} alt={user.email || "User"} />
                          <AvatarFallback>
                            {user.firstName?.[0] || user.email?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">
                            {user.firstName && user.lastName
                              ? `${user.firstName} ${user.lastName}`
                              : user.email || "User"}
                          </p>
                          {user.email && (
                            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                          )}
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/favorites">
                          <div className="flex items-center cursor-pointer w-full" data-testid="link-favorites">
                            <Heart className="mr-2 h-4 w-4" />
                            <span>My Favorites</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a href="/api/logout" className="flex items-center cursor-pointer" data-testid="button-logout">
                          <LogOut className="mr-2 h-4 w-4" />
                          <span>Log out</span>
                        </a>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Button asChild size="sm" data-testid="button-login" className="hidden md:flex">
                    <a href="/api/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Log in
                    </a>
                  </Button>
                )}
              </>
            )}

            <ThemeToggle />
            
            {/* Mobile Menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden" data-testid="button-mobile-menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72">
                <nav className="flex flex-col space-y-2 mt-8">
                  {navigation.map((item) => (
                    <Link key={item.path} href={item.path} onClick={() => setMobileOpen(false)}>
                      <Button
                        variant={location === item.path ? "secondary" : "ghost"}
                        className="w-full justify-start hover-elevate"
                        data-testid={`mobile-link-${item.name.toLowerCase().replace(/\s+/g, "-")}`}
                      >
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                  <div className="pt-4">
                    <Input
                      type="search"
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      data-testid="input-mobile-search"
                    />
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
