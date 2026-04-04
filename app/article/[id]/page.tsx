import type { Metadata } from "next"
import Link from "next/link"
import {
  Clock,
  Calendar,
  User,
  Share2,
  Bookmark,
  ArrowLeft,
  HelpCircle,
  Target,
  FileText,
  AlertTriangle,
} from "lucide-react"
import { RelatedArticles } from "@/components/article/related-articles"

// This would come from a database in production
const article = {
  id: "1",
  title: "إعادة رسم خريطة النفوذ: كيف تتغير موازين القوى في المنطقة؟",
  subtitle:
    "تحليل معمّق لتحولات التحالفات الإقليمية وتأثيرها على مستقبل الشرق الأوسط",
  category: "تحليل",
  categorySlug: "analysis",
  author: {
    name: "فريق التحرير",
    bio: "فريق التحرير في أعد التفكير متخصص في التحليل السياسي والاستراتيجي",
  },
  publishedAt: "٢ أبريل ٢٠٢٦",
  updatedAt: "٣ أبريل ٢٠٢٦",
  readTime: "١٢ دقيقة",
  // Core Question - What we're trying to answer
  coreQuestion:
    "كيف تؤثر التحولات الجيوسياسية الأخيرة على توازن القوى في المنطقة العربية، وما السيناريوهات المحتملة للمستقبل القريب؟",
  // Analytical Model - How we're approaching this
  analyticalModel:
    "نعتمد في هذا التحليل على إطار تحليل التحالفات متعدد الأبعاد، الذي يأخذ بعين الاعتبار العوامل الاقتصادية والأمنية والأيديولوجية في تشكيل العلاقات بين الدول. كما نستخدم نظرية توازن القوى لفهم ديناميكيات التحالف والتنافس.",
  // What could change the conclusion
  uncertainties: [
    "تغيرات جذرية في أسعار النفط قد تعيد ترتيب الأولويات الاقتصادية",
    "تحولات في السياسة الأمريكية تجاه المنطقة بعد الانتخابات المقبلة",
    "تصاعد أو تراجع حدة الصراعات الإقليمية الجارية",
    "اتفاقيات سلام أو تطبيع جديدة غير متوقعة",
  ],
  // Sources
  sources: [
    {
      type: "وثائق رسمية",
      items: [
        "تقارير وزارات الخارجية للدول المعنية",
        "بيانات القمم العربية ٢٠٢٤-٢٠٢٦",
      ],
    },
    {
      type: "مقابلات",
      items: [
        "٣ دبلوماسيين سابقين (بموافقة على عدم الكشف عن الهوية)",
        "باحثان في مراكز دراسات إقليمية",
      ],
    },
    {
      type: "دراسات وأبحاث",
      items: [
        "تقارير مركز كارنيغي للشرق الأوسط",
        "دراسات معهد بروكينغز الدوحة",
        "أبحاث مركز الملك فيصل للبحوث",
      ],
    },
  ],
  content: `
    <p class="lead">تشهد المنطقة العربية تحولات جيوسياسية متسارعة تعيد رسم خريطة التحالفات والنفوذ، في ظل تراجع الهيمنة الأمريكية التقليدية وصعود فاعلين إقليميين ودوليين جدد.</p>

    <h2>المشهد الراهن: تحولات بنيوية</h2>
    <p>لم تعد الخريطة الجيوسياسية للمنطقة العربية كما كانت قبل عقد من الزمن. فقد أدت مجموعة من التطورات المتشابكة إلى إعادة ترتيب الأولويات والتحالفات بشكل جذري. من أبرز هذه التحولات:</p>
    
    <ul>
      <li>تراجع الاعتماد على النفط كمحرك رئيسي للعلاقات الدولية</li>
      <li>صعود الاقتصاد الرقمي وتنافس الدول على جذب الاستثمارات التقنية</li>
      <li>تنامي الدور الصيني والروسي في المنطقة</li>
      <li>إعادة تقييم العلاقات مع الدول الغربية التقليدية</li>
    </ul>

    <h2>محاور التنافس الجديدة</h2>
    <p>تتبلور ثلاثة محاور رئيسية للتنافس الإقليمي، يتقاطع بعضها ويتصادم بعضها الآخر:</p>

    <h3>المحور الأول: التنافس على القيادة الإقليمية</h3>
    <p>تتسابق عدة دول على تعزيز نفوذها الإقليمي من خلال المبادرات الاقتصادية والدبلوماسية. وتبرز في هذا السياق جهود التنويع الاقتصادي والانفتاح على أسواق جديدة.</p>

    <h3>المحور الثاني: إدارة الصراعات</h3>
    <p>تسعى القوى الإقليمية إلى إدارة الصراعات القائمة وتوظيفها لتعزيز مواقعها، مع محاولة تجنب الانزلاق إلى مواجهات مباشرة مكلفة.</p>

    <h3>المحور الثالث: التموضع الدولي</h3>
    <p>تعيد الدول العربية حساباتها في علاقاتها مع القوى الكبرى، ساعية إلى تحقيق توازن بين الحفاظ على الشراكات التقليدية وفتح قنوات جديدة مع قوى صاعدة.</p>

    <blockquote>
      "نحن أمام لحظة تاريخية تتطلب إعادة تعريف المصالح والأولويات. لم يعد بالإمكان الاعتماد على الأنماط القديمة في إدارة العلاقات الدولية."
      <cite>— دبلوماسي عربي سابق</cite>
    </blockquote>

    <h2>السيناريوهات المحتملة</h2>
    <p>بناءً على تحليل المعطيات الراهنة والاتجاهات طويلة المدى، يمكن رصد ثلاثة سيناريوهات رئيسية:</p>

    <h3>السيناريو الأول: التوازن الهش</h3>
    <p>استمرار الوضع الراهن مع تعديلات طفيفة، حيث تحافظ كل دولة على مناطق نفوذها دون تغييرات جوهرية.</p>

    <h3>السيناريو الثاني: إعادة الاصطفاف</h3>
    <p>تشكيل تحالفات جديدة تتجاوز الانقسامات التقليدية، بناءً على المصالح الاقتصادية المشتركة.</p>

    <h3>السيناريو الثالث: التفكك التدريجي</h3>
    <p>تصاعد التنافس والصراعات، مما يؤدي إلى مزيد من الانقسام وضعف التعاون الإقليمي.</p>

    <h2>الخلاصة</h2>
    <p>تمر المنطقة العربية بمرحلة انتقالية حاسمة ستحدد ملامح النظام الإقليمي للعقود القادمة. وبينما تحمل هذه المرحلة مخاطر جدية، فإنها تفتح أيضاً فرصاً لإعادة بناء العلاقات على أسس أكثر توازناً وفاعلية.</p>
  `,
  tags: ["جيوسياسة", "تحالفات", "الشرق الأوسط", "السياسة الخارجية"],
}

