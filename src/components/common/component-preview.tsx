import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/tailgrids/core/card';
import { cn } from '@/utils/cn';

export default function ComponentPreview({
    title,
    children,
    className,
}: {
    title: string;
    children?: React.ReactNode;
    className?: string;
}) {
    return (
        <Card className={cn('bg-transparent p-0', className)}>
            <CardHeader className='border-b border-card-border p-4 md:px-6'>
                <CardTitle level={2} className='font-medium'>
                    {title}
                </CardTitle>
            </CardHeader>

            <CardContent className='p-4 md:px-6'>{children}</CardContent>
        </Card>
    );
}
