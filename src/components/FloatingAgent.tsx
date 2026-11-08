'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  MessageCircle,
  Rocket,
  Image as ImageIcon,
  ChevronLeft,
  ChevronRight,
  X,
  Sparkles,
  CheckCheck,
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  image?: string;
  time: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'agent',
    text: 'নমস্কার! Hocom ফ্যাশন এসিস্ট্যান্টে আপনাকে স্বাগতম ✨ আজকের ট্রেন্ডিং পোশাক, সাইজ বা কোনো ফ্যাশন সাজেশন নিয়ে কীভাবে সাহায্য করতে পারি?',
    time: 'এইমাত্র',
  },
];

export default function FloatingAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputText, setInputText] = useState('');
  const [attachedImage, setAttachedImage] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll chat to latest message
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAttachedImage(imageUrl);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputText.trim() && !attachedImage) return;

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      image: attachedImage || undefined,
      time: currentTime,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setAttachedImage(null);
    setIsTyping(true);

    // Simulated Smart AI Stylist Reply
    setTimeout(() => {
      let replyText = 'ধন্যবাদ আপনার মেসেজের জন্য! আমাদের চলতি সপ্তাহের সেরা কালেকশনে ৩০% থেকে ৫০% পর্যন্ত ছাড় চলছে। কোনো নির্দিষ্ট ক্যাটাগরি বা সাইজ খুঁজতে চাইলে আমাকে জানান!';
      const query = userMessage.text.toLowerCase();

      if (query.includes('সাইজ') || query.includes('size')) {
        replyText = 'আমাদের প্রতিটি প্রোডাক্ট পেজে স্ট্যান্ডার্ড সাইজ চার্ট (Size Chart) দেওয়া আছে। এছাড়া আমাদের সব আইটেম ট্রু-টু-ফিট (True to fit)। আপনার উচ্চতা ও ওজন বললে সঠিক সাইজটি সাজেস্ট করতে পারি!';
      } else if (query.includes('ডেলিভারি') || query.includes('delivery')) {
        replyText = 'ঢাকা সিটিতে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কর্মদিবসে ক্যাশ অন ডেলিভারি (COD) সুবিধাসহ পার্সেল পৌঁছে দেওয়া হয়।';
      } else if (query.includes('ছাড়') || query.includes('discount') || query.includes('off')) {
        replyText = 'চলতি সপ্তাহে আমাদের সকল ট্রেন্ডিং পোশাকে বিশেষ ছাড় রয়েছে! এছাড়া প্রথম অর্ডারে কুপন কোড ব্যবহার করে অতিরিক্ত ডিসকাউন্ট পাবেন।';
      } else if (userMessage.image) {
        replyText = 'দারুণ আউটফিট! এই স্টাইলের সাথে ম্যাচিং ট্রেন্ডি স্নিকার্স ও জ্যাকেট আমাদের মেনস ও ওমেনস কালেকশনে পাওয়া যাচ্ছে। দেখতে চান?';
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `bot-${Date.now()}`,
          sender: 'agent',
          text: replyText,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <>
      {/* ======================================================== */}
      {/* 2.5D INTERACTIVE CHAT BOX POPUP */}
      {/* Positioned above the mobile sticky action bar (bottom-36 on mobile) */}
      {/* ======================================================== */}
      {isOpen && (
        <div className="fixed bottom-36 sm:bottom-24 right-3 sm:right-6 z-50 w-[calc(100vw-24px)] sm:w-[380px] max-w-[400px] h-[520px] max-h-[75vh] bg-[#FAF9F6] border-2 border-[#E5DACD] shadow-[0_6px_0_0_#DECBB7,0_20px_40px_rgba(30,24,21,0.18)] rounded-3xl flex flex-col overflow-hidden transition-all duration-300 animate-scaleIn">
          {/* Header */}
          <div className="bg-[#1E1815] text-white px-4 py-3.5 flex items-center justify-between border-b border-[#3A2F27] shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#EA580C] to-[#FDBA74] flex items-center justify-center text-white shadow-xs">
                <Sparkles className="w-4 h-4 fill-white text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 border-2 border-[#1E1815] rounded-full" />
              </div>
              <div>
                <h4 className="font-bold text-xs sm:text-[13px] tracking-wide text-white leading-tight">
                  Hocom ফ্যাশন এজেন্ট
                </h4>
                <p className="text-[10px] text-[#D6C7B7] flex items-center gap-1 font-medium">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  অনলাইন এসিস্ট্যান্ট
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#E5DACD] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              title="চ্যাট বন্ধ করুন"
            >
              <X className="w-4 h-4 stroke-[2.2]" />
            </button>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#FAF9F6] scrollbar-thin">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[82%] px-3.5 py-2.5 text-xs sm:text-[12.5px] leading-relaxed shadow-xs ${
                      isUser
                        ? 'bg-[#1E1815] text-white rounded-2xl rounded-tr-xs border border-[#3A2F27]'
                        : 'bg-white text-[#1E1815] rounded-2xl rounded-tl-xs border border-[#E8DFD3]'
                    }`}
                  >
                    {msg.image && (
                      <div className="relative w-full h-36 mb-2 rounded-xl overflow-hidden border border-black/10">
                        <Image
                          src={msg.image}
                          alt="Attached style"
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <p className="whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[9.5px] text-[#8C7A6D] mt-1 px-1 flex items-center gap-1">
                    {msg.time}
                    {isUser && <CheckCheck className="w-3 h-3 text-[#059669]" />}
                  </span>
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-1.5 bg-white border border-[#E8DFD3] px-3 py-2 rounded-full w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA580C] animate-bounce [animation-delay:0.4s]" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Attached Image Preview Bar */}
          {attachedImage && (
            <div className="px-4 py-2 bg-[#F4EFE8] border-t border-[#E8DFD3] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-[#DECBB7]">
                  <Image src={attachedImage} alt="Preview" fill className="object-cover" />
                </div>
                <span className="text-[11px] font-semibold text-[#6B5D52]">ছবি সংযুক্ত হয়েছে</span>
              </div>
              <button
                type="button"
                onClick={() => setAttachedImage(null)}
                className="p-1 hover:bg-[#E8DFD3] rounded-full text-[#6B5D52]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Input & Action Bar */}
          <form
            onSubmit={handleSendMessage}
            className="p-3 bg-white border-t border-[#EFE8DE] flex items-center gap-2"
          >
            {/* Hidden File Input for Image Upload */}
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
            />

            {/* Image Upload Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-9 h-9 rounded-xl bg-[#F7F4EF] hover:bg-[#EDE7DE] text-[#6B5D52] hover:text-[#1E1815] border border-[#E8DFD3] flex items-center justify-center transition-colors cursor-pointer shrink-0"
              title="পোশাকের ছবি আপলোড করুন"
            >
              <ImageIcon className="w-4 h-4 stroke-[1.8]" />
            </button>

            {/* Text Input */}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="মেসেজ লিখুন..."
              className="flex-1 bg-[#FAF9F6] border border-[#E8DFD3] rounded-xl px-3 py-2 text-xs sm:text-[13px] text-[#1E1815] placeholder-[#9C8A7C] focus:outline-hidden focus:border-[#EA580C] focus:ring-1 focus:ring-[#EA580C]/30 transition-all"
            />

            {/* Rocket Send Button */}
            <button
              type="submit"
              disabled={!inputText.trim() && !attachedImage}
              className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer shrink-0 border ${
                inputText.trim() || attachedImage
                  ? 'bg-[#EA580C] hover:bg-[#C2410C] text-white border-[#C2410C] shadow-[0_2px_0_0_#9A3412] active:translate-y-0.5'
                  : 'bg-[#F2ECE4] text-[#A8988B] border-[#E8DFD3] cursor-not-allowed'
              }`}
              title="মেসেজ পাঠান"
            >
              <Rocket className="w-4 h-4 -rotate-45 transition-transform" />
            </button>
          </form>
        </div>
      )}

      {/* ======================================================== */}
      {/* FLAT CLEAN FLOATING AGENT CAPSULE ON RIGHT SIDE (Positioned at bottom-20 on mobile to clear the sticky Add to Cart bar) */}
      {/* ======================================================== */}
      <div className="fixed bottom-20 sm:bottom-6 right-3 sm:right-6 z-50 flex items-center gap-1.5 select-none">
        {/* Main Floating Capsule */}
        <div
          className={`flex items-center transition-colors duration-200 bg-[#25D366] hover:bg-[#20BA5A] text-white border border-[#1EBE5D] shadow-sm ${
            isCollapsed ? 'rounded-full p-2' : 'rounded-[20px] pl-2 pr-4 py-2'
          }`}
        >
          {/* Arrow Toggle to Collapse/Expand Text */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsCollapsed((prev) => !prev);
            }}
            className="w-6 h-6 rounded-full hover:bg-black/10 text-white flex items-center justify-center transition-colors cursor-pointer mr-1"
            title={isCollapsed ? 'Expand' : 'Collapse'}
          >
            {isCollapsed ? (
              <ChevronLeft className="w-4 h-4 stroke-[2.2]" />
            ) : (
              <ChevronRight className="w-4 h-4 stroke-[2.2]" />
            )}
          </button>

          {/* Trigger to Open Chat */}
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-2 cursor-pointer focus:outline-hidden"
          >
            {/* Chat Bubble Icon with Online Dot */}
            <div className="relative flex items-center justify-center">
              <MessageCircle className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-white fill-white/20 stroke-[2.2]" />
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white border border-[#25D366]" />
            </div>

            {/* Chat with us text in English - Hides when collapsed */}
            {!isCollapsed && (
              <span className="text-xs sm:text-[13px] font-bold text-white tracking-wide whitespace-nowrap">
                Chat with us
              </span>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
