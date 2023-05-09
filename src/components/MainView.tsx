import { useContext } from "react";
import { MyContext } from "./Context";
import { useState } from "react";

const supabaseInsert =
  "https://mdmtycwrkpjrzfejuznt.supabase.co/rest/v1/tasks?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXR5Y3dya3BqcnpmZWp1em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM5MjgsImV4cCI6MTk5ODQ0OTkyOH0.9-rzkdejGx89D2fWdbUEsS9RLiS2Pbwd9kA_mKcDrB8";

function MainView() {
  const { setTasks } = useContext(MyContext);
  const { tasks } = useContext(MyContext);
  const [newTask, setNewTask] = useState("");
  const { user } = useContext(MyContext);

  const deleteTask = (task) => {
    const urlDelete =
      "https://mdmtycwrkpjrzfejuznt.supabase.co/rest/v1/tasks?task_name=eq." +
      task.task_name +
      "&apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXR5Y3dya3BqcnpmZWp1em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM5MjgsImV4cCI6MTk5ODQ0OTkyOH0.9-rzkdejGx89D2fWdbUEsS9RLiS2Pbwd9kA_mKcDrB8";

    fetch(urlDelete, {
      method: "DELETE"
    })
    .then(() => {
      setTasks(tasks.filter((t) => t.task_name !== task.task_name));
    })
    .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#E9FFF8] mt-8 p-5 rounded-[30px] h-[90%] shadow-lg">
      <div className="m-auto mb-10">
        <h1 className="m-auto bg-[#009B6E] opacity-[70%] w-[400px] p-3 text-center rounded-[10px] text-4xl font-bold text-white shadow-xl">
          El Rincón Del Dev
        </h1>
      </div>
      <div className="flex gap-5 h-[85%]">
        <div className="bg-[#00BB84] opacity-[60%] w-[33%] rounded-[20px] p-5 shadow-xl">
          <h1 className="text-center text-white font-bold text-3xl mb-3">
            Idea
          </h1>
          <ul>
            {tasks.map((task) => (
              <li
                className="bg-white mb-3 px-3 py-1 rounded-[10px] cursor-pointer"
                key={task.task_name}
                onClick={() => deleteTask(task)}
              >
                {task.task_name}
              </li>
            ))}
            <form
              onSubmit={(e) => {
                if (newTask.length > 0) {
                  e.preventDefault();
                  fetch(supabaseInsert, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ task_name: newTask, user_id: user }),
                  })
                    .then(() => {
                      setNewTask("");
                      setTasks((prev) => [
                        ...prev,
                        { id: +new Date(), task_name: newTask, user_id: user },
                      ]);
                      console.log(user);
                    })
                    .catch((error) => console.log(error));
                }
              }}
            >
              <input
                type="text"
                className="rounded-[10px] w-[100%] py-1 px-3 bg-slate-200"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
              />
            </form>
          </ul>
        </div>
        <div className="bg-[#00BB84] opacity-[80%] w-[33%] rounded-[20px] p-5 shadow-xl">
          <h1 className="text-center text-white font-bold text-3xl">
            In Progress
          </h1>
        </div>
        <div className="bg-[#00BB84] opacity-[100%] w-[33%] rounded-[20px] p-5 shadow-xl">
          <h1 className="text-center text-white font-bold text-3xl">
            Published
          </h1>
        </div>
      </div>
    </div>
  );
}

export default MainView;
