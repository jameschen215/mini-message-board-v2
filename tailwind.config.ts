export default {
  content: [
    "./src/public/views/**/*.html",
    "./src/views/**/*.ejs",
    "./src/public/scripts/**/*.{js,mjs,ts}",
  ],
  safelist: [
    "bg-violet-200",
    "bg-red-200",
    "bg-yellow-200",
    "bg-green-200",
    "bg-sky-200",
    "text-violet-200",
    "text-red-200",
    "text-yellow-200",
    "text-green-200",
    "text-sky-200",
    "text-violet-300",
    "text-red-300",
    "text-yellow-300",
    "text-green-300",
    "text-sky-300",
  ],
  plugins: [],
  theme: {
    extend: {},
  },
};
