import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

function Sidebar() {
  const location = useLocation();

  return (
    <div className="sidebar">

      <h2 className="logo">InsuranceMS</h2>

      <ul>

        <li className={location.pathname === "/dashboard" ? "active" : ""}>
          <Link to="/dashboard">Dashboard</Link>
        </li>

        <li className={location.pathname === "/customers" ? "active" : ""}>
          <Link to="/customers">Customers</Link>
        </li>

        <li className={location.pathname === "/policies" ? "active" : ""}>
          <Link to="/policies">Policies</Link>
        </li>

        <li className={location.pathname === "/claims" ? "active" : ""}>
          <Link to="/claims">Claims</Link>
        </li>

        <li className={location.pathname === "/payments" ? "active" : ""}>
          <Link to="/payments">Payments</Link>
        </li>

        <li className={location.pathname === "/reports" ? "active" : ""}>
          <Link to="/reports">Reports</Link>
        </li>

      </ul>

    </div>
  );
}

export default Sidebar;