import express from "express";
import { engine } from "express-handlebars";
import routes from "./routes/index.routes.js";
import path from "path";
import morgan from "morgan";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);
const { pathname: pathnameViews } = new URL("../src/views", import.meta.url);
const rootViews = pathnameViews.substring(1);
app.set("views", rootViews);

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    defaultLayout: "main",
  })
);

app.set("view engine", ".hbs");

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

// routes
app.use(routes);

// public route
const { pathname: pathnamePublic } = new URL("../src/public", import.meta.url);
const rootPublic = pathnamePublic.substring(1);
app.use(express.static(rootPublic));

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
