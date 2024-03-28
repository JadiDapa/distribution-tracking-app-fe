type Props = {
  title: string;
};

export default function MaterialHeader({ title }: Props) {
  return (
    <div className="flex gap-1 py-6 text-2xl">
      <span className="text-gray-400">Material /</span>
      <span>{title}</span>
    </div>
  );
}
