import React from "react";
import { useUser } from "@clerk/react-router";
import { Link } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { ChevronLeftIcon } from "lucide-react";

function Header() {
  const navigate = useNavigate();
  const { user, isSignedIn, isLoaded } = useUser();
  const navItems=[
    { name: "Home", path: "/", active: true },
    { name: "Dashboard", path: "/dashboard", active: isLoaded && isSignedIn },
    { name: "Create Resume", path: "/create-resume", active: isSignedIn && isLoaded},
    { name: "SignIn", path:"/auth/sign-in", active:!isSignedIn }
  ]
  function handleBack() {
    navigate(-1);
  }
  
   return (
    <header className="py-3 shadow bg-blue-800">
      
        <nav className="flex">
          <div className="mr-4 flex justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 px-4 py-2 rounded-full  shadow-md  hover:bg-blue-700 duration-200"
            >
              <ChevronLeftIcon className="w-5 h-5 text-white" />

            </button>
            <Link to="/">
              <img className="w-12 rounded-2xl" src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/ca502d113252555.6023ff63402cc.jpg" alt="logo" />
              
            </Link>
          </div>
          <ul className="flex ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.path)}
                    className="inline-block px-6 py-2  hover:bg-blue-700  rounded-full text-white"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {isSignedIn && (
              <li>
                <UserButton afterSignOutUrl="/" />
              </li>
            )}
          </ul>
        </nav>
      
    </header>
   );
}

export default Header;