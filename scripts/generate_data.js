const fs = require('fs');
const path = require('path');

const locations = [
  // Gurgaon
  {
    name: "Golf Course Road", slug: "golf-course-road", city: "Gurgaon", coordinates: [28.445, 77.098],
    livability_score: 9.2, safety_score: 9.0, connectivity_score: 9.5,
    insights: {
      water: "Consistent private supply, minimal municipal issues",
      safety: "High security, frequent police patrolling",
      transport: "Superb via Rapid Metro and wide roads",
      metro_distance: "0 km (Multiple Rapid Metro stations)",
      aqi: "Moderate to Poor",
      markets: "South Point Mall, Horizon Center",
      schools: "Shiv Nadar, Lancers International"
    },
    pros: ["Premium lifestyle", "Excellent dining and commercial hubs", "A-grade infrastructure"],
    cons: ["Very high cost of living", "Traffic during peak office hours"],
    faq: [{ question: "Is Golf Course Road the best area to live in Gurgaon?", answer: "Yes, it is considered the most premium and well-connected micro-market in Gurgaon." }]
  },
  {
    name: "Golf Course Extension Road", slug: "golf-course-extension-road", city: "Gurgaon", coordinates: [28.397, 77.073],
    livability_score: 8.5, safety_score: 8.5, connectivity_score: 8.0,
    insights: {
      water: "Reliable in premium societies; some water logging on main roads during heavy rain",
      safety: "Good within gated communities, moderate outside at night",
      transport: "Dependent on personal vehicles; public transport is limited",
      metro_distance: "3.5 km",
      aqi: "Poor during winter",
      markets: "M3M Urbana, AIPL Joy Street",
      schools: "St. Xavier's, DPS International"
    },
    pros: ["Modern luxury apartments", "Less congested than central Gurgaon", "Good future appreciation"],
    cons: ["Water logging during monsoons", "Heavy traffic near Vatika Chowk"],
    faq: [{ question: "Is Golf Course Extension Road good for rent?", answer: "Yes, for those who seek modern amenities and don't mind relying on cars." }]
  },
  {
    name: "Sector 65 Gurgaon", slug: "sector-65-gurgaon", city: "Gurgaon", coordinates: [28.397, 77.073],
    livability_score: 8.8, safety_score: 8.8, connectivity_score: 8.5,
    insights: {
      water: "Mostly managed by builders via tankers/borewells",
      safety: "Very safe inside premium complexes",
      transport: "Needs private transport",
      metro_distance: "4.0 km",
      aqi: "Poor in winters due to surrounding construction",
      markets: "M3M 65th Avenue",
      schools: "DPS International Edge"
    },
    pros: ["Ultra-luxury projects", "Self-sustained townships", "Upcoming retail infrastructure"],
    cons: ["High acquisition costs", "Dust pollution from surrounding empty plots"],
    faq: [{ question: "Is Sector 65 Gurgaon good for rent", answer: "Yes, highly sought after by expat and high-income groups." }]
  },
  {
    name: "Sector 57 Gurgaon", slug: "sector-57-gurgaon", city: "Gurgaon", coordinates: [28.423, 77.081],
    livability_score: 7.5, safety_score: 7.0, connectivity_score: 8.0,
    insights: { water: "Frequent shortages in summer", safety: "Moderate; PG crowd driven area", transport: "Good availability of autos and cabs", metro_distance: "2.0 km", aqi: "Poor", markets: "Hong Kong Bazaar", schools: "Scottish High" },
    pros: ["Affordable rents compared to neighboring sectors", "Good neighborhood shops"], cons: ["Water and electricity cuts", "Congested inner lanes"], faq: [{ question: "Is Sector 57 safe?", answer: "It is moderately safe but gets dark and quiet at night in inner lanes." }]
  },
  {
    name: "DLF Phase 1", slug: "dlf-phase-1", city: "Gurgaon", coordinates: [28.471, 77.098],
    livability_score: 8.5, safety_score: 8.5, connectivity_score: 9.0,
    insights: { water: "Good municipal supply", safety: "Gated blocks, active RWA", transport: "Excellent", metro_distance: "1.0 km", aqi: "Poor", markets: "Qutub Plaza", schools: "Shiv Nadar" },
    pros: ["Established green neighborhood", "Low density floors"], cons: ["Aging infrastructure in some blocks", "Expensive"], faq: [{ question: "Is DLF Phase 1 better than high rises?", answer: "Yes, if you prefer independent floors and low density living." }]
  },
  {
    name: "DLF Phase 5", slug: "dlf-phase-5", city: "Gurgaon", coordinates: [28.461, 77.100],
    livability_score: 9.5, safety_score: 9.5, connectivity_score: 9.0,
    insights: { water: "Excellent, privately managed by DLF", safety: "Highest security tier", transport: "Rapid Metro access", metro_distance: "0.5 km", aqi: "Moderate", markets: "South Point Mall", schools: "Lancers International" },
    pros: ["World-class living", "Expat friendly", "Immaculate maintenance"], cons: ["Exorbitantly priced"], faq: [{ question: "Are DLF Phase 5 apartments worth the rent?", answer: "Yes, for unparalleled security, amenities, and community." }]
  },
  {
    name: "Sohna Road", slug: "sohna-road", city: "Gurgaon", coordinates: [28.381, 77.042],
    livability_score: 8.0, safety_score: 8.0, connectivity_score: 8.5,
    insights: { water: "Reasonable, society dependent", safety: "Active corridor, generally safe", transport: "Good bus/auto network", metro_distance: "7.0 km", aqi: "Poor", markets: "Omaxe City Centre", schools: "GD Goenka" },
    pros: ["Great mix of commercial and residential", "Established micro-market"], cons: ["Heavy traffic jams at Subhash Chowk"], faq: [{ question: "Is Sohna road good for families?", answer: "Yes, it has great schools and self-contained societies." }]
  },
  {
    name: "New Gurgaon (Sectors 82-95)", slug: "new-gurgaon", city: "Gurgaon", coordinates: [28.384, 76.953],
    livability_score: 7.8, safety_score: 7.5, connectivity_score: 8.0,
    insights: { water: "Heavy reliance on tankers, limited direct pipeline", safety: "Safe inside societies, desolate around some patches", transport: "Needs car, close to NH8/Dwarka Expressway", metro_distance: "15.0 km", aqi: "Poor", markets: "Sapphire 83", schools: "St. Xavier's High School" },
    pros: ["New construction with large layouts", "Affordable than Central Gurgaon"], cons: ["Lack of robust municipal infra", "Far from Delhi border"], faq: [{ question: "Is New Gurgaon a good investment?", answer: "Yes, for long-term appreciation as Dwarka Expressway finishes." }]
  },
  {
    name: "MG Road Gurgaon", slug: "mg-road-gurgaon", city: "Gurgaon", coordinates: [28.481, 77.080],
    livability_score: 8.0, safety_score: 7.0, connectivity_score: 9.5,
    insights: { water: "Stable supply", safety: "Crowded and commercialized, night safety is an issue outside malls", transport: "Excellent Yellow Line Metro", metro_distance: "0 km", aqi: "Poor to Severe", markets: "MGF Metropolitan", schools: "Heritage Xperiential" },
    pros: ["Walking distance to malls/metro", "Extremely connected"], cons: ["Traffic nightmare on weekends", "Noise pollution"], faq: [{ question: "Is MG Road good for families?", answer: "Prefer inner sectors like Sector 28 bordering MG Road rather than main road societies." }]
  },

  // Noida
  {
    name: "Sector 150 Noida", slug: "sector-150-noida", city: "Noida", coordinates: [28.435, 77.490],
    livability_score: 8.5, safety_score: 8.0, connectivity_score: 8.5,
    insights: { water: "Good, new infrastructure", safety: "Developing area, mostly safe inside societies", transport: "Close to Noida-Greater Noida Expy", metro_distance: "2.0 km (Sector 148)", aqi: "Moderate (Greenest sector in Noida)", markets: "Upcoming retail", schools: "Learners International" },
    pros: ["Low density, highly green sector", "Sports focused amenities", "Premium large format homes"], cons: ["Still under development, lacks active neighborhood markets right now"], faq: [{ question: "Is Sector 150 Noida livability good?", answer: "It will be excellent once fully occupied; it's the greenest sector in Noida." }]
  },
  {
    name: "Sector 137 Noida", slug: "sector-137-noida", city: "Noida", coordinates: [28.508, 77.404],
    livability_score: 8.0, safety_score: 8.5, connectivity_score: 9.0,
    insights: { water: "Hard water issues reported", safety: "Very active and safe", transport: "Aqua Line Metro present", metro_distance: "0 km", aqi: "Poor", markets: "Paras Tierea High Street", schools: "Shiv Nadar School" },
    pros: ["Metro connected", "Highly populated and vibrant", "Affordable mid-segment"], cons: ["High density means jammed society entrances during peak hours", "Hard water"], faq: [{ question: "Is Sector 137 Noida good for families?", answer: "Yes, very popular for young IT professionals and families." }]
  },
  {
    name: "Sector 93 Noida", slug: "sector-93-noida", city: "Noida", coordinates: [28.525, 77.385],
    livability_score: 8.8, safety_score: 8.5, connectivity_score: 8.8,
    insights: { water: "Stable municipal supply", safety: "Established and safe", transport: "Excellent road network", metro_distance: "3.5 km", aqi: "Poor", markets: "Eldeco Studio", schools: "Genesis Global School" },
    pros: ["Mature green sector", "Premium segment", "Expressway accessibility"], cons: ["Aging properties in some pockets"], faq: [{ question: "Are flats in Sector 93 Noida premium?", answer: "Yes, it houses some of the best legacy premium projects like ATS Village." }]
  },
  {
    name: "Sector 78 Noida", slug: "sector-78-noida", city: "Noida", coordinates: [28.572, 77.387],
    livability_score: 7.5, safety_score: 7.5, connectivity_score: 8.5,
    insights: { water: "Frequent complaints of hard water/TDS", safety: "Very crowded, generally safe", transport: "Aqua line nearby", metro_distance: "1.0 km", aqi: "Poor", markets: "Hyde Park retail", schools: "The Manthan School" },
    pros: ["High energy density, lots of shops", "Budget friendly rentals"], cons: ["Severe traffic bottlenecks", "Concrete jungle feel"], faq: [{ question: "Is Sector 78 Noida too crowded?", answer: "Yes, it is one of the most densely populated sectors." }]
  },
  {
    name: "Sector 50 Noida", slug: "sector-50-noida", city: "Noida", coordinates: [28.574, 77.361],
    livability_score: 9.0, safety_score: 9.0, connectivity_score: 8.5,
    insights: { water: "Excellent", safety: "Highly secure and established", transport: "Auto and Rickshaws easily available", metro_distance: "1.0 km", aqi: "Poor", markets: "Sector 50 Central Market", schools: "Kothari International" },
    pros: ["Best legacy premium sector in Central Noida", "Great parks and community layout"], cons: ["Very expensive", "Little to no new construction available"], faq: [{ question: "Is Sector 50 the best place in Noida?", answer: "For established low-rise/mid-rise premium living, yes." }]
  },

  // Greater Noida
  {
    name: "Pari Chowk", slug: "pari-chowk", city: "Greater Noida", coordinates: [28.455, 77.514],
    livability_score: 7.5, safety_score: 7.0, connectivity_score: 8.5,
    insights: { water: "Fair, localized issues", safety: "Moderate, gets desolate away from main chowk", transport: "Buses, autos and Aqua Line", metro_distance: "0 km", aqi: "Moderate", markets: "Ansal Plaza", schools: "Jaypee Public" },
    pros: ["Educational hub", "Spacious and green compared to Noida"], cons: ["Traffic chaos at the roundabout", "Maintenance varies wildly by society"], faq: [{ question: "Should I buy property near Pari Chowk?", answer: "Only in established gated setups." }]
  },
  {
    name: "Noida Extension", slug: "noida-extension", city: "Greater Noida", coordinates: [28.604, 77.436],
    livability_score: 7.0, safety_score: 7.0, connectivity_score: 7.5,
    insights: { water: "Major hard water issues, heavy dependency on RO", safety: "Populous but under construction patches feel unsafe at night", transport: "High dependency on personal vehicles", metro_distance: "7.0 km", aqi: "Poor to Severe", markets: "Gaur City Mall", schools: "Ryan International" },
    pros: ["Extremely affordable housing", "Township living (e.g. Gaur City)"], cons: ["Traffic jams on Gaur Chowk", "Public transport is negligible", "Dusty environment"], faq: [{ question: "Is Noida Extension livable?", answer: "It is affordable but suffers from massive infra deficits currently." }]
  },

  // Delhi
  {
    name: "Dwarka", slug: "dwarka", city: "Delhi", coordinates: [28.582, 77.050],
    livability_score: 8.5, safety_score: 8.0, connectivity_score: 9.0,
    insights: { water: "Piped DJB water but shortages frequent in summer", safety: "DDA societies rely on local guards, generally safe", transport: "Excellent Metro Web", metro_distance: "0-2 km globally", aqi: "Severe", markets: "Sector 10 & 12 Markets", schools: "DPS Dwarka" },
    pros: ["Planned sub-city", "Wide roads and Metro connectivity", "Proximity to Airport"], cons: ["Aging DDA infrastructure", "Parking issues inside cooperative group housing societies (CGHS)"], faq: [{ question: "Is Dwarka good for families?", answer: "Excellent due to established parks, schools, and markets." }]
  },
  {
    name: "Vasant Kunj", slug: "vasant-kunj", city: "Delhi", coordinates: [28.529, 77.155],
    livability_score: 9.0, safety_score: 8.5, connectivity_score: 8.5,
    insights: { water: "Severe water shortages in summers, heavily tanker reliant", safety: "Safe, elite neighborhood", transport: "Cabs/buses prevalent", metro_distance: "3.0 km (Chattarpur/Vasant Vihar)", aqi: "Poor", markets: "DLF Promenade / Emporio", schools: "DPS Vasant Kunj" },
    pros: ["Aspirational address", "Next to premium malls and airport", "Lots of green cover (Sanjay Van)"], cons: ["Chronic water problems", "Extremely expensive rentals"], faq: [{ question: "Are water issues in Vasant Kunj real?", answer: "Yes, many blocks rely entirely on private water tankers during summer." }]
  },
  {
    name: "Saket", slug: "saket", city: "Delhi", coordinates: [28.524, 77.206],
    livability_score: 8.8, safety_score: 8.5, connectivity_score: 9.0,
    insights: { water: "Stable municipal supply", safety: "Active and secure", transport: "Yellow Line access", metro_distance: "1.0 km", aqi: "Severe", markets: "Select Citywalk Mall", schools: "Apeejay Saket" },
    pros: ["Vibrant lifestyle", "Excellent retail and hospital access (Max)", "Premium blocks (A-G)"], cons: ["Parking nightmares on street", "Congested access routes"], faq: [{ question: "Where is the best place to rent in Saket?", answer: "The alphabet blocks (like J block) are preferred over Malviya Nagar extensions." }]
  },
  {
    name: "Rohini", slug: "rohini", city: "Delhi", coordinates: [28.736, 77.113],
    livability_score: 7.8, safety_score: 7.5, connectivity_score: 8.5,
    insights: { water: "Reasonable", safety: "Crowded blocks, moderate safety", transport: "Red Line metro lifeline", metro_distance: "0-2 km", aqi: "Severe", markets: "DC Chowk, Avantika", schools: "Mount Abu, DPS Rohini" },
    pros: ["Very affordable compared to South Delhi", "Great local food culture"], cons: ["High congestion", "Lack of luxury high-rise options"], faq: [{ question: "Is Rohini a premium area?", answer: "It is an established middle-class sub-city primarily consisting of DDA flats and builder floors." }]
  },

  // Faridabad
  {
    name: "Neharpar (Greater Faridabad)", slug: "neharpar", city: "Faridabad", coordinates: [28.396, 77.347],
    livability_score: 7.2, safety_score: 7.0, connectivity_score: 7.5,
    insights: { water: "Mostly tanker and borewell dependent", safety: "Gated societies safe, but surrounding roads can be unsafe at night", transport: "Poor public transport", metro_distance: "5.0 km", aqi: "Severe", markets: "Omaxe World Street", schools: "DPS Greater Faridabad" },
    pros: ["Affordable spacious apartments", "Emerging commercial hubs like World Street", "Relatively less crowded"], cons: ["Dusty and underdeveloped sector roads", "High dependency on cars"], faq: [{ question: "Is Neharpar developed?", answer: "It is still a developing zone with major gaps in civic amenities." }]
  },
  {
    name: "Sector 79-89 (Faridabad)", slug: "faridabad-sector-79-89", city: "Faridabad", coordinates: [28.376, 77.337],
    livability_score: 7.0, safety_score: 6.5, connectivity_score: 7.0,
    insights: { water: "Ground water reliant", safety: "Isolated during evening hours", transport: "Requires private vehicle", metro_distance: "8.0 km", aqi: "Severe", markets: "Local society shops", schools: "Modern Delhi Public School" },
    pros: ["Extremely cost-effective", "Large green belts surrounding"], cons: ["Poor road infrastructure", "Lack of social infrastructure"], faq: [{ question: "Are new bypass sectors in Faridabad good to live?", answer: "Only if you strictly budget-bound; daily civic issues persist." }]
  }
];

