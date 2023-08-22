import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
// userObject expected ---->
// {
//   email: "",
//   password: "",
//   fullName: "",
// }
const registerNewUser = (userAuth) => {
  return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(userAuth)
  })
}

const handleRegister = (userAuth) => {
  
  return fetch(`http://localhost:8088/users?email=${userAuth.email}`)
      .then(res => res.json())
      .then(response => {
          if (response.length > 0) {
              // Duplicate email. No good.
              
          }
          else {
              // Good email, create user.
              registerNewUser(userAuth)
          }
      })
}
export const emailAuth = {
  // Register New User
  register: function(userObj, navigate) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, userObj.email, userObj.password)
      .then((userCredential) => {
        const auth = getAuth();
        updateProfile(auth.currentUser, {
          displayName: userObj.fullName,
        }).then(
          function() {
            const userAuth = {
              email: userCredential.user.email,
              displayName: userObj.fullName,
              uid: userCredential.user.uid,
              type: "email",
              isStaff: userObj.isStaff = 'true' ? true : false
            };
        handleRegister(userAuth)

            // Saves the user to localstorage
            localStorage.setItem("capstone_user", JSON.stringify(userAuth));
            // Navigate us back to home
            navigate("/");
          },
          function(error) {
            console.log("Email Register Name Error");
            console.log("error code", error.code);
            console.log("error message", error.message);
          }
        );
      })
      .catch((error) => {
        console.log("Email Register Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
  // Sign in existing user
  signIn: function(userObj, navigate) {
    return new Promise((res) => {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, userObj.email, userObj.password)
        .then((userCredential) => {
          const userAuth = {
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            uid: userCredential.user.uid,
            type: "email",
            isStaff: userObj.isStaff = 'true' ? true : false
          };
          // Saves the user to localstorage
          localStorage.setItem("capstone_user", JSON.stringify(userAuth));
          // Navigate us back to home
          navigate("/");
          window.location.reload(false)
        })
        .catch((error) => {
          console.log("Email SignIn Error");
          console.log("error code", error.code);
          console.log("error message", error.message);
        });
    });
  },
  // Sign out
  signOut: function(navigate) {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        // Remove the user from localstorage
        localStorage.removeItem("capstone_user");
        // Navigate us back to home
        navigate("/");
        console.log("Sign Out Success!");
      })
      .catch((error) => {
        console.log("signOut Error");
        console.log("error code", error.code);
        console.log("error message", error.message);
      });
  },
};
