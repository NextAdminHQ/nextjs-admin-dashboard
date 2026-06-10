import Alert from "@/components/tailgrids/core/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { CheckCircleIcon, DangerCircleIcon, DangerTriangleIcon } from "./icon";

export default function SoftAlerts() {
  return (
    <Card className="p-0 bg-transparent">
      <CardHeader className="px-6 py-4 border-b border-card-border">
        <CardTitle className="font-medium">Outlined Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col gap-5">
        <Alert variant="gray" title="Email Not verified" icon={<DangerCircleIcon />} />
        <Alert
          variant="success"
          title="Payment Completed Successfully"
          icon={<CheckCircleIcon />}
        />
        <Alert variant="info" title="New Update Available" icon={<DangerCircleIcon />} />
        <Alert
          variant="warning"
          title="Your Subscription expires in 3 Days"
          icon={<DangerTriangleIcon />}
        />
        <Alert variant="danger" title="Failed to Connect to server" icon={<DangerCircleIcon />} />
      </CardContent>
    </Card>
  );
}
