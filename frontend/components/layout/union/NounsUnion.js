import Image from "next/image";

export default function NounsUnion() {
  return (
    <div className="bg-white/10 p-5 rounded-xl space-y-4 relative overflow-hidden">
      <div className="font-alegreya text-2xl">Powered by Nouns</div>
      <div className="text-sm text-gray-300 w-[450px]">
        Nouns are an experimental attempt to improve the formation of on-chain
        avatar communities. This Union is powered by Nouns, voting power is
        distributed based on the number of Nouns held.
      </div>

      <Image
        src="/NounsCover.svg"
        alt="Nouns"
        width={320}
        height={320}
        className="rounded-xl absolute right-0 top-0"
      />
    </div>
  );
}
