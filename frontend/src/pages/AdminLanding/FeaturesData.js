import { FaUserPlus, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import { MdEvent, MdViewList, MdWork } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const features = [
  {
    id: 1,
    name: "Add Students",
    description: "Register new students into the system.",
    icon: FaUserPlus,
    route: "/addPeople?query=student"
  },
  {
    id: 2,
    name: "Add Teachers",
    description: "Register and manage teacher profiles.",
    icon: FaChalkboardTeacher,
    route: "/addPeople?query=teacher"
  },
  {
    id: 3,
    name: "Add Timetable",
    description: "Insert and update class timetables.",
    icon: FaCalendarAlt,
    route: "/timetable"
  },
  {
    id: 4,
    name: "Create Event",
    description: "Plan and manage campus events efficiently.",
    icon: MdEvent,
    route: "/createEvent"
  },
  {
    id: 5,
    name: "Exam Hall Planner",
    description: "Organize and assign exam halls effectively.",
    icon: MdWork,
    route: "/examHallPlanner"
  },
  {
    id: 6,
    name: "View Students and Teachers",
    description: "Access detailed lists of students and teachers.",
    icon: MdViewList,
    route: "/viewUsers"
  },
  {
    id: 7,
    name: "Control Access",
    description: "Manage permissions and system access.",
    icon: IoSettingsSharp,
    route: "/controlAccess"
  },
];

export default features;
