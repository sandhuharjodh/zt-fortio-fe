import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, userDetail,userDetailById } from "./userService";

interface UserState {
  token: string | null;
  userDetails: {
    username?: string;
    email?: string;
    role?: string;
    id?: string;
    country?: string;
    state?: string;
    contactNumber?: number;
  } | null;
  userDetailByID: {
    name?: string;
    email?: string;
    role?: string;
    id?: string;
    country?: string;
    state?: string;
    contactNumber?: number;
    userlisting:any
  } | null;
  isLoading: boolean;
  error: string | null;
}


const initialState: UserState = {
  token: null,
  userDetails: null,
  userDetailByID:null,
  isLoading: false,
  error: null,
};

// Define the response type (you should replace this with the actual response type)
interface LoginResponse {
  token: string;
  user: { id: string; name: string }; // Example structure of the user object
}

// Define the argument type for the async thunk
interface LoginArgs {
  email: string;
  password: string;
  lat: number;
  long: number;
}

interface UserByIdArgs {
  userId: any;
}

// Create the async thunk
export const userDetailAsync = createAsyncThunk<LoginArgs>(
  "auth/userDetail",
  async () => {
    const response = await userDetail();
    return response;
  }
);

export const LoginAsync = createAsyncThunk<LoginResponse, LoginArgs>(
  "auth/login",
  async ({ email, password, lat, long }) => {
    const response = await login(email, password,lat,long);
    return response;
  }
);

export const UserByIdAsync = createAsyncThunk<UserByIdArgs, LoginArgs>(
  "auth/userById",
  async () => {
    const response = await userDetailById();
    return response;
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.userDetails = null;
      state.isLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(LoginAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(LoginAsync.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.token = action.payload.token;
        state.userDetails = {
          email: action.payload.email,
          role: action.payload.role,
          id: action.payload.id,
        };
      })
      .addCase(LoginAsync.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(userDetailAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        userDetailAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.userDetails = action.payload;
        }
      )
      .addCase(
        userDetailAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      )
      .addCase(UserByIdAsync.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        UserByIdAsync.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.token = action.payload.token;
          state.userDetailByID = action.payload;
        }
      )
      .addCase(
        UserByIdAsync.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.error = action.payload;
        }
      );
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
