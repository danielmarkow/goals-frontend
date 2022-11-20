import { Link } from "wouter";

function Navbar() {
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
          {!localStorage.getItem("goals-token") && (
            <li>
              <Link to={"/login"}>Login</Link>
            </li>
          )}
          {localStorage.getItem("goals-token") && (
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
