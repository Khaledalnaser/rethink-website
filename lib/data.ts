// Centralized data layer for ReThink website
// In production, this would be replaced with database queries

export type ArticleCategory = "analysis" | "investigation" | "dossier" | "power-map" | "opinion" | "report"

export interface Author {
  id: string
  name: string
  bio: string
  avatar?: string
}

export interface Source {
  type: string
  items: string[]
}

export interface Article {
  id: string
  slug: string
  title: string
  subtitle: string
  excerpt: string
  content: string
  category: ArticleCategory
  categoryAr: string
  author: Author
  publishedAt: string
  updatedAt?: string
  readTime: string
  image?: string
  coreQuestion?: string
  analyticalModel?: string
  uncertainties?: string[]
  sources?: Source[]
  tags: string[]
  featured?: boolean
  views?: number
}

export interface Dossier {
  id: string
  slug: string
  title: string
  description: string
  status: "ongoing" | "completed" | "updating"
  statusAr: string
  articlesCount: number
  lastUpdated: string
  image?: string
  articles: string[] // Article IDs
}

export interface Investigation {
  id: string
  slug: string
  title: string
  description: string
  duration: string
  sources: number
  documents: number
  publishedAt: string
  image?: string
  articleId: string // Main article ID
}

export interface PowerMap {
  id: string
  slug: string
  title: string
  description: string
  lastUpdated: string
  entities: number
  connections: number
  methodology: string
  nodes: PowerMapNode[]
  edges: PowerMapEdge[]
}

export interface PowerMapNode {
  id: string
  label: string
  type: "country" | "organization" | "person" | "company"
  description?: string
  x?: number
  y?: number
}

export interface PowerMapEdge {
  source: string
  target: string
  type: "alliance" | "economic" | "conflict" | "influence"
  label?: string
  strength?: number
}

// Authors
export const authors: Record<string, Author> = {
  editorial: {
    id: "editorial",
    name: "فريق التحرير",
    bio: "فريق التحرير في أعد التفكير متخصص في التحليل السياسي والاستراتيجي للشؤون العربية والإقليمية",
  },
  ahmad: {
    id: "ahmad",
    name: "أحمد المنصور",
    bio: "صحفي استقصائي متخصص في الشؤون الاقتصادية والمالية، عمل سابقاً في عدة مؤسسات إعلامية عربية كبرى",
  },
  sara: {
    id: "sara",
    name: "سارة الخطيب",
    bio: "باحثة في العلاقات الدولية والسياسة الخارجية، حاصلة على درجة الدكتوراه من جامعة أكسفورد",
  },
  omar: {
    id: "omar",
    name: "عمر البكري",
    bio: "محلل سياسي ومتخصص في شؤون الخليج العربي، له العديد من المؤلفات والدراسات المنشورة",
  },
  layla: {
    id: "layla",
    name: "ليلى حسن",
    bio: "صحفية متخصصة في الشأن الأمني والعسكري، لها خبرة واسعة في تغطية مناطق النزاع",
  },
}

