"use client";

import React, { useState } from "react";
import { X, Phone, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="currentColor" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.414 0 .018 5.393 0 12.03c0 2.123.543 4.195 1.577 6.059l-1.577 5.911 6.046-1.587a11.846 11.846 0 005.41 1.32h1.602c6.634 0 12.03-5.393 12.033-12.029a11.83 11.83 0 00-3.134-8.497l-.022-.016z"/>
  </svg>
);

const WhatsAppWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    { name: "Hassan", number: "03444333374", id: "hassan" },
    { name: "Bilal", number: "03049477198", id: "bilal" },
  ];

  const handleWhatsAppClick = (number: string) => {
    // Standard format for WhatsApp link: https://wa.me/countrycodePhoneNumber
    // Removing leading 0 from Pakistani number and adding 92
    const formattedNumber = "92" + number.substring(1);
    window.open(`https://wa.me/${formattedNumber}`, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
      {/* Contact Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="mb-4 w-72 bg-white rounded-2xl shadow-2xl border border-zinc-100 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#25D366] p-4 text-white">
              <h3 className="font-black text-sm uppercase tracking-[0.15em] flex items-center gap-2">
                <WhatsAppIcon className="w-5 h-5 fill-white" />
                Contact Owners
              </h3>
              <p className="text-[10px] opacity-90 mt-1 font-bold uppercase tracking-widest">
                Typically replies in minutes
              </p>
            </div>

            {/* List */}
            <div className="p-3 bg-white space-y-2">
              {contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => handleWhatsAppClick(contact.number)}
                  className="w-full group flex items-center justify-between p-3 rounded-xl border border-zinc-50 hover:bg-[#f0fdf4] hover:border-[#25D366]/20 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-400 group-hover:bg-[#25D366] group-hover:text-white transition-colors duration-500">
                      <User size={20} />
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                    </div>
                    <div className="text-left">
                      <p className="text-xs font-black text-black uppercase tracking-wider">
                        {contact.name}
                      </p>
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                        {contact.number}
                      </p>
                    </div>
                  </div>
                  <div className="text-[#25D366] opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 duration-300">
                    <Phone size={14} fill="currentColor" />
                  </div>
                </button>
              ))}
            </div>

            <div className="bg-zinc-50 p-2 text-center border-t border-zinc-100">
                <p className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">Black & White Support</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95 ${
          isOpen ? "bg-black text-white" : "bg-[#25D366] text-white"
        }`}
      >
        {isOpen ? (
          <X size={24} strokeWidth={3} />
        ) : (
          <WhatsAppIcon className="w-8 h-8 fill-white" />
        )}
      </button>
    </div>
  );
};

export default WhatsAppWidget;
