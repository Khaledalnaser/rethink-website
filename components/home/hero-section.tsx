import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const featuredStory = {
  id: "1",
  title: "إعادة رسم خريطة النفوذ: كيف تتغير موازين القوى في المنطقة؟",
  excerpt:
    "تحليل معمّق لتحولات التحالفات الإقليمية وتأثيرها على مستقبل الشرق الأوسط في ضوء المتغيرات الجيوسياسية الأخيرة",
  category: "تحليل",
  author: "فريق التحرير",
  date: "٢ أبريل ٢٠٢٦",
  readTime: "١٢ دقيقة",
  image: "/placeholder.jpg",
}

const secondaryStories = [
  {
    id: "2",
    title: "ملف: الاقتصادات العربية في مواجهة التحديات العالمية",
    category: "ملفات",
    date: "١ أبريل ٢٠٢٦",
  },
  {
    id: "3",
    title: "تحقيق: شبكات التمويل الخفية وتأثيرها على القرار السياسي",
    category: "تحقيقات",
    date: "٣١ مارس ٢٠٢٦",
  },
  {
    id: "4",
    title: "خريطة القوى: الفاعلون الجدد في المشهد الإقليمي",
    category: "خرائط القوى",
    date: "٣٠ مارس ٢٠٢٦",
  },
]

export function HeroSection() {
  return (
    <section className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Main Featured Story */}
          <div className="lg:col-span-2">
            <Link href={`/article/${featuredStory.id}`} className="group block">
              <article className="relative">
                <div className="aspect-[16/9] lg:aspect-[2/1] bg-muted/20 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gold/20 to-transparent flex items-center justify-center">
                    <span className="text-primary-foreground/30 text-sm">
                      صورة المقال الرئيسي
                    </span>
                  </div>
                </div>
                <div className="mt-4 lg:mt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-gold text-primary text-xs font-medium">
                      {featuredStory.category}
                    </span>
                    <span className="text-sm text-primary-foreground/60">
                      {featuredStory.date}
                    </span>
                  </div>
                  <h1 className="text-2xl lg:text-4xl font-bold leading-tight mb-3 group-hover:text-gold transition-colors text-balance">
                    {featuredStory.title}
                  </h1>
                  <p className="text-primary-foreground/70 text-base lg:text-lg leading-relaxed mb-4 max-w-2xl">
                    {featuredStory.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-primary-foreground/60">
                    <span>{featuredStory.author}</span>
                    <span className="w-1 h-1 rounded-full bg-primary-foreground/40" />
                    <span>{featuredStory.readTime} قراءة</span>
                  </div>
                </div>
              </article>
            </Link>
          </div>

          {/* Secondary Stories */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            <h2 className="text-sm font-medium text-gold border-b border-primary-foreground/10 pb-2">
              أبرز المواضيع
            </h2>
            {secondaryStories.map((story, index) => (
              <Link
                key={story.id}
                href={`/article/${story.id}`}
                className="group block"
              >
                <article
                  className={`py-4 ${index !== secondaryStories.length - 1 ? "border-b border-primary-foreground/10" : ""}`}
                >
                  <span className="text-xs text-gold font-medium">
                    {story.category}
                  </span>
                  <h3 className="text-base lg:text-lg font-semibold mt-1 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <span className="text-xs text-primary-foreground/50 mt-2 block">
                    {story.date}
                  </span>
                </article>
              </Link>
            ))}
            <Link
              href="/stories"
              className="inline-flex items-center gap-2 text-sm text-gold hover:underline mt-2"
            >
              جميع القصص
              <ArrowLeft className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
