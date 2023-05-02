import { createClient } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./home.css";
import { MdOutlineTask } from "react-icons/md";
import { BiCaretDown, BiCaretRight } from "react-icons/bi";

const supabase = createClient(
  "https://mdmtycwrkpjrzfejuznt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXR5Y3dya3BqcnpmZWp1em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM5MjgsImV4cCI6MTk5ODQ0OTkyOH0.9-rzkdejGx89D2fWdbUEsS9RLiS2Pbwd9kA_mKcDrB8"
);

function Home() {
  const [user, setUser] = useState({});
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [spaceVisibility, SetSpaceVisibility] = useState(true);

  useEffect(() => {
    async function getUserDate() {
      await supabase.auth.getUser().then((value) => {
        if (value.data?.user) {
          setUser(value.data.user.id);
          console.log(user)
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
        tasks.map((item) => {
          console.log(item.task_name);
        });
      }
    }

    getTasks();
    getUserDate();
  }, [user]);

  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/");
  }

  return (
    <div className="w-full h-[100%]">
      <div className="w-full h-[100%]">
        {user.length !== 0 ? (
          <>
            {/* <h1>Home</h1>
            <div>
              {tasks.map((item) => (
                <div key={item.task_name}>{item.task_name}</div>
              ))}
            </div>
            <button onClick={() => signOutUser()}>Sign Out</button> */}
            <div className="flex w-[100%] h-[100%] gap-4">
              <div className="flex flex-col items-center bg-[#E9FFF8] min-w-[350px] h-[100%] shadow-lg">
                <h1 className="font-bold text-5xl text-center mt-10">
                  Dashboard
                </h1>
                <button className="flex gap-4 items-center text-2xl font-bold bg-[#009B6E] bg-opacity-[70%] rounded-[10px] py-3 px-10 mt-10 text-white">
                  {" "}
                  {/* Button for create spaces */}
                  <MdOutlineTask />
                  Create Space
                </button>
                <div>
                  {" "}
                  {/* Work Spaces */}
                  <div>
                    {" "}
                    {/* Space 1 with a list inside */}
                    <div onClick={() => spaceVisibility ? SetSpaceVisibility(false) : SetSpaceVisibility(true)} className="flex justify-between items-center text-2xl cursor-pointer font-bold bg-[#009B6E] bg-opacity-[50%] rounded-[10px] w-[285px] py-3 px-10 mt-10 mb-3 text-white">
                      <MdOutlineTask />
                      Space 1 <BiCaretRight />
                    </div>
                    <div
                      className={
                        spaceVisibility
                          ? "hidden"
                          : "flex flex-col gap-3 items-center bg-[#009B6E] opacity-[50%] rounded-[10px] p-3"
                      }
                    >
                      {" "}
                      {/* Hide List */}
                      <button className="flex justify-center text-md cursor-pointer font-bold bg-[#27bd90] bg-opacity-[100%] rounded-[10px] w-[220px] py-1 px-10 text-white">
                        New Template
                      </button>
                      <ul>
                        <li className="flex justify-center text-md cursor-pointer font-bold bg-[#07684b] bg-opacity-[100%] rounded-[10px] w-[220px] py-1 px-10 text-white">
                          El Rincón Del Dev
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="border-2 border-white w-[80%] h-[100%]">
                Main view
                {tasks.map((item) => (
                <div key={item.task_name}>{item.task_name}</div>
              ))}
              </div>
            </div>
          </>
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
      </div>
    </div>
  );
}

export default Home;
