import React, { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CookieConsent } from "@/components/Privacy/CookieConsent";
import { SkipToContent } from "@/components/Accessibility/SkipToContent";
import { PerformanceMonitor } from "@/components/Performance/PerformanceMonitor";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import { MobileOptimizations } from "@/components/Mobile/MobileOptimizations";
import { AccessibilityMenu } from "@/components/Accessibility/AccessibilityMenu";
import { PageViewTracker } from "@/components/Analytics/PageViewTracker";
import { ResourceHints } from "@/components/Performance/ResourceHints";
import { ScrollToTop } from "@/components/ScrollToTop";
import { BackToTop } from "@/components/BackToTop";
import { measureWebVitals } from "@/utils/performance";

// Lazy load route components for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Team = lazy(() => import("./pages/Team"));
const Impact = lazy(() => import("./pages/Impact"));
const Sponsors = lazy(() => import("./pages/Sponsors"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Auth = lazy(() => import("./pages/Auth"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Network = lazy(() => import("./pages/Network"));
const Profile = lazy(() => import("./pages/Profile"));
const AlumniNetwork = lazy(() => import("./pages/AlumniNetwork"));
const SubmitPhoto = lazy(() => import("./pages/SubmitPhoto"));
const SubmitResource = lazy(() => import("./pages/SubmitResource"));
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const AdminUsers = lazy(() => import("./pages/admin/Users"));
const AdminSponsors = lazy(() => import("./pages/admin/Sponsors"));
const AdminResources = lazy(() => import("./pages/admin/Resources"));
const AdminTeam = lazy(() => import("./pages/admin/Team"));
const AdminNews = lazy(() => import("./pages/admin/News"));
            const News = lazy(() => import("./pages/News"));
const NewsPost = lazy(() => import("./pages/NewsPost"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
);

const queryClient = new QueryClient();

const App = () => {
  // Register service worker for PWA functionality
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }

    // Measure Core Web Vitals for performance monitoring
    measureWebVitals();
  }, []);

  return (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SkipToContent />
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTop />
        <ResourceHints />
        <PageViewTracker />
        <AnalyticsTracker />
        <MobileOptimizations />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/sponsors" element={<Sponsors />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/:id" element={<NewsPost />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/network" element={<Network />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/alumni-network" element={<AlumniNetwork />} />
            <Route path="/submit-photo" element={<SubmitPhoto />} />
            <Route path="/submit-resource" element={<SubmitResource />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
            <Route path="/admin/sponsors" element={<AdminSponsors />} />
            <Route path="/admin/resources" element={<AdminResources />} />
            <Route path="/admin/team" element={<AdminTeam />} />
            <Route path="/admin/news" element={<AdminNews />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <AccessibilityMenu />
        <BackToTop />
      </BrowserRouter>
      <CookieConsent />
      <PerformanceMonitor />
    </TooltipProvider>
  </QueryClientProvider>
  );
};

export default App;
