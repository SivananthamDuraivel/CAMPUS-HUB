import { AiFillHome } from 'react-icons/ai';
import { IoIosPaper, IoMdPeople, IoMdHelpCircle,IoMdAddCircle } from 'react-icons/io';
import { FaCartPlus, FaEnvelopeOpenText } from 'react-icons/fa';
import { FaCalendarAlt } from 'react-icons/fa';
import { BiTask } from 'react-icons/bi';
import { MdEvent } from 'react-icons/md'; 

export const SidebarData = {
  admin: [
    {
      title: 'Add Students',
      path: '/addPeople?query=student',
      icon: IoMdPeople,
      cName: 'nav-text',
    },
    {
      title: 'Add Teachers',
      path: '/addPeople?query=teacher',
      icon: IoMdPeople,
      cName: 'nav-text',
    },
    {
      title: 'Add Timetable',
      path: '/timetable',
      icon: FaCalendarAlt,
      cName: 'nav-text',
    },
    {
      title: 'Create Event',
      path: '/createEvent',
      icon: IoMdAddCircle, 
      cName: 'nav-text',
    },
    {
      title: 'ExamHall Planner',
      path: '/examHallPlanner',
      icon: BiTask,
      cName: 'nav-text',
    },
    {
      title: 'View Students and Teachers',
      path: '/viewUsers',
      icon: IoIosPaper,
      cName: 'nav-text',
    },
    {
      title: 'Control Access',
      path: '/control-access',
      icon: IoMdHelpCircle,
      cName: 'nav-text',
    },
  ],
  teacher: [
    {
      title: 'Create Events',
      path: '/createEvent',
      icon: MdEvent,
      cName: 'nav-text',
    },
    {
      title: 'View Events',
      path: '/view-events',
      icon: FaEnvelopeOpenText,
      cName: 'nav-text',
    },
    {
      title: 'View Timetable',
      path: '/view-timetable',
      icon: FaCalendarAlt,
      cName: 'nav-text',
    },
  ],
  student: [
    {
      title: 'View Timetable',
      path: '/view-timetable',
      icon: FaCalendarAlt,
      cName: 'nav-text',
    },
    {
      title: 'View Events',
      path: '/view-events',
      icon: FaEnvelopeOpenText,
      cName: 'nav-text',
    },
  ],
};
