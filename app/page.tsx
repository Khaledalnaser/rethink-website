import { HeroSection } from "@/components/home/hero-section"
import { LatestStories } from "@/components/home/latest-stories"
import { FeaturedDossiers } from "@/components/home/featured-dossiers"
import { InvestigationsSection } from "@/components/home/investigations-section"
import { MostReadSection } from "@/components/home/most-read-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { PowerMapsSection } from "@/components/home/power-maps-section"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LatestStories />
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <FeaturedDossiers />
            <InvestigationsSection />
          </div>
          <aside className="lg:col-span-1">
            <MostReadSection />
            <NewsletterSection />
          </aside>
        </div>
      </div>
      <PowerMapsSection />
    </div>
  )
}
