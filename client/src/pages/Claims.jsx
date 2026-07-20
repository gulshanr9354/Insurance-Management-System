import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminLayout from "../components/AdminLayout";
import { toast } from "react-toastify";
function Claims() {
  const [claims, setClaims] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    policy: "",
    claimNumber: "",
    claimAmount: "",
    reason: "",
    status: "Pending",
  });

  useEffect(() => {
    fetchClaims();
    fetchPolicies();
  }, []);

 const fetchClaims = async () => {
  const res = await API.get("/claims");
  setClaims(res.data);
};

 const fetchPolicies = async () => {
  const res = await API.get("/policies");
  setPolicies(res.data);
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const saveClaim = async (e) => {
    e.preventDefault();

   const token = localStorage.getItem("token");

if (editingId) {
  await API.put(`/claims/${editingId}`, form);
  toast.success("Claim updated successfully!");
} else {
  await API.post("/claims", form);
  toast.success("Claim added successfully!");
}

    setForm({
      policy: "",
      claimNumber: "",
      claimAmount: "",
      reason: "",
      status: "Pending",
    });

    setEditingId(null);
    fetchClaims();
  };

  const editClaim = (claim) => {
    setForm({
      policy: claim.policy._id,
      claimNumber: claim.claimNumber,
      claimAmount: claim.claimAmount,
      reason: claim.reason,
      status: claim.status,
    });

    setEditingId(claim._id);
  };

  const deleteClaim = async (id) => {
    if (!window.confirm("Delete this claim?")) return;

    const token = localStorage.getItem("token");

await API.delete(`/claims/${id}`);

toast.success("Claim deleted successfully!");

fetchClaims();
  };

  return (
    <AdminLayout>
    <div style={{ padding: "30px" }}>
      <h1>Claims Management</h1>

      <form onSubmit={saveClaim}>

        <select
          name="policy"
          value={form.policy}
          onChange={handleChange}
        >
          <option value="">Select Policy</option>

          {policies.map((policy) => (
            <option key={policy._id} value={policy._id}>
              {policy.policyNumber}
            </option>
          ))}
        </select>

        <input
          name="claimNumber"
          placeholder="Claim Number"
          value={form.claimNumber}
          onChange={handleChange}
        />

        <input
          type="number"
          name="claimAmount"
          placeholder="Claim Amount"
          value={form.claimAmount}
          onChange={handleChange}
        />

        <input
          name="reason"
          placeholder="Reason"
          value={form.reason}
          onChange={handleChange}
        />

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Approved</option>
          <option>Rejected</option>
        </select>

        <button>
          {editingId ? "Update Claim" : "Add Claim"}
        </button>

      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Policy</th>
            <th>Claim No.</th>
            <th>Amount</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {claims.map((claim) => (
            <tr key={claim._id}>
              <td>{claim.policy?.policyNumber}</td>
              <td>{claim.claimNumber}</td>
              <td>₹{claim.claimAmount}</td>
              <td>{claim.reason}</td>
              <td>{claim.status}</td>

              <td>
                <button onClick={() => editClaim(claim)}>
                  Edit
                </button>

                <button
                  onClick={() => deleteClaim(claim._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
    </AdminLayout>
  );
}

export default Claims;