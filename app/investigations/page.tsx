import type { Metadata } from "next"
import Link from "next/link"
import { Search, Clock, User, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "تحقيقات",
  description: "تحقيقات استقصائية معمّقة تكشف الحقائق وتسلط الضوء على القضايا المهمة",
}

const investigations = [
  {
    id: "i1",
    title: "شبكات النفوذ المالي: تتبع مسارات الأموال في المنطقة",
    excerpt:
      "تحقيق استقصائي يكشف عن شبكات معقدة من التحويلات المالية وتأثيرها على القرار السياسي والاقتصادي في عدة دول عربية.",
    author: "وحدة التحقيقات",
    date: "٢٨ مارس ٢٠٢٦",
    readTime: "٢٥ دقيقة",
    featured: true,
  },
  {
    id: "i2",
    title: "التلوث الصناعي: الثمن الخفي للتنمية",
    excerpt:
      "كيف تتحمل المجتمعات المحلية تبعات التلوث الصناعي بينما تجني الشركات الأرباح؟ تحقيق ميداني يوثق الأثر البيئي والصحي.",
    author: "فريق البيئة",
    date: "٢٠ مارس ٢٠٢٦",
    readTime: "١٨ دقيقة",
    featured: false,
  },
  {
    id: "i3",
    title: "العمالة غير الموثقة: حياة في الظل",
    excerpt:
      "تحقيق يرصد أوضاع العمال غير الموثقين في عدة دول عربية، والانتهاكات التي يتعرضون لها بعيداً عن أعين القانون.",
    author: "فريق الشؤون الاجتماعية",
    date: "١٠ مارس ٢٠٢٦",
    readTime: "٢٠ دقيقة",
    featured: false,
  },
  {
    id: "i4",
    title: "صفقات السلاح: من يستفيد ومن يدفع الثمن؟",
    excerpt:
      "تتبع لصفقات الأسلحة الكبرى في المنطقة، والوسطاء، والتداعيات على الصراعات المسلحة.",
    author: "وحدة التحقيقات",
    date: "٢٥ فبراير ٢٠٢٦",
    readTime: "٣٠ دقيقة",
    featured: false,
  },
  {
    id: "i5",
    title: "التهرب الضريبي: المليارات المخفية",
    excerpt:
      "كيف تتهرب شركات كبرى من دفع الضرائب المستحقة، وما تأثير ذلك على الخدمات العامة والمواطنين؟",
    author: "فريق الاقتصاد",
    date: "١٥ فبراير ٢٠٢٦",
    readTime: "٢٢ دقيقة",
    featured: false,
  },
]

export default function InvestigationsPage() {
  const featuredInvestigation = investigations.find((i) => i.featured)
  const regularInvestigations = investigations.filter((i) => !i.featured)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gold flex items-center justify-center">
              <Search className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">تحقيقات استقصائية</h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            تحقيقات معمّقة تكشف الحقائق وتسلط الضوء على قضايا ذات أهمية عامة،
            مبنية على البحث الدقيق وجمع الأدلة
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Investigation */}
        {featuredInvestigation && (
          <section className="mb-12">
            <Link
              href={`/investigation/${featuredInvestigation.id}`}
              className="group block"
            >
              <article className="grid grid-cols-1 lg:grid-cols-5 bg-primary text-primary-foreground">
                <div className="lg:col-span-2 aspect-video lg:aspect-auto bg-primary-foreground/10 flex items-center justify-center">
                  <Search className="w-16 h-16 text-gold" />
                </div>
                <div className="lg:col-span-3 p-8 flex flex-col justify-center">
                  <span className="text-sm text-gold font-medium mb-3">
                    تحقيق مميز
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-4 group-hover:text-gold transition-colors">
                    {featuredInvestigation.title}
                  </h2>
                  <p className="text-primary-foreground/70 mb-6 text-lg">
                    {featuredInvestigation.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredInvestigation.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredInvestigation.readTime}</span>
                    </div>
                    <span>{featuredInvestigation.date}</span>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* Investigations List */}
        <section>
          <h2 className="text-xl font-bold mb-6 gold-underline inline-block">
            جميع التحقيقات
          </h2>
          <div className="space-y-6">
            {regularInvestigations.map((investigation) => (
              <Link
                key={investigation.id}
                href={`/investigation/${investigation.id}`}
                className="group block"
              >
                <article className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-border bg-card hover:border-gold/50 transition-all">
                  <div className="aspect-video md:aspect-square bg-muted flex items-center justify-center">
                    <Search className="w-8 h-8 text-muted-foreground/30" />
                  </div>
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                      {investigation.title}
                    </h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {investigation.excerpt}
                    </p>
                    <div className="flex flex-wrap items-center justify-between gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span>{investigation.author}</span>
                        <span>{investigation.date}</span>
                        <span>{investigation.readTime}</span>
                      </div>
                      <span className="flex items-center gap-1 text-gold">
                        قراءة التحقيق
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
