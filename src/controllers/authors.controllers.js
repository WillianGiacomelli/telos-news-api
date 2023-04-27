const uuid = require("uuid");

const { generateHash } = require("../utils/hashProvider");

const { request, response } = require("express");

const authors = [
  {
    id: "880bd807-e27e-4907-8279-420dbacd9f77",
    name: "Willian",
    biography: "Student",
    email: "willian@example.com",
    password: "password1234",
    createdAt: "2023-04-27T02:29:28.556Z",
    modifiedAt: null,
  },
];

const list = (request, response) => {
  return response.json(authors);
};

const create = async (request, response) => {
  const { name, biography, email, password } = request.body;

  const emailAlreadyExists = authors.findIndex((a) => a.email === email);

  if (emailAlreadyExists !== -1) {
    return response.json({
      error: "@authors/create",
      message: `author already exists ${email}`,
    });
  } else {
    const hashedPassword = await generateHash(password);

    const id = uuid.v4();

    const creationDate = new Date();

    const author = {
      id: id,
      name,
      biography,
      email,
      password,
      createdAt: creationDate,
      modifiedAt: null,
    };

    authors.push(author);

    return response.status(201).json(author);
  }
};

const getById = (request, response) => {
  const id = request.params.id;

  const author = authors.find((a) => a.id == id);

  if (!author) {
    return response.status(400).json({
      error: "@authors/getById",
      message: `author not found ${id}`,
    });
  }

  return response.json(author);
};

const update = (request, response) => {
  const { id } = request.params;

  const { name, biography, email, password, createdAt } = request.body;

  const authorIndex = authors.findIndex((u) => u.id === id);

  if (authorIndex < 0) {
    return response.json({
      error: "@authors/update",
      message: `author not found ${id}`,
    });
  } else {
    const updatedTime = new Date();

    const authorUpdated = {
      id: id,
      name,
      biography,
      email,
      password,
      createdAt,
      modifiedAt: updatedTime,
    };

    authorIndex[authorIndex] = authorUpdated;

    return response.json(authorUpdated);
  }
};

const remove = (request, response) => {
  const { id } = request.params;

  const authorIndex = authors.findIndex((a) => a.id === id);

  if (authorIndex < 0) {
    return response.status(400).json({
      error: "@authors/remove",
      message: `author not found ${id}`,
    });
  } else {
    authors.splice(authorIndex, 1);

    return response.send();
  }
};

module.exports = {
  getById,
  list,
  create,
  update,
  remove,
};
