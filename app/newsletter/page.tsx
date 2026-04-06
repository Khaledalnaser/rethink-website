"use client"

import { useState } from "react"
import { Mail, CheckCircle, Newspaper, FileText, Search, Map } from "lucide-react"

export default function NewsletterPage() {
  const [email, setEmail] = useState("")
  const [preferences, setPreferences] = useState({
    weekly: true,
    investigations: true,
    dossiers: false,
    powerMaps: false,
  })
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    
    // Simulate subscription
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setFormState("success")
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="w-16 h-16 bg-gold flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl lg:text-5xl font-bold mb-4">
              ابقَ على اطلاع
            </h1>
            <p className="text-lg lg:text-xl text-primary-foreground/80">
              اشترك في نشرتنا البريدية لتصلك أحدث التحليلات والتحقيقات
              مباشرة إلى بريدك الإلكتروني
            </p>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            {formState === "success" ? (
              <div className="text-center py-12 bg-muted border border-border">
                <CheckCircle className="w-20 h-20 text-green-600 mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">شكراً لاشتراكك</h2>
                <p className="text-muted-foreground mb-2">
                  تم تسجيل بريدك الإلكتروني بنجاح
                </p>
                <p className="text-muted-foreground text-sm">
                  ستصلك رسالة تأكيد على {email}
                </p>
              </div>
            ) : (
              <>
                {/* Subscription Form */}
                <div className="bg-muted p-8 border border-border mb-8">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        البريد الإلكتروني
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full px-4 py-4 bg-background border border-border focus:border-gold focus:outline-none text-lg"
                        placeholder="example@email.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-4">
                        اختر ما يهمك
                      </label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <label className="flex items-start gap-3 p-4 bg-background border border-border hover:border-gold/50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={preferences.weekly}
                            onChange={(e) =>
                              setPreferences({ ...preferences, weekly: e.target.checked })
                            }
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2 font-medium">
                              <Newspaper className="w-4 h-4 text-gold" />
                              النشرة الأسبوعية
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              ملخص أسبوعي لأهم ما نشرناه
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 bg-background border border-border hover:border-gold/50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={preferences.investigations}
                            onChange={(e) =>
                              setPreferences({ ...preferences, investigations: e.target.checked })
                            }
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2 font-medium">
                              <Search className="w-4 h-4 text-gold" />
                              التحقيقات الجديدة
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              تنبيه فوري عند نشر تحقيق جديد
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 bg-background border border-border hover:border-gold/50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={preferences.dossiers}
                            onChange={(e) =>
                              setPreferences({ ...preferences, dossiers: e.target.checked })
                            }
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2 font-medium">
                              <FileText className="w-4 h-4 text-gold" />
                              تحديثات الملفات
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              إضافات جديدة للملفات التي تتابعها
                            </p>
                          </div>
                        </label>

                        <label className="flex items-start gap-3 p-4 bg-background border border-border hover:border-gold/50 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={preferences.powerMaps}
                            onChange={(e) =>
                              setPreferences({ ...preferences, powerMaps: e.target.checked })
                            }
                            className="mt-1"
                          />
                          <div>
                            <div className="flex items-center gap-2 font-medium">
                              <Map className="w-4 h-4 text-gold" />
                              خرائط القوى
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              تحديثات على الخرائط التفاعلية
                            </p>
                          </div>
                        </label>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full py-4 bg-gold text-primary font-bold text-lg hover:bg-gold/90 transition-colors disabled:opacity-50"
                    >
                      {formState === "submitting" ? (
                        <span className="flex items-center justify-center gap-2">
                          <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          جاري الاشتراك...
                        </span>
                      ) : (
                        "اشترك الآن"
                      )}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      بالاشتراك، أنت توافق على{" "}
                      <a href="/privacy" className="text-gold hover:underline">
                        سياسة الخصوصية
                      </a>{" "}
                      الخاصة بنا. يمكنك إلغاء الاشتراك في أي وقت.
                    </p>
                  </form>
                </div>

                {/* What You'll Get */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-6 bg-muted border border-border">
                    <div className="text-3xl font-bold text-gold mb-2">+١٠</div>
                    <p className="text-sm text-muted-foreground">
                      مقالات وتحليلات شهرياً
                    </p>
                  </div>
                  <div className="text-center p-6 bg-muted border border-border">
                    <div className="text-3xl font-bold text-gold mb-2">٢-٣</div>
                    <p className="text-sm text-muted-foreground">
                      تحقيقات استقصائية شهرياً
                    </p>
                  </div>
                  <div className="text-center p-6 bg-muted border border-border">
                    <div className="text-3xl font-bold text-gold mb-2">٠</div>
                    <p className="text-sm text-muted-foreground">
                      رسائل ترويجية أو إعلانات
                    </p>
                  </div>
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-6 bg-primary text-primary-foreground">
                  <blockquote className="text-lg mb-4">
                    &quot;أعد التفكير يقدم تحليلات عميقة ومختلفة عما نجده في الإعلام التقليدي. 
                    النشرة الأسبوعية أصبحت جزءاً أساسياً من متابعتي للشأن الإقليمي.&quot;
                  </blockquote>
                  <cite className="text-sm text-primary-foreground/70">
                    — باحث في الشؤون الإقليمية
                  </cite>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
