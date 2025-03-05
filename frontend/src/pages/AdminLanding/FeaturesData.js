import { FaUserPlus, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import { MdEvent, MdWork, MdViewList } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const features = [
  {
    id: 1,
    name: "Add Students",
    description: "Register new students into the system.",
    icon: FaUserPlus,
    route: "/addPeople?query=student",
    access: ["admin"], // Only admins can access this
  },
  {
    id: 2,
    name: "Add Teachers",
    description: "Register and manage teacher profiles.",
    icon: FaChalkboardTeacher,
    route: "/addPeople?query=teacher",
    access: ["admin"], // Only admins can access this
  },
  {
    id: 3,
    name: "Add Timetable",
    description: "Insert and update class timetables.",
    icon: FaCalendarAlt,
    route: "/timetable",
    access: ["admin", "teacher"], // Teachers can also update the timetable
  },
  {
    id: 4,
    name: "Create Event",
    description: "Plan and manage campus events efficiently.",
    icon: MdEvent,
    route: "/createEvent",
    access: ["admin", "teacher"], // Admins & teachers can manage events
  },
  {
    id: 5,
    name: "Exam Hall Planner",
    description: "Organize and assign exam halls effectively.",
    icon: MdWork,
    route: "/examHallPlanner",
    access: ["admin"], // Only admins can access this
  },
  {
    id: 6,
    name: "View Students and Teachers",
    description: "Access detailed lists of students and teachers.",
    icon: MdViewList,
    route: "/viewUsers",
    access: ["admin", "teacher"], // Teachers can also view users
  },
  {
    id: 7,
    name: "Control Access",
    description: "Manage permissions and system access.",
    icon: IoSettingsSharp,
    route: "/controlAccess",
    access: ["admin"], // Only admins can access this
  },
];

export default features;
