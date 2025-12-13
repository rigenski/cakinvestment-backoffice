import { SingleSelect } from "@/components/single-select";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useFormContext } from "react-hook-form";
import { TSignalRequest } from "@/services/master-data/signal/type";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";

export const TYPE_OPTIONS = [
    {
        label: "Short Term",
        value: "SHORT_TERM",
    },
    {
        label: "Swing",
        value: "SWING",
    },
    {
        label: "Long Term",
        value: "LONG_TERM",
    },
];

export default function SignalForm() {
    const form = useFormContext<TSignalRequest>();

    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: "takeProfitSignals",
    });

    const addTakeProfit = () => {
        append({
            takeProfit: 0,
            order: fields.length + 1,
        });
    };

    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Kode Emiten
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan kode emiten"
                                    {...field}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Nama Emiten
                                <span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Masukkan nama emiten"
                                    {...field}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>

            <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>
                            Type
                            <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                            <SingleSelect
                                options={TYPE_OPTIONS}
                                value={field.value}
                                onChange={field.onChange}
                                placeholder="Pilih type"
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            {form.watch("type") === "SHORT_TERM" && (
                <div className="grid grid-cols-2 gap-4">
                    <FormField
                        control={form.control}
                        name="stopLoss"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Stop Loss
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan stop loss"
                                        min={0}
                                        step="any"
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : null
                                            )
                                        }
                                        onWheel={(e) => e.currentTarget.blur()}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="takeProfitSignals.0.takeProfit"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Take Profit
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan take profit"
                                        min={0}
                                        step="any"
                                        value={field.value ?? ""}
                                        onChange={(e) => {
                                            field.onChange(
                                                e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : null
                                            );

                                            form.setValue(
                                                "takeProfitSignals.0.order",
                                                1
                                            );
                                        }}
                                        onWheel={(e) => e.currentTarget.blur()}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            )}

            {form.watch("type") === "LONG_TERM" && (
                <FormField
                    control={form.control}
                    name="target"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Target<span className="text-red-500">*</span>
                            </FormLabel>
                            <FormControl>
                                <Input
                                    type="number"
                                    placeholder="Masukkan target"
                                    min={0}
                                    step="any"
                                    value={field.value ?? ""}
                                    onChange={(e) =>
                                        field.onChange(
                                            e.target.value
                                                ? parseFloat(e.target.value)
                                                : null
                                        )
                                    }
                                    onWheel={(e) => e.currentTarget.blur()}
                                    required
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            )}

            {form.watch("type") === "SWING" && (
                <div className="space-y-4">
                    <FormField
                        control={form.control}
                        name="stopLoss"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Stop Loss
                                    <span className="text-red-500">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        placeholder="Masukkan stop loss"
                                        min={0}
                                        step="any"
                                        value={field.value ?? ""}
                                        onChange={(e) =>
                                            field.onChange(
                                                e.target.value
                                                    ? parseFloat(e.target.value)
                                                    : null
                                            )
                                        }
                                        onWheel={(e) => e.currentTarget.blur()}
                                        required
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center justify-between">
                        <FormLabel>Take Profit</FormLabel>
                        <div className="flex items-center gap-2">
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => remove(fields.length - 1)}
                            >
                                <Icon icon="lucide:minus" className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">{fields.length} TP</span>
                            <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={addTakeProfit}
                                disabled={fields.length >= 5}
                            >
                                <Icon icon="lucide:plus" className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {Array.from(
                            { length: Math.min(fields.length, 5) },
                            (_, i) => {
                                return (
                                    <FormField
                                        key={fields[i].id}
                                        control={form.control}
                                        name={`takeProfitSignals.${i}.takeProfit`}
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>
                                                    TP {fields[i].order}
                                                    {i === 0 && (
                                                        <span className="text-red-500">
                                                            *
                                                        </span>
                                                    )}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder={`Masukkan TP ${
                                                            i + 1
                                                        }`}
                                                        min={0}
                                                        step="any"
                                                        value={
                                                            field.value ?? ""
                                                        }
                                                        onChange={(e) => {
                                                            field.onChange(
                                                                e.target.value
                                                                    ? parseFloat(
                                                                          e
                                                                              .target
                                                                              .value
                                                                      )
                                                                    : null
                                                            );

                                                            form.setValue(
                                                                `takeProfitSignals.${i}.order`,
                                                                i + 1
                                                            );
                                                        }}
                                                        onWheel={(e) =>
                                                            e.currentTarget.blur()
                                                        }
                                                        required={i === 0}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                );
                            }
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
