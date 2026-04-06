import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, FileText, BookOpen, Calendar } from "lucide-react"
import { dossiers, getDossierById, getDossierArticles } from "@/lib/data"

export async function generateStaticParams() {
  return dossiers.map((d) => ({ id: d.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const dossier = getDossierById(id)
  if (!dossier) return { title: "غير موجود" }
  
  return {
    title: `${dossier.title} | الملفات`,
    description: dossier.description,
  }
}

export default async function DossierDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const dossier = getDossierById(id)
  
  if (!dossier) {
    notFound()
  }

  const articles = getDossierArticles(id)

  const statusColors: Record<string, string> = {
    ongoing: "bg-gold text-primary",
    completed: "bg-green-600 text-white",
    updating: "bg-blue-600 text-white",
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-primary-foreground/60 mb-6">
            <Link href="/" className="hover:text-gold transition-colors">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/dossiers" className="hover:text-gold transition-colors">
              الملفات
            </Link>
            <span>/</span>
            <span className="text-gold">{dossier.title}</span>
          </nav>

          <div className="flex items-center gap-3 mb-4">
            <span className={`px-3 py-1 text-xs font-medium ${statusColors[dossier.status]}`}>
              {dossier.statusAr}
            </span>
          </div>

          <h1 className="text-2xl lg:text-4xl font-bold mb-4">{dossier.title}</h1>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mb-6">
            {dossier.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>{dossier.articlesCount} مقالات</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>آخر تحديث: {dossier.lastUpdated}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Articles List */}
            <div className="lg:col-span-2">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-gold" />
                مقالات هذا الملف
              </h2>

              {articles.length > 0 ? (
                <div className="space-y-6">
                  {articles.map((article, index) => (
                    <Link
                      key={article.id}
                      href={`/article/${article.id}`}
                      className="group block"
                    >
                      <article className="flex gap-6 p-6 bg-muted hover:bg-muted/80 border border-border hover:border-gold/50 transition-all">
                        <span className="text-4xl font-bold text-gold/30 leading-none">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-0.5 bg-gold/10 text-gold text-xs font-medium">
                              {article.categoryAr}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {article.publishedAt}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold group-hover:text-gold transition-colors mb-2">
                            {article.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2">
                            {article.excerpt}
                          </p>
                          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                            <span>{article.author.name}</span>
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                            <span>{article.readTime} قراءة</span>
                          </div>
                        </div>
                      </article>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="p-12 bg-muted border border-border text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    سيتم نشر مقالات هذا الملف قريباً
                  </p>
                </div>
              )}

              {/* Placeholder articles for visualization */}
              {articles.length === 0 && (
                <div className="space-y-4 mt-6">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="p-6 bg-muted/50 border border-border animate-pulse">
                      <div className="h-4 bg-muted-foreground/10 rounded w-1/4 mb-3" />
                      <div className="h-6 bg-muted-foreground/10 rounded w-3/4 mb-2" />
                      <div className="h-4 bg-muted-foreground/10 rounded w-full" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Dossier Stats */}
                <div className="bg-muted p-6 border border-border">
                  <h3 className="font-bold mb-4">عن هذا الملف</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">الحالة</span>
                      <span className={`px-2 py-0.5 text-xs font-medium ${statusColors[dossier.status]}`}>
                        {dossier.statusAr}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">عدد المقالات</span>
                      <span className="font-medium">{dossier.articlesCount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">آخر تحديث</span>
                      <span className="font-medium">{dossier.lastUpdated}</span>
                    </div>
                  </div>
                </div>

                {/* Related Dossiers */}
                <div className="bg-muted p-6 border border-border">
                  <h3 className="font-bold mb-4">ملفات ذات صلة</h3>
                  <div className="space-y-3">
                    {dossiers
                      .filter((d) => d.id !== dossier.id)
                      .slice(0, 3)
                      .map((d) => (
                        <Link
                          key={d.id}
                          href={`/dossier/${d.id}`}
                          className="block p-3 bg-background hover:bg-gold/5 border border-border hover:border-gold/30 transition-colors"
                        >
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">
                            {d.title}
                          </h4>
                          <span className="text-xs text-muted-foreground">
                            {d.articlesCount} مقالات
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Newsletter CTA */}
                <div className="bg-primary text-primary-foreground p-6">
                  <h3 className="font-bold mb-2">تابع هذا الملف</h3>
                  <p className="text-sm text-primary-foreground/70 mb-4">
                    احصل على تنبيهات عند نشر مقالات جديدة في هذا الملف
                  </p>
                  <Link
                    href="/newsletter"
                    className="inline-block w-full py-3 bg-gold text-primary text-center font-medium text-sm hover:bg-gold/90 transition-colors"
                  >
                    اشترك الآن
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
            href="/dossiers"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة إلى الملفات
          </Link>
        </div>
      </div>
    </div>
  )
}
