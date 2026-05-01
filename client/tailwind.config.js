module.exports = {
  content: ["./App.{js,jsx}", "./src/**/*.{js,jsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#000000",
        "primary-light": "#F4F4F4",
        "primary-dark": "#171717",
        background: "#FFFFFF",
        surface: "#FAFAFA",
        border: "#E2E2E2",
        "text-primary": "#111111",
        "text-muted": "#909090",
        danger: "#E24B4A",
        success: "#1D9E75",
        warning: "#EF9F27",
      },
      fontFamily: {
        sans: ["Nunito_400Regular"],
        medium: ["Nunito_500Medium"],
        semibold: ["Nunito_600SemiBold"],
        bold: ["Nunito_700Bold"],
      },
    },
  },
  plugins: [],
};
