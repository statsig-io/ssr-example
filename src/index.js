import React from "react";
import { hydrateRoot } from "react-dom/client";

import App from "./App";

const container = document.getElementById("root");
const bootstrap = window.__STATSIG_INITIALIZE_VALUES;

hydrateRoot(container, <App bootstrap={bootstrap} />);
