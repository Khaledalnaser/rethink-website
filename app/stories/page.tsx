import type { Metadata } from "next"
import Link from "next/link"
import { Clock, User } from "lucide-react"

export const metadata: Metadata = {
  title: "قصص",
  description: "أحدث القصص والمقالات التحليلية من منصة أعد التفكير",
}

const categories = [
  "الكل",
  "سياسة",
  "اقتصاد",
  "مجتمع",
  "تكنولوجيا",
  "بيئة",
  "ثقافة",
]

const stories = [
  {
    id: "1",
    title: "إعادة رسم خريطة النفوذ: كيف تتغير موازين القوى في المنطقة؟",
    excerpt:
      "تحليل معمّق لتحولات التحالفات الإقليمية وتأثيرها على مستقبل الشرق الأوسط",
    category: "سياسة",
    author: "فريق التحرير",
    date: "٢ أبريل ٢٠٢٦",
    readTime: "١٢ دقيقة",
    featured: true,
  },
  {
    id: "2",
    title: "السياسات النقدية وتأثيرها على الطبقة الوسطى في المنطقة العربية",
    excerpt:
      "كيف تؤثر قرارات البنوك المركزية على القدرة الشرائية للمواطن العادي؟",
    category: "اقتصاد",
    author: "سارة المحمود",
    date: "٢ أبريل ٢٠٢٦",
    readTime: "٨ دقائق",
    featured: false,
  },
  {
    id: "3",
    title: "الهجرة العكسية: لماذا يعود الشباب العربي إلى بلدانهم؟",
    excerpt:
      "ظاهرة جديدة تستحق الدراسة في ظل التحولات الاقتصادية والاجتماعية العالمية",
    category: "مجتمع",
    author: "أحمد الناصر",
    date: "١ أبريل ٢٠٢٦",
    readTime: "١٠ دقائق",
    featured: false,
  },
  {
    id: "4",
    title: "التحول الرقمي في القطاع الحكومي: نجاحات وإخفاقات",
    excerpt: "مراجعة تحليلية لتجارب التحول الرقمي في عدة دول عربية",
    category: "تكنولوجيا",
    author: "لينا العتيبي",
    date: "٣١ مارس ٢٠٢٦",
    readTime: "٧ دقائق",
    featured: false,
  },
  {
    id: "5",
    title: "المناخ والأمن الغذائي: تحديات وجودية في المنطقة",
    excerpt:
      "كيف تواجه الدول العربية التغير المناخي وتأثيره على الإنتاج الزراعي؟",
    category: "بيئة",
    author: "محمد الشمري",
    date: "٣٠ مارس ٢٠٢٦",
    readTime: "٩ دقائق",
    featured: false,
  },
  {
    id: "6",
    title: "الثقافة الرقمية وتحولات الهوية العربية",
    excerpt: "كيف تعيد المنصات الرقمية تشكيل الثقافة والهوية لدى الأجيال الجديدة؟",
    category: "ثقافة",
    author: "نورا الحربي",
    date: "٢٩ مارس ٢٠٢٦",
    readTime: "١١ دقيقة",
    featured: false,
  },
]

export default function StoriesPage() {
  const featuredStory = stories.find((s) => s.featured)
  const regularStories = stories.filter((s) => !s.featured)

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">قصص</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            تحليلات ومقالات معمّقة حول أهم القضايا والأحداث في المنطقة العربية
            والعالم
          </p>
        </div>
      </section>

      {/* Categories Filter */}
      <section className="border-b border-border sticky top-16 lg:top-20 bg-background z-40">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 py-3 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                  category === "الكل"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Featured Story */}
        {featuredStory && (
          <section className="mb-12">
            <Link href={`/article/${featuredStory.id}`} className="group block">
              <article className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 bg-muted">
                <div className="aspect-[16/10] bg-muted-foreground/10 flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">
                    صورة المقال
                  </span>
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-sm text-gold font-medium mb-2">
                    {featuredStory.category}
                  </span>
                  <h2 className="text-2xl lg:text-3xl font-bold mb-3 group-hover:text-gold transition-colors">
                    {featuredStory.title}
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    {featuredStory.excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      <span>{featuredStory.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{featuredStory.readTime}</span>
                    </div>
                  </div>
                </div>
              </article>
            </Link>
          </section>
        )}

        {/* Stories Grid */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularStories.map((story) => (
              <Link
                key={story.id}
                href={`/article/${story.id}`}
                className="group block"
              >
                <article className="article-card h-full border border-border bg-card">
                  <div className="aspect-[16/10] bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">صورة</span>
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-medium text-gold">
                      {story.category}
                    </span>
                    <h3 className="text-lg font-semibold mt-1 mb-2 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                      {story.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {story.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{story.author}</span>
                      <span>{story.readTime}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>

        {/* Pagination */}
        <nav className="flex items-center justify-center gap-2 mt-12">
          <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
            السابق
          </button>
          <button className="px-4 py-2 bg-primary text-primary-foreground">
            ١
          </button>
          <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
            ٢
          </button>
          <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
            ٣
          </button>
          <button className="px-4 py-2 bg-muted text-muted-foreground hover:bg-muted/80 transition-colors">
            التالي
          </button>
        </nav>
      </div>
    </div>
  )
}
