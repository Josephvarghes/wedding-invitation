import royalGoldConfig from '../config/themes/royalGold.json';
import pastelFloralConfig from '../config/themes/pastelFloral.json';
import modernMinimalConfig from '../config/themes/modernMinimal.json';

export const THEMES = {
  'royal-gold': {
    id: 'royal-gold',
    name: 'Royal Emerald & Gold',
    config: royalGoldConfig,
    accentColor: '#D4AF37',
    badge: '👑 Regal & Opulent'
  },
  'pastel-floral': {
    id: 'pastel-floral',
    name: 'Pastel Floral & Rose Gold',
    config: pastelFloralConfig,
    accentColor: '#E8A598',
    badge: '🌸 Romantic Garden'
  },
  'modern-minimal': {
    id: 'modern-minimal',
    name: 'Modern Minimalist & Slate',
    config: modernMinimalConfig,
    accentColor: '#8C7A6B',
    badge: '✨ High-Fashion Chic'
  }
};

export function getInitialTheme() {
  if (typeof window === 'undefined') return 'royal-gold';

  // 1. Check URL Query Parameter e.g. ?theme=pastel-floral
  const params = new URLSearchParams(window.location.search);
  const paramTheme = params.get('theme');
  if (paramTheme && THEMES[paramTheme]) {
    return paramTheme;
  }

  // 2. Check Hostname / Subdomain e.g. pastel-floral.domain.com
  const hostname = window.location.hostname.toLowerCase();
  if (hostname.includes('pastel') || hostname.includes('floral')) {
    return 'pastel-floral';
  }
  if (hostname.includes('minimal') || hostname.includes('modern')) {
    return 'modern-minimal';
  }
  if (hostname.includes('royal') || hostname.includes('gold')) {
    return 'royal-gold';
  }

  // Default theme
  return 'royal-gold';
}

export function applyThemeCSS(themeId) {
  if (typeof document !== 'undefined') {
    document.documentElement.setAttribute('data-theme', themeId || 'royal-gold');
  }
}