export const metadata: Metadata = {
  title: article.title,
  description: article.subtitle,
  openGraph: {
    title: article.title,
    description: article.subtitle,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    authors: [article.author.name],
    tags: article.tags,
  },
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <article className="min-h-screen">
      {/* Article Header */}
      <header className="bg-primary text-primary-foreground py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
              <Link href="/" className="hover:text-gold transition-colors">
                الرئيسية
              </Link>
              <span>/</span>
              <Link
                href="/stories"
                className="hover:text-gold transition-colors"
              >
                قصص
              </Link>
              <span>/</span>
              <span className="text-gold">{article.category}</span>
            </nav>

            {/* Category */}
            <span className="inline-block px-3 py-1 bg-gold text-primary text-sm font-medium mb-4">
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-4 text-balance">
              {article.title}
            </h1>

            {/* Subtitle */}
            <p className="text-lg lg:text-xl text-primary-foreground/80 mb-6">
              {article.subtitle}
            </p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/60">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{article.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{article.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>{article.readTime} قراءة</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-primary-foreground/10">
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm">
                <Share2 className="w-4 h-4" />
                مشاركة
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors text-sm">
                <Bookmark className="w-4 h-4" />
                حفظ
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Core Question Box */}
            <div className="bg-gold/10 border-r-4 border-gold p-6 mb-8">
              <div className="flex items-start gap-3">
                <HelpCircle className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-gold mb-2">
                    السؤال المحوري
                  </h2>
                  <p className="text-foreground leading-relaxed">
                    {article.coreQuestion}
                  </p>
                </div>
              </div>
            </div>

            {/* Analytical Model Box */}
            <div className="bg-muted border border-border p-6 mb-8">
              <div className="flex items-start gap-3">
                <Target className="w-6 h-6 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-muted-foreground mb-2">
                    الإطار التحليلي
                  </h2>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    {article.analyticalModel}
                  </p>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div
              className="prose prose-lg max-w-none
                prose-headings:font-bold prose-headings:text-foreground
                prose-h2:text-xl prose-h2:mt-8 prose-h2:mb-4
                prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-foreground prose-p:leading-relaxed prose-p:mb-4
                prose-a:text-gold prose-a:no-underline hover:prose-a:underline
                prose-blockquote:border-r-4 prose-blockquote:border-gold prose-blockquote:bg-muted prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                prose-ul:my-4 prose-li:my-1
                prose-strong:text-foreground
                [&_.lead]:text-xl [&_.lead]:text-muted-foreground [&_.lead]:leading-relaxed [&_.lead]:mb-8"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* What Could Change */}
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 p-6 mt-10">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-sm font-bold text-amber-800 dark:text-amber-400 mb-3">
                    ما قد يغير هذا الاستنتاج؟
                  </h2>
                  <ul className="space-y-2">
                    {article.uncertainties.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-amber-900 dark:text-amber-300"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600 dark:bg-amber-500 mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Sources */}
            <div className="mt-10 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-muted-foreground" />
                <h2 className="text-lg font-bold">المصادر والمراجع</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {article.sources.map((source, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold text-gold mb-2">
                      {source.type}
                    </h3>
                    <ul className="space-y-1">
                      {source.items.map((item, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="text-sm text-muted-foreground"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mt-8 pt-6 border-t border-border">
              <div className="flex flex-wrap gap-2">
                {article.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/tag/${tag}`}
                    className="px-3 py-1 bg-muted text-sm text-muted-foreground hover:bg-gold hover:text-primary transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author Bio */}
            <div className="mt-8 p-6 bg-muted">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gold/20 flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-gold" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{article.author.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {article.author.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-8">
              <RelatedArticles />

              {/* Newsletter CTA */}
              <div className="bg-primary text-primary-foreground p-6">
                <h3 className="font-bold mb-2">تابع تحليلاتنا</h3>
                <p className="text-sm text-primary-foreground/70 mb-4">
                  احصل على أحدث التحليلات والتحقيقات في بريدك
                </p>
                <Link
                  href="/newsletter"
                  className="inline-block w-full py-3 bg-gold text-primary text-center font-medium text-sm hover:bg-gold-light transition-colors"
                >
                  اشترك الآن
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Navigation */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة إلى القصص
          </Link>
        </div>
      </div>
    </article>
  )
}
