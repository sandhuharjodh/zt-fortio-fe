import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { loginEvents } from "./userLoginEventsService";

interface DeviceDetails {
  deviceType: string;
  browser: string;
  os: string;
}

interface Location {
  latitude: number;
  longitude: number;
  city: string;
  country: string;
}

interface UserLoginEvent {
  deviceDetails: DeviceDetails;
  location: Location;
  _id: string;
  userId: string;
  lat: number;
  long: number;
  success: boolean;
  createdAt: string;
}

interface UserLoginEventState {
  userLoginEvent: UserLoginEvent[];
  loading: boolean;
  error: string | null;
}

const initialState: UserLoginEventState = {
  userLoginEvent: [],
  loading: false,
  error: null,
};

interface LoginEventArgs {
  userId: any;
}

// Async thunk for fetching user login events
export const fetchuserLoginEvents = createAsyncThunk<
  UserLoginEvent[], // Response type
  LoginEventArgs, // Argument type
  { rejectValue: string }
>(
  "auth/userLoginEventsDetail", // Action name
  async ( userId , { rejectWithValue }) => {
    try {
      // Call the service with userId and fetch data
      const response = await loginEvents(userId);
      return response; // Return the data if successful
    } catch (error: any) {
      // In case of an error, reject with a message
      return rejectWithValue(error.message || "Failed to fetch login events.");
    }
  }
);

const userLoginEventSlice = createSlice({
  name: "userLoginEvent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchuserLoginEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchuserLoginEvents.fulfilled,
        (state, action: PayloadAction<UserLoginEvent[]>) => {
          state.loading = false;
          state.userLoginEvent = action.payload;
        }
      )
      .addCase(fetchuserLoginEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong.";
      });
  },
});

export default userLoginEventSlice.reducer;
