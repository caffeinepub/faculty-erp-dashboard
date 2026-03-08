import { DashboardView } from "@/components/DashboardView";
import { PlaceholderView } from "@/components/PlaceholderView";
import { Sidebar } from "@/components/Sidebar";
import { TopNav } from "@/components/TopNav";
import { useEffect, useState } from "react";

export default function App() {
  const [activePage, setActivePage] = useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  // On desktop, sidebar is always visible (handled by CSS), no need for state
  // On mobile, sidebarOpen drives the slide-in
  useEffect(() => {
    const handler = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false); // reset mobile state when going to desktop
      }
    };
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
  };

  return (
    <div className="min-h-screen" style={{ background: "#F8FAFC" }}>
      {/* Top Navigation — fixed, full width */}
      <TopNav onMenuClick={() => setSidebarOpen((prev) => !prev)} />

      {/* Sidebar — fixed, below topnav */}
      <Sidebar
        activePage={activePage}
        onNavigate={handleNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content — offset for sidebar and topnav */}
      <main
        className="transition-all duration-300"
        style={{
          paddingTop: "64px", // topnav height
          marginLeft: 0,
        }}
      >
        {/* Desktop sidebar spacer */}
        <div className="lg:flex">
          {/* Sidebar spacer on desktop */}
          <div
            className="hidden lg:block flex-shrink-0"
            style={{ width: "260px" }}
          />

          {/* Scrollable content */}
          <div className="flex-1 min-w-0 overflow-y-auto min-h-[calc(100vh-64px)]">
            <div className="px-4 sm:px-6 lg:px-8 py-6 max-w-[1600px] mx-auto">
              {activePage === "dashboard" ? (
                <DashboardView onNavigate={handleNavigate} />
              ) : (
                <PlaceholderView
                  pageName={activePage}
                  onDashboard={() => setActivePage("dashboard")}
                />
              )}
            </div>

            {/* Footer */}
            <footer className="border-t border-[#E5E7EB] px-4 sm:px-8 py-4 mt-auto">
              <p className="text-xs text-[#9CA3AF] text-center">
                © {new Date().getFullYear()}. Built with{" "}
                <span className="text-red-400">♥</span> using{" "}
                <a
                  href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4892A] hover:underline font-medium"
                >
                  caffeine.ai
                </a>
              </p>
            </footer>
          </div>
        </div>
      </main>
    </div>
  );
}
