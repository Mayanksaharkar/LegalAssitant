import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className='w-full flex justify-center '>
      <div className='navbar w-[97%] rounded-xl shadow-xl bg-base-100  '>
        <div className='navbar-start'>
          <div className='dropdown'>
            <div tabIndex={0} role='button' className='btn btn-ghost lg:hidden'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M4 6h16M4 12h8m-8 6h16'
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52'
            >
              <li>
                <Link to='/home'>Home</Link>
              </li>
              <li>
                <Link to='/summary'>Summary</Link>
              </li>
              <li>
                <Link to='/chat'>Chat</Link>
              </li>
            </ul>
          </div>
          <a className='btn btn-ghost text-2xl'>Legal Documnet Assistant</a>
        </div>
        <div className='navbar-end hidden '>
          <ul className='menu menu-horizontal px-1 gap-3'>
            <li>
              <Link to='/home'>Home</Link>
            </li>
            <li>
              <Link to='/summary'>Summary</Link>
            </li>
            <li>
              <Link to='/chat'>Chat</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
