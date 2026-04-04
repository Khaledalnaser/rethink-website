import { Mail } from "lucide-react"

export function NewsletterSection() {
  return (
    <section className="bg-primary text-primary-foreground p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gold flex items-center justify-center">
          <Mail className="w-5 h-5 text-primary" />
        </div>
        <h2 className="text-lg font-bold">النشرة البريدية</h2>
      </div>
      <p className="text-sm text-primary-foreground/70 mb-4">
        احصل على تحليلاتنا وتحقيقاتنا الأسبوعية مباشرة في بريدك الإلكتروني
      </p>
      <form className="space-y-3">
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          className="w-full px-4 py-3 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:border-gold transition-colors"
          dir="ltr"
        />
        <button
          type="submit"
          className="w-full py-3 bg-gold text-primary font-medium text-sm hover:bg-gold-light transition-colors"
        >
          اشتراك
        </button>
      </form>
      <p className="text-xs text-primary-foreground/50 mt-3">
        بالاشتراك، توافق على سياسة الخصوصية الخاصة بنا
      </p>
    </section>
  )
}
