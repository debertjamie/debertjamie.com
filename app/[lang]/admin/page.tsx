import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UploadForm } from "@/src/components/admin/form";
import { clerkId } from "@/src/lib/env";

export default async function AdminPage() {
  const user = await currentUser();

  if (!user || user.id !== clerkId) {
    redirect("/");
  }

  return (
    <div className="min-h-screen p-12">
      <h1 className="text-3xl mb-8">
        Gallery Admin
      </h1>
      <UploadForm />
    </div>
  );
}
