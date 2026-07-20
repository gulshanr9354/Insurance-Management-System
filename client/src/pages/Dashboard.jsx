import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/Dashboard.css";
import { Link } from "react-router-dom";
import AdminLayout from "../components/AdminLayout";
import { useNavigate } from "react-router-dom";



function Dashboard() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalPolicies: 0,
    totalClaims: 0,
    totalPremium: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  navigate("/login");
};

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AdminLayout>


      

      <div className="dashboard-content">

        <div className="dashboard-header">
          <div>
            <h1>Insurance Dashboard</h1>
            <p>Welcome, Admin</p>
          </div>

          <button
  className="logout-btn"
  onClick={handleLogout}
>
  Logout
</button>
        </div>

        <div className="cards">

          <div className="card">
            <h3>Total Customers</h3>
            <h1>{stats.totalCustomers}</h1>
          </div>

          <div className="card">
            <h3>Active Policies</h3>
            <h1>{stats.totalPolicies}</h1>
          </div>

          <div className="card">
            <h3>Claims</h3>
            <h1>{stats.totalClaims}</h1>
          </div>

          <div className="card">
            <h3>Total Revenue</h3>
            <h1>₹{stats.totalPremium}</h1>
          </div>

        </div>

        <div className="activity">
          <h2>Recent Activity</h2>

          <table>
            <thead>
              <tr>
                <th>Customer</th>
                <th>Policy</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>Rahul Sharma</td>
                <td>Health Insurance</td>
                <td>Active</td>
              </tr>

              <tr>
                <td>Priya Verma</td>
                <td>Car Insurance</td>
                <td>Pending</td>
              </tr>

              <tr>
                <td>Amit Kumar</td>
                <td>Life Insurance</td>
                <td>Approved</td>
              </tr>
            </tbody>

          </table>

        </div>

      </div>

    </AdminLayout>
  );
}

export default Dashboard;