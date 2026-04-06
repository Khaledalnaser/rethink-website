"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { Search, Filter, Clock, User, X } from "lucide-react"
import { articles, dossiers, investigations, powerMaps } from "@/lib/data"

type ContentType = "all" | "articles" | "dossiers" | "investigations" | "power-maps"

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const [contentType, setContentType] = useState<ContentType>("all")

  const searchResults = useMemo(() => {
    if (!query.trim()) return { articles: [], dossiers: [], investigations: [], powerMaps: [] }

    const lowercaseQuery = query.toLowerCase()

    const filteredArticles = articles.filter(
      (a) =>
        a.title.includes(query) ||
        a.title.toLowerCase().includes(lowercaseQuery) ||
        a.excerpt.includes(query) ||
        a.excerpt.toLowerCase().includes(lowercaseQuery) ||
        a.tags.some((t) => t.includes(query) || t.toLowerCase().includes(lowercaseQuery))
    )

    const filteredDossiers = dossiers.filter(
      (d) =>
        d.title.includes(query) ||
        d.title.toLowerCase().includes(lowercaseQuery) ||
        d.description.includes(query) ||
        d.description.toLowerCase().includes(lowercaseQuery)
    )

    const filteredInvestigations = investigations.filter(
      (i) =>
        i.title.includes(query) ||
        i.title.toLowerCase().includes(lowercaseQuery) ||
        i.description.includes(query) ||
        i.description.toLowerCase().includes(lowercaseQuery)
    )

    const filteredPowerMaps = powerMaps.filter(
      (p) =>
        p.title.includes(query) ||
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.description.includes(query) ||
        p.description.toLowerCase().includes(lowercaseQuery)
    )

    return {
      articles: filteredArticles,
      dossiers: filteredDossiers,
      investigations: filteredInvestigations,
      powerMaps: filteredPowerMaps,
    }
  }, [query])

  const totalResults =
    searchResults.articles.length +
    searchResults.dossiers.length +
    searchResults.investigations.length +
    searchResults.powerMaps.length

  const contentTypes: { value: ContentType; label: string; count: number }[] = [
    { value: "all", label: "الكل", count: totalResults },
    { value: "articles", label: "مقالات", count: searchResults.articles.length },
    { value: "dossiers", label: "ملفات", count: searchResults.dossiers.length },
    { value: "investigations", label: "تحقيقات", count: searchResults.investigations.length },
    { value: "power-maps", label: "خرائط القوى", count: searchResults.powerMaps.length },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-6">البحث</h1>
          
          {/* Search Input */}
          <div className="relative max-w-2xl">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ابحث في المقالات والتحقيقات والملفات..."
              className="w-full pr-12 pl-12 py-4 bg-background text-foreground text-lg border-0 focus:outline-none focus:ring-2 focus:ring-gold"
              autoFocus
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Filters */}
      {query && (
        <section className="border-b border-border">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              <Filter className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              {contentTypes.map((type) => (
                <button
                  key={type.value}
                  onClick={() => setContentType(type.value)}
                  className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
                    contentType === type.value
                      ? "bg-gold text-primary"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type.label} ({type.count})
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {!query ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                ابدأ بكتابة كلمات البحث للعثور على المحتوى
              </p>
              <div className="mt-8">
                <h3 className="font-semibold mb-4">بحث شائع</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {["جيوسياسة", "اقتصاد", "تحقيقات", "الخليج", "تقنية"].map((term) => (
                    <button
                      key={term}
                      onClick={() => setQuery(term)}
                      className="px-4 py-2 bg-muted text-muted-foreground hover:bg-gold hover:text-primary transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-12">
              <Search className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg mb-2">
                لم نجد نتائج لـ &quot;{query}&quot;
              </p>
              <p className="text-muted-foreground text-sm">
                حاول استخدام كلمات مختلفة أو أكثر عمومية
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {/* Articles */}
              {(contentType === "all" || contentType === "articles") &&
                searchResults.articles.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      مقالات
                      <span className="text-sm font-normal text-muted-foreground">
                        ({searchResults.articles.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {searchResults.articles.map((article) => (
                        <Link
                          key={article.id}
                          href={`/article/${article.id}`}
                          className="group block"
                        >
                          <article className="h-full border border-border bg-card hover:border-gold/50 transition-all p-6">
                            <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-medium mb-3">
                              {article.categoryAr}
                            </span>
                            <h3 className="font-bold mb-2 group-hover:text-gold transition-colors line-clamp-2">
                              {article.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {article.excerpt}
                            </p>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                {article.author.name}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {article.readTime}
                              </span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Dossiers */}
              {(contentType === "all" || contentType === "dossiers") &&
                searchResults.dossiers.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      ملفات
                      <span className="text-sm font-normal text-muted-foreground">
                        ({searchResults.dossiers.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.dossiers.map((dossier) => (
                        <Link
                          key={dossier.id}
                          href={`/dossier/${dossier.id}`}
                          className="group block"
                        >
                          <article className="h-full border border-border bg-card hover:border-gold/50 transition-all p-6">
                            <div className="flex items-center gap-2 mb-3">
                              <span className="px-2 py-0.5 bg-gold text-primary text-xs font-medium">
                                {dossier.statusAr}
                              </span>
                              <span className="text-xs text-muted-foreground">
                                {dossier.articlesCount} مقالات
                              </span>
                            </div>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                              {dossier.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2">
                              {dossier.description}
                            </p>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Investigations */}
              {(contentType === "all" || contentType === "investigations") &&
                searchResults.investigations.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      تحقيقات
                      <span className="text-sm font-normal text-muted-foreground">
                        ({searchResults.investigations.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.investigations.map((investigation) => (
                        <Link
                          key={investigation.id}
                          href={`/investigation/${investigation.id}`}
                          className="group block"
                        >
                          <article className="h-full border border-border bg-card hover:border-gold/50 transition-all p-6">
                            <span className="inline-block px-2 py-0.5 bg-gold text-primary text-xs font-medium mb-3">
                              تحقيق استقصائي
                            </span>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                              {investigation.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {investigation.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{investigation.duration}</span>
                              <span>{investigation.sources} مصادر</span>
                              <span>{investigation.documents} وثيقة</span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

              {/* Power Maps */}
              {(contentType === "all" || contentType === "power-maps") &&
                searchResults.powerMaps.length > 0 && (
                  <div>
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                      خرائط القوى
                      <span className="text-sm font-normal text-muted-foreground">
                        ({searchResults.powerMaps.length})
                      </span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {searchResults.powerMaps.map((powerMap) => (
                        <Link
                          key={powerMap.id}
                          href={`/power-map/${powerMap.id}`}
                          className="group block"
                        >
                          <article className="h-full border border-border bg-card hover:border-gold/50 transition-all p-6">
                            <span className="inline-block px-2 py-0.5 bg-gold/10 text-gold text-xs font-medium mb-3">
                              خريطة تفاعلية
                            </span>
                            <h3 className="font-bold text-lg mb-2 group-hover:text-gold transition-colors">
                              {powerMap.title}
                            </h3>
                            <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                              {powerMap.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                              <span>{powerMap.entities} كيان</span>
                              <span>{powerMap.connections} علاقة</span>
                            </div>
                          </article>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
