import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import App from "../src/App";
import Statsig from "statsig-node";

const PORT = process.env.PORT || 3006;
const app = express();

app.get("/", async (req, res) => {
  await Statsig.initialize(
    "secret-9IWfdzNwExEYHEW4YfOQcFZ4xreZyFkbOXHaNbPsMwW"
  );

  const bootstrap = Statsig.getClientInitializeResponse({ userID: "Foo" });
  const app = ReactDOMServer.renderToString(<App bootstrap={bootstrap} />);
  const indexFile = path.resolve("./build/index.html");

  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }

    return res.send(
      data
        .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
        .replace(
          '<script id="statsig-state"></script>',
          `<script id="statsig-state">window.__STATSIG_INITIALIZE_VALUES=${JSON.stringify(
            bootstrap
          )}</script>`
        )
    );
  });
});

app.use(express.static("./build"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