// Articles
export const articles: Article[] = [
  {
    id: "1",
    slug: "regional-power-shift-2026",
    title: "إعادة رسم خريطة النفوذ: كيف تتغير موازين القوى في المنطقة؟",
    subtitle: "تحليل معمّق لتحولات التحالفات الإقليمية وتأثيرها على مستقبل الشرق الأوسط",
    excerpt: "تحليل معمّق لتحولات التحالفات الإقليمية وتأثيرها على مستقبل الشرق الأوسط في ضوء المتغيرات الجيوسياسية الأخيرة",
    category: "analysis",
    categoryAr: "تحليل",
    author: authors.editorial,
    publishedAt: "٢ أبريل ٢٠٢٦",
    updatedAt: "٣ أبريل ٢٠٢٦",
    readTime: "١٢ دقيقة",
    coreQuestion: "كيف تؤثر التحولات الجيوسياسية الأخيرة على توازن القوى في المنطقة العربية، وما السيناريوهات المحتملة للمستقبل القريب؟",
    analyticalModel: "نعتمد في هذا التحليل على إطار تحليل التحالفات متعدد الأبعاد، الذي يأخذ بعين الاعتبار العوامل الاقتصادية والأمنية والأيديولوجية في تشكيل العلاقات بين الدول.",
    uncertainties: [
      "تغيرات جذرية في أسعار النفط قد تعيد ترتيب الأولويات الاقتصادية",
      "تحولات في السياسة الأمريكية تجاه المنطقة بعد الانتخابات المقبلة",
      "تصاعد أو تراجع حدة الصراعات الإقليمية الجارية",
      "اتفاقيات سلام أو تطبيع جديدة غير متوقعة",
    ],
    sources: [
      { type: "وثائق رسمية", items: ["تقارير وزارات الخارجية للدول المعنية", "بيانات القمم العربية ٢٠٢٤-٢٠٢٦"] },
      { type: "مقابلات", items: ["٣ دبلوماسيين سابقين", "باحثان في مراكز دراسات إقليمية"] },
      { type: "دراسات وأبحاث", items: ["تقارير مركز كارنيغي للشرق الأوسط", "دراسات معهد بروكينغز الدوحة"] },
    ],
    tags: ["جيوسياسة", "تحالفات", "الشرق الأوسط", "السياسة الخارجية"],
    featured: true,
    views: 15420,
    content: `
      <p class="lead">تشهد المنطقة العربية تحولات جيوسياسية متسارعة تعيد رسم خريطة التحالفات والنفوذ، في ظل تراجع الهيمنة الأمريكية التقليدية وصعود فاعلين إقليميين ودوليين جدد.</p>

      <h2>المشهد الراهن: تحولات بنيوية</h2>
      <p>لم تعد الخريطة الجيوسياسية للمنطقة العربية كما كانت قبل عقد من الزمن. فقد أدت مجموعة من التطورات المتشابكة إلى إعادة ترتيب الأولويات والتحالفات بشكل جذري.</p>
      
      <ul>
        <li>تراجع الاعتماد على النفط كمحرك رئيسي للعلاقات الدولية</li>
        <li>صعود الاقتصاد الرقمي وتنافس الدول على جذب الاستثمارات التقنية</li>
        <li>تنامي الدور الصيني والروسي في المنطقة</li>
        <li>إعادة تقييم العلاقات مع الدول الغربية التقليدية</li>
      </ul>

      <h2>محاور التنافس الجديدة</h2>
      <p>تتبلور ثلاثة محاور رئيسية للتنافس الإقليمي، يتقاطع بعضها ويتصادم بعضها الآخر:</p>

      <h3>المحور الأول: التنافس على القيادة الإقليمية</h3>
      <p>تتسابق عدة دول على تعزيز نفوذها الإقليمي من خلال المبادرات الاقتصادية والدبلوماسية. وتبرز في هذا السياق جهود التنويع الاقتصادي والانفتاح على أسواق جديدة.</p>

      <blockquote>
        "نحن أمام لحظة تاريخية تتطلب إعادة تعريف المصالح والأولويات. لم يعد بالإمكان الاعتماد على الأنماط القديمة في إدارة العلاقات الدولية."
        <cite>— دبلوماسي عربي سابق</cite>
      </blockquote>

      <h2>الخلاصة</h2>
      <p>تمر المنطقة العربية بمرحلة انتقالية حاسمة ستحدد ملامح النظام الإقليمي للعقود القادمة. وبينما تحمل هذه المرحلة مخاطر جدية، فإنها تفتح أيضاً فرصاً لإعادة بناء العلاقات على أسس أكثر توازناً وفاعلية.</p>
    `,
  },
  {
    id: "2",
    slug: "arab-economies-global-challenges",
    title: "الاقتصادات العربية في مواجهة التحديات العالمية",
    subtitle: "دراسة تحليلية لاستراتيجيات التكيف والتحول الاقتصادي",
    excerpt: "كيف تتعامل الدول العربية مع التحولات الاقتصادية العالمية وما استراتيجيات التكيف المتبعة؟",
    category: "dossier",
    categoryAr: "ملفات",
    author: authors.ahmad,
    publishedAt: "١ أبريل ٢٠٢٦",
    readTime: "١٥ دقيقة",
    coreQuestion: "كيف يمكن للاقتصادات العربية تحقيق النمو المستدام في ظل التقلبات العالمية والتحول نحو الاقتصاد الأخضر؟",
    analyticalModel: "نستخدم إطار التحليل الاقتصادي المقارن مع التركيز على مؤشرات التنويع الاقتصادي ومرونة الأسواق.",
    uncertainties: [
      "تقلبات أسعار الطاقة العالمية",
      "وتيرة التحول نحو الطاقة المتجددة عالمياً",
      "تأثير السياسات النقدية للبنوك المركزية الكبرى",
    ],
    sources: [
      { type: "تقارير اقتصادية", items: ["صندوق النقد الدولي", "البنك الدولي", "صندوق النقد العربي"] },
      { type: "بيانات رسمية", items: ["وزارات المالية والاقتصاد", "البنوك المركزية العربية"] },
    ],
    tags: ["اقتصاد", "تنويع", "طاقة", "استثمار"],
    views: 8930,
    content: `
      <p class="lead">تواجه الاقتصادات العربية تحديات غير مسبوقة تتطلب إعادة النظر في النماذج التنموية التقليدية.</p>

      <h2>التحديات الراهنة</h2>
      <p>تتنوع التحديات بين هيكلية ودورية، لكنها تتقاطع جميعها في ضرورة التحول نحو نماذج أكثر استدامة ومرونة.</p>

      <h2>استراتيجيات التكيف</h2>
      <p>تتبنى الدول العربية مجموعة متنوعة من السياسات للتكيف مع المتغيرات العالمية، تتراوح بين التنويع الاقتصادي وتطوير رأس المال البشري.</p>

      <h2>آفاق المستقبل</h2>
      <p>رغم التحديات، تظهر مؤشرات إيجابية على قدرة بعض الاقتصادات العربية على التحول والتكيف بنجاح.</p>
    `,
  },
  {
    id: "3",
    slug: "hidden-financing-networks",
    title: "شبكات التمويل الخفية وتأثيرها على القرار السياسي",
    subtitle: "تحقيق استقصائي يكشف خيوط المال والنفوذ",
    excerpt: "تحقيق موسع يتتبع شبكات التمويل غير المعلنة وتأثيرها على صناعة القرار في المنطقة",
    category: "investigation",
    categoryAr: "تحقيقات",
    author: authors.layla,
    publishedAt: "٣١ مارس ٢٠٢٦",
    readTime: "٢٠ دقيقة",
    coreQuestion: "كيف تؤثر شبكات التمويل غير الرسمية على القرارات السياسية في المنطقة العربية؟",
    analyticalModel: "تتبع المال - منهجية تحليل الشبكات المالية وتقاطعاتها مع مراكز صنع القرار",
    uncertainties: [
      "صعوبة التحقق من بعض المعلومات بسبب السرية",
      "تغير الشبكات والتحالفات باستمرار",
      "احتمال وجود قنوات تمويل لم يتم رصدها",
    ],
    sources: [
      { type: "وثائق مسربة", items: ["تقارير مالية داخلية", "مراسلات إلكترونية"] },
      { type: "مقابلات سرية", items: ["٧ مصادر من داخل المؤسسات المعنية"] },
      { type: "سجلات عامة", items: ["سجلات الشركات", "قواعد بيانات العقوبات الدولية"] },
    ],
    tags: ["تحقيقات", "تمويل", "فساد", "شفافية"],
    views: 22150,
    content: `
      <p class="lead">في غرف مغلقة بعيداً عن أعين الرقابة، تُنسج خيوط من المال والنفوذ تشكل ملامح القرارات السياسية الكبرى.</p>

      <h2>البداية: خيط في متاهة</h2>
      <p>بدأ التحقيق بمعلومة واحدة: تحويل مالي مشبوه بقيمة ٥٠ مليون دولار عبر سلسلة من الشركات الوهمية.</p>

      <h2>الشبكة: أكبر مما يبدو</h2>
      <p>كشف التتبع الدقيق للتحويلات عن شبكة معقدة تمتد عبر عدة دول ومؤسسات مالية.</p>

      <h2>التأثير: من المال إلى القرار</h2>
      <p>وثقنا عدة حالات واضحة لتأثير هذه الشبكات على قرارات سياسية واقتصادية كبرى.</p>

      <h2>ردود الفعل</h2>
      <p>تواصلنا مع جميع الأطراف المذكورة في التحقيق. بعضهم نفى، وبعضهم رفض التعليق، وبعضهم لم يرد على طلبات التواصل المتكررة.</p>
    `,
  },
  {
    id: "4",
    slug: "new-regional-actors",
    title: "الفاعلون الجدد في المشهد الإقليمي",
    subtitle: "خريطة تفاعلية للقوى الصاعدة ومناطق نفوذها",
    excerpt: "من هم اللاعبون الجدد في المنطقة وكيف يعيدون تشكيل موازين القوى؟",
    category: "power-map",
    categoryAr: "خرائط القوى",
    author: authors.sara,
    publishedAt: "٣٠ مارس ٢٠٢٦",
    readTime: "٨ دقائق",
    tags: ["خرائط القوى", "فاعلون إقليميون", "جيوسياسة"],
    views: 11200,
    content: `
      <p class="lead">يشهد المشهد الإقليمي صعود فاعلين جدد يعيدون تشكيل معادلات القوة التقليدية.</p>

      <h2>من هم الفاعلون الجدد؟</h2>
      <p>لم يعد المشهد الإقليمي حكراً على الدول التقليدية الكبرى. برزت قوى جديدة - دول وغير دول - تمتلك أدوات تأثير متنوعة.</p>

      <h2>أدوات التأثير</h2>
      <p>تتنوع أدوات هؤلاء الفاعلين بين القوة الناعمة والاقتصادية والعسكرية، مما يخلق ديناميكيات جديدة ومعقدة.</p>
    `,
  },
  {
    id: "5",
    slug: "digital-transformation-gulf",
    title: "التحول الرقمي في الخليج: فرص وتحديات",
    subtitle: "كيف تسعى دول الخليج لقيادة الثورة التقنية عربياً",
    excerpt: "استعراض لمشاريع التحول الرقمي الطموحة في دول الخليج العربي وفرص نجاحها",
    category: "analysis",
    categoryAr: "تحليل",
    author: authors.omar,
    publishedAt: "٢٨ مارس ٢٠٢٦",
    readTime: "١٠ دقائق",
    coreQuestion: "هل يمكن لدول الخليج أن تصبح مراكز تقنية عالمية؟",
    analyticalModel: "مقارنة مع تجارب التحول الرقمي الناجحة عالمياً (سنغافورة، إستونيا، الإمارات)",
    uncertainties: [
      "توفر الكوادر البشرية المؤهلة",
      "المنافسة العالمية الشديدة في القطاع التقني",
      "تحديات الأمن السيبراني",
    ],
    tags: ["تقنية", "تحول رقمي", "الخليج", "استثمار"],
    views: 7650,
    content: `
      <p class="lead">تضع دول الخليج العربي رهانات كبيرة على التحول الرقمي كركيزة أساسية لاقتصادات ما بعد النفط.</p>

      <h2>الرؤى والاستراتيجيات</h2>
      <p>تتضمن معظم الرؤى الوطنية الخليجية أهدافاً طموحة للتحول الرقمي والذكاء الاصطناعي.</p>

      <h2>المشاريع الكبرى</h2>
      <p>من نيوم إلى مشروع الخمسين، تتسابق دول الخليج في إطلاق مشاريع تقنية ضخمة.</p>

      <h2>التحديات</h2>
      <p>رغم الإمكانيات المالية الضخمة، تواجه هذه المشاريع تحديات جوهرية تتعلق بالموارد البشرية والبيئة التنافسية العالمية.</p>
    `,
  },
  {
    id: "6",
    slug: "water-crisis-mena",
    title: "أزمة المياه: التهديد الصامت للمنطقة العربية",
    subtitle: "تحقيق في أبعاد أزمة المياه وتداعياتها الأمنية والاقتصادية",
    excerpt: "كيف يهدد شح المياه استقرار المنطقة العربية وما الحلول الممكنة؟",
    category: "investigation",
    categoryAr: "تحقيقات",
    author: authors.ahmad,
    publishedAt: "٢٥ مارس ٢٠٢٦",
    readTime: "١٨ دقيقة",
    coreQuestion: "هل يمكن أن تكون المياه سبباً لصراعات إقليمية في المستقبل القريب؟",
    analyticalModel: "تحليل العلاقة بين الموارد المائية والاستقرار السياسي باستخدام بيانات تاريخية ونماذج استشرافية",
    uncertainties: [
      "تأثير التغير المناخي على معدلات هطول الأمطار",
      "نجاح أو فشل مشاريع تحلية المياه الكبرى",
      "إمكانية التوصل لاتفاقيات إقليمية لتقاسم الموارد المائية",
    ],
    sources: [
      { type: "دراسات علمية", items: ["تقارير الأمم المتحدة للمياه", "أبحاث معهد الموارد العالمية"] },
      { type: "بيانات حكومية", items: ["وزارات المياه في الدول المعنية", "هيئات الأرصاد الجوية"] },
      { type: "زيارات ميدانية", items: ["مناطق الجفاف في العراق", "حوض النيل"] },
    ],
    tags: ["مياه", "بيئة", "أمن غذائي", "تغير مناخي"],
    views: 13400,
    content: `
      <p class="lead">بينما تتصدر الصراعات المسلحة عناوين الأخبار، يتسلل تهديد أخطر بصمت: نفاد المياه.</p>

      <h2>الأرقام المفزعة</h2>
      <p>تقع ١٢ دولة عربية ضمن أكثر دول العالم شحاً بالمياه. بحلول ٢٠٣٠، قد يواجه أكثر من ٢٠٠ مليون عربي نقصاً حاداً في المياه.</p>

      <h2>خطوط التوتر</h2>
      <p>من نهر النيل إلى دجلة والفرات، تتصاعد التوترات حول تقاسم الموارد المائية العابرة للحدود.</p>

      <h2>الحلول الممكنة</h2>
      <p>بين تحلية المياه والزراعة الذكية وإعادة التدوير، تتعدد الخيارات لكنها تتطلب استثمارات ضخمة وإرادة سياسية.</p>
    `,
  },
  {
    id: "7",
    slug: "youth-unemployment-arab-world",
    title: "البطالة في العالم العربي: جيل ينتظر الفرصة",
    subtitle: "قراءة في أسباب ارتفاع معدلات البطالة بين الشباب العربي",
    excerpt: "لماذا يعاني الشباب العربي من أعلى معدلات البطالة عالمياً وما السبيل للخروج من هذا المأزق؟",
    category: "analysis",
    categoryAr: "تحليل",
    author: authors.sara,
    publishedAt: "٢٢ مارس ٢٠٢٦",
    readTime: "١٤ دقيقة",
    coreQuestion: "ما الأسباب الهيكلية لارتفاع بطالة الشباب العربي وكيف يمكن معالجتها؟",
    tags: ["شباب", "بطالة", "تعليم", "اقتصاد"],
    views: 9800,
    content: `
      <p class="lead">يمثل الشباب أكثر من ٦٠٪ من سكان المنطقة العربية، لكن نسبة كبيرة منهم تقف خارج سوق العمل.</p>

      <h2>الأرقام والحقائق</h2>
      <p>تتجاوز معدلات بطالة الشباب في بعض الدول العربية ٣٠٪، وهي من الأعلى عالمياً.</p>

      <h2>الأسباب الهيكلية</h2>
      <p>تتشابك عوامل متعددة: من عدم ملاءمة مخرجات التعليم لسوق العمل، إلى ضعف القطاع الخاص وتضخم القطاع العام.</p>

      <h2>تجارب ناجحة</h2>
      <p>رغم قتامة الصورة العامة، هناك تجارب محلية وإقليمية تستحق الدراسة والتعميم.</p>
    `,
  },
  {
    id: "8",
    slug: "arab-media-ownership",
    title: "من يملك الإعلام العربي؟",
    subtitle: "خريطة الملكية والتأثير في المشهد الإعلامي",
    excerpt: "تحقيق في بنية ملكية وسائل الإعلام العربية الكبرى وعلاقاتها بالسلطة",
    category: "investigation",
    categoryAr: "تحقيقات",
    author: authors.layla,
    publishedAt: "١٨ مارس ٢٠٢٦",
    readTime: "٢٢ دقيقة",
    coreQuestion: "كيف تؤثر بنية الملكية على المحتوى الإعلامي والخطاب العام؟",
    tags: ["إعلام", "ملكية", "حرية صحافة", "تأثير"],
    views: 18700,
    content: `
      <p class="lead">خلف كل قناة تلفزيونية وصحيفة ومنصة رقمية، ثمة مالك له مصالح وأجندة.</p>

      <h2>خريطة الملكية</h2>
      <p>تتوزع ملكية وسائل الإعلام العربية الكبرى بين حكومات ورجال أعمال مرتبطين بالسلطة ومستثمرين إقليميين.</p>

      <h2>أنماط التأثير</h2>
      <p>من الرقابة الذاتية إلى التوجيه المباشر، تتعدد آليات تأثير الملكية على المحتوى.</p>

      <h2>الإعلام البديل</h2>
      <p>هل يمكن للمنصات الرقمية المستقلة أن تكسر هذه الهيمنة؟</p>
    `,
  },
  {
    id: "9",
    slug: "iran-arab-relations-new-chapter",
    title: "العلاقات العربية الإيرانية: فصل جديد؟",
    subtitle: "قراءة في مؤشرات التقارب والتحديات الباقية",
    excerpt: "هل نشهد تحولاً حقيقياً في العلاقات العربية الإيرانية أم هدنة مؤقتة؟",
    category: "analysis",
    categoryAr: "تحليل",
    author: authors.omar,
    publishedAt: "١٥ مارس ٢٠٢٦",
    readTime: "١١ دقيقة",
    coreQuestion: "ما فرص نجاح مساعي التقارب العربي الإيراني وما العوائق المتبقية؟",
    analyticalModel: "تحليل مصفوفة المصالح المتبادلة والمتعارضة",
    uncertainties: [
      "مستقبل الملف النووي الإيراني",
      "تأثير التيارات المتشددة في كلا الجانبين",
      "الدور الأمريكي والضغوط الدولية",
    ],
    tags: ["إيران", "علاقات عربية", "خليج", "دبلوماسية"],
    views: 12500,
    content: `
      <p class="lead">بعد عقود من التوتر والقطيعة، تلوح في الأفق مؤشرات على إمكانية فتح صفحة جديدة.</p>

      <h2>محطات التقارب</h2>
      <p>من اتفاق بكين إلى تبادل السفراء، خطوات متتالية تشير إلى تحول في المزاج الإقليمي.</p>

      <h2>الملفات الشائكة</h2>
      <p>رغم التقارب، تظل ملفات عديدة عالقة: من اليمن إلى لبنان إلى العراق.</p>

      <h2>السيناريوهات</h2>
      <p>بين التطبيع الكامل والعودة للتوتر، تتعدد السيناريوهات المحتملة للعلاقة.</p>
    `,
  },
  {
    id: "10",
    slug: "ai-arab-world-opportunities",
    title: "الذكاء الاصطناعي والعالم العربي: فرصة تاريخية أم تهديد قادم؟",
    subtitle: "استشراف تأثير ثورة الذكاء الاصطناعي على الاقتصادات والمجتمعات العربية",
    excerpt: "كيف يمكن للمنطقة العربية الاستفادة من ثورة الذكاء الاصطناعي وتجنب مخاطرها؟",
    category: "analysis",
    categoryAr: "تحليل",
    author: authors.editorial,
    publishedAt: "١٠ مارس ٢٠٢٦",
    readTime: "١٣ دقيقة",
    coreQuestion: "هل المنطقة العربية مستعدة لموجة الذكاء الاصطناعي وما المطلوب للاستفادة منها؟",
    tags: ["ذكاء اصطناعي", "تقنية", "مستقبل", "وظائف"],
    views: 16800,
    content: `
      <p class="lead">بينما يعيد الذكاء الاصطناعي تشكيل الاقتصاد العالمي، تقف المنطقة العربية أمام خيارات مصيرية.</p>

      <h2>الفرص الهائلة</h2>
      <p>من تحسين الخدمات الحكومية إلى تطوير قطاعات جديدة، يفتح الذكاء الاصطناعي آفاقاً واسعة.</p>

      <h2>التحديات الجوهرية</h2>
      <p>نقص الكوادر المتخصصة، وضعف البنية التحتية الرقمية، وغياب الأطر التنظيمية، كلها عوائق يجب تجاوزها.</p>

      <h2>خارطة طريق</h2>
      <p>ما الخطوات العملية التي يمكن للدول العربية اتخاذها للحاق بركب الثورة التقنية؟</p>
    `,
  },
]

