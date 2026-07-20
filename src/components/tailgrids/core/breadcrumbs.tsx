import { cn } from "@/utils/cn";
import { ChevronRight } from "@tailgrids/icons";

type PropsType = {
  items: {
    href: string;
    label: string;
    icon?: React.ReactNode;
  }[];
  dividerType?: "slash" | "chevron" | "dot";
  activeHref?: string;
  className?: string;
};

export function Breadcrumbs({ items, className, dividerType = "slash" }: PropsType) {
  return (
    <ol className={cn("flex items-center gap-2", dividerType === "dot" && "gap-2", className)}>
      {items.map((item, index) => (
        <li key={item.href} className="contents text-text-tertiary [&_svg]:text-current!">
          {index > 0 && <Divider type={dividerType} />}

          <a
            href={item.href}
            className={cn(
              "flex items-center gap-1 text-sm font-medium [&>svg]:size-4",
              index + 1 === items.length && "text-text-primary",
            )}
          >
            {item.icon}

            {item.label}
          </a>
        </li>
      ))}
    </ol>
  );
}

function Divider({ type }: { type: PropsType["dividerType"] }) {
  switch (type) {
    case "chevron":
      return <ChevronRight className="size-4" />;

    case "dot":
      return <span className="size-1 rounded-full bg-text-200" />;

    default:
      return <span>/</span>;
  }
}
