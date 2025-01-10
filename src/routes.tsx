import { createBrowserRouter } from "react-router-dom";
import MainPage from "./pages/MainPage";
import NotFound from "./components/NotFound";

const router = createBrowserRouter([
  {
    index: true,
    path: "/algo-rewards-frontend",
    element: <MainPage />,
  },
  { path: "*", element: <NotFound /> },
]);

export default router;
