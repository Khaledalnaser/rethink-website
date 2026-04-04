import Link from "next/link"
import { ArrowLeft, Map } from "lucide-react"

const powerMaps = [
  {
    id: "pm1",
    title: "خريطة التحالفات الإقليمية ٢٠٢٦",
    description:
      "رصد تفاعلي لشبكة العلاقات والتحالفات بين الدول في المنطقة العربية والشرق الأوسط",
    lastUpdated: "مارس ٢٠٢٦",
  },
  {
    id: "pm2",
    title: "الفاعلون الاقتصاديون الرئيسيون",
    description:
      "خريطة تفاعلية للشركات والمؤسسات المالية الأكثر تأثيراً في الاقتصاد الإقليمي",
    lastUpdated: "فبراير ٢٠٢٦",
  },
  {
    id: "pm3",
    title: "شبكات الإعلام والتأثير",
    description:
      "تتبع ملكية وسائل الإعلام الكبرى وعلاقاتها بمراكز القرار السياسي والاقتصادي",
    lastUpdated: "يناير ٢٠٢٦",
  },
]

export function PowerMapsSection() {
  return (
    <section className="py-12 bg-muted">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gold flex items-center justify-center">
              <Map className="w-5 h-5 text-primary" />
            </div>
            <h2 className="text-xl font-bold">خرائط القوى</h2>
          </div>
          <Link
            href="/power-maps"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            جميع الخرائط
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {powerMaps.map((map) => (
            <Link
              key={map.id}
              href={`/power-map/${map.id}`}
              className="group block"
            >
              <article className="bg-card border border-border p-5 h-full hover:border-gold/50 transition-colors">
                <div className="aspect-[16/10] bg-muted mb-4 flex items-center justify-center border border-border">
                  <Map className="w-12 h-12 text-muted-foreground/30" />
                </div>
                <h3 className="text-base font-semibold mb-2 group-hover:text-gold transition-colors">
                  {map.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {map.description}
                </p>
                <span className="text-xs text-muted-foreground">
                  آخر تحديث: {map.lastUpdated}
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
