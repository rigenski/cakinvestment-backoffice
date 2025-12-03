import React from "react";

interface IWrapperProps {
  children: React.ReactNode;
}

export default function Wrapper({ children }: IWrapperProps) {
  return (
    <main className="bg-background mx-auto min-h-screen w-full max-w-full min-w-0 rounded-2xl p-6">
      {children}
    </main>
  );
}
