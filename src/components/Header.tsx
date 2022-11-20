import { Link, NavLink } from "react-router-dom";

export const Header = () => {
  const activeStyle = {
    textDecoration: "underline",
    color: "red",
  };

  return (
    <div className="bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="flex items-center justify-between p-3 max-w-6xl mx-auto">
        <div>
          <Link to="/">
            <img
              src="https://static.rdc.moveaws.com/images/logos/rdc-logo-default.svg"
              alt="realtorLogo"
              className="h-5 cursor-pointer"
            />
          </Link>
        </div>
        <div>
          <ul className="flex items-center gap-x-10">
            <NavLink
              end
              to="/"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/offers"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li>Offers</li>
            </NavLink>

            <NavLink
              to="/sign-in"
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <li>Sign In</li>
            </NavLink>
          </ul>
        </div>
      </header>
    </div>
  );
};
