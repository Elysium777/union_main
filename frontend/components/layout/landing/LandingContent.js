export default function LandingContent() {
  const votingTypes = [
    {
      title: "Traditional",
      description:
        "Classic one-token-one-vote system with straightforward majority rules.",
    },
    {
      title: "Equal",
      description:
        "Democratic one-person-one-vote system regardless of token holdings.",
    },
    {
      title: "Conviction",
      description:
        "Time-weighted voting system that rewards long-term commitment.",
    },
    {
      title: "NFT",
      description: "Unique voting power based on NFT holdings and attributes.",
    },
    {
      title: "Quadratic",
      description:
        "Rank-choice voting (allowing one to express preference of certain choices over others).",
    },
    {
      title: "Flare",
      description:
        "Stake USDT to resolve your voting power as Flare. Powered by Flare.",
    },
  ];

  return (
    <>
      <div className="w-full h-screen flex items-center justify-center relative text-black">
        <p className="text-5xl text-center max-w-[700px] translate-y-60">
          Unite with other delegators to maximize your voting impact and
          influence decisions.
        </p>
      </div>

      <div className="w-full pb-20" id="voting-section">
        <div className="text-6xl mb-20 text-black max-w-[900px] mx-auto font-alegreya text-left">
          Voting Types
        </div>

        <div className="grid grid-cols-2 gap-10 max-w-[900px] mx-auto">
          {votingTypes.map((type, index) => (
            <div key={index} className="w-full flex flex-col text-black gap-5">
              <div className="text-4xl font-yatraone italic">{type.title}</div>
              <div className="border border-black w-full"></div>
              <div className="text-2xl text-left">{type.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="w-full pb-20">
        <div className="flex flex-col items-center text-center justify-center h-[500px] max-w-[900px] mx-auto">
          <div className="text-black text-5xl">
            Built for thousands of delegators to make their voices heard
          </div>

          <div className="text-black text-xl mt-10">at</div>

          <div className="text-black text-3xl mt-1">
            ETH <p className="font-yatraone italic text-6xl">กรุงเทพมหานคร</p>{" "}
            <p className="-mt-2">2024</p>
          </div>
        </div>
      </div>
    </>
  );
}
