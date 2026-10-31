export function generateArt(domain, title, badge) {
  const iconPaths = {
    Headphones: `<path d="M120 220 C120 130, 280 130, 280 220 M120 220 L120 270 A25 25 0 0 0 160 270 L160 220 M280 220 L280 270 A25 25 0 0 1 240 270 L240 220" fill="none" stroke="#FFFFFF" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>`,
    Keyboard: `<rect x="100" y="150" width="200" height="110" rx="16" fill="none" stroke="#FFFFFF" stroke-width="10"/><circle cx="140" cy="185" r="8" fill="#EC4186"/><circle cx="175" cy="185" r="8" fill="#FFFFFF"/><circle cx="210" cy="185" r="8" fill="#EE544A"/><circle cx="245" cy="185" r="8" fill="#FFFFFF"/><rect x="145" y="215" width="110" height="14" rx="7" fill="#EC4186"/>`,
    Camera: `<rect x="100" y="160" width="200" height="110" rx="20" fill="none" stroke="#FFFFFF" stroke-width="10"/><circle cx="200" cy="215" r="32" fill="#38124A" stroke="#EC4186" stroke-width="8"/><circle cx="200" cy="215" r="14" fill="#EE544A"/><circle cx="260" cy="185" r="7" fill="#FFFFFF"/>`,
    Sneakers: `<path d="M100 230 C120 210, 160 200, 200 215 L260 215 C285 215, 300 230, 300 250 L100 250 Z" fill="none" stroke="#FFFFFF" stroke-width="10"/><path d="M130 205 L170 160 L210 185" fill="none" stroke="#EC4186" stroke-width="8" stroke-linecap="round"/><rect x="95" y="250" width="210" height="14" rx="7" fill="#EE544A"/>`,
    Loafers: `<path d="M100 235 C130 210, 200 210, 250 225 C285 225, 300 240, 300 255 L100 255 Z" fill="none" stroke="#FFFFFF" stroke-width="10"/><ellipse cx="180" cy="225" rx="35" ry="12" fill="#EC4186" opacity="0.6"/><rect x="95" y="255" width="210" height="12" rx="6" fill="#FFFFFF"/>`,
    Watch: `<circle cx="200" cy="200" r="50" fill="#38124A" stroke="#FFFFFF" stroke-width="10"/><line x1="200" y1="200" x2="200" y2="170" stroke="#EC4186" stroke-width="6" stroke-linecap="round"/><line x1="200" y1="200" x2="225" y2="200" stroke="#EE544A" stroke-width="6" stroke-linecap="round"/><rect x="175" y="105" width="50" height="45" rx="8" fill="#EC4186"/><rect x="175" y="250" width="50" height="45" rx="8" fill="#EC4186"/>`,
    Backpack: `<rect x="130" y="145" width="140" height="150" rx="35" fill="none" stroke="#FFFFFF" stroke-width="10"/><path d="M165 145 C165 115, 235 115, 235 145" fill="none" stroke="#EC4186" stroke-width="8"/><rect x="150" y="200" width="100" height="60" rx="14" fill="#EE544A" opacity="0.5" stroke="#FFFFFF" stroke-width="6"/>`,
    Sunglasses: `<rect x="95" y="180" width="85" height="55" rx="16" fill="#EC4186" opacity="0.4" stroke="#FFFFFF" stroke-width="8"/><rect x="220" y="180" width="85" height="55" rx="16" fill="#EC4186" opacity="0.4" stroke="#FFFFFF" stroke-width="8"/><line x1="180" y1="200" x2="220" y2="200" stroke="#EE544A" stroke-width="8"/>`,
    Lamp: `<rect x="180" y="110" width="40" height="140" rx="20" fill="url(#neonGrad)" stroke="#FFFFFF" stroke-width="8"/><rect x="150" y="255" width="100" height="18" rx="9" fill="#EE544A"/>`,
    Cushion: `<rect x="120" y="140" width="160" height="120" rx="30" fill="none" stroke="#FFFFFF" stroke-width="10"/><ellipse cx="200" cy="200" rx="50" ry="30" fill="#EC4186" opacity="0.5"/>`,
    Kettle: `<path d="M140 160 L240 160 L250 260 L130 260 Z" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-linejoin="round"/><path d="M240 180 C270 190, 270 230, 248 245" fill="none" stroke="#EC4186" stroke-width="8"/><path d="M140 230 C90 220, 100 170, 120 150" fill="none" stroke="#EE544A" stroke-width="7" stroke-linecap="round"/>`,
    Server: `<path d="M160 140 L240 140 L260 250 L140 250 Z" fill="none" stroke="#FFFFFF" stroke-width="9"/><ellipse cx="200" cy="140" rx="40" ry="12" fill="#EC4186"/><rect x="135" y="248" width="130" height="16" rx="8" fill="#EE544A"/>`,
    Flask: `<rect x="155" y="150" width="90" height="130" rx="22" fill="none" stroke="#FFFFFF" stroke-width="10"/><rect x="175" y="115" width="50" height="35" rx="8" fill="#EE544A"/><line x1="155" y1="200" x2="245" y2="200" stroke="#EC4186" stroke-width="6"/>`,
    Band: `<circle cx="200" cy="200" r="55" fill="none" stroke="#EC4186" stroke-width="14"/><rect x="180" y="165" width="40" height="70" rx="12" fill="#38124A" stroke="#FFFFFF" stroke-width="6"/><circle cx="200" cy="200" r="6" fill="#EE544A"/>`,
    Mouse: `<rect x="145" y="140" width="110" height="140" rx="45" fill="none" stroke="#FFFFFF" stroke-width="10"/><line x1="200" y1="140" x2="200" y2="190" stroke="#EE544A" stroke-width="8"/><circle cx="200" cy="180" r="7" fill="#EC4186"/>`,
    Pad: `<rect x="95" y="150" width="210" height="120" rx="16" fill="#38124A" stroke="#FFFFFF" stroke-width="8"/><rect x="105" y="160" width="190" height="100" rx="10" fill="url(#neonGrad)" opacity="0.4"/>`
  };

  const matchedKey = Object.keys(iconPaths).find(k => title.includes(k) || domain.includes(k)) || 'Headphones';
  const icon = iconPaths[matchedKey];

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 320" width="100%" height="100%">
      <defs>
        <linearGradient id="neonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#EC4186"/>
          <stop offset="100%" stop-color="#EE544A"/>
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#EC4186" stop-opacity="0.4"/>
          <stop offset="70%" stop-color="#EE544A" stop-opacity="0.1"/>
          <stop offset="100%" stop-color="transparent"/>
        </radialGradient>
      </defs>
      <rect width="400" height="320" rx="28" fill="#1b0625"/>
      <circle cx="200" cy="160" r="120" fill="url(#halo)"/>
      <circle cx="200" cy="160" r="90" fill="none" stroke="#EC4186" stroke-width="2" stroke-dasharray="8 8" opacity="0.6"/>
      ${icon}
      <text x="200" y="295" text-anchor="middle" fill="#FFFFFF" font-family="system-ui, -apple-system, sans-serif" font-weight="900" font-size="14" letter-spacing="2">AURA CERTIFIED</text>
    </svg>
  `;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
