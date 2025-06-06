import { Link } from "react-router-dom";
import { useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 p-2  lg:flex-row lg:items-center lg:gap-6 lg:text-lg md:text-sm sm:text-sm ">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/home" className="flex items-center">
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/summary" className="flex items-center">
          Summary
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/chat" className="flex items-center ">
          Chat
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className="border-none sticky flex-row shadow-base-200  pt-1 align-middle justify-between top-0 z-30 h-max max-w-[95%] px-4 lg:px-8 lg:py-2 bg-base-content mx-7">
      <div className="flex items-center justify-between text-primary rounded-md">
        <Typography
          as="li"
          className="mr-4 cursor-pointer py-1.5  font-bold lg:text-2xl md:text-lg sm:text-md btn-ghost btn"
        >
          <Link to={"/"}>Legal Assistant</Link>
        </Typography>
        <div className="flex items-center gap-4">
          <div className="mr-4 hidden   lg:block">{navList}</div>

          <IconButton
            variant="text"
            className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
};

export default Header;