const projects = [
  // Golf Course Road (Gurgaon)
  { name: "DLF Camellias", slug: "dlf-camellias", location_slug: "golf-course-road", price_range: "₹60Cr - ₹100Cr", segment: "luxury", insights: { construction_quality: "Ultra-Premium World Class", amenities: "Six star clubhouse, unparalleled in India", water: "100% stable private hydro-pneumatic supply", power_backup: "100% DG with N+1 redundancy", maintenance: "Immaculate, highly professional" }, pros: ["Most prestigious address in India", "Unrivaled luxury"], cons: ["Astronomical entry barrier"], faq: [{ question: "DLF Camellias price and insights", answer: "Averaging around ₹60Cr starting, it's defined by exclusivity and bespoke finishes." }] },
  { name: "DLF Magnolias", slug: "dlf-magnolias", location_slug: "golf-course-road", price_range: "₹30Cr - ₹50Cr", segment: "luxury", insights: { construction_quality: "Excellent, though aging slightly compared to Camellias", amenities: "Incredible community club and golf views", water: "Stable", power_backup: "100%", maintenance: "Managed by DLF, top tier" }, pros: ["Established elite community", "Golf course facing"], cons: ["Requires interior upgrades frequently due to age"], faq: [{ question: "Is DLF Magnolias a good buy today?", answer: "Yes, it maintains tremendous liquidity among HNI circles." }] },

  // Sector 65 Gurgaon
  { name: "M3M Golf Estate", slug: "m3m-golf-estate", location_slug: "sector-65-gurgaon", price_range: "₹6Cr - ₹15Cr", segment: "luxury", insights: { construction_quality: "Premium", amenities: "9-hole executive golf course, grand clubhouse", water: "No major complaints", power_backup: "100%", maintenance: "₹6 per sqft, generally good" }, pros: ["Massive central greens", "Very active expat and corporate crowd"], cons: ["Surrounding sector roads get dusty"], faq: [{ question: "M3M Golf Estate review", answer: "Highly rated for lifestyle, but traffic on Extension road acts as a bottleneck." }] },
  { name: "Emaar Marbella", slug: "emaar-marbella", location_slug: "sector-65-gurgaon", price_range: "₹10Cr - ₹20Cr", segment: "luxury", insights: { construction_quality: "Spanish villa style, solid build", amenities: "Quiet low-density luxury", water: "Adequate", power_backup: "100%", maintenance: "Good" }, pros: ["Villa exclusively in a high-rise dominated area", "Private yards"], cons: ["Seepage issues reported in some older units"], faq: [{ question: "Emaar Marbella villas feedback?", answer: "Excellent layouts but require thorough inspection for dampness." }] },

  // Golf Course Extension Road
  { name: "Trump Towers Delhi NCR", slug: "trump-towers-gurgaon", location_slug: "golf-course-extension-road", price_range: "₹9Cr - ₹16Cr", segment: "luxury", insights: { construction_quality: "Premium glass facade", amenities: "White glove services, private elevators", water: "Excellent", power_backup: "100%", maintenance: "Expected to be premium" }, pros: ["Brand value", "Stunning architecture"], cons: ["Project faced some delivery delays"], faq: [{ question: "Is Trump Tower Gurgaon ready?", answer: "It is nearing final handovers." }] },
  { name: "Ireo Victory Valley", slug: "ireo-victory-valley", location_slug: "golf-course-extension-road", price_range: "₹3Cr - ₹6Cr", segment: "luxury", insights: { construction_quality: "Good, but facade shows aging", amenities: "One of the tallest towers in Gurgaon, massive pool", water: "Manageable", power_backup: "100%", maintenance: "RWA taking over from builder, some transition pains" }, pros: ["Incredible views from high floors", "Large central courtyard"], cons: ["Ireo builder issues impacted long-term maintenance in the past"], faq: [{ question: "Should I rent in Ireo Victory Valley?", answer: "Yes, flats are spacious but ensure AC VRV units are serviced." }] },

  // DLF Phase 5
  { name: "DLF Crest", slug: "dlf-crest", location_slug: "dlf-phase-5", price_range: "₹8Cr - ₹15Cr", segment: "luxury", insights: { construction_quality: "Impeccable structural integrity", amenities: "Resort style pool, grand lobby", water: "Flawless", power_backup: "100%", maintenance: "Best in class" }, pros: ["Location", "Quality of build ignores Gurgaon dust and noise"], cons: ["High CAM charges"], faq: [{ question: "DLF Crest vs M3M Golf Estate?", answer: "Crest wins on pure location and construction quality, M3M wins on land expanse." }] },

  // Sector 150 Noida
  { name: "ATS Pristine", slug: "ats-pristine", location_slug: "sector-150-noida", price_range: "₹2Cr - ₹4Cr", segment: "luxury", insights: { construction_quality: "Classic ATS build, reliable", amenities: "Green lush landscaping, standard club", water: "Good", power_backup: "Available", maintenance: "Average to Good" }, pros: ["Low density", "Large balconies"], cons: ["Sector 150 lacks immediate markets"], faq: [{ question: "ATS Pristine review", answer: "Solid project for end-use, purely residential and quiet." }] },
  { name: "Godrej Palm Retreat", slug: "godrej-palm-retreat", location_slug: "sector-150-noida", price_range: "₹1.5Cr - ₹3Cr", segment: "mid", insights: { construction_quality: "Modern resort-style", amenities: "Terrace gardens, multiple pools", water: "Stable", power_backup: "100%", maintenance: "Management taken care by Godrej" }, pros: ["Low rise resort feel", "Great for second home or weekend living"], cons: ["Far from central Noida offices"], faq: [{ question: "Is Godrej Palm Retreat good?", answer: "Unique low-rise concept that feels like a resort." }] },

  // Sector 137 Noida
  { name: "Purvanchal Royal Park", slug: "purvanchal-royal-park", location_slug: "sector-137-noida", price_range: "₹1.2Cr - ₹2.5Cr", segment: "mid", insights: { construction_quality: "Very sturdy", amenities: "Good family club", water: "TDS issues common in area", power_backup: "Available", maintenance: "Good active RWA" }, pros: ["Spacious rooms compared to newer projects", "Very close to Metro"], cons: ["Density of the sector"], faq: [{ question: "Purvanchal Royal Park review?", answer: "Considered one of the best constructed societies in Sector 137." }] },
  { name: "Paras Tierea", slug: "paras-tierea", location_slug: "sector-137-noida", price_range: "₹60L - ₹1.5Cr", segment: "affordable", insights: { construction_quality: "Average, mass housing feel", amenities: "Very crowded club", water: "Hard water, RO mandatory", power_backup: "Yes", maintenance: "Issues with lift wait times and seepage" }, pros: ["High rental yield", "Affordable entry ticket"], cons: ["Overcrowded", "Construction quality is subpar"], faq: [{ question: "Paras Tierea rent problems?", answer: "Wait times for lifts during morning office hours can stretch to 15 minutes." }] },

  // Sector 50 Noida
  { name: "Mahagun Maple", slug: "mahagun-maple", location_slug: "sector-50-noida", price_range: "₹2.5Cr - ₹4Cr", segment: "luxury", insights: { construction_quality: "Solid legacy construction", amenities: "Basic compared to modern projects, but very green", water: "Excellent municipal supply", power_backup: "100%", maintenance: "Well-maintained by RWA" }, pros: ["Unbeatable location", "Peaceful"], cons: ["Old architecture", "No modern smart-home features"], faq: [{ question: "Buy flat in Sector 50 Noida?", answer: "Yes, it retains value excellently due to limited supply." }] },

  // Dwarka
  { name: "CGHS Shanti Villa", slug: "cghs-shanti-villa", location_slug: "dwarka", price_range: "₹1.8Cr - ₹2.5Cr", segment: "mid", insights: { construction_quality: "Old brick and mortar", amenities: "Basic park and guards", water: "DJB supplied, summer shortfalls", power_backup: "Inverter reliant", maintenance: "Low cost" }, pros: ["Tight knit community", "Large carpet area"], cons: ["No pool or gym", "Poor parking ratios"], faq: [{ question: "Dwarka CGHS vs New Gurgoan?", answer: "Dwarka offers better civic ecosystem, New Gurgaon offers better society amenities." }] },

  // Noida Extension
  { name: "Gaur City 2", slug: "gaur-city-2", location_slug: "noida-extension", price_range: "₹60L - ₹1.2Cr", segment: "affordable", insights: { construction_quality: "Average mass housing", amenities: "Huge stadium and club but heavily shared", water: "RO required", power_backup: "Yes", maintenance: "Varies by avenue" }, pros: ["Extremely integrated township (schools, mall, hospital inside)", "Affordable"], cons: ["High traffic inside", "Quality issues"], faq: [{ question: "Living in Gaur City review", answer: "Great if you never want to leave the township, nightmare if you commute to Gurgaon daily." }] },

  // Sector 146 Noida
  { name: "Godrej Woods", slug: "godrej-woods", location_slug: "sector-150-noida", /* mapping to closest for now if 146 not defined, let's map to Sector 150 Noida */ price_range: "₹2.5Cr - ₹5Cr", segment: "luxury", insights: { construction_quality: "Premium", amenities: "Urban forest concept", water: "New infra", power_backup: "100%", maintenance: "Expected to be premium" }, pros: ["Unique forest theme", "Reputed builder"], cons: ["Still developing sector"], faq: [{ question: "Godrej Woods Noida review", answer: "Premium forest-theme living but carries a slight over-valuation." }] },
  
  // Faridabad
  { name: "BPTP Park Grandeura", slug: "bptp-park-grandeura", location_slug: "neharpar", price_range: "₹80L - ₹1.4Cr", segment: "mid", insights: { construction_quality: "Average", amenities: "Good open areas", water: "Ground water reliant", power_backup: "Partial", maintenance: "Patchy" }, pros: ["Affordable mid-segment", "Large layout"], cons: ["BPTP legacy issues with maintenance", "Civic infra outside society is poor"], faq: [{ question: "Is BPTP Grandeura good?", answer: "It presents good value for money but requires compromising on external road quality." }] }
];


fs.writeFileSync(path.join(__dirname, '..', 'data', 'locations.json'), JSON.stringify(locations, null, 2));
fs.writeFileSync(path.join(__dirname, '..', 'data', 'projects.json'), JSON.stringify(projects, null, 2));
console.log('Successfully generated JSON data');
