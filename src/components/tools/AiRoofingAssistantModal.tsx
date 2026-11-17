import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, X, ShieldAlert, ArrowRight, User, PhoneCall } from 'lucide-react';
import { siteConfig } from '../../config/siteConfig';
import { Link } from 'react-router-dom';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  actionLink?: { text: string; url: string };
  timestamp: string;
}

interface AiRoofingAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenCallback?: () => void;
}

const FAQ_KNOWLEDGE_BASE: { keywords: string[]; response: string; action?: { text: string; url: string } }[] = [
  {
    keywords: ['leak', 'emergency', 'water', 'dripping', 'ceiling', 'active leak', 'tarp'],
    response: "🚨 If water is actively entering your living space:\n1. Place a bucket under the leak and gently puncture the center of any sagging ceiling drywall to relieve weight and prevent a catastrophic collapse.\n2. Protect flooring and furniture with waterproof tarps.\n3. Do NOT climb onto a wet roof yourself.\n4. Call our priority dispatch or submit an emergency tarping request immediately for emergency weatherproofing.",
    action: { text: "Request Emergency Callback", url: "/contact" }
  },
  {
    keywords: ['repair vs replacement', 'replace or repair', 'repair', 'replace', 'new roof', 'patch'],
    response: "As a general roofing industry standard:\n• Minor localized damage (a few missing shingles, pipe collar gasket crack) under 15 years old can usually be repaired.\n• Widespread granule loss, brittle felt underlayment, spongy decking, or roofs exceeding 20–25 years of age generally require complete replacement.\nOur licensed estimators perform a 21-point forensic inspection to tell you honestly if repair is viable.",
    action: { text: "Book an In-Person Inspection", url: "/book-inspection" }
  },
  {
    keywords: ['cost', 'price', 'estimate', 'how much', 'quote', 'pricing', 'financing'],
    response: "Roof pricing depends on square footage, pitch, decking condition, and material system:\n• Architectural Shingles typically range from $4.80 to $6.90/sq ft installed.\n• Standing Seam Metal ranges from $10.50 to $15.50/sq ft.\n• Commercial TPO/EPDM membranes range from $5.50 to $8.80/sq ft.\nWe never provide binding quotes without a physical inspection of decking and flashing.",
    action: { text: "Launch Instant Cost Calculator", url: "/#calculator" }
  },
  {
    keywords: ['insurance', 'storm', 'hail', 'wind', 'claim', 'adjuster', 'denied'],
    response: "Most homeowner policies cover sudden, accidental storm, hail, and high-wind structural damage. We provide itemized Xactimate-compatible forensic damage reports, photographic drone scans, and meet on-site with your insurance adjuster to ensure all scope items are approved.",
    action: { text: "Review Storm Inspection Protocol", url: "/services/roof-inspection" }
  },
  {
    keywords: ['materials', 'metal', 'shingles', 'tile', 'slate', 'tpo', 'difference'],
    response: "Here is a quick breakdown:\n• Architectural Asphalt Shingles: Most popular, 30–50 yr lifespan, Class 4 impact resistance available.\n• Standing Seam Metal: 50–70+ yr lifespan, high wind defense up to 140 mph, superior energy efficiency.\n• Low-Slope TPO/EPDM: Heat-welded seams, ideal for commercial or flat residential additions.",
    action: { text: "Explore 3D Envelope & Materials", url: "/#materials" }
  },
  {
    keywords: ['timeline', 'how long', 'duration', 'days', 'hours'],
    response: "A typical residential roof replacement (2,000–3,000 sq ft) takes 1 to 2 business days from initial morning tear-off to magnetic nail sweep and final sign-off. Larger architectural roofs or structural re-decking can take 3 to 4 days.",
    action: { text: "See 5-Step Process", url: "/#process" }
  },
  {
    keywords: ['warranty', 'guarantee', 'manufacture', 'workmanship'],
    response: "We offer dual warranty protection:\n1. Manufacturer Material Warranty: 30-year to Lifetime Non-Prorated coverage on shingles and metal panels.\n2. Craftsmanship Workmanship Guarantee: 10-year contractor warranty covering all flashing, valleys, and installations against water penetration.",
    action: { text: "Compare Warranties", url: "/services/roof-installation" }
  }
];