// Dossiers
export const dossiers: Dossier[] = [
  {
    id: "d1",
    slug: "arab-economies-2026",
    title: "الاقتصادات العربية في مواجهة التحديات العالمية",
    description: "ملف شامل يتناول التحديات الاقتصادية التي تواجه الدول العربية واستراتيجيات التكيف والتحول في ظل المتغيرات العالمية",
    status: "ongoing",
    statusAr: "قيد التحديث",
    articlesCount: 8,
    lastUpdated: "أبريل ٢٠٢٦",
    articles: ["2", "5"],
  },
  {
    id: "d2",
    slug: "regional-alliances",
    title: "خريطة التحالفات الإقليمية الجديدة",
    description: "تتبع وتحليل التحولات في شبكة التحالفات السياسية والأمنية في المنطقة العربية والشرق الأوسط",
    status: "ongoing",
    statusAr: "قيد التحديث",
    articlesCount: 12,
    lastUpdated: "مارس ٢٠٢٦",
    articles: ["1", "4", "9"],
  },
  {
    id: "d3",
    slug: "water-food-security",
    title: "المياه والأمن الغذائي العربي",
    description: "ملف يرصد تحديات الأمن المائي والغذائي في المنطقة العربية وتداعياتها الاستراتيجية",
    status: "ongoing",
    statusAr: "قيد التحديث",
    articlesCount: 6,
    lastUpdated: "مارس ٢٠٢٦",
    articles: ["6"],
  },
  {
    id: "d4",
    slug: "digital-transformation",
    title: "التحول الرقمي والذكاء الاصطناعي",
    description: "ملف يتابع جهود التحول الرقمي في العالم العربي وتأثير التقنيات الناشئة على الاقتصادات والمجتمعات",
    status: "completed",
    statusAr: "مكتمل",
    articlesCount: 10,
    lastUpdated: "فبراير ٢٠٢٦",
    articles: ["5", "10"],
  },
  {
    id: "d5",
    slug: "youth-future",
    title: "الشباب العربي: تحديات الحاضر وآفاق المستقبل",
    description: "قضايا الشباب العربي من التعليم والتوظيف إلى المشاركة السياسية والهجرة",
    status: "ongoing",
    statusAr: "قيد التحديث",
    articlesCount: 7,
    lastUpdated: "مارس ٢٠٢٦",
    articles: ["7"],
  },
]

