import { Outlet } from "react-router-dom";
import { CoctailProvider } from "../index";
import { Navbar } from "../index";

import "../index";

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
