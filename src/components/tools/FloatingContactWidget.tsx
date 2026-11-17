import React, { useState } from 'react';
import { Phone, MessageSquare, PhoneCall, Bot, X, MessageCircle } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';

interface FloatingContactWidgetProps {
  onOpenCallback: () => void;
  onOpenAiAssistant: () => void;
}

export const FloatingContactWidget: React.FC<FloatingContactWidgetProps> = ({
  onOpenCallback,
  onOpenAiAssistant
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // WhatsApp click-to-chat URL with prefilled message
  const whatsappNumber = siteConfig.contact.phonePlaceholder.replace(/\D/g, '') || '15550197663';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    `Hello ${siteConfig.companyName}, I would like to inquire about a roofing project or schedule an inspection.`
  )}`;

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end pointer-events-none">
      {/* Expanded Quick Options Menu */}
      {isOpen && (
        <div className="mb-2 sm:mb-3 flex flex-col gap-2 sm:gap-2.5 items-end animate-fadeIn pointer-events-auto">
          {/* 1. AI Roofing Assistant */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenAiAssistant();
            }}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-slate-900 text-white rounded-full shadow-xl border border-slate-700 hover:bg-slate-800 transition-all hover:scale-105 text-xs font-bold"
          >
            <span>Ask AI Roofing Assistant</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-brand-copper/30 text-brand-copper flex items-center justify-center">
              <Bot className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </button>

          {/* 2. Request Callback */}
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              onOpenCallback();
            }}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-slate-900 text-white rounded-full shadow-xl border border-slate-700 hover:bg-slate-800 transition-all hover:scale-105 text-xs font-bold"
          >
            <span>Request a Callback</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </div>
          </button>

          {/* 3. WhatsApp Direct Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl transition-all hover:scale-105 text-xs font-bold"
          >
            <span>Chat on WhatsApp</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            </div>
          </a>

          {/* 4. Click-to-Call */}
          <a
            href={`tel:${siteConfig.contact.phonePlaceholder.replace(/\D/g, '')}`}
            className="flex items-center gap-2.5 sm:gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 bg-brand-copper hover:bg-brand-copper-hover text-white rounded-full shadow-xl transition-all hover:scale-105 text-xs font-bold"
          >
            <span>Call {siteConfig.contact.phonePlaceholder}</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white/20 flex items-center justify-center">
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-white" />
            </div>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="pointer-events-auto group relative flex items-center justify-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-brand-copper hover:bg-brand-copper-hover text-white shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-white/20"
        aria-label="Toggle live contact and assistant options"
        title="Contact & Support Options"
      >
        <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 sm:h-4 sm:w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 sm:h-4 sm:w-4 bg-emerald-500 border-2 border-white" />
        </span>
        {isOpen ? (
          <X className="w-5 h-5 sm:w-6 sm:h-6 transition-transform rotate-90" />
        ) : (
          <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6" />
        )}
      </button>
    </div>
  );
};

