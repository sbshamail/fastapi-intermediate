# README

## Prettier Configure

```bash #terminal
npm install --save-dev prettier
npm install --save-dev eslint-config-prettier eslint-plugin-prettier

```

```bash #create file .prettierrc
{
  "semi": true,               // Adds semicolons at the end of statements
  "trailingComma": "es5",     // Add trailing commas where valid in ES5 (objects, arrays, etc.)
  "singleQuote": true,        // Use single quotes instead of double quotes
  "tabWidth": 2,              // Use 2 spaces for indentation
  "useTabs": false,           // Use spaces instead of tabs
  "printWidth": 80,           // Wrap lines at 80 characters
  "endOfLine": "auto"         // Automatically detect the appropriate line ending
}

```

```bash #create file .prettierignore
  node_modules
  .next
  build
  dist

```

```bash #format package.json script
  "format": "prettier --write .",
```

## package not install due to react 19

```bash #note
add at the end "--legacy-peer-deps"
# npm i package --legacy-peer-deps
```
