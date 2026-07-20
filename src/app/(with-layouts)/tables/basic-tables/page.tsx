import UserTable from '@/app/(with-layouts)/tables/basic-tables/_component/user-table';
import { Breadcrumbs } from '@/components/tailgrids/core/breadcrumbs';
import { Metadata } from 'next';
import LastTransactionsTable from './_component/last-transactions-table';
import LeadsReport from './_component/leads-report';
import PackageTable from './_component/package-table';
import TopChannels from './_component/top-channels';
import TopProductsTable from './_component/top-products-table';

export const metadata: Metadata = {
    title: 'Tables',
};

export default function BasicTablesPage() {
    return (
        <div className='mt-6 space-y-5'>
            {/* Header Section */}
            <div className='flex flex-col-reverse items-start justify-between gap-3 px-2 sm:flex-row sm:items-center lg:px-6'>
                <h1 className='mb-1 text-[28px] leading-8 font-medium text-text-primary'>
                    Basic Tables
                </h1>

                <Breadcrumbs
                    dividerType='chevron'
                    items={[
                        { href: '/', label: 'Home' },
                        { href: '/tables/basic-tables', label: 'Tables' },
                        { href: '/tables/basic-tables', label: 'Basic Tables' },
                    ]}
                />
            </div>

            <div className='space-y-5 px-2 lg:px-5'>
                <TopProductsTable />
                <LeadsReport />
                <PackageTable />
                <LastTransactionsTable />
                <TopChannels />
                <UserTable />
            </div>
        </div>
    );
}
