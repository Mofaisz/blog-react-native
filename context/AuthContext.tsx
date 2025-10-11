// Auth context (holds token, signIn, signOut, restore)
import API from "@/services/api";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

// Define the shape of our AuthContext (TypeScript typing)
type AuthContextType = {
  userToken: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<any>;
  addBlog: (title: string, description: string, body: string) => Promise<any>;
  allBlog: () => Promise<any>;
  postLikes: (id: number) => Promise<void>;
  fetchLikes: (id:number) => Promise<any>;
  addComment:(id:number,commentValue:string) => Promise<any>;
  getComments:(id:number) => Promise<any>
};

// Create the context (initially undefined so we can detect misuse)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// creating a react functional component and expecting a props this si use in typescript
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("userToken");
      setUserToken(token);
      setLoading(false);
    })();
  }, []); // since the dependency array is empty it will run only once

  const signIn = async (email: string, password: string) => {
    try {
      const body = new URLSearchParams({ username: email, password });
      const res = await API.post("/login", body.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
      });

      const token = res.data.access_token;
      await SecureStore.setItemAsync("userToken", token);
      setUserToken(token);
    } catch (err) {
      console.error("Login failed", err);
      throw err;
    }
  };

  const signOut = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUserToken(null);
  };

  const signUp = async (name: string, email: string, password: string) => {
    const res = await API.post("/user/", { name, email, password });
    return res;
  };

  const addBlog = async (title: string, description: string, body: string) => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      };
      const res = await API.post(
        "/blog/",
        { title, description, body },
        { headers: headers }
      );
      return res.data;
    } catch (err) {
      console.log("Error in creating blog in auth context", err);
      throw err;
    }
  };

  const allBlog = async () => {
    try {
      const token = await SecureStore.getItemAsync("userToken");
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };

      const res = await API.get("/blog/", { headers: headers });
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const postLikes = async (id: number) => {
    try {
      const token = await SecureStore.getItemAsync("userTokens");
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await API.post(
        `/blog/blogs/${id}/like`,
        {},
        { headers: headers }
      );
      return res.data;
    } catch (err:any) {
      console.log(
        "Unable to hit the post likes api check postLike in AuthContext",
        err.response?.data || err.message
       
      );
      throw err.response?.data || err.message;
    }
  };

  const fetchLikes = async (id: number) => {
    try {
      const token = await SecureStore.getItemAsync("userTokens");
      const headers = {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      };
      const res = await API.get(`/blog/${id}/likes`, { headers: headers });
      // console.log(res.data)
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  };

  const addComment = async(id:number,commentValue:string) =>{
    try{
      const token =  await SecureStore.getItemAsync("userTokens")
      const headers = {
        Accept : "application/json",
        Authorization : `Bearer ${token}`
      }
      let res  = await API.post(`/blog/${id}/comment?content=${commentValue}`,{},{headers:headers})
      return res.data

    }catch(err){
      console.log(err)
    }
  }

  const getComments = async(id:number) =>{
    try{
      const token = await SecureStore.getItemAsync("userTokens")
      const headers = {
        Accept: "application/json",
        Authorization : `Bearer ${token}`
      }
      let res = await API.get(`/blog/${id}/comments`,{headers:headers})
      // console.log(res.data)
      return res.data


    }catch(err){
      console.log(err)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        userToken,
        loading,
        signIn,
        signOut,
        signUp,
        addBlog,
        allBlog,
        postLikes,
        fetchLikes,
        addComment,
        getComments
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
