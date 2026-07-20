import { useEffect, useState } from "react";
import API from "../api/axios";
import "../styles/Customers.css";
import AdminLayout from "../components/AdminLayout";
import { toast } from "react-toastify";

function Customers() {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const customersPerPage = 5;
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const fetchCustomers = async () => {
    try {
      const res = await API.get("/customers");
      setCustomers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const addCustomer = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

     if (editingId) {
  await API.put(`/customers/${editingId}`, form);
  toast.success("Customer updated successfully!");
} else {
  await API.post("/customers", form);
  toast.success("Customer added successfully!");
}

      setForm({
        name: "",
        email: "",
        phone: "",
        address: "",
      });

      setEditingId(null);

      fetchCustomers();

    } catch (error) {
      console.log(error);
    }
  };
  


  const deleteCustomer = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/customers/${id}`);
      toast.success("Customer deleted successfully!");

      fetchCustomers();
    } catch (error) {
      console.log(error);
    }
  };
  



  const editCustomer = (customer) => {
    setForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      address: customer.address,
    });

    setEditingId(customer._id);
  };
  

  const filteredCustomers = customers.filter((customer) =>
    customer.name.toLowerCase().includes(search.toLowerCase()) ||
    customer.email.toLowerCase().includes(search.toLowerCase()) ||
    customer.phone.includes(search)
  );

  const indexOfLastCustomer = currentPage * customersPerPage;
  const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;

  const currentCustomers = filteredCustomers.slice(
    indexOfFirstCustomer,
    indexOfLastCustomer
  );

  const totalPages = Math.ceil(
    filteredCustomers.length / customersPerPage
  );
  return (
    <AdminLayout>
      <div className="customer-container">
        <h1 className="customer-title">Customer Management</h1>

        <form className="customer-form" onSubmit={addCustomer}>

          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
          />

          <input
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
          />

          <button>
            {editingId ? "Update Customer" : "Add Customer"}
          </button>

        </form>

        <input
          type="text"
          placeholder="Search by Name, Email or Phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <br />

        <table className="customer-table">

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {currentCustomers.map((customer) => (
              <tr key={customer._id}>

                <td>{customer.name}</td>

                <td>{customer.email}</td>

                <td>{customer.phone}</td>

                <td>{customer.address}</td>

                <td>
                  <button
                    className="edit-btn"
                    onClick={() => editCustomer(customer)}
                  >
                    Edit
                  </button>

                  {" "}

                  <button
                    className="delete-btn"
                    onClick={() => deleteCustomer(customer._id)}
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

        <div
          style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span>
            Page {currentPage} of {totalPages || 1}
          </span>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
          >
            Next
          </button>
        </div>

      </div>

    </AdminLayout>
  );
}

export default Customers;