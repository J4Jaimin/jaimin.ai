/** Generate a static 1200×630 Open Graph card into /public/og.png. */
import sharp from "sharp";
import { join } from "node:path";

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="g1" cx="18%" cy="10%" r="60%">
      <stop offset="0" stop-color="#6ea8fe" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#6ea8fe" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="g2" cx="90%" cy="85%" r="55%">
      <stop offset="0" stop-color="#a78bfa" stop-opacity="0.24"/>
      <stop offset="1" stop-color="#a78bfa" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="name" x1="0" y1="0" x2="1" y2="0.4">
      <stop offset="0" stop-color="#ffffff"/>
      <stop offset="0.65" stop-color="#ffffff"/>
      <stop offset="1" stop-color="#a78bfa"/>
    </linearGradient>
  </defs>

  <rect width="1200" height="630" fill="#060606"/>
  <rect width="1200" height="630" fill="url(#g1)"/>
  <rect width="1200" height="630" fill="url(#g2)"/>

  <!-- grid -->
  <g stroke="#ffffff" stroke-opacity="0.04">
    ${Array.from({ length: 19 }, (_, i) => `<line x1="${i * 64}" y1="0" x2="${i * 64}" y2="630"/>`).join("")}
    ${Array.from({ length: 10 }, (_, i) => `<line x1="0" y1="${i * 64}" x2="1200" y2="${i * 64}"/>`).join("")}
  </g>

  <!-- monogram chip -->
  <rect x="80" y="86" width="72" height="72" rx="20" fill="#ffffff"/>
  <text x="116" y="135" font-family="Geist, Inter, system-ui, sans-serif" font-size="34" font-weight="700" letter-spacing="-1" text-anchor="middle" fill="#060606">JR</text>

  <text x="168" y="132" font-family="Geist, Inter, system-ui, sans-serif" font-size="24" font-weight="500" fill="#8b8b95">Backend Software Engineer</text>

  <text x="78" y="330" font-family="Geist, Inter, system-ui, sans-serif" font-size="130" font-weight="600" letter-spacing="-5" fill="url(#name)">Jaimin Rana</text>

  <text x="82" y="420" font-family="Geist, Inter, system-ui, sans-serif" font-size="30" font-weight="400" fill="#b6b6c0">Scalable, high-performance backend systems —</text>
  <text x="82" y="462" font-family="Geist, Inter, system-ui, sans-serif" font-size="30" font-weight="400" fill="#b6b6c0">REST APIs, distributed caching &amp; cloud-native services.</text>

  <g font-family="Geist, Inter, system-ui, sans-serif" font-size="21" fill="#8b8b95">
    <text x="82" y="556">Node.js</text>
    <text x="205" y="556">Express</text>
    <text x="330" y="556">MongoDB</text>
    <text x="480" y="556">Redis</text>
    <text x="580" y="556">Docker</text>
    <text x="700" y="556">AWS</text>
    <circle cx="168" cy="549" r="3" fill="#7c86ff"/>
    <circle cx="300" cy="549" r="3" fill="#7c86ff"/>
    <circle cx="450" cy="549" r="3" fill="#7c86ff"/>
    <circle cx="545" cy="549" r="3" fill="#7c86ff"/>
    <circle cx="665" cy="549" r="3" fill="#7c86ff"/>
  </g>

  <text x="1118" y="556" text-anchor="end" font-family="Geist, Inter, system-ui, sans-serif" font-size="21" fill="#5c5c66">github.com/J4Jaimin</text>

  <rect x="0.5" y="0.5" width="1199" height="629" fill="none" stroke="#ffffff" stroke-opacity="0.06"/>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(join(process.cwd(), "public", "og.png"));
console.log("✓ public/og.png (1200×630)");
