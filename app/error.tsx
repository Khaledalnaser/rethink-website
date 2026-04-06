"use client"

import { useEffect } from "react"
import Link from "next/link"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="min-h-[80vh] bg-background flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/20 flex items-center justify-center mx-auto mb-6">
            <AlertTriangle className="w-10 h-10 text-red-600 dark:text-red-400" />
          </div>
          
          {/* Message */}
          <h1 className="text-2xl lg:text-3xl font-bold mb-4">
            حدث خطأ غير متوقع
          </h1>
          <p className="text-muted-foreground mb-8">
            نعتذر عن هذا الخلل. فريقنا التقني تم إعلامه وسيعمل على إصلاحه. 
            يمكنك محاولة تحديث الصفحة أو العودة للرئيسية.
          </p>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={reset}
              className="flex items-center gap-2 px-6 py-3 bg-gold text-primary font-medium hover:bg-gold/90 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              إعادة المحاولة
            </button>
            <Link
              href="/"
              className="flex items-center gap-2 px-6 py-3 bg-muted text-foreground font-medium hover:bg-muted/80 transition-colors border border-border"
            >
              <Home className="w-5 h-5" />
              العودة للرئيسية
            </Link>
          </div>

          {/* Error Details (Development Only) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mt-8 p-4 bg-muted border border-border text-right">
              <p className="text-xs text-muted-foreground font-mono">
                {error.message}
              </p>
              {error.digest && (
                <p className="text-xs text-muted-foreground/50 font-mono mt-2">
                  Digest: {error.digest}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
