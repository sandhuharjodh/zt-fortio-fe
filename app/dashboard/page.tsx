"use client";
import React, { useEffect, useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../Redux";
import LoginEventsModal from "../components/LoginEventModal";
import { userDetailAsync } from "../Redux/userSlice";
import { fetchuserLoginEvents } from "../Redux/userLoginEventsSlice";
import { Info } from "lucide-react"; // Importing Info icon

const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [infoModalData, setInfoModalData] = useState<{
    name: string;
    description: string;
    location:string;
    fleetSize:any;
    driver_email:any
  } | null>(null);

  const userDetails: any = useAppSelector((state: RootState) => state.user);
  const sortedUsers = Array.isArray(userDetails?.userDetails?.userlisting)
  ? [...userDetails.userDetails.userlisting].sort(
      (a, b) => a.riskFactor - b.riskFactor
    )
  : [];

  useEffect(() => {
    dispatch(userDetailAsync());
  }, [dispatch]);

  // Function to handle risk score click
  const handleRowClick = async (userId: any) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
    dispatch(fetchuserLoginEvents(userId));
  };

  // Function to handle closing risk score modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUserId(null);
  };

  // Function to handle opening info modal
  const handleInfoClick = (user: { name: string; description: string ,location:string, fleetSize:any, driver_email:any;
  }) => {
    setInfoModalData(user);
  };

  // Function to handle closing info modal
  const handleCloseInfoModal = () => {
    setInfoModalData(null);
  };

  return (
    
    <div className="bg-white shadow-lg rounded-lg p-6">
      <div className="flex justify-start items-start mb-4">
        <h1 className="assign-text ps-2 py-2">Assign Carrier</h1>
      </div>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border border-[#F0F0F0] rounded-lg">
        <thead>
          <tr>
            <th
              scope="col"
              className="px-6 py-3 bg-[#5FA7F5] text-white font-bold rounded-tl-lg risk"
            >
              Name
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-[#5FA7F5] text-white font-bold risk"
            >
              Email ID
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-[#5FA7F5] text-white font-bold risk"
            >
              Contact Number
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-[#5FA7F5] text-white font-bold risk"
            >
              Country
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-[#5FA7F5] text-white font-bold risk"
            >
              State
            </th>
            <th
              scope="col"
              className="px-6 py-3 bg-[#3a65ff] text-white font-bold text-center"
            >
              <h1 className="risk">Risk Score</h1>
              <h4 className="power-zt">Powered by ZT Fortio</h4>
            </th>

            <th
              scope="col"
              className="px-6 py-3 bg-[#5FA7F5] text-white font-bold text-center rounded-tr-lg risk"
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody>{
        sortedUsers.map(
              (user: any, index: number) => (
                <tr
                  key={index}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-2 name-h-color flex items-center justify-start mt-3 gap-2">
                    {user.name}
                    {/* Info Icon */}
                    <Info
                      className="w-5 text-blue-500 cursor-pointer hover:text-blue-700"
                      onClick={() => handleInfoClick(user)}
                    />
                  </td>

                  <td className="px-6 py-2 name-h-color">{user.email}</td>
                  <td className="px-6 py-2 name-h-color">
                    {user.contactNumber}
                  </td>
                  <td className="px-6 py-2 name-h-color">{user.country}</td>
                  <td className="px-6 py-2 name-h-color">{user.state}</td>
                  <td className="px-6 py-2 name-h-color bg-[#3a65ff] cursor-pointer">
                    <div className="flex items-center justify-center">
                      <span
                        onClick={() => handleRowClick(user._id)}
                        className={`
        inline-block border-2 p-2 rounded-lg text-center w-24 py-2 font-bold text-lg 
        ${user.riskFactor < 50 ? "border-green-500 text-green-500 bg-white" : ""}
        ${
          user.riskFactor >= 50 && user.riskFactor < 75
            ? "border-yellow-500 text-yellow-500 bg-white"
            : ""
        }
        ${
          user.riskFactor >= 75
            ? "border-red-500 text-red-500 bg-white"
            : ""
        }
      `}
                        style={{
                          borderWidth: "3px", // Border ko thoda mota karne ke liye
                        }}
                      >
                        {Math.round(user.riskFactor * 100) / 100}%
                      </span>
                    </div>
                  </td>

                  <td className="px-6 py-2 cursor-pointer">
                    <button
                      type="button"
                      className="border-2 border-[#4785EA] bg-[#f5f8ff] text-black font-bold py-2 px-6 rounded-lg shadow-md hover:bg-[#e3eaff] transition"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>

      {/* Risk Score Modal */}
      {isModalOpen && (
        <LoginEventsModal
          isOpen={isModalOpen}
          userId={selectedUserId}
          onClose={handleCloseModal}
        />
      )}

      {/* User Info Modal */}
      {infoModalData && (
<div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 p-4">
  <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg relative">
    {/* Top Section with Border Bottom */}
    <div className="border-gray-300 pb-4 relative">
      {/* Cross Button (Top Right) */}
      <button
        className="absolute top-2 right-3 bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-blue-700"
        onClick={handleCloseInfoModal}
      >
        ✖
      </button>

      {/* Carrier Name */}
      <h3 className="text-xl font-bold">{infoModalData.name}</h3>

      {/* Description */}
      <p className="text-gray-700 leading-relaxed mt-2">
        {infoModalData.description}
      </p>
    </div>

    {/* Fleet and Location */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="border rounded-lg p-4 shadow-md">
        <p className="text-sm text-gray-500 flex items-center">🚚 Fleet</p>
        <p className="font-bold text-xl">{infoModalData.fleetSize}</p>
      </div>
      <div className="border rounded-lg p-4 shadow-md">
        <p className="text-sm text-gray-500 flex items-center">📍 Location</p>
        <p className="font-bold text-xl">{infoModalData.location}</p>
      </div>
    </div>

    {/* Driver Emails */}
    <div className="border rounded-lg p-4 shadow-md mt-4">
      <p className="text-sm text-gray-500 flex items-center">📧 Driver Emails</p>
      <div className="font-bold text-blue-600 flex flex-wrap gap-2 mt-2">
        {infoModalData.driver_email.map((email: any, index: any) => (
          <span key={index} className="whitespace-nowrap">
            {email} {index !== infoModalData.driver_email.length - 1 && "|"}
          </span>
        ))}
      </div>
    </div>
  </div>
</div>


      )}
    </div>
  );
};

export default Dashboard;
