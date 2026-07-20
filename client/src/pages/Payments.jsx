import { useEffect, useState } from "react";
import API from "../api/axios";
import AdminLayout from "../components/AdminLayout";
import { toast } from "react-toastify";
function Payments() {
  const [payments, setPayments] = useState([]);
  const [policies, setPolicies] = useState([]);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    policy: "",
    amount: "",
    paymentDate: "",
    paymentMethod: "UPI",
    status: "Pending",
  });

  useEffect(() => {
    fetchPayments();
    fetchPolicies();
  }, []);

  const fetchPayments = async () => {
  const res = await API.get("/payments");
  setPayments(res.data);
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

  const savePayment = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

if (editingId) {
  await API.put(`/payments/${editingId}`, form);
  toast.success("Payment updated successfully!");
} else {
  await API.post("/payments", form);
  toast.success("Payment added successfully!");
}
      setForm({
        policy: "",
        amount: "",
        paymentDate: "",
        paymentMethod: "UPI",
        status: "Pending",
      });

      setEditingId(null);
      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  const editPayment = (payment) => {
    setForm({
      policy: payment.policy._id,
      amount: payment.amount,
      paymentDate: payment.paymentDate.substring(0, 10),
      paymentMethod: payment.paymentMethod,
      status: payment.status,
    });

    setEditingId(payment._id);
  };

  const deletePayment = async (id) => {
    if (!window.confirm("Delete this payment?")) return;

    const token = localStorage.getItem("token");
await API.delete(`/payments/${id}`);

toast.success("Payment deleted successfully!");

fetchPayments();

  };

  return (
    <AdminLayout>
    <div style={{ padding: "30px" }}>
      <h1>Payment Management</h1>

      <form onSubmit={savePayment}>

        <select
          name="policy"
          value={form.policy}
          onChange={handleChange}
          required
        >
          <option value="">Select Policy</option>

          {policies.map((policy) => (
            <option key={policy._id} value={policy._id}>
              {policy.policyNumber}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={form.amount}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="paymentDate"
          value={form.paymentDate}
          onChange={handleChange}
          required
        />

        <select
          name="paymentMethod"
          value={form.paymentMethod}
          onChange={handleChange}
        >
          <option>Cash</option>
          <option>Card</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>Pending</option>
          <option>Paid</option>
        </select>

        <button type="submit">
          {editingId ? "Update Payment" : "Add Payment"}
        </button>

      </form>

      <br />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Policy</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Method</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td>{payment.policy?.policyNumber}</td>
              <td>{payment.policy?.customer?.name}</td>
              <td>₹{payment.amount}</td>
              <td>{payment.paymentDate.substring(0, 10)}</td>
              <td>{payment.paymentMethod}</td>
              <td>{payment.status}</td>

              <td>
                <button onClick={() => editPayment(payment)}>
                  Edit
                </button>

                {" "}

                <button
                  onClick={() => deletePayment(payment._id)}
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

export default Payments;