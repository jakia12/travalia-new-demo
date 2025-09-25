// app/data/resorts.js
export const resorts = [
  {
    id: "lily-beach",
    slug: "lily-beach-resort-spa",
    name: "Lily Beach Resort & Spa",
    img: "/img/gl1.webp",
    short: "Pioneering all-inclusive resort in South Ari Atoll.",
    island: "South Ari Atoll, Maldives",
    rating: 5,
    priceFrom: 720,
    tags: ["All-inclusive", "Overwater villas", "House reef"],
    gallery: ["/img/gl1.webp", "/img/rs1.webp", "/img/rs2.webp"],
    amenities: [
      "Overwater villas",
      "Tamara Spa by Mandara",
      "Prodivers dive center",
      "Turtles Kids’ Club",
      "Butler service (select categories)",
      "Tennis & fitness",
      "Snorkel-friendly house reef",
    ],
    description: `A long-running favorite for travellers who want a premium, hassle-free all-inclusive. Lily’s famed Platinum Plan folds in generous buffet & à la carte dining, premium beverages, and a handful of experiences so you’re not signing checks all day. The natural house reef is a highlight—easy off-beach access with frequent turtle and reef-fish sightings. Rooms span relaxed beach villas to large overwater pool pavilions, and families get smooth logistics via buggy routes and a supervised kids’ club. Seaplane hops run by day and are coordinated with international arrivals.`,
    coordinates: { lat: null, lng: null },
    contact: {
      phone: null,
      email: null,
      website: "https://www.lilybeachmaldives.com",
      address: "Huvahendhoo, South Ari Atoll, Maldives",
    },
    highlights: {
      highlights: [
        "Original Platinum Plan all-inclusive",
        "Excellent house-reef snorkelling",
        "Family-friendly (kids’ club, flexible dining)",
      ],
    },
    transfers: {
      airport: "MLE",
      details: [
        {
          mode: "seaplane",
          durationMinutes: 25,
          costUSD: null, // sometimes included in specific Platinum Plan promos; otherwise chargeable
          schedule: "Daylight hours only",
          note: "Operated by TMA; Lily Hotels lounge access at Noovilu Seaplane Terminal.",
        },
      ],
      note: "Seaplane timings are set after international flight details; the team meets you on arrival.",
    },
    policies: {
      checkInFrom: "2:00 PM",
      checkOutUntil: "12:00 PM",
      cancellation: "Varies by rate/season",
      children: {
        allowed: true,
        minAge: 0,
        crib: "Complimentary on request (subject to availability)",
        extraBed: "Rollaway available (fee may apply)",
      },
      pets: { allowed: false, note: "Service animals only" },
      smoking: "Designated areas only",
      party: "No parties/events",
      paymentMethods: ["Visa", "Mastercard", "Amex", "UnionPay"],
    },
    fees: {
      mandatory: [
        {
          label: "Green Tax",
          amount: "USD 12",
          per: "per person, per night (infants <2 exempt)",
        },
      ],
      optional: [
        {
          label: "Seaplane transfers",
          amount: null,
          per: "roundtrip",
          note: "Occasionally included on some Platinum Plan offers; otherwise payable to resort",
        },
        { label: "Lobster & premium dining supplements", amount: null },
      ],
    },
    dining: {
      restaurants: [
        {
          name: "Lily Maa",
          cuisine: "International buffet",
          hours: "Breakfast / Lunch / Dinner",
          location: "Beachfront",
        },
        {
          name: "Tamarind",
          cuisine: "Indian & Thai à la carte",
          hours: "Dinner",
          location: "Overwater",
        },
        {
          name: "Teppanyaki",
          cuisine: "Japanese show-cooking",
          hours: "Dinner",
          location: "AQVA",
        },
        {
          name: "Les Turquoise D’Aqua",
          cuisine: "Fine dining (set/special)",
          hours: "Dinner",
          location: "Beachfront",
        },
      ],
      bars: [
        {
          name: "AQVA Bar",
          hours: "Day to late",
          location: "Sunset side infinity pool",
        },
        {
          name: "Vibes Bar",
          hours: "Day to late",
          location: "Main pool & activity hub",
        },
        {
          name: "The Spirit Bar",
          hours: "Day to late",
          location: "Beachfront",
        },
      ],
    },
    wellness: {
      spa: {
        name: "Tamara Spa by Mandara",
        highlights: ["Overwater pavilions", "Signature rituals"],
      },
      fitness: ["Gym", "Tennis court", "Yoga pavilion"],
      wellnessPrograms: ["Couples’ rituals", "Aqua aerobics"],
    },
    activities: {
      onWater: [
        "Snorkelling house reef",
        "Diving (Prodivers)",
        "Sunset cruises",
        "Non-motorised water sports",
      ],
      onLand: ["Tennis", "Beach volleyball", "Table games at Vibes"],
      forKids: ["Turtles Kids’ Club", "Kids’ pool", "Teens games at Vibes"],
    },
    rooms: [
      {
        id: "beach-villa",
        name: "Beach Villa",
        category: "beach",
        sizeSqm: 68,
        maxOccupancy: 3,
        bedConfig: ["1 King + sofa bed"],
        privatePool: false,
        view: "Beach",
        features: ["Direct beach access", "Outdoor bathroom", "Terrace"],
        photos: ["/img/rs1.webp"],
      },
      {
        id: "deluxe-water-villa",
        name: "Deluxe Water Villa with Pool",
        category: "overwater",
        sizeSqm: 126,
        maxOccupancy: 3,
        bedConfig: ["1 King"],
        privatePool: true,
        view: "Lagoon",
        features: ["Glass floor panel", "Sun deck", "Private pool"],
        photos: ["/img/rs2.webp"],
      },
    ],
    faqs: [
      {
        title: "How do I get there?",
        content:
          "A 25-minute seaplane from Malé (daylight hours only). The team hosts you at the seaplane lounge.",
      },
      {
        title: "Is snorkelling good?",
        content: "Yes—easy access house reef with regular turtle sightings.",
      },
    ],
    sustainability: {
      certifications: [],
      practices: [
        "Single-use plastic reduction",
        "Reef-safe sunscreen encouraged",
      ],
    },
    nearby: {
      list: [
        {
          name: "South Ari whale shark area",
          distance: "Boat excursion",
          type: "Nature",
        },
      ],
    },
    accessibility: {
      list: [
        "Buggy service",
        "Step-free paths in main areas (villa access varies)",
      ],
    },
    languages: {
      languagesSpoken: [
        "English",
        "Chinese",
        "Russian",
        "Arabic",
        "German",
        "French",
        "Italian",
      ],
    },
    seo: {
      seoTitle: "Lily Beach Resort & Spa – All-Inclusive Maldives | South Ari",
      seoDescription:
        "Platinum Plan all-inclusive with house-reef snorkelling, overwater villas and family facilities at Lily Beach, South Ari Atoll.",
    },
  },

  {
    id: "hideaway",
    slug: "hideaway-beach-resort-spa",
    name: "Hideaway Beach Resort & Spa",
    img: "/img/gl2.webp",
    short: "Featuring all suites and unparalleled privacy.",
    island: "Haa Alifu Atoll, Maldives",
    rating: 4.5,
    priceFrom: 690,
    tags: ["Private", "All suites", "Spa"],
    gallery: ["/img/gl2.webp", "/img/rs3.webp", "/img/gl3.webp"],
    amenities: [
      "All-suite island",
      "Tender Hearts Kids’ Club",
      "Dive & water sports",
      "Tennis courts",
      "Butler service",
      "Multiple restaurants",
    ],
    description: `A big, leafy island with space to spread out—every category is a suite or villa, many with private pools. The layout naturally separates activity zones from quieter beaches, so couples and families both find their rhythm. Dining ranges from an over-water Asian venue to an ocean-view buffet and a lively grill/bar scene. Divers get channels and reefs with good visibility; on land there’s tennis, cycling and a decent gym. Transfers are either a scenic direct seaplane by day or a domestic flight to Hanimaadhoo plus a short speedboat—useful for late arrivals.`,
    coordinates: { lat: null, lng: null },
    contact: {
      phone: null,
      email: null,
      website: "https://www.hideawaybeachmaldives.com",
      address: "Dhonakulhi, Haa Alifu Atoll, Maldives",
    },
    highlights: {
      highlights: [
        "All-suite privacy",
        "Great for honeymooners & families",
        "Two transfer options",
      ],
    },
    transfers: {
      airport: "MLE",
      details: [
        {
          mode: "seaplane",
          durationMinutes: 75,
          costUSD: null,
          schedule: "Daylight hours",
          note: "Direct seaplane when daylight allows.",
        },
        {
          mode: "domestic+speedboat",
          durationMinutes: 55 + 25,
          costUSD: null,
          schedule: "Multiple daily domestic flights",
          note: "Fly to Hanimaadhoo (~55m) + 20–30m boat.",
        },
      ],
      note: "Seaplanes run in daylight only; for flights outside window, domestic+boat is arranged.",
    },
    policies: {
      checkInFrom: "2:00 PM",
      checkOutUntil: "12:00 PM",
      cancellation: "Varies by rate/season",
      children: {
        allowed: true,
        minAge: 0,
        crib: "Available on request",
        extraBed: "Fee may apply",
      },
      pets: { allowed: false },
      smoking: "Designated areas only",
      party: "No parties/events",
      paymentMethods: ["Visa", "Mastercard", "Amex", "UnionPay"],
    },
    fees: {
      mandatory: [
        {
          label: "Green Tax",
          amount: "USD 12",
          per: "per person, per night (infants <2 exempt)",
        },
      ],
      optional: [
        { label: "Transfers", amount: null, per: "roundtrip" },
        {
          label: "Babysitting",
          amount: "USD 40/hr (2 kids max <12)",
          per: "hour",
        },
      ],
    },
    dining: {
      restaurants: [
        {
          name: "Matheefaru",
          cuisine: "International buffet & live stations",
          hours: "B/L/D",
          location: "Oceanfront",
        },
        {
          name: "Samsara Asian Fusion",
          cuisine: "Pan-Asian à la carte + teppan",
          hours: "Dinner",
          location: "Overwater",
        },
        {
          name: "Meeru Bar & Grill",
          cuisine: "Grill, pizza, seafood",
          hours: "Lunch/Dinner",
          location: "Poolside",
        },
      ],
      bars: [{ name: "Meeru Bar", hours: "10:00–Late" }],
    },
    wellness: {
      spa: {
        name: "Hideaway Spa",
        highlights: ["Couples’ suites", "Holistic therapies"],
      },
      fitness: ["Gym", "Tennis", "Multi-sport court"],
      wellnessPrograms: ["Yoga", "Meditation"],
    },
    activities: {
      onWater: ["Snorkelling", "Diving", "Jet ski", "SUP/Kayak"],
      onLand: ["Tennis", "Cycling", "Beach games"],
      forKids: ["Tender Hearts Kids’ Club (3–11.99y)", "Babysitting (fee)"],
    },
    rooms: [
      {
        id: "deluxe-water-villa",
        name: "Deluxe Water Villa with Pool",
        category: "overwater",
        sizeSqm: 145,
        maxOccupancy: 3,
        bedConfig: ["1 King"],
        privatePool: true,
        view: "Lagoon",
        features: ["Private pool", "Sun deck", "Butler"],
        photos: ["/img/gl3.webp"],
      },
      {
        id: "beach-residence",
        name: "Beach Residence with Pool",
        category: "beach",
        sizeSqm: 215,
        maxOccupancy: 4,
        bedConfig: ["1 King + rollaway"],
        privatePool: true,
        view: "Beach",
        features: ["Private garden", "Direct beach access"],
        photos: ["/img/rs3.webp"],
      },
    ],
    faqs: [
      {
        title: "Best transfer option?",
        content:
          "Daylight: direct seaplane (~75m). After dark or for flexibility: domestic to Hanimaadhoo + 20–30m speedboat.",
      },
    ],
    sustainability: {
      certifications: [],
      practices: ["Plastic reduction", "Local sourcing initiatives"],
    },
    nearby: { list: [{ name: "Outer-reef channels", type: "Nature" }] },
    accessibility: {
      list: ["Buggy service", "Some step-free routes (villa access varies)"],
    },
    languages: {
      languagesSpoken: [
        "English",
        "Russian",
        "Chinese",
        "Arabic",
        "German",
        "French",
        "Italian",
      ],
    },
    seo: {
      seoTitle:
        "Hideaway Beach Resort & Spa – Private All-Suite Luxury | Haa Alifu",
      seoDescription:
        "Spacious pool villas, privacy, and flexible transfers at Hideaway Beach Resort & Spa, Maldives.",
    },
  },

  {
    id: "signature-hideaway",
    slug: "signature-collection-by-hideaway",
    name: "The Signature Collection by Hideaway",
    img: "/img/gl3.webp",
    short: "Nine ultra-luxury villas with bespoke service.",
    island: "Haa Alifu Atoll, Maldives",
    rating: 5,
    priceFrom: 1100,
    tags: ["Ultra-luxury", "Private pool", "Butler"],
    gallery: ["/img/gl3.webp", "/img/rs2.webp", "/img/rs1.webp"],
    amenities: [
      "Dedicated butler",
      "Private pool",
      "In-residence dining",
      "Yacht transfers (on request)",
      "Curated excursions",
      "Access to Hideaway Spa",
    ],
    description: `A discrete enclave of residential-style villas within Hideaway—aimed at groups, multi-gen families and guests who want hotel polish with full privacy. Expect expansive pools, indoor-outdoor living, optional private chef service and quiet beachfront or lagoon settings. Guests still tap the main island for spa, dive and dining, but day-to-day life happens in the residence with your butler orchestrating the details.`,
    coordinates: { lat: null, lng: null },
    contact: { phone: null, email: null, website: null, address: null },
    highlights: {
      highlights: [
        "Residential scale",
        "Dedicated butler",
        "Private chef options",
      ],
    },
    transfers: {
      airport: "MLE",
      details: [
        {
          mode: "seaplane",
          durationMinutes: 75,
          costUSD: null,
          schedule: "Daylight",
          note: "Direct scenic seaplane.",
        },
        {
          mode: "domestic+speedboat",
          durationMinutes: 55 + 25,
          costUSD: null,
          schedule: "Multiple daily",
          note: "Via Hanimaadhoo.",
        },
        {
          mode: "yacht",
          durationMinutes: null,
          costUSD: null,
          schedule: "On request",
          note: "Private charter on request.",
        },
      ],
      note: "VIP handling on request.",
    },
    policies: {
      checkInFrom: "2:00 PM",
      checkOutUntil: "12:00 PM",
      cancellation: "Varies by rate",
      children: { allowed: true, crib: "Available", extraBed: "Available" },
      pets: { allowed: false },
      smoking: "Designated areas only",
      party: "No parties/events",
      paymentMethods: ["Visa", "Mastercard", "Amex"],
    },
    fees: {
      mandatory: [
        {
          label: "Green Tax",
          amount: "USD 12",
          per: "per person, per night (infants <2 exempt)",
        },
      ],
      optional: [{ label: "Transfers", amount: null }],
    },
    dining: {
      restaurants: [{ name: "In-Residence Dining", cuisine: "Bespoke menus" }],
      bars: [],
    },
    wellness: {
      spa: {
        name: "Hideaway Spa (access)",
        highlights: ["In-residence spa rituals by arrangement"],
      },
      fitness: ["Private in-villa options on request"],
      wellnessPrograms: ["Tailored wellness"],
    },
    activities: {
      onWater: ["Private yacht charters", "Diving", "Snorkelling"],
      onLand: ["Private beach dining", "Tennis (main resort)"],
    },
    rooms: [
      {
        id: "residence-4br",
        name: "4-Bedroom Signature Residence",
        category: "residence",
        sizeSqm: 1100,
        maxOccupancy: 10,
        bedConfig: ["Multiple"],
        privatePool: true,
        view: "Ocean",
        features: ["Cinema room", "Butler pantry", "Expansive deck"],
        photos: ["/img/rs2.webp"],
      },
    ],
    faqs: [
      {
        title: "Is the enclave separate?",
        content: "Yes—dedicated area within Hideaway with private services.",
      },
    ],
    sustainability: {
      certifications: [],
      practices: ["Plastic reduction", "Local staff development"],
    },
    nearby: { list: [] },
    accessibility: { list: ["Buggy service"] },
    languages: { languagesSpoken: ["English", "Russian", "Chinese"] },
    seo: {
      seoTitle:
        "Signature Collection by Hideaway – Ultra-Luxury Residences | Maldives",
      seoDescription:
        "Nine residences with butler service and privacy within Hideaway Beach Resort.",
    },
  },

  {
    id: "kandima",
    slug: "kandima-maldives",
    name: "Kandima Maldives",
    img: "/img/rs1.webp",
    short: "Large, playful island with art, fitness, and beach clubs.",
    island: "Dhaalu Atoll, Maldives",
    rating: 4.5,
    priceFrom: 680,
    tags: ["Big island", "Fitness", "Clubs"],
    gallery: ["/img/rs1.webp", "/img/gl1.webp", "/img/rs3.webp"],
    amenities: [
      "Art studio",
      "esKape Spa",
      "Beach Club",
      "Kids & Teens programs",
      "Sports arena",
    ],
    description: `A lifestyle resort built for choice and energy: long beaches, a proper sports arena, an art studio, DJ nights and multiple pools from relaxed to vibey. Accommodation runs from wallet-friendly studios to overwater villas, so you can dial budget and style without losing the upbeat mood. Foodies get variety with buffets, à la carte venues and beach clubs. Families benefit from kids & teens programming; active travellers hit the gym classes and water sports. Domestic flight + short speedboat makes arrivals predictable; seaplane is also offered.`,
    coordinates: { lat: null, lng: null },
    contact: {
      phone: null,
      email: null,
      website: "https://kandima.com",
      address: "Kandima Island, Dhaalu Atoll, Maldives",
    },
    highlights: {
      highlights: [
        "Design-forward vibe",
        "Ten dining & bar outlets",
        "Great for families & groups",
      ],
    },
    transfers: {
      airport: "MLE",
      details: [
        {
          mode: "domestic+speedboat",
          durationMinutes: 35 + 15,
          costUSD: { adult: 414, child: 300, infant: 0 }, // Comfort Class (published)
          schedule: "Scheduled daily",
          note: "Fly to Dhaalu (35m) + 15m speedboat. Premium Sapphire Class also offered.",
        },
        {
          mode: "seaplane",
          durationMinutes: 45, // approx; varies with routing
          costUSD: { adult: 675, child: 375, infant: 0 },
          schedule: "Daylight hours",
          note: "Rates include taxes; subject to third-party operator changes.",
        },
      ],
      note: "Rates may change; resort uses third-party operators. Seaplanes operate by daylight.",
    },
    policies: {
      checkInFrom: "12:00 PM",
      checkOutUntil: "12:00 PM",
      cancellation: "Varies by rate/season",
      children: {
        allowed: true,
        crib: "Complimentary",
        extraBed: "Fee may apply",
      },
      pets: { allowed: false },
      smoking: "Designated areas only",
      party: "No parties/events",
      paymentMethods: ["Visa", "Mastercard", "Amex"],
    },
    fees: {
      mandatory: [
        {
          label: "Green Tax",
          amount: "USD 12",
          per: "per person, per night (infants <2 exempt)",
        },
      ],
      optional: [
        {
          label: "Transfers",
          amount:
            "Seaplane: Adult $675 / Child $375. Domestic Comfort: Adult $414 / Child $300",
          per: "roundtrip",
        },
      ],
    },
    dining: {
      restaurants: [
        { name: "Flavour", cuisine: "International buffet" },
        { name: "Zest", cuisine: "International buffet" },
        { name: "Azure", cuisine: "Mediterranean" },
        { name: "Sea Dragon", cuisine: "Chinese/Seafood (à la carte)" },
      ],
      bars: [
        { name: "Forbidden Bar", hours: "Evening" },
        { name: "Breeze Pool Bar", hours: "Daily" },
        { name: "Beach Club", hours: "Daytime & events" },
        { name: "Aroma Café / Deli", hours: "Daytime" },
      ],
    },
    wellness: {
      spa: {
        name: "esKape Spa",
        highlights: ["10 treatment rooms incl. couples", "Steam & whirlpool"],
      },
      fitness: ["Gym (Burn)", "Sports arena", "Tennis", "Football", "Yoga"],
      wellnessPrograms: ["Group fitness & yoga classes"],
    },
    activities: {
      onWater: ["Snorkel trips", "Dive center", "Water sports (Aquaholics)"],
      onLand: ["Art studio (KULA)", "Cycling", "Beach games"],
      forKids: ["Kids club & teens activities", "Family pool & events"],
    },
    rooms: [
      {
        id: "beach-studio",
        name: "Beach Studio",
        category: "beach",
        sizeSqm: 55,
        maxOccupancy: 3,
        bedConfig: ["1 King + sofa bed"],
        privatePool: false,
        view: "Beach",
        features: ["Terrace", "Near activities"],
        photos: ["/img/gl1.webp"],
      },
      {
        id: "aqua-villa",
        name: "Aqua Villa",
        category: "overwater",
        sizeSqm: 73,
        maxOccupancy: 3,
        bedConfig: ["1 King"],
        privatePool: false,
        view: "Lagoon",
        features: ["Overwater deck", "Steps to the sea"],
        photos: ["/img/rs3.webp"],
      },
    ],
    faqs: [
      {
        title: "How many dining spots?",
        content:
          "Ten total restaurants/bars; check current opening schedules by season.",
      },
      {
        title: "Transfers?",
        content:
          "Either domestic flight + speedboat (often better for late flights) or seaplane by daylight.",
      },
    ],
    sustainability: {
      certifications: [],
      practices: ["Recycling", "On-island water bottling"],
    },
    nearby: { list: [{ name: "Dhaalu reefs & sandbanks", type: "Nature" }] },
    accessibility: {
      list: ["Buggy service", "Step-free routes in main areas"],
    },
    languages: {
      languagesSpoken: ["English", "Chinese", "Russian", "Arabic", "Hindi"],
    },
    seo: {
      seoTitle: "Kandima Maldives – Playful Lifestyle Island | Dhaalu",
      seoDescription:
        "Design-forward, family-friendly island with art studio, sports arena and ten dining/bar venues.",
    },
  },

  {
    id: "ritz-carlton-fari",
    slug: "ritz-carlton-maldives-fari-islands",
    name: "The Ritz-Carlton Maldives, Fari Islands",
    img: "/img/rs2.webp",
    short: "Minimalist luxury with butler service and Fari Marina access.",
    island: "North Malé Atoll, Maldives",
    rating: 5,
    priceFrom: 1550,
    tags: ["Ultra-luxury", "Butler", "Design"],
    gallery: ["/img/rs2.webp", "/img/gl2.webp", "/img/gl3.webp"],
    amenities: [
      "Aris Meeha butler",
      "Fari Marina Village access",
      "Ritz-Carlton Spa",
      "Curated dining",
    ],
    description: `A striking ring-shaped, minimalist resort linked by boardwalks over a clear lagoon—close enough to reach by speedboat, far enough to feel away from it all. Each villa includes Aris Meeha butler service, terraces aimed at the water and generous pools. Guests can hop to Fari Marina Village for extra dining and shopping then retreat to quiet coves and a soothing spa program. It’s a sleek choice for design lovers, couples and anyone prioritising easy transfers without compromising luxury.`,
    coordinates: { lat: null, lng: null },
    contact: {
      phone: null,
      email: null,
      website:
        "https://www.ritzcarlton.com/en/hotels/mlera-the-ritz-carlton-maldives-fari-islands/overview/",
      address: "Fari Islands, North Malé Atoll, Maldives",
    },
    highlights: {
      highlights: [
        "24-hour speedboat access",
        "Aris Meeha butlers",
        "Easy hop to Fari Marina",
      ],
    },
    transfers: {
      airport: "MLE",
      details: [
        {
          mode: "speedboat",
          durationMinutes: 45, // 40–50 depending on sea state
          costUSD: { adult: 1027, child: 514, infant: 0 },
          schedule: "On-demand 24 hours",
          note: "Shared luxury speedboat; fees include service & government taxes.",
        },
      ],
      note: "Seaplane charters on request; most guests choose the 24/7 boat.",
    },
    policies: {
      checkInFrom: "3:00 PM",
      checkOutUntil: "12:00 PM",
      cancellation: "Varies by rate",
      children: {
        allowed: true,
        crib: "Available",
        extraBed: "Available (fee may apply)",
      },
      pets: { allowed: false },
      smoking: "Designated areas only",
      party: "No parties/events",
      paymentMethods: ["Visa", "Mastercard", "Amex", "JCB", "UnionPay"],
    },
    fees: {
      mandatory: [
        {
          label: "Green Tax",
          amount: "USD 12",
          per: "per person, per night (infants <2 exempt)",
        },
      ],
      optional: [
        {
          label: "Roundtrip speedboat",
          amount: "Adult $1,027 / Child $514",
          per: "per person",
        },
      ],
    },
    dining: {
      restaurants: [
        { name: "La Locanda", cuisine: "Italian" },
        { name: "Summer Pavilion", cuisine: "Cantonese" },
        { name: "Iwau", cuisine: "Japanese" },
        { name: "Beach Shack", cuisine: "Mediterranean" },
      ],
      bars: [
        { name: "Eau Bar" },
        { name: "Tum Tum at Fari Marina (street-food style)" },
      ],
    },
    wellness: {
      spa: {
        name: "The Ritz-Carlton Spa",
        highlights: ["Overwater ring-shaped spa", "Holistic rituals"],
      },
      fitness: ["Gym", "Tennis", "Watersports"],
      wellnessPrograms: ["Sound bath", "Yoga & movement"],
    },
    activities: {
      onWater: [
        "Reef snorkelling",
        "Diving",
        "Complimentary non-motorised watersports",
      ],
      onLand: ["Tennis", "Cycling", "Kids’ club programming"],
      forKids: ["Ritz Kids", "Family experiences"],
    },
    rooms: [
      {
        id: "ocean-pool-villa",
        name: "Ocean Pool Villa",
        category: "overwater",
        sizeSqm: null,
        maxOccupancy: 3,
        bedConfig: ["1 King"],
        privatePool: true,
        view: "Ocean",
        features: ["Large sun deck", "Aris Meeha butler", "Direct sea access"],
        photos: ["/img/rs2.webp"],
      },
      {
        id: "beach-pool-villa",
        name: "Beach Pool Villa",
        category: "beach",
        sizeSqm: null,
        maxOccupancy: 3,
        bedConfig: ["1 King"],
        privatePool: true,
        view: "Beach",
        features: ["Private pool", "Garden path to beach"],
        photos: ["/img/gl2.webp"],
      },
    ],
    faqs: [
      {
        title: "How long is the transfer?",
        content:
          "About 45–50 minutes by shared luxury speedboat, operating 24/7.",
      },
      {
        title: "Is a butler included?",
        content: "Yes—Aris Meeha service is standard in all villas.",
      },
    ],
    sustainability: {
      certifications: [],
      practices: ["Plastic reduction", "Local community engagement"],
    },
    nearby: {
      list: [
        {
          name: "Fari Marina Village",
          distance: "Short resort shuttle",
          type: "Dining/Shopping",
        },
      ],
    },
    accessibility: {
      list: ["Buggy service", "Many step-free routes (villa specifics vary)"],
    },
    languages: {
      languagesSpoken: [
        "English",
        "Arabic",
        "Chinese",
        "Russian",
        "French",
        "German",
        "Italian",
        "Japanese",
      ],
    },
    seo: {
      seoTitle:
        "The Ritz-Carlton Maldives, Fari Islands – 24/7 Speedboat Luxury",
      seoDescription:
        "Design-led villas with Aris Meeha butlers, ring-shaped spa and easy 24/7 speedboat transfers to/from Malé.",
    },
  },

  {
    id: "adaaran-prestige-water-villas",
    slug: "adaaran-prestige-water-villas",
    name: "Adaaran Prestige Water Villas",
    img: "/img/rs3.webp",
    short: "Boutique overwater experience with classic Maldives charm.",
    island: "Raa Atoll, Maldives",
    rating: 4.5,
    priceFrom: 750,
    tags: ["Overwater", "Boutique", "Value luxury"],
    gallery: ["/img/rs3.webp", "/img/gl1.webp", "/img/gl2.webp"],
    amenities: [
      "Private sundecks",
      "Butler service",
      "Snorkelling",
      "Excursions",
    ],
    description: `A cosy cluster of overwater villas attached to a larger island—ideal if you want an intimate “all-about-the-villa” feel with access to extra restaurants and facilities next door. Expect glass floor panels, steps into the lagoon and warm service. Seaplane transfers take ~45 minutes by day (with lounge hosting if you wait). If your flights fall outside seaplane hours, domestic + boat options can be arranged on certain routes.`,
    coordinates: { lat: null, lng: null },
    contact: {
      phone: null,
      email: null,
      website: "https://www.adaaran.com/prestigewatervillas/",
      address: "Meedhupparu, Raa Atoll, Maldives",
    },
    highlights: {
      highlights: [
        "Intimate overwater cluster",
        "Access to sister-resort facilities",
        "Good value for honeymoons",
      ],
    },
    transfers: {
      airport: "MLE",
      details: [
        {
          mode: "seaplane",
          durationMinutes: 45,
          costUSD: null,
          schedule: "Daylight hours",
          note: "Check seaplane timing rules; waiting in Adaaran lounge if needed.",
        },
        {
          mode: "domestic+speedboat",
          durationMinutes: 20 + 45, // sample Dharavandhoo + boat used seasonally
          costUSD: null,
          schedule:
            "When seaplane unavailable (seasonal/flight-time dependent)",
          note: "Domestic flight to Dharavandhoo then speedboat to resort.",
        },
      ],
      note: "Seaplane passengers typically must arrive in Malé by ~15:15 and depart after ~09:25; waits up to ~3h are possible.",
    },
    policies: {
      checkInFrom: "2:00 PM",
      checkOutUntil: "12:00 PM",
      cancellation: "Varies by rate/season",
      children: {
        allowed: true,
        crib: "On request",
        extraBed: "On request (fee)",
      },
      pets: { allowed: false },
      smoking: "Designated areas only",
      party: "No parties/events",
      paymentMethods: ["Visa", "Mastercard", "Amex"],
    },
    fees: {
      mandatory: [
        {
          label: "Green Tax",
          amount: "USD 12",
          per: "per person, per night (infants <2 exempt)",
        },
      ],
      optional: [{ label: "Transfers", amount: null, per: "roundtrip" }],
    },
    dining: {
      restaurants: [
        {
          name: "Water Villa Restaurant (guests’ dedicated venue)",
          cuisine: "International & seafood",
        },
        {
          name: "Sister-resort venues",
          cuisine: "A la carte & buffets",
          location: "At Adaaran Select Meedhupparu",
        },
      ],
      bars: [{ name: "Water Villa Bar" }],
    },
    wellness: {
      spa: {
        name: "Mandara Spa (sister-resort complex)",
        highlights: ["Overwater & garden rooms"],
      },
      fitness: ["Gym (sister resort)", "Tennis (sister resort)"],
      wellnessPrograms: [],
    },
    activities: {
      onWater: ["Snorkelling", "Diving (sister dive center)", "Excursions"],
      onLand: ["Tennis (sister resort)", "Beach volleyball"],
      forKids: ["Kids activities at sister resort (selected access)"],
    },
    rooms: [
      {
        id: "water-villa",
        name: "Prestige Water Villa",
        category: "overwater",
        sizeSqm: null,
        maxOccupancy: 3,
        bedConfig: ["1 King"],
        privatePool: false,
        view: "Lagoon",
        features: ["Glass floor", "Steps into lagoon", "Butler service"],
        photos: ["/img/rs3.webp"],
      },
    ],
    faqs: [
      {
        title: "When do seaplanes operate?",
        content:
          "Only in daylight; typical arrival cutoff ~3:15 PM and earliest departure ~9:25 AM.",
      },
      {
        title: "Is the lounge included?",
        content:
          "Yes—guests waiting for seaplanes are hosted at Adaaran’s lounge at MLE.",
      },
    ],
    sustainability: { certifications: [], practices: ["Plastic reduction"] },
    nearby: {
      list: [{ name: "Meedhupparu reef & sandbank trips", type: "Nature" }],
    },
    accessibility: {
      list: ["Boardwalk access to villas (steps down to water)"],
    },
    languages: {
      languagesSpoken: [
        "English",
        "Chinese",
        "Russian",
        "Arabic",
        "German",
        "Italian",
      ],
    },
    seo: {
      seoTitle:
        "Adaaran Prestige Water Villas – Boutique Overwater | Raa Atoll",
      seoDescription:
        "Intimate overwater experience with butler service and sister-resort dining & activity access.",
    },
  },
];

export const getResortBySlug = (slug) => resorts.find((r) => r.slug === slug);
