import { ClockCircleIcon, DisplayIcon, LockIcon, ShieldCheckIcon } from "./icons";

export const securityItems = [
  {
    icon: LockIcon,
    title: "Current Password",
    description: "Change your account password to keep your profile secure",
    actionLabel: "Change",
  },
  {
    icon: ShieldCheckIcon,
    title: "Two-Factor Authentication",
    description: "Activate two-step verification for enhanced account protection",
    actionLabel: "Enable",
  },
  {
    icon: DisplayIcon,
    title: "Active Session",
    description: "View and manage all your currently active login sessions",
    actionLabel: "3 Activity",
  },
  {
    icon: ClockCircleIcon,
    title: "Login Activity",
    description: "Examine your recent login activity and access history",
    actionLabel: "View History",
  },
] as const;
