import app from "./app.js";
import "./utils/mongoose.js";

const PORT = app.get("port");
app.listen(PORT, () => console.log(`Server on port ${PORT}`));
