export type ProjectCategory =
  | 'Backyard Transformation'
  | 'Interlocking Patio'
  | 'Retaining Wall'
  | 'Deck or Fence'
  | 'Swimming Pool'
  | 'Landscaping'
  | 'Outdoor Kitchen'
  | 'Other';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Backyard Transformation',
  'Interlocking Patio',
  'Retaining Wall',
  'Deck or Fence',
  'Swimming Pool',
  'Landscaping',
  'Outdoor Kitchen',
  'Other',
];

export const BUSINESS_INFO = {
  name: 'Paradise Views Landscaping',
  shortName: 'PARADISE VIEWS',
  phoneDisplay: '(416) 560-9501',
  phoneHref: 'tel:+14165609501',
  location: 'Etobicoke, Ontario, Canada',
  website: 'https://paradiseviewslandscaping.com/',
  instagram: 'https://www.instagram.com/paradiseviews12/',
  facebook: 'https://www.facebook.com/profile.php?id=100064103292378',
  serviceAreas: [
    'Etobicoke',
    'Toronto',
    'Mississauga',
    'Brampton',
    'Woodbridge',
    'Richmond Hill',
    'Bolton',
    'Caledon',
    'Kleinburg',
  ],
} as const;

export const SITE_IMAGES = {
  hero: '/src/assets/images/hero_backyard_sanctuary_1795089102765.jpg',
  brandIntro: '/src/assets/images/brand_intro_patio_1795089098454.jpg',
  outdoorKitchen: '/assets/aistudio/image_0ab2a0e3.png',
  poolTerrace: '/src/assets/images/pool_outdoor_living_1795089102521.jpg',
  deckPergola: '/src/assets/images/cedar_deck_pergola_1795089102455.jpg',
  retainingSteps: '/src/assets/images/stone_steps_walkway_1795089103780.jpg',
  turfCourtyard: '/src/assets/images/modern_turf_courtyard_1795089110923.jpg',
} as const;

export interface ServiceItem {
  number: string;
  title: string;
  shortDescription: string;
  image: string;
  imageAlt: string;
  inquiryCategory: ProjectCategory;
}

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'LANDSCAPE DESIGN & INSTALLATION',
    shortDescription:
      'Complete property planning, grading, planting beds, and cohesive architectural outdoor environments tailored to your home.',
    image: SITE_IMAGES.hero,
    imageAlt: 'Complete modern residential backyard landscape design with stone terrace, pergola, and pool',
    inquiryCategory: 'Backyard Transformation',
  },
  {
    number: '02',
    title: 'INTERLOCKING PATIOS & WALKWAYS',
    shortDescription:
      'Precision-leveled interlocking stone patios, front walkways, and entertaining courtyards built on deep compacted bases.',
    image: SITE_IMAGES.brandIntro,
    imageAlt: 'Interlocking charcoal and natural stone patio with sunken fire lounge and steps',
    inquiryCategory: 'Interlocking Patio',
  },
  {
    number: '03',
    title: 'RETAINING WALLS',
    shortDescription:
      'Structural armour stone and engineered retaining walls that stabilize grades while creating multi-level outdoor living zones.',
    image: SITE_IMAGES.retainingSteps,
    imageAlt: 'Terraced natural armour stone retaining wall and wide limestone garden steps',
    inquiryCategory: 'Retaining Wall',
  },
  {
    number: '04',
    title: 'DECKS, FENCES & PERGOLAS',
    shortDescription:
      'Custom cedar and composite decks, horizontal privacy fencing, and architectural timber pergolas crafted for shade and warmth.',
    image: SITE_IMAGES.deckPergola,
    imageAlt: 'Multi-level cedar wood deck, dark timber pergola, horizontal privacy fence, and warm stair lighting',
    inquiryCategory: 'Deck or Fence',
  },
  {
    number: '05',
    title: 'SWIMMING POOLS & OUTDOOR SPACES',
    shortDescription:
      'Integrated pool installations, natural stone coping, poolside lounging terraces, and illuminated water features.',
    image: SITE_IMAGES.poolTerrace,
    imageAlt: 'Modern swimming pool surrounded by natural stone coping and illuminated sheer descent waterfall wall',
    inquiryCategory: 'Swimming Pool',
  },
  {
    number: '06',
    title: 'ARTIFICIAL GRASS & SOD',
    shortDescription:
      'Lush, low-maintenance synthetic turf lawns and fresh premium sod installations framed by clean hardscape borders.',
    image: SITE_IMAGES.turfCourtyard,
    imageAlt: 'Contemporary backyard courtyard with pristine emerald turf, concrete stepping pavers, and raised planters',
    inquiryCategory: 'Landscaping',
  },
  {
    number: '07',
    title: 'NATURAL STONE & HARDSCAPING',
    shortDescription:
      'Custom flagstone, limestone steps, natural stone veneers, and architectural stonework built to endure Ontario seasons.',
    image: SITE_IMAGES.retainingSteps,
    imageAlt: 'Hand-laid natural limestone steps framed by armour stone masonry and ornamental plantings',
    inquiryCategory: 'Interlocking Patio',
  },
  {
    number: '08',
    title: 'OUTDOOR KITCHENS & FEATURES',
    shortDescription:
      'Built-in BBQ stations, stone dining bars, fire features, and integrated landscape lighting designed for effortless hosting.',
    image: SITE_IMAGES.outdoorKitchen,
    imageAlt: 'Natural stone outdoor kitchen pavilion with built-in BBQ bar, dining table, water feature, and twilight lighting',
    inquiryCategory: 'Outdoor Kitchen',
  },
];

