import ProgressShowcase from "@/app/(with-layouts)/ui-elements/progress/_components/progress-showcase";
import ProgressVariantsPreview from "@/app/(with-layouts)/ui-elements/progress/_components/progress-variants";
import ComponentPreview from "@/components/common/component-preview";
import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";

export default function ProgressPage() {
  return (
    <section className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="flex flex-col-reverse justify-between gap-3 px-2 md:flex-row md:items-center lg:px-6">
        <h1 className="mb-1 text-[28px] leading-8 font-medium text-text-primary">Progress</h1>

        <Breadcrumbs
          className="gap-1 md:gap-2"
          dividerType="chevron"
          items={[
            { href: "/", label: "Home" },
            { href: "#", label: "UI Elements" },
            { href: "/ui-elements/progress", label: "Progress" },
          ]}
        />
      </div>

      <section className="grid gap-5 px-2 md:grid-cols-2 md:px-6">
        <ComponentPreview title="Progress Variants">
          <ProgressVariantsPreview />
        </ComponentPreview>
        <ComponentPreview title="Progress Showcase">
          <ProgressShowcase />
        </ComponentPreview>
      </section>
    </section>
  );
}
