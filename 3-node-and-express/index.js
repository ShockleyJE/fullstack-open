const http = require("http");
const express = require("express");
const { response } = require("express");

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2022-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2022-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2022-05-30T19:20:14.298Z",
    important: true,
  },
];

const generateId = () => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0;
  return maxId + 1;
};

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request.headers);
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/notes/", (request, response) => {
  console.log(request.headers);
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  console.log(request.headers);
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    //undefined is falsy, therefore we'd send a 404
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  console.log(request.headers);
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);

  response.status(204).end();
});

app.post("/api/test/", (request, response) => {
  console.log(request.headers);
  console.log(request.body);
  response.json(request.body);
});

app.post("/api/notes", (request, response) => {
  const body = request.body;

  if (!body.content) {
    return response.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
    date: new Date(),
    id: generateId(),
  };

  notes = notes.concat(note);

  response.json(note);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