export interface PortfolioProject {
  id: string;
  index: string;
  categoryLabel: string;
  filterGroup: 'All' | 'Outdoor Kitchens' | 'Patios & Stone' | 'Pools' | 'Decks & Pergolas' | 'Turf & Gardens';
  title: string;
  scopeSummary: string;
  image: string;
  imageAlt: string;
  ctaPrompt: string;
  ctaAction: string;
  inquiryCategory: ProjectCategory;
  layoutVariant: 'featured-tall' | 'supporting-portrait' | 'wide-panoramic' | 'medium-left' | 'medium-right';
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'outdoor-kitchen-pavilion',
    index: '01',
    categoryLabel: 'Outdoor Kitchen & Stone Patio',
    filterGroup: 'Outdoor Kitchens',
    title: 'Stone Pavilion BBQ & Dining Terrace',
    scopeSummary:
      'Natural stacked-stone outdoor kitchen alcove with built-in grill bar, integrated under-counter lighting, travertine patio, and water basin.',
    image: SITE_IMAGES.outdoorKitchen,
    imageAlt: 'Natural stone outdoor kitchen pavilion with built-in BBQ bar, stone patio, dining area, and water feature at twilight',
    ctaPrompt: 'LOVE THIS OUTDOOR KITCHEN?',
    ctaAction: 'BUILD SOMETHING SIMILAR',
    inquiryCategory: 'Outdoor Kitchen',
    layoutVariant: 'featured-tall',
  },
  {
    id: 'armour-stone-terracing',
    index: '02',
    categoryLabel: 'Retaining Walls & Natural Stone',
    filterGroup: 'Patios & Stone',
    title: 'Terraced Armour Stone & Floating Steps',
    scopeSummary:
      'Multi-tier natural armour stone retaining walls paired with wide limestone garden steps, low-voltage step lights, and Japanese maple beds.',
    image: SITE_IMAGES.retainingSteps,
    imageAlt: 'Terraced natural armour stone retaining wall with wide limestone steps and ornamental planting beds',
    ctaPrompt: 'WORKING WITH A SLOPED YARD?',
    ctaAction: 'DISCUSS A RETAINING WALL',
    inquiryCategory: 'Retaining Wall',
    layoutVariant: 'supporting-portrait',
  },
  {
    id: 'full-backyard-sanctuary',
    index: '03',
    categoryLabel: 'Complete Backyard Transformation',
    filterGroup: 'Pools',
    title: 'Architectural Terrace, Pergola & Infinity Edge',
    scopeSummary:
      'Full-property outdoor living architecture uniting large-format limestone paving, illuminated timber pergola, retaining walls, and poolside lounge.',
    image: SITE_IMAGES.hero,
    imageAlt: 'Luxury contemporary backyard featuring large limestone patio, lit cedar pergola, retaining walls, and twilight pool',
    ctaPrompt: 'PLANNING A BACKYARD TRANSFORMATION?',
    ctaAction: "LET'S DISCUSS YOUR PROJECT",
    inquiryCategory: 'Backyard Transformation',
    layoutVariant: 'wide-panoramic',
  },
  {
    id: 'poolside-waterfall-terrace',
    index: '04',
    categoryLabel: 'Swimming Pools & Stone Coping',
    filterGroup: 'Pools',
    title: 'Poolside Lounge & Sheer-Descent Waterfall',
    scopeSummary:
      'Crisp natural stone pool coping, interlocking lounge deck, ledger-stone waterfall wall, and sculpted privacy hedges lit for evening swims.',
    image: SITE_IMAGES.poolTerrace,
    imageAlt: 'Residential swimming pool with natural stone coping, interlocking deck, and illuminated sheer descent waterfall wall',
    ctaPrompt: 'DREAMING OF A POOLSIDE RETREAT?',
    ctaAction: 'PLAN YOUR POOL SURROUND',
    inquiryCategory: 'Swimming Pool',
    layoutVariant: 'medium-left',
  },
  {
    id: 'interlocking-fire-lounge',
    index: '05',
    categoryLabel: 'Interlocking Patios & Fire Features',
    filterGroup: 'Patios & Stone',
    title: 'Sunken Fire Pit & Dual-Tone Paver Patio',
    scopeSummary:
      'Two-tone architectural interlocking pavers, custom built-in timber bench seating, limestone transition stairs, and perennial garden framing.',
    image: SITE_IMAGES.brandIntro,
    imageAlt: 'Modern interlocking stone patio with sunken concrete fire pit, built-in wood benches, and limestone steps',
    ctaPrompt: 'LIKE THIS PATIO?',
    ctaAction: 'BUILD SOMETHING SIMILAR',
    inquiryCategory: 'Interlocking Patio',
    layoutVariant: 'medium-right',
  },
  {
    id: 'multi-level-cedar-deck',
    index: '06',
    categoryLabel: 'Decks, Fences & Pergolas',
    filterGroup: 'Decks & Pergolas',
    title: 'Custom Cedar Deck, Louvered Pergola & Privacy Fence',
    scopeSummary:
      'Tiered western red cedar decking with built-in planter benches, recessed stair riser illumination, dark timber pergola, and horizontal fencing.',
    image: SITE_IMAGES.deckPergola,
    imageAlt: 'Multi-level western red cedar deck with dark timber pergola, horizontal cedar privacy fence, and LED step lights',
    ctaPrompt: 'UPGRADING YOUR DECK OR FENCE?',
    ctaAction: 'REQUEST A CUSTOM BUILD',
    inquiryCategory: 'Deck or Fence',
    layoutVariant: 'medium-right',
  },
  {
    id: 'minimalist-turf-courtyard',
    index: '07',
    categoryLabel: 'Artificial Grass & Modern Landscaping',
    filterGroup: 'Turf & Gardens',
    title: 'Architectural Turf Lawn & Linear Stepping Stones',
    scopeSummary:
      'Year-round lush artificial turf framed by oversized concrete stepping pavers, river-rock joints, dark metal planters, and slatted cedar fencing.',
    image: SITE_IMAGES.turfCourtyard,
    imageAlt: 'Minimalist emerald artificial turf lawn with linear concrete pavers, river stone joints, and raised black planters',
    ctaPrompt: 'WANT A CLEAN, LOW-MAINTENANCE LAWN?',
    ctaAction: 'EXPLORE TURF & PLANTING',
    inquiryCategory: 'Landscaping',
    layoutVariant: 'medium-left',
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'EXPERIENCE',
    description:
      'Grounded in practical landscape construction across Etobicoke and the Greater Toronto Area, every build respects local soil, drainage, and Ontario freeze-thaw cycles.',
  },
  {
    number: '02',
    title: 'DESIGN & BUILD',
    description:
      'One cohesive team carries your project from initial spatial concept and material pairing through excavation, masonry, carpentry, and final planting.',
  },
  {
    number: '03',
    title: 'PERSONAL APPROACH',
    description:
      'Every property has distinct elevations, sightlines, and routines. We listen closely to how you host, relax, and move outdoors before proposing a plan.',
  },
  {
    number: '04',
    title: 'BUILT FOR OUTDOOR LIVING',
    description:
      'From interlocking stone patios and retaining walls to custom decks, pools, and outdoor kitchens, we craft durable environments meant to be lived in daily.',
  },
] as const;

export const PROCESS_STEPS = [
  {
    number: '01',
    title: 'TELL US YOUR IDEA',
    description: 'Share your outdoor project vision using our quick inquiry form or a brief phone call.',
  },
  {
    number: '02',
    title: 'DISCUSS THE DETAILS',
    description: 'Explore your property layout, material preferences, priorities, and practical possibilities.',
  },
  {
    number: '03',
    title: 'PLAN YOUR SPACE',
    description: 'Align on the spatial layout, stone and timber selections, and construction approach.',
  },
  {
    number: '04',
    title: 'BRING IT TO LIFE',
    description: 'Move forward with your landscaping build and watch your outdoor environment take shape.',
  },
] as const;
