import app from "./src/app.js";
import connectDB from "./src/utils/db.js";

const PORT = process.env.PORT;

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
