// lib/pricing.js
export const PACKAGES = {
  honeymoon: { name: "Honeymoon Escape", nightly: 25000 },
  family: { name: "Family Fun Getaway", nightly: 18000 },
  inclusive: { name: "All-Inclusive Retreat", nightly: 22000 },
  wellness: { name: "Wellness & Spa", nightly: 17000 },
  adventure: { name: "Surfing & Diving", nightly: 21000 },
  luxury: { name: "Luxury Overwater", nightly: 42000 },
};

export const ADDONS = {
  sunsetCruise: { name: "Sunset Cruise", price: 6000 },
  spaCredit: { name: "Spa Credit", price: 8000 },
  waterSports: { name: "Water Sports", price: 5000 },
};

export const FEES_RATE = 0.1; // 10% flat
