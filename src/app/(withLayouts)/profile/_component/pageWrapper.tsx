import { Avatar } from "@/components/tailgrids/core/avatar";
import { Button } from "@/components/tailgrids/core/button";
import { Card } from "@/components/tailgrids/core/card";
import { Input } from "@/components/tailgrids/core/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/tailgrids/core/input-group";
import {
  Select,
  SelectContent,
  SelectIndicator,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/tailgrids/core/select";
import { TabContent, TabList, TabRoot, TabTrigger } from "@/components/tailgrids/core/tabs";
import { TextArea } from "@/components/tailgrids/core/text-area";
import {
  BellIcon,
  CrownIcon,
  LogoutIcon,
  PlugCircleIcon,
  ShieldIcon,
  TrashIcon,
  UserIcon,
  UsersGroupIcon,
} from "./icon";

const tabsItems = [
  {
    value: "account",
    icon: <UserIcon />,
    title: "Account",
    description: "Manage your personal data",
  },
  {
    value: "security",
    icon: <ShieldIcon />,
    title: "Security",
    description: "Set your password, authentication & etc",
  },
  {
    value: "notification",
    icon: <BellIcon />,
    title: "Notification",
    description: "Customize your notification preferences",
  },
  {
    value: "team",
    icon: <UsersGroupIcon />,
    title: "Team and Workspace",
    description: "Manage who can view your activity and",
  },
  {
    value: "billing",
    icon: <CrownIcon />,
    title: "Billing and Plan",
    description: "Manage your billing information and subscription plan",
  },
  {
    value: "apps",
    icon: <PlugCircleIcon />,
    title: "Connected Apps",
    description: "Manage apps connected to your account",
  },
];
export default function PageWrapper() {
  return (
    <TabRoot
      defaultValue="account"
      direction="horizontal"
      className="border-card-border border-[0.5px] bg-card-background p-0 gap-6 lg:gap-8 flex-col lg:flex-row"
    >
      <TabList className="w-full shrink-0 border-r border-card-border gap-2 p-0 px-3 py-6 min-h-0 h-full">
        {tabsItems.map((item) => {
          return (
            <TabTrigger
              key={item.value}
              value="account"
              className="w-full flex items-start gap-3 p-2 rounded-xl justify-start data-[active=true]:bg-background-gray-secondary data-[active=true]:border-none"
            >
              <div className="text-icon-secondary bg-background-gray-secondary rounded-lg size-11 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div className="flex flex-col items-start gap-1">
                <span className="text-sm font-semibold text-text-primary">{item.title}</span>
                <span className="text-xs text-text-tertiary font-normal">{item.description}</span>
              </div>
            </TabTrigger>
          );
        })}
      </TabList>

      <div className="flex-1 w-full max-w-[800px] p-6">
        <TabContent value="account" className="p-0">
          <div className="space-y-6">
            {/* Account Details Card */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-6">Account Details</h2>

              <div className="flex items-center gap-5 mb-8">
                <Avatar
                  src="https://avatars.githubusercontent.com/u/124599?v=4"
                  alt="Jhon Smith"
                  size="xxl"
                  fallback="JS"
                  className="size-[72px]"
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <Button
                      appearance="outline"
                      variant="primary"
                      size="sm"
                      className="h-[38px] font-medium text-text-primary border-border-primary"
                    >
                      Change Avatar
                    </Button>
                    <Button
                      appearance="outline"
                      variant="danger"
                      size="sm"
                      className="h-[38px] font-medium text-red-500 border-red-500 hover:bg-red-50"
                    >
                      Remove
                    </Button>
                  </div>
                  <p className="text-[13px] text-text-tertiary">
                    Accepts PNG, JPEG, GIF; max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Full Name</label>
                  <Input
                    placeholder="Jhon Smith"
                    defaultValue="Jhon Smith"
                    className="text-text-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Email address</label>
                  <Input
                    placeholder="jhon@example.com"
                    defaultValue="jhon@example.com"
                    className="text-text-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Phone Number</label>
                  <Input
                    placeholder="+1 604 555 1234"
                    defaultValue="+1 604 555 1234"
                    className="text-text-secondary"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Website</label>
                  <InputGroup className="overflow-hidden">
                    <InputGroupAddon className="bg-background-gray-secondary border-r border-input-border text-text-tertiary px-4 h-full">
                      https://
                    </InputGroupAddon>
                    <InputGroupInput
                      placeholder="www.nextadmin.co"
                      defaultValue="www.nextadmin.co"
                      className="text-text-secondary"
                    />
                  </InputGroup>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-text-primary">Address</label>
                  <Input
                    placeholder="1901 Thornridge Cir. Shiloh, Hawaii 81063"
                    defaultValue="1901 Thornridge Cir. Shiloh, Hawaii 81063"
                    className="text-text-secondary"
                  />
                </div>
                <div className="space-y-2 flex flex-col justify-start">
                  <label className="text-sm font-medium text-text-primary">Country</label>
                  <Select defaultSelectedKey="us" aria-label="Country">
                    <SelectTrigger className="w-full text-text-primary h-[46px] border-input-border">
                      <SelectValue className="flex items-center gap-2">
                        {({ selectedText }) => (
                          <span className="flex items-center gap-2 font-medium">
                            {selectedText ? selectedText : "Select a country"}
                          </span>
                        )}
                      </SelectValue>
                      <SelectIndicator />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem id="us" textValue="United States">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">🇺🇸</span>
                          <span>United States</span>
                        </span>
                      </SelectItem>
                      <SelectItem id="ca" textValue="Canada">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">🇨🇦</span>
                          <span>Canada</span>
                        </span>
                      </SelectItem>
                      <SelectItem id="uk" textValue="United Kingdom">
                        <span className="flex items-center gap-2">
                          <span className="text-lg">🇬🇧</span>
                          <span>United Kingdom</span>
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-text-primary">Bio</label>
                <TextArea
                  placeholder="Passionate software engineer with a knack for crafting scalable web applications and exploring cutting-edge technologies. Always eager to solve complex problems and innovate."
                  defaultValue="Passionate software engineer with a knack for crafting scalable web applications and exploring cutting-edge technologies. Always eager to solve complex problems and innovate."
                  className="h-28 text-text-secondary"
                />
              </div>
            </Card>

            {/* Sign Out Card */}
            <Card className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-1">
                    Sign out from all devices
                  </h3>
                  <p className="text-[13px] text-text-tertiary">
                    End all active sessions across your devices.
                  </p>
                </div>
                <Button
                  appearance="outline"
                  variant="primary"
                  className="shrink-0 h-[38px] text-text-primary border-border-primary font-medium px-4"
                >
                  <LogoutIcon />
                  Sign Out
                </Button>
              </div>
            </Card>

            {/* Delete Account Card */}
            <Card className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-medium text-text-primary mb-1">Delete Account</h3>
                  <p className="text-[13px] text-text-tertiary">
                    Delete your account permanently along with all associated data.
                  </p>
                </div>
                <Button
                  appearance="outline"
                  variant="danger"
                  className="shrink-0 h-[38px] text-red-500 border-red-500 hover:bg-red-50 font-medium px-4"
                >
                  <TrashIcon />
                  Delete Account
                </Button>
              </div>
            </Card>
          </div>
        </TabContent>
      </div>
    </TabRoot>
  );
}
