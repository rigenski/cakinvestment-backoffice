"use client";

import { authLogin, login } from "@/services/auth";
import {
    schemaLoginRequest,
    TLoginRequest,
    TVerifyResponse,
} from "@/services/auth/types";
import { setSession } from "@/utils/session";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function LoginForm() {
    const form = useForm<TLoginRequest>({
        resolver: zodResolver(schemaLoginRequest),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginFn = useMutation(login());

    const onSubmit = form.handleSubmit((value) => {
        loginFn.mutate(value, {
            onSuccess: (res) => {
                setSession(res.content as TVerifyResponse);

                toast.success(res.message);

                setTimeout(() => {
                    window.location.href = "/dashboard";
                }, 1000);
            },
            onError: (err) => {
                toast.error(err.message);
            },
        });
    });

    return (
        <div>
            <h1 className="mb-2 text-2xl font-bold">Login</h1>
            <p className="text-muted-foreground mb-6">
                Masukkan email dan password Anda untuk masuk
            </p>

            <Form {...form}>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div className="flex flex-col gap-4">
                        {/* Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Email
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="Masukkan email Anda"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Password */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Password
                                        <span className="text-red-500">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Masukkan password Anda"
                                            {...field}
                                            required
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Submit Button */}
                        <div className="pt-2">
                            <Button
                                type="submit"
                                variant="default"
                                className="w-full"
                                disabled={loginFn.isPending}
                                isLoading={loginFn.isPending}
                            >
                                Login
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
}
