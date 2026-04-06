import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Number */}
          <div className="text-[150px] lg:text-[200px] font-bold leading-none text-muted/20 select-none">
            ٤٠٤
          </div>
          
          {/* Message */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-4 -mt-8">
            الصفحة غير موجودة
          </h1>
          <p className="text-muted-foreground mb-8">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها. 
            تأكد من صحة الرابط أو استخدم البحث للعثور على ما تبحث عنه.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-gold text-primary font-medium hover:bg-gold/90 transition-colors"
            >
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </Link>
            <Link
              href="/search"
              className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors border border-border"
            >
              <Search className="w-5 h-5" />
              البحث في الموقع
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mt-12 pt-8 border-t border-border">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              صفحات قد تهمك
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/stories"
                className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                أحدث القصص
              </Link>
              <Link
                href="/investigations"
                className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                التحقيقات
              </Link>
              <Link
                href="/dossiers"
                className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                الملفات
              </Link>
              <Link
                href="/about"
                className="text-sm text-muted-foreground hover:text-gold transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-3 h-3" />
                من نحن
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
