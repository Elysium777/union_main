import LandingAnimation from "./LandingAnimation";
import LandingContent from "./LandingContent";
import Navbar from "./Navbar";

export default function LandingMain() {
  return (
    <div className=" bg-yellow-50 max-w-screen w-full overflow-x-hidden relative font-alegreya">
      <LandingAnimation />
      <div className="absolute w-screen h-screen text-8xl italic flex items-center justify-center text-black">
        <div className="absolute -translate-y-24 not-italic font-alegreya">
          {" "}
          delegator's
        </div>
        <p
          className="font-ts
          font-yatraone"
        >
          union
        </p>
      </div>

      <Navbar />

      <LandingContent />
    </div>
  );
}
