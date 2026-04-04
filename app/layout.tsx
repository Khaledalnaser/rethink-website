import type { Metadata, Viewport } from "next"
import { IBM_Plex_Sans_Arabic } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "أعد التفكير | ReThink - صحافة تحليلية معمّقة",
    template: "%s | أعد التفكير",
  },
  description:
    "منصة صحفية تحليلية تقدم تغطية معمّقة للأحداث والقضايا في المنطقة العربية. تحقيقات استقصائية، ملفات بحثية، وخرائط قوى.",
  keywords: [
    "صحافة تحليلية",
    "تحقيقات استقصائية",
    "الشرق الأوسط",
    "العالم العربي",
    "ملفات",
    "خرائط قوى",
    "أعد التفكير",
    "ReThink",
  ],
  authors: [{ name: "أعد التفكير | ReThink" }],
  creator: "أعد التفكير | ReThink",
  publisher: "أعد التفكير | ReThink",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "ar_AR",
    url: "https://rethink.media",
    siteName: "أعد التفكير | ReThink",
    title: "أعد التفكير | ReThink - صحافة تحليلية معمّقة",
    description:
      "منصة صحفية تحليلية تقدم تغطية معمّقة للأحداث والقضايا في المنطقة العربية",
  },
  twitter: {
    card: "summary_large_image",
    title: "أعد التفكير | ReThink",
    description: "صحافة تحليلية معمّقة",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F5F4F0" },
    { media: "(prefers-color-scheme: dark)", color: "#0D0D0D" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl" className={ibmPlexArabic.variable}>
      <body className="font-sans antialiased min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
