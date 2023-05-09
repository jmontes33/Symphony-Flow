import { createContext } from "react";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Dashboard from "./Dashboard";
import MainView from "./MainView";
import NavBar from "./NavBar";

export const MyContext = createContext();

const supabase = createClient(
  "https://mdmtycwrkpjrzfejuznt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXR5Y3dya3BqcnpmZWp1em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM5MjgsImV4cCI6MTk5ODQ0OTkyOH0.9-rzkdejGx89D2fWdbUEsS9RLiS2Pbwd9kA_mKcDrB8"
);

function Context() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function getUserDate() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user.id);
          setName(value.data.user.email);
        }
        getTasks();
      });
    }

    async function getTasks() {
      const { data: tasks, error } = await supabase
        .from("tasks")
        .select("task_name")
        .eq("user_id", user);
      if (error) {
        console.error(error);
      } else {
        setTasks(tasks);
      }
    }

    getTasks();
    getUserDate();
  }, [user]);

  return (
    <MyContext.Provider
      value={{ user, setUser, tasks, setTasks, name, setName }}
    >
      {Object.keys(user).length !== 0 ? (
        <div className="flex h-[100%] w-[100%]">
          <Dashboard />
          <div className="w-[100%] p-10">
            <NavBar />
            <MainView />
          </div>
        </div>
      ) : (
        <>
          <h1>User is not logged in</h1>
          <button
            onClick={() => {
              navigate("/");
            }}
          >
            Go back home!
          </button>
        </>
      )}
    </MyContext.Provider>
  );
}

export default Context;
