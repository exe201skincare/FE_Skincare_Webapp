import axios from "axios";
import { useState, useContext, createContext, useEffect } from "react";

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
      // Temporary hardcoded check (simulating API response)
      const dummyEmail = "nhatservicebotmail@gmail.com";
      const dummyPassword = "cabhaftswgjgkvlz";

      if (email === dummyEmail && password === dummyPassword) {
        // Simulated JWT
        const simulatedToken = generateDummyJWT(email);

        sessionStorage.setItem("accessToken", simulatedToken);
        sessionStorage.setItem("email", email);
        window.dispatchEvent(new Event("storage"));

        return email;
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (error) {
      console.error("Login error:", error);
      return null;
    }
  };

  const logout = () => {
    sessionStorage.clear();
    window.dispatchEvent(new Event("storage"));
  };

  if (loading) {
    return <div className="loader" />;
  }

  return (
    <AuthContext.Provider value={{ userAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Utility function to simulate a JWT
function generateDummyJWT(email) {
  const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = btoa(JSON.stringify({ sub: email }));
  const signature = btoa("fake-signature"); // not secure

  return `${header}.${payload}.${signature}`;
}


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