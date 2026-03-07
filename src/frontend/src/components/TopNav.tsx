import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Bell,
  ChevronDown,
  CreditCard,
  Globe,
  LogOut,
  Menu,
  MessageSquarePlus,
  Search,
  Settings,
  Sparkles,
  User,
} from "lucide-react";
import { useState } from "react";

interface TopNavProps {
  onMenuClick: () => void;
}

const LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
];

export function TopNav({ onMenuClick }: TopNavProps) {
  const [currentLang, setCurrentLang] = useState("en");
  const [searchValue, setSearchValue] = useState("");

  const currentLangLabel =
    LANGUAGES.find((l) => l.code === currentLang)?.label ?? "English";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-40 h-16 bg-white border-b border-[#E5E7EB] flex items-center px-4 gap-3"
      style={{
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Left: Menu + Logo */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="p-2 rounded-lg hover:bg-gray-100 transition-colors lg:hidden"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-[#6B7280]" />
        </button>

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm"
            style={{ background: "linear-gradient(135deg, #14B8A6, #0D9488)" }}
          >
            E
          </div>
          <span
            className="text-lg font-bold tracking-tight hidden sm:block"
            style={{
              background: "linear-gradient(135deg, #14B8A6, #0D9488)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            EduERP
          </span>
        </div>
      </div>

      {/* Center: Search */}
      <div className="flex-1 max-w-md mx-auto hidden sm:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <Input
            data-ocid="topnav.search_input"
            placeholder="Search students, staff, classes..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="pl-9 h-9 text-sm bg-[#F8FAFC] border-[#E5E7EB] rounded-lg focus:border-[#14B8A6] focus:ring-[#14B8A6]/20"
          />
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1.5 ml-auto flex-shrink-0">
        {/* Quick Fee */}
        <Button
          data-ocid="topnav.quick_fee_button"
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-1.5 h-8 text-xs border-[#14B8A6] text-[#14B8A6] hover:bg-teal-50 hover:text-teal-700 font-medium"
        >
          <CreditCard className="w-3.5 h-3.5" />
          Quick Fee
        </Button>

        {/* Raise a Query */}
        <Button
          data-ocid="topnav.raise_query_button"
          variant="outline"
          size="sm"
          className="hidden md:flex items-center gap-1.5 h-8 text-xs border-[#14B8A6] text-[#14B8A6] hover:bg-teal-50 hover:text-teal-700 font-medium"
        >
          <MessageSquarePlus className="w-3.5 h-3.5" />
          Raise a Query
        </Button>

        {/* What's New */}
        <Button
          data-ocid="topnav.whats_new_button"
          variant="ghost"
          size="sm"
          className="hidden lg:flex items-center gap-1.5 h-8 text-xs text-[#14B8A6] hover:bg-teal-50 font-medium"
        >
          <Sparkles className="w-3.5 h-3.5" />
          What's New
        </Button>

        {/* Notifications */}
        <button
          type="button"
          data-ocid="topnav.notifications_button"
          className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell
            className="w-4.5 h-4.5 text-[#6B7280]"
            style={{ width: 18, height: 18 }}
          />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-red-500 rounded-full text-white text-[10px] font-bold flex items-center justify-center leading-none">
            3
          </span>
        </button>

        {/* Language Switcher */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-ocid="topnav.language_select"
              className="flex items-center gap-1 p-2 rounded-lg hover:bg-gray-100 transition-colors text-[#6B7280] text-xs"
              aria-label="Language"
            >
              <Globe style={{ width: 18, height: 18 }} />
              <span className="hidden lg:block font-medium">
                {currentLangLabel}
              </span>
              <ChevronDown className="w-3 h-3 hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-36">
            {LANGUAGES.map((lang) => (
              <DropdownMenuItem
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={
                  currentLang === lang.code
                    ? "text-[#14B8A6] font-semibold"
                    : ""
                }
              >
                {lang.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              data-ocid="topnav.profile_button"
              className="flex items-center gap-2 ml-1 p-1 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Profile menu"
            >
              <Avatar className="w-8 h-8">
                <AvatarFallback
                  className="text-white text-xs font-bold"
                  style={{
                    background: "linear-gradient(135deg, #14B8A6, #0D9488)",
                  }}
                >
                  AD
                </AvatarFallback>
              </Avatar>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold text-[#1F2937] leading-tight">
                  Admin User
                </p>
                <p className="text-[10px] text-[#6B7280] leading-tight">
                  Super Admin
                </p>
              </div>
              <ChevronDown className="w-3 h-3 text-[#6B7280] hidden lg:block" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            data-ocid="topnav.profile_dropdown_menu"
            align="end"
            className="w-48"
          >
            <div className="px-3 py-2 border-b border-[#E5E7EB]">
              <p className="text-sm font-semibold text-[#1F2937]">Admin User</p>
              <p className="text-xs text-[#6B7280]">admin@eduerp.edu</p>
            </div>
            <DropdownMenuItem className="flex items-center gap-2 mt-1">
              <User className="w-4 h-4 text-[#6B7280]" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-[#6B7280]" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              data-ocid="topnav.logout_button"
              className="flex items-center gap-2 text-red-500 hover:text-red-600 focus:text-red-600"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export default TopNav;
