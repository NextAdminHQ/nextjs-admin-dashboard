import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile Page",
};

export default function AccountPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
