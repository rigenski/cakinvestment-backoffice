import type {
    Matcher,
    SelectSingleEventHandler,
    SelectRangeEventHandler,
    DateRange,
} from "react-day-picker";

import { CalendarIcon } from "lucide-react";

import { DateTime } from "luxon";
import { cn } from "@/utils/classname";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";

interface DatePickerProps {
    mode?: "single" | "range";
    selected?: Date | DateRange | undefined;
    onSelect?: SelectSingleEventHandler | SelectRangeEventHandler | undefined;
    className?: string;
    disabled?: Matcher | Array<Matcher> | undefined;
    placeholder?: string;
    buttonClassName?: string;
    disablePrevious?: boolean;
    captionLayout?: "label" | "dropdown" | "dropdown-months" | "dropdown-years";
    isError?: boolean;
    showDayName?: boolean;
}

export default function DatePicker(props: DatePickerProps) {
    const {
        selected,
        onSelect,
        className,
        disabled,
        placeholder,
        buttonClassName,
        disablePrevious,
        captionLayout = "label",
        mode = "single",
        isError,
    } = props;

    const getButtonText = () => {
        if (mode === "single" && selected && !("from" in selected)) {
            return DateTime.fromJSDate(selected as Date)
                .setLocale("ja-JP")
                .toFormat("dd/MM/yyyy");
        }
        if (mode === "range" && selected && "from" in selected) {
            const range = selected as DateRange;
            if (range.from && range.to) {
                return `${DateTime.fromJSDate(range.from)
                    .setLocale("ja-JP")
                    .toFormat("dd/MM/yyyy")} - ${DateTime.fromJSDate(range.to)
                    .setLocale("ja-JP")
                    .toFormat("dd/MM/yyyy")}`;
            }
            if (range.from) {
                return DateTime.fromJSDate(range.from)
                    .setLocale("ja-JP")
                    .toFormat("dd/MM/yyyy");
            }
        }
        return placeholder;
    };

    const hasSelection =
        mode === "single"
            ? selected && !("from" in selected)
            : selected && "from" in selected && (selected as DateRange).from;

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        disabled={!!disabled}
                        variant="ghost"
                        className={cn(
                            "selection:bg-primary selection:text-primary-foreground",
                            "justify-start text-left normal-case font-normal",
                            "h-9 w-full min-w-0 rounded-md bg-background px-3 py-1 text-base text-foreground shadow-xs transition-[color,box-shadow] outline-none md:text-sm backdrop-blur-2xl",
                            "border border-transparent focus-visible:border-primary focus-visible:ring-primary focus-visible:ring-[1px]",
                            "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
                            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
                            !hasSelection && "text-foreground/50",
                            buttonClassName
                        )}
                        aria-invalid={isError ? true : undefined}
                    >
                        {getButtonText() || <span>{placeholder}</span>}
                        <CalendarIcon className="ms-auto size-5 grow-0 opacity-50" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <div className="flex">
                        {mode === "single" ? (
                            <Calendar
                                mode="single"
                                selected={selected as Date | undefined}
                                onSelect={onSelect as SelectSingleEventHandler}
                                disabled={
                                    disablePrevious
                                        ? { before: new Date() }
                                        : disabled
                                }
                                initialFocus
                                captionLayout={captionLayout}
                            />
                        ) : (
                            <Calendar
                                mode="range"
                                selected={selected as DateRange | undefined}
                                onSelect={onSelect as SelectRangeEventHandler}
                                disabled={
                                    disablePrevious
                                        ? { before: new Date() }
                                        : disabled
                                }
                                initialFocus
                                captionLayout={captionLayout}
                            />
                        )}
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    );
}
