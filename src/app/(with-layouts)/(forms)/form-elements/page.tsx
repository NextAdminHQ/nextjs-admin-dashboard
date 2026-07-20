import ComponentPreview from '@/components/common/component-preview';
import { Breadcrumbs } from '@/components/tailgrids/core/breadcrumbs';
import { Metadata } from 'next';
import InputField from './_components/input-field';
import InputGroupComponents from './_components/input-group';
import Selects from './_components/selects';
import TextAreaInput from './_components/text-area';
import TimeAndDate from './_components/time-date';
import UploadZone from './_components/upload-zone';

export const metadata: Metadata = {
    title: 'Form Elements Page',
};

export default function FormElementsPage() {
    return (
        <div className='mt-6 space-y-5'>
            {/* Header Section */}
            <div className='flex flex-col-reverse items-start justify-between gap-3 px-2 sm:flex-row sm:items-center lg:px-6'>
                <h1 className='mb-1 text-[28px] leading-8 font-medium text-text-primary'>
                    Form Elements
                </h1>

                <div>
                    <Breadcrumbs
                        dividerType='chevron'
                        items={[
                            { href: '/', label: 'Home' },
                            { href: '/form-elements', label: 'Forms' },
                            { href: '/form-elements', label: 'Form Elements' },
                        ]}
                    />
                </div>
            </div>

            {/* Main Content */}
            <section className='grid grid-cols-1 gap-5 px-2 lg:grid-cols-2 lg:px-6'>
                <div className='flex flex-col gap-5'>
                    <ComponentPreview title='Input Field'>
                        <InputField />
                    </ComponentPreview>
                    <ComponentPreview title='Text Area'>
                        <TextAreaInput />
                    </ComponentPreview>
                    <ComponentPreview title='Upload Zone'>
                        <UploadZone />
                    </ComponentPreview>
                </div>

                <div className='flex flex-col gap-5'>
                    <ComponentPreview title='Input Group'>
                        <InputGroupComponents />
                    </ComponentPreview>
                    <ComponentPreview title='Selects'>
                        <Selects />
                    </ComponentPreview>
                    <ComponentPreview title='Time and Date'>
                        <TimeAndDate />
                    </ComponentPreview>
                </div>
            </section>
        </div>
    );
}
