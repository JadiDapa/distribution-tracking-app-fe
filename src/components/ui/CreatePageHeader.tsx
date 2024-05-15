import { Button } from "./button";
import ClipLoader from "react-spinners/ClipLoader";

type Props = {
  header: string;
  subheader: string;
  isLoading?: boolean;
};

export default function CreatePageHeader({
  header,
  subheader,
  isLoading,
}: Props) {
  return (
    <header className="items-center justify-between lg:flex">
      <div className="">
        <h1 className="text-2xl font-medium">{header}</h1>
        <p className="mt-1 text-gray-400">{subheader}</p>
      </div>
      <div className="mt-4 flex gap-4 lg:mt-0">
        <Button variant="muted">Discard</Button>
        <Button variant="default" type="submit">
          {isLoading ? (
            <div className="flex items-center justify-center gap-2 ">
              <ClipLoader
                color={"white"}
                loading={isLoading}
                size={28}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
              <span>Submitting</span>
            </div>
          ) : (
            "Add Data"
          )}
        </Button>
      </div>
    </header>
  );
}
