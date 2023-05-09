import { useContext } from "react";
import { MyContext } from "./Context";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://mdmtycwrkpjrzfejuznt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXR5Y3dya3BqcnpmZWp1em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM5MjgsImV4cCI6MTk5ODQ0OTkyOH0.9-rzkdejGx89D2fWdbUEsS9RLiS2Pbwd9kA_mKcDrB8"
);

function NavBar() {
  const { name } = useContext(MyContext);
  const navigate = useNavigate();
  
  async function signOutUser() {
    await supabase.auth.signOut();
    navigate("/")
  }

  return (
    <div className="flex items-center justify-between w-[full] bg-[#E9FFF8] rounded-[10px] px-6 py-2 shadow-lg">
      <h1 className="text-2xl font-bold">{`Good morning ${name} 👋🏻`}</h1>
      <div className="flex gap-8">
        <img className="w-10 cursor-pointer" src="src\assets\sign-out-left-svgrepo-com.svg" alt="" onClick={() => signOutUser()}/>
      </div>
    </div>
  );
}

export default NavBar;
