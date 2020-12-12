import React, { useContext } from 'react';
import firebaseConfig from './Firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';


const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0){
        firebase.initializeApp(firebaseConfig);   
    }

    const handleGoogleSignIn = () => {

        var provider = new firebase.auth.GoogleAuthProvider();

        firebase.auth().signInWithPopup(provider).then(function(result) {
          const {displayName, email} = result.user;
          const signedInhUser = {name: displayName, email};

          setLoggedInUser(signedInhUser);
          storeAuthToken();
            history.replace(from)

          }).catch(function(error) {
            const errorMessage = error.message;
            console.log(errorMessage); 

          });
    }

    const storeAuthToken = () => {
      firebase.auth().currentUser.getIdToken(true)
      .then(function(idToken) {
        sessionStorage.setItem('token', idToken);
        console.log(idToken);
      }).catch(function(error) {
        // Handle error
      });
    }

    return (
        <div>
            <h1>This is Login</h1>
            <button onClick={handleGoogleSignIn}>Google Sign in</button>
        </div>
    );
};

export default Login;