import React from 'react';
import { useRoutes } from './routes'
import { BrowserRouter } from "react-router-dom"
import { useAuth } from './hooks/auth.hook'
import {AuthContext} from './context/authContext'

import "materialize-css"

function App() {
  const {token, login, logout, userId} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  return (
    
    <div className="container">
      <header className="App-header">
        <AuthContext.Provider value={{
          token, userId, login, logout, isAuth
        }}>
          <BrowserRouter>
            {routes}
          </BrowserRouter>
        </AuthContext.Provider>
      </header>
    </div>
  );
}

export default App;
