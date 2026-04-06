import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowLeft, Clock, Info, Users, Link2, FileText } from "lucide-react"
import { powerMaps, getPowerMapById } from "@/lib/data"

export async function generateStaticParams() {
  return powerMaps.map((pm) => ({ id: pm.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const powerMap = getPowerMapById(id)
  if (!powerMap) return { title: "غير موجود" }
  
  return {
    title: `${powerMap.title} | خرائط القوى`,
    description: powerMap.description,
  }
}

export default async function PowerMapDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const powerMap = getPowerMapById(id)
  
  if (!powerMap) {
    notFound()
  }

  // Define node colors by type
  const nodeColors: Record<string, string> = {
    country: "#C9A84C",
    organization: "#3B82F6",
    company: "#10B981",
    person: "#8B5CF6",
  }

  const edgeColors: Record<string, string> = {
    alliance: "#10B981",
    economic: "#3B82F6",
    conflict: "#EF4444",
    influence: "#F59E0B",
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
            <Link href="/power-maps" className="hover:text-gold transition-colors">
              خرائط القوى
            </Link>
            <span>/</span>
            <span className="text-gold">{powerMap.title}</span>
          </nav>

          <h1 className="text-2xl lg:text-4xl font-bold mb-4">{powerMap.title}</h1>
          <p className="text-lg text-primary-foreground/80 max-w-3xl mb-6">
            {powerMap.description}
          </p>

          <div className="flex flex-wrap items-center gap-6 text-sm text-primary-foreground/60">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span>{powerMap.entities} كيان</span>
            </div>
            <div className="flex items-center gap-2">
              <Link2 className="w-4 h-4" />
              <span>{powerMap.connections} علاقة</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>آخر تحديث: {powerMap.lastUpdated}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Methodology */}
      <section className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-start gap-3 p-4 bg-muted">
            <FileText className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="font-semibold text-sm mb-1">المنهجية</h2>
              <p className="text-sm text-muted-foreground">
                {powerMap.methodology}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Map Area */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {/* Legend */}
          <div className="mb-8 p-4 bg-muted border border-border">
            <h3 className="font-semibold mb-4">دليل الخريطة</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">أنواع الكيانات</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors.country }} />
                    <span className="text-sm">دول</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors.organization }} />
                    <span className="text-sm">مؤسسات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors.company }} />
                    <span className="text-sm">شركات</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: nodeColors.person }} />
                    <span className="text-sm">أشخاص</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">أنواع العلاقات</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.5" style={{ backgroundColor: edgeColors.alliance }} />
                    <span className="text-sm">تحالف</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.5" style={{ backgroundColor: edgeColors.economic }} />
                    <span className="text-sm">اقتصادي</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.5" style={{ backgroundColor: edgeColors.conflict }} />
                    <span className="text-sm">صراع</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-0.5" style={{ backgroundColor: edgeColors.influence }} />
                    <span className="text-sm">نفوذ</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map Visualization */}
          <div className="aspect-[16/9] bg-primary/5 border border-border relative overflow-hidden">
            {/* SVG Network Visualization */}
            <svg className="w-full h-full" viewBox="0 0 800 450">
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-muted/20" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />

              {/* Render edges */}
              {powerMap.edges.map((edge, idx) => {
                const sourceNode = powerMap.nodes.find((n) => n.id === edge.source)
                const targetNode = powerMap.nodes.find((n) => n.id === edge.target)
                if (!sourceNode || !targetNode) return null

                // Calculate positions based on index
                const sourceIdx = powerMap.nodes.findIndex((n) => n.id === edge.source)
                const targetIdx = powerMap.nodes.findIndex((n) => n.id === edge.target)
                const angleSource = (sourceIdx * 360) / powerMap.nodes.length
                const angleTarget = (targetIdx * 360) / powerMap.nodes.length
                const radius = 150
                const centerX = 400
                const centerY = 225
                
                const x1 = centerX + radius * Math.cos((angleSource * Math.PI) / 180)
                const y1 = centerY + radius * Math.sin((angleSource * Math.PI) / 180)
                const x2 = centerX + radius * Math.cos((angleTarget * Math.PI) / 180)
                const y2 = centerY + radius * Math.sin((angleTarget * Math.PI) / 180)

                return (
                  <g key={idx}>
                    <line
                      x1={x1}
                      y1={y1}
                      x2={x2}
                      y2={y2}
                      stroke={edgeColors[edge.type]}
                      strokeWidth={edge.strength ? edge.strength / 3 : 2}
                      opacity={0.6}
                    />
                    {edge.label && (
                      <text
                        x={(x1 + x2) / 2}
                        y={(y1 + y2) / 2}
                        fontSize="10"
                        fill="currentColor"
                        className="text-muted-foreground"
                        textAnchor="middle"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                )
              })}

              {/* Render nodes */}
              {powerMap.nodes.map((node, idx) => {
                const angle = (idx * 360) / powerMap.nodes.length
                const radius = 150
                const centerX = 400
                const centerY = 225
                const x = centerX + radius * Math.cos((angle * Math.PI) / 180)
                const y = centerY + radius * Math.sin((angle * Math.PI) / 180)

                return (
                  <g key={node.id} className="cursor-pointer">
                    <circle
                      cx={x}
                      cy={y}
                      r={20}
                      fill={nodeColors[node.type]}
                      opacity={0.9}
                    />
                    <text
                      x={x}
                      y={y + 35}
                      fontSize="12"
                      fill="currentColor"
                      textAnchor="middle"
                      className="font-medium"
                    >
                      {node.label}
                    </text>
                  </g>
                )
              })}

              {/* Center label */}
              <text
                x="400"
                y="225"
                fontSize="14"
                fill="currentColor"
                textAnchor="middle"
                className="font-bold text-muted-foreground"
              >
                {powerMap.title}
              </text>
            </svg>

            {/* Info overlay */}
            {powerMap.nodes.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Info className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">هذه الخريطة قيد التطوير</p>
                  <p className="text-sm text-muted-foreground/70">سيتم إضافة البيانات قريباً</p>
                </div>
              </div>
            )}
          </div>

          {/* Entities List */}
          {powerMap.nodes.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">الكيانات في هذه الخريطة</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {powerMap.nodes.map((node) => (
                  <div
                    key={node.id}
                    className="p-4 bg-muted border border-border hover:border-gold/50 transition-colors"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: nodeColors[node.type] }}
                      />
                      <span className="font-semibold">{node.label}</span>
                    </div>
                    {node.description && (
                      <p className="text-sm text-muted-foreground">{node.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Relationships List */}
          {powerMap.edges.length > 0 && (
            <div className="mt-8">
              <h3 className="font-bold text-lg mb-4">العلاقات الرئيسية</h3>
              <div className="space-y-2">
                {powerMap.edges.map((edge, idx) => {
                  const sourceNode = powerMap.nodes.find((n) => n.id === edge.source)
                  const targetNode = powerMap.nodes.find((n) => n.id === edge.target)
                  if (!sourceNode || !targetNode) return null

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-3 bg-muted/50 border border-border"
                    >
                      <span className="font-medium">{sourceNode.label}</span>
                      <div className="flex items-center gap-2 flex-1">
                        <span
                          className="flex-1 h-0.5"
                          style={{ backgroundColor: edgeColors[edge.type] }}
                        />
                        <span className="text-xs px-2 py-1 bg-background border border-border">
                          {edge.label || edge.type}
                        </span>
                        <span
                          className="flex-1 h-0.5"
                          style={{ backgroundColor: edgeColors[edge.type] }}
                        />
                      </div>
                      <span className="font-medium">{targetNode.label}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Navigation */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <Link
            href="/power-maps"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            العودة إلى خرائط القوى
          </Link>
        </div>
      </div>
    </div>
  )
}
