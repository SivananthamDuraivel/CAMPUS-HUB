import { AiFillHome } from 'react-icons/ai';
import { IoIosPaper, IoMdPeople, IoMdHelpCircle } from 'react-icons/io';
import { FaCartPlus, FaEnvelopeOpenText } from 'react-icons/fa';

export const SidebarData = [
  {
    title: 'Home',
    path: '/addPeople',
    icon: AiFillHome, 
    cName: 'nav-text',
  },
  {
    title: 'Reports',
    path: '/reports',
    icon: IoIosPaper,
    cName: 'nav-text',
  },
  {
    title: 'Products',
    path: '/products',
    icon: FaCartPlus,
    cName: 'nav-text',
  },
  {
    title: 'Team',
    path: '/team',
    icon: IoMdPeople,
    cName: 'nav-text',
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: FaEnvelopeOpenText,
    cName: 'nav-text',
  },
  {
    title: 'Support',
    path: '/support',
    icon: IoMdHelpCircle,
    cName: 'nav-text',
  },
];
