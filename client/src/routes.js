import React from 'react'
import { Switch, Route, Redirect } from "react-router-dom"
import { LinksPage } from "./pages/LinksPage"
import { CreatePage } from './pages/CreatePage'
import { DetailPage } from './pages/DetailPage'
import { AuthPage } from './pages/Auth'

export const useRoutes = isAuthtorise => {
    if(isAuthtorise){
        return (
            <Switch>
                <Route path="/links" exact> 
                    <LinksPage />
                </Route>
                <Route path="/create" exact> 
                    <CreatePage />
                </Route>
                <Route path="/detail:id"> 
                    <DetailPage />
                </Route>
                <Redirect to="/create" />
            </Switch>
        )
    } else {
        return (
            <Route path='/'>
                <AuthPage />
            </Route>
        )
    }
}