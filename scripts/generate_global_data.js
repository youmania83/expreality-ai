const fs = require('fs');
const path = require('path');
const https = require('https');

// Unsplash images of luxury real estate
const unsplashImages = [
  "photo-1600596542815-ffad4c1539a9", // Luxury home exterior
  "photo-1512917774080-9991f1c4c750", // Modern home
  "photo-1600607687920-4e2a09cf159d", // Luxury interior
  "photo-1600566753086-00f18efc2291", // Living room
  "photo-1628624747186-a941c476b7ef", // Penthouse view
  "photo-1574362848149-11496d93a7c7", // Luxury condo
  "photo-1613545325278-f24b0cae1224", // Mansion pool
  "photo-1522708323590-d24dbb6b0267", // Bedroom
  "photo-1486406146926-c627a92ad1ab", // Luxury highrise
  "photo-1545324418-cc1a3fa10c00", // Sleek apartment
];

const downloadImage = async (url, filepath) => {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(filepath, Buffer.from(buffer));
    return filepath;
  } catch (error) {
    console.error(`Failed to download ${url}: ${error.message}`);
    // Fallback: copy an existing default image
    const defaultImg = path.join(__dirname, '..', 'public', 'projects', 'default.jpg');
    if (fs.existsSync(defaultImg)) {
      fs.copyFileSync(defaultImg, filepath);
    } else {
        // Create an empty file or dummy buffer to avoid crash
        fs.writeFileSync(filepath, "");
    }
    return filepath;
  }
};

const citiesList = {
  tier1: ['Dubai', 'London', 'New York', 'Gurgaon', 'Mumbai', 'Singapore'],
  tier2: ['Bali', 'Lisbon', 'Miami', 'Toronto', 'Doha'],
  tier3: ['Goa', 'Phuket', 'Tulum', 'Istanbul', 'Bangkok']
};

const getRandomImages = (count) => {
  const shuffled = unsplashImages.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map(id => `https://images.unsplash.com/${id}?w=1200&q=80&fit=crop&crop=edges`);
};

function generateSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
}

async function generateData() {
  const projects = [];
  const markets = [];
  
  const allCities = [...citiesList.tier1, ...citiesList.tier2, ...citiesList.tier3];

  let idCounter = 1;

  for (const city of allCities) {
    console.log(`Generating data for ${city}...`);
    
    // Generate Market
    markets.push({
      city,
      country: city === 'Gurgaon' || city === 'Mumbai' || city === 'Goa' ? 'India' : (city === 'New York' || city === 'Miami' ? 'USA' : 'Global'),
      market_summary: `${city} presents an exceptional frontier for luxury asset allocation.`,
      avg_rental_yield: (Math.random() * 4 + 3).toFixed(1) + '%',
      growth_drivers: ['Infrastructure Development', 'Inflow of UHNWI', 'Regulatory Friendly Policies'],
      investor_insight: `Prime locations in ${city} are experiencing constrained supply leading to distinct appreciation potential.`
    });

    // Generate 3 Projects per city
    for (let i = 1; i <= 3; i++) {
      const projectName = `The ${city} Reserve Signature ${['Tower', 'Villas', 'Estates', 'Residences', 'Penthouses'][i % 5]}`;
      const slug = generateSlug(projectName);
      
      const projectDir = path.join(__dirname, '..', 'public', 'projects', slug);
      if (!fs.existsSync(projectDir)) {
        fs.mkdirSync(projectDir, { recursive: true });
      }

      const imageUrls = getRandomImages(4);
      
      const localPaths = [];
      const filenames = ['hero.jpg', '1.jpg', '2.jpg', '3.jpg'];
      
      for (let j = 0; j < 4; j++) {
        const filepath = path.join(projectDir, filenames[j]);
        if (!fs.existsSync(filepath)) {
          await downloadImage(imageUrls[j], filepath);
        }
        localPaths.push(`/projects/${slug}/${filenames[j]}`);
      }

      projects.push({
        name: projectName,
        slug: slug,
        city: city,
        country: markets[markets.length - 1].country,
        micro_market: `Prime ${city} Center`,
        price_range: `$${(Math.random() * 5 + 2).toFixed(1)}M - $${(Math.random() * 10 + 8).toFixed(1)}M`,
        currency: "USD",
        property_type: ["Penthouse", "Mansion", "Luxury Apartment", "Villa"][Math.floor(Math.random() * 4)],
        developer: `Global Signature Developers`,
        geo_coordinates: {
          lat: (Math.random() * 180 - 90).toFixed(4),
          lng: (Math.random() * 360 - 180).toFixed(4)
        },
        hero_image: localPaths[0],
        gallery_images: [localPaths[1], localPaths[2], localPaths[3]],
        investment_score: (Math.random() * 2 + 8).toFixed(1), // 8.0 - 10.0
        rental_yield_estimate: (Math.random() * 3 + 4).toFixed(1) + '%',
        appreciation_potential: 'High',
        status: ['Off-Market', 'Pre-Launch', 'Ready to Move'][Math.floor(Math.random() * 3)],
        why_invest: [
          "Rare waterfront/skyline views",
          "Exclusive private amenities",
          "High historical capital appreciation",
          "Surrounded by elite infrastructure"
        ],
        target_buyer: "UHNWI, Institutional Investors, Family Offices",
        risk_factors: ["Market cyclicality", "Currency fluctuation"],
        exit_strategy: "Secondary market resale to international buyers within 5-7 years"
      });
      
      console.log(`   Created project: ${projectName}`);
    }
  }

  // Save JSON
  const dataDir = path.join(__dirname, '..', 'data');
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir);
  }

  fs.writeFileSync(path.join(dataDir, 'projects.json'), JSON.stringify(projects, null, 2));
  fs.writeFileSync(path.join(dataDir, 'markets.json'), JSON.stringify(markets, null, 2));
  
  console.log("Global data generation complete!");
}

generateData().catch(console.error);
