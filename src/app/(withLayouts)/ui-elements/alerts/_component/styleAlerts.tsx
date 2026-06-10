"use client";
import Alert from "@/components/tailgrids/core/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { DangerCircleIcon } from "./icon";

export default function StyleAlerts() {
  return (
    <Card className="p-0 bg-transparent">
      <CardHeader className="px-6 py-4 border-b border-card-border">
        <CardTitle className="font-medium">Alerts Style</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col gap-5">
        <Alert variant="gray" title="Email Not verified" icon={<DangerCircleIcon />} />
        <Alert
          variant="gray"
          title="Email Not verified"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis."
          icon={<DangerCircleIcon />}
        />
        <Alert
          variant="gray"
          title="Email Not verified"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis."
          icon={<DangerCircleIcon />}
          actions={{
            primary: {
              label: "Verify Email",
              onClick: () => alert("Email verification initiated"),
            },
            secondary: {
              label: "Dismiss",
            },
          }}
        />
      </CardContent>
    </Card>
  );
}
