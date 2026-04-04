import type { Metadata } from "next"
import { CheckCircle, AlertCircle, FileText, Users } from "lucide-react"

export const metadata: Metadata = {
  title: "السياسة التحريرية",
  description:
    "السياسة التحريرية لمنصة أعد التفكير - المعايير والإرشادات التي نتبعها في عملنا الصحفي",
}

const principles = [
  {
    title: "الاستقلالية التحريرية",
    description:
      "القرارات التحريرية تُتخذ بشكل مستقل تماماً عن أي اعتبارات تجارية أو سياسية أو شخصية. لا يحق لأي جهة خارجية التأثير على محتوانا.",
  },
  {
    title: "الفصل بين الرأي والخبر",
    description:
      "نميز بوضوح بين المحتوى الإخباري والتحليلي من جهة، والمحتوى الرأي من جهة أخرى. يُصنف كل محتوى بشكل واضح.",
  },
  {
    title: "التوازن والإنصاف",
    description:
      "نسعى لتقديم جميع وجهات النظر ذات الصلة بالموضوع، ونمنح المتأثرين بتقاريرنا الفرصة للرد قبل النشر.",
  },
  {
    title: "حماية المصادر",
    description:
      "نحمي سرية مصادرنا التي تطلب عدم الكشف عن هويتها، ونوضح للقراء سبب استخدام مصادر مجهولة عند الضرورة.",
  },
]

const contentTypes = [
  {
    icon: FileText,
    type: "تحليل",
    description:
      "مقالات تحليلية معمّقة تستند إلى الوقائع والبيانات لفهم الأحداث والاتجاهات",
  },
  {
    icon: CheckCircle,
    type: "تحقيق",
    description:
      "تحقيقات استقصائية تكشف عن معلومات جديدة أو تضيء على قضايا مهمة",
  },
  {
    icon: Users,
    type: "ملف",
    description:
      "مجموعة متكاملة من المواد حول موضوع واحد، تُحدث باستمرار",
  },
  {
    icon: AlertCircle,
    type: "رأي",
    description:
      "مقالات رأي تعبر عن وجهة نظر الكاتب، مُصنفة بوضوح",
  },
]

export default function EditorialPolicyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              السياسة التحريرية
            </h1>
            <p className="text-lg text-primary-foreground/80">
              المعايير والإرشادات التي نتبعها في عملنا الصحفي
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-muted-foreground">
              تحدد هذه السياسة التحريرية المبادئ والمعايير التي توجه عملنا في أعد
              التفكير. نلتزم بهذه المعايير في جميع مراحل العمل الصحفي، من جمع
              المعلومات إلى النشر والمتابعة. هذه السياسة متاحة للجمهور كجزء من
              التزامنا بالشفافية.
            </p>
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8 gold-underline inline-block">
              المبادئ الأساسية
            </h2>
            <div className="space-y-6">
              {principles.map((principle, index) => (
                <div
                  key={principle.title}
                  className="p-6 border border-border bg-card"
                >
                  <div className="flex items-start gap-4">
                    <span className="text-2xl font-bold text-gold">
                      {(index + 1).toLocaleString("ar-EG")}
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">
                        {principle.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {principle.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Content Types */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">أنواع المحتوى</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {contentTypes.map((item) => (
                <div
                  key={item.type}
                  className="p-5 bg-card border border-border"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <item.icon className="w-5 h-5 text-gold" />
                    <h3 className="font-semibold">{item.type}</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Verification */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 gold-underline inline-block">
              التحقق من المعلومات
            </h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p>
                نتبع إجراءات صارمة للتحقق من المعلومات قبل نشرها، تشمل:
              </p>
              <ul className="space-y-2 mt-4">
                <li>التأكد من صحة المعلومات من مصادر متعددة ومستقلة</li>
                <li>التحقق من هوية المصادر ومصداقيتها</li>
                <li>مراجعة الوثائق والبيانات الداعمة</li>
                <li>إتاحة الفرصة للأطراف المعنية للرد</li>
                <li>المراجعة التحريرية متعددة المستويات</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Corrections */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">التصحيحات والتحديثات</h2>
            <div className="text-muted-foreground space-y-4">
              <p>
                نلتزم بتصحيح أي خطأ يُكتشف في محتوانا المنشور بشكل سريع وشفاف.
                تُنشر جميع التصحيحات الجوهرية مع إشارة واضحة إلى التغيير الذي تم.
              </p>
              <p>
                للإبلاغ عن خطأ أو طلب تصحيح، يُرجى التواصل معنا عبر صفحة
                التصحيحات.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
