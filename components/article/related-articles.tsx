import Link from "next/link"

const relatedArticles = [
  {
    id: "r1",
    title: "التحالفات الاقتصادية الجديدة في المنطقة",
    category: "اقتصاد",
    date: "١ أبريل ٢٠٢٦",
  },
  {
    id: "r2",
    title: "مستقبل الدبلوماسية العربية في عالم متعدد الأقطاب",
    category: "سياسة",
    date: "٢٩ مارس ٢٠٢٦",
  },
  {
    id: "r3",
    title: "الأمن الإقليمي: تحديات وفرص",
    category: "تحليل",
    date: "٢٧ مارس ٢٠٢٦",
  },
]

export function RelatedArticles() {
  return (
    <div>
      <h3 className="text-lg font-bold mb-4 pb-2 border-b-2 border-gold">
        مقالات ذات صلة
      </h3>
      <div className="space-y-4">
        {relatedArticles.map((article) => (
          <Link
            key={article.id}
            href={`/article/${article.id}`}
            className="group block"
          >
            <article className="py-3 border-b border-border last:border-b-0">
              <span className="text-xs text-gold font-medium">
                {article.category}
              </span>
              <h4 className="text-sm font-medium mt-1 leading-snug group-hover:text-gold transition-colors line-clamp-2">
                {article.title}
              </h4>
              <span className="text-xs text-muted-foreground mt-1 block">
                {article.date}
              </span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  )
}
