
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PaletteProvider } from "@/components/ui/palette-provider";
import { CorporateThemeProvider } from "@/components/ui/corporate-theme-provider";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ShowDetails from "./pages/ShowDetails";
import EventListing from "./pages/EventListing";
import BookingConfirmation from "./pages/BookingConfirmation";
import Payment from "./pages/Payment";
import BookingSuccess from "./pages/BookingSuccess";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <PaletteProvider defaultPalette="sunset-cinema">
      <CorporateThemeProvider defaultMode="casual">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/events" element={<EventListing />} />
              <Route path="/show/:id" element={<ShowDetails />} />
              <Route path="/booking-confirmation" element={<BookingConfirmation />} />
              <Route path="/payment" element={<Payment />} />
              <Route path="/booking-success" element={<BookingSuccess />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CorporateThemeProvider>
    </PaletteProvider>
  </QueryClientProvider>
);

export default App;
