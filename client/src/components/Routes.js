import React from "react"
import { Route, Switch, Redirect } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"

import Auth from "../components/Auth"
import Navbar from "../components/Navbar"
import MainPage from "../pages/MainPage"
import SearchPage from "../pages/SearchPage"
import CategoriesPage from "../pages/CategoriesPage"
import AnnouncementsPage from "../pages/AnnouncementsPage"
import AnnouncementPage from "../pages/AnnouncementPage"
import ModPage from "../pages/ModPage"
import UserPage from "../pages/UserPage"
import UsersPage from "../pages/UsersPage"
import { resetNavbar } from "../redux/navbar/navbarActions"

function Routes() {
  const {
    auth: { token },
    navbar: { dropMenu, authForm },
  } = useSelector((state) => state)
  const dispatch = useDispatch()

  return (
    <>
      <Navbar />
      <Auth />
      <div
        onClick={() => dispatch(resetNavbar())}
        className={`background ${
          (dropMenu || authForm) && "background--active"
        }`}
      ></div>
      {token.token ? (
        token.user.typeUser === "user" ? (
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/search' component={SearchPage} />
            <Route exact path='/categories' component={CategoriesPage} />
            <Route path='/create' component={ModPage} />
            <Route exact path='/user' component={UserPage} />
            <Route
              path='/categories/:categoryName'
              component={AnnouncementsPage}
            />
            <Route
              path='/details/:announcementId'
              component={AnnouncementPage}
            />
            <Route path='/edit/:announcementId' component={ModPage} />
            <Route path='/user/:userId' component={UserPage} />
            <Redirect to='/' />
          </Switch>
        ) : (
          <Switch>
            <Route exact path='/' component={MainPage} />
            <Route path='/search' component={SearchPage} />
            <Route exact path='/categories' component={CategoriesPage} />
            <Route path='/create' component={ModPage} />
            <Route path='/users' component={UsersPage} />
            <Route exact path='/user' component={UserPage} />
            <Route
              path='/categories/:categoryName'
              component={AnnouncementsPage}
            />
            <Route
              path='/details/:announcementId'
              component={AnnouncementPage}
            />
            <Route path='/edit/:announcementId' component={ModPage} />
            <Route path='/user/:userId' component={UserPage} />
            <Redirect to='/' />
          </Switch>
        )
      ) : (
        <Switch>
          <Route exact path='/' component={MainPage} />
          <Route path='/search' component={SearchPage} />
          <Route exact path='/categories' component={CategoriesPage} />
          <Route
            path='/categories/:categoryName'
            component={AnnouncementsPage}
          />
          <Route path='/details/:announcementId' component={AnnouncementPage} />
          <Route path='/user/:userId' component={UserPage} />
          <Redirect to='/' />
        </Switch>
      )}
    </>
  )
}

export default Routes
