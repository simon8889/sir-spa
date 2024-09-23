import globals from "globals"
import pluginJs from "@eslint/js"
import tseslint from "typescript-eslint"
import pluginReact from "eslint-plugin-react"


export default [
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "indent": ["error", 2],
      "semi": ["error", "never"],
      "quotes": ["error", "double"],
      "jsx-quotes": ["error", "prefer-double"],
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
]