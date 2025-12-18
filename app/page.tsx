"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import { Outfit } from "next/font/google";
import {
  ArrowDown,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

// --- CONFIG: PREMIUM FONT ---
const font = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

// --- HELPER 1: REVEAL ON SCROLL (Pop Up Animation) ---
const RevealSection = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out transform ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      } ${className}`}
    >
      {children}
    </div>
  );
};

// --- HELPER 2: INFINITE TYPEWRITER EFFECT ---
const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else {
          setIsVisible(false);
          setDisplayText("");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isVisible, text]);

  return (
    <span ref={ref}>
      {displayText}
      <span className="animate-pulse text-[#ccff00]">|</span>
    </span>
  );
};

// --- HELPER 3: INFINITE ANIMATED COUNTER ---
const StatsCounter = ({ end, title }: { end: number; title: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
        else {
          setIsVisible(false);
          setCount(0);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isVisible, end]);

  return (
    <div ref={ref} className="text-center p-6">
      <div className="text-6xl md:text-8xl font-bold text-white mb-4">
        {count}
        <span className="text-[#ccff00]">+</span>
      </div>
      <p className="text-gray-400 text-sm md:text-base uppercase tracking-widest font-medium">
        {title}
      </p>
    </div>
  );
};

// --- HELPER 4: PHONE FRAME COMPONENT ---
const PhoneFrame = ({
  images,
  activeIndex,
  className,
}: {
  images: string[];
  activeIndex: number;
  className?: string;
}) => (
  <div
    className={`absolute w-[45%] md:w-[35%] aspect-[9/19.5] rounded-[1.5rem] bg-black shadow-[0_0_0_2px_#333,0_0_0_5px_#121212,0_20px_40px_-5px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10 transition-all duration-700 ease-in-out ${className}`}
  >
    <div className="absolute top-3 left-1/2 -translate-x-1/2 h-3 w-3 bg-[#0a0a0a] rounded-full z-30 ring-1 ring-white/20 shadow-inner"></div>
    <div className="absolute inset-[3px] rounded-[1.3rem] overflow-hidden bg-gray-900">
      {images.map((img, index) => (
        <img
          key={index}
          src={img}
          alt={`App Screen ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-in-out ${
            index === activeIndex
              ? "opacity-100 scale-100"
              : "opacity-0 scale-105"
          }`}
        />
      ))}
    </div>
  </div>
);

// --- HELPER 5: BRAND ICONS (SVG) ---
const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-6 h-6"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="url(#instagram-gradient)"
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
    />
    <defs>
      <linearGradient
        id="instagram-gradient"
        x1="0"
        y1="0"
        x2="24"
        y2="24"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#f09433" />
        <stop offset="0.25" stopColor="#e6683c" />
        <stop offset="0.5" stopColor="#dc2743" />
        <stop offset="0.75" stopColor="#cc2366" />
        <stop offset="1" stopColor="#bc1888" />
      </linearGradient>
    </defs>
  </svg>
);

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#0077b5">
    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#25D366">
    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
  </svg>
);

