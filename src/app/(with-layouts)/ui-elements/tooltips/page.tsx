import TooltipsPositions from "@/app/(with-layouts)/ui-elements/tooltips/_components/tooltips-positions";
import ComponentPreview from "@/components/common/component-preview";
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";

export default function DropdownsPage() {
  return (
    <section className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="flex flex-col-reverse justify-between gap-3 px-2 md:flex-row md:items-center lg:px-6">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">Tooltips</h1>

        <Breadcrumbs
          className="gap-1 md:gap-2"
          dividerType="chevron"
          items={[
            { href: "/", label: "Home" },
            { href: "#", label: "UI Elements" },
            { href: "/ui-elements/tooltips", label: "Tooltips" },
          ]}
        />
      </div>

      <section className="px-2 md:px-6">
        <ComponentPreview title="Tooltip Positions">
          <TooltipsPositions />
        </ComponentPreview>
      </section>
    </section>
  );
}
