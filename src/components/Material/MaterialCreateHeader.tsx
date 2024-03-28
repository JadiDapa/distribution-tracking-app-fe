import { Button } from "../ui/button";

export default function MaterialCreateHeader() {
  return (
    <header className="flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-medium">Add New Material</h1>
        <p className="mt-1 text-gray-400">
          Add new material to use accross the app
        </p>
      </div>
      <div className="flex gap-4">
        <Button variant="muted">Discard</Button>
        <Button variant="default" type="submit">
          Add Material
        </Button>
      </div>
    </header>
  );
}