// Investigations
export const investigations: Investigation[] = [
  {
    id: "inv1",
    slug: "hidden-financing",
    title: "شبكات التمويل الخفية وتأثيرها على القرار السياسي",
    description: "تحقيق استقصائي يكشف شبكات التمويل غير المعلنة وتأثيرها على صناعة القرار السياسي والاقتصادي في المنطقة",
    duration: "٦ أشهر",
    sources: 23,
    documents: 156,
    publishedAt: "مارس ٢٠٢٦",
    articleId: "3",
  },
  {
    id: "inv2",
    slug: "water-wars",
    title: "حروب المياه: الصراع الخفي على موارد المنطقة",
    description: "تحقيق ميداني في أزمة المياه وتداعياتها الأمنية والإنسانية في المنطقة العربية",
    duration: "٤ أشهر",
    sources: 18,
    documents: 89,
    publishedAt: "مارس ٢٠٢٦",
    articleId: "6",
  },
  {
    id: "inv3",
    slug: "media-ownership",
    title: "من يملك الإعلام العربي؟",
    description: "تحقيق في بنية ملكية وسائل الإعلام العربية الكبرى وعلاقاتها بالسلطة السياسية والاقتصادية",
    duration: "٨ أشهر",
    sources: 31,
    documents: 203,
    publishedAt: "مارس ٢٠٢٦",
    articleId: "8",
  },
]

