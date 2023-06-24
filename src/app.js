import express from "express";
import { engine } from "express-handlebars";
import routes from "./routes/index.routes.js";
import path from "path";
import morgan from "morgan";
import { ENVIRONMENT } from "./config.js";

const app = express();

// settings
app.set("port", process.env.PORT || 3000);
const { pathname: rootViews } = new URL("../src/views", import.meta.url);
if (ENVIRONMENT === "development") {
  app.set("views", rootViews.slice(1));
} else {
  app.set("views", rootViews);
}

app.engine(
  ".hbs",
  engine({
    extname: ".hbs",
    layoutsDir: path.join(app.get("views"), "layouts"),
    partialsDir: path.join(app.get("views"), "partials"),
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
const { pathname: rootPublic } = new URL("../src/public", import.meta.url);

if (ENVIRONMENT === "development") {
  app.use(express.static(rootPublic.slice(1)));
} else {
  app.use(express.static(rootPublic));
}

app.use((req, res, next) => {
  res.status(404).render("404");
});

export default app;