// --- CARDS ---
const TexasCard = () => {
  const images = [
    "/Screenshot 2025-12-16 122413.png",
    "/Screenshot 2025-12-16 122742.png",
    "/Screenshot 2025-12-16 123716.png",
    "/Screenshot 2025-12-16 123824.png",
    "/Screenshot 2025-12-16 123031.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setCurrentIndex((p) => (p + 1) % images.length),
      3000
    );
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div
      id="work-texas"
      className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-[#ccff00]/50 transition-all duration-500 shadow-2xl hover:-translate-y-2"
    >
      <div className="aspect-video w-full relative overflow-hidden bg-[#050505] flex flex-col">
        <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5 z-20">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="relative flex-1 w-full h-full bg-[#050505]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Slide"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-50"></div>
        </div>
        <div className="absolute top-12 right-4 bg-[#ccff00] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wide z-30 shadow-lg">
          Featured
        </div>
      </div>
      <div className="p-6 md:p-8 relative border-t border-white/5">
        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#ccff00] transition-colors mb-1">
          Texas Travel
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-4">
          Web Design & Development
        </p>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A comprehensive travel platform featuring real-time{" "}
          <strong>Flight Booking</strong>, <strong>Visa Processing</strong>, and
          hotel reservations.
        </p>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <span className="project-tag">Php</span>
          <span className="project-tag">Laravel</span>
          <span className="project-tag">API</span>
        </div>
      </div>
    </div>
  );
};

const RentHouseCard = () => {
  const houseImages = [
    "/home_page.jpg",
    "/Listing.jpg",
    "/my profile.jpg",
    "/My_bookings.jpg",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setCurrentIndex((p) => (p + 1) % houseImages.length),
      3000
    );
    return () => clearInterval(t);
  }, [houseImages.length]);
  const total = houseImages.length;

  return (
    <div
      id="work-mobile"
      className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-[#ccff00]/50 transition-all duration-500 shadow-2xl hover:-translate-y-2"
    >
      <div className="aspect-[4/5] md:aspect-video w-full relative overflow-hidden bg-[#1a1a1a] flex items-center justify-center pt-12 pb-4">
        <PhoneFrame
          images={houseImages}
          activeIndex={(currentIndex - 1 + total) % total}
          className="z-10 left-[5%] md:left-[20%] scale-90 -rotate-6 translate-y-8 opacity-60"
        />
        <PhoneFrame
          images={houseImages}
          activeIndex={(currentIndex + 1) % total}
          className="z-10 right-[5%] md:right-[20%] scale-90 rotate-6 translate-y-8 opacity-60"
        />
        <PhoneFrame
          images={houseImages}
          activeIndex={currentIndex}
          className="z-20 left-1/2 -translate-x-1/2 scale-100 shadow-2xl"
        />
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-[#1a1a1a] to-transparent pointer-events-none z-30"></div>
        <div className="absolute top-4 right-4 bg-[#ccff00] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wide z-40 shadow-lg">
          Mobile App
        </div>
      </div>
      <div className="p-6 md:p-8 relative border-t border-white/5 z-40 bg-[#111]">
        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#ccff00] transition-colors mb-1">
          RentHouse
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-4">
          App Development
        </p>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A peer-to-peer rental marketplace app featuring{" "}
          <strong>User KYC</strong>, real-time{" "}
          <strong>Booking Management</strong>.
        </p>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <span className="project-tag">Flutter</span>
          <span className="project-tag">Angular</span>
        </div>
      </div>
    </div>
  );
};

const CarShowroomCard = () => {
  const images = ["/car1.png", "/car2.png", "/car3.png", "/car4.png"];
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const t = setInterval(
      () => setCurrentIndex((p) => (p + 1) % images.length),
      3000
    );
    return () => clearInterval(t);
  }, [images.length]);

  return (
    <div
      id="work-custom"
      className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-[#ccff00]/50 transition-all duration-500 shadow-2xl hover:-translate-y-2"
    >
      <div className="aspect-video w-full relative overflow-hidden bg-[#050505] flex flex-col">
        <div className="h-8 bg-[#1a1a1a] flex items-center px-4 gap-2 border-b border-white/5 z-20">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
        <div className="relative flex-1 w-full h-full bg-[#050505]">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Slide"
              className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
                index === currentIndex
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-50"></div>
        </div>
        <div className="absolute top-12 right-4 bg-[#ccff00] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wide z-30 shadow-lg">
          ERP System
        </div>
      </div>
      <div className="p-6 md:p-8 relative border-t border-white/5">
        <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#ccff00] transition-colors mb-1">
          Riffa Cars
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest mb-4">
          Custom Software
        </p>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A complete <strong>Showroom Management System</strong> featuring
          inventory tracking, automated invoicing, and analytics.
        </p>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          <span className="project-tag">php</span>
          <span className="project-tag">Laravel</span>
        </div>
      </div>
    </div>
  );
};

