"use client";

import {
  BellIcon,
  CreditCardIcon,
  LetterIcon,
  PrinterIcon,
  SettingIcon,
} from "@/components/common/header/icons";
import { Button } from "@/components/tailgrids/core/button";
import { OverlayWrapper } from "@/components/tailgrids/core/overlay";
import { Popover } from "@/components/tailgrids/core/popover";
import { ScrollArea, ScrollAreaViewport, ScrollBar } from "@/components/tailgrids/core/scroll-area";
import { cn } from "@/utils/cn";
import Link from "next/link";
import React, { useState } from "react";
import { Header, Heading } from "react-aria-components";

interface Notification {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  timestamp: string;
  isUnread?: boolean;
}

const defaultNotifications: { title: string; items: Notification[] }[] = [
  {
    title: "Today",
    items: [
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
    ],
  },
  {
    title: "Yesterday",
    items: [
      {
        id: "4",
        icon: <CreditCardIcon />,
        title: "Transaction Approved",
        description: "Your payment of $75.00 to Chad Hurley was successful.",
        timestamp: "10h ago",
        isUnread: true,
      },
      {
        id: "5",
        icon: <LetterIcon />,
        title: "New Message Arrived",
        description: "Elsie McElroy sent you new message",
        timestamp: "5h ago",
        isUnread: true,
      },
      {
        id: "6",
        icon: <PrinterIcon />,
        title: "Upcoming Bill",
        description: "Reminder: Invoice EST-INV012 is due in 3 days. Please submit payment.",
        timestamp: "12h ago",
        isUnread: false,
      },
    ],
  },
];

export function NotificationsButton() {
  const [notifications, setNotifications] = useState(defaultNotifications);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const unreadCount = notifications.flatMap((n) => n.items).filter((n) => n.isUnread).length;

  const handleMarkAsRead = (notificationId: string) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((group) => ({
        ...group,
        items: group.items.map((item) =>
          item.id === notificationId ? { ...item, isUnread: false } : item,
        ),
      })),
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((n) => ({ ...n, items: n.items.map((i) => ({ ...i, isUnread: false })) })),
    );
  };

  return (
    <OverlayWrapper isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        iconOnly
        appearance="outline"
        className="relative size-10 rounded-lg border border-card-border bg-card-background text-icon-primary shadow-xs focus-visible:border-input-primary-focus-border focus-visible:ring-4 focus-visible:ring-input-primary-focus-border/20 [&>svg]:size-auto"
      >
        <BellIcon />
        {unreadCount > 0 && (
          <span className={cn("absolute top-2 right-2.75 z-1 size-2 rounded-full bg-red-400")}>
            <span className="absolute inset-0 -z-1 animate-ping rounded-full bg-red-400 opacity-75" />
          </span>
        )}
      </Button>

      <Popover
        placement="bottom end"
        className="w-84.5 overflow-hidden rounded-2xl border border-border-secondary-alt bg-background-white-secondary p-0 shadow-3xl"
      >
        {/* Header */}
        <Header className="flex items-center justify-between border-b border-border-secondary-alt px-5 pt-5 pb-4">
          <Heading level={4} className="leading-6 font-semibold text-text-primary">
            Notifications
          </Heading>

          <Link
            className="p-1 text-icon-secondary transition-colors hover:text-icon-primary"
            href="/profile/notification"
            onClick={() => setIsOpen(false)}
          >
            <SettingIcon />
          </Link>
        </Header>

        <ScrollArea className="h-100 max-h-100">
          <ScrollAreaViewport>
            {notifications.map((group) => (
              <section key={group.title}>
                {/* Group Header */}
                <div className="border-t border-b border-border-primary bg-background-gray-secondary px-5 py-2">
                  <p className="text-xs leading-4 text-text-tertiary uppercase">{group.title}</p>
                </div>
                {/* Notifications List */}
                <ul className="flex-1 overflow-y-auto px-3 py-2">
                  {group.items.map((notification) => (
                    <li key={notification.id}>
                      <button
                        className="group flex w-full cursor-pointer gap-3.5 rounded-lg px-3 py-3 transition-colors duration-300 hover:bg-background-gray-secondary_alt"
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        {/* Icon */}
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-secondary bg-background-gray-primary text-icon-secondary transition-all duration-300 group-hover:bg-brand-500 group-hover:text-base-white group-hover:shadow-[0_1px_3px_0.5px_rgba(13,13,18,0.08)]">
                          {notification.icon}
                        </span>

                        {/* Content */}
                        <div className="min-w-0 flex-1 text-start">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm leading-5 font-semibold text-text-primary">
                              {notification.title}
                            </p>

                            {notification.isUnread && (
                              <div className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500" />
                            )}
                          </div>

                          <p className="mt-1 line-clamp-2 text-xs leading-4 text-text-secondary">
                            {notification.description}
                          </p>
                          <p className="mt-2 text-xs leading-4 text-text-tertiary">
                            {notification.timestamp}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </ScrollAreaViewport>
          <ScrollBar />
        </ScrollArea>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border-secondary-alt px-5 py-4">
          <button
            onClick={handleMarkAllAsRead}
            className="text-xs font-medium text-text-secondary underline transition-colors hover:text-text-primary"
          >
            Mark all as read
          </button>
          <Button variant="primary" size="sm" className="bg-brand-500 py-1.5">
            View All
          </Button>
        </div>
      </Popover>
    </OverlayWrapper>
  );
}