export const AiRoofingAssistantModal: React.FC<AiRoofingAssistantModalProps> = ({
  isOpen,
  onClose,
  onOpenCallback
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      sender: 'bot',
      text: `Hello! I am ${siteConfig.companyName}'s automated Roofing Assistant. How can I help you today? You can choose a quick topic below or type your question about materials, repairs, storm claims, or pricing guidelines.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const handleSend = (userQuery: string) => {
    if (!userQuery.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: userQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    // Intent classifier match
    setTimeout(() => {
      const queryLower = userQuery.toLowerCase();
      let matchedResponse = FAQ_KNOWLEDGE_BASE.find(item =>
        item.keywords.some(kw => queryLower.includes(kw))
      );

      let replyText = matchedResponse
        ? matchedResponse.response
        : `Thank you for asking. For specific technical inquiries regarding "${userQuery}", our senior roofing project managers can assess your exact structural requirements and local wind-load compliance. Would you like to request an estimate or have an expert call you back?`;

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: replyText,
        actionLink: matchedResponse?.action || { text: "Request a Free Estimate", url: "/request-estimate" },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickChip = (prompt: string) => {
    handleSend(prompt);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
      <div 
        className="relative w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 flex flex-col h-[600px] overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-assistant-title"
      >
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950/90 border-b border-slate-800 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-copper/20 border border-brand-copper/40 flex items-center justify-center text-brand-copper">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="ai-assistant-title" className="font-heading font-bold text-base text-white">
                  AI Roofing Assistant
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono border border-emerald-500/30">
                  Online
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Architectural guidelines & technical FAQ support
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors"
            aria-label="Close Assistant"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Banner */}
        <div className="px-4 py-2 bg-slate-950 border-b border-slate-800 text-[11px] text-slate-400 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-3.5 h-3.5 text-brand-copper shrink-0" />
            <span>Informational estimates only. Binding quotes require on-site inspection.</span>
          </div>
          {onOpenCallback && (
            <button
              type="button"
              onClick={onOpenCallback}
              className="text-brand-copper hover:underline text-[10px] font-bold shrink-0 flex items-center gap-1"
            >
              <PhoneCall className="w-3 h-3" />
              <span>Call Me</span>
            </button>
          )}
        </div>

        {/* Messages Body */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-900/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.sender === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0 ${
                  m.sender === 'user'
                    ? 'bg-brand-copper text-white'
                    : 'bg-slate-800 text-brand-copper border border-slate-700'
                }`}
              >
                {m.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>

              <div
                className={`max-w-[82%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-copper text-white rounded-tr-none'
                    : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-tl-none'
                }`}
              >
                <div className="whitespace-pre-line">{m.text}</div>

                {m.actionLink && (
                  <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex items-center gap-2">
                    <Link
                      to={m.actionLink.url}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-brand-copper/20 hover:bg-brand-copper/30 text-brand-copper text-xs font-bold transition-colors"
                    >
                      <span>{m.actionLink.text}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}

                <div
                  className={`text-[9px] mt-1 text-right ${
                    m.sender === 'user' ? 'text-white/70' : 'text-slate-400'
                  }`}
                >
                  {m.timestamp}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-center gap-2 text-slate-400 text-xs py-1">
              <Bot className="w-4 h-4 text-brand-copper animate-bounce" />
              <span>Roofing assistant is analyzing query...</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-2.5 bg-slate-950/80 border-t border-slate-800 flex items-center gap-2 overflow-x-auto text-[11px] no-scrollbar">
          <span className="text-slate-500 shrink-0 font-mono text-[10px] pl-1">Quick:</span>
          <button
            type="button"
            onClick={() => handleQuickChip("Do I need a repair or replacement?")}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0 whitespace-nowrap transition-colors"
          >
            Repair vs Replacement?
          </button>
          <button
            type="button"
            onClick={() => handleQuickChip("How much does a new roof cost per sq ft?")}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0 whitespace-nowrap transition-colors"
          >
            Cost per sq ft?
          </button>
          <button
            type="button"
            onClick={() => handleQuickChip("I have an active water leak, what should I do?")}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0 whitespace-nowrap transition-colors"
          >
            Active leak help
          </button>
          <button
            type="button"
            onClick={() => handleQuickChip("Does insurance cover storm and hail damage?")}
            className="px-2.5 py-1 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 shrink-0 whitespace-nowrap transition-colors"
          >
            Storm insurance
          </button>
        </div>

        {/* Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend(inputText);
          }}
          className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2"
        >
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your roofing question..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-copper"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-brand-copper hover:bg-brand-copper-hover disabled:opacity-40 text-white transition-all flex items-center justify-center shrink-0"
            aria-label="Send Message"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
