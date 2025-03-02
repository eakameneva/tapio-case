import { Button, Modal } from "@mui/material";
import PostsList from "../PostsList";
import { ToastContainer, toast } from "react-toastify";
import { useEffect, useState } from "react";
import AuthForm from "../AuthForm";
import { login, logout, signup } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store";

interface IAuthFormValues {
  username: string;
  password: string;
}

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [authMode, setAuthMode] = useState<boolean>(false);
  const [formType, setFormType] = useState<"Sign in" | "Sign up">("Sign in");
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

  const handleAuthSubmit = (data: IAuthFormValues) => {
    console.log(formType, "User Data:", data);
    if (formType === "Sign up") {
      dispatch(signup(data));
    } else if (formType === "Sign in") {
      dispatch(login(data));
    }
  };
  const handleLogOut = () => {
    dispatch(logout());
  };
  useEffect(() => {
    if (isAuthenticated) {
      setAuthMode(false);
      toast.success("Successfully logged in");
    }
  }, [isAuthenticated]);
  return (
    <>
      <Modal open={authMode} onClose={() => setAuthMode(false)}>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
          <AuthForm formTitle={formType} onSubmit={handleAuthSubmit} />
        </div>
      </Modal>
      <header className=" bg-darkBlue flex justify-end items-center shadow-md p-4">
        {isAuthenticated ? (
          <Button
            onClick={handleLogOut}
            variant="outlined"
            sx={{
              padding: "12px 24px",
              backgroundColor: "transparent",
              borderColor: "white",
              color: "white",
            }}
          >
            Log Out
          </Button>
        ) : (
          <>
            {" "}
            <Button
              onClick={() => {
                setAuthMode(true);
                setFormType("Sign in");
              }}
              variant="contained"
              sx={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  opacity: "0.5",
                },
              }}
            >
              Sign In
            </Button>
            <Button
              onClick={() => {
                setAuthMode(true);
                setFormType("Sign up");
              }}
              variant="outlined"
              sx={{
                padding: "12px 24px",
                backgroundColor: "transparent",
                borderColor: "white",
                color: "white",
                marginLeft: "15px",
                "&:hover": {
                  opacity: "0.5",
                },
              }}
            >
              Sign Up
            </Button>{" "}
          </>
        )}
      </header>
      <div className="min-h-screen px-6 py-8 bg-gray-100">
        <h1 className="text-4xl font-extrabold text-darkText text-center mb-8 tracking-wide ">
          Recent Posts
        </h1>
        <PostsList />
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          theme="light"
        />
      </div>
    </>
  );
}

export default App;
