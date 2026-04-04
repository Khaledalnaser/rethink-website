import Link from "next/link"
import { ArrowLeft } from "lucide-react"

const stories = [
  {
    id: "5",
    title: "السياسات النقدية وتأثيرها على الطبقة الوسطى في المنطقة العربية",
    excerpt:
      "كيف تؤثر قرارات البنوك المركزية على القدرة الشرائية للمواطن العادي؟",
    category: "اقتصاد",
    author: "سارة المحمود",
    date: "٢ أبريل ٢٠٢٦",
    readTime: "٨ دقائق",
  },
  {
    id: "6",
    title: "الهجرة العكسية: لماذا يعود الشباب العربي إلى بلدانهم؟",
    excerpt:
      "ظاهرة جديدة تستحق الدراسة في ظل التحولات الاقتصادية والاجتماعية العالمية",
    category: "مجتمع",
    author: "أحمد الناصر",
    date: "١ أبريل ٢٠٢٦",
    readTime: "١٠ دقائق",
  },
  {
    id: "7",
    title: "التحول الرقمي في القطاع الحكومي: نجاحات وإخفاقات",
    excerpt: "مراجعة تحليلية لتجارب التحول الرقمي في عدة دول عربية",
    category: "تكنولوجيا",
    author: "لينا العتيبي",
    date: "٣١ مارس ٢٠٢٦",
    readTime: "٧ دقائق",
  },
  {
    id: "8",
    title: "المناخ والأمن الغذائي: تحديات وجودية في المنطقة",
    excerpt:
      "كيف تواجه الدول العربية التغير المناخي وتأثيره على الإنتاج الزراعي؟",
    category: "بيئة",
    author: "محمد الشمري",
    date: "٣٠ مارس ٢٠٢٦",
    readTime: "٩ دقائق",
  },
]

export function LatestStories() {
  return (
    <section className="py-12 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl lg:text-2xl font-bold gold-underline">
            أحدث القصص
          </h2>
          <Link
            href="/stories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            عرض الكل
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stories.map((story) => (
            <Link
              key={story.id}
              href={`/article/${story.id}`}
              className="group block"
            >
              <article className="article-card h-full">
                <div className="aspect-[4/3] bg-muted mb-4 overflow-hidden">
                  <div className="w-full h-full bg-gradient-to-br from-gold/10 to-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-xs">صورة</span>
                  </div>
                </div>
                <div>
                  <span className="text-xs font-medium text-gold">
                    {story.category}
                  </span>
                  <h3 className="text-base font-semibold mt-1 mb-2 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                    {story.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                    {story.excerpt}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{story.author}</span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                    <span>{story.readTime}</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
