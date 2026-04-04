"use client"

import Link from "next/link"
import { useState } from "react"
import { Menu, X, Search } from "lucide-react"

const navigation = [
  { name: "الرئيسية", href: "/" },
  { name: "قصص", href: "/stories" },
  { name: "ملفات", href: "/dossiers" },
  { name: "تحقيقات", href: "/investigations" },
  { name: "خرائط القوى", href: "/power-maps" },
  { name: "من نحن", href: "/about" },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-primary text-primary-foreground sticky top-0 z-50">
      {/* Top bar */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-2 flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <Link
              href="/editorial-policy"
              className="hover:text-gold transition-colors"
            >
              السياسة التحريرية
            </Link>
            <Link
              href="/methodology"
              className="hover:text-gold transition-colors"
            >
              المنهجية
            </Link>
            <Link
              href="/corrections"
              className="hover:text-gold transition-colors"
            >
              التصحيحات
            </Link>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <span className="text-primary-foreground/60">
              {new Date().toLocaleDateString("ar-EG", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="flex flex-col items-start">
              <span className="text-xl lg:text-2xl font-bold tracking-tight text-gold">
                أعد التفكير
              </span>
              <span className="text-xs lg:text-sm text-primary-foreground/70 -mt-1">
                ReThink
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium hover:text-gold transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 right-0 w-0 h-0.5 bg-gold transition-all group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Search and Mobile Menu */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 hover:bg-primary-foreground/10 rounded-sm transition-colors focus-ring"
              aria-label="بحث"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              className="lg:hidden p-2 hover:bg-primary-foreground/10 rounded-sm transition-colors focus-ring"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "إغلاق القائمة" : "فتح القائمة"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            <Link
              href="/newsletter"
              className="hidden md:inline-flex items-center px-4 py-2 bg-gold text-primary text-sm font-medium hover:bg-gold-light transition-colors"
            >
              اشترك بالنشرة
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-primary-foreground/10">
          <nav className="container mx-auto px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block py-2 text-base font-medium hover:text-gold transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="/newsletter"
              className="block mt-4 py-3 bg-gold text-primary text-center font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              اشترك بالنشرة البريدية
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
