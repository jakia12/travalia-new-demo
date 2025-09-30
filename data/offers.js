// data/offers.js
export const offers = [
  {
    id: "waldorf-astoria-ithaafushi-30",
    slug: "waldorf-astoria-ithaafushi-30-off",
    resort: "Waldorf Astoria Maldives Ithaafushi",
    title: "30% Off + Daily Breakfast + Return Yacht Transfer Credit",
    teaser: "Save 30% on select villas with breakfast included.",
    img: "/img/offers/1.webp",
    badges: ["Luxury", "Breakfast", "Yacht Transfer Credit"],
    heroNote: "Limited villas per night at promotional rate.",
    summary:
      "Waldorf Astoria Maldives Ithaafushi spans multiple private islets with a polished, residential style and genuinely attentive butler service. With this offer, you get 30% off selected villas, daily breakfast for two, and a handy credit toward the resort’s luxury yacht transfers—so arrival logistics are smoother and more affordable. Villas all include private pools and generous outdoor living; choose between reef-sheltered beach options or glassy-lagoon overwater sanctuaries. Dining is a highlight with a deep lineup of venues (treetop pods, Middle-Eastern courtyards, Japanese counters) and strong wine and dessert programs. Days tilt between reef snorkeling, sandbank picnics, and the overwater spa; evenings lean intimate and culinary. If you want quiet privacy, high-touch service, and destination dining, this package stacks meaningful value on a flagship luxury island.",
    discount: { type: "percentage", value: 30, appliesTo: "select villas" },
    bookWindow: { from: "2025-01-01", to: "2025-03-31" },
    stayWindow: { from: "2025-01-10", to: "2025-12-20" },
    blackoutDates: ["2025-04-01..2025-04-15", "2025-08-01..2025-08-20"],
    minStay: 3,
    eligibleRooms: [
      "King Reef Villa",
      "Overwater Villa with Pool",
      "Grand Reef Villa with Pool",
    ],
    board: "BB (Daily Breakfast)",
    transfers: {
      included: false,
      type: "Luxury Yacht",
      notes:
        "Return yacht transfers chargeable; USD 200 credit per adult and USD 100 per child applied on arrival under this offer.",
    },
    kidsPolicy: "Under 12 stay free using existing bedding; breakfast charged.",
    bonuses: [
      "USD 200 per adult transfer credit (USD 100 per child)",
      "20% off spa treatments (once per stay)",
      "Welcome amenities on arrival",
    ],
    priceExample: {
      currency: "USD",
      perNightFrom: 1650,
      exampleStayNights: 3,
      taxesNote: "Subject to 10% service charge, 16% GST, and Green Tax.",
    },
    terms: [
      "Limited availability; rate varies by date and villa.",
      "Blackout dates apply; see above.",
      "Not combinable with other promotional rates.",
      "Full prepayment may be required for peak dates.",
      "Standard resort cancellation policy unless stated on rate plan.",
    ],
    faq: [
      {
        q: "Can I upgrade to half board?",
        a: "Yes, half board can be added for a nightly supplement per person, payable at the resort.",
      },
      {
        q: "Is the transfer credit automatic?",
        a: "Yes, it is applied to your transfer bill on arrival when booked on this offer.",
      },
    ],
    ctaPackageId: "luxury",
  },

  {
    id: "hilton-amingiri-25",
    slug: "hilton-maldives-amingiri-25-off",
    resort: "Hilton Maldives Amingiri Resort & Spa",
    title: "25% Off + Half Board + Free Speedboat Transfers",
    teaser: "Save 25% with half board and return speedboat transfers.",
    img: "/img/offers/2.webp",
    badges: ["Family Friendly", "Half Board", "Transfers Included"],
    heroNote: "Free transfers for two adults on stays of 3+ nights.",
    summary:
      "Just a short speedboat from Malé, Hilton Amingiri balances easy access with contemporary villas and a laid-back social energy. This offer combines 25% off selected villas, daily breakfast and dinner (half board) in main venues, and complimentary return speedboat transfers for two adults on stays of three nights or more. Most villas feature private pools, shaded decks, and direct lagoon or beach access; family layouts add space and bunk options. Expect a well-run kids’ club and teen zone, calm shoals for paddling, and a spa and fitness program for adults. Specialty restaurants are available with modest supplements, so you can mix casual buffets with à-la-carte nights. For families and first-timers who want to maximize beach time with minimal transfer stress, Amingiri is a pragmatic, good-value pick.",
    discount: { type: "percentage", value: 25, appliesTo: "select villas" },
    bookWindow: { from: "2025-01-01", to: "2025-06-30" },
    stayWindow: { from: "2025-01-05", to: "2025-12-15" },
    blackoutDates: ["2025-02-10..2025-02-20"],
    minStay: 3,
    eligibleRooms: [
      "One Bedroom Overwater Pool Villa",
      "Beach Pool Villa",
      "Family Beach Pool Villa",
    ],
    board: "HB (Breakfast & Dinner)",
    transfers: {
      included: true,
      type: "Speedboat",
      notes:
        "Two adults included; children charged at resort’s child transfer rate.",
    },
    kidsPolicy:
      "Children under 12 share existing bedding free; kids’ menu available.",
    bonuses: ["Complimentary non-motorized water sports", "Kids club access"],
    priceExample: {
      currency: "USD",
      perNightFrom: 820,
      exampleStayNights: 4,
      taxesNote: "Taxes & Green Tax payable per local regulation.",
    },
    terms: [
      "Dinner taken in designated venues; supplements apply in specialty outlets.",
      "Free transfers apply to first two adults; extra guests charged.",
      "Subject to availability; limited rooms per night.",
    ],
    faq: [
      {
        q: "Are drinks included with dinner?",
        a: "Still water, tea and coffee are included; other beverages are chargeable.",
      },
    ],
    ctaPackageId: "family",
  },

  {
    id: "oblu-ailafushi-20",
    slug: "oblu-xperience-ailafushi-20-off",
    resort: "OBLU XPERIENCE Ailafushi",
    title: "AI Plan: 20% Off + Free Speedboat Transfers",
    teaser: "All-Inclusive (Fushi Plan), 20% off, transfers included.",
    img: "/img/offers/3.webp",
    badges: ["All Inclusive", "Transfers Included", "Great Value"],
    heroNote: "Perfect for families close to Malé.",
    summary:
      "OBLU Ailafushi keeps the math simple with its Fushi Plan: meals, selected beverages, and curated activities bundled for predictable spend. This deal adds 20% off and complimentary return speedboat transfers, so short trips and long weekends feel effortless. Rooms are bright and functional; beach categories suit families while compact overwaters fit couples who want that classic jetty stroll. Expect upbeat entertainment, a kid-forward pool scene, shallow sandy entries for swimmers, and easy snorkel dips off the jetty. Dining rotates buffets and live stations with plenty of fresh grills and Maldivian staples. If you prefer friendly, budget-savvy islands with no surprise bills—and fast access from the airport—Ailafushi is tough to beat.",
    discount: {
      type: "percentage",
      value: 20,
      appliesTo: "all room types",
    },
    bookWindow: { from: "2025-01-01", to: "2025-12-10" },
    stayWindow: { from: "2025-01-10", to: "2025-12-20" },
    blackoutDates: [],
    minStay: 2,
    eligibleRooms: ["Ocean View Room", "Water Villa"],
    board: "All-Inclusive (Fushi Plan)",
    transfers: {
      included: true,
      type: "Speedboat",
      notes: "Return transfers for all guests on this offer.",
    },
    kidsPolicy:
      "Kids under 12 stay & eat free from kids’ menu (restrictions apply).",
    bonuses: ["Complimentary snorkeling gear", "Daily entertainment"],
    priceExample: {
      currency: "USD",
      perNightFrom: 420,
      exampleStayNights: 3,
      taxesNote: "Local taxes apply.",
    },
    terms: ["Plan inclusions per hotel policy; blackout dates may apply."],
    faq: [
      {
        q: "What’s included in Fushi Plan?",
        a: "Meals, beverages, and selected activities. Premium items may carry supplements.",
      },
    ],
    ctaPackageId: "inclusive",
  },

  {
    id: "anantara-veli-15",
    slug: "anantara-veli-15-off-water-villas",
    resort: "Anantara Veli Maldives Resort",
    title: "Adults-Only: 15% Off Water Villas + Spa Perks",
    teaser: "Save 15% and enjoy spa savings at this serene adults-only island.",
    img: "/img/offers/4.webp",
    badges: ["Adults Only", "Wellness", "Water Villas"],
    heroNote: "Guests must be 18+.",
    summary:
      "Anantara Veli is a calm, adults-only cove a quick speedboat from Malé, known for photogenic overwater bungalows and a wellness-first tone. With 15% off water villas, daily breakfast, and a one-time spa discount, this offer makes a restorative escape more attainable. Morning yoga sessions and lagoon paddles set the pace; by afternoon, slip into the spa, snorkel the house reef, or hop to sister islands for extra dining variety. Evenings are low-key, with mood lighting and quiet beaches rather than DJ decks. If your brief is minimal transfers, quiet water, and spa-leaning days with the option to add half board, Veli hits the sweet spot for couples and honeymooners.",
    discount: { type: "percentage", value: 15, appliesTo: "water villas" },
    bookWindow: { from: "2025-02-01", to: "2025-07-31" },
    stayWindow: { from: "2025-02-10", to: "2025-12-15" },
    blackoutDates: ["2025-08-10..2025-08-20"],
    minStay: 2,
    eligibleRooms: ["Overwater Bungalow", "Superior Overwater Bungalow"],
    board: "BB (Daily Breakfast)",
    transfers: {
      included: false,
      type: "Speedboat",
      notes: "Chargeable per resort rates.",
    },
    kidsPolicy: "Adults-only resort (18+).",
    bonuses: ["15% off spa (once per stay)", "Complimentary yoga (schedule)"],
    priceExample: {
      currency: "USD",
      perNightFrom: 750,
      exampleStayNights: 3,
      taxesNote: "Service charge, GST and Green Tax apply.",
    },
    terms: ["Minimum age 18.", "Spa discount once per stay, non-transferable."],
    faq: [
      {
        q: "Can I add half board?",
        a: "Yes, half board can be added for a nightly supplement.",
      },
    ],
    ctaPackageId: "wellness",
  },

  {
    id: "hard-rock-10",
    slug: "hard-rock-hotel-maldives-free-transfers-10-off",
    resort: "Hard Rock Hotel Maldives",
    title: "Free Speedboat Transfers + 10% Off + Resort Credit",
    teaser: "Live-music vibe with transfers included and nightly credit.",
    img: "/img/offers/5.webp",
    badges: ["Transfers Included", "Resort Credit", "Fun Vibe"],
    heroNote: "Great for active couples and families.",
    summary:
      "Hard Rock Hotel Maldives sits at the heart of CROSSROADS, giving you a lively marina scene and easy dining variety within steps of a classic lagoon. This package folds in 10% savings, complimentary return speedboat transfers for two, and a nightly resort credit that can offset dinners, drinks, or activities. Studios and villas skew playful and practical, with shallow entries for swimmers and quick access to non-motorized watersports. Expect live sets, family programming, and brand staples like Sound of Your Stay; retreat to Rock Spa when it’s time to decompress. For guests who want convenience, entertainment, and perks that translate into tangible on-island value, this is a fun, flexible choice near Malé.",
    discount: { type: "percentage", value: 10, appliesTo: "most villas" },
    bookWindow: { from: "2025-01-01", to: "2025-09-30" },
    stayWindow: { from: "2025-01-05", to: "2025-12-20" },
    blackoutDates: [],
    minStay: 3,
    eligibleRooms: [
      "Silver Sky Studio",
      "Gold Beach Villa",
      "Platinum Overwater Villa",
    ],
    board: "BB (Daily Breakfast)",
    transfers: {
      included: true,
      type: "Speedboat",
      notes: "Two adults included; extras charged.",
    },
    kidsPolicy:
      "Kids club complimentary; kids eat free from kids’ menu in main venues.",
    bonuses: ["USD 50 nightly resort credit", "Non-motorized watersports"],
    priceExample: {
      currency: "USD",
      perNightFrom: 520,
      exampleStayNights: 4,
      taxesNote: "Local taxes apply.",
    },
    terms: ["Credit not redeemable for cash; unused credit is forfeited."],
    faq: [
      {
        q: "Is CROSSROADS access included?",
        a: "Yes, guests can access outlets across the marina as per resort policy.",
      },
    ],
    ctaPackageId: "adventure",
  },

  {
    id: "soneva-jani-20",
    slug: "soneva-jani-up-to-20-off-suites",
    resort: "Soneva Jani",
    title: "Up to 20% Off Soneva Jani Suites + Half Board",
    teaser: "Ultra-luxury with half board and signature experiences.",
    img: "/img/offers/6.webp",
    badges: ["Ultra-Luxury", "Half Board", "Experiences"],
    heroNote: "Highly limited availability.",
    summary:
      "Soneva Jani delivers the archetypal picture-book Maldives: vast water retreats (many with slides), barefoot-luxury design, and a sustainability ethos that actually informs the experience. With up to 20% off and daily half board, this rare offer lowers the bar to entry on a bucket-list island. Days blur into boardwalk cycles, snorkel sorties, and stargazing at the observatory before a movie at Cinema Paradiso; the famed chocolate and ice-cream rooms are delightfully real. Many activities fall under Soneva’s ‘In-cluded’ concept, while private dining and signature experiences can be layered on. If your definition of luxury is time, space, and thoughtful detail, Jani is worth planning around—especially when the calendar aligns with this saving.",
    discount: {
      type: "up_to_percentage",
      value: 20,
      appliesTo: "select suites",
    },
    bookWindow: { from: "2025-01-15", to: "2025-05-31" },
    stayWindow: { from: "2025-02-01", to: "2025-12-15" },
    blackoutDates: ["2025-12-01..2025-12-15"],
    minStay: 4,
    eligibleRooms: ["One Bedroom Water Retreat", "Two Bedroom Water Retreat"],
    board: "HB (Breakfast & Dinner)",
    transfers: {
      included: false,
      type: "Seaplane",
      notes: "Chargeable per resort rates.",
    },
    kidsPolicy: "Children of all ages welcome; extensive kids’ programs.",
    bonuses: ["Soneva ‘In-cluded’ experiences", "Chocolate & ice-cream rooms"],
    priceExample: {
      currency: "USD",
      perNightFrom: 2900,
      exampleStayNights: 4,
      taxesNote: "Service charge, GST and Green Tax apply.",
    },
    terms: [
      "Offer varies by suite and travel date.",
      "Half board dinner venues per resort policy.",
    ],
    faq: [
      {
        q: "Are experiences unlimited?",
        a: "Many are complimentary; premium/private experiences may incur a charge.",
      },
    ],
    ctaPackageId: "luxury",
  },
];

export const getOfferBySlug = (slug) => offers.find((o) => o.slug === slug);
