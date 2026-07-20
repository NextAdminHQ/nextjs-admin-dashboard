import { Button } from "@/components/tailgrids/core/button";

export default function ButtonOutlinedPreview() {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="primary" appearance="outline">
        Primary
      </Button>
      <Button variant="danger" appearance="outline">
        Danger
      </Button>
      <Button variant="success" appearance="outline">
        Success
      </Button>
      <Button variant="ghost" appearance="outline">
        Ghost
      </Button>
    </div>
  );
}
