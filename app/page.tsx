"use client";
import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import {
  ArrowDown,
  Instagram,
  Linkedin,
  Phone,
  MessageCircle,
  ArrowRight,
  CheckCircle,
  ExternalLink,
} from "lucide-react";

// --- FIXED HELPER: ANIMATED COUNTER ---
const StatsCounter = ({ end, title }: { end: number; title: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // 1. Observer Hook: Detects scroll & Resets count
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setCount(0); // <--- FIX: Reset count here instead of in the animation effect
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // 2. Animation Hook: Only handles counting up
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
    <div ref={ref} className="text-center p-6 fade-in-up">
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

// --- 1. PROJECT 1: TEXAS TRAVEL ---
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
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div
      id="work-texas"
      className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-[#ccff00] transition-all duration-500 shadow-2xl shadow-black/50"
    >
      <div className="aspect-video w-full relative overflow-hidden bg-[#050505]">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Texas Travel Slide ${index + 1}`}
            className={`absolute inset-0 w-full h-full object-cover object-top transition-opacity duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100"
                : "opacity-0 scale-105"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-60"></div>
        <div className="absolute top-4 right-4 bg-[#ccff00] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wide z-10 shadow-lg">
          Featured
        </div>
      </div>

      <div className="p-6 md:p-8 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#ccff00] transition-colors mb-1">
              Texas Travel
            </h3>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
              Web Design & Development
            </p>
          </div>
          <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-white transition-colors" />
        </div>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A comprehensive travel platform featuring real-time{" "}
          <strong>Flight Booking</strong>, <strong>Visa Processing</strong>, and
          hotel reservations.
        </p>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {["React", "Tailwind", "API"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/20 rounded-full text-gray-400 group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 2. PROJECT 2: RENT HOUSE ---
const RentHouseCard = () => {
  const images = [
    "/WhatsApp Image 2025-12-17 at 19.41.52_f412bb1b.jpg",
    "/WhatsApp Image 2025-12-17 at 19.41.51_98bff560.jpg",
    "/WhatsApp Image 2025-12-17 at 19.41.51_397a2299.jpg",
    "/WhatsApp Image 2025-12-17 at 19.41.50_0724ffdd.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-[#111] border border-white/10 hover:border-[#ccff00] transition-all duration-500 shadow-2xl shadow-black/50">
      <div className="aspect-video w-full relative overflow-hidden bg-[#1a1a1a] flex items-center justify-center">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`RentHouse App Slide ${index + 1}`}
            className={`absolute h-full w-auto object-contain transition-all duration-1000 ease-in-out ${
              index === currentIndex
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-95 blur-sm"
            }`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent opacity-40"></div>
        <div className="absolute top-4 right-4 bg-[#ccff00] text-black text-[10px] md:text-xs font-bold px-2 py-1 md:px-3 md:py-1 rounded-full uppercase tracking-wide z-10 shadow-lg">
          Mobile App
        </div>
      </div>

      <div className="p-6 md:p-8 relative">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-2xl md:text-3xl font-bold group-hover:text-[#ccff00] transition-colors mb-1">
              RentHouse
            </h3>
            <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest">
              App Development
            </p>
          </div>
          <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-gray-500 group-hover:text-white transition-colors" />
        </div>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          A peer-to-peer rental marketplace app featuring{" "}
          <strong>User KYC</strong>, real-time{" "}
          <strong>Booking Management</strong>, and secure item listings.
        </p>
        <div className="flex gap-2 md:gap-3 flex-wrap">
          {["React Native", "Node.js", "Firebase"].map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 md:px-3 md:py-1 text-[10px] md:text-xs font-bold uppercase tracking-wider border border-white/20 rounded-full text-gray-400 group-hover:border-[#ccff00] group-hover:text-[#ccff00] transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 3. MAIN PAGE COMPONENT ---
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
    <main className="min-h-screen bg-black text-white selection:bg-[#ccff00] selection:text-black">
      <Navbar />

      {/* HERO SECTION */}
      <section
        id="home"
        className="relative h-screen flex flex-col justify-center items-center overflow-hidden bg-black"
      >
        <div className="absolute inset-0 z-0 bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40" />
        <div className="z-10 text-center px-4 max-w-5xl mt-[-50px] md:mt-[-100px]">
          <p className="text-[10px] md:text-sm mb-4 md:mb-6 text-gray-300 font-light tracking-wide">
            Welcome to J. Robins, where we redefine cloud-based software
            solutions.
          </p>
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter text-white">
            Innovative <br className="md:hidden" /> Solutions
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
              software solutions. Our focus on user-friendly interfaces ensures
              you achieve your business goals efficiently.
            </p>
            <button className="flex items-center gap-3 border-2 border-black px-6 py-3 md:px-8 md:py-3 uppercase text-[10px] md:text-xs font-bold tracking-widest hover:bg-black hover:text-[#ccff00] transition-all">
              Learn More <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* --- COUNTING / STATS SECTION --- */}
      <section className="bg-[#0a0a0a] border-y border-white/5 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-center">
          <StatsCounter end={5} title="Years of Cumulative Experience" />
          <StatsCounter end={4} title="Satisfied Clients" />
          <StatsCounter end={7} title="Projects Delivered" />
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section
        id="services"
        className="bg-black text-white py-20 md:py-32 px-6 relative z-20"
      >
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

            {[
              {
                title: "App Development",
                desc: "Building robust, scalable mobile applications tailored to your needs for both iOS and Android.",
              },
              {
                title: "UI/UX Design",
                desc: "Designing intuitive interfaces and engaging user journeys to bridge functionality with beauty.",
              },
              {
                title: "Digital Marketing",
                desc: "Data-driven strategies to boost your online presence, optimize reach, and grow your brand.",
              },
            ].map((service, idx) => (
              <div
                key={idx}
                className={`notch-card h-auto min-h-[200px] md:min-h-[250px] fade-in-up delay-${
                  (idx + 1) * 100
                }`}
              >
                <h3 className="text-xl md:text-2xl font-bold mb-4 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-xs md:text-sm leading-relaxed px-4 font-light">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>
          <div className="text-center fade-in-up delay-300">
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
      </section>

      {/* WORKS SECTION */}
      <section
        id="works"
        className="bg-[#050505] text-white py-20 md:py-32 px-6 border-t border-white/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20">
            <div>
              <h2 className="text-4xl md:text-7xl font-bold mb-4">Our Work</h2>
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
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="bg-[#0a0a0a] text-white py-20 md:py-32 px-6 md:px-20 border-t border-white/5"
      >
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
                  href="tel:+919778233168"
                  className="flex items-center gap-2 hover:text-[#ccff00] transition"
                >
                  <Phone size={16} /> +91 97782 33168
                </a>
                <a
                  href="tel:+919037094071"
                  className="flex items-center gap-2 hover:text-[#ccff00] transition"
                >
                  <Phone size={16} /> +91 90370 94071
                </a>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/hevoratechnologies?igsh=MXJyaHRnMTV4dWxjMA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white text-black rounded hover:bg-[#ccff00] transition"
                >
                  <Instagram size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/hevora-technologies-605196390/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 bg-white text-black rounded hover:bg-[#ccff00] transition"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="p-2 bg-white text-black rounded hover:bg-[#ccff00] transition"
                >
                  <MessageCircle size={20} />
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
      </section>

      <footer className="bg-black text-center text-gray-500 py-6 md:py-8 text-xs md:text-sm border-t border-white/5">
        &copy; 2025 Hevora Technologies. All rights reserved.
      </footer>
    </main>
  );
}
