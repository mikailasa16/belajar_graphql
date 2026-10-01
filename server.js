require("dotenv").config();

const app = require("./src/models/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server berjalan pada http://localhost:${PORT}`);
});