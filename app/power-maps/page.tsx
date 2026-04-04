import type { Metadata } from "next"
import Link from "next/link"
import { Map, Clock, ArrowLeft, Info } from "lucide-react"

export const metadata: Metadata = {
  title: "خرائط القوى",
  description: "خرائط تفاعلية ترصد شبكات النفوذ والعلاقات بين الفاعلين في المنطقة",
}

const powerMaps = [
  {
    id: "pm1",
    title: "خريطة التحالفات الإقليمية ٢٠٢٦",
    description:
      "رصد تفاعلي لشبكة العلاقات والتحالفات بين الدول في المنطقة العربية والشرق الأوسط. تتضمن الخريطة الاتفاقيات الثنائية والمتعددة الأطراف.",
    lastUpdated: "مارس ٢٠٢٦",
    entities: 22,
    connections: 87,
  },
  {
    id: "pm2",
    title: "الفاعلون الاقتصاديون الرئيسيون",
    description:
      "خريطة تفاعلية للشركات والمؤسسات المالية الأكثر تأثيراً في الاقتصاد الإقليمي، مع رصد لعلاقات الملكية والتشابك.",
    lastUpdated: "فبراير ٢٠٢٦",
    entities: 45,
    connections: 156,
  },
  {
    id: "pm3",
    title: "شبكات الإعلام والتأثير",
    description:
      "تتبع ملكية وسائل الإعلام الكبرى وعلاقاتها بمراكز القرار السياسي والاقتصادي. من يملك ماذا ومن يؤثر على من؟",
    lastUpdated: "يناير ٢٠٢٦",
    entities: 38,
    connections: 112,
  },
  {
    id: "pm4",
    title: "خريطة الجماعات المسلحة غير الدولتية",
    description:
      "رصد للجماعات المسلحة الفاعلة في المنطقة، وعلاقاتها التنظيمية والتمويلية والأيديولوجية.",
    lastUpdated: "ديسمبر ٢٠٢٥",
    entities: 28,
    connections: 94,
  },
]

export default function PowerMapsPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gold flex items-center justify-center">
              <Map className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">خرائط القوى</h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            أدوات تصويرية تفاعلية تساعد على فهم شبكات العلاقات والنفوذ بين
            الفاعلين السياسيين والاقتصاديين في المنطقة
          </p>
        </div>
      </section>

      {/* Info Box */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-3 p-4 bg-gold/10 border border-gold/20">
            <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-sm mb-1">كيف تعمل خرائط القوى؟</h2>
              <p className="text-sm text-muted-foreground">
                خرائط القوى هي تصويرات تفاعلية للعلاقات بين الكيانات المختلفة.
                يمكنك النقر على أي كيان لاستكشاف علاقاته، وتصفية الخريطة حسب
                نوع العلاقة أو الفترة الزمنية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Power Maps Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {powerMaps.map((map) => (
              <Link
                key={map.id}
                href={`/power-map/${map.id}`}
                className="group block"
              >
                <article className="h-full border border-border bg-card hover:border-gold/50 transition-all">
                  <div className="aspect-[2/1] bg-muted flex items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent" />
                    <Map className="w-16 h-16 text-muted-foreground/20" />
                    {/* Decorative network lines */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-10"
                      viewBox="0 0 200 100"
                    >
                      <circle cx="50" cy="30" r="4" fill="currentColor" />
                      <circle cx="100" cy="50" r="6" fill="currentColor" />
                      <circle cx="150" cy="35" r="4" fill="currentColor" />
                      <circle cx="80" cy="70" r="3" fill="currentColor" />
                      <circle cx="130" cy="75" r="5" fill="currentColor" />
                      <line
                        x1="50"
                        y1="30"
                        x2="100"
                        y2="50"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="100"
                        y1="50"
                        x2="150"
                        y2="35"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="100"
                        y1="50"
                        x2="80"
                        y2="70"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                      <line
                        x1="100"
                        y1="50"
                        x2="130"
                        y2="75"
                        stroke="currentColor"
                        strokeWidth="1"
                      />
                    </svg>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                      {map.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {map.description}
                    </p>
                    <div className="flex flex-wrap gap-4 mb-4 text-sm">
                      <span className="px-2 py-1 bg-muted text-muted-foreground">
                        {map.entities} كيان
                      </span>
                      <span className="px-2 py-1 bg-muted text-muted-foreground">
                        {map.connections} علاقة
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>آخر تحديث: {map.lastUpdated}</span>
                      </div>
                      <span className="flex items-center gap-1 text-gold">
                        استكشف الخريطة
                        <ArrowLeft className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
