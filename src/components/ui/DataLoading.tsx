import BarLoader from "react-spinners/BarLoader";

export default function DataLoading({ isLoading }: { isLoading: boolean }) {
  return (
    <div className="mt-10 flex w-full flex-col items-center gap-6">
      <p className="text-xl text-primary">Loading Your Data...</p>
      <div className="lg:hidden">
        <BarLoader
          className="rounded-full"
          loading={isLoading}
          color={"blue"}
          height={8}
          width={200}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <div className="hidden lg:block">
        <BarLoader
          className="rounded-full"
          loading={isLoading}
          color={"blue"}
          height={8}
          width={400}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
      <p className="text-sm text-gray-500">
        Reload your page if loading takes too long
      </p>
    </div>
  );
}
