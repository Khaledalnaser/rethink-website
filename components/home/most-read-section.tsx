import Link from "next/link"

const mostRead = [
  {
    id: "m1",
    title: "لماذا تتسارع وتيرة الإصلاحات الاقتصادية في المنطقة؟",
    category: "اقتصاد",
    views: "١٢,٤٥٠",
  },
  {
    id: "m2",
    title: "الشباب العربي والهوية: بين المحلي والعالمي",
    category: "مجتمع",
    views: "٩,٨٧٠",
  },
  {
    id: "m3",
    title: "تحولات في منظومة الأمن الإقليمي: قراءة تحليلية",
    category: "سياسة",
    views: "٨,٣٢٠",
  },
  {
    id: "m4",
    title: "الذكاء الاصطناعي والوظائف: ما مستقبل سوق العمل؟",
    category: "تكنولوجيا",
    views: "٧,٦٥٠",
  },
  {
    id: "m5",
    title: "المدن الذكية في الخليج: الطموح والواقع",
    category: "تنمية",
    views: "٦,٤٣٠",
  },
]

export function MostReadSection() {
  return (
    <section className="mb-8">
      <h2 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gold">
        الأكثر قراءة
      </h2>
      <div className="space-y-1">
        {mostRead.map((article, index) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="group block"
          >
            <article className="flex items-start gap-3 py-3 border-b border-border last:border-b-0">
              <span className="text-2xl font-bold text-gold leading-none">
                {(index + 1).toLocaleString("ar-EG")}
              </span>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium leading-snug group-hover:text-gold transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                  <span>{article.category}</span>
                  <span className="w-1 h-1 rounded-full bg-muted-foreground/50" />
                  <span>{article.views} مشاهدة</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
