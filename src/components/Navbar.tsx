"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, ChevronDown, Menu, X } from "lucide-react";
import { useCart } from "../context/CartContext";
import CartDrawer from "./CartDrawer";

// --- DATA STRUCTURE ---
const MENU_LINKS = [
  { id: "new", label: "NEW", href: "/collection" },
  { id: "brands", label: "BRANDS", href: "/collection" },
  { id: "vape-kits", label: "VAPE KITS", href: "/collection" },
  { id: "disposables", label: "DISPOSABLES", href: "/collection" },
  { id: "e-liquids", label: "E-LIQUIDS", href: "/collection" },
  { id: "accessories", label: "ACCESSORIES", href: "/collection" },
];

const BRAND_DATA = {
  hardware: [
    "SMOKTech",
    "Uwell",
    "VOOPOO",
    "Vandy Vape",
    "Geek Vape",
    "Vaporesso",
    "YoCan",
    "Lookah",
    "FreeMaX",
    "CCELL",
  ],
  liquids: [
    "Pod Juice",
    "Four Seasons",
    "Monster Vape Labs",
    "7 Daze",
    "Juice Head",
    "SKWEZED",
    "Fifty Bar",
    "Ruthless Vapor",
  ],
};

const MEGAMENU_CONTENT: Record<string, { name: string; img: string }[]> = {
  brands: [
    { name: "Geek Bar Pulse X 25K", img: "/cards/card4.jpg" },
    { name: "VGOD Elite Series", img: "/cards/card1.webp" },
  ],
  "vape-kits": [
    { name: "Uwell Caliburn G3", img: "/cards/card2.webp" },
    { name: "Vaporesso XROS 4", img: "/cards/card3.jpg" },
  ],
  disposables: [
    { name: "Sour Mango Pineapple 25K", img: "/cards/card4.jpg" },
    { name: "Blackberry Blueberry 25K", img: "/cards/card5.webp" },
  ],
  "e-liquids": [
    { name: "Vapetasia Killer Kustard", img: "/cards/card5.webp" },
    { name: "Nasty Juice Cush Man", img: "/cards/card6.webp" },
  ],
  accessories: [
    { name: "Replacement Pods & Coils", img: "/cards/card2.webp" },
    { name: "External Battery Chargers", img: "/cards/card3.jpg" },
  ],
};

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const currentProducts =
    MEGAMENU_CONTENT[activeMenu || "brands"] || MEGAMENU_CONTENT["brands"];

  return (
    <nav
      className="relative w-full border-b border-zinc-900 bg-black text-white z-[100]"
      onMouseLeave={() => setActiveMenu(null)}
    >
      {/* --- MAIN NAVBAR --- */}
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 h-20 lg:h-24 lg:px-8">
        {/* Left: Hamburger (Mobile Only) */}
        <div className="flex lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-white p-2"
            aria-label="Open Menu"
          >
            <Menu size={28} />
          </button>
        </div>

        {/* Center: Logo (Mobile: Absolute center, Desktop: Flex-start) */}
        <div className="flex-shrink-0 flex items-center lg:static absolute left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0">
          <Link
            href="/"
            className="group relative block h-12 w-12 md:h-24 md:w-20 transition-transform duration-300 hover:scale-105"
          >
            <Image
              src="/logo.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Center: Links (Desktop) */}
        <ul className="hidden lg:flex items-center space-x-10 h-full">
          {MENU_LINKS.map((link) => {
            const isActive = pathname === link.href;
            const isHovered = activeMenu === link.id;

            return (
              <li
                key={link.id}
                onMouseEnter={() => setActiveMenu(link.id)}
                className="relative h-full flex items-center"
              >
                <Link
                  href={link.href}
                  className={`text-[13px] font-bold tracking-[0.15em] transition-colors duration-200 py-2 flex items-center ${isActive ? "text-white" : "text-zinc-400 hover:text-white"}`}
                >
                  <span className="relative pb-1">
                    {link.label}
                    <span
                      className={`absolute bottom-0 left-0 h-[2px] bg-gray-400 transition-all duration-300 ease-in-out ${isActive || isHovered ? "w-full opacity-100" : "w-0 opacity-0"}`}
                    />
                  </span>
                  {link.id !== "new" && (
                    <ChevronDown
                      className={`ml-1.5 transition-transform duration-300 ${isHovered ? "rotate-180 text-gray-400" : "text-zinc-600"}`}
                      size={14}
                      strokeWidth={3}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Right: Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="text-white hover:text-gray-400 transition-all duration-200 transform hover:scale-110">
            <Search size={22} strokeWidth={2.5} />
          </button>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative text-white hover:text-gray-400 transition-all duration-200 transform hover:scale-110"
          >
            <ShoppingCart size={22} strokeWidth={2.5} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-black text-white ring-2 ring-black">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* --- MOBILE SLIDER (DRAWER) --- */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[110] transition-opacity duration-300 lg:hidden ${isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div
        className={`fixed top-0 left-0 h-full w-[80%] max-w-sm bg-black border-r border-zinc-800 z-[120] transform transition-transform duration-300 ease-in-out lg:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between p-6 border-b border-zinc-900">
          <span className="text-sm font-black tracking-widest text-zinc-500 uppercase">
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-80px)]">
          <ul className="flex flex-col p-6 space-y-6">
            {MENU_LINKS.map((link) => (
              <li key={link.id}>
                <Link
                  href={link.href}
                  className="text-lg font-bold tracking-widest text-zinc-300 hover:text-white flex justify-between items-center"
                >
                  {link.label}
                  <ChevronDown className="-rotate-90 text-zinc-700" size={18} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 px-6 pt-8 border-t border-zinc-900">
            <p className="text-[10px] font-black text-zinc-600 tracking-[0.3em] uppercase mb-4">
              Quick Links
            </p>
            <div className="flex flex-col space-y-4">
              <Link href="/dashboard" className="text-sm text-zinc-400">
                Admin Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* --- DESKTOP MEGAMENU --- */}
      <div
        className={`hidden lg:block absolute left-0 w-full bg-black transition-all duration-500 ease-in-out border-b border-zinc-900 shadow-2xl z-50 overflow-hidden ${activeMenu && activeMenu !== "new" ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}
      >
        <div className="mx-auto max-w-7xl px-8 py-14 grid grid-cols-12 gap-12">
          {/* Columns 1 & 2 (Hardware & E-Liquids) */}
          <div className="col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-600 mb-8 pb-3 border-b border-zinc-800">
              HARDWARE
            </h3>
            <div className="flex flex-col space-y-4">
              {BRAND_DATA.hardware.map((item) => (
                <Link
                  key={item}
                  href="/collection"
                  className="text-sm font-bold text-zinc-400 hover:text-white hover:translate-x-2 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          <div className="col-span-3">
            <h3 className="text-[11px] font-black uppercase tracking-[0.25em] text-zinc-600 mb-8 pb-3 border-b border-zinc-800">
              E-LIQUIDS
            </h3>
            <div className="flex flex-col space-y-4">
              {BRAND_DATA.liquids.map((item) => (
                <Link
                  key={item}
                  href="/collection"
                  className="text-sm font-bold text-zinc-400 hover:text-white hover:translate-x-2 transition-all duration-200"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* Column 3: Featured Grid */}
          <div className="col-span-6 grid grid-cols-2 gap-8">
            {currentProducts.map((product, idx) => (
              <Link
                key={idx}
                href="/collection"
                className="group cursor-pointer block"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800">
                  <Image
                    src={product.img}
                    alt={product.name}
                    fill
                    className="object-contain transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <div className="mt-6 flex flex-col items-center text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-2">
                    Featured Collection
                  </p>
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white group-hover:text-gray-400 transition-colors duration-300">
                    {product.name}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
