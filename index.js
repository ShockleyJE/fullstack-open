const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const { response } = require("express");
//const { response } = require("express");

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const app = express();

const PORT = 3001;

const JAVASCRIPT = path.join(__dirname, "js");
const CSS = path.join(__dirname, "css");
const HTML = path.join(__dirname, "html");

app.use(cors());
app.use(express.static("js"));
app.use(express.static("css"));
app.use(express.static("html"));

app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.headers);
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  console.log(request.headers);
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  if (data[id]) {
    const item = data.filter((x) => x.id == id);
    console.log(item);
    response.json(item);
  } else {
    console.log("it aint here, chief");
    response.sendStatus(404);
  }
});

//TODO: Subsequent deletes do not work for some reason.
// Try deleting 2 -> 3
app.delete("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  if (data[id]) {
    data = data.filter((x) => x.id != id);
    console.log("deleted item");
    response.json(data);
  } else {
    console.log("it aint here, chief");
    response.sendStatus(404);
  }
});

app.post("/api/persons/", (request, response) => {
  console.log(request.body);
  let name, number;
  let id = Math.floor(Math.random() * 100);
  try {
    name = String(request.body.name);
    number = String(request.body.number);
  } catch {
    console.log("params do not exist in request");
    response.sendStatus(400);
  }
  data.push({
    id: id,
    name: name,
    number: number,
  });
  response.json(data.filter((x) => x.id === id));
});

app.get("/api/info", (request, response) => {
  const reply = {
    time: new Date(),
    people: data.length,
  };
  response.json(reply);
});

app.get("/info", (request, response) => {
  response.sendFile(HTML + "/info.html");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
