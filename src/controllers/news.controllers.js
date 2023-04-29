const { request } = require("express");
const uuid = require("uuid");
const informations = [];

const list = (request, response) => {
  const { author_id, publish_date } = request.query;

  //  console.log(request.query);

  if (author_id && publish_date) {
    informationsFilter = informations.filter(
      (n) => n.author_id === author_id && n.publishDate === publish_date
    );

    return response.json(informationsFilter);
  } else if (author_id) {
    informationsFilter = informations.filter((n) => n.author_id === author_id);

    return response.json(informationsFilter);
  } else if (publish_date) {
    informationsFilter = informations.filter((n) => n.author_id === author_id);

    return response.json(informationsFilter);
  }

  return response.json(informations);
};

const getById = (request, response) => {
  const { id } = request.params;

  const information = informations.find((i) => i.id === id);

  if (!information) {
    return response.status(400).json({
      error: "@informations/getById",
      message: "information not found ${id}",
    });
  }

  return response.json(information);
};

const create = (request, response) => {
  const { title, brief, content, image, publish_date } = request.body;

  const id = uuid.v4();

  const creationDate = new Date();

  const information = {
    id,
    title,
    brief,
    content,
    author_id: request.author.id,
    image,
    publishDate: publish_date,
    createdAt: creationDate,
    modifiedAt: null,
  };

  informations.push(information);

  return response.status(201).json(information);
};

const update = (request, response) => {
  const { id } = request.params;

  const { title, brief, content, image, publish_Date } = request.body;

  const informationIndex = informations.findIndex((i) => i.id === id);

  if (informationIndex < 0) {
    return response.status(400).json({
      error: "@informations/update",
      message: `information not found ${id}`,
    });
  }

  modifyingDate = new Date();

  const { createdAt } = informations[informationIndex];

  const informationUpdated = {
    id,
    title,
    brief,
    content,
    author_id,
    image,
    publishDate,
    createdAt,
    modifiedAt: modifyingDate,
  };
  informations[informationIndex] = informationUpdated;

  return response.status(201).json(informationUpdated);
};

const remove = (request, response) => {
  const { id } = request.params;

  const informationIndex = informations.findIndex((i) => i.id === id);

  if (informationIndex < 0) {
    return response.status(400).json({
      error: "@informations/remove",
      message: `information not found ${id}`,
    });
  }
  informations.splice(informationIndex, 1);

  return response.send();
};

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
