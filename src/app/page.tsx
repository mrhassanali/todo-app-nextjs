import { auth } from "@/lib/authentication/auth";
import { Button } from "@/components/ui/button";
import { LOGIN, DASHBOARD } from "@/lib/constants/Route";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();

  if (session) {
    redirect(DASHBOARD);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-4xl font-bold">Welcome to Todo App</h1>
          <p className="text-center text-xl">
            Please login to manage your todos
          </p>
          <Link href={LOGIN}>
            <Button size="lg" className="mt-4">
              Login to Continue
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}