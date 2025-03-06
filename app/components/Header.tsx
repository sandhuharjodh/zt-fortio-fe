import React, { useState, useEffect } from "react";
import { User, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../Redux";
import { FiLogOut } from "react-icons/fi";
import { logout, UserByIdAsync } from "../Redux/userSlice";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userId, setUserId]:any = useState(); 
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Access user data from Redux store
  const userName = useSelector((state: RootState) => state.user);
  console.log("userName", userName);

  useEffect(() => {
    // Ensure localStorage access only in the browser
    if (typeof window !== "undefined") {
      const storedUserId =
        localStorage.getItem("userId") || sessionStorage.getItem("userId");
      setUserId(storedUserId);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(UserByIdAsync(userId));
    }
  }, [dispatch, userId]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    if (typeof window !== "undefined") {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userId");
    }
    router.push("/");
  };

  return (
    <header className="bg-sky-600 text-white py-3 px-6 shadow-md flex justify-between items-center">
      <p className="text-lg font-bold">ZT Fortio</p>
      <div className="relative">
        <button
          className="flex items-center text-left focus:outline-none"
          onClick={toggleDropdown}
        >
          <User className="mr-2 w-6 h-6" />
          {Array.isArray(userName?.userDetailByID?.userlisting) &&
            userName?.userDetailByID?.userlisting.map(
              (user: any) => user?.name || "Guest"
            )}
          <ChevronDown className="ml-2 w-4 h-4" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg z-50">
            <ul className="py-1">
              <li
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 font-semibold flex items-center gap-2"
                onClick={handleLogout}
              >
                <FiLogOut className="text-lg" /> Logout
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
