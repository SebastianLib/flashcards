import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import SignIn from "./Pages/SignIn";
import PrivateRoute from "./components/PrivateRoute";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Profile from "./Pages/Profile";
import Landing from "./Pages/Landing";
import Create from "./Pages/Create";
import Sets from "./Pages/Sets";
import Set from "./Pages/Set";

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <Landing />
                </PrivateRoute>
              }
            />
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="/create"
              element={
                <PrivateRoute>
                  <Create />
                </PrivateRoute>
              }
            />
            <Route
              path="/sets"
              element={
                <PrivateRoute>
                  <Sets />
                </PrivateRoute>
              }
            />
            <Route
              path="/set/:id"
              element={
                <PrivateRoute>
                  <Set />
                </PrivateRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-in" element={<SignIn />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}
