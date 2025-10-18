import React, { useState } from "react";
import { Login } from "./components/Login";
import { FarmerSidebar } from "./components/FarmerSidebar";
import { FarmerDashboard } from "./components/FarmerDashboard";
import { FarmerProfile } from "./components/FarmerProfile";
import { IntelligentQA } from "./components/IntelligentQA";
import { HelplineContacts } from "./components/HelplineContacts";
import { CropCalendar } from "./components/CropCalendar";
import { MarketPricesPage } from "./components/PlaceholderPages";
import { PermissionBanner } from "./components/PermissionBanner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LanguageProvider } from "./components/LanguageContext";
import { ThemeProvider } from "./components/ThemeContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = (userData: any) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab("dashboard");
    setSidebarOpen(false);
  };

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <FarmerDashboard setActiveTab={setActiveTab} />;
      case "qa":
        return <IntelligentQA />;
      case "helpline":
        return <HelplineContacts />;
      case "profile":
        return <FarmerProfile />;
      case "crops":
        return <CropCalendar />;
      case "market":
        return <MarketPricesPage />;
      default:
        return <FarmerDashboard setActiveTab={setActiveTab} />;
    }
  };

  // If user is not authenticated, show login screen
  if (!user?.isAuthenticated) {
    return (
      <ThemeProvider>
        <LanguageProvider>
          <Login onLogin={handleLogin} />
          <Toaster />
        </LanguageProvider>
      </ThemeProvider>
    );
  }

  // Authenticated user interface
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ErrorBoundary>
          <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
            {/* Permission Banner */}
            <PermissionBanner />

            <div className="flex">
              {/* Sidebar */}
              <FarmerSidebar
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onLogout={handleLogout}
                isOpen={sidebarOpen}
                setIsOpen={setSidebarOpen}
              />

              {/* Main Content */}
              <main className="flex-1 md:ml-64">
                <div className="min-h-screen">
                  <ErrorBoundary>
                    {renderContent()}
                  </ErrorBoundary>
                </div>
              </main>
            </div>

            <Toaster />
          </div>
        </ErrorBoundary>
      </LanguageProvider>
    </ThemeProvider>
  );
}