import { createBrowserRouter } from "react-router-dom";
import { GameShell } from "./GameShell";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <GameShell />,
  },
]);