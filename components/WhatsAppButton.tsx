import React from "react";
import { MessageCircle } from "lucide-react"; // We will install lucide-react for icons

const WhatsAppButton = () => {
  // Replace with your actual WhatsApp number (International format without +)
  const phoneNumber = "919876543210";
  const message =
    "Hello Hevora Technologies, I am interested in your services.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 transition-all duration-300 z-50 flex items-center justify-center animate-bounce"
      aria-label="Chat on WhatsApp"
    >
      {/* Icon */}
      <MessageCircle size={32} />
    </a>
  );
};

export default WhatsAppButton;
