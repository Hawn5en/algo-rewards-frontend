import { extendTheme, ThemeConfig } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools"; // helper to read color mode in style functions

//
// 1. Chakra Theme Configuration
//    - initialColorMode: 'light' or 'dark'
//    - useSystemColorMode: false => rely on user's toggle
//
const config: ThemeConfig = {
  initialColorMode: "dark",
  useSystemColorMode: true,
};

//
// 2. Define color palettes for light/dark modes
//
// We'll create a "brand" palette (for light mode)
// and a "brandDark" palette for dark mode.
// You can further customize these hex values to match Algorand's identity.
//
const colors = {
  brand: {
    50: "#f5f5f5", // light gray background
    100: "#ededed",
    200: "#d4d4d4",
    300: "#bababa",
    400: "#919191",
    500: "#000000", // primary black
    600: "#1a1a1a",
    700: "#141414",
    800: "#0f0f0f",
    900: "#0a0a0a",
  },
  // "brandDark" could be used for dark mode overrides
  brandDark: {
    50: "#E0E8F0", // Very Light Blue Gray
    100: "#B3C1D6", // Light Blue Gray
    200: "#8092BB", // Soft Blue
    300: "#4D63A1", // Medium Blue
    400: "#1A3B86", // Dark Blue
    500: "#001324", // Base Dark Blue
    600: "#00101F", // Very Dark Blue
    700: "#000D1A", // Extremely Dark Blue
    800: "#000A15", // Near-Black Blue
    900: "#00060F", // Blackish Blue
  },
  accent: {
    50: "#e4fbf9",
    100: "#c9f7f3",
    200: "#90efe8",
    300: "#57e7dc",
    400: "#1ddfd0",
    500: "#00b19e", // teal accent
    600: "#009381",
    700: "#007469",
    800: "#005552",
    900: "#003a3c",
  },
};

//
// 3. Define fonts (optional; adjust as needed)
//
const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
};

//
// 4. Global style overrides
//    - Use the "mode" function from @chakra-ui/theme-tools to conditionally
//      pick light vs. dark colors based on the user's current color mode.
//
const styles = {
  global: (props: any) => ({
    "html, body": {
      bg: mode("brand.50", "brandDark.500")(props), // light vs. dark background
      color: mode("brand.500", "brandDark.500")(props), // light vs. dark text
      margin: 0,
      padding: 0,
    },
  }),
};

//
// 5. Extend the default Chakra theme
//
const theme = extendTheme({
  config,
  colors,
  fonts,
  styles,
});

export default theme;
