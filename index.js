const http = require("http");
const express = require("express");
const { response } = require("express");
//const { response } = require("express");

const data = [
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
//app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.headers);
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  console.log(request.headers);
  response.json(data);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
