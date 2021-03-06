import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './screens/HomeScreen';

import {
  BrowserRouter as Router,
  Routes,
  // Switch,
  // Switch is replaced by Routes in v6 an elder
  Route,
  // Link
} from "react-router-dom";
import LoginScreen from './screens/LoginScreen';
import { auth } from './firebase';

import { useDispatch, useSelector } from "react-redux"
import { logout, login, selectUser } from './features/userSlice';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  useEffect(() => {
    // unsubscribe : if the component is unmounted > return unsubscribe
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        // Logged in
        console.log(userAuth);
        dispatch(
          login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      } else {
        // Logged out 
        dispatch(logout());
      }
    });

    // not affect performances
    return unsubscribe;
  }, [])

  return (
    <div className="app">
      <Router>
          {!user ? (
            <LoginScreen />
          ) : (
            <div className="app__body">
              <Routes>
                <Route path="/" element={<HomeScreen />} />
                <Route path="/profile" element={<ProfileScreen />} />
              </Routes>
            </div>
          )}   
        </Router>
      </div>
  );
}

export default App;
