import { Outlet } from "react-router-dom";
import { CoctailProvider } from "../context/CoctailProvider";
import { Navbar } from "../index";

import "../css/App.css";

export function App() {

  return (
    <>
      <Navbar />
      <CoctailProvider>
        <Outlet />
      </CoctailProvider>
    </>
  )

}
