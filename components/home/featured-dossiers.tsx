import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"

const dossiers = [
  {
    id: "d1",
    title: "ملف الطاقة المتجددة في العالم العربي",
    description:
      "تحليل شامل لمشاريع الطاقة المتجددة والتحديات والفرص في المنطقة العربية",
    articlesCount: 12,
    lastUpdated: "٢ أبريل ٢٠٢٦",
    status: "مستمر",
  },
  {
    id: "d2",
    title: "التعليم في زمن التحولات",
    description:
      "كيف تتكيف المنظومات التعليمية العربية مع متطلبات العصر الرقمي؟",
    articlesCount: 8,
    lastUpdated: "٢٨ مارس ٢٠٢٦",
    status: "مستمر",
  },
  {
    id: "d3",
    title: "إعادة هيكلة الاقتصادات النفطية",
    description:
      "مسارات التنويع الاقتصادي في دول الخليج العربي: الإنجازات والعقبات",
    articlesCount: 15,
    lastUpdated: "٢٥ مارس ٢٠٢٦",
    status: "مكتمل",
  },
]

export function FeaturedDossiers() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold gold-underline">ملفات مختارة</h2>
        <Link
          href="/dossiers"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          جميع الملفات
          <ArrowLeft className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-4">
        {dossiers.map((dossier) => (
          <Link
            key={dossier.id}
            href={`/dossier/${dossier.id}`}
            className="group block"
          >
            <article className="p-5 border border-border bg-card hover:border-gold/50 transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="text-lg font-semibold group-hover:text-gold transition-colors truncate">
                      {dossier.title}
                    </h3>
                    <span
                      className={`text-xs px-2 py-0.5 flex-shrink-0 ${
                        dossier.status === "مستمر"
                          ? "bg-gold/20 text-gold-dark"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {dossier.status}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                    {dossier.description}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{dossier.articlesCount} مقال</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>آخر تحديث: {dossier.lastUpdated}</span>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
