import { auth } from "@/lib/authentication/auth";

export default async function Page() {
  const session = await auth();
  const userName = session?.user?.name || "User";

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Welcome, {userName}!</h1>
        <p className="text-muted-foreground">
          Manage your tasks and stay organized with our Todo App
        </p>
      </div>
      <div className="flex justify-between items-center">
      </div>
    </div>
  );
}