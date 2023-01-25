import { NavLink } from "react-router-dom";

const MenuItem = ({ url, icon: Icon, label }) => (
  <NavLink
    to={url}
    className={({ isActive }) =>
      `flex h-14 items-center border-r-4 border-transparent px-4 gap-x-3 ${
        isActive ? "text-white bg-white/20 border-white" : "text-white/70 hover:text-white/80 hover:bg-white/10"
      }`
    }
  >
    <Icon className="w-6 h-6" />
    {label}
  </NavLink>
);

export default MenuItem;
