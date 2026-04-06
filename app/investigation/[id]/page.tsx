import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, FileText, Users, Calendar, Search } from "lucide-react"
import { investigations, getInvestigationById, getArticleById } from "@/lib/data"

export async function generateStaticParams() {
  return investigations.map((inv) => ({ id: inv.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const investigation = getInvestigationById(id)
  if (!investigation) return { title: "غير موجود" }
  
  return {
    title: `${investigation.title} | تحقيقات`,
    description: investigation.description,
  }
}

export default async function InvestigationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const investigation = getInvestigationById(id)
  
  if (!investigation) {
    notFound()
  }

  const article = getArticleById(investigation.articleId)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/investigations" className="hover:text-gold transition-colors">
              تحقيقات
            </Link>
            <span>/</span>
            <span className="text-gold">{investigation.title}</span>
          </nav>

          <span className="inline-block px-3 py-1 bg-gold text-primary text-sm font-medium mb-4">
            تحقيق استقصائي
          </span>

          <h1 className="text-2xl lg:text-4xl font-bold mb-4 text-balance">
            {investigation.title}
          </h1>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mb-8">
            {investigation.description}
          </p>

          {/* Investigation Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-primary-foreground/10 p-4">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">مدة التحقيق</span>
              </div>
              <span className="text-xl font-bold">{investigation.duration}</span>
            </div>
            <div className="bg-primary-foreground/10 p-4">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">المصادر</span>
              </div>
              <span className="text-xl font-bold">{investigation.sources}</span>
            </div>
            <div className="bg-primary-foreground/10 p-4">
              <div className="flex items-center gap-2 text-gold mb-1">
                <FileText className="w-4 h-4" />
                <span className="text-sm">الوثائق</span>
              </div>
              <span className="text-xl font-bold">{investigation.documents}</span>
            </div>
            <div className="bg-primary-foreground/10 p-4">
              <div className="flex items-center gap-2 text-gold mb-1">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">تاريخ النشر</span>
              </div>
              <span className="text-xl font-bold">{investigation.publishedAt}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Read Full Investigation CTA */}
              {article && (
                <Link
                  href={`/article/${article.id}`}
                  className="block mb-8 p-6 bg-gold/10 border-2 border-gold hover:bg-gold/20 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="font-bold text-lg mb-1">اقرأ التحقيق كاملاً</h2>
                      <p className="text-muted-foreground">
                        {article.readTime} قراءة
                      </p>
                    </div>
                    <ArrowLeft className="w-6 h-6 text-gold" />
                  </div>
                </Link>
              )}

              {/* Methodology */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Search className="w-5 h-5 text-gold" />
                  منهجية التحقيق
                </h2>
                <div className="p-6 bg-muted border border-border">
                  <p className="text-muted-foreground leading-relaxed">
                    اعتمد هذا التحقيق على منهجية متعددة المصادر، تضمنت مراجعة
                    الوثائق الرسمية والمسربة، وإجراء مقابلات مع مصادر داخلية
                    وخارجية، وتحليل البيانات المالية والتجارية المتاحة. تم التحقق
                    من كل معلومة من مصدرين مستقلين على الأقل قبل نشرها.
                  </p>
                </div>
              </div>

              {/* Key Findings */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">أبرز النتائج</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-muted border-r-4 border-gold">
                    <h3 className="font-semibold mb-2">النتيجة الأولى</h3>
                    <p className="text-muted-foreground text-sm">
                      كشف التحقيق عن شبكة معقدة من العلاقات المالية غير المعلنة
                      تربط بين عدة أطراف فاعلة في المنطقة.
                    </p>
                  </div>
                  <div className="p-4 bg-muted border-r-4 border-gold">
                    <h3 className="font-semibold mb-2">النتيجة الثانية</h3>
                    <p className="text-muted-foreground text-sm">
                      وثّق التحقيق تأثير هذه الشبكات على قرارات سياسية
                      واقتصادية محددة خلال السنوات الخمس الماضية.
                    </p>
                  </div>
                  <div className="p-4 bg-muted border-r-4 border-gold">
                    <h3 className="font-semibold mb-2">النتيجة الثالثة</h3>
                    <p className="text-muted-foreground text-sm">
                      تم رصد آليات التحايل على الرقابة المالية والقانونية
                      المستخدمة من قبل الأطراف المعنية.
                    </p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="mb-8">
                <h2 className="text-xl font-bold mb-4">الجدول الزمني للتحقيق</h2>
                <div className="space-y-0">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                      <div className="w-0.5 flex-1 bg-border" />
                    </div>
                    <div className="pb-6">
                      <span className="text-sm text-gold font-medium">المرحلة الأولى</span>
                      <h3 className="font-semibold">جمع المعلومات الأولية</h3>
                      <p className="text-sm text-muted-foreground">
                        تحديد الأطراف المعنية وجمع الوثائق الأساسية
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                      <div className="w-0.5 flex-1 bg-border" />
                    </div>
                    <div className="pb-6">
                      <span className="text-sm text-gold font-medium">المرحلة الثانية</span>
                      <h3 className="font-semibold">المقابلات والتحقق</h3>
                      <p className="text-sm text-muted-foreground">
                        إجراء مقابلات مع المصادر والتحقق من صحة المعلومات
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                      <div className="w-0.5 flex-1 bg-border" />
                    </div>
                    <div className="pb-6">
                      <span className="text-sm text-gold font-medium">المرحلة الثالثة</span>
                      <h3 className="font-semibold">التحليل والربط</h3>
                      <p className="text-sm text-muted-foreground">
                        تحليل البيانات وربط الخيوط للوصول إلى الاستنتاجات
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-3 h-3 rounded-full bg-gold" />
                    </div>
                    <div>
                      <span className="text-sm text-gold font-medium">المرحلة الرابعة</span>
                      <h3 className="font-semibold">النشر والمتابعة</h3>
                      <p className="text-sm text-muted-foreground">
                        نشر التحقيق ومتابعة ردود الفعل والتطورات
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Team */}
                <div className="bg-muted p-6 border border-border">
                  <h3 className="font-bold mb-4">فريق التحقيق</h3>
                  <div className="space-y-4">
                    {article && (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gold/20 flex items-center justify-center">
                          <Users className="w-5 h-5 text-gold" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{article.author.name}</p>
                          <p className="text-xs text-muted-foreground">المحقق الرئيسي</p>
                        </div>
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gold/20 flex items-center justify-center">
                        <Users className="w-5 h-5 text-gold" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">فريق التحرير</p>
                        <p className="text-xs text-muted-foreground">المراجعة والتحرير</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Related Investigations */}
                <div className="bg-muted p-6 border border-border">
                  <h3 className="font-bold mb-4">تحقيقات ذات صلة</h3>
                  <div className="space-y-3">
                    {investigations
                      .filter((inv) => inv.id !== investigation.id)
                      .slice(0, 2)
                      .map((inv) => (
                        <Link
                          key={inv.id}
                          href={`/investigation/${inv.id}`}
                          className="block p-3 bg-background hover:bg-gold/5 border border-border hover:border-gold/30 transition-colors"
                        >
                          <h4 className="font-medium text-sm mb-1 line-clamp-2">
                            {inv.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {inv.publishedAt}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Contact */}
                <div className="bg-primary text-primary-foreground p-6">
                  <h3 className="font-bold mb-2">لديك معلومات؟</h3>
                  <p className="text-sm text-primary-foreground/70 mb-4">
                    إذا كانت لديك معلومات أو وثائق تتعلق بهذا التحقيق أو تحقيقات أخرى، تواصل معنا بشكل آمن
                  </p>
                  <Link
                    href="/contact"
                    className="inline-block w-full py-3 bg-gold text-primary text-center font-medium text-sm hover:bg-gold/90 transition-colors"
                  >
                    تواصل معنا
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/investigations"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة إلى التحقيقات
          </Link>
        </div>
      </div>
    </div>
  )
}
