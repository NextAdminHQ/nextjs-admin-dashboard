import FilterIcon, {
  DownloadIcon,
} from "@/app/(withLayouts)/(home)/_component/lastTransaction/icon";
import { SearchIcon } from "@/components/common/header/icons";
import { Button } from "@/components/tailgrids/core/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";

export default function LastTransaction() {
  return (
    <div className="border-[0.5px] border-card-border bg-card-background rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-text-primary font-semibold leading-6">Last Transaction</p>
        <div className="flex items-center gap-1">
          <InputGroup className="h-9">
            <InputGroupAddon align="inline-start" className="text-icon-tertiary pr-0">
              <SearchIcon className="size-4" />
            </InputGroupAddon>
            <InputGroupInput placeholder="Search" className="pl-2 text-sm" />
          </InputGroup>
          <Button appearance="outline" className="w-8 h-8 p-1.5 text-icon-tertiary">
            <FilterIcon />
          </Button>
          <Button appearance="outline" className="w-8 h-8 p-1.5 text-icon-tertiary">
            <DownloadIcon />
          </Button>
        </div>
      </div>
    </div>
  );
}
