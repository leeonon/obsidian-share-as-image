export const SHARE_TO_IMAGE_MARKDOWN_CONTAINER = 'share-to-image-markdown-container';

export const THEMES = [
  { name: 'default', value: 'default' },
  { name: 'oneDark', value: 'oneDark' },
];

export const FONT_SIZE = [
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
  { name: '18px', value: '18px' },
  { name: '20px', value: '20px' },
];

export type TextStyleKeyType = 'color' | 'gradient';
export type TextStyleType = {
  type: TextStyleKeyType;
  value: string;
};

export const TEXT_STYLE: TextStyleType[] = [
  { type: 'color', value: '#75FBBE' },
  { type: 'color', value: '#D17BF8' },
  { type: 'color', value: '#EB506C' },
  { type: 'color', value: '#F09737' },
  { type: 'color', value: '#4192F7' },
  { type: 'gradient', value: 'linear-gradient(90deg, cyan, blue)' },
  { type: 'gradient', value: 'linear-gradient(90deg, red, orange, yellow, green, blue, indigo, violet)' },
  { type: 'gradient', value: 'linear-gradient(90deg, pink, purple)' },
  { type: 'gradient', value: 'linear-gradient(90deg, pink, purple)' },
  { type: 'gradient', value: 'linear-gradient(90deg, limegreen, deepskyblue)' },
  { type: 'gradient', value: 'linear-gradient(90deg, peachpuff, coral, orangered)' },
  { type: 'gradient', value: 'linear-gradient(90deg, lightcyan, skyblue, midnightblue)' },
  {
    type: 'gradient',
    value: 'linear-gradient(90deg, rgb(91, 222, 239) 0%, rgb(247, 165, 245) 50%, rgb(230, 80, 113) 100%)',
  },
  { type: 'gradient', value: 'linear-gradient(90deg, violet, magenta, pink)' },
  {
    type: 'gradient',
    value: 'linear-gradient(90deg, rgb(244, 231, 133) 0%, rgb(242, 69, 138) 50%, rgb(165, 121, 240) 100%)',
  },
];

export const IMAGE_SIZE = [
  { name: 'Mobile Portrait', value: 1080 },
  { name: 'Web Display', value: 1920 },
  // { name: 'Tablet Display', value: 2048 },
  // { name: 'Standard A4', value: 2480 },
];

export const PAGE_FONT_FAMILY = [
  { name: 'serif', link: 'https://fonts.cdnfonts.com/css/microsoft-sans-serif' },
  { name: 'sans serif', link: 'https://fonts.cdnfonts.com/css/microsoft-sans-serif' },
  { name: 'LXGW WenKai', link: 'https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.min.css' },
];
