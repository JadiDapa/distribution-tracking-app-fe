type Props = {
  value: number;
  onChange: (value: number) => void;
};

export default function NumberInput({ value, onChange }: Props) {
  return (
    <div className="inline-block rounded-lg border border-gray-200 bg-white px-3 py-2">
      <div className="flex items-center gap-x-1.5">
        <button
          type="button"
          className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => onChange(value - 1)}
        >
          <svg
            className="size-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
          </svg>
        </button>
        <input
          className="w-6 border-0 bg-transparent p-0 text-center text-gray-800 focus:ring-0 dark:text-white"
          type="text"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
        <button
          type="button"
          className="inline-flex size-6 items-center justify-center gap-x-2 rounded-md border border-gray-200 bg-white text-sm font-medium text-gray-800 shadow-sm hover:bg-gray-50 disabled:pointer-events-none disabled:opacity-50"
          onClick={() => onChange(value + 1)}
        >
          <svg
            className="size-3.5 flex-shrink-0"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
        </button>
      </div>
    </div>
  );
}
