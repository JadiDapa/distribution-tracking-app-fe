import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-medium">Add New Account</h1>
        <p className="mt-1">Create an account to add new user</p>
      </div>
      <div className="flex gap-4">
        <Button variant="muted">Discard</Button>
        <Button variant="default" type="submit">
          Add Account
        </Button>
      </div>
    </header>
  );
}
