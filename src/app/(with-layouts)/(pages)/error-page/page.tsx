import { Breadcrumbs } from '@/components/tailgrids/core/breadcrumbs';
import { Card } from '@/components/tailgrids/core/card';
import { ArrowLeft } from '@tailgrids/icons';
import { Metadata } from 'next';
import Link from 'next/link';
import { ErrorFaceIcon } from './icons';

export const metadata: Metadata = {
    title: 'Error Page',
};

export default function ErrorPage() {
    return (
        <div className='mt-6 space-y-5'>
            {/* Header Section */}
            <div className='px-2 lg:px-6'>
                <div className='flex flex-col-reverse items-start justify-between gap-3 px-2 sm:flex-row sm:items-center lg:px-6'>
                    <h1 className='mb-1 text-[28px] leading-8 font-medium text-text-primary'>
                        Error Page
                    </h1>
                    <div>
                        <Breadcrumbs
                            dividerType='chevron'
                            items={[
                                { href: '/', label: 'Home' },
                                { href: '#', label: 'Pages' },
                                { href: '/error-page', label: 'Error Page' },
                            ]}
                        />
                    </div>
                </div>

                {/* Content Section */}
                <div className='mt-6'>
                    <Card className='relative flex flex-col items-center justify-center overflow-clip rounded-xl border-[0.5px] border-border-secondary bg-card-background p-5'>
                        <div className='relative flex w-full flex-col items-center justify-center pt-10 pb-20'>
                            {/* Illustration Container */}
                            <div className='relative flex h-62.5 w-125 flex-col items-center justify-center overflow-clip rounded-[746px] border border-border-secondary/20'>
                                <ErrorFaceIcon />
                            </div>

                            {/* Text Info */}
                            <div className='mt-20 flex flex-col items-center gap-3 text-center'>
                                <h2 className='text-4xl leading-10 font-semibold text-text-primary'>
                                    Page not found!
                                </h2>
                                <div className='text-sm leading-5 font-normal tracking-[-0.15px] text-text-tertiary'>
                                    <p>
                                        The page you are looking for doesn’t
                                        exist.
                                    </p>
                                    <p>Here are some helpful links:</p>
                                </div>
                            </div>

                            {/* Action Button */}
                            <Link
                                href='/'
                                className='mt-6 flex items-center justify-center gap-1.5 overflow-clip rounded-lg bg-primary-500 px-3.5 py-2.5 text-white transition-colors hover:bg-primary-500/90'
                            >
                                <ArrowLeft className='size-5' />
                                <span className='px-0.5 text-sm leading-5 font-medium tracking-[-0.15px] whitespace-nowrap'>
                                    Back To Home
                                </span>
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
