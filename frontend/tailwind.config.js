/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";

export default {
  content: ["./**/*.php", "./assets/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        yuGothic: ["Yu Gothic", "YuGothic", "游ゴシック", "游ゴシック体", "sans-serif"],
        notoSans: ["Noto Sans JP", "sans-serif"],
        notoSansVertical: ["Noto Sans JP Vertical", "sans-serif"],
        notoSerif: ["Noto Serif JP", "serif"],
        cabin: ["Cabin", "serif"],
        roboto: ["Roboto", "serif"],
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
        interTight: ["Inter Tight", "sans-serif"],
        "playfair-display": ["Playfair Display", "serif"],
        josefin: ["Josefin Sans", "sans-serif"],
        cormorant: ["Cormorant Garamond", "serif"],
      },
      colors: {
        border: "#DFDFDF",
        orange: "#EF742E",
        white: "#fff",
        black: "#282828",
        lightOrange: "#FFF4E5",
        paleOrange: "#FFFAF2",
        beige: "#EDE8E1",
        lightBeige: "#EDE8E1",

        red: "#A50034",
        blue: "#00317F",
        green: "#00807D",
        olive: "#757633",
        violet: "#4603C5",
        navy: "#0C3085",
        gray: "#5A5A5A",

        lightBlue: "#749CDB",
        lightGreen: "#98D4D3",
        lightOlive: "#D7D8AB",
        lightViolet: "#C4B1EA",
        lightNavy: "#0066FF",
        lightGray: "#F2F2F2",
        darkBlue: "#022660",
        darkGreen: "#004544",
        darkOlive: "#4B4C0F",
        darkViolet: "#2C027C",
        darkNavy: "#0A2667",
        darkRed: "#800129",
        darkGray: "#444444",
        darkBorder: "#383838",
        paleBlue: "#EAF0F8",
        paleGreen: "#EBF6F6",
        paleOlive: "#F6F6EC",
        paleViolet: "#F6F3FA",
        paleNavy: "#F4F8FD",
        paleGray: "#F5F5F5",
        mediumBlue: "#DCE7F9",
        mediumGreen: "#CFEDEC",
        mediumOlive: "#F1F1E0",
        mediumViolet: "#F1ECFB",
        mediumGray: "#B3B3B3",
      },
      dropShadow: {
        limePc: "0 calc((100vw / 1920) * 6) calc((100vw / 1920) * 6) rgba(209,223,142,1)",
        lime: "0 calc((100vw / 420) * 6) calc((100vw / 420) * 6) rgba(209,223,142,1)",
      },
      screens: {
        sp: "480px",
        md: "768px",
        lg: "1024px",
        pc: "1272px",
        "2pc": "1921px",
        hoverable: { raw: "(hover: hover) and (pointer: fine)" },
      },
      fontSize: {
        ...Object.fromEntries(
          Array.from({ length: 160 }, (_, index) => {
            let size = 1 + index;
            return [`${size}`, `${size}rem`];
          })
        ),
      },
      fontWeight: {
        thin: "100",
        extralight: "200",
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        extrabold: "800",
        black: "900",
      },
      lineHeight: {
        ...Object.fromEntries(
          Array.from({ length: 120 }, (_, index) => {
            let size = 1 + index;
            return [`${size}`, `${size}rem`];
          })
        ),
      },
      spacing: {
        0: "0rem",
        ...Object.fromEntries(
          Array.from({ length: 2000 }, (_, index) => {
            let size = 1 + index;
            return [`${size}`, `${size}rem`];
          })
        ),
      },
      borderWidth: {
        0: "0rem",
        ...Object.fromEntries(
          Array.from({ length: 99 }, (_, index) => {
            let size = 2 + index;
            return [`${size}`, `${size}rem`];
          })
        ),
      },
      borderRadius: {
        0: "0rem",
        ...Object.fromEntries(
          Array.from({ length: 200 }, (_, index) => {
            let size = 1 + index;
            return [`${size}`, `${size}rem`];
          })
        ),
      },
      inset: {
        0: "0rem", // `top-0` を復活させる
        // top / left / right / bottom に適用するカスタム値
        ...Object.fromEntries(
          Array.from({ length: 2000 }, (_, index) => {
            let size = 1 + index;
            return [`${size}`, `${size}rem`];
          })
        ),
      },
      scale: {
        0: "0", // `scale-0` を追加
        ...Object.fromEntries(
          Array.from({ length: 500 }, (_, index) => {
            let size = 1 + index;
            return [`${size}`, `${size / 100}`]; // `scale-100` で1倍（デフォルトの100%）
          })
        ),
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, e }) {
      const newUtilities = {
        ".vertical-rl": {
          writingMode: "vertical-rl",
          "-webkit-writing-mode": "vertical-rl",
          "text-orientation": "upright",
          "-webkit-text-orientation": "upright",
        },
        ".vertical-lr": {
          writingMode: "vertical-lr",
          "-webkit-writing-mode": "vertical-lr",
          "text-orientation": "upright",
          "-webkit-text-orientation": "upright",
        },
        ".half-leading": {
          marginBlock: "calc((1em - 1lh) / 2)",
        },
        ".abs-center": {
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center",
        },
        ".p-notoSans": {
          paddingBottom: "0.1em",
        },
        ".p-yuGothic": {
          paddingTop: "0.08em",
        },
      };
      addUtilities(newUtilities);
    }),
  ],
};
