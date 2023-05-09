import { createClient } from "@supabase/supabase-js";
import { Auth } from "@supabase/auth-ui-react";
import { useNavigate } from "react-router-dom";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import "./loginPage.css";

const supabase = createClient(
  "https://mdmtycwrkpjrzfejuznt.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1kbXR5Y3dya3BqcnpmZWp1em50Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM5MjgsImV4cCI6MTk5ODQ0OTkyOH0.9-rzkdejGx89D2fWdbUEsS9RLiS2Pbwd9kA_mKcDrB8"
);

function LoginPage() {
  const navigate = useNavigate();

  supabase.auth.onAuthStateChange(async (e) => {
    if (e == "SIGNED_IN") {
      navigate("/home");
    } else {
      navigate("/");
    }
  });

  return (
    <div className="Login">
        <img className="log-img" src="src\assets\pexels-gianluca-grisenti-4215113.jpg" alt="" />
      <header className="Login-header">
        <h1>Welcome to Symphony Flow</h1>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          theme="dark"
          providers={["github"]}
        />
      </header>
    </div>
  );
}

export default LoginPage;
