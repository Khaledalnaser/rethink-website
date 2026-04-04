import type { Metadata } from "next"
import Link from "next/link"
import { FileText, Clock, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "ملفات",
  description: "ملفات بحثية متكاملة ومحدثة باستمرار حول أهم القضايا الإقليمية",
}

const dossiers = [
  {
    id: "d1",
    title: "ملف الطاقة المتجددة في العالم العربي",
    description:
      "تحليل شامل لمشاريع الطاقة المتجددة والتحديات والفرص في المنطقة العربية. يتناول الملف السياسات الحكومية والاستثمارات والتقنيات المستخدمة.",
    articlesCount: 12,
    lastUpdated: "٢ أبريل ٢٠٢٦",
    status: "مستمر",
    tags: ["طاقة", "بيئة", "اقتصاد"],
  },
  {
    id: "d2",
    title: "التعليم في زمن التحولات",
    description:
      "كيف تتكيف المنظومات التعليمية العربية مع متطلبات العصر الرقمي؟ دراسة معمّقة للتحديات والإصلاحات والتجارب الناجحة.",
    articlesCount: 8,
    lastUpdated: "٢٨ مارس ٢٠٢٦",
    status: "مستمر",
    tags: ["تعليم", "تكنولوجيا", "مجتمع"],
  },
  {
    id: "d3",
    title: "إعادة هيكلة الاقتصادات النفطية",
    description:
      "مسارات التنويع الاقتصادي في دول الخليج العربي: الإنجازات والعقبات والآفاق المستقبلية.",
    articlesCount: 15,
    lastUpdated: "٢٥ مارس ٢٠٢٦",
    status: "مكتمل",
    tags: ["اقتصاد", "نفط", "خليج"],
  },
  {
    id: "d4",
    title: "الشباب العربي والمشاركة السياسية",
    description:
      "استكشاف معمّق لأشكال المشاركة السياسية الجديدة للشباب في المنطقة العربية، من الاحتجاجات إلى النشاط الرقمي.",
    articlesCount: 10,
    lastUpdated: "١٥ مارس ٢٠٢٦",
    status: "مستمر",
    tags: ["شباب", "سياسة", "مجتمع"],
  },
  {
    id: "d5",
    title: "التحولات الديموغرافية في المنطقة",
    description:
      "تحليل للتغيرات السكانية وتأثيراتها على الاقتصاد والمجتمع والسياسة في الدول العربية.",
    articlesCount: 7,
    lastUpdated: "١٠ مارس ٢٠٢٦",
    status: "مكتمل",
    tags: ["سكان", "اقتصاد", "مجتمع"],
  },
]

const statusColors = {
  مستمر: "bg-gold/20 text-gold-dark border-gold/30",
  مكتمل: "bg-muted text-muted-foreground border-border",
}

export default function DossiersPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-gold flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold">ملفات</h1>
          </div>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            مجموعات بحثية متكاملة ومحدثة باستمرار حول أهم القضايا الإقليمية.
            كل ملف يضم مقالات وتحليلات وبيانات مترابطة.
          </p>
        </div>
      </section>

      {/* Dossiers Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {dossiers.map((dossier) => (
              <Link
                key={dossier.id}
                href={`/dossier/${dossier.id}`}
                className="group block"
              >
                <article className="h-full border border-border bg-card hover:border-gold/50 transition-all">
                  <div className="aspect-[3/1] bg-muted flex items-center justify-center">
                    <FileText className="w-12 h-12 text-muted-foreground/30" />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 border ${statusColors[dossier.status as keyof typeof statusColors]}`}
                      >
                        {dossier.status}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {dossier.articlesCount} مقال
                      </span>
                    </div>
                    <h2 className="text-xl font-bold mb-2 group-hover:text-gold transition-colors">
                      {dossier.title}
                    </h2>
                    <p className="text-muted-foreground mb-4 line-clamp-2">
                      {dossier.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {dossier.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-muted text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>آخر تحديث: {dossier.lastUpdated}</span>
                      </div>
                      <span className="flex items-center gap-1 text-gold">
                        استكشف
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
