import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from "@/components/tailgrids/core/dialog";
import { Input } from "@/components/tailgrids/core/input";
import { Label } from "@/components/tailgrids/core/label";
import { cn } from "@/utils/cn";
import { useState } from "react";
import { ClockCircleIcon, DisplayIcon, LockIcon, ShieldCheckIcon } from "./icon";

const securityItems = [
  {
    icon: LockIcon,
    title: "Current Password",
    description: "Change your account password to keep your profile secure",
    actionLabel: "Change",
  },
  {
    icon: ShieldCheckIcon,
    title: "Two-Factor Authentication",
    description: "Activate two-step verification for enhanced account protection",
    actionLabel: "Enable",
  },
  {
    icon: DisplayIcon,
    title: "Active Session",
    description: "View and manage all your currently active login sessions",
    actionLabel: "3 Activity",
  },
  {
    icon: ClockCircleIcon,
    title: "Login Activity",
    description: "Examine your recent login activity and access history",
    actionLabel: "View History",
  },
] as const;

export default function SecurityTabContent() {
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);

  return (
    <div>
      <h2 className="text-xl leading-7 font-semibold text-text-primary">Security</h2>

      <div className="mt-6 divide-y divide-card-border space-y-2">
        {securityItems.map(({ icon: Icon, title, description, actionLabel }) => (
          <div
            key={title}
            className="flex flex-col gap-4 py-3 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="flex min-w-0 items-start gap-3">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-background-gray-secondary_alt text-icon-secondary">
                <Icon />
              </div>

              <div className="min-w-0">
                <p className="text-sm font-medium leading-5 text-text-primary">{title}</p>
                <p className="mt-1 text-xs leading-4 text-text-tertiary">{description}</p>
              </div>
            </div>

            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-auto shrink-0 rounded-none text-brand-500 pr-0 hover:bg-transparent hover:text-brand-600 py-2 focus:ring-0 text-base"
              onClick={() => actionLabel.toLowerCase() === "change" && setOpenPasswordDialog(true)}
            >
              {actionLabel}
            </Button>
          </div>
        ))}
      </div>

      <Dialog isOpen={openPasswordDialog} onOpenChange={() => setOpenPasswordDialog(false)}>
        <DialogOverlay isDismissable>
          <DialogContent className="p-0 max-w-108.75">
            <DialogHeader className="pl-5 pr-14 py-4 gap-1 border-b border-border-secondary">
              <DialogTitle className="text-xl leading-7">Update Password</DialogTitle>
              <DialogDescription className="text-text-tertiary">
                Create a secure password to keep your account safe
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 px-5 space-y-4">
              <div>
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  id="current-password"
                  type="password"
                  placeholder="Enter your current password"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  placeholder="Choose a new password"
                  className="w-full"
                />
              </div>
              <div>
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  placeholder="Re-enter your new password"
                  className="w-full"
                />
              </div>
            </div>
            <DialogFooter className="px-5 py-4 gap-3 border-t- border-border-secondary items-center flex">
              <DialogClose className={cn(buttonStyles({ appearance: "outline", size: "lg" }))}>
                Cancel
              </DialogClose>
              <Button size="lg">Apply Changes</Button>
            </DialogFooter>
          </DialogContent>
        </DialogOverlay>
      </Dialog>
    </div>
  );
}
