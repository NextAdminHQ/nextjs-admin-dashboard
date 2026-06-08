import {
  BoxIcon,
  EyeIcon,
  MoneyBagIcon,
  UserGroupIcon,
} from "@/app/(withLayouts)/(home)/_component/overview/icon";

export const overviewData = [
  {
    id: 1,
    title: "Total Views",
    value: "34.5K",
    change: "0.43%",
    isPositive: true,
    icon: <EyeIcon />,
    iconBgClass: "bg-[rgba(59,130,246,0.10)]",
    iconColorClass: "text-[#3B82F6]",
  },
  {
    id: 2,
    title: "Total profit",
    value: "$42,2K",
    change: "4.35%",
    isPositive: true,
    icon: <MoneyBagIcon />,
    iconBgClass: "bg-[rgba(34,197,94,0.10)]",
    iconColorClass: "text-[#22C55E]",
  },
  {
    id: 3,
    title: "Total Order",
    value: "2,450",
    change: "2.59%",
    isPositive: true,
    icon: <BoxIcon />,
    iconBgClass: "bg-[rgba(249,115,22,0.10)]",
    iconColorClass: "text-[#F97316]",
  },
  {
    id: 4,
    title: "Total User",
    value: "3,465",
    change: "0.95%",
    isPositive: false,
    icon: <UserGroupIcon />,
    iconBgClass: "bg-[rgba(168,85,247,0.10)]",
    iconColorClass: "text-[#A855F7]",
  },
];
