import { writeFileSync } from "fs";

function createIconSVG(size, maskable = false) {
  const padding = maskable ? Math.round(size * 0.1) : 0;
  const inner = size - padding * 2;
  const rx = maskable ? 0 : Math.round(size * 0.15);
  const scale = inner / 32;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  ${maskable ? `<rect width="${size}" height="${size}" fill="#7C3AED"/>` : ""}
  <g transform="translate(${padding},${padding})">
    <rect width="${inner}" height="${inner}" rx="${rx}" fill="#7C3AED"/>
    <g transform="scale(${scale})">
      <path d="M8 24V8l8 4v12l-8-4z" fill="#fff" opacity="0.9"/>
      <path d="M16 12l8-4v16l-8 4V12z" fill="#fff" opacity="0.7"/>
      <circle cx="22" cy="10" r="3" fill="#FCD34D"/>
      <text x="21" y="12" font-size="5" font-weight="bold" fill="#7C3AED" text-anchor="middle" font-family="system-ui">XP</text>
    </g>
  </g>
</svg>`;
}

const configs = [
  { name: "icon-192.png", size: 192, maskable: false },
  { name: "icon-512.png", size: 512, maskable: false },
  { name: "icon-maskable-192.png", size: 192, maskable: true },
  { name: "icon-maskable-512.png", size: 512, maskable: true },
];

for (const config of configs) {
  const svg = createIconSVG(config.size, config.maskable);
  const svgName = config.name.replace(".png", ".svg");
  writeFileSync(`public/icons/${svgName}`, svg);
  console.log(`Generated public/icons/${svgName}`);
}

console.log("\nSVG icons generated. For production, convert to PNG with:");
console.log("  npx sharp-cli -i public/icons/icon-192.svg -o public/icons/icon-192.png");
console.log("\nFor now, we'll reference SVGs in the manifest (works in most browsers).");
