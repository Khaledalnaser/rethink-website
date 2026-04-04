import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"

const investigations = [
  {
    id: "i1",
    title: "شبكات النفوذ المالي: تتبع مسارات الأموال في المنطقة",
    excerpt:
      "تحقيق استقصائي يكشف عن شبكات معقدة من التحويلات المالية وتأثيرها على القرار السياسي والاقتصادي",
    author: "وحدة التحقيقات",
    date: "٢٨ مارس ٢٠٢٦",
    readTime: "٢٥ دقيقة",
  },
  {
    id: "i2",
    title: "التلوث الصناعي: الثمن الخفي للتنمية",
    excerpt:
      "كيف تتحمل المجتمعات المحلية تبعات التلوث الصناعي بينما تجني الشركات الأرباح؟",
    author: "فريق البيئة",
    date: "٢٠ مارس ٢٠٢٦",
    readTime: "١٨ دقيقة",
  },
]

export function InvestigationsSection() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold gold-underline">
          تحقيقات استقصائية
        </h2>
        <Link
          href="/investigations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          جميع التحقيقات
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-6">
        {investigations.map((investigation) => (
          <Link
            key={investigation.id}
            href={`/investigation/${investigation.id}`}
            className="group block"
          >
            <article className="grid grid-cols-1 md:grid-cols-3 gap-4 p-5 bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
              <div className="aspect-video md:aspect-square bg-primary-foreground/10 flex items-center justify-center">
                <Search className="w-8 h-8 text-gold" />
              </div>
              <div className="md:col-span-2 flex flex-col justify-center">
                <span className="text-xs text-gold font-medium mb-2">
                  تحقيق استقصائي
                </span>
                <h3 className="text-lg font-bold mb-2 group-hover:text-gold transition-colors">
                  {investigation.title}
                </h3>
                <p className="text-sm text-primary-foreground/70 mb-3 line-clamp-2">
                  {investigation.excerpt}
                </p>
                <div className="flex items-center gap-3 text-xs text-primary-foreground/60">
                  <span>{investigation.author}</span>
                  <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                  <span>{investigation.date}</span>
                  <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                  <span>{investigation.readTime} قراءة</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
