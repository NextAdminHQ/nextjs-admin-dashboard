import Alert from "@/components/tailgrids/core/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/tailgrids/core/card";
import { CheckCircleIcon, DangerCircleIcon, DangerTriangleIcon } from "./icon";

export default function SolidAlerts() {
  return (
    <Card className="p-0 bg-transparent">
      <CardHeader className="px-6 py-4 border-b border-card-border">
        <CardTitle className="font-medium">Solid Alerts</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center flex-col gap-5">
        <Alert
          variant="gray"
          title="Email Not verified"
          icon={<DangerCircleIcon />}
          classNames={{
            wrapper: "bg-alert-default-button-background border-alert-default-button-background",
            title: "text-base-white",
            iconWrapper: "bg-[#FAFAFA] text-[#71717A]",
            closeButton: "text-base-white",
          }}
        />
        <Alert
          variant="success"
          title="Payment Completed Successfully"
          icon={<CheckCircleIcon />}
          classNames={{
            wrapper: "bg-alert-success-button-background border-alert-success-button-background ",
            title: "text-base-white",
            iconWrapper: "bg-[#FAFAFA] text-[#16A34A]",
            closeButton: "text-base-white",
          }}
        />
        <Alert
          variant="info"
          title="New Update Available"
          icon={<DangerCircleIcon />}
          classNames={{
            wrapper: "bg-alert-info-button-background border-alert-info-button-background ",
            title: "text-base-white",
            iconWrapper: "bg-[#FAFAFA] text-[#0EA5E9]",
            closeButton: "text-base-white",
          }}
        />
        <Alert
          variant="warning"
          title="Your Subscription expires in 3 Days"
          icon={<DangerTriangleIcon />}
          classNames={{
            wrapper: "bg-alert-warning-button-background border-alert-warning-button-background ",
            title: "text-base-white",
            iconWrapper: "bg-[#FAFAFA] text-[#EAB308]",
            closeButton: "text-base-white",
          }}
        />
        <Alert
          variant="danger"
          title="Failed to Connect to server"
          icon={<DangerCircleIcon />}
          classNames={{
            wrapper: "bg-alert-danger-button-background border-alert-danger-button-background ",
            title: "text-base-white",
            iconWrapper: "bg-[#FAFAFA] text-[#DC2626]",
            closeButton: "text-base-white",
          }}
        />
      </CardContent>
    </Card>
  );
}
