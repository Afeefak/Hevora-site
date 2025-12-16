"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll to toggle background
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setTimeout(() => setIsOpen(false), 150);
  };

  return (
    <>
      {/* NAVBAR UPDATES:
         1. Added `transition-all duration-300` for smooth color changes.
         2. Dynamic Class: If `isScrolled` is true, we add a black glass background.
         3. Removed `mix-blend-difference` because it can be buggy on some browsers/backgrounds.
      */}
      <nav
        className={`fixed top-0 w-full z-50 flex justify-between items-center px-6 md:px-12 py-6 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-white/10 py-4 shadow-lg"
            : "bg-transparent"
        }`}
      >
        <Link
          href="/"
          className="text-xl font-bold tracking-tighter uppercase text-white z-50"
        >
          Hevora Technologies
        </Link>

        <button
          onClick={() => setIsOpen(true)}
          className="group flex items-center gap-3 text-sm font-medium text-white hover:text-[#ccff00] transition-colors z-50 cursor-pointer"
        >
          <span className="hidden md:block">MENU</span>
          <Menu
            className="group-hover:rotate-90 transition-transform duration-300"
            size={24}
          />
        </button>
      </nav>

      {/* FULL SCREEN MENU OVERLAY */}
      <div
        className={`fixed inset-0 bg-black z-[60] flex flex-col items-center justify-center transition-all duration-700 cubic-bezier(0.7, 0, 0.3, 1) ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-8 right-8 text-white hover:text-[#ccff00] transition-transform hover:rotate-90 duration-300"
        >
          <X size={40} />
        </button>
        <div className="flex flex-col gap-6 text-center">
          {["Home", "About", "Services", "Works", "Contact"].map(
            (item, index) => (
              <Link
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={handleLinkClick}
                className={`text-5xl md:text-7xl font-bold text-white hover:text-transparent hover:text-stroke-lime transition-all duration-300 transform ${
                  isOpen
                    ? "translate-y-0 opacity-100"
                    : "translate-y-10 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100}ms`,
                  WebkitTextStroke: "1px transparent",
                }}
              >
                <span className="menu-link-hover">{item}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
