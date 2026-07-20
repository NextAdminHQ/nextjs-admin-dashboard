import { Progress } from "@/components/tailgrids/core/progress";

export default function ProgressShowcase() {
  return (
    <div className="space-y-5">
      {Array.from({ length: 10 }).map((_, index) => (
        <Progress key={index} progress={(index + 1) * 10} withLabel />
      ))}
    </div>
  );
}
