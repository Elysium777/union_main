"use client";
import anime from "animejs";
import { useState, useRef, useEffect } from "react";

export default function LandingAnimation() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentQuote, setCurrentQuote] = useState(0);
  const containerRef = useRef(null);
  const quoteRefs = useRef([]);
  const unionTextRef = useRef(null);

  const preventScroll = () => {
    document.body.style.overflow = "hidden";
    document.body.style.height = "100vh";
    document.documentElement.style.overflow = "hidden";
    document.documentElement.style.height = "100vh";
  };

  const enableScroll = () => {
    document.body.style.overflow = "";
    document.body.style.height = "";
    document.documentElement.style.overflow = "";
    document.documentElement.style.height = "";
  };

  const quotes = [
    {
      text:
        "When people come together to vote, they create a power greater than money.",
      author: "Vitalik Buterin",
      role: "Ethereum Co-founder",
    },
    {
      text:
        "The future of democracy lies in collective intelligence and decentralized decision-making.",
      author: "Naval Ravikant",
      role: "AngelList Co-founder",
    },
    {
      text: "Alone we can do so little, together we can do so much.",
      author: "Helen Keller",
      role: "Author & Political Activist",
    },
    {
      text: "The power of the people is greater than the people in power.",
      author: "Wael Ghonim",
      role: "Internet Activist",
    },
  ];

  const animateQuote = (index) => {
    if (!isVisible) return;

    quoteRefs.current.forEach((ref, i) => {
      if (i !== index && i !== index - 1) {
        ref.style.opacity = "0";
        ref.style.visibility = "hidden";
      }
    });

    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    if (index > 0) {
      const prevQuote = quoteRefs.current[index - 1];
      prevQuote.style.visibility = "visible";
      timeline.add({
        targets: prevQuote,
        opacity: [1, 0],
        translateY: [0, 0],
        duration: 500,
        complete: () => {
          prevQuote.style.visibility = "hidden";
        },
      });
    }

    const currentQuoteEl = quoteRefs.current[index];
    currentQuoteEl.style.visibility = "visible";
    timeline.add({
      targets: currentQuoteEl,
      opacity: [0, 1],
      translateY: [0, 0],
      duration: 500,
    });

    if (index === quotes.length - 1) {
      timeline.add({
        targets: currentQuoteEl,
        opacity: [1, 0],
        duration: 500,
        delay: 1000,
        complete: () => {
          currentQuoteEl.style.visibility = "hidden";
        },
      });

      timeline.add({
        begin: () => {
          unionTextRef.current.style.visibility = "visible";
        },
        targets: unionTextRef.current,
        opacity: [0, 1],
        duration: 1000,
        complete: () => {
          anime({
            targets: containerRef.current,
            opacity: [1, 0],
            duration: 2000,
            easing: "easeOutQuad",
            complete: () => {
              enableScroll();
              setIsVisible(false);
            },
          });
        },
      });
    } else {
      setTimeout(() => {
        setCurrentQuote(index + 1);
      }, 2000);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    preventScroll();

    quoteRefs.current.forEach((ref) => {
      if (ref) {
        ref.style.opacity = "0";
        ref.style.visibility = "hidden";
      }
    });
    if (unionTextRef.current) {
      unionTextRef.current.style.opacity = "0";
      unionTextRef.current.style.visibility = "hidden";
    }
    animateQuote(currentQuote);

    return () => {
      enableScroll();
    };
  }, [currentQuote]);

  if (!isVisible) return null;

  return (
    <div className="fixed w-screen h-screen bg-black z-20" ref={containerRef}>
      <div className="flex flex-col items-center justify-center h-full w-full text-white">
        {quotes.map((quote, index) => (
          <div
            key={index}
            ref={(el) => (quoteRefs.current[index] = el)}
            className="text-2xl font-alegraya flex flex-col text-center w-[700px] absolute"
            style={{
              opacity: 0,
              visibility: "hidden",
              transform: "translateY(0px)",
            }}
          >
            <p className="text-6xl">{quote.text}</p>
            <p className="text-2xl mt-10">
              <span className="font-bold">{quote.author}</span>, {quote.role}
            </p>
          </div>
        ))}
        <div
          ref={unionTextRef}
          className="flex flex-col text-center absolute"
          style={{
            opacity: 0,
            visibility: "hidden",
          }}
        >
          <p className="text-8xl font-yatraone italic">union</p>
        </div>
      </div>
    </div>
  );
}
