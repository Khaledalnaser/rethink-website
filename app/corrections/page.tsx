import type { Metadata } from "next"
import Link from "next/link"
import { AlertCircle, CheckCircle, Clock, Mail } from "lucide-react"

export const metadata: Metadata = {
  title: "التصحيحات",
  description:
    "سجل التصحيحات والتحديثات على المحتوى المنشور في منصة أعد التفكير",
}

const corrections = [
  {
    id: "c1",
    date: "٢ أبريل ٢٠٢٦",
    articleTitle: "تحولات في منظومة الأمن الإقليمي",
    articleId: "123",
    type: "تصحيح",
    description:
      "أشرنا خطأً إلى أن الاتفاقية وُقعت في عام ٢٠٢٤، والصحيح أنها وُقعت في عام ٢٠٢٣. تم تصحيح التاريخ في المقال.",
    status: "مكتمل",
  },
  {
    id: "c2",
    date: "٢٨ مارس ٢٠٢٦",
    articleTitle: "شبكات التمويل الخفية",
    articleId: "456",
    type: "توضيح",
    description:
      "أضفنا توضيحاً حول طبيعة العلاقة بين الشركتين المذكورتين بناءً على معلومات إضافية وردتنا من أحد الأطراف المعنية.",
    status: "مكتمل",
  },
  {
    id: "c3",
    date: "١٥ مارس ٢٠٢٦",
    articleTitle: "الاقتصادات العربية في مواجهة التحديات",
    articleId: "789",
    type: "تحديث",
    description:
      "تم تحديث البيانات الاقتصادية لتعكس التقارير الرسمية الصادرة حديثاً.",
    status: "مكتمل",
  },
]

const typeStyles = {
  تصحيح: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  توضيح: "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400",
  تحديث: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
}

export default function CorrectionsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">التصحيحات</h1>
            <p className="text-lg text-primary-foreground/80">
              الشفافية جزء أساسي من التزامنا تجاه قرائنا
            </p>
          </div>
        </div>
      </section>

      {/* Policy */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-4 gold-underline inline-block">
              سياسة التصحيح
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                نلتزم في أعد التفكير بتصحيح أي خطأ يُكتشف في محتوانا المنشور بأسرع
                وقت ممكن وبشفافية كاملة. نميز بين ثلاثة أنواع من التعديلات:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="p-4 border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-red-500" />
                    <h3 className="font-semibold">تصحيح</h3>
                  </div>
                  <p className="text-sm">
                    لتصحيح معلومة خاطئة أو خطأ في الوقائع
                  </p>
                </div>
                <div className="p-4 border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-5 h-5 text-amber-500" />
                    <h3 className="font-semibold">توضيح</h3>
                  </div>
                  <p className="text-sm">
                    لإضافة سياق أو توضيح قد يكون غائباً
                  </p>
                </div>
                <div className="p-4 border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <h3 className="font-semibold">تحديث</h3>
                  </div>
                  <p className="text-sm">
                    لتحديث المعلومات بناءً على تطورات جديدة
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corrections List */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-xl font-bold mb-6">سجل التصحيحات</h2>
            {corrections.length > 0 ? (
              <div className="space-y-4">
                {corrections.map((correction) => (
                  <article
                    key={correction.id}
                    className="p-5 border border-border bg-card"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`text-xs font-medium px-2 py-1 ${typeStyles[correction.type as keyof typeof typeStyles]}`}
                      >
                        {correction.type}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        {correction.date}
                      </span>
                    </div>
                    <Link
                      href={`/article/${correction.articleId}`}
                      className="text-lg font-semibold hover:text-gold transition-colors"
                    >
                      {correction.articleTitle}
                    </Link>
                    <p className="text-muted-foreground mt-2">
                      {correction.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>لا توجد تصحيحات حالياً</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Report Error */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto text-center">
            <Mail className="w-12 h-12 text-gold mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-3">الإبلاغ عن خطأ</h2>
            <p className="text-muted-foreground mb-6">
              إذا لاحظت أي خطأ في محتوانا، نرجو إعلامنا. نقدر مساعدتكم في الحفاظ
              على دقة معلوماتنا.
            </p>
            <a
              href="mailto:corrections@rethink.media"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
            >
              <Mail className="w-4 h-4" />
              corrections@rethink.media
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
