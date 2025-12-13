import z from "zod";

export type TTakeProfitSignal = {
    id: string;
    signalId: string;
    takeProfit: string;
    order: number;
    createdAt: string;
    updatedAt: string;
};

export type TSignal = {
    id: string;
    code: string;
    name: string;
    type: string;
    stopLoss: string;
    target: string | null;
    createdAt: string;
    updatedAt: string;
    takeProfitSignals: TTakeProfitSignal[];
};

export const schemaTakeProfitSignal = z.object({
    takeProfit: z.number(),
    order: z.number().int().min(1),
});

export const schemaSignal = z
    .object({
        code: z.string(),
        name: z.string(),
        type: z.enum(["SHORT_TERM", "SWING", "LONG_TERM"]),
        stopLoss: z.number().optional().nullable(),
        target: z.number().optional().nullable(),
        takeProfitSignals: z
            .array(schemaTakeProfitSignal)
            .superRefine((takeProfitSignals, ctx) => {
                // Find parent type
                const parentType = (ctx as any).parent?.type;
                const type = parentType || undefined;

                if (!type) return;

                if (type === "SHORT_TERM") {
                    if (takeProfitSignals.length !== 1) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message:
                                "SHORT_TERM signal must have exactly 1 takeProfitSignal",
                        });
                    }
                }

                if (type === "SWING") {
                    if (
                        takeProfitSignals.length < 1 ||
                        takeProfitSignals.length > 5
                    ) {
                        ctx.addIssue({
                            code: z.ZodIssueCode.custom,
                            message:
                                "SWING signal must have between 1 and 5 takeProfitSignals",
                        });
                    }
                }

                if (type === "LONG_TERM" && takeProfitSignals.length > 0) {
                    ctx.addIssue({
                        code: z.ZodIssueCode.custom,
                        message:
                            "LONG_TERM signal must not have any takeProfitSignals",
                    });
                }
            }),
    })
    .superRefine((data, ctx) => {
        if (
            data.type === "LONG_TERM" &&
            (data.target === undefined || data.target === null)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["target"],
                message: "Target is required for LONG_TERM signal",
            });
        }
        if (
            data.type !== "LONG_TERM" &&
            data.target !== undefined &&
            data.target !== null
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["target"],
                message: "Target should only be set for LONG_TERM signal",
            });
        }
        // stopLoss is required for SHORT_TERM and SWING, but not for LONG_TERM
        if (
            (data.type === "SHORT_TERM" || data.type === "SWING") &&
            (data.stopLoss === undefined || data.stopLoss === null)
        ) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                path: ["stopLoss"],
                message:
                    "Stop loss is required for SHORT_TERM and SWING signals",
            });
        }
        // if (
        //     data.type === "LONG_TERM" &&
        //     data.stopLoss !== undefined &&
        //     data.stopLoss !== null
        // ) {
        //     ctx.addIssue({
        //         code: z.ZodIssueCode.custom,
        //         path: ["stopLoss"],
        //         message: "Stop loss should not be set for LONG_TERM signal",
        //     });
        // }
    });

export type TSignalRequest = z.infer<typeof schemaSignal>;

export function signalToRequest(data?: TSignal | null): TSignalRequest {
    if (!data) {
        return {
            code: "",
            name: "",
            type: "SHORT_TERM",
            stopLoss: null,
            target: null,
            takeProfitSignals: [
                {
                    takeProfit: 0,
                    order: 1,
                },
            ],
        };
    }

    const type = data.type as "SHORT_TERM" | "SWING" | "LONG_TERM";

    // Convert takeProfitSignals
    let takeProfitSignals = data.takeProfitSignals.map((tp) => ({
        takeProfit: Number(tp.takeProfit),
        order: tp.order,
    }));

    // For SHORT_TERM and SWING, ensure at least one takeProfitSignal exists
    if (type !== "LONG_TERM" && takeProfitSignals.length === 0) {
        takeProfitSignals = [{ takeProfit: 0, order: 1 }];
    }

    return {
        code: data.code,
        name: data.name,
        type,
        stopLoss: Number(data.stopLoss),
        target: data.target ? Number(data.target) : null,
        takeProfitSignals,
    };
}
