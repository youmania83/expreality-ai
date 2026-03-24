const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'projects.json');

function addProject(newProject) {
  let projects = [];
  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath);
    projects = JSON.parse(rawData);
  }

  // Prevent duplicate slugs
  if (!newProject.slug) {
    newProject.slug = newProject.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  if (projects.some(p => p.slug === newProject.slug)) {
    console.error(`Error: A project with slug "${newProject.slug}" already exists.`);
    process.exit(1);
  }

  projects.push(newProject);
  
  // Keep JSON structured and clean
  fs.writeFileSync(dataPath, JSON.stringify(projects, null, 2));
  console.log(`Successfully added project: ${newProject.name} (Slug: ${newProject.slug})`);
}

// Check if a JSON string was passed as argument or a file path
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log("Usage: node add_project.js <path-to-project-json-file | project-json-string>");
  process.exit(1);
}

try {
  let projectData;
  if (fs.existsSync(args[0])) {
    projectData = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  } else {
    projectData = JSON.parse(args[0]);
  }
  
  if (Array.isArray(projectData)) {
    projectData.forEach(addProject);
  } else {
    addProject(projectData);
  }
} catch (e) {
  console.error("Failed to parse project data. Ensure it's valid JSON.");
  console.error(e);
}
