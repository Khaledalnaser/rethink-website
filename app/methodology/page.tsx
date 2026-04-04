import type { Metadata } from "next"
import {
  HelpCircle,
  Target,
  FileText,
  AlertTriangle,
  Search,
  CheckCircle,
  RefreshCw,
} from "lucide-react"

export const metadata: Metadata = {
  title: "المنهجية",
  description:
    "منهجية أعد التفكير في التحليل والتحقيق - كيف نعمل وكيف نضمن جودة تحليلاتنا",
}

const methodologySteps = [
  {
    icon: HelpCircle,
    title: "تحديد السؤال المحوري",
    description:
      "نبدأ كل تحليل بتحديد السؤال الرئيسي الذي نسعى للإجابة عليه. هذا السؤال يوجه البحث ويحدد نطاقه.",
    example:
      "مثال: كيف تؤثر التحولات الاقتصادية العالمية على سياسات التنويع في دول الخليج؟",
  },
  {
    icon: Target,
    title: "اختيار الإطار التحليلي",
    description:
      "نختار الإطار النظري أو المنهجي الأنسب للموضوع، ونوضحه للقارئ ليفهم كيف نقارب المسألة.",
    example:
      "مثال: استخدام نظرية الاعتماد المتبادل لتحليل العلاقات الاقتصادية الإقليمية",
  },
  {
    icon: Search,
    title: "جمع المعلومات والتحقق",
    description:
      "نجمع المعلومات من مصادر متنوعة ونتحقق من صحتها من خلال التقاطع بين المصادر المستقلة.",
    example: "مثال: مقابلات مع خبراء، تقارير رسمية، قواعد بيانات متخصصة",
  },
  {
    icon: FileText,
    title: "توثيق المصادر",
    description:
      "نوثق جميع مصادرنا بشفافية، ونوضح طبيعة كل مصدر وأي قيود على المعلومات المتاحة.",
    example: "مثال: الإشارة إلى مصادر مجهولة مع توضيح سبب عدم الكشف عن هويتها",
  },
  {
    icon: AlertTriangle,
    title: "تحديد حدود الاستنتاج",
    description:
      "نحدد بوضوح ما يمكن أن يغير استنتاجاتنا، والافتراضات التي بُني عليها التحليل.",
    example: "مثال: هذا التحليل يفترض استمرار أسعار النفط ضمن نطاق معين",
  },
  {
    icon: CheckCircle,
    title: "المراجعة والتدقيق",
    description:
      "تخضع جميع المواد لمراجعة تحريرية متعددة المستويات قبل النشر لضمان الدقة والتوازن.",
    example: "مثال: مراجعة من محرر القسم ورئيس التحرير ومدقق الحقائق",
  },
  {
    icon: RefreshCw,
    title: "التحديث المستمر",
    description:
      "نراقب التطورات ونحدث تحليلاتنا عند توفر معلومات جديدة جوهرية.",
    example: "مثال: تحديث الملفات البحثية دورياً مع الإشارة إلى تاريخ التحديث",
  },
]

const articleComponents = [
  {
    component: "السؤال المحوري",
    description: "السؤال الرئيسي الذي يسعى المقال للإجابة عليه",
    importance: "يوضح للقارئ محور التحليل ويساعده على تقييم مدى إجابة المقال عليه",
  },
  {
    component: "الإطار التحليلي",
    description: "المنهج أو النظرية المستخدمة في التحليل",
    importance: "يتيح للقارئ فهم الزاوية التي ننظر منها للموضوع",
  },
  {
    component: "المصادر",
    description: "توثيق شفاف للمصادر المستخدمة",
    importance: "يمكّن القارئ من التحقق والتعمق في الموضوع",
  },
  {
    component: "ما قد يغير الاستنتاج",
    description: "العوامل والتطورات التي قد تغير من صحة تحليلنا",
    importance: "يعكس نزاهتنا الفكرية وإدراكنا لحدود معرفتنا",
  },
]

export default function MethodologyPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">المنهجية</h1>
            <p className="text-lg text-primary-foreground/80">
              كيف نعمل وكيف نضمن جودة تحليلاتنا
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-lg leading-relaxed text-muted-foreground">
              نؤمن بأن الصحافة التحليلية الجيدة تتطلب منهجية واضحة ومعلنة. هذه
              الصفحة توضح الخطوات التي نتبعها في إعداد تحليلاتنا وتحقيقاتنا،
              والمعايير التي نلتزم بها لضمان الجودة والمصداقية.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Steps */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-10 gold-underline inline-block">
              خطوات العمل
            </h2>
            <div className="space-y-8">
              {methodologySteps.map((step, index) => (
                <div key={step.title} className="flex gap-6">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gold flex items-center justify-center flex-shrink-0">
                      <step.icon className="w-6 h-6 text-primary" />
                    </div>
                    {index < methodologySteps.length - 1 && (
                      <div className="w-px flex-1 bg-border mt-2" />
                    )}
                  </div>
                  <div className="pb-8">
                    <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground mb-3">
                      {step.description}
                    </p>
                    <div className="bg-muted p-3 border-r-2 border-gold">
                      <p className="text-sm text-muted-foreground">
                        {step.example}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Article Components */}
      <section className="py-12 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">
              مكونات المقال التحليلي
            </h2>
            <p className="text-muted-foreground mb-8">
              كل مقال تحليلي في أعد التفكير يتضمن العناصر التالية لضمان الشفافية
              ومساعدة القارئ على تقييم المحتوى:
            </p>
            <div className="overflow-x-auto">
              <table className="w-full bg-card border border-border">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-right p-4 font-semibold bg-muted">
                      المكون
                    </th>
                    <th className="text-right p-4 font-semibold bg-muted">
                      الوصف
                    </th>
                    <th className="text-right p-4 font-semibold bg-muted">
                      أهميته للقارئ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {articleComponents.map((item) => (
                    <tr key={item.component} className="border-b border-border">
                      <td className="p-4 font-medium text-gold">
                        {item.component}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {item.description}
                      </td>
                      <td className="p-4 text-muted-foreground">
                        {item.importance}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Standards */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 gold-underline inline-block">
              معايير الجودة
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>نقيّم جودة تحليلاتنا وفق المعايير التالية:</p>
              <ul className="space-y-3 mt-4">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>الدقة:</strong> هل المعلومات المقدمة صحيحة وموثقة؟
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>العمق:</strong> هل يتجاوز التحليل السطح ويقدم فهماً
                    أعمق؟
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>التوازن:</strong> هل تُعرض وجهات النظر المختلفة
                    بإنصاف؟
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>الوضوح:</strong> هل الكتابة واضحة ومفهومة للقارئ غير
                    المتخصص؟
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                  <span>
                    <strong>الشفافية:</strong> هل المنهجية والمصادر والقيود
                    موضحة؟
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
