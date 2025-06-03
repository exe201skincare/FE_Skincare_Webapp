import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";
import LoginPage from "../../pages/LoginPage/LoginPage";

const AuthContext = createContext(null);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedEmail = sessionStorage.getItem("email");

    if (savedEmail) {
      setUserAuth({ email: savedEmail });
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const updatedEmail = sessionStorage.getItem("email");

      if (updatedEmail) {
        setUserAuth({ email: updatedEmail });
      } else {
        setUserAuth(null);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const login = async (email, password) => {
    try {
      console.log("email: " + email + " pass: " + password);
      const response = await axios.post("https://skincareapp.somee.com/SkinCare/Auth/login", 
        { email, password },
        { withCredentials: true } 
      );

      if (response) {
        sessionStorage.setItem("username", response.data.name);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("LoggedInAs", "AccountIndex");
        
        window.dispatchEvent(new Event("storage"));

        return response.data;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const googleLogin = async (email, idToken) => {
    try {
      const response = await axios.post("https://skincareapp.somee.com/SkinCare/Auth/login-google", 
        { idToken }
      );

      if (response) {
        sessionStorage.setItem("username", response.data.name);
        sessionStorage.setItem("role", response.data.role);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("LoggedInAs", "Google");
        
        window.dispatchEvent(new Event("storage"));

        return response.data;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const logout = () => {
  axios.post(
      "https://skincareapp.somee.com/SkinCare/Auth/logout",
      {},
      { withCredentials: true }
    ).finally(() => {
      sessionStorage.clear();
      window.dispatchEvent(new Event("storage"));
    });
  };

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <AuthContext.Provider value={{ userAuth, login, googleLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};


//#region 
// import axios from "axios";
// import { useState, useContext, createContext, useEffect } from "react";

// const AuthContext = createContext(null);

// export const useAuth = () => {
//   return useContext(AuthContext);
// };

// export const AuthProvider = ({ children }) => {
//   const [userAuth, setUserAuth] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const savedUser = sessionStorage.getItem("username");
//     // const savedRole = sessionStorage.getItem("selectedRole");

//     if (savedUser && savedRole) {
//       setUserAuth({ username: savedUser/*, role: savedRole*/ });
//     }
//     setLoading(false);
//   }, []);

//   useEffect(() => {
//     const handleStorageChange = () => {
//       const updatedUser = sessionStorage.getItem("username");
//       //const updatedRole = sessionStorage.getItem("selectedRole");

//       if (updatedUser && updatedRole) {
//         setUserAuth({ username: updatedUser/*, role: updatedRole*/ });
//       } else {
//         setUserAuth(null);
//       }
//     };

//     window.addEventListener("storage", handleStorageChange);
//     return () => window.removeEventListener("storage", handleStorageChange);
//   }, []);

//   const login = async (username, password) => {
//     try {
//       const response = await axios.post(
//         "http://",
//         { username, password }
//       );

//       if (response.status === 200 && response.data.success) {
//         const token = response.data.data; // JWT Token
//         const payload = JSON.parse(atob(token.split(".")[1])); // Decode JWT
//         const { sub, role } = payload; // Extract username & role

//         sessionStorage.setItem("accessToken", token);
//         sessionStorage.setItem("username", sub);
//         //sessionStorage.setItem("selectedRole", role);

//         window.dispatchEvent(new Event("storage"));

//         return sub; // Return the role
//       }
//     } catch (error) {
//       console.error("Login error:", error);
//       return null;
//     }
//   };

//   const logout = () => {
//     sessionStorage.clear();
//     window.dispatchEvent(new Event("storage"));
//   };

//   if (loading) {
//     return <div className="loader" />;
//   }

//   return (
//     <AuthContext.Provider value={{ userAuth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };