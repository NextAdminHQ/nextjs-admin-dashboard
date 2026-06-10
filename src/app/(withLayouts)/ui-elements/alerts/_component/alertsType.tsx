import Alert from "@/components/tailgrids/core/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { CheckCircleIcon, DangerCircleIcon, DangerTriangleIcon } from "./icon";

export default function AlertsType() {
  return (
    <Card className="p-0 bg-transparent">
      <CardHeader className="px-6 py-4 border-b border-card-border">
        <CardTitle className="font-medium">Alerts Type</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col gap-5">
        <Alert
          variant="gray"
          title="Default Alert"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis. "
          icon={<DangerCircleIcon />}
          classNames={{ wrapper: "max-w-full" }}
        />
        <Alert
          variant="success"
          title="Success Alert"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis."
          icon={<CheckCircleIcon />}
          classNames={{ wrapper: "max-w-full" }}
        />
        <Alert
          variant="info"
          title="Info Alert"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis."
          icon={<DangerCircleIcon />}
          classNames={{ wrapper: "max-w-full" }}
        />
        <Alert
          variant="warning"
          title="Warning Alert"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis."
          icon={<DangerTriangleIcon />}
          classNames={{ wrapper: "max-w-full" }}
        />
        <Alert
          variant="danger"
          title="Error Alert"
          message="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus malesuada risus eu tortor tincidunt mattis."
          icon={<DangerCircleIcon />}
          classNames={{ wrapper: "max-w-full" }}
        />
      </CardContent>
    </Card>
  );
}
