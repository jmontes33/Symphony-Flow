import { useState } from "react";
import { BiCaretRight } from "react-icons/bi";
import { MdOutlineTask } from "react-icons/md";

function Dashboard() {
  const [spaceVisibility, SetSpaceVisibility] = useState(true);

  return (
    <div className="w-[350px] h-[100%]">
      <div className="w-full h-[100%]">
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
                  <div
                    onClick={() =>
                      spaceVisibility
                        ? SetSpaceVisibility(false)
                        : SetSpaceVisibility(true)
                    }
                    className="flex justify-between items-center text-2xl cursor-pointer font-bold bg-[#009B6E] bg-opacity-[50%] rounded-[10px] w-[285px] py-3 px-10 mt-10 mb-3 text-white"
                  >
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
              <div className="h-[150px] w-[283px] bg-[#BAEFE0] mx-auto rounded-[10px] bottom-10 fixed shadow-lg"></div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}

export default Dashboard;
