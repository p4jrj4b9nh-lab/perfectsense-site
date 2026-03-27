interface CharacterProfileProps {
  name: string;
  role: string;
  breed: string;
  description: string;
  color?: string;
}

export default function CharacterProfile({
  name,
  role,
  breed,
  description,
  color = "#999",
}: CharacterProfileProps) {
  return (
    <div className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 transition-all hover:border-white/[0.12] hover:bg-white/[0.04]">
      {/* Color accent bar */}
      <div
        className="h-[2px] w-10 rounded-full mb-5"
        style={{ backgroundColor: color }}
      />

      <h3 className="text-[17px] font-[400] text-white tracking-tight mb-1">
        {name}
      </h3>
      <p
        className="text-[12px] font-[200] tracking-[0.1em] uppercase mb-1"
        style={{ color }}
      >
        {role}
      </p>
      <p className="text-[12px] font-[200] text-[#666] mb-4">
        {breed}
      </p>
      <p className="text-[14px] font-[200] leading-relaxed text-[#999]">
        {description}
      </p>
    </div>
  );
}
