import Sidebar from "./Sidebar";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "25px",
          background: "#f5f7fb",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default AdminLayout;