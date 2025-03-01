import PostsList from "../PostsList";
import { ToastContainer } from "react-toastify";

function App() {
  return (
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
  );
}

export default App;
