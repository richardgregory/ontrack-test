import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

import Books from "./components/Books";
import "./theme/theme.scss";

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Books />
      </Route>
    </BrowserRouter>
  );
}

export default App;
