"use client";

import { useRouter } from "next/navigation";
import { ModuleFormData } from "@/app/(protected)/master-data/akademi/types";
import { CreateModuleForm } from "@/app/(protected)/master-data/akademi/_components/create-module-form";

export default function CreateModulePage() {
  const router = useRouter();

  const handleSubmit = (data: ModuleFormData) => {
    // TODO: Replace with actual API call
    console.log("Create module:", data);
    router.push("/master-data/akademi");
  };

  const handleCancel = () => {
    router.push("/master-data/akademi");
  };

  return (
    <div className="bg-background space-y-6 rounded-lg p-6">
      <div>
        <h1 className="text-2xl font-bold">Create Module</h1>
        <p className="text-muted-foreground">
          Tambahkan modul pembelajaran baru ke sistem.
        </p>
      </div>
      <CreateModuleForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
}

