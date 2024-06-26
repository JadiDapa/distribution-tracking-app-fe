type Props = {
  section: string;
  subSection: string;
};

export default function SeactionHeader({ section, subSection }: Props) {
  return (
    <div className="flex gap-1 text-2xl capitalize">
      <span className="text-gray-400">{section} /</span>
      <span>{subSection}</span>
    </div>
  );
}
