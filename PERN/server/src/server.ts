import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/connection.js";
import routes from "./routes/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// Serves static files in the entire client's dist folder
app.use(express.static("../client/dist"));

app.use(express.json());

app.get('/*', function (_req, res) {
  res.sendFile(path.join(__dirname, '../../client/dist', 'index.html'));
});
app.use(routes);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
