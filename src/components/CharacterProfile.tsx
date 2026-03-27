import Image from "next/image";

interface CharacterProfileProps {
  name: string;
  role: string;
  image?: string;
  color?: string;
}

export default function CharacterProfile({
  name,
  role,
  image,
  color = "#999",
}: CharacterProfileProps) {
  return (
    <div className="group text-center">
      {image && (
        <div className="relative w-full aspect-[3/4] rounded-2xl overflow-hidden mb-4">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        </div>
      )}
      <h3 className="text-[15px] font-[400] text-white tracking-tight mb-1">
        {name}
      </h3>
      <p
        className="text-[11px] font-[200] tracking-[0.1em] uppercase"
        style={{ color }}
      >
        {role}
      </p>
    </div>
  );
}
