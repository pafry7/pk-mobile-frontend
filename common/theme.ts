import { createTheme } from "@shopify/restyle";

const palette = {
  redPrimary: "#C23232",
  redDark: "#822222",

  gray: "#686363",

  black: "#0B0B0B",
  white: "#FFFFFF",
  offwhite: "F5F6FA",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.offwhite,
    tabBackground: palette.white,
    buttonPrimarybackground: palette.redPrimary,
    primaryText: palette.black,
    secondaryText: palette.gray,
    lightText: palette.white,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
});

export type Theme = typeof theme;
export default theme;
