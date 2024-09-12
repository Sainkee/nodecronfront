import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import TaskLogs from "./components/TaskLogs ";
import AddTask from "./components/AddTask";
import { ToastContainer } from "react-toastify";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar />
          <Outlet />
        </>
      ),
      children: [
        { index: true, element: <TaskLogs /> },
        { path: "/tasks", index: true, element: <TaskLogs /> },
        { path: "/add-task", element: <AddTask /> },
      ],
    },
    { path: "*", element: <h1>Page Not Found</h1> },
  ]);

  return (
    <>
      <ToastContainer position="bottom-right" />
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
