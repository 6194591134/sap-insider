import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";
import Home from "@/pages/home";
import Updates from "@/pages/updates";
import UpdateDetail from "@/pages/update-detail";
import Reviews from "@/pages/reviews";
import ProviderProfile from "@/pages/provider-profile";
import RTD from "@/pages/rtd";
import Resources from "@/pages/resources";
import Organizations from "@/pages/organizations";
import Favorites from "@/pages/favorites";
import About from "@/pages/about";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/updates" component={Updates} />
      <Route path="/updates/:id" component={UpdateDetail} />
      <Route path="/reviews" component={Reviews} />
      <Route path="/reviews/:id" component={ProviderProfile} />
      <Route path="/rtd" component={RTD} />
      <Route path="/resources" component={Resources} />
      <Route path="/organizations" component={Organizations} />
      <Route path="/favorites" component={Favorites} />
      <Route path="/about" component={About} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
              <Router />
            </main>
          </div>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
