import { MenuDotsIcon } from "@/utils/icon";

export default function RegionLabels() {
  return (
    <div className="border-[0.5px] border-card-border bg-card-background rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-text-primary font-semibold leading-6">Region Labels</p>
        <button className="p-1.5 rounded-lg bg-button-primary-outline-background hover:bg-button-primary-outline-hover-background transition-colors">
          <MenuDotsIcon />
        </button>
      </div>
    </div>
  );
}
