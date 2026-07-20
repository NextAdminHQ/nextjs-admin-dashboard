import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";

export default function BreadcrumbSlash() {
  return (
    <div className="flex flex-col gap-5">
      <Breadcrumbs
        dividerType="slash"
        items={[
          { href: "#", label: "Docs" },
          { href: "#", label: "Settings" },
        ]}
      />

      <Breadcrumbs
        dividerType="slash"
        items={[
          { href: "#", label: "Dashboard" },
          { href: "#", label: "Profile" },
          { href: "#", label: "Messages" },
        ]}
      />

      <Breadcrumbs
        dividerType="slash"
        items={[
          { href: "#", label: "Dashboard" },
          { href: "#", label: "Account" },
          { href: "#", label: "Reports" },
          { href: "#", label: "Analytics" },
          { href: "#", label: "Support" },
        ]}
      />

      <Breadcrumbs
        dividerType="slash"
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
