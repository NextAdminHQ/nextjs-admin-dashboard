import Alert from "@/components/tailgrids/core/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { CheckCircleIcon, DangerCircleIcon, DangerTriangleIcon } from "./icon";

export default function OutlinedAlerts() {
  return (
    <Card className="p-0 bg-transparent">
      <CardHeader className="px-6 py-4 border-b border-card-border">
        <CardTitle className="font-medium">Outlined Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col gap-5">
        <Alert variant="outline" title="Email Not verified" icon={<DangerCircleIcon />} />

        <Alert
          variant="outline"
          title="Payment Completed Successfully"
          icon={<CheckCircleIcon />}
          classNames={{ iconWrapper: "bg-badge-success-background text-badge-success-icon-color" }}
        />
        <Alert
          variant="outline"
          title="New Update Available"
          icon={<DangerCircleIcon />}
          classNames={{ iconWrapper: "bg-badge-cyan-background text-badge-cyan-icon-color" }}
        />
        <Alert
          variant="outline"
          title="Your Subscription expires in 3 Days"
          icon={<DangerTriangleIcon />}
          classNames={{ iconWrapper: "bg-badge-warning-background text-badge-warning-icon-color" }}
        />
        <Alert
          variant="outline"
          title="Failed to Connect to server"
          icon={<DangerCircleIcon />}
          classNames={{ iconWrapper: "bg-badge-error-background text-badge-error-icon-color" }}
        />
      </CardContent>
    </Card>
  );
}
