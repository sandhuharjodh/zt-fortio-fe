"use client";
import { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "./Redux";
import { LoginAsync } from "./Redux/userSlice";
import { toast, ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((state: RootState) => state.user);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Fetch geolocation
    // const getGeolocation = (): Promise<{ lat: number; long: number }> => {
    //   return new Promise((resolve, reject) => {
    //     if (!navigator.geolocation) {
    //       reject(new Error("Geolocation is not supported by your browser."));
    //     } else {
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //           const { latitude, longitude } = position.coords;
    //           resolve({ lat: latitude, long: longitude });
    //         },
    //         (error) => reject(error),
    //         { enableHighAccuracy: true }
    //       );
    //     }
    //   });
    // };

    try {
      // const { lat, long } = await getGeolocation();

      const data:any = await dispatch(
        LoginAsync({
          email,
          password
        })
      );
      
      if (data?.payload?.message === "Login successful.") {
        console.log("assasdads");
        setTimeout(()=>{
          toast.success("Login Successful");
        })

        const { token, userId } = data.payload;

        if (rememberMe) {
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("userId", userId);
        }

        router.push("/dashboard");
      } else {        
        toast.error("You are not authorized to login.");
      }
    } catch (error) {
      console.error(error, "Error occurred during geolocation or login.");
      toast.error("Unable to retrieve your location. Please try again.");
    }
  };

  if (error) {
    toast.error(error);
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-100">
      <div className="w-full max-w-4xl flex bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Left Side - Image with Text */}
        <div
          className="w-1/2 relative bg-blue-700 flex flex-col items-center justify-center text-white p-6"
          style={{
            backgroundImage: "url('bg-img.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h1
            className="text-white font-bold"
            style={{
              fontWeight: 700,
              fontSize: "51.29px",
              lineHeight: "51.29px",
              letterSpacing: "0%",
              textAlign: "center",
            }}
          >
            ZT Fortio
          </h1>
          <p
            className="mt-2"
            style={{
              fontWeight: 400,
              fontSize: "25.71px",
              lineHeight: "30.85px",
              letterSpacing: "0%",
              textAlign: "center",
            }}
          >
            Challenges & Solutions
          </p>
        </div>

        {/* Right Side - Form */}
        <div className="w-1/2 p-8">
          <h2 className="text-2xl text-gray-800 font-bold mb-6 text-center">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  📧
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  🔒
                </span>
                <input
                  type="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="rememberMe" className="text-sm">
                Remember Me
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-sky-600 text-white p-2 rounded"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
