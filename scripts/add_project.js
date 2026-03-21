const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const readline = require('readline');

// Utilities
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const ask = (query) => new Promise((resolve) => rl.question(query, resolve));

const cleanSlug = (str) => {
  return str.toString().toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve) => {
    if (!url) return resolve('/projects/default.jpg');
    
    console.log(`Downloading image from: ${url}...`);
    
    // Determine HTTP or HTTPS based on string
    const insecuredHttps = url.startsWith('https') ? https : http;
    const isHttps = url.startsWith('https');
    
    // We attempt generic fetching with proper User-Agent to pass CDN protections
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8'
      }
    };

    const req = insecuredHttps.get(url, options, (res) => {
      // Handle redirects
      if (res.statusCode === 301 || res.statusCode === 302) {
        console.log(`Following redirect to ${res.headers.location}...`);
        return downloadImage(res.headers.location, filepath).then(resolve);
      }

      if (res.statusCode !== 200) {
        console.error(`⚠️ Warning: Failed to download image. Status: ${res.statusCode}. Fallback assigned.`);
        return resolve('/projects/default.jpg');
      }

      const fileStream = fs.createWriteStream(filepath);
      res.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        resolve(filepath);
      });
    }).on('error', (err) => {
      console.error(`⚠️ Error downloading image: ${err.message}. Fallback assigned.`);
      resolve('/projects/default.jpg');
    });
    
    // Fail-safe 10s Timeout
    req.setTimeout(10000, () => {
      req.abort();
      console.error("⚠️ Image download timed out (>10s). Fallback assigned.");
      resolve('/projects/default.jpg');
    });
  });
};

async function main() {
  console.log("==========================================");
  console.log("   Exprealty Project Ingestion Pipeline   ");
  console.log("==========================================");
  
  const sourceUrl = await ask("1. Project Source URL (Developer ref): ");
  const name = await ask("2. Project Name: ");
  const developer = await ask("3. Developer Name: ");
  const location = await ask("4. Full Location (e.g. Golf Course Road, Gurgaon): ");
  const city = await ask("5. City [Gurgaon]: ") || "Gurgaon";
  const country = await ask("6. Country [India]: ") || "India";
  const startingPrice = await ask("7. Starting Price (e.g. ₹5.5 Cr+): ");
  const status = await ask("8. Status (e.g. Under Construction, Ready): ");
  const imageUrl = await ask("9. External Image URL to fetch (Blank = default): ");
  
  if (!name || name.trim() === '') {
    console.error("Project name is required!");
    process.exit(1);
  }

  const slug = cleanSlug(name);
  let localImagePath = '/projects/default.jpg';
  
  // Clean Image URL handling
  if (imageUrl && imageUrl.trim() !== '') {
    try {
      // Safe parsing of extension (ignoring query strings)
      const parsedUrl = new URL(imageUrl);
      let ext = path.extname(parsedUrl.pathname) || '.jpg';
      
      const filename = `${slug}${ext}`;
      const absolutePath = path.join(__dirname, '../public/projects', filename);
      
      const downloadedPath = await downloadImage(imageUrl, absolutePath);
      if (downloadedPath === absolutePath) {
        localImagePath = `/projects/${filename}`;
      }
    } catch(err) {
      console.log("⚠️ Invalid Image URL format. Skipping download.");
    }
  }
  
  const newProject = {
    name,
    location,
    city,
    country,
    startingPrice,
    price: startingPrice,
    image: localImagePath,
    sourceUrl: sourceUrl || "https://exprealty.in/portfolio",
    slug,
    developer,
    status,
    intelligence: {
      appreciation: "Pending analysis",
      rentalYield: "Pending analysis",
      builderRating: "Pending appraisal",
      liquidity: "Pending appraisal",
      sentiment: "Hold",
      marketInsights: {
        priceTrend: "Evaluation ongoing.",
        connectivity: "Evaluation ongoing.",
        futureDevelopments: "Evaluation ongoing."
      }
    },
    developerUrl: sourceUrl || "",
    hasDedicatedPage: true
  };
  
  const dbPath = path.join(__dirname, '../data/projects.json');
  const data = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  
  // Avoid Duplicates
  const exists = data.findIndex(p => p.slug === slug);
  if (exists > -1) {
    console.log(`\n🔄 Overwriting existing project with slug: ${slug}...`);
    data[exists] = newProject;
  } else {
    data.push(newProject);
  }
  
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
  console.log(`\n==========================================`);
  console.log(`✅ Successfully injected [${name}] into DB!`);
  console.log(`📸 Locked Verified Local Asset: ${localImagePath}`);
  console.log(`🔗 Generated Immutable Slug: /projects/${slug}`);
  console.log(`==========================================`);
  
  rl.close();
}

main().catch(console.error);
