"use client";

import { cn } from "@/utils/cn";
import * as React from "react";
import {
  Button,
  type ButtonProps,
  Disclosure,
  DisclosureGroup,
  type DisclosureGroupProps,
  DisclosurePanel,
  type DisclosurePanelProps,
  type DisclosureProps,
  Heading,
  type HeadingProps,
} from "react-aria-components";

export interface CollapsibleProps extends DisclosureProps {
  className?: string;
}

export function Collapsible({ className, ...props }: CollapsibleProps) {
  return (
    <Disclosure
      data-slot="collapsible"
      className={cn(
        "group w-full max-w-md rounded-xl border border-base-100 bg-card-background-50 transition-all duration-300 ease-out data-disabled:cursor-not-allowed data-disabled:bg-button-outline-disabled-background data-disabled:opacity-70 data-expanded:pb-5 sm:data-expanded:pb-7",
        className,
      )}
      {...props}
    />
  );
}

export interface CollapsibleTriggerProps extends ButtonProps {
  level?: HeadingProps["level"];
  className?: string;
}

export function CollapsibleTrigger({
  children,
  className,
  level = 3,
  ...props
}: CollapsibleTriggerProps) {
  return (
    <Heading level={level}>
      <Button
        slot="trigger"
        data-slot="collapsible-trigger"
        className={cn(
          "group flex w-full items-center justify-between gap-2 p-5 text-left text-title-50 transition-colors duration-200 ease-out outline-none group-data-expanded:font-medium focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-inset disabled:pointer-events-none disabled:opacity-50 sm:p-6",
          className,
        )}
        {...props}
      >
        {children}
      </Button>
    </Heading>
  );
}

export interface CollapsibleContentProps extends DisclosurePanelProps {
  className?: string;
  ref?: React.Ref<HTMLDivElement>;
}

export function CollapsibleContent({ className, ref, ...props }: CollapsibleContentProps) {
  return (
    <DisclosurePanel
      ref={ref}
      data-slot="collapsible-content"
      className={cn(
        "h-(--disclosure-panel-height,auto) overflow-hidden pl-8.5 text-text-100 duration-300 ease-in-out motion-safe:transition-[height]",
        className,
      )}
      {...props}
    />
  );
}

export interface CollapsibleGroupProps extends DisclosureGroupProps {
  className?: string;
}

export function CollapsibleGroup({ className, ...props }: CollapsibleGroupProps) {
  return <DisclosureGroup data-slot="collapsible-group" className={className} {...props} />;
}
