"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { TOption } from "@/types/common";

interface SingleSelectProps {
    options: TOption[];
    value?: string | null;
    onChange: (value: string | null) => void;
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    triggerClassName?: string;
    allOption?: TOption;
}

export function SingleSelect({
    options,
    value,
    onChange,
    placeholder = "Select an option",
    disabled = false,
    className,
    triggerClassName,
    allOption,
}: SingleSelectProps) {
    const allValue = allOption?.value ?? "all";

    const handleChange = (selectedValue: string) => {
        if (allOption && selectedValue === allValue) {
            onChange(null);
        } else {
            onChange(selectedValue);
        }
    };

    return (
        <Select
            value={value ?? (allOption ? allValue : undefined)}
            onValueChange={handleChange}
            disabled={disabled}
        >
            <SelectTrigger
                className={cn("w-full", triggerClassName, className)}
            >
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {allOption && (
                    <SelectItem value={allValue}>{allOption.label}</SelectItem>
                )}
                {options.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
