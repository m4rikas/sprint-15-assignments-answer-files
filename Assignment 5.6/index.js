import express from "express";
import { router } from "./router/routes.js";

const app = express();
const PORT = 3000;

app.use(router);

app.get("/", (request, response) => {
  //   console.log(request.query);
  const { q } = request.query; // store the request
  response.send(`You searched for "${q}"`);
});

app.listen(PORT, () => {
  console.log(
    `Server has been started, and is listening on port ${PORT}.`
  );
});
