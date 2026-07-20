'use client';

import { SearchIcon } from '@/components/common/header/icons';
import { NAV_DATA } from '@/components/common/sidebar/data';
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from '@/components/tailgrids/core/input-group';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface SearchItem {
    id: string;
    title: string;
    parentTitle?: string;
    section: string;
    url: string;
    icon?: React.ReactNode;
}

export default function SearchBar() {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    // Keyboard shortcut listener (Cmd+K / Ctrl+K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen((prev) => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Parse NAV_DATA into searchable items grouped by section
    const { itemsBySection } = useMemo(() => {
        const sectionsMap: Record<string, SearchItem[]> = {};

        NAV_DATA.forEach((section) => {
            const sectionLabel = section.label || 'PAGES';

            section.items.forEach((item) => {
                if (item.url) {
                    if (!sectionsMap[sectionLabel]) {
                        sectionsMap[sectionLabel] = [];
                    }
                    sectionsMap[sectionLabel].push({
                        id: item.url,
                        title: item.title,
                        section: sectionLabel,
                        url: item.url,
                        icon: item.icon,
                    });
                }

                if (item.items && item.items.length > 0) {
                    item.items.forEach((subItem) => {
                        if (subItem.url) {
                            if (!sectionsMap[sectionLabel]) {
                                sectionsMap[sectionLabel] = [];
                            }
                            sectionsMap[sectionLabel].push({
                                id: subItem.url,
                                title: subItem.title,
                                parentTitle: item.title,
                                section: sectionLabel,
                                url: subItem.url,
                                icon: item.icon,
                            });
                        }
                    });
                }
            });
        });

        return { itemsBySection: sectionsMap };
    }, []);

    const handleSelect = (url: string) => {
        setOpen(false);
        router.push(url);
    };

    return (
        <>
            {/* Mobile trigger button (< xl) */}
            <button
                onClick={() => setOpen(true)}
                className='flex size-10 items-center justify-center rounded-lg border border-card-border bg-card-background text-icon-primary shadow-xs transition-colors outline-none hover:bg-background-gray-primary focus-visible:border-input-primary-focus-border focus-visible:ring-4 focus-visible:ring-input-primary-focus-border/20 xl:hidden'
                aria-label='Open search modal'
            >
                <SearchIcon />
            </button>

            {/* Desktop trigger button (xl+) */}
            <div className='hidden xl:block'>
                <button
                    onClick={() => setOpen(true)}
                    className='w-full text-left outline-none focus:outline-none'
                    type='button'
                >
                    <InputGroup className='h-10 cursor-pointer'>
                        <InputGroupAddon
                            align='inline-start'
                            className='pr-0 text-icon-tertiary'
                        >
                            <SearchIcon />
                        </InputGroupAddon>
                        <InputGroupInput
                            placeholder='Search pages...'
                            className='pointer-events-none cursor-pointer pl-2 text-sm select-none'
                            readOnly
                        />
                        <InputGroupAddon align='inline-end'>
                            <div className='rounded-md border border-card-border bg-background-gray-primary/50 px-2 py-0.75 text-xs text-text-tertiary'>
                                <span className='font-medium'>⌘</span> K
                            </div>
                        </InputGroupAddon>
                    </InputGroup>
                </button>
            </div>

            {/* Command Palette Modal */}
            <Command.Dialog
                open={open}
                onOpenChange={setOpen}
                label='Global Search'
                overlayClassName='fixed inset-0 z-50 bg-black/50 backdrop-blur-xs transition-opacity duration-200'
                contentClassName='fixed top-1/2 left-1/2 z-50 w-full max-w-xl -translate-x-1/2 -translate-y-1/2 rounded-xl border border-card-border bg-card-background text-text-primary shadow-2xl overflow-hidden outline-none max-sm:max-w-[calc(100%-2rem)]'
            >
                {/* Search Header Input */}
                <div className='border-b border-card-border p-3.5'>
                    <InputGroup className='h-10'>
                        <InputGroupAddon
                            align='inline-start'
                            className='pr-0 text-icon-tertiary'
                        >
                            <SearchIcon />
                        </InputGroupAddon>
                        <Command.Input
                            placeholder='Search pages...'
                            className='w-full min-w-0 flex-1 border-none bg-transparent pl-2 text-sm text-text-primary outline-none placeholder:text-text-tertiary focus:ring-0 focus:outline-none'
                        />
                        <InputGroupAddon align='inline-end'>
                            <div className='rounded-md border border-card-border bg-background-gray-primary/50 px-2 py-0.75 text-xs text-text-tertiary'>
                                ESC
                            </div>
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                {/* Results List */}
                <Command.List className='scrollbar-thin max-h-96 overflow-y-auto p-2'>
                    <Command.Empty className='py-8 text-center text-sm text-text-tertiary'>
                        No pages found matching your search.
                    </Command.Empty>

                    {Object.entries(itemsBySection).map(
                        ([sectionLabel, sectionItems]) => {
                            if (sectionItems.length === 0) return null;
                            return (
                                <Command.Group
                                    key={sectionLabel}
                                    heading={sectionLabel}
                                    className='py-1.5 **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-1.5 **:[[cmdk-group-heading]]:text-[11px] **:[[cmdk-group-heading]]:font-semibold **:[[cmdk-group-heading]]:tracking-wider **:[[cmdk-group-heading]]:text-text-tertiary **:[[cmdk-group-heading]]:uppercase'
                                >
                                    {sectionItems.map((item) => (
                                        <Command.Item
                                            key={item.id}
                                            value={`${item.section} ${item.parentTitle || ''} ${item.title} ${item.url}`}
                                            onSelect={() =>
                                                handleSelect(item.url)
                                            }
                                            className='flex cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-sm text-text-secondary transition-colors hover:bg-background-gray-primary data-[selected=true]:bg-background-gray-primary data-[selected=true]:text-text-primary'
                                        >
                                            <div className='flex min-w-0 items-center gap-3'>
                                                {item.icon && (
                                                    <span className='flex size-5 shrink-0 items-center justify-center text-icon-secondary'>
                                                        {item.icon}
                                                    </span>
                                                )}
                                                <div className='flex items-center gap-1.5 truncate'>
                                                    {item.parentTitle && (
                                                        <span className='truncate font-normal text-text-tertiary'>
                                                            {item.parentTitle} /
                                                        </span>
                                                    )}
                                                    <span className='truncate text-text-primary'>
                                                        {item.title}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='flex shrink-0 items-center gap-2'>
                                                <span className='hidden text-xs text-text-tertiary sm:inline'>
                                                    {item.url}
                                                </span>
                                            </div>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                            );
                        },
                    )}
                </Command.List>

                {/* Modal Footer with navigation shortcuts */}
                <div className='flex items-center justify-between border-t border-card-border bg-background-gray-primary/40 px-4 py-2.5 text-xs text-text-tertiary'>
                    <div className='flex items-center gap-4'>
                        <span className='flex items-center gap-1'>
                            <kbd className='rounded border border-card-border bg-card-background px-1 py-0.5 font-mono text-[10px] shadow-xs'>
                                ↑
                            </kbd>
                            <kbd className='rounded border border-card-border bg-card-background px-1 py-0.5 font-mono text-[10px] shadow-xs'>
                                ↓
                            </kbd>
                            <span>Navigate</span>
                        </span>
                        <span className='flex items-center gap-1'>
                            <kbd className='rounded border border-card-border bg-card-background px-1.5 py-0.5 font-mono text-[10px] shadow-xs'>
                                ↵
                            </kbd>
                            <span>Select</span>
                        </span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <kbd className='rounded border border-card-border bg-card-background px-1.5 py-0.5 font-mono text-[10px] shadow-xs'>
                            ESC
                        </kbd>
                        <span>Close</span>
                    </div>
                </div>
            </Command.Dialog>
        </>
    );
}
