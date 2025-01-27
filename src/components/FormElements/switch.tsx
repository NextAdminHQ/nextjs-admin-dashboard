import { CheckIcon, XIcon } from "@/assets/icons";
import { cn } from "@/lib/utils";
import { useId } from "react";

type PropsType = {
  withIcon?: boolean;
  background?: "dark" | "light";
  backgroundSize?: "sm" | "default";
  name?: string;
};

export function Switch({
  background,
  withIcon,
  backgroundSize,
  name,
}: PropsType) {
  const id = useId();

  return (
    <label
      htmlFor={id}
      className="flex max-w-fit cursor-pointer select-none items-center"
    >
      <div className="relative">
        <input type="checkbox" name={name} id={id} className="peer sr-only" />
        <div
          className={cn("h-8 w-14 rounded-full bg-gray-3 dark:bg-[#5A616B]", {
            "h-5": backgroundSize === "sm",
            "bg-[#212B36] dark:bg-primary": background === "dark",
          })}
        />

        <div
          className={cn(
            "absolute left-1 top-1 flex size-6 items-center justify-center rounded-full bg-white shadow-switch-1 transition peer-checked:right-1 peer-checked:translate-x-full peer-checked:[&_.check-icon]:block peer-checked:[&_.x-icon]:hidden",
            {
              "-top-1 left-0 size-7 shadow-switch-2": backgroundSize === "sm",
              "peer-checked:bg-primary peer-checked:dark:bg-white":
                background !== "dark",
            },
          )}
        >
          {withIcon && (
            <>
              <CheckIcon className="check-icon hidden fill-white dark:fill-dark" />
              <XIcon className="x-icon" />
            </>
          )}
        </div>
      </div>
    </label>
  );
}
