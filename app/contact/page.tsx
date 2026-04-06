"use client"

import { useState } from "react"
import type { Metadata } from "next"
import { Mail, Shield, Send, CheckCircle, AlertCircle } from "lucide-react"

export default function ContactPage() {
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    anonymous: false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormState("submitting")
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    // In production, this would send to an API
    setFormState("success")
    setFormData({ name: "", email: "", subject: "", message: "", anonymous: false })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">تواصل معنا</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl">
            نرحب بتواصلكم معنا للاستفسارات أو المقترحات أو لمشاركة معلومات
            تتعلق بتحقيقاتنا. نلتزم بحماية هوية مصادرنا.
          </p>
        </div>
      </header>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-muted p-8 border border-border">
                <h2 className="text-xl font-bold mb-6">أرسل رسالتك</h2>

                {formState === "success" ? (
                  <div className="text-center py-12">
                    <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">تم إرسال رسالتك بنجاح</h3>
                    <p className="text-muted-foreground mb-6">
                      سنقوم بالرد عليك في أقرب وقت ممكن
                    </p>
                    <button
                      onClick={() => setFormState("idle")}
                      className="px-6 py-3 bg-gold text-primary font-medium hover:bg-gold/90 transition-colors"
                    >
                      إرسال رسالة أخرى
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          الاسم {!formData.anonymous && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          disabled={formData.anonymous}
                          required={!formData.anonymous}
                          className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none disabled:opacity-50"
                          placeholder="اسمك الكامل"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          البريد الإلكتروني {!formData.anonymous && <span className="text-red-500">*</span>}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          disabled={formData.anonymous}
                          required={!formData.anonymous}
                          className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none disabled:opacity-50"
                          placeholder="example@email.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الموضوع <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                        className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none"
                      >
                        <option value="">اختر موضوع الرسالة</option>
                        <option value="general">استفسار عام</option>
                        <option value="tip">معلومات لتحقيق</option>
                        <option value="correction">طلب تصحيح</option>
                        <option value="partnership">شراكة أو تعاون</option>
                        <option value="press">استفسار صحفي</option>
                        <option value="other">أخرى</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">
                        الرسالة <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                        rows={6}
                        className="w-full px-4 py-3 bg-background border border-border focus:border-gold focus:outline-none resize-none"
                        placeholder="اكتب رسالتك هنا..."
                      />
                    </div>

                    {/* Anonymous Option */}
                    <div className="flex items-start gap-3 p-4 bg-background border border-border">
                      <input
                        type="checkbox"
                        id="anonymous"
                        checked={formData.anonymous}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            anonymous: e.target.checked,
                            name: e.target.checked ? "" : formData.name,
                            email: e.target.checked ? "" : formData.email,
                          })
                        }
                        className="mt-1"
                      />
                      <div>
                        <label htmlFor="anonymous" className="font-medium cursor-pointer">
                          أريد البقاء مجهول الهوية
                        </label>
                        <p className="text-sm text-muted-foreground mt-1">
                          إذا كنت ترغب في مشاركة معلومات حساسة دون الكشف عن هويتك،
                          فعّل هذا الخيار. لن نتمكن من الرد عليك مباشرة.
                        </p>
                      </div>
                    </div>

                    {formState === "error" && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 text-red-700 border border-red-200">
                        <AlertCircle className="w-5 h-5" />
                        <span>حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة مرة أخرى.</span>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full py-4 bg-gold text-primary font-bold hover:bg-gold/90 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {formState === "submitting" ? (
                        <>
                          <span className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          إرسال الرسالة
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <aside className="lg:col-span-1">
              <div className="space-y-6">
                {/* Secure Communication */}
                <div className="bg-primary text-primary-foreground p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-6 h-6 text-gold" />
                    <h3 className="font-bold">تواصل آمن</h3>
                  </div>
                  <p className="text-sm text-primary-foreground/80 mb-4">
                    نحن ملتزمون بحماية هوية مصادرنا. إذا كانت لديك معلومات
                    حساسة، يمكنك التواصل معنا عبر القنوات الآمنة التالية:
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      Signal: @rethink_tips
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                      ProtonMail: tips@rethink.media
                    </li>
                  </ul>
                </div>

                {/* Email Contact */}
                <div className="bg-muted p-6 border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-6 h-6 text-gold" />
                    <h3 className="font-bold">البريد الإلكتروني</h3>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">للاستفسارات العامة</p>
                      <a href="mailto:info@rethink.media" className="text-gold hover:underline">
                        info@rethink.media
                      </a>
                    </div>
                    <div>
                      <p className="text-muted-foreground">للاستفسارات الصحفية</p>
                      <a href="mailto:press@rethink.media" className="text-gold hover:underline">
                        press@rethink.media
                      </a>
                    </div>
                    <div>
                      <p className="text-muted-foreground">للتصحيحات</p>
                      <a href="mailto:corrections@rethink.media" className="text-gold hover:underline">
                        corrections@rethink.media
                      </a>
                    </div>
                  </div>
                </div>

                {/* Response Time */}
                <div className="bg-muted p-6 border border-border">
                  <h3 className="font-bold mb-3">وقت الرد المتوقع</h3>
                  <p className="text-sm text-muted-foreground">
                    نسعى للرد على جميع الرسائل خلال ٤٨ ساعة عمل. الرسائل
                    المتعلقة بمعلومات لتحقيقات جارية تحظى بالأولوية.
                  </p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
