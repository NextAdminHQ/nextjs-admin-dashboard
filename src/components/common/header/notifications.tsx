"use client";

import { Button } from "@/components/tailgrids/core/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/tailgrids/core/popover";
import { cn } from "@/utils/cn";
import { Bell1 } from "@tailgrids/icons";
import React from "react";

interface Notification {
  id: string;
  icon: React.ReactNode;
  iconBgColor?: string;
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
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    title: "New Message Arrived",
    description: "Elsie McElroy sent you new message",
    timestamp: "5h ago",
    isUnread: true,
  },
  {
    id: "2",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 10h18M7 15h10m4 6H3a2 2 0 01-2-2V5a2 2 0 012-2h18a2 2 0 012 2v14a2 2 0 01-2 2z"
        />
      </svg>
    ),
    iconBgColor: "bg-blue-600",
    title: "Transaction Approved",
    description: "Your payment of $75.00 to Chad Hurley was successful.",
    timestamp: "10h ago",
    isUnread: true,
  },
  {
    id: "3",
    icon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4H9a2 2 0 01-2-2v-4a2 2 0 012-2h6a2 2 0 012 2v4a2 2 0 01-2 2zm-4 0v2a2 2 0 01-2-2v-2a2 2 0 012 2v2z"
        />
      </svg>
    ),
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
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" iconOnly className="relative">
          <Bell1 className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0 border-none shadow-2xl">
        <div className="max-h-150 overflow-hidden rounded-2xl border border-gray-200 bg-white flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">
            <h3 className="text-base font-semibold text-gray-900">Notifications</h3>
            <button className="text-gray-400 hover:text-gray-600 transition-colors">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          </div>

          {/* Subheader */}
          <div className="border-b border-gray-200 bg-gray-50 px-6 py-2">
            <p className="text-xs font-medium text-gray-500 uppercase">Today</p>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto">
            <div className="space-y-0">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "flex gap-3 px-3 py-3 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0 cursor-pointer",
                    notification.isUnread && "bg-blue-50",
                  )}
                >
                  {/* Icon */}
                  <div
                    className={cn(
                      "shrink-0 flex items-center justify-center w-10 h-10 rounded-full",
                      notification.iconBgColor
                        ? notification.iconBgColor
                        : "bg-gray-100 text-gray-600",
                    )}
                  >
                    {typeof notification.icon === "string" ? (
                      <img src={notification.icon} alt="" className="w-5 h-5" />
                    ) : (
                      <span className={notification.iconBgColor ? "text-white" : ""}>
                        {notification.icon}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-sm font-semibold text-gray-900">{notification.title}</p>
                      {notification.isUnread && (
                        <div className="shrink-0 w-1.5 h-1.5 bg-blue-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">{notification.timestamp}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-gray-200 px-6 py-4 bg-white">
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs font-medium text-gray-600 hover:text-gray-900 underline transition-colors"
            >
              Mark all as read
            </button>
            <Button variant="primary" size="sm">
              View All
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
