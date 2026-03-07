import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StaffRecord {
    status: StaffStatus;
    name: string;
    role: string;
    department: string;
}
export interface ActivityLog {
    activityType: ActivityType;
    actorName: string;
    timestamp: bigint;
    actionDescription: string;
}
export interface Announcement {
    title: string;
    content: string;
    date: bigint;
    author: string;
    priority: PriorityLevel;
}
export interface DashboardStats {
    totalClasses: bigint;
    todayAttendancePercentage: number;
    activeTeachers: bigint;
    totalStaff: bigint;
}
export enum ActivityType {
    administrative = "administrative",
    attendance = "attendance",
    dataEntry = "dataEntry",
    schedule = "schedule"
}
export enum PriorityLevel {
    low = "low",
    high = "high",
    medium = "medium"
}
export enum StaffStatus {
    onLeave = "onLeave",
    active = "active",
    inactive = "inactive"
}
export interface backendInterface {
    addStaff(name: string, role: string, department: string, status: StaffStatus): Promise<void>;
    createAnnouncement(title: string, content: string, priority: PriorityLevel, author: string): Promise<void>;
    getActivityLog(): Promise<Array<ActivityLog>>;
    getAllAnnouncements(): Promise<Array<Announcement>>;
    getAllAnnouncementsByPriority(): Promise<Array<Announcement>>;
    getAllStaffByDepartment(): Promise<Array<StaffRecord>>;
    getDashboardStats(): Promise<DashboardStats>;
}
