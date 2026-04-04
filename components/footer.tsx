import Link from "next/link"
import { Mail, Twitter, Facebook, Youtube } from "lucide-react"

const footerLinks = {
  sections: [
    { name: "قصص", href: "/stories" },
    { name: "ملفات", href: "/dossiers" },
    { name: "تحقيقات", href: "/investigations" },
    { name: "خرائط القوى", href: "/power-maps" },
  ],
  about: [
    { name: "من نحن", href: "/about" },
    { name: "السياسة التحريرية", href: "/editorial-policy" },
    { name: "المنهجية", href: "/methodology" },
    { name: "التصحيحات", href: "/corrections" },
  ],
  legal: [
    { name: "سياسة الخصوصية", href: "/privacy" },
    { name: "شروط الاستخدام", href: "/terms" },
    { name: "تواصل معنا", href: "/contact" },
  ],
}

const socialLinks = [
  { name: "Twitter", href: "#", icon: Twitter },
  { name: "Facebook", href: "#", icon: Facebook },
  { name: "YouTube", href: "#", icon: Youtube },
  { name: "Email", href: "mailto:contact@rethink.media", icon: Mail },
]

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Newsletter Section */}
      <div className="border-b border-primary-foreground/10">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-2">
              اشترك في نشرتنا البريدية
            </h3>
            <p className="text-primary-foreground/70 mb-6">
              احصل على أحدث التحليلات والتحقيقات مباشرة إلى بريدك الإلكتروني
            </p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="البريد الإلكتروني"
                className="flex-1 px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:outline-none focus:border-gold transition-colors"
                dir="ltr"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gold text-primary font-medium hover:bg-gold-light transition-colors"
              >
                اشتراك
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-gold">
                  أعد التفكير
                </span>
                <span className="text-sm text-primary-foreground/70">
                  ReThink
                </span>
              </div>
            </Link>
            <p className="text-sm text-primary-foreground/70 mb-6 max-w-xs">
              منصة صحفية تحليلية مستقلة تقدم تغطية معمّقة للأحداث والقضايا في
              المنطقة العربية
            </p>
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="p-2 hover:bg-primary-foreground/10 rounded-sm transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Sections */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">الأقسام</h4>
            <ul className="space-y-3">
              {footerLinks.sections.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">عن المنصة</h4>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-gold">روابط قانونية</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-primary-foreground/60">
          <p>
            © {new Date().getFullYear()} أعد التفكير | ReThink. جميع الحقوق
            محفوظة.
          </p>
          <p>صُنع بعناية للقارئ العربي</p>
        </div>
      </div>
    </footer>
  )
}
