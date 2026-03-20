const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

function normalizeSlug(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
}

try {
  const filePath = "/Users/yogeshkumarwadhwa/Downloads/Haryana Real Estate Regulatory Authority, Gurugram.xlsx";
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  const rawData = xlsx.utils.sheet_to_json(sheet, { header: 1 });
  
  // Rows start from index 3 (0-indexed)
  const projects = [];
  
  for (let i = 3; i < rawData.length; i++) {
    const row = rawData[i];
    if (!row || row.length < 5) continue;
    
    const rawRera = (row[1] || "").toString();
    const projectName = (row[3] || "").toString().trim();
    const developerName = (row[4] || "").toString().trim();
    const locationStr = (row[5] || "").toString().trim();
    const expiry = (row[9] || "").toString().trim();
    
    if (!projectName || !developerName) continue;
    
    // Parse Status and RERA number from column 1
    let status = "Registered";
    let reraNumber = rawRera;
    
    const lowerRera = rawRera.toLowerCase();
    if (lowerRera.includes("lapsed project") || lowerRera.includes("lapsed")) {
      status = "Lapsed";
      reraNumber = rawRera.replace(/lapsed project/i, "").trim();
    } else if (lowerRera.includes("revoked")) {
      status = "Revoked";
      reraNumber = rawRera.replace(/revoked/i, "").trim();
    }
    
    // Clean up RERA number (sometimes it has "DATED XX.XX.XXXX")
    // Keep it if needed, or just split. We'll strip " DATED" suffix if it exists for cleaner display
    const datedIdx = reraNumber.toUpperCase().indexOf(" DATED");
    if (datedIdx !== -1) {
      reraNumber = reraNumber.substring(0, datedIdx).trim();
    }
    
    const slug = normalizeSlug(projectName);

    projects.push({
      projectName,
      developerName,
      reraNumber,
      location: locationStr || "Gurgaon",
      status,
      possession: expiry ? expiry : "N/A",
      slug
    });
  }

  const outputPath = path.join(__dirname, "..", "data", "rera-projects.json");
  fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
  console.log(`Successfully wrote ${projects.length} RERA projects to JSON.`);
  
} catch (e) {
  console.error("Error parsing Excel:", e);
}
