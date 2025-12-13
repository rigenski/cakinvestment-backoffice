"use client";

import LoginForm from "./login-form";
import Illustration from "./illustration";

export default function Container() {
    return (
        <section className="flex h-screen">
            {/* Left Section - Blue Background */}
            <div className="hidden items-center justify-center bg-[#2563eb] lg:flex lg:w-1/2"></div>

            {/* Right Section - Login Form */}
            <div className="bg-background flex w-full items-center justify-center p-8 lg:w-1/2">
                <div className="w-full max-w-md space-y-8">
                    {/* Logo */}
                    <Illustration />

                    {/* Form */}
                    <LoginForm />
                </div>
            </div>
        </section>
    );
}
