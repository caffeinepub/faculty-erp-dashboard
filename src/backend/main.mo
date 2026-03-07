import Iter "mo:core/Iter";
import Array "mo:core/Array";
import Text "mo:core/Text";
import Order "mo:core/Order";
import Map "mo:core/Map";
import Runtime "mo:core/Runtime";
import Int "mo:core/Int";

actor {
  let staff = Map.empty<Text, StaffRecord>();
  let announcements = Map.empty<Text, Announcement>();
  let activityLog = Map.empty<Int, ActivityLog>();

  type ActivityLog = {
    actorName : Text;
    actionDescription : Text;
    timestamp : Int;
    activityType : ActivityType;
  };

  module ActivityLog {
    public func compare(entry1 : ActivityLog, entry2 : ActivityLog) : Order.Order {
      Int.compare(entry1.timestamp, entry2.timestamp);
    };
  };

  type ActivityType = {
    #dataEntry;
    #attendance;
    #schedule;
    #administrative;
  };

  type DashboardStats = {
    totalStaff : Nat;
    totalClasses : Nat;
    activeTeachers : Nat;
    todayAttendancePercentage : Float;
  };

  type Announcement = {
    title : Text;
    content : Text;
    date : Int;
    priority : PriorityLevel;
    author : Text;
  };

  module Announcement {
    public func compare(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      Int.compare(announcement1.date, announcement2.date);
    };

    public func compareByPriority(announcement1 : Announcement, announcement2 : Announcement) : Order.Order {
      switch (announcement1.priority, announcement2.priority) {
        case (#high, #medium) { #less };
        case (#high, #low) { #less };
        case (#medium, #high) { #greater };
        case (#medium, #low) { #less };
        case (#low, #high) { #greater };
        case (#low, #medium) { #greater };
        case (_, _) { #equal };
      };
    };
  };

  type PriorityLevel = {
    #high;
    #medium;
    #low;
  };

  type StaffRecord = {
    name : Text;
    role : Text;
    department : Text;
    status : StaffStatus;
  };

  module StaffRecord {
    public func compareByDepartment(a : StaffRecord, b : StaffRecord) : Order.Order {
      Text.compare(a.department, b.department);
    };
  };

  type StaffStatus = {
    #active;
    #inactive;
    #onLeave;
  };

  public shared ({ caller }) func addStaff(name : Text, role : Text, department : Text, status : StaffStatus) : async () {
    let record : StaffRecord = {
      name;
      role;
      department;
      status;
    };
    staff.add(name, record);
    addActivity("Admin", "Added new staff member " # name, #dataEntry);
  };

  public shared ({ caller }) func createAnnouncement(title : Text, content : Text, priority : PriorityLevel, author : Text) : async () {
    let announcement : Announcement = {
      title;
      content;
      date = 0;
      priority;
      author;
    };
    announcements.add(title, announcement);
    addActivity(author, "Created announcement: " # title, #administrative);
  };

  func addActivity(actorName : Text, actionDescription : Text, activityType : ActivityType) {
    let log : ActivityLog = {
      actorName;
      actionDescription;
      timestamp = 0;
      activityType;
    };
    activityLog.add(log.timestamp, log);
  };

  func compareStaffRecordsByDepartment(a : StaffRecord, b : StaffRecord) : Order.Order {
    Text.compare(a.department, b.department);
  };

  public query ({ caller }) func getAllAnnouncements() : async [Announcement] {
    announcements.values().toArray().sort();
  };

  public query ({ caller }) func getAllAnnouncementsByPriority() : async [Announcement] {
    announcements.values().toArray().sort(Announcement.compareByPriority);
  };

  public query ({ caller }) func getAllStaffByDepartment() : async [StaffRecord] {
    staff.values().toArray().sort(StaffRecord.compareByDepartment);
  };

  public query ({ caller }) func getActivityLog() : async [ActivityLog] {
    activityLog.values().toArray().sort();
  };

  public query ({ caller }) func getDashboardStats() : async DashboardStats {
    let totalStaff = staff.size();
    let totalClasses = 45;
    let activeTeachers = 17;
    let todayAttendancePercentage : Float = 91.3;

    {
      totalStaff;
      totalClasses;
      activeTeachers;
      todayAttendancePercentage;
    };
  };
};