// Power Maps
export const powerMaps: PowerMap[] = [
  {
    id: "pm1",
    slug: "regional-alliances-2026",
    title: "خريطة التحالفات الإقليمية ٢٠٢٦",
    description: "رصد تفاعلي لشبكة العلاقات والتحالفات بين الدول في المنطقة العربية والشرق الأوسط. تتضمن الخريطة الاتفاقيات الثنائية والمتعددة الأطراف.",
    lastUpdated: "مارس ٢٠٢٦",
    entities: 22,
    connections: 87,
    methodology: "تعتمد هذه الخريطة على تحليل الاتفاقيات الرسمية والتصريحات الدبلوماسية والتعاون العسكري والاقتصادي بين الدول. يتم تحديث البيانات شهرياً.",
    nodes: [
      { id: "sa", label: "السعودية", type: "country", description: "المملكة العربية السعودية" },
      { id: "uae", label: "الإمارات", type: "country", description: "الإمارات العربية المتحدة" },
      { id: "eg", label: "مصر", type: "country", description: "جمهورية مصر العربية" },
      { id: "qa", label: "قطر", type: "country", description: "دولة قطر" },
      { id: "kw", label: "الكويت", type: "country", description: "دولة الكويت" },
      { id: "jo", label: "الأردن", type: "country", description: "المملكة الأردنية الهاشمية" },
      { id: "iq", label: "العراق", type: "country", description: "جمهورية العراق" },
      { id: "ir", label: "إيران", type: "country", description: "الجمهورية الإسلامية الإيرانية" },
      { id: "tr", label: "تركيا", type: "country", description: "الجمهورية التركية" },
      { id: "il", label: "إسرائيل", type: "country", description: "دولة إسرائيل" },
    ],
    edges: [
      { source: "sa", target: "uae", type: "alliance", label: "تحالف استراتيجي", strength: 9 },
      { source: "sa", target: "eg", type: "alliance", label: "تعاون أمني", strength: 8 },
      { source: "uae", target: "eg", type: "economic", label: "شراكة اقتصادية", strength: 7 },
      { source: "sa", target: "ir", type: "conflict", label: "تنافس إقليمي", strength: 6 },
      { source: "qa", target: "tr", type: "alliance", label: "تحالف", strength: 7 },
      { source: "uae", target: "il", type: "economic", label: "اتفاقيات أبراهام", strength: 6 },
      { source: "sa", target: "iq", type: "influence", label: "نفوذ متنامي", strength: 5 },
      { source: "ir", target: "iq", type: "influence", label: "نفوذ سياسي", strength: 8 },
    ],
  },
  {
    id: "pm2",
    slug: "economic-actors",
    title: "الفاعلون الاقتصاديون الرئيسيون",
    description: "خريطة تفاعلية للشركات والمؤسسات المالية الأكثر تأثيراً في الاقتصاد الإقليمي، مع رصد لعلاقات الملكية والتشابك.",
    lastUpdated: "فبراير ٢٠٢٦",
    entities: 45,
    connections: 156,
    methodology: "تستند الخريطة إلى تحليل السجلات التجارية وتقارير الشركات السنوية وقواعد بيانات الاستثمار الدولية.",
    nodes: [
      { id: "aramco", label: "أرامكو", type: "company", description: "شركة الزيت العربية السعودية" },
      { id: "adnoc", label: "أدنوك", type: "company", description: "شركة بترول أبوظبي الوطنية" },
      { id: "qia", label: "جهاز قطر للاستثمار", type: "organization", description: "صندوق الثروة السيادية القطري" },
      { id: "pif", label: "صندوق الاستثمارات العامة", type: "organization", description: "صندوق الثروة السيادية السعودي" },
      { id: "mubadala", label: "مبادلة", type: "organization", description: "شركة مبادلة للاستثمار" },
    ],
    edges: [
      { source: "aramco", target: "pif", type: "influence", label: "ملكية جزئية", strength: 9 },
      { source: "adnoc", target: "mubadala", type: "economic", label: "شراكات استثمارية", strength: 7 },
      { source: "pif", target: "mubadala", type: "economic", label: "استثمارات مشتركة", strength: 6 },
    ],
  },
  {
    id: "pm3",
    slug: "media-influence",
    title: "شبكات الإعلام والتأثير",
    description: "تتبع ملكية وسائل الإعلام الكبرى وعلاقاتها بمراكز القرار السياسي والاقتصادي. من يملك ماذا ومن يؤثر على من؟",
    lastUpdated: "يناير ٢٠٢٦",
    entities: 38,
    connections: 112,
    methodology: "تم جمع البيانات من السجلات الرسمية وتقارير الشفافية الإعلامية ومصادر صحفية موثوقة.",
    nodes: [
      { id: "mbc", label: "مجموعة MBC", type: "company", description: "أكبر مجموعة إعلامية عربية" },
      { id: "aljazeera", label: "الجزيرة", type: "company", description: "شبكة الجزيرة الإعلامية" },
      { id: "alarabiya", label: "العربية", type: "company", description: "قناة العربية الإخبارية" },
      { id: "skynews", label: "سكاي نيوز عربية", type: "company", description: "قناة سكاي نيوز عربية" },
    ],
    edges: [
      { source: "mbc", target: "alarabiya", type: "influence", label: "ملكية", strength: 10 },
    ],
  },
  {
    id: "pm4",
    slug: "non-state-actors",
    title: "خريطة الفاعلين غير الدولتيين",
    description: "رصد للجماعات والحركات الفاعلة في المنطقة، وعلاقاتها التنظيمية والأيديولوجية.",
    lastUpdated: "ديسمبر ٢٠٢٥",
    entities: 28,
    connections: 94,
    methodology: "تعتمد الخريطة على تقارير مراكز الأبحاث المتخصصة والتقارير الأممية والتحليلات الاستخباراتية المنشورة.",
    nodes: [],
    edges: [],
  },
]

