import { Breadcrumbs } from '@/components/tailgrids/core/breadcrumbs';
import { Card } from '@/components/tailgrids/core/card';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms and Conditions Page',
};

export default function TermsAndConditionsPage() {
    return (
        <div className='mt-6 space-y-5'>
            {/* Header Section */}
            <div className='px-2 lg:px-6'>
                <div className='flex flex-col-reverse items-start justify-between gap-3 sm:flex-row sm:items-center'>
                    <h1 className='mb-1 text-[28px] leading-8 font-medium text-text-primary'>
                        Terms and Conditions
                    </h1>
                    <div>
                        <Breadcrumbs
                            dividerType='chevron'
                            items={[
                                { href: '/', label: 'Home' },
                                { href: '#', label: 'Pages' },
                                {
                                    href: '/terms-and-conditions',
                                    label: 'Terms and Conditions',
                                },
                            ]}
                        />
                    </div>
                </div>

                <div className='mt-6'>
                    <Card className='p-5 md:p-8'>
                        <div className='flex max-w-200 flex-col gap-10 p-3'>
                            {/* Intellectual Property */}
                            <div className='flex flex-col gap-4'>
                                <h2 className='text-2xl leading-8 font-semibold tracking-[-0.2px] text-text-primary'>
                                    Intellectual Property
                                </h2>
                                <p className='text-base leading-6 font-normal tracking-[-0.2px] text-text-secondary'>
                                    Our digital landscape is constantly
                                    expanding, creating a continuous need for
                                    innovative websites, and thus, skilled web
                                    designers and developers. As of early 2024,
                                    there are over 20 billion websites, and the
                                    demand for web developers is projected to
                                    keep growing. Web designers who possess
                                    strong coding skills are highly sought after
                                    and often command higher salaries.
                                </p>
                            </div>

                            {/* User Accounts */}
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4'>
                                    <h2 className='text-2xl leading-8 font-semibold tracking-[-0.2px] text-text-primary'>
                                        User Accounts
                                    </h2>
                                    <p className='text-base leading-6 font-normal tracking-[-0.2px] text-text-secondary'>
                                        The ever-growing digital world requires
                                        more websites, increasing the need for
                                        web designers and developers. With over
                                        20 billion websites online in 2024, the
                                        demand for web developers is expected to
                                        increase. Web designers who are skilled
                                        in coding are in high demand and are
                                        often better compensated.
                                    </p>
                                </div>
                                <p className='text-base leading-6 font-normal tracking-[-0.2px] text-text-secondary'>
                                    A career in web design includes designing,
                                    building, and coding different kinds of
                                    websites. Typical tasks involve talking with
                                    clients about website needs, adding
                                    feedback, working on graphics and images,
                                    and using multimedia like audio and video.
                                </p>
                            </div>

                            {/* Governing Law */}
                            <div className='flex flex-col gap-6'>
                                <h2 className='text-2xl leading-8 font-semibold tracking-[-0.2px] text-text-primary'>
                                    Governing Law
                                </h2>
                                <ul className='flex list-disc flex-col gap-6 pl-5 text-base leading-6 font-normal tracking-[-0.2px] text-text-secondary'>
                                    <li>
                                        The digital world keeps expanding, so
                                        there&apos;s a constant need for
                                        websites, and therefore for web
                                        designers and developers. With over 20
                                        billion websites as of 2028, the demand
                                        for web developers is only expected to
                                        increase.
                                    </li>
                                    <li>
                                        A job in web design means designing,
                                        creating, and coding various websites.
                                        You&apos;ll also talk to clients about
                                        what they want, use their feedback,
                                        handle graphic design and image editing,
                                        and work with multimedia like sound and
                                        video.
                                    </li>
                                </ul>
                            </div>

                            {/* Termination */}
                            <div className='flex flex-col gap-6'>
                                <div className='flex flex-col gap-4'>
                                    <h2 className='text-2xl leading-8 font-semibold tracking-[-0.2px] text-text-primary'>
                                        Termination
                                    </h2>
                                    <p className='text-base leading-6 font-normal tracking-[-0.2px] text-text-secondary'>
                                        Because our world is increasingly
                                        digital, there&apos;s a never-ending
                                        need for websites, which means web
                                        designers and developers are always in
                                        demand. With the number of websites
                                        exceeding 20 billion in 2028, the need
                                        for web developers is only going to
                                        increase. Web designers who can code
                                        well are especially valuable and usually
                                        earn more.
                                    </p>
                                </div>
                                <p className='text-base leading-6 font-normal tracking-[-0.2px] text-text-secondary'>
                                    Working in website design means designing,
                                    building, and coding all sorts of websites.
                                    You&apos;ll also talk to clients, get their
                                    feedback, do graphic design and image
                                    editing, and add multimedia like audio and
                                    video.
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
