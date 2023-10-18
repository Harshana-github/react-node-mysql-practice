import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  database: "test",
});

const db = pool.promise();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello, this is the backend!");
});

app.post("/books", async (req, res) => {
  try {
    const values = [
      req.body.title,
      req.body.desc,
      req.body.cover,
      req.body.price,
    ];
    const data = await db.query(
      "INSERT INTO books (`title`, `desc`, `cover`, `price`) VALUES (?, ?, ?, ?)",
      values
    );
    res.json("Book created successfully!");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.get("/books", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM books;");
    res.json(rows);
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const data = await db.query("DELETE FROM books WHERE id = ?", bookId);
    res.json("Book Deleted successfully!");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.put("/books/:id", async (req, res) => {
  try {
    const bookId = req.params.id;
    const title = req.body.title;
    const description = req.body.desc;
    const price = req.body.price;
    const cover = req.body.cover;

    const sql = `UPDATE books SET title = '${title}', \`desc\` = '${description}', price = '${price}', cover = '${cover}' WHERE id = ${bookId}`;

    const data = await db.query(sql);

    res.json("Book Updated successfully!");
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "An error occurred while fetching data." });
  }
});

app.listen(8800, () => {
  console.log("Connected to the backend!");
});
