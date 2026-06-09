import { Avatar } from "@/components/tailgrids/core/avatar";
import { Button } from "@/components/tailgrids/core/button";
import { Card } from "@/components/tailgrids/core/card";
import { Input } from "@/components/tailgrids/core/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import { Label } from "@/components/tailgrids/core/label";
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tailgrids/core/select";
import { TextArea } from "@/components/tailgrids/core/text-area";
import { LogoutIcon, TrashIcon } from "./icon";

const countryOptions = [
  { value: "us", label: "United States", flag: "/images/flag/US.svg" },
  { value: "ca", label: "Canada", flag: "/images/flag/CA.svg" },
  { value: "uk", label: "United Kingdom", flag: "/images/flag/UK.svg" },
];
export default function AccountTabContent() {
  return (
    <div className="space-y-6">
      {/* Account Details Card */}
      <Card className="bg-transparent p-5">
        <h2 className="text-xl leading-7 font-semibold text-text-primary mb-6">Account Details</h2>

        <div className="flex items-center gap-4 mb-6">
          <Avatar
            src="/images/user/jhon-smith.png"
            alt="Jhon Smith"
            size="3xl"
            fallback="JS"
            className="size-18"
          />
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-3">
              <Button appearance="outline" size="sm">
                Change Avatar
              </Button>
              <Button appearance="outline" variant="danger" size="sm">
                Remove
              </Button>
            </div>
            <p className="text-xs leading-4 text-text-tertiary">
              Accepts PNG, JPEG, GIF; max size 2MB.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="w-full">
            <Label>Full Name</Label>
            <Input placeholder="Jhon Smith" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Email address</Label>
            <Input placeholder="jhon@example.com" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Phone Number</Label>
            <Input placeholder="+1 604 555 1234" className="w-full" />
          </div>
          <div className="w-full">
            <Label>Website</Label>
            <InputGroup className="overflow-hidden">
              <InputGroupAddon className="bg-transparent text-input-placeholder-text-color relative after:absolute after:right-0  after:bg-input-border after:w-px after:h-10">
                https://
              </InputGroupAddon>
              <InputGroupInput placeholder="www.nextadmin.co" />
            </InputGroup>
          </div>
          <div className="w-full">
            <Label>Address</Label>
            <Input placeholder="1901 Thornridge Cir. Shiloh, Hawaii 81063" className="w-full" />
          </div>
          <div>
            <Label>Country</Label>
            <Select aria-label="Country">
              <SelectTrigger className="w-full h-10 border-input-border">
                <SelectValue className="flex items-center gap-2"></SelectValue>
                <SelectIndicator />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((option) => (
                  <SelectItem key={option.value} id={option.value} textValue={option.label}>
                    <span className="flex items-center gap-2">
                      <img
                        src={option.flag}
                        alt={option.label}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span>{option.label}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="w-full col-span-1 md:col-span-2">
            <Label>Bio</Label>
            <TextArea
              className="h-25 shadow-xs"
              placeholder="Passionate software engineer with a knack for crafting scalable web applications and exploring cutting-edge technologies. Always eager to solve complex problems and innovate."
            />
          </div>
          <div className="col-span-1 md:col-span-2 flex justify-end items-center gap-3">
            <Button appearance="outline" variant="primary" size="lg">
              Cancel
            </Button>
            <Button variant="primary" size="lg">
              Save Changes
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-5 bg-transparent">
        {/* Sign Out */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium leading-5 text-text-primary mb-1">
              Sign out from all devices
            </p>
            <p className="text-xs leading-4 text-text-tertiary">
              End all active sessions across your devices.
            </p>
          </div>
          <Button appearance="outline" variant="primary" className="gap-2">
            <LogoutIcon />
            Sign Out
          </Button>
        </div>
        <hr className="border-border-secondary-alt my-4" />
        {/* Delete Account */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium leading-5 text-text-primary mb-1">Delete Account</p>
            <p className="text-xs leading-4 text-text-tertiary">
              Delete your account permanently along with all associated data.
            </p>
          </div>
          <Button appearance="outline" variant="danger" className="gap-2">
            <TrashIcon />
            Delete Account
          </Button>
        </div>
      </Card>
    </div>
  );
}
