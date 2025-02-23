import { GalleryVerticalEnd } from "lucide-react";
import { LoginForm } from "@/components/login-form";
import { SITE_NAME } from "@/lib/constants";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { DASHBOARD } from "@/lib/constants/Route";

export default async function LoginPage() {
  const session = await getServerSession();

  console.log(session);
  if (session?.user) {
    redirect(DASHBOARD);
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <GalleryVerticalEnd className="size-4" />
          </div>
          {SITE_NAME}
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
