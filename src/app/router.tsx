import { createBrowserRouter } from "react-router-dom";
import { SetupScreen } from "../features/setup/SetupScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SetupScreen />,
  },
]);