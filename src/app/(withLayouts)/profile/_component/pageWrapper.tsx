import SecurityTabContent from "@/app/(withLayouts)/profile/_component/securityTabContent";
import { TabContent, TabList, TabRoot, TabTrigger } from "@/components/tailgrids/core/tabs";
import AccountTabContent from "./accountTabContent";
import { BellIcon, CrownIcon, PlugCircleIcon, ShieldIcon, UserIcon, UsersGroupIcon } from "./icon";

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
              value={item.value}
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

      <div className="flex-1 w-full p-6">
        <TabContent value="account" className="p-0">
          <AccountTabContent />
        </TabContent>
        <TabContent value="security" className="p-0">
          <SecurityTabContent />
        </TabContent>
      </div>
    </TabRoot>
  );
}
