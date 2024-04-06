import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Modal from "./Modal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Layout() {
  return (
    <>
      <ToastContainer
        position='top-center'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        transition:Slide
      />

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
