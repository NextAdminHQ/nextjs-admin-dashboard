"use client";

import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabsItems } from "./data";

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="flex flex-col-reverse items-start justify-between gap-3 px-2 sm:flex-row sm:items-center lg:px-6">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">Profile</h1>
        <div>
          <Breadcrumbs
            dividerType="chevron"
            items={[
              { href: "/", label: "Home" },
              { href: "/profile", label: "Profile" },
            ]}
          />
        </div>
      </div>

      {/* Page Content */}
      <div className="space-y-5 px-2 lg:px-6">
        <div className="flex max-w-full flex-col gap-x-0 gap-y-6 rounded-xl border-[0.5px] border-card-border bg-card-background p-0 md:flex-row md:gap-y-8 lg:min-h-150">
          {/* Sidebar Navigation */}
          <nav className="flex w-full shrink-0 grow flex-col gap-2 self-stretch border-card-border px-3 py-6 lg:max-w-84.5 lg:border-r">
            {tabsItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  data-active={isActive}
                  className="flex w-full items-start justify-start gap-3 rounded-xl p-2 hover:bg-background-gray-secondary_alt/45 data-[active=true]:border-none data-[active=true]:bg-background-gray-secondary_alt"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-lg border border-border-secondary-alt bg-background-gray-secondary_alt text-icon-secondary">
                    {item.icon}
                  </div>
                  <div className="flex flex-col items-start gap-1">
                    <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                    <span className="text-xs font-normal text-text-tertiary">
                      {item.description}
                    </span>
                  </div>
                </Link>
              );
            })}
          </nav>

          {/* Content Area */}
          <div className="w-full flex-1 p-6">{children}</div>
        </div>
      </div>
    </div>
  );
}
