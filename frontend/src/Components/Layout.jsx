import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Modal from "./Modal";

function Layout() {
  return (
    <>
      <Modal />

      <div className='h-screen w-screen '>
        <div className='absolute top-4 z-20 w-full '>
          <Navbar />
        </div>
        <Outlet />
      </div>
    </>
  );
}

export default Layout;
