import { useEffect, useState } from "react";
import { getAuth, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import initializeAuthentication from "../Firebase/firebase.initialize";

initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState({});
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    const registerNewUser = (email, password, name) => {
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const setUserName = (name) => {
        updateProfile(auth.currentUser, { displayName: name })
          .then(result => { })
    };

    const processLogin = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        signOut(auth)
        .then(() => {
            setUser({});
        })
        .catch(error => {
            setError(error.message);
        })
        .finally(() => setIsLoading(false));
    };

    useEffect( () => {
        onAuthStateChanged(auth, user => {
            if(user) {
                setUser(user);
            }
            else {
                setUser({});
            };
            setIsLoading(false)
        });
    }, [auth]);

    return {
        user,
        setUser,
        error,
        setError,
        isLoading,
        setIsLoading,
        processLogin,
        setUserName,
        registerNewUser,
        logOut
    };
};

export default useFirebase;