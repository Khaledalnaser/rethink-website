import type { Metadata } from "next"
import Link from "next/link"
import { Target, Eye, Users, Shield, ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "من نحن",
  description:
    "تعرف على منصة أعد التفكير للصحافة التحليلية المعمّقة - رؤيتنا، مهمتنا، وفريقنا",
}

const values = [
  {
    icon: Target,
    title: "الدقة",
    description:
      "نلتزم بأعلى معايير الدقة في جمع المعلومات والتحقق منها قبل النشر",
  },
  {
    icon: Eye,
    title: "الشفافية",
    description:
      "نوضح منهجيتنا ومصادرنا ونعترف بحدود معرفتنا وما قد يغير استنتاجاتنا",
  },
  {
    icon: Users,
    title: "الاستقلالية",
    description:
      "نعمل باستقلالية تامة عن أي جهة سياسية أو اقتصادية قد تؤثر على تحليلاتنا",
  },
  {
    icon: Shield,
    title: "المسؤولية",
    description:
      "نتحمل مسؤولية ما ننشر ونصحح أخطاءنا بشفافية عند اكتشافها",
  },
]

const team = [
  {
    name: "سارة المحمود",
    role: "رئيسة التحرير",
    bio: "صحفية وباحثة متخصصة في الشؤون السياسية والاستراتيجية، عملت سابقاً في عدة منصات إعلامية إقليمية ودولية",
  },
  {
    name: "أحمد الناصر",
    role: "مدير التحقيقات",
    bio: "صحفي استقصائي حائز على عدة جوائز، متخصص في تتبع شبكات المال والنفوذ",
  },
  {
    name: "لينا العتيبي",
    role: "محررة الملفات",
    bio: "باحثة في العلوم السياسية ومتخصصة في إعداد الملفات البحثية المعمّقة",
  },
  {
    name: "محمد الشمري",
    role: "محلل البيانات",
    bio: "متخصص في تحليل البيانات والتصوير البصري للمعلومات المعقدة",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl lg:text-5xl font-bold mb-6">من نحن</h1>
            <p className="text-lg lg:text-xl text-primary-foreground/80 leading-relaxed">
              أعد التفكير منصة صحفية تحليلية مستقلة، تسعى إلى تقديم فهم أعمق
              للأحداث والقضايا في المنطقة العربية من خلال التحليل المنهجي
              والتحقيق الدقيق
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 gold-underline inline-block">
              مهمتنا
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                في عصر تتدفق فيه المعلومات بسرعة غير مسبوقة، يصبح الفهم العميق
                للأحداث أكثر صعوبة وأكثر أهمية في آن واحد. نؤمن بأن القارئ العربي
                يستحق صحافة تحترم ذكاءه وتمنحه الأدوات اللازمة لفهم ما يجري حوله.
              </p>
              <p>
                نسعى في أعد التفكير إلى تجاوز الأخبار العاجلة نحو التحليل
                المعمّق، ومن السطح إلى الجذور، ومن ردود الفعل إلى استشراف
                المستقبل.
              </p>
              <p>
                نقدم لقرائنا ليس فقط ما حدث، بل لماذا حدث، وكيف يمكن أن يتطور،
                وما الذي قد يغير مسار الأحداث.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">قيمنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card p-6 border border-border"
              >
                <div className="w-12 h-12 bg-gold/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-10 text-center">فريقنا</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {team.map((member) => (
              <div
                key={member.name}
                className="flex items-start gap-4 p-6 border border-border"
              >
                <div className="w-16 h-16 bg-muted flex items-center justify-center flex-shrink-0">
                  <Users className="w-8 h-8 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <span className="text-sm text-gold">{member.role}</span>
                  <p className="text-sm text-muted-foreground mt-2">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">تواصل معنا</h2>
          <p className="text-primary-foreground/70 mb-6 max-w-xl mx-auto">
            نرحب بملاحظاتكم واقتراحاتكم وتعاونكم في تقديم صحافة أفضل للقارئ
            العربي
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-primary font-medium hover:bg-gold-light transition-colors"
          >
            تواصل معنا
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  )
}
