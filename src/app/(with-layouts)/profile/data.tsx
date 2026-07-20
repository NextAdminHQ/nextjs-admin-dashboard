import { BellIcon, ShieldCheckIcon, UserIcon } from "./icons";

export const tabsItems = [
  {
    href: "/profile/account",
    icon: <UserIcon />,
    title: "Account",
    description: "Manage your personal data",
  },
  {
    href: "/profile/security",
    icon: <ShieldCheckIcon />,
    title: "Security",
    description: "Set your password, authentication & etc",
  },
  {
    href: "/profile/notification",
    icon: <BellIcon />,
    title: "Notification",
    description: "Customize your notification preferences",
  },
];
