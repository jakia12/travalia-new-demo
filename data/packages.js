// data/packages.js
export const packages = [
  {
    id: "honeymoon",
    sku: "PK-HNY-001",
    slug: "honeymoon-escape",
    title: "Honeymoon Escape — Private Beach Dinner & Sunset Cruise",
    summary:
      "Romantic 5-night stay with private candle-lit beach dinner and sunset cruise.",
    longDescription: `Designed for just two, this 5-night Maldives honeymoon weaves privacy with small, thoughtful luxuries.
Stay in a deluxe ocean-view suite steps from the water. A dedicated concierge arranges your private
candle-lit beach dinner (custom menu with dietary notes handled in advance) and a 2-hour sunset cruise
with champagne and canapés. A couple’s deep-tissue massage is included, and turndown touches (rose
petals, bubble bath) can be requested.

What to expect: slow mornings, golden-hour photos, and free time to enjoy the beach or add extras
like sandbank picnics or a floating breakfast. Speedboat transfers are arranged around your flight
arrivals. Best season is Nov–Apr; occasional short tropical showers can occur.

Good to know: check-in from 2pm, late check-out on request; reef-safe sunscreen is recommended;
travel insurance strongly advised. The resort can accommodate vegetarian, vegan, halal and gluten-free menus.`,
    location: {
      country: "Maldives",
      region: "North Atoll",
      city: "Private Island Resort",
    },
    geo: { lat: 3.2028, lng: 73.2207 },
    highlights: [
      "Private sunset cruise",
      "Couples spa",
      "Candlelight beach dinner",
      "Ocean-view suite",
    ],
    category: "romance",
    tags: ["honeymoon", "beach", "luxury", "couples"],
    price: { from: 1250, currency: "USD", per: "person", includesTaxes: false },
    durationDays: 5,
    nights: 4,
    minGuests: 2,
    maxGuests: 2,
    availability: [
      { from: "2025-11-01", to: "2026-04-30", seatsLeft: 12 },
      { from: "2026-11-01", to: "2027-04-30", seatsLeft: 20 },
    ],
    accommodation: [
      {
        name: "Deluxe Ocean View Suite",
        category: "5-star",
        boardBasis: "Bed & Breakfast",
        roomsIncluded: 1,
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description:
          "Speedboat transfer, welcome drink, evening at leisure (private turndown).",
        included: true,
      },
      {
        day: 2,
        title: "Spa & Beach Time",
        description: "Couple's deep-tissue massage and afternoon on the beach.",
        included: true,
      },
      {
        day: 3,
        title: "Sunset Cruise",
        description: "Private sunset cruise with champagne (approx 2 hours).",
        included: true,
      },
      {
        day: 4,
        title: "Free Day + Private Dinner",
        description:
          "Day at leisure. Private candlelight dinner on the beach in the evening.",
        included: true,
      },
      {
        day: 5,
        title: "Departure",
        description: "Breakfast and speedboat transfer to airport.",
        included: true,
      },
    ],
    inclusions: [
      "Daily breakfast",
      "Round-trip speedboat transfers from Malé",
      "Private sunset cruise (2 hours)",
      "One couples spa treatment",
      "Private candlelight dinner (one evening)",
    ],
    exclusions: [
      "International flights",
      "Travel insurance",
      "Visa fees",
      "Personal expenses and gratuities",
    ],
    meals: { included: ["Breakfast"], specialDietAvailable: true },
    transport: {
      transfersIncluded: true,
      provider: "Resort Transfers",
      notes: "Speedboat schedules subject to tide/time",
    },
    pickupPoint: "Velana International Airport (MLE) arrival gate",
    physicalDifficulty: "easy",
    suitableForKids: false,
    cancellationPolicy:
      "Free cancellation up to 21 days before arrival. 50% charge 14-21 days. 100% within 14 days. Supplier terms apply.",
    paymentTerms: "25% deposit to confirm, balance due 45 days before arrival",
    supplier: { name: "Coral Isle Resorts", supplierId: "CORAL-100" },
    rating: 4.8,
    reviewsCount: 214,
    featuredReview: {
      author: "Anna R.",
      date: "2025-07-12",
      text: "Perfect honeymoon — every detail was flawless.",
    },
    img: "/pk1.webp",
    images: ["/pk1.webp"],
    seo: {
      metaTitle: "Honeymoon Escape — 5 nights | Private Dinner & Cruise",
      metaDescription:
        "Book a romantic Maldives honeymoon: private dinner on the beach, couples spa, sunset cruise. Deluxe ocean-view suites.",
    },
    createdAt: "2025-06-01T10:00:00Z",
    updatedAt: "2025-06-14T09:00:00Z",
    visible: true,
  },

  {
    id: "family",
    sku: "PK-FAM-002",
    slug: "family-fun-getaway",
    title: "Family Fun Getaway — Kids Club + Water Sports",
    summary:
      "4-night family package at a kids-friendly resort with activities, water sports and family suite.",
    longDescription: `A relaxed 4-night family base in Bali’s Nusa Dua with space to breathe and activities that keep kids happy.
Your family suite sleeps up to 2 adults and 2 children comfortably, with cribs and bed rails available on request.
The supervised Kids Club (ages 4–11) runs 9:00–17:00 with crafts, pool games, and Balinese culture mini-workshops.
One guided family snorkel trip with equipment is included; buoyancy vests are provided for little swimmers.

Dining is easy: breakfast daily for everyone, plus one hosted family dinner (day 2). Strollers and bottle-warmers
are available from concierge. Babysitting can be arranged (extra cost) for date-night dinners.

Logistics & tips: return airport transfers are included; driving times vary with traffic (30–60 min).
The beach is generally calm in the morning; pack reef shoes and SPF. The resort caters to allergies
with prior notice.`,
    location: { country: "Indonesia", region: "Bali", city: "Nusa Dua" },
    geo: { lat: -8.8064, lng: 115.2176 },
    highlights: [
      "Kids club",
      "Snorkeling trips",
      "Family suite",
      "Free kids under 5",
    ],
    category: "family",
    tags: ["family", "beach", "kids-club"],
    price: { from: 980, currency: "USD", per: "family", includesTaxes: true },
    durationDays: 4,
    nights: 3,
    minGuests: 2,
    maxGuests: 6,
    availability: [{ from: "2025-06-01", to: "2026-12-31", seatsLeft: 30 }],
    accommodation: [
      {
        name: "Family Suite (2 adults + 2 kids)",
        category: "4-star",
        boardBasis: "Half Board",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Kids Welcome",
        description: "Transfer and introduction to kids club.",
        included: true,
      },
      {
        day: 2,
        title: "Snorkel Trip",
        description:
          "Half-day boat snorkeling with family guide (equipment included).",
        included: true,
      },
      {
        day: 3,
        title: "Free Day + Optional Cooking Class",
        description: "Optional Balinese family cooking class (extra cost).",
        included: false,
      },
      {
        day: 4,
        title: "Departure",
        description: "Check-out and transfer to airport.",
        included: true,
      },
    ],
    inclusions: [
      "Daily breakfast for all",
      "One family snorkeling trip (equipment included)",
      "Kids club supervision 9:00–17:00",
      "Return airport transfers",
    ],
    exclusions: [
      "International flights",
      "Optional experiences",
      "Travel insurance",
    ],
    meals: {
      included: ["Breakfast", "1x Dinner on day 2"],
      specialDietAvailable: true,
    },
    transport: { transfersIncluded: true },
    pickupPoint: "Ngurah Rai International Airport (DPS)",
    physicalDifficulty: "easy",
    suitableForKids: true,
    cancellationPolicy: "Free cancellation 30 days prior. 100% within 30 days.",
    paymentTerms: "Full prepayment for certain blackout dates",
    supplier: { name: "Bali Family Resorts", supplierId: "BFR-042" },
    rating: 4.5,
    reviewsCount: 128,
    featuredReview: {
      author: "The Martins",
      date: "2025-03-05",
      text: "Kids loved the club — staff were great.",
    },
    img: "/pk2.webp",
    images: ["/pk2.webp"],
    seo: {
      metaTitle: "Family Fun Getaway in Bali — Kids Club & Snorkeling",
      metaDescription:
        "Family-friendly 4-night Bali package with kids club, snorkeling trip and family suite. Kids under 5 stay free.",
    },
    createdAt: "2025-05-10T09:00:00Z",
    updatedAt: "2025-06-10T09:00:00Z",
    visible: true,
  },

  {
    id: "inclusive",
    sku: "PK-AIR-003",
    slug: "all-inclusive-retreat",
    title: "All-Inclusive Retreat — Meals, Drinks & Transfers Included",
    summary:
      "6-night all-inclusive stay with airport transfers, open bar and daily activities.",
    longDescription: `No surprises at check-out: this 6-night Phuket stay covers all meals, house beverages, return transfers,
and a rotating set of daily activities. Expect generous buffets + à la carte options, live-cooking stations,
and a selection of non-alcoholic and house alcoholic drinks under the open-bar policy (premium labels available at extra cost).

Included experiences often feature yoga or stretch classes, non-motorized water sports (SUPs, kayaks),
Thai cooking demo (day 3), and evening entertainment. You’ll have one curated island day on offer
(upgradeable to a full private boat trip).

Practicalities: airport transfers (HKT) both ways, 24/7 front desk, and a cashless bracelet system on property.
If you prefer quieter rooms, request higher floors away from the stage. Standard cancellation is 30 days free,
with seasonal exceptions.`,
    location: { country: "Thailand", region: "Phuket", city: "Patong" },
    geo: { lat: 7.901, lng: 98.3381 },
    highlights: [
      "All meals",
      "Open bar",
      "Airport transfers",
      "Daily activities",
    ],
    category: "all-inclusive",
    tags: ["resort", "all-inclusive"],
    price: { from: 1150, currency: "USD", per: "person", includesTaxes: true },
    durationDays: 6,
    nights: 5,
    minGuests: 1,
    maxGuests: 4,
    availability: [{ from: "2025-09-01", to: "2026-09-01", seatsLeft: 40 }],
    accommodation: [
      {
        name: "Standard Sea View Room",
        category: "4-star",
        boardBasis: "All Inclusive",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Welcome",
        description: "Transfer and resort orientation.",
        included: true,
      },
      {
        day: 2,
        title: "Island Excursion (optional)",
        description: "Full-day island cruise (extra cost).",
        included: false,
      },
      {
        day: 3,
        title: "Cooking Demo",
        description: "Thai cooking demo (included).",
        included: true,
      },
      {
        day: 4,
        title: "Spa Day",
        description: "Discounted spa options for guests.",
        included: false,
      },
      {
        day: 5,
        title: "Leisure Day",
        description: "Enjoy resort facilities.",
        included: true,
      },
      {
        day: 6,
        title: "Departure",
        description: "Check-out and transfer to airport.",
        included: true,
      },
    ],
    inclusions: [
      "All meals & house drinks",
      "Return airport transfers",
      "Selected daily activities",
    ],
    exclusions: [
      "International flights",
      "Premium drinks",
      "Private experiences",
    ],
    meals: {
      included: ["Breakfast", "Lunch", "Dinner"],
      specialDietAvailable: true,
    },
    transport: { transfersIncluded: true },
    pickupPoint: "Phuket International Airport (HKT)",
    physicalDifficulty: "easy",
    suitableForKids: true,
    cancellationPolicy:
      "Variable by season; standard 30-day free cancellation on regular dates.",
    paymentTerms: "Deposit required; full payment 30 days prior",
    supplier: { name: "Sunset Resorts Group", supplierId: "SRG-300" },
    rating: 4.3,
    reviewsCount: 432,
    img: "/pk3.webp",
    images: ["/pk3.webp"],
    seo: {
      metaTitle: "All-Inclusive Retreat in Phuket — 6 Nights",
      metaDescription:
        "6-night all-inclusive in Phuket with meals, drinks and airport transfers.",
    },
    createdAt: "2025-04-01T08:00:00Z",
    updatedAt: "2025-05-20T12:30:00Z",
    visible: true,
  },

  {
    id: "wellness",
    sku: "PK-WELL-004",
    slug: "wellness-and-spa",
    title: "Wellness & Spa Reset — Detox, Yoga & Massage",
    summary:
      "Short 3-day detox and yoga retreat with deep tissue massage and health-focused menu.",
    longDescription: `Three days in South Goa built for a gentle reset. After a short intake with the resort nutritionist,
your plan includes daily guided yoga (morning flow + breathwork), a tailored detox menu (plant-forward,
low-inflammatory options available), unlimited herbal teas, and one restorative deep-tissue massage.
Mindfulness sessions and beach walks are optional and complimentary.

Pace & suitability: suitable for beginners; sessions are 60–75 minutes and capped to small groups.
Digital-detox amenities (silent corners, no-phone dining tables) can be opted into. The program is
not a medical treatment; guests with specific conditions should consult their doctor prior to travel.

Extras: airport transfers can be added; private consultations (ayurvedic doctor, nutrition coaching)
are available on request.`,
    location: { country: "India", region: "Goa", city: "South Goa" },
    geo: { lat: 15.2993, lng: 74.124 },
    highlights: ["Daily yoga", "Detox menu", "Deep tissue massage"],
    category: "wellness",
    tags: ["wellness", "spa", "yoga", "detox"],
    price: { from: 890, currency: "USD", per: "person", includesTaxes: false },
    durationDays: 3,
    nights: 2,
    minGuests: 1,
    maxGuests: 20,
    availability: [{ from: "2025-07-01", to: "2025-12-31", seatsLeft: 10 }],
    accommodation: [
      {
        name: "Wellness Cottage",
        category: "Boutique",
        boardBasis: "Wellness Board",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Intake",
        description: "Health intake with nutritionist, evening yoga.",
        included: true,
      },
      {
        day: 2,
        title: "Detox Day",
        description:
          "Morning yoga, detox meals, afternoon spa session (massage).",
        included: true,
      },
      {
        day: 3,
        title: "Reflection & Departure",
        description: "Guided breathwork and checkout.",
        included: true,
      },
    ],
    inclusions: [
      "2 x yoga sessions",
      "1 x deep tissue massage",
      "Detox menu",
      "Complimentary herbal teas",
    ],
    exclusions: ["Flights", "Private therapy sessions"],
    meals: { included: ["Detox meals"], specialDietAvailable: true },
    transport: {
      transfersIncluded: false,
      notes: "Airport transfer available on request (extra cost)",
    },
    pickupPoint: "Dabolim Airport (GOI)",
    physicalDifficulty: "moderate",
    suitableForKids: false,
    cancellationPolicy:
      "50% refund if cancelled 14-30 days prior. No refund within 14 days.",
    paymentTerms: "50% deposit to confirm.",
    supplier: { name: "Serene Escapes", supplierId: "SER-210" },
    rating: 4.7,
    reviewsCount: 78,
    img: "/pk4.webp",
    images: ["/pk4.webp"],
    seo: {
      metaTitle: "Wellness & Spa Retreat in Goa — Detox & Yoga",
      metaDescription:
        "3-day wellness retreat in Goa with yoga, detox menu and deep tissue massage.",
    },
    createdAt: "2025-06-05T07:30:00Z",
    updatedAt: "2025-06-14T09:00:00Z",
    visible: true,
  },

  {
    id: "adventure",
    sku: "PK-AEG-005",
    slug: "aegean-adventure",
    title: "Aegean Adventure — Island Hopping & Cliff Walks",
    summary:
      "5-day island hopping in Santorini and nearby isles with snorkeling and coastal hikes.",
    longDescription: `Island-hop the Cyclades on a compact 5-day plan balancing sea time, cliff walks and local flavors.
Start with a short orientation in Santorini, then ride boats to neighboring isles for swimming and snorkeling
(gear included on guided days). A coastal hike leads to a family-run vineyard for tastings and mezze.

Rhythm & effort: most hikes are moderate with coastal sun exposure; start early when possible.
Ferries are subject to weather, so your leader may adjust timings.

What to pack: lightweight layers, windproof jacket for boat days, hat, refillable bottle, and reef-safe sunscreen.
Optional extras like intro scuba can be arranged on free days.`,
    location: { country: "Greece", region: "Cyclades", city: "Santorini" },
    geo: { lat: 36.3932, lng: 25.4615 },
    highlights: ["Boat tour", "Snorkel set", "Cliff walk"],
    category: "adventure",
    tags: ["island-hopping", "snorkeling", "hiking"],
    price: { from: 1020, currency: "USD", per: "person", includesTaxes: false },
    durationDays: 5,
    nights: 4,
    minGuests: 1,
    maxGuests: 12,
    availability: [{ from: "2025-05-01", to: "2025-10-31", seatsLeft: 8 }],
    accommodation: [
      {
        name: "Seaview Guesthouse",
        category: "3-star",
        boardBasis: "Bed & Breakfast",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "Arrival & Orientation",
        description: "Meet & greet, short orientation walk",
        included: true,
      },
      {
        day: 2,
        title: "Boat Hopping",
        description: "Full-day island hop & snorkeling",
        included: true,
      },
      {
        day: 3,
        title: "Cliff Walk & Vineyard",
        description: "Coastal cliff walk followed by local vineyard visit",
        included: true,
      },
      {
        day: 4,
        title: "Free Day",
        description: "Optional extra: Scuba intro (extra cost)",
        included: false,
      },
      {
        day: 5,
        title: "Departure",
        description: "Check-out and transfers.",
        included: true,
      },
    ],
    inclusions: [
      "Selected boat transfers",
      "Guided cliff walk",
      "Snorkel equipment on included days",
    ],
    exclusions: [
      "International travel",
      "Optional scuba intro",
      "Personal expenses",
    ],
    meals: { included: ["Breakfast"], specialDietAvailable: true },
    transport: {
      transfersIncluded: false,
      notes:
        "Local ferries used for island hops. Times subject to local ferry schedule.",
    },
    pickupPoint: "Santorini (Thira) Port / Airport",
    physicalDifficulty: "active",
    suitableForKids: false,
    cancellationPolicy:
      "Standard operator policy: partial refund up to 30 days prior, variable in high season.",
    paymentTerms: "Deposit 30% to reserve; balance due 60 days before travel.",
    supplier: { name: "Aegean Trails", supplierId: "AEG-88" },
    rating: 4.6,
    reviewsCount: 56,
    img: "/pk5.webp",
    images: ["/pk5.webp"],
    seo: {
      metaTitle: "Aegean Adventure — Santorini Island Hopping",
      metaDescription:
        "5-day island hopping with snorkeling, cliff walks and local food in Santorini.",
    },
    createdAt: "2025-05-08T06:00:00Z",
    updatedAt: "2025-06-01T08:40:00Z",
    visible: true,
  },

  {
    id: "luxury",
    sku: "PK-LUX-006",
    slug: "luxury-overwater",
    title: "Luxury Overwater Villa — Butler, Private Pool & Glass Floor",
    summary:
      "5-night overwater villa experience with private pool, butler service and bespoke excursions.",
    longDescription: `A Bora Bora classic: 5 nights in an overwater villa with a private plunge pool and glass-floor panels for reef viewing.
Butler service takes care of everything from in-villa breakfast to sunset set-ups on the deck. A private lagoon cruise
with snorkeling and a gourmet picnic is included, with further bespoke experiences available on request (heli-tours,
pearling visits, private chefs).

Style & pace: restful days with the option to dial up the wow. Expect lagoon breezes and stargazing nights.
Seaplane transfers operate with luggage limits; soft bags recommended.

Good to know: half-board dining is included; premium wines/spirits are extra. This experience is best for couples and
quiet-seekers; families are welcome but there are limited child-focused facilities.`,
    location: {
      country: "French Polynesia",
      region: "Bora Bora",
      city: "Bora Bora Lagoon",
    },
    geo: { lat: -16.5004, lng: -151.7415 },
    highlights: ["Butler service", "Private pool", "Glass floor"],
    category: "luxury",
    tags: ["overwater", "luxury", "butler"],
    price: { from: 2250, currency: "USD", per: "person", includesTaxes: false },
    durationDays: 5,
    nights: 4,
    minGuests: 1,
    maxGuests: 4,
    availability: [{ from: "2025-10-01", to: "2026-04-30", seatsLeft: 6 }],
    accommodation: [
      {
        name: "Overwater Villa with Private Pool",
        category: "Luxury",
        boardBasis: "Half Board",
      },
    ],
    itinerary: [
      {
        day: 1,
        title: "VIP Arrival",
        description:
          "Seaplane transfer, private check-in and champagne welcome.",
        included: true,
      },
      {
        day: 2,
        title: "Lagoon Excursion",
        description: "Private lagoon cruise with snorkeling and picnic.",
        included: true,
      },
      {
        day: 3,
        title: "At Leisure",
        description: "Butler can arrange private dining experiences.",
        included: false,
      },
      {
        day: 4,
        title: "Spa & Sunset",
        description: "In-villa spa treatment and sunset dinner.",
        included: true,
      },
      {
        day: 5,
        title: "Departure",
        description: "Seaplane transfer to airport.",
        included: true,
      },
    ],
    inclusions: [
      "Daily breakfast",
      "Seaplane transfers (one-way or return as specified)",
      "One private lagoon excursion",
    ],
    exclusions: [
      "International flights",
      "Premium transfers",
      "Some experiences on demand",
    ],
    meals: { included: ["Breakfast"], specialDietAvailable: true },
    transport: {
      transfersIncluded: "seaplane",
      notes: "Seaplane luggage limits apply.",
    },
    pickupPoint: "Bora Bora Airport (BOB)",
    physicalDifficulty: "easy",
    suitableForKids: false,
    cancellationPolicy:
      "Strict — non-refundable within 45 days for peak season; check supplier terms.",
    paymentTerms: "50% deposit; full payment 45 days prior",
    supplier: { name: "Lagoon Luxe", supplierId: "LLX-77" },
    rating: 4.9,
    reviewsCount: 89,
    img: "/pk6.webp",
    images: ["/pk6.webp"],
    seo: {
      metaTitle: "Luxury Overwater Villa in Bora Bora — Butler Service",
      metaDescription:
        "Overwater villas with private pool, glass floor and butler service. Book a luxury getaway.",
    },
    createdAt: "2025-03-22T10:00:00Z",
    updatedAt: "2025-06-02T09:10:00Z",
    visible: true,
  },
];

export const getPackageBySlug = (slug) => packages.find((p) => p.slug === slug);
