import type { ActivityLog, Announcement } from "@/backend.d";
import { ActivityType, PriorityLevel } from "@/backend.d";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useActivityLog,
  useAnnouncements,
  useDashboardStats,
} from "@/hooks/useQueries";
import {
  ArrowRight,
  Bell,
  BookOpen,
  CalendarCheck,
  GraduationCap,
  Plus,
  TrendingUp,
  Upload,
  UserCheck,
  UserPlus,
  Users2,
} from "lucide-react";

interface DashboardViewProps {
  onNavigate: (page: string) => void;
}

// ─── Fallback sample data ───────────────────────────────────────────────────

const FALLBACK_STATS = {
  totalStaff: 248n,
  totalClasses: 64n,
  activeTeachers: 186n,
  todayAttendancePercentage: 92,
};

const FALLBACK_ACTIVITY: ActivityLog[] = [
  {
    actorName: "Priya Sharma",
    actionDescription:
      "Added new staff member Dr. Rajesh Kumar to Science Department",
    activityType: ActivityType.administrative,
    timestamp: BigInt(Date.now() - 2 * 3600 * 1000),
  },
  {
    actorName: "Anil Mehta",
    actionDescription: "Updated class schedule for Grade 10-A Mathematics",
    activityType: ActivityType.schedule,
    timestamp: BigInt(Date.now() - 4 * 3600 * 1000),
  },
  {
    actorName: "System",
    actionDescription:
      "Attendance marked for 186 faculty members — 94% present",
    activityType: ActivityType.attendance,
    timestamp: BigInt(Date.now() - 6 * 3600 * 1000),
  },
  {
    actorName: "Kavita Nair",
    actionDescription: "Bulk imported 18 staff records from Excel spreadsheet",
    activityType: ActivityType.dataEntry,
    timestamp: BigInt(Date.now() - 24 * 3600 * 1000),
  },
  {
    actorName: "IT Admin",
    actionDescription:
      "Password reset for 3 staff accounts in Admin department",
    activityType: ActivityType.administrative,
    timestamp: BigInt(Date.now() - 30 * 3600 * 1000),
  },
];

