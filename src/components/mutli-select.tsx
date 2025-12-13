// src/components/multi-select.tsx
"use client";

import * as React from "react";
import { CheckIcon, ChevronDownIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { TOption } from "@/types/common";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
} from "@/components/ui/command";
import { Checkbox } from "@/components/ui/checkbox";

interface MultiSelectFieldProps {
    options: TOption[];
    value: string[];
    onChange: (value: string[]) => void;
    placeholder?: string;
    searchPlaceholder?: string;
    emptyMessage?: string;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
    maxDisplayItems?: number;
    searchable?: boolean;
    showSelectAll?: boolean;
    selectAllLabel?: string;
}

export function MultiSelectField({
    options,
    value = [],
    onChange,
    placeholder = "Select options",
    searchPlaceholder = "Search...",
    emptyMessage = "No options found",
    disabled = false,
    className,
    triggerClassName,
    maxDisplayItems = 2,
    searchable = true,
    showSelectAll = true,
    selectAllLabel = "Select All",
}: MultiSelectFieldProps) {
    const [open, setOpen] = React.useState(false);

    const selectedLabels = React.useMemo(() => {
        return value
            .map((v) => options.find((opt) => opt.value === v)?.label)
            .filter(Boolean) as string[];
    }, [value, options]);

    const handleToggle = (optionValue: string) => {
        if (value.includes(optionValue)) {
            onChange(value.filter((v) => v !== optionValue));
        } else {
            onChange([...value, optionValue]);
        }
    };

    const handleRemove = (optionValue: string, e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(value.filter((v) => v !== optionValue));
    };

    const handleSelectAll = () => {
        if (value.length === options.length) {
            onChange([]);
        } else {
            onChange(options.map((opt) => opt.value));
        }
    };

    const handleClear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange([]);
    };

    const displayValue = () => {
        if (selectedLabels.length === 0) {
            return <span className="text-muted-foreground">{placeholder}</span>;
        }

        if (selectedLabels.length <= maxDisplayItems) {
            return (
                <div className="flex flex-wrap gap-1">
                    {selectedLabels.map((label, index) => (
                        <span
                            key={value[index]}
                            className="bg-secondary text-secondary-foreground inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs"
                        >
                            {label}
                            <button
                                type="button"
                                onClick={(e) => handleRemove(value[index], e)}
                                className="hover:bg-secondary-foreground/20 rounded-full"
                            >
                                <XIcon className="size-3" />
                            </button>
                        </span>
                    ))}
                </div>
            );
        }

        return (
            <span>
                {selectedLabels.length} item
                {selectedLabels.length > 1 ? "s" : ""} selected
            </span>
        );
    };

    const isAllSelected = value.length === options.length && options.length > 0;
    const isIndeterminate = value.length > 0 && value.length < options.length;

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild disabled={disabled}>
                <button
                    type="button"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                        "border-input data-placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 dark:bg-input/30 dark:hover:bg-input/50 flex min-h-9 w-full items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
                        triggerClassName,
                        className
                    )}
                >
                    <div className="flex-1 text-left">{displayValue()}</div>
                    <div className="flex items-center gap-1">
                        {value.length > 0 && (
                            <button
                                type="button"
                                onClick={handleClear}
                                className="hover:bg-muted rounded p-0.5"
                            >
                                <XIcon className="text-muted-foreground size-4" />
                            </button>
                        )}
                        <ChevronDownIcon className="text-muted-foreground size-4 opacity-50" />
                    </div>
                </button>
            </PopoverTrigger>

            <PopoverContent
                className="w-[var(--radix-popover-trigger-width)] p-0"
                align="start"
            >
                <Command>
                    {searchable && (
                        <CommandInput placeholder={searchPlaceholder} />
                    )}
                    <CommandList>
                        <CommandEmpty>{emptyMessage}</CommandEmpty>
                        <CommandGroup>
                            {/* Select All Option */}
                            {showSelectAll && options.length > 0 && (
                                <>
                                    <CommandItem
                                        onSelect={handleSelectAll}
                                        className="cursor-pointer"
                                    >
                                        <div
                                            className={cn(
                                                "border-primary flex size-4 items-center justify-center rounded border",
                                                isAllSelected &&
                                                    "bg-primary text-primary-foreground",
                                                isIndeterminate &&
                                                    "bg-primary text-primary-foreground"
                                            )}
                                        >
                                            {isAllSelected && (
                                                <CheckIcon className="size-3" />
                                            )}
                                            {isIndeterminate && (
                                                <div className="bg-primary-foreground h-0.5 w-2" />
                                            )}
                                        </div>
                                        <span className="font-medium">
                                            {selectAllLabel}
                                        </span>
                                    </CommandItem>
                                    <CommandSeparator />
                                </>
                            )}

                            {/* Options */}
                            {options.map((option) => {
                                const isSelected = value.includes(option.value);
                                return (
                                    <CommandItem
                                        key={option.value}
                                        value={option.label}
                                        onSelect={() =>
                                            handleToggle(option.value)
                                        }
                                        className="cursor-pointer"
                                    >
                                        <Checkbox
                                            checked={isSelected}
                                            className="pointer-events-none"
                                        />
                                        <span>{option.label}</span>
                                    </CommandItem>
                                );
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
