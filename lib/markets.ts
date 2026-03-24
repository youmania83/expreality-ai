import fs from 'fs';
import path from 'path';

export function getMarkets() {
  const dataPath = path.join(process.cwd(), 'data', 'markets.json');
  if (fs.existsSync(dataPath)) {
    const rawData = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(rawData);
  }
  return [];
}
