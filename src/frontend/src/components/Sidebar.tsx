import {
  BookMarked,
  BookOpen,
  Building2,
  CalendarCheck,
  Camera,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Key,
  LayoutDashboard,
  Lock,
  PlusCircle,
  Shield,
  Upload,
  UserCheck,
  UserCog,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

interface SidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

interface NavItem {
  label: string;
  page: string;
  icon?: React.ReactNode;
  ocid: string;
}

interface NavSection {
  label: string;
  icon: React.ReactNode;
  items?: NavItem[];
  page?: string;
  ocid?: string;
  singleItem?: boolean;
}

const navSections: NavSection[] = [
  {
    label: "Overview",
    icon: <LayoutDashboard className="w-4 h-4" />,
    items: [
      {
        label: "Admin Dashboard",
        page: "dashboard",
        icon: <LayoutDashboard className="w-3.5 h-3.5" />,
        ocid: "sidebar.dashboard_link",
      },
    ],
  },
  {
    label: "Institute Info",
    icon: <Building2 className="w-4 h-4" />,
    items: [
      {
        label: "Basic Institute Info",
        page: "institute-info",
        icon: <Building2 className="w-3.5 h-3.5" />,
        ocid: "sidebar.institute_info_link",
      },
      {
        label: "Implementation Process",
        page: "implementation-process",
        icon: <ClipboardList className="w-3.5 h-3.5" />,
        ocid: "sidebar.implementation_process_link",
      },
    ],
  },
  {
    label: "Admin Role Management",
    icon: <Shield className="w-4 h-4" />,
    items: [
      {
        label: "Role Category",
        page: "role-category",
        icon: <UserCog className="w-3.5 h-3.5" />,
        ocid: "sidebar.role_category_link",
      },
      {
        label: "Staff Access Control",
        page: "staff-access",
        icon: <Shield className="w-3.5 h-3.5" />,
        ocid: "sidebar.staff_access_link",
      },
    ],
  },
  {
    label: "Password Management",
    icon: <Key className="w-4 h-4" />,
    items: [
      {
        label: "Reset Password",
        page: "reset-password",
        icon: <Lock className="w-3.5 h-3.5" />,
        ocid: "sidebar.reset_password_link",
      },
    ],
  },
  {
    label: "Staff Management",
    icon: <Users className="w-4 h-4" />,
    items: [
      {
        label: "Staff Directory",
        page: "staff-directory",
        icon: <Users className="w-3.5 h-3.5" />,
        ocid: "sidebar.staff_directory_link",
      },
      {
        label: "Add Staff",
        page: "add-staff",
        icon: <UserPlus className="w-3.5 h-3.5" />,
        ocid: "sidebar.add_staff_link",
      },
      {
        label: "Bulk Staff Import",
        page: "bulk-staff-import",
        icon: <Upload className="w-3.5 h-3.5" />,
        ocid: "sidebar.bulk_staff_import_link",
      },
      {
        label: "Bulk Photo Upload",
        page: "bulk-photo-upload",
        icon: <Camera className="w-3.5 h-3.5" />,
        ocid: "sidebar.bulk_photo_upload_link",
      },
    ],
  },
  {
    label: "Staff Attendance",
    icon: <CalendarCheck className="w-4 h-4" />,
    singleItem: true,
    page: "staff-attendance",
    ocid: "sidebar.staff_attendance_link",
  },
  {
    label: "Class, Subject & Teacher",
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      {
        label: "Class Overview",
        page: "class-overview",
        icon: <BookOpen className="w-3.5 h-3.5" />,
        ocid: "sidebar.class_overview_link",
      },
      {
        label: "Add/Modify Class",
        page: "add-class",
        icon: <PlusCircle className="w-3.5 h-3.5" />,
        ocid: "sidebar.add_class_link",
      },
      {
        label: "Add/Modify Subjects",
        page: "add-subjects",
        icon: <BookMarked className="w-3.5 h-3.5" />,
        ocid: "sidebar.add_subjects_link",
      },
      {
        label: "Assign Teachers",
        page: "assign-teachers",
        icon: <UserCheck className="w-3.5 h-3.5" />,
        ocid: "sidebar.assign_teachers_link",
      },
    ],
  },
];

