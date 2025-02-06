require("dotenv").config({ path: __dirname + "/../.env" });

const express = require("express");
const cors = require("cors");
const app = express();

const fs = require("fs");
const csv = require("fast-csv");
const ws = fs.createWriteStream("data.csv");

app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("GEMINI_API_KEY is required");
  process.exit(1);
}

const { GoogleGenerativeAI } = require("@google/generative-ai");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/create_cards", async (req, res) => {
  try {
    const { prompt } = req.body;
    console.log("Data RECEIVED", prompt);
    console.log("Fetching data from model");
    const genAI = new GoogleGenerativeAI(`${GEMINI_API_KEY}`);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);

    console.log("Displaying result from model");
    if (result.error) {
      console.error(result.error);
      return;
    }

    text = result.response.candidates[0].content.parts[0].text;

    parsed_text = text.replaceAll("*", "");
    console.log("Parsed Text not the Returned", parsed_text);
    let returned_text = [];
    parsed_text.split(",,").map((line) => {
      if (line.trim() !== "") {
        returned_text.push([
          line.split(">")[0],
          line.split(">")[1],
          line.split(">")[2],
        ]);
      }
    });

    returned_text = returned_text.map((val, idx) => {
      return {
        card_number: val[0],
        question: val[1],
        answer: val[2],
      };
    });
    console.log("Text", returned_text);

    res.send(returned_text);

    // console.log("Text", parsed_text);

    // const csv = require("csv-parser");
    // const fs = require("fs");
    // const parsed_doc = [];

    // fs.createReadStream("data.csv")
    //   .pipe(csv())
    //   .on("data", (row) => {
    //     parsed_doc.push(row);
    //   })
    //   .on("end", () => {
    //     console.log("CSV file successfully processed");
    //     console.log(parsed_doc);
    //   });
  } catch (error) {
    console.error(error);
  }
});

app.get("/test", (req, res) => {
  res.send("Hello World");
});

app.listen(8080, () => {
  console.log("Server is running on port 8080");
});
