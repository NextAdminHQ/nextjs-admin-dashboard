import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Security Page',
};

export default function SecurityPageLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
