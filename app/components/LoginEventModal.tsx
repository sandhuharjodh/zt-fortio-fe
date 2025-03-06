import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RootState, useAppDispatch, useAppSelector } from "../Redux";
import { fetchuserLoginEvents } from "../Redux/userLoginEventsSlice";

interface LoginEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: any;
}

const LoginEventsModal: React.FC<LoginEventsModalProps> = ({
  isOpen,
  onClose,
  userId,
}) => {
  const userDetails: any = useAppSelector(
    (state: RootState) => state.userLoginEvent
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchuserLoginEvents(userId));
  }, [userId]);

  const userlisting = userDetails?.userLoginEvent?.userlisting || [];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-3xl overflow-hidden gap-0"
        style={{ minWidth: "85%" }}
      >
        <DialogHeader>
          <DialogTitle className="text-lg ps-2 py-1 font-semibold text-gray-800 w-100 assign-text">
            Login Events
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 ps-2">
            Recent login activity details are listed below.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 w-100 overflow-auto scroll-container">
          {userlisting.length > 0 ? (
            <div className="max-h-96 overflow-auto scroll-container border rounded-lg shadow-sm">
              <table className="w-full text-sm border-collapse border border-gray-200">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">Device</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">Location</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">Date & Time</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">Location Tracking</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">Device Tracking</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">False Login Attempt</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">Login Time Analysis</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold risk">IP Repetition</th>
                    <th className="px-4 py-2   bg-[#5FA7F5] text-white font-bold rounded-tr-lg risk">Average %</th>
                  </tr>
                </thead>
                <tbody>
                  {userlisting.map((event: any) => (
                    <tr key={event._id} className="hover:bg-gray-50">
                      <td className="px-4 py-2 border name-h-color">
                        {event.deviceDetails?.deviceType} -{" "}
                        {event.deviceDetails?.browser} -{" "}
                        {event.deviceDetails?.os}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {event.location?.city}, {event.location?.country}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {event.createdAt
                          ? new Date(event.createdAt).toLocaleString()
                          : "N/A"}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {!isNaN(event.locationTrackingMiddleware)
                          ? Math.round(event.locationTrackingMiddleware * 100) /
                            100
                          : 0}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {!isNaN(event.deviceTrackingMiddleware)
                          ? Math.round(event.deviceTrackingMiddleware * 100) /
                            100
                          : 0}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {!isNaN(event.falseLoginAttemptMiddleware)
                          ? Math.round(
                              event.falseLoginAttemptMiddleware * 100
                            ) / 100
                          : 0}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {!isNaN(event.loginTimeAnalysisMiddleware)
                          ? Math.round(
                              event.loginTimeAnalysisMiddleware * 100
                            ) / 100
                          : 0}
                      </td>
                      <td className="px-4 py-2 border name-h-color">
                        {!isNaN(event.ipRepetitionTrackingMiddleware)
                          ? Math.round(
                              event.ipRepetitionTrackingMiddleware * 100
                            ) / 100
                          : 0}
                      </td>
                      <td className="px-4 py-2 border relative name-h-color">
                        {!isNaN(event.averagePercentage)
                          ? Math.round(event.averagePercentage * 100) / 100
                          : 0}
                        %
                        <div className="w-full h-1 bg-gray-200 mt-1 relative overflow-hidden">
                          <div
                            className={`h-full absolute left-0 top-0 transition-all duration-500
                              ${
                                event.averagePercentage < 50 ? "bg-red-500" : ""
                              }
                              ${
                                event.averagePercentage >= 50 &&
                                event.averagePercentage < 75
                                  ? "bg-yellow-500"
                                  : ""
                              }
                              ${
                                event.averagePercentage >= 75
                                  ? "bg-green-500"
                                  : ""
                              }`}
                            style={{
                              width: `${
                                !isNaN(event.averagePercentage)
                                  ? event.averagePercentage
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">
              No login events found.
            </p>
          )}
        </div>
        <DialogFooter className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginEventsModal;