// --- MAIN PAGE ---
export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    try {
      const response = await fetch("https://formspree.io/f/xzznqnve", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (response.ok) setIsSuccess(true);
      else alert("Oops! There was a problem sending your form.");
    } catch (error) {
      alert("Oops! There was a problem sending your form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className={`min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black ${font.className}`}
    >
      <Navbar />
      <style jsx global>{`
        .project-tag {
          @apply px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/20 rounded-full text-gray-400 group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-colors;
        }
      `}</style>

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="z-10 text-center px-4 max-w-5xl mt-[-50px] md:mt-[-100px]">
          <p className="text-[10px] md:text-sm mb-4 md:mb-6 text-gray-300 font-light tracking-wide uppercase">
            Welcome to J. Robins, where we redefine cloud-based software
            solutions.
          </p>
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white">
            <TypewriterText text="Innovative Solutions" />
          </h1>
        </div>
        <div className="absolute bottom-24 md:bottom-40 z-20 flex flex-col items-center gap-4 animate-bounce">
          <ArrowDown className="text-white w-6 h-6 md:w-8 md:h-8 font-thin" />
          <a
            href="#contact"
            className="bg-white text-black px-4 py-2 md:px-6 md:py-2 text-[10px] md:text-xs uppercase font-bold tracking-widest hover:bg-[#ccff00] transition"
          >
            Contact
          </a>
        </div>
        <div className="absolute bottom-0 w-full z-10 leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            className="w-full h-auto block fill-white"
            preserveAspectRatio="none"
          >
            <path d="M0,120 L0,60 Q150,60 250,60 L450,60 Q500,60 520,30 L550,0 L890,0 L920,30 Q940,60 990,60 L1190,60 Q1290,60 1440,60 L1440,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        className="bg-white text-black py-20 md:py-32 px-6 md:px-20 relative z-10"
      >
        <RevealSection>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <div className="relative h-[300px] md:h-[400px] w-full overflow-hidden rounded-2xl grayscale hover:grayscale-0 transition duration-500 order-2 md:order-1">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop"
                alt="Team working"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight">
                About Us
              </h2>
              <div className="w-16 md:w-20 h-1 bg-black mb-6 md:mb-8"></div>
              <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-8 md:mb-10 font-light">
                We are committed to providing{" "}
                <span className="font-bold">customizable and innovative</span>{" "}
                software solutions. Our focus on user-friendly interfaces
                ensures you achieve your business goals efficiently.
              </p>
              <button className="flex items-center gap-3 border-2 border-black px-6 py-3 md:px-8 md:py-3 uppercase text-[10px] md:text-xs font-bold tracking-widest hover:bg-black hover:text-[#ccff00] transition-all">
                Learn More <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* STATS SECTION */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-20">
        <RevealSection>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-center">
            <StatsCounter end={5} title="Years of Cumulative Experience" />
            <StatsCounter end={4} title="Satisfied Clients" />
            <StatsCounter end={7} title="Projects Delivered" />
          </div>
        </RevealSection>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="bg-black text-white py-20 md:py-32 px-6 relative z-20"
      >
        <RevealSection>
          <div className="max-w-6xl mx-auto text-center">
            <div className="mb-12 md:mb-20">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-widest text-white mb-2">
                Services We Provide
              </h2>
              <div className="w-16 md:w-24 h-1 bg-[#ccff00] mx-auto"></div>
            </div>
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 mb-16 md:mb-24">
              <a href="#work-texas" className="block cursor-pointer">
                <div className="notch-card h-auto min-h-[200px] md:min-h-[250px] fade-in-up hover:border-[#ccff00] group">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[#ccff00] transition-colors">
                    Web Designing
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-4 font-light">
                    We craft visually stunning, responsive websites. <br />
                    <span className="text-[#ccff00] font-bold mt-2 inline-block text-[10px] uppercase tracking-widest">
                      See our latest work ↓
                    </span>
                  </p>
                </div>
              </a>
              <a href="#work-mobile" className="block cursor-pointer">
                <div className="notch-card h-auto min-h-[200px] md:min-h-[250px] hover:border-[#ccff00] group">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[#ccff00] transition-colors">
                    App Development
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-4 font-light">
                    Building robust, scalable mobile applications tailored to
                    your needs for both iOS and Android. <br />
                    <span className="text-[#ccff00] font-bold mt-2 inline-block text-[10px] uppercase tracking-widest">
                      See our latest work ↓
                    </span>
                  </p>
                </div>
              </a>
              <a href="#work-custom" className="block cursor-pointer">
                <div className="notch-card h-auto min-h-[200px] md:min-h-[250px] hover:border-[#ccff00] group">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 group-hover:text-[#ccff00] transition-colors">
                    Custom Software
                  </h3>
                  <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-4 font-light">
                    Tailored software solutions designed to meet your specific
                    business requirements and automate workflows. <br />
                    <span className="text-[#ccff00] font-bold mt-2 inline-block text-[10px] uppercase tracking-widest">
                      See our latest work ↓
                    </span>
                  </p>
                </div>
              </a>
              <div className="notch-card h-auto min-h-[200px] md:min-h-[250px]">
                <h3 className="text-xl md:text-2xl font-bold mb-4 transition-colors">
                  Digital Marketing
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-4 font-light">
                  Data-driven strategies to boost your online presence, optimize
                  reach, and grow your brand.
                </p>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-3xl md:text-6xl font-bold leading-tight mb-2 uppercase">
                Make Your
                <br />
                Online Presence <span className="text-[#ccff00]">Strong</span>
              </h3>
              <p className="text-lg md:text-2xl font-light text-gray-400 mb-16">
                With HevoraTechnologies
              </p>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* WORKS SECTION */}
      <section
        id="works"
        className="bg-[#050505] text-white py-20 md:py-32 px-6 border-t border-white/5"
      >
        <RevealSection>
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
              <div>
                <h2 className="text-4xl md:text-7xl font-bold mb-4">
                  Our Work
                </h2>
                <div className="w-16 md:w-20 h-1 bg-[#ccff00]"></div>
              </div>
              <p className="text-gray-400 mt-4 md:mt-0 max-w-sm text-left md:text-right text-sm md:text-base">
                A selection of projects that define our approach to digital
                excellence.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 md:gap-10">
              <TexasCard />
              <RentHouseCard />
              <CarShowroomCard />
            </div>
          </div>
        </RevealSection>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="bg-[#0a0a0a] text-white py-20 md:py-32 px-6 md:px-20 border-t border-white/5"
      >
        <RevealSection>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-4xl md:text-7xl font-bold mb-6 md:mb-8">
                Contact
              </h2>
              <p className="text-lg md:text-xl text-gray-300 font-light max-w-md">
                Have a question? Get in touch with our team today.
              </p>
              <div className="flex flex-col justify-start border-t border-white/20 pt-8 mt-8 md:mt-12">
                <div className="text-left space-y-3 text-sm md:text-base font-medium mb-6">
                  <p className="text-[#ccff00] text-xs uppercase tracking-wider mb-2">
                    hevoratechnologies.in
                  </p>
                  <a
                    href="tel:+917907737628"
                    className="flex items-center gap-2 hover:text-[#ccff00] transition"
                  >
                    <Phone size={16} /> +91 7907737628
                  </a>
                  <a
                    href="tel:+919037094071"
                    className="flex items-center gap-2 hover:text-[#ccff00] transition"
                  >
                    <Phone size={16} /> +91 90370 94071
                  </a>
                </div>

                {/* UPDATED SOCIAL ICONS */}
                <div className="flex gap-4">
                  <a
                    href="https://www.instagram.com/hevoratechnologies?igsh=MXJyaHRnMTV4dWxjMA=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-black rounded hover:bg-[#ccff00] transition hover:scale-110"
                  >
                    <InstagramIcon />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/hevora-technologies-605196390/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-black rounded hover:bg-[#ccff00] transition hover:scale-110"
                  >
                    <LinkedInIcon />
                  </a>
                  <a
                    href="https://wa.me/919037094071?text=Hello%20Hevora%20Technologies,%20I%20am%20interested%20in%20your%20services."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white text-black rounded hover:bg-[#ccff00] transition hover:scale-110"
                  >
                    <WhatsAppIcon />
                  </a>
                </div>
              </div>
            </div>
            {!isSuccess ? (
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs md:text-sm mb-2 text-gray-400">
                    First name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm mb-2 text-gray-400">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm mb-2 text-gray-400">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs md:text-sm mb-2 text-gray-400">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    name="message"
                    className="input-field"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-black font-bold py-3 md:py-4 hover:bg-[#ccff00] transition duration-300 mt-4 rounded uppercase tracking-widest text-xs md:text-sm disabled:opacity-50"
                >
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center border border-[#ccff00]/30 bg-[#ccff00]/5 p-8 md:p-10 rounded-2xl text-center fade-in-up">
                <CheckCircle className="w-12 h-12 md:w-16 md:h-16 text-[#ccff00] mb-4" />
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Message Sent!
                </h3>
                <p className="text-sm md:text-base text-gray-400">
                  Thank you for contacting us. We will get back to you shortly.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 text-sm text-[#ccff00] hover:text-white underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            )}
          </div>
        </RevealSection>
      </section>
      <footer className="bg-black text-center text-gray-500 py-6 md:py-8 text-xs md:text-sm border-t border-white/5">
        &copy; 2025 Hevora Technologies. All rights reserved.
      </footer>
    </main>
  );
}
