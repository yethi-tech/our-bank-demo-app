/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        sm: "12px",
        md: "14px",
        lg: "16px",
        xl: "20px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      borderWidth: {
        DEFAULT: "1px",
        0: "0",
        2: "2px",
        3: "3px",
        4: "4px",
        6: "6px",
        8: "8px",
      },
      colors: {
        "tenjin-primary": "#44409A",
        "tenjin-primary-light": "#5B58A9",
        "tenjin-secondary": "#BF1E1E",
        "tenjin-secondary-light": "#CC3F3F",
        "tenjin-success": "#2C7413",
        "tenjin-success-light": "#5EA342",
        "tenjin-error": "#BE1515",
        "tenjin-error-light": "#F8533F",
        "tenjin-info": "#70BBFD",
        "tenjin-info-light": "#A6EDFF",
        "tenjin-warning": "#EB9A31",
        "tenjin-warning-light": "#FFCB62",
      },
    },
  },
  plugins: [],
};
