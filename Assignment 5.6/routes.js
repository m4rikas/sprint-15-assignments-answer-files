"use strict";

import express from "express";
export const router = express.Router();

router.get("/", (request, response) => {
  console.log(request.query);
  response.send(`Your 5.6 app is running!!"`);
});

router.get("/search", (request, response) => {
  console.log(request.query);
  const query = request.query;
  const { q } = request.query;
  response.send(`You searched for ${query} and ${q}"`);
});
