import BarLoader from "react-spinners/BarLoader";

export default function DataLoading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="mt-10 flex w-full flex-col items-center gap-6">
      <p className="text-xl text-primary">Loading Your Data...</p>
      <BarLoader
        className="rounded-full"
        loading={isLoading}
        color={"blue"}
        width={400}
        height={8}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      <p className="text-sm text-gray-500">
        Reload your page if loading takes too long
      </p>
    </div>
  );
}
