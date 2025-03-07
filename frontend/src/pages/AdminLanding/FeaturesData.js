import { FaUserPlus, FaChalkboardTeacher, FaCalendarAlt } from "react-icons/fa";
import { MdEvent, MdWork, MdViewList, MdNoteAdd, MdQuestionAnswer } from "react-icons/md";
import { IoSettingsSharp } from "react-icons/io5";

const features = [
  {
    id: 1,
    name: "Manage departments",
    description: "Manage departments in college",
    icon: IoSettingsSharp,
    route: "/management",
    access: ["admin"],
  },
  {
    id: 2,
    name: "Add Students",
    description: "Register new students into the system.",
    icon: FaUserPlus,
    route: "/addPeople?query=student",
    access: ["admin"], 
  },
  {
    id: 3,
    name: "Add Teachers",
    description: "Register and manage teacher profiles.",
    icon: FaChalkboardTeacher,
    route: "/addPeople?query=teacher",
    access: ["admin"], 
  },
  {
    id: 4,
    name: "Add Timetable",
    description: "Insert and update class timetables.",
    icon: FaCalendarAlt,
    route: "/timetable",
    access: ["admin", "teacher"], 
  },
  {
    id: 5,
    name: "Create Event",
    description: "Plan and manage campus events efficiently.",
    icon: MdEvent,
    route: "/createEvent",
    access: ["admin", "teacher"], 
  },
  {
    id: 6,
    name: "Exam Hall Planner",
    description: "Organize and assign exam halls effectively.",
    icon: MdWork,
    route: "/examHallPlanner",
    access: ["admin"], 
  },
  {
    id: 7,
    name: "View Students and Teachers",
    description: "Access detailed lists of students and teachers.",
    icon: MdViewList,
    route: "/viewUsers",
    access: ["admin", "teacher"], 
  },
  {
    id: 8,
    name: "Study Materials",
    description: "Upload study materials for students.",
    icon: MdNoteAdd,
    route: "/studymaterial",
    access: ["admin", "teacher"], 
  },
  {
    id: 9,
    name: "Q&A Section",
    description: "Ask questions and discuss academic topics.",
    icon: MdQuestionAnswer,
    route: "/question",
    access: ["admin", "teacher", "student"], 
  },
];

export default features;
