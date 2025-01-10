import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    index: true,
    path: "/algo-rewards-frontend",
    element: <MainPage />,
  },
]);

export default router;
