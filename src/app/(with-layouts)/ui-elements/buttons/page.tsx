import ComponentPreview from '@/components/common/component-preview';
import { Breadcrumbs } from '@/components/tailgrids/core/breadcrumbs';
import { Metadata } from 'next';
import ButtonOutlinedPreview from './_components/button-outlined';
import ButtonSizesPreview from './_components/button-sizes';
import ButtonTypesPreview from './_components/button-types';

export const metadata: Metadata = {
    title: 'Buttons',
};

function ButtonsPage() {
    return (
        <section className='mt-6 space-y-5'>
            {/* Header Section */}
            <div className='flex flex-col-reverse justify-between gap-3 px-2 md:flex-row md:items-center lg:px-6'>
                <h1 className='mb-1 text-[28px] leading-8 font-medium text-text-primary'>
                    Buttons
                </h1>

                <Breadcrumbs
                    className='gap-1 md:gap-2'
                    dividerType='chevron'
                    items={[
                        { href: '/', label: 'Home' },
                        { href: '#', label: 'UI Elements' },
                        { href: '/ui-elements/buttons', label: 'Buttons' },
                    ]}
                />
            </div>

            <section className='grid gap-5 px-2 md:grid-cols-2 md:px-6'>
                <ComponentPreview title='Button Types'>
                    <ButtonTypesPreview />
                </ComponentPreview>
                <ComponentPreview title='Button Outlined'>
                    <ButtonOutlinedPreview />
                </ComponentPreview>
                <ComponentPreview title='Button Sizes'>
                    <ButtonSizesPreview />
                </ComponentPreview>
            </section>
        </section>
    );
}

export default ButtonsPage;
