type Props = {
  section: string;
  subSection: string;
};

export default function SeactionHeader({ section, subSection }: Props) {
  return (
    <div className="flex gap-1 py-6 text-2xl">
      <span className="text-gray-400">{section} /</span>
      <span>{subSection}</span>
    </div>
  );
}
