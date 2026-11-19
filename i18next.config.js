import { defineConfig } from "i18next-cli";

export default defineConfig({
  locales: ["en"],
  extract: {
    input: ["src/**/*.{js,jsx}"],
    output: () => "src/assets/locales/template.json",
    defaultNS: "translations",
    namespaceSeparator: false,
    keySeparator: ".",
    defaultValue: (key) => key,
    sort: true,
  },
});
