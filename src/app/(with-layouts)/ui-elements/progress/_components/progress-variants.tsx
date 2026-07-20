import { Progress } from "@/components/tailgrids/core/progress";

export default function ProgressVariantsPreview() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <Progress progress={25} />
      <Progress progress={50} withLabel />
      <Progress progress={50} withLabel className="flex-row-reverse" />
    </div>
  );
}
