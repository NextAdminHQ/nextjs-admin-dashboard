import ComponentPreview from '@/components/common/component-preview';
import { Breadcrumbs } from '@/components/tailgrids/core/breadcrumbs';
import { Metadata } from 'next';
import BreadcrumbArrow from './_components/breadcrumb-arrow';
import BreadcrumbSlash from './_components/breadcrumb-slash';

export const metadata: Metadata = {
    title: 'Breadcrumbs',
};

export default function BreadcrumbsPage() {
    return (
        <section className='mt-6 space-y-5'>
            {/* Header Section */}
            <div className='flex flex-col-reverse justify-between gap-3 px-2 md:flex-row md:items-center lg:px-6'>
                <h1 className='mb-1 text-[28px] leading-8 font-medium text-text-primary'>
                    Breadcrumbs
                </h1>

                <Breadcrumbs
                    className='gap-1 md:gap-2'
                    dividerType='chevron'
                    items={[
                        { href: '/', label: 'Home' },
                        { href: '#', label: 'UI Elements' },
                        {
                            href: '/ui-elements/breadcrumbs',
                            label: 'Breadcrumbs',
                        },
                    ]}
                />
            </div>

            <section className='grid gap-5 px-2 md:grid-cols-2 md:px-6'>
                <ComponentPreview title='Breadcrumbs With Arrow Divider'>
                    <BreadcrumbArrow />
                </ComponentPreview>
                <ComponentPreview title='Breadcrumbs With Slash Divider'>
                    <BreadcrumbSlash />
                </ComponentPreview>
            </section>
        </section>
    );
}
