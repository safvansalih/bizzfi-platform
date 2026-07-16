"use client";

import { MessageCircle } from "lucide-react";

const whatsappNumber = "916235562622";

const whatsappMessage =
  "Hello Bizzfi, I would like to know more about your digital business solutions.";

export function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-500/20 transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:bg-green-400 hover:shadow-xl hover:shadow-green-500/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      aria-label="Chat with Bizzfi on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      {/* Pulse Effect */}
      <span
        className="absolute inset-0 -z-10 animate-ping rounded-full bg-green-500/30"
        aria-hidden="true"
      />

      <MessageCircle
        className="h-6 w-6 transition-transform duration-300 group-hover:scale-110"
        aria-hidden="true"
      />
    </a>
  );
}