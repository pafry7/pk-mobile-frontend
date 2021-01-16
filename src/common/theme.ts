import { createTheme } from "@shopify/restyle";

const palette = {
  redPrimary: "#C23232",
  redDark: "#822222",

  gray: "#686363",
  green: "#077526",

  orange: "#C2A746",

  black: "#0B0B0B",
  white: "#FFFFFF",
  offwhite: "#F5F6FA",
  blue: "#061161",
};

const theme = createTheme({
  colors: {
    mainBackground: palette.offwhite,
    tabBackground: palette.white,
    buttonPrimaryBackground: palette.redPrimary,
    buttonLightBackground: `${palette.redPrimary}50`,
    primaryText: palette.black,

    secondaryText: palette.gray,
    lightText: palette.white,

    grayLight: `${palette.gray}50`,

    success: palette.green,
    successLight: `${palette.green}50`,
    error: palette.redDark,
    info: palette.orange,
    blue: palette.blue,
    blueLight: `${palette.blue}50`,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  borderRadii: {
    s: 8,
    m: 16,
    l: 24,
    xl: 50,
  },
  textVariants: {
    header: {
      fontSize: 24,
      fontWeight: "bold",
      // textAlign: "center",
      color: "primaryText",
    },
    subheader: {
      fontSize: 20,
      fontWeight: "bold",
      color: "primaryText",
    },
    body: {
      fontSize: 16,
      textAlign: "center",
      color: "primaryText",
    },
    buttonLabel: {
      fontWeight: "bold",
      color: "primaryText",
      fontSize: 14,
      textAlign: "center",
    },
    fieldLabel: {
      color: "primaryText",
      fontSize: 12,
    },
  },
});

export type Theme = typeof theme;
export default theme;
