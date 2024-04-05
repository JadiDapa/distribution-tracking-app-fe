import { Button } from "./button";

type Props = {
  header: string;
  subheader: string;
};

export default function CreatePageHeader({ header, subheader }: Props) {
  return (
    <header className="flex items-center justify-between">
      <div className="">
        <h1 className="text-2xl font-medium">{header}</h1>
        <p className="mt-1 text-gray-400">{subheader}</p>
      </div>
      <div className="flex gap-4">
        <Button variant="muted">Discard</Button>
        <Button variant="default" type="submit">
          Add Data
        </Button>
      </div>
    </header>
  );
}
