"use client";

import {
  BellIcon,
  CreditCardIcon,
  LetterIcon,
  PrinterIcon,
  SettingIcon,
} from "@/components/common/header/icons";
import { Button } from "@/components/tailgrids/core/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/tailgrids/core/popover";
import { cn } from "@/utils/cn";
import React from "react";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  isUnread?: boolean;
}

interface NotificationsProps {
  notifications?: Notification[];
  onMarkAllAsRead?: () => void;
  onViewAll?: () => void;
}

const defaultNotifications: Notification[] = [
  {
    id: "1",
    icon: <LetterIcon />,
    title: "New Message Arrived",
    description: "Elsie McElroy sent you new message",
    timestamp: "5h ago",
    isUnread: true,
  },
  {
    id: "2",
    icon: <CreditCardIcon />,
    title: "Transaction Approved",
    description: "Your payment of $75.00 to Chad Hurley was successful.",
    timestamp: "10h ago",
    isUnread: true,
  },
  {
    id: "3",
    icon: <PrinterIcon />,
    title: "Upcoming Bill",
    description: "Reminder: Invoice EST-INV012 is due in 3 days. Please submit payment.",
    timestamp: "12h ago",
    isUnread: false,
  },
];

export function NotificationsButton() {
  const [notifications, setNotifications] = React.useState(defaultNotifications);

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, isUnread: false })));
  };

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger className="relative size-10 border border-card-border bg-card-background flex items-center justify-center rounded-lg shadow-xs text-icon-primary hover:bg-background-gray-primary transition-colors">
        <BellIcon />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-[11px]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={10}
              height={10}
              viewBox="0 0 10 10"
              fill="none"
            >
              <circle cx={5} cy={5} r={4} fill="#F87171" stroke="white" strokeWidth={2} />
            </svg>
          </span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-[338px] p-0 border border-border-secondary-alt bg-background-white-secondary shadow-3xl rounded-2xl overflow-hidden">
        <div className="max-h-150 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between px-5 pt-5 pb-4">
            <p className="leading-6 font-semibold text-text-primary">Notifications</p>
            <button className="text-icon-secondary p-1 hover:text-icon-primary transition-colors">
              <SettingIcon />
            </button>
          </div>

          {/* Subheader */}
          <div className="border-t border-b border-border-primary bg-background-gray-secondary px-5 py-2">
            <p className="text-xs leading-4 text-text-tertiary uppercase">Today</p>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto px-3 py-2">
            <div className="space-y-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3.5 px-3 py-3 hover:bg-background-gray-secondary_alt transition-colors duration-300 cursor-pointer rounded-lg group",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-background-gray-primary text-icon-secondary border border-border-secondary",
                      "group-hover:bg-brand-500 group-hover:shadow-[0_1px_3px_0.5px_rgba(13,13,18,0.08)] group-hover:text-base-white transition-all duration-300",
                    )}
                  >
                    {notification.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-text-primary leading-5">
                        {notification.title}
                      </p>
                      {notification.isUnread && (
                        <div className="shrink-0 w-1.5 h-1.5 bg-brand-500 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-text-secondary leading-4 mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-text-tertiary leading-4 mt-2">
                      {notification.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-border-secondary-alt px-5 py-4">
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs font-medium text-text-secondary hover:text-text-primary underline transition-colors"
            >
              Mark all as read
            </button>
            <Button variant="primary" size="sm" className="h-9">
              View All
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
