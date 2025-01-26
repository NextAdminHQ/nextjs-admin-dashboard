import { CheckIcon, XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useId } from "react";

type PropsType = {
  withIcon?: "check" | "x";
  withBg?: boolean;
  label: string;
  name?: string;
  minimal?: boolean;
};

export function Checkbox({
  withIcon,
  label,
  name,
  withBg,
  minimal,
}: PropsType) {
  const id = useId();

  return (
    <div>
      <label
        htmlFor={id}
        className={cn(
          "flex cursor-pointer select-none items-center",
          !minimal && "text-body-sm font-medium",
        )}
      >
        <div className="relative">
          <input type="checkbox" name={name} id={id} className="peer sr-only" />

          <div
            className={cn(
              "mr-2 flex size-5 items-center justify-center rounded border border-dark-5 peer-checked:border-primary dark:border-dark-6 peer-checked:[&>*]:block",
              withBg
                ? "peer-checked:bg-primary [&>*]:text-white"
                : "peer-checked:bg-gray-2 dark:peer-checked:bg-transparent",
              minimal && "mr-3 border-stroke dark:border-dark-3",
            )}
          >
            {!withIcon && (
              <span className="hidden size-2.5 rounded-sm bg-primary" />
            )}

            {withIcon === "check" && (
              <CheckIcon className="hidden text-primary" />
            )}

            {withIcon === "x" && <XIcon className="hidden text-primary" />}
          </div>
        </div>
        <span>{label}</span>
      </label>
    </div>
  );
}
