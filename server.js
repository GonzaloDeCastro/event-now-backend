const app = require("./src/app");

const PORT = process.env.PORT || 3001;
const version = require("./package.json").version;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} - v${version}`);
});
