import { FaCalendarAlt, FaChalkboardTeacher, FaTasks } from "react-icons/fa";
import { MdEvent, MdWork, MdGroups } from "react-icons/md";
import { IoListSharp } from "react-icons/io5";

const features = [
  {
    id: 1,
    name: "Event Management",
    description: "Plan and manage campus events effortlessly.",
    icon: MdEvent,
  },
  {
    id: 2,
    name: "Exam Hall Planner",
    description: "Organize exam halls efficiently.",
    icon: FaChalkboardTeacher,
  },
  {
    id: 3,
    name: "Performance Monitor",
    description: "Track and analyze student progress.",
    icon: FaTasks,
  },
  {
    id: 4,
    name: "Collaboration",
    description: "Connect and collaborate on projects.",
    icon: MdGroups,
  },
  {
    id: 5,
    name: "Careers",
    description: "Access career guidance and resources.",
    icon: MdWork,
  },
  {
    id: 6,
    name: "To Do List",
    description: "Manage tasks and deadlines effectively.",
    icon: IoListSharp,
  },
];

export default features;