export function Sidebar({
  activePage,
  onNavigate,
  isOpen,
  onClose,
}: SidebarProps) {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    Overview: true,
    "Institute Info": false,
    "Admin Role Management": false,
    "Password Management": false,
    "Staff Management": false,
    "Class, Subject & Teacher": false,
  });

  const toggleSection = (label: string) => {
    setExpandedSections((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const handleNavigate = (page: string) => {
    onNavigate(page);
    // Close sidebar on mobile
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 sidebar-overlay lg:hidden"
          onClick={onClose}
          onKeyDown={onClose}
          aria-hidden="true"
          role="presentation"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`erp-sidebar fixed top-0 left-0 h-full z-50 w-[260px] flex flex-col shadow-sidebar
          lg:top-16 lg:z-30 lg:translate-x-0
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Mobile header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-teal-600/30 lg:hidden flex-shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-teal-400/20 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-teal-200" />
            </div>
            <span className="text-white font-bold text-base">EduERP</span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-200 hover:bg-teal-600/30 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Institute Badge */}
        <div className="px-4 py-3 border-b border-teal-600/30 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
              style={{ background: "rgba(45,212,191,0.2)" }}
            >
              <GraduationCap className="w-4 h-4 text-teal-200" />
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-semibold truncate leading-tight">
                Greenfield University
              </p>
              <p className="text-teal-300 text-[10px] truncate leading-tight">
                Academic Year 2025–26
              </p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2">
          {navSections.map((section) => {
            if (section.singleItem && section.page) {
              // Single standalone item
              const isActive = activePage === section.page;
              return (
                <button
                  type="button"
                  key={section.label}
                  data-ocid={section.ocid}
                  onClick={() => handleNavigate(section.page!)}
                  className={`erp-nav-item w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all
                    ${
                      isActive
                        ? "active text-white font-semibold"
                        : "text-teal-100 font-medium"
                    }`}
                >
                  <span
                    className={`flex-shrink-0 ${isActive ? "text-teal-200" : "text-teal-300"}`}
                  >
                    {section.icon}
                  </span>
                  <span className="truncate">{section.label}</span>
                </button>
              );
            }

            // Collapsible section
            const isExpanded = expandedSections[section.label] ?? false;
            const hasActiveChild = section.items?.some(
              (item) => item.page === activePage,
            );

            return (
              <div key={section.label}>
                <button
                  type="button"
                  onClick={() => toggleSection(section.label)}
                  className={`erp-nav-section-header w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-all
                    ${hasActiveChild ? "text-teal-200" : "text-teal-100"}
                    hover:text-white`}
                  aria-expanded={isExpanded}
                >
                  <span className="flex-shrink-0 text-teal-300">
                    {section.icon}
                  </span>
                  <span className="flex-1 text-left font-semibold text-[13px] truncate">
                    {section.label}
                  </span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-teal-400 flex-shrink-0 transition-transform duration-200 ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="pb-1">
                    {section.items?.map((item) => {
                      const isActive = activePage === item.page;
                      return (
                        <button
                          type="button"
                          key={item.page}
                          data-ocid={item.ocid}
                          onClick={() => handleNavigate(item.page)}
                          className={`erp-nav-item w-full flex items-center gap-3 pl-10 pr-4 py-2 text-[13px] transition-all
                            ${
                              isActive
                                ? "active text-white font-semibold"
                                : "text-teal-200 hover:text-white"
                            }`}
                        >
                          <span
                            className={`flex-shrink-0 ${isActive ? "text-teal-200" : "text-teal-400"}`}
                          >
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 py-3 border-t border-teal-600/30 flex-shrink-0">
          <p className="text-teal-400 text-[10px] text-center">
            EduERP v2.5.0 · © 2026
          </p>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
