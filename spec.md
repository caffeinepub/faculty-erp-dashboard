# Faculty ERP Dashboard

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full-page admin dashboard SaaS layout with sidebar + top nav + main content
- Top navigation bar: global search, Quick Fee button, Raise a Query button, What's New button, notifications bell with badge, language switcher dropdown, profile avatar dropdown (Profile, Settings, Logout)
- Left sidebar with collapsible menu sections:
  1. Overview > Admin Dashboard
  2. Institute Info > Basic Institute Info, Implementation Process
  3. Admin Role Management > Role Category, Staff Access Control
  4. Password Management > Reset Password
  5. Staff Management > Staff Directory, Add Staff, Bulk Staff Import, Bulk Photo Upload
  6. Staff Attendance (single item)
  7. Class, Subject and Teacher Assignment > Class Overview, Add/Modify Class, Add/Modify Subjects, Assign Teachers
- Sidebar collapsible on mobile (hamburger toggle)
- Main dashboard content (default: Admin Dashboard view):
  - Welcome section with "Welcome Back, Admin!" heading and current date/subtitle
  - 4 statistics cards: Total Staff (248), Total Classes (64), Active Teachers (186), Today's Attendance (92%) — each with icon, number, trend indicator
  - Quick Action Panel: 4 cards for Add Staff, Create Class, Assign Teacher, Upload Staff Data
  - Recent Activity Panel with realistic sample data (timestamps, avatars/icons, descriptions)
  - Announcements Section with realistic sample data (dates, priority badges)
- Sidebar navigation items all interactive — clicking updates active state and shows placeholder content view
- Lucide React icons used throughout
- Inter/Poppins font from Google Fonts

### Modify
- Nothing (new project)

### Remove
- Nothing (new project)

## Implementation Plan
1. Backend: minimal Motoko canister with basic dashboard stats and activity log queries
2. Frontend:
   - App shell: sidebar + topnav + content area layout
   - Sidebar component with collapsible sections and active state management
   - TopNav component with search, action buttons, notifications, language switcher, profile dropdown
   - Dashboard view: WelcomeSection, StatsCards, QuickActions, RecentActivity, Announcements
   - Generic PlaceholderView for non-dashboard sidebar routes
   - Responsive layout (mobile sidebar overlay)
   - Teal/mint color theme via Tailwind config and CSS variables
   - Google Fonts (Inter) via index.html or CSS import
