import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminLayout from "../components/AdminLayout";
import { toast } from "react-toastify";

function Policies() {
  const [policies, setPolicies] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    customer: "",
    policyNumber: "",
    policyType: "",
    premium: "",
    startDate: "",
    endDate: "",
  });

  useEffect(() => {
    fetchPolicies();
    fetchCustomers();
  }, []);

 const fetchPolicies = async () => {
  const res = await API.get("/policies");
  setPolicies(res.data);
};

 const fetchCustomers = async () => {
  const res = await API.get("/customers");
  setCustomers(res.data);
};

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addPolicy = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

if (editingId) {
  await API.put(`/policies/${editingId}`, form);
  toast.success("Policy updated successfully!");
} else {
  await API.post("/policies", form);
  toast.success("Policy added successfully!");
}

      setForm({
        customer: "",
        policyNumber: "",
        policyType: "",
        premium: "",
        startDate: "",
        endDate: "",
      });

      setEditingId(null);

      fetchPolicies();

    } catch (err) {
      console.log(err);
    }
  };


  const deletePolicy = async (id) => {
    if (!window.confirm("Delete this policy?")) return;

    const token = localStorage.getItem("token");

await API.delete(`/policies/${id}`);

toast.success("Policy deleted successfully!");

fetchPolicies();
  };

  const editPolicy = (policy) => {
    setForm({
      customer: policy.customer?._id || "",
      policyNumber: policy.policyNumber,
      policyType: policy.policyType,
      premium: policy.premium,
      startDate: policy.startDate?.substring(0, 10),
      endDate: policy.endDate?.substring(0, 10),
    });

    setEditingId(policy._id);
  };

  return (
    <AdminLayout>
    <div style={{ padding: "30px" }}>
      <h1>Policy Management</h1>

      <form onSubmit={addPolicy}>

        <select
          name="customer"
          value={form.customer}
          onChange={handleChange}
          required
        >
          <option value="">Select Customer</option>

          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}
            </option>
          ))}
        </select>

        <input
          name="policyNumber"
          placeholder="Policy Number"
          value={form.policyNumber}
          onChange={handleChange}
        />

        <input
          name="policyType"
          placeholder="Policy Type"
          value={form.policyType}
          onChange={handleChange}
        />

        <input
          name="premium"
          type="number"
          placeholder="Premium"
          value={form.premium}
          onChange={handleChange}
        />

        <input
          type="date"
          name="startDate"
          value={form.startDate}
          onChange={handleChange}
        />

        <input
          type="date"
          name="endDate"
          value={form.endDate}
          onChange={handleChange}
        />

        <button type="submit">
          {editingId ? "Update Policy" : "Add Policy"}
        </button>

      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Policy No.</th>
            <th>Type</th>
            <th>Premium</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {policies.map((policy) => (
            <tr key={policy._id}>
              <td>{policy.customer?.name}</td>
              <td>{policy.policyNumber}</td>
              <td>{policy.policyType}</td>
              <td>₹{policy.premium}</td>
              <td>{policy.status}</td>
              <td>
                <button
                  onClick={() => editPolicy(policy)}
                >
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => deletePolicy(policy._id)}
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

export default Policies;