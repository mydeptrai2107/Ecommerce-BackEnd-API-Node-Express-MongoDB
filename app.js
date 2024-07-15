require("dotenv").config();
const app = require("./src");
require("./DB/db-connect");
app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