// Helper functions
export function getArticleById(id: string): Article | undefined {
  return articles.find((a) => a.id === id)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug)
}

export function getDossierById(id: string): Dossier | undefined {
  return dossiers.find((d) => d.id === id)
}

export function getDossierBySlug(slug: string): Dossier | undefined {
  return dossiers.find((d) => d.slug === slug)
}

export function getInvestigationById(id: string): Investigation | undefined {
  return investigations.find((i) => i.id === id)
}

export function getInvestigationBySlug(slug: string): Investigation | undefined {
  return investigations.find((i) => i.slug === slug)
}

export function getPowerMapById(id: string): PowerMap | undefined {
  return powerMaps.find((p) => p.id === id)
}

export function getPowerMapBySlug(slug: string): PowerMap | undefined {
  return powerMaps.find((p) => p.slug === slug)
}

export function getArticlesByCategory(category: ArticleCategory): Article[] {
  return articles.filter((a) => a.category === category)
}

export function getFeaturedArticles(): Article[] {
  return articles.filter((a) => a.featured)
}

export function getLatestArticles(count: number = 10): Article[] {
  return [...articles].slice(0, count)
}

export function getMostReadArticles(count: number = 5): Article[] {
  return [...articles].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, count)
}

export function searchArticles(query: string): Article[] {
  const lowercaseQuery = query.toLowerCase()
  return articles.filter(
    (a) =>
      a.title.toLowerCase().includes(lowercaseQuery) ||
      a.excerpt.toLowerCase().includes(lowercaseQuery) ||
      a.tags.some((t) => t.toLowerCase().includes(lowercaseQuery))
  )
}

export function getRelatedArticles(articleId: string, count: number = 4): Article[] {
  const article = getArticleById(articleId)
  if (!article) return []
  
  return articles
    .filter((a) => a.id !== articleId)
    .filter((a) => 
      a.category === article.category || 
      a.tags.some((t) => article.tags.includes(t))
    )
    .slice(0, count)
}

export function getDossierArticles(dossierId: string): Article[] {
  const dossier = getDossierById(dossierId)
  if (!dossier) return []
  return dossier.articles.map((id) => getArticleById(id)).filter(Boolean) as Article[]
}
