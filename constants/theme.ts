// Baemin Design System Theme

export const colors = {
  // Primary
  primary: '#2AC1BC',
  primaryLight: '#E8F5F5',
  primaryDark: '#1FA39F',

  // Backgrounds
  background: '#FFFFFF',
  backgroundSecondary: '#F5F5F5',
  backgroundTertiary: '#F0F0F0',

  // Text
  textPrimary: '#000000',
  textSecondary: '#333333',
  textTertiary: '#666666',
  textDisabled: '#999999',
  textInverse: '#FFFFFF',

  // UI Elements
  border: '#EEEEEE',
  divider: '#F5F5F5',
  disabled: '#CCCCCC',

  // Status
  error: '#EF4444',
  warning: '#EAB308',
  success: '#22C55E',
  info: '#3B82F6',

  // Allergy Warning
  allergyWarning: '#EF4444',
  allergyBackground: '#FEE2E2',
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
} as const;

export const fontSize = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
  xxxl: 28,
} as const;

export const fontWeight = {
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  xxl: 20,
  full: 9999,
} as const;

export const shadow = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
} as const;

// Type exports
export type Colors = typeof colors;
export type Spacing = typeof spacing;
export type FontSize = typeof fontSize;
export type FontWeight = typeof fontWeight;
export type BorderRadius = typeof borderRadius;
