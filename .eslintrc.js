module.exports = {
  "extends": ["airbnb", "plugin:import/react"],
  "rules": {
    "linebreak-style": 0,
    "import/no-unresolved": [
      "error",
      { "ignore": [ "" ] }
    ]
  },
  "globals": {
    "document": true,
    "API_HOST": true,
    "window": true
  }
}