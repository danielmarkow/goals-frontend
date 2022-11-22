import { Link } from "wouter";

import userHook from "../../hooks/userHook";

function Navbar() {
  const { userdata } = userHook();

  return (
    <div className="navbar bg-base-200">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">My Goals</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          {Object.keys(userdata).length === 0 && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
          {Object.keys(userdata).length !== 0 && (
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("goals-token");
                  window.location.reload(false);
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
