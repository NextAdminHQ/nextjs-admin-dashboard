import { Breadcrumbs } from "@/components/tailgrids/core/breadcrumbs";
import { Button } from "@/components/tailgrids/core/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { AltArrowLeftIcon, AltArrowRightIcon } from "@/utils/icon";

function ButtonsPage() {
  return (
    <div className="mt-6 space-y-5">
      {/* Header Section */}
      <div className="px-2 lg:px-6">
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <h1 className="text-[28px] leading-8 font-medium text-text-primary mb-1">Buttons</h1>
          <div>
            <Breadcrumbs
              dividerType="chevron"
              items={[
                { href: "/", label: "Home" },
                { href: "#", label: "UI Elements" },
                { href: "/buttons", label: "Buttons" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="px-2 lg:px-6 space-y-5">
        <Card className="p-0">
          <CardHeader className="px-6 py-4 border-b border-card-border">
            <CardTitle className="font-medium">Button Variants</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-5">
            <Button>Primary</Button>
            <Button appearance="outline">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardHeader className="px-6 py-4 border-b border-card-border">
            <CardTitle className="font-medium">Buttons Type</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-5">
            <Button variant="danger">Error Fill</Button>
            <Button variant="danger" appearance="outline">
              Error Outline
            </Button>
            <Button variant="success">Success Fill</Button>
            <Button variant="success" appearance="outline">
              Success Outline
            </Button>
          </CardContent>
        </Card>
        <Card className="p-0">
          <CardHeader className="px-6 py-4 border-b border-card-border">
            <CardTitle className="font-medium">Button with Icons</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center gap-5">
            <Button>
              <AltArrowLeftIcon />
              Primary
              <AltArrowRightIcon />
            </Button>
            <Button appearance="outline">
              <AltArrowLeftIcon />
              Secondary
              <AltArrowRightIcon />
            </Button>
            <Button>
              <AltArrowLeftIcon />
              Primary Focus
              <AltArrowRightIcon />
            </Button>
            <Button disabled appearance="outline">
              <AltArrowLeftIcon />
              Primary Disable
              <AltArrowRightIcon />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default ButtonsPage;
