import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";
import cors from "cors";

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