const FALLBACK_ANNOUNCEMENTS: Announcement[] = [
  {
    title: "Final Examination Schedule — Summer 2026",
    content:
      "The final examination timetable for all classes has been released. Faculty must submit question papers by March 15.",
    priority: PriorityLevel.high,
    author: "Academic Committee",
    date: BigInt(Date.now() - 1 * 24 * 3600 * 1000),
  },
  {
    title: "Monthly Staff Meeting — March 10, 2026",
    content:
      "Mandatory staff meeting scheduled for Monday, March 10 at 10:00 AM in the Conference Hall.",
    priority: PriorityLevel.medium,
    author: "HR Department",
    date: BigInt(Date.now() - 2 * 24 * 3600 * 1000),
  },
  {
    title: "Holi Holiday Notice — March 14, 2026",
    content:
      "The institute will remain closed on March 14 on account of Holi. Regular classes resume March 15.",
    priority: PriorityLevel.low,
    author: "Administration",
    date: BigInt(Date.now() - 3 * 24 * 3600 * 1000),
  },
  {
    title: "System Maintenance — March 8, 11 PM–2 AM",
    content:
      "The ERP portal will be under scheduled maintenance. All services will be temporarily unavailable.",
    priority: PriorityLevel.medium,
    author: "IT Support",
    date: BigInt(Date.now() - 4 * 24 * 3600 * 1000),
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

function formatRelativeTime(timestamp: bigint): string {
  const now = Date.now();
  const ms = Number(timestamp);
  const diff = now - ms;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (minutes < 2) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  return `${days} day${days > 1 ? "s" : ""} ago`;
}

function formatDate(timestamp: bigint): string {
  return new Date(Number(timestamp)).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getActivityConfig(type: ActivityType) {
  const configs: Record<
    ActivityType,
    { color: string; bg: string; label: string }
  > = {
    [ActivityType.administrative]: {
      color: "#8B5CF6",
      bg: "#EDE9FE",
      label: "Admin",
    },
    [ActivityType.attendance]: {
      color: "#059669",
      bg: "#D1FAE5",
      label: "Attendance",
    },
    [ActivityType.dataEntry]: {
      color: "#2563EB",
      bg: "#DBEAFE",
      label: "Data Entry",
    },
    [ActivityType.schedule]: {
      color: "#D97706",
      bg: "#FEF3C7",
      label: "Schedule",
    },
  };
  return (
    configs[type] ?? { color: "#6B7280", bg: "#F3F4F6", label: "Activity" }
  );
}

function getPriorityConfig(priority: PriorityLevel) {
  const configs: Record<
    PriorityLevel,
    { label: string; color: string; bg: string }
  > = {
    [PriorityLevel.high]: { label: "High", color: "#DC2626", bg: "#FEE2E2" },
    [PriorityLevel.medium]: {
      label: "Medium",
      color: "#D97706",
      bg: "#FEF3C7",
    },
    [PriorityLevel.low]: { label: "Low", color: "#059669", bg: "#D1FAE5" },
  };
  return (
    configs[priority] ?? { label: "Normal", color: "#6B7280", bg: "#F3F4F6" }
  );
}

// ─── Stat Card ───────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  trend: string;
  trendColor: string;
  ocid: string;
  delay?: string;
}

function StatCard({
  icon,
  iconBg,
  label,
  value,
  trend,
  trendColor,
  ocid,
  delay,
}: StatCardProps) {
  return (
    <div
      data-ocid={ocid}
      className="erp-stats-card bg-white rounded-2xl p-6 border border-[#E5E7EB] animate-fade-in-up opacity-0"
      style={{
        animationDelay: delay,
        boxShadow: "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.06)",
      }}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <div
          className="flex items-center gap-1 text-xs font-semibold"
          style={{ color: trendColor }}
        >
          <TrendingUp className="w-3 h-3" />
        </div>
      </div>
      <div className="text-3xl font-bold text-[#1F2937] mb-1 tabular-nums">
        {value}
      </div>
      <div className="text-sm text-[#6B7280] font-medium mb-2">{label}</div>
      <div className="text-xs font-semibold" style={{ color: trendColor }}>
        {trend}
      </div>
    </div>
  );
}

// ─── Quick Action Card ───────────────────────────────────────────────────────

interface QuickActionProps {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  description: string;
  ocid: string;
  onClick: () => void;
}

function QuickActionCard({
  icon,
  iconBg,
  label,
  description,
  ocid,
  onClick,
}: QuickActionProps) {
  return (
    <button
      type="button"
      data-ocid={ocid}
      onClick={onClick}
      className="erp-card-hover bg-white border border-[#E5E7EB] rounded-2xl p-5 text-left w-full group"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
        <ArrowRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#14B8A6] transition-colors mt-1" />
      </div>
      <p className="font-semibold text-[#1F2937] text-sm mb-1">{label}</p>
      <p className="text-[#6B7280] text-xs leading-relaxed">{description}</p>
    </button>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────

export function DashboardView({ onNavigate }: DashboardViewProps) {
  const {
    data: statsData,
    isLoading: statsLoading,
    isError: statsError,
  } = useDashboardStats();

  const { data: activityData, isLoading: activityLoading } = useActivityLog();
  const { data: announcementsData, isLoading: announcementsLoading } =
    useAnnouncements();

  const stats = statsData ?? FALLBACK_STATS;
  const activityLog =
    activityData && activityData.length > 0 ? activityData : FALLBACK_ACTIVITY;
  const announcements =
    announcementsData && announcementsData.length > 0
      ? announcementsData
      : FALLBACK_ANNOUNCEMENTS;

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <section
        data-ocid="dashboard.welcome_section"
        className="erp-welcome-banner rounded-2xl p-6 md:p-8 flex items-center justify-between relative overflow-hidden"
        style={{ boxShadow: "0 4px 24px rgba(20,184,166,0.25)" }}
      >
        {/* Decorative circles */}
        <div
          className="absolute top-0 right-48 w-40 h-40 rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute -bottom-8 right-20 w-28 h-28 rounded-full opacity-10"
          style={{
            background: "radial-gradient(circle, #ffffff 0%, transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1.5">
            Welcome Back, Admin! 👋
          </h1>
          <p className="text-teal-100 text-sm md:text-base font-medium">
            Manage your institute with ease —{" "}
            <span className="text-white font-semibold">{today}</span>
          </p>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              <div className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
              System Online
            </div>
            <div className="bg-white/15 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
              Academic Year 2025–26
            </div>
          </div>
        </div>

        <div className="hidden md:flex items-center justify-center relative z-10 flex-shrink-0">
          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center">
            <GraduationCap
              className="text-white"
              style={{ width: 48, height: 48 }}
            />
          </div>
        </div>
      </section>

      {/* Stats Cards */}
      <section>
        <h2 className="text-base font-bold text-[#1F2937] mb-4 flex items-center gap-2">
          <div
            className="w-1 h-5 rounded-full"
            style={{ background: "#14B8A6" }}
          />
          Overview Statistics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsLoading ? (
            ["staff", "classes", "teachers", "attendance"].map((id) => (
              <div
                key={id}
                className="bg-white rounded-2xl p-6 border border-[#E5E7EB]"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
              >
                <div className="flex items-start justify-between mb-4">
                  <Skeleton className="w-11 h-11 rounded-xl" />
                </div>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-24 mb-2" />
                <Skeleton className="h-3 w-20" />
              </div>
            ))
          ) : statsError ? (
            <div className="col-span-4 bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
              <p className="text-red-600 text-sm font-medium">
                Failed to load statistics. Showing sample data.
              </p>
            </div>
          ) : null}

          {!statsLoading && (
            <>
              <StatCard
                ocid="dashboard.stats_total_staff_card"
                icon={
                  <Users2 className="w-5 h-5" style={{ color: "#14B8A6" }} />
                }
                iconBg="linear-gradient(135deg, rgba(20,184,166,0.12), rgba(45,212,191,0.08))"
                iconColor="#14B8A6"
                label="Total Staff"
                value={Number(stats.totalStaff).toLocaleString()}
                trend="+12 this month"
                trendColor="#059669"
                delay="0.05s"
              />
              <StatCard
                ocid="dashboard.stats_total_classes_card"
                icon={
                  <BookOpen className="w-5 h-5" style={{ color: "#8B5CF6" }} />
                }
                iconBg="linear-gradient(135deg, rgba(139,92,246,0.12), rgba(196,181,253,0.08))"
                iconColor="#8B5CF6"
                label="Total Classes"
                value={Number(stats.totalClasses).toLocaleString()}
                trend="+3 this semester"
                trendColor="#059669"
                delay="0.1s"
              />
              <StatCard
                ocid="dashboard.stats_active_teachers_card"
                icon={
                  <GraduationCap
                    className="w-5 h-5"
                    style={{ color: "#2563EB" }}
                  />
                }
                iconBg="linear-gradient(135deg, rgba(37,99,235,0.12), rgba(147,197,253,0.08))"
                iconColor="#2563EB"
                label="Active Teachers"
                value={Number(stats.activeTeachers).toLocaleString()}
                trend="94% utilization"
                trendColor="#6B7280"
                delay="0.15s"
              />
              <StatCard
                ocid="dashboard.stats_attendance_card"
                icon={
                  <CalendarCheck
                    className="w-5 h-5"
                    style={{ color: "#D97706" }}
                  />
                }
                iconBg="linear-gradient(135deg, rgba(217,119,6,0.12), rgba(253,230,138,0.08))"
                iconColor="#D97706"
                label="Today's Attendance"
                value={`${stats.todayAttendancePercentage}%`}
                trend="↑ 2% from yesterday"
                trendColor="#059669"
                delay="0.2s"
              />
            </>
          )}
        </div>
      </section>

      {/* Quick Actions */}
      <section>
        <h2 className="text-base font-bold text-[#1F2937] mb-4 flex items-center gap-2">
          <div
            className="w-1 h-5 rounded-full"
            style={{ background: "#8B5CF6" }}
          />
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            ocid="dashboard.add_staff_button"
            icon={<UserPlus className="w-5 h-5" style={{ color: "#14B8A6" }} />}
            iconBg="linear-gradient(135deg, rgba(20,184,166,0.12), rgba(45,212,191,0.08))"
            label="Add Staff"
            description="Register new faculty or administrative staff"
            onClick={() => onNavigate("add-staff")}
          />
          <QuickActionCard
            ocid="dashboard.create_class_button"
            icon={<Plus className="w-5 h-5" style={{ color: "#8B5CF6" }} />}
            iconBg="linear-gradient(135deg, rgba(139,92,246,0.12), rgba(196,181,253,0.08))"
            label="Create Class"
            description="Set up a new class with subject assignments"
            onClick={() => onNavigate("add-class")}
          />
          <QuickActionCard
            ocid="dashboard.assign_teacher_button"
            icon={
              <UserCheck className="w-5 h-5" style={{ color: "#2563EB" }} />
            }
            iconBg="linear-gradient(135deg, rgba(37,99,235,0.12), rgba(147,197,253,0.08))"
            label="Assign Teacher"
            description="Map teachers to their respective classes"
            onClick={() => onNavigate("assign-teachers")}
          />
          <QuickActionCard
            ocid="dashboard.upload_staff_button"
            icon={<Upload className="w-5 h-5" style={{ color: "#D97706" }} />}
            iconBg="linear-gradient(135deg, rgba(217,119,6,0.12), rgba(253,230,138,0.08))"
            label="Upload Staff Data"
            description="Bulk import staff records via Excel or CSV"
            onClick={() => onNavigate("bulk-staff-import")}
          />
        </div>
      </section>

      {/* Bottom: Activity + Announcements */}
      <section className="grid grid-cols-1 lg:grid-cols-5 gap-4 pb-8">
        {/* Recent Activity */}
        <div
          data-ocid="dashboard.recent_activity_panel"
          className="lg:col-span-3 bg-white rounded-2xl border border-[#E5E7EB]"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <h3 className="font-bold text-[#1F2937] text-base">
              Recent Activity
            </h3>
            <button
              type="button"
              className="text-sm font-semibold text-[#14B8A6] hover:text-teal-700 transition-colors"
            >
              View All
            </button>
          </div>

          <div className="divide-y divide-[#F3F4F6]">
            {activityLoading
              ? ["a1", "a2", "a3", "a4", "a5"].map((id) => (
                  <div key={id} className="px-6 py-4 flex items-start gap-3">
                    <Skeleton className="w-9 h-9 rounded-full flex-shrink-0" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-3.5 w-32" />
                      <Skeleton className="h-3 w-full" />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))
              : activityLog.slice(0, 5).map((item, index) => {
                  const config = getActivityConfig(item.activityType);
                  const ocids = [
                    "dashboard.activity_item.1",
                    "dashboard.activity_item.2",
                    "dashboard.activity_item.3",
                    "dashboard.activity_item.4",
                    "dashboard.activity_item.5",
                  ];
                  return (
                    <div
                      key={item.actorName + item.actionDescription.slice(0, 20)}
                      data-ocid={ocids[index]}
                      className="px-6 py-4 flex items-start gap-3 hover:bg-gray-50/60 transition-colors"
                    >
                      {/* Icon */}
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                        style={{ background: config.bg }}
                      >
                        <span
                          className="text-sm font-bold"
                          style={{ color: config.color }}
                        >
                          {item.actorName.charAt(0).toUpperCase()}
                        </span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                          <span className="text-sm font-semibold text-[#1F2937]">
                            {item.actorName}
                          </span>
                          <span
                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
                            style={{
                              background: config.bg,
                              color: config.color,
                            }}
                          >
                            {config.label}
                          </span>
                        </div>
                        <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2">
                          {item.actionDescription}
                        </p>
                        <p className="text-[11px] text-[#9CA3AF] mt-1 font-medium">
                          {formatRelativeTime(item.timestamp)}
                        </p>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>

        {/* Announcements */}
        <div
          data-ocid="dashboard.announcements_panel"
          className="lg:col-span-2 bg-white rounded-2xl border border-[#E5E7EB]"
          style={{
            boxShadow:
              "0 1px 3px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-[#14B8A6]" />
              <h3 className="font-bold text-[#1F2937] text-base">
                Announcements
              </h3>
            </div>
            <button
              type="button"
              className="text-xs font-semibold px-3 py-1.5 rounded-lg text-white transition-all hover:shadow-md"
              style={{
                background: "linear-gradient(135deg, #14B8A6, #0D9488)",
              }}
            >
              + Post New
            </button>
          </div>

          <div className="divide-y divide-[#F3F4F6]">
            {announcementsLoading
              ? ["n1", "n2", "n3", "n4"].map((id) => (
                  <div key={id} className="px-6 py-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-12 rounded-full" />
                      <Skeleton className="h-4 flex-1" />
                    </div>
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-3/4" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                ))
              : announcements.slice(0, 4).map((item, index) => {
                  const config = getPriorityConfig(item.priority);
                  const ocids = [
                    "dashboard.announcement_item.1",
                    "dashboard.announcement_item.2",
                    "dashboard.announcement_item.3",
                    "dashboard.announcement_item.4",
                  ];
                  return (
                    <div
                      key={item.title + item.author}
                      data-ocid={ocids[index]}
                      className="px-6 py-4 hover:bg-gray-50/60 transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2 mb-1.5">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 mt-0.5 uppercase tracking-wide"
                          style={{ background: config.bg, color: config.color }}
                        >
                          {config.label}
                        </span>
                        <p className="text-sm font-semibold text-[#1F2937] leading-snug line-clamp-2">
                          {item.title}
                        </p>
                      </div>
                      <p className="text-xs text-[#6B7280] leading-relaxed line-clamp-2 mb-2">
                        {item.content}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] text-[#9CA3AF] font-medium">
                          by {item.author}
                        </span>
                        <span className="text-[11px] text-[#9CA3AF]">
                          {formatDate(item.date)}
                        </span>
                      </div>
                    </div>
                  );
                })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default DashboardView;
