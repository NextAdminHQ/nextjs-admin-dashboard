"use client";

import {
  BillingIcon,
  GearIcon,
  LogoutIcon,
  UserCircleIcon,
} from "@/components/common/header/icons";
import { Avatar } from "@/components/tailgrids/core/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/tailgrids/core/popover";
import { cn } from "@/utils/cn";
import { AltArrowDownIcon } from "@/utils/icon";
import Link from "next/link";

interface UserProfileMenuItem {
  href: string;
  icon: React.ReactNode;
  label: string;
}

interface UserProfileButtonProps {
  name?: string;
  email?: string;
  avatarUrl?: string;
}

export function UserProfileButton({
  name = "Jhon Smith",
  email = "jhonsmith@example.com",
  avatarUrl,
}: UserProfileButtonProps) {
  const menuItems: UserProfileMenuItem[] = [
    {
      href: "view-profile",
      icon: <UserCircleIcon />,
      label: "View profile",
    },
    {
      href: "account-settings",
      icon: <GearIcon />,
      label: "Account Settings",
    },
    {
      href: "billing-plan",
      icon: <BillingIcon />,
      label: "Billing and Plan",
    },
  ];

  return (
    <Popover placement="bottom-end">
      {/* ── Trigger ── */}
      <PopoverTrigger
        className={cn(
          "group flex items-center gap-2.5 rounded-lg",
          " hover:bg-background-gray-primary",
          "transition-all duration-200",
        )}
      >
        <Avatar
          fallback={name.charAt(0)}
          src={avatarUrl}
          size="md"
          className="[&_div]:rounded-lg [&_img]:rounded-lg"
        />
        <span className="text-sm font-medium leading-5 text-text-primary">{name}</span>
        <span className="text-icon-tertiary">
          <AltArrowDownIcon className="transition-transform duration-200 group-data-[state=open]:-rotate-180" />
        </span>
      </PopoverTrigger>

      {/* ── Dropdown content ── */}
      <PopoverContent
        className={cn(
          "w-[280px] p-0 border border-border-secondary-alt",
          "bg-background-white-secondary shadow-3xl rounded-xl overflow-hidden",
        )}
      >
        {/* User info header */}
        <div className="flex items-center gap-3 px-4 py-4 border-b border-border-secondary">
          <Avatar fallback={name.charAt(0)} src={avatarUrl} size="lg" />
          <div className="min-w-0">
            <p className="font-medium text-text-primary leading-6 truncate">{name}</p>
            <p className="text-sm text-text-tertiary leading-5 truncate">{email}</p>
          </div>
        </div>

        {/* Menu items */}
        <div className="p-1.5">
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
                "text-sm font-medium text-text-secondary hover:bg-background-gray-secondary_alt",
                "hover:text-text-primary group transition-colors duration-200 cursor-pointer",
              )}
            >
              <span className="shrink-0 text-icon-secondary group-hover:text-text-primary">
                {item.icon}
              </span>
              <span className="leading-5">{item.label}</span>
            </Link>
          ))}
        </div>
        {/* logout button */}
        <div className="p-1.5 border-t border-border-secondary-alt">
          <button
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg",
              "text-sm font-medium text-text-secondary hover:bg-background-gray-secondary_alt",
              "hover:text-text-primary group transition-colors duration-200 cursor-pointer",
            )}
          >
            <span className="shrink-0 text-icon-secondary group-hover:text-text-primary">
              <LogoutIcon />
            </span>
            <span className="leading-5">Logout</span>
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

// ── Shared Avatar sub-component ────────────────────────────────────────────────

interface AvatarProps {
  name: string;
  avatarUrl?: string;
  size?: "sm" | "md";
}
