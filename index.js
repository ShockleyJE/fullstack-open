const http = require("http");
const express = require("express");
const path = require("path");
const cors = require("cors");
const { response } = require("express");
const morgan = require("morgan");
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

//Morgan test
app.use(morgan("tiny"));
//Morgan test end

// Middleware test
const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:  ", request.path);
  console.log("Body:  ", request.body);
  console.log("---");
  next();
};

//app.use(requestLogger);

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.get("/", (request, response) => {
  console.log(request.headers);
  response.send("<h1>Hello World!</h1>");
});

app.use(unknownEndpoint);

//Middleware test end

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.get("/api/persons/:id", (request, response) => {
  const id = String(request.params.id);
  if (data[id]) {
    const item = data.filter((x) => x.id == id);
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
  let name, number;
  let id = Math.floor(Math.random() * 100);
  //The name or number is missing
  try {
    name = String(request.body.name);
    number = String(request.body.number);
  } catch {
    console.log("params do not exist in request");
    response.sendStatus(400);
  }
  //The name already exists in the phonebook
  if (data.filter((x) => x.name === name).length > 0) {
    console.log(`${name} exists in the database`);
    response.sendStatus(418);
  } else {
    data.push({
      id: id,
      name: name,
      number: number,
    });
    response.json(data.filter((x) => x.id === id));
  }
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
