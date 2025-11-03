import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SecurityProvider } from "./contexts/SecurityContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AIShield from "./components/AIShield";
import SessionTimeout from "./components/SessionTimeout";
import Landing from "./pages/Landing";
import About from "./pages/About";
import Features from "./pages/Features";
import HowItWorks from "./pages/HowItWorks";
import HowItFeels from "./pages/HowItFeels";
import Pricing from "./pages/Pricing";
import FAQ from "./pages/FAQ";
import Institutions from "./pages/Institutions";
import Blog from "./pages/Blog";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import StudentDashboard from "./pages/dashboards/StudentDashboard";
import ParentDashboard from "./pages/dashboards/ParentDashboard";
import TeacherDashboard from "./pages/dashboards/TeacherDashboard";
import CreateAnnouncement from "./pages/dashboards/CreateAnnouncement";
import CreatePoll from "./pages/dashboards/CreatePoll";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import SuperAdminDashboard from "./pages/dashboards/SuperAdminDashboard";
import InstitutionAnalytics from "./pages/InstitutionAnalytics";
import BillingSubscription from "./pages/BillingSubscription";
import InstitutionSetup from "./pages/InstitutionSetup";
import Leaderboard from "./pages/Leaderboard";
import CollaborationRoom from "./pages/CollaborationRoom";
import TeacherHub from "./pages/TeacherHub";
import PrivacyEthics from "./pages/PrivacyEthics";
import AIModeration from "./pages/AIModeration";
import SecurityVisualization from "./pages/SecurityVisualization";
import DataRetention from "./pages/DataRetention";
import ModerationPanel from "./pages/ModerationPanel";
import Integrations from "./pages/Integrations";
import APIGateway from "./pages/APIGateway";
import BackupRestore from "./pages/BackupRestore";
import DeveloperCenter from "./pages/DeveloperCenter";
import SystemMonitoring from "./pages/SystemMonitoring";
import OfflineSync from "./components/OfflineSync";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  const location = useLocation();
  const isDashboard = location.pathname.includes("/dashboard");
  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";
  
  return (
    <>
      {!isDashboard && !isAuthPage && <Navigation />}
      <AIShield />
      <SessionTimeout />
      <OfflineSync />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/features" element={<Features />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/how-it-feels" element={<HowItFeels />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/institutions" element={<Institutions />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/parent" element={<ParentDashboard />} />
          <Route path="/dashboard/teacher" element={<TeacherDashboard />} />
          <Route path="/dashboard/teacher/announcement" element={<CreateAnnouncement />} />
          <Route path="/dashboard/teacher/poll" element={<CreatePoll />} />
        <Route path="/dashboard/admin" element={<AdminDashboard />} />
        <Route path="/dashboard/super-admin" element={<SuperAdminDashboard />} />
        <Route path="/institution-analytics" element={<InstitutionAnalytics />} />
        <Route path="/billing" element={<BillingSubscription />} />
        <Route path="/institutions/new" element={<InstitutionSetup />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/collaboration-room" element={<CollaborationRoom />} />
        <Route path="/teacher-hub" element={<TeacherHub />} />
        <Route path="/privacy-ethics" element={<PrivacyEthics />} />
        <Route path="/ai-moderation" element={<AIModeration />} />
        <Route path="/security-visualization" element={<SecurityVisualization />} />
        <Route path="/data-retention" element={<DataRetention />} />
        <Route path="/moderation-panel" element={<ModerationPanel />} />
        <Route path="/integrations" element={<Integrations />} />
        <Route path="/api-gateway" element={<APIGateway />} />
        <Route path="/backup-restore" element={<BackupRestore />} />
        <Route path="/developer-center" element={<DeveloperCenter />} />
        <Route path="/system-monitoring" element={<SystemMonitoring />} />
        <Route path="/profile" element={<Profile />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isDashboard && !isAuthPage && <Footer />}
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <SecurityProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppContent />
          </BrowserRouter>
        </TooltipProvider>
      </SecurityProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
