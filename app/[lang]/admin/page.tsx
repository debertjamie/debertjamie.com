import { currentUser } from "@clerk/nextjs/server";
import { SignInButton, SignOutButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { UploadForm } from "@/src/components/admin/form";
import { clerkId } from "@/src/lib/env";

export default async function AdminPage() {
  const user = await currentUser();

  if (user && user.id !== clerkId) {
    redirect("/");
  }

  return (
    <main className="min-h-screen p-12">
      {!user ? (
        <>
          <h1 className="sr-only">Admin</h1>
          <SignInButton mode="modal">
            <button
              type="button"
              className="rounded-full bg-mist-900 text-mist-50 px-8 py-4 text-xl font-semibold transition-colors duration-300 hover:bg-mist-700"
            >
              Sign In
            </button>
          </SignInButton>
        </>
      ) : (
        <>
          <section className="flex flex-col gap-x-8 pb-8 flex-wrap items-center">
            <h1 className="text-3xl mb-8">Admin</h1>
            <SignOutButton>
              <button
                type="button"
                className="rounded-full bg-mist-900 text-mist-50 px-2 py-1 font-semibold transition-colors duration-300 hover:bg-mist-700"
              >
                Sign Out
              </button>
            </SignOutButton>
          </section>
          <UploadForm />
        </>
      )}
    </main>
  );
}
