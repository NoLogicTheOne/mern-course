import React from 'react';
import { useRoutes } from './routes'
import {BrowserRouter} from "react-router-dom"

import "materialize-css"

function App() {
  const routes = useRoutes(false)
  return (
    <div className="container">
      <header className="App-header">
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
