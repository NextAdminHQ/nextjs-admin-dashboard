import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";

export default function BreadcrumbArrow() {
  return (
    <div className="flex flex-col gap-5">
      <Breadcrumbs
        dividerType="chevron"
        items={[
          { href: "#", label: "Docs" },
          { href: "#", label: "Settings" },
        ]}
      />

      <Breadcrumbs
        dividerType="chevron"
        items={[
          { href: "#", label: "Dashboard" },
          { href: "#", label: "Profile" },
          { href: "#", label: "Messages" },
        ]}
      />

      <Breadcrumbs
        dividerType="chevron"
        items={[
          { href: "#", label: "Dashboard" },
          { href: "#", label: "Account" },
          { href: "#", label: "Reports" },
          { href: "#", label: "Analytics" },
          { href: "#", label: "Support" },
        ]}
      />

      <Breadcrumbs
        dividerType="chevron"
        items={[
          { href: "#", label: "Dashboard" },
          { href: "#", label: "..." },
          { href: "#", label: "Users" },
          { href: "#", label: "Billing" },
          { href: "#", label: "Logout" },
        ]}
      />
    </div>
  );
}
