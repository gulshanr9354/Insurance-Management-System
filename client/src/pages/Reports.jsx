import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import AdminLayout from "../components/AdminLayout";
import "../styles/Reports.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

function Reports() {
  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalPolicies: 0,
    totalClaims: 0,
    totalPremium: 0,
  });
const reportRef = useRef();


  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("/dashboard");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPDF = async () => {
  const input = reportRef.current;

  const canvas = await html2canvas(input);

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const pdfWidth = pdf.internal.pageSize.getWidth();

  const pdfHeight =
    (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);

  pdf.save("Insurance_Report.pdf");
};
const exportToExcel = () => {
  const reportData = [
    {
      "Total Customers": stats.totalCustomers,
      "Total Policies": stats.totalPolicies,
      "Total Claims": stats.totalClaims,
      "Total Revenue": stats.totalPremium,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(reportData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Insurance Report"
  );

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const fileData = new Blob(
    [excelBuffer],
    {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
    }
  );

  saveAs(fileData, "Insurance_Report.xlsx");
};
  const chartData = {
    labels: ["Customers", "Policies", "Claims", "Revenue"],
    datasets: [
      {
        label: "Insurance Statistics",
        data: [
          stats.totalCustomers,
          stats.totalPolicies,
          stats.totalClaims,
          stats.totalPremium,
        ],
        backgroundColor: [
          "#4CAF50",
          "#2196F3",
          "#FF9800",
          "#9C27B0",
        ],
      },
    ],
  };

  const pieData = {
  labels: ["Customers", "Policies", "Claims"],
  datasets: [
    {
      data: [
        stats.totalCustomers,
        stats.totalPolicies,
        stats.totalClaims,
      ],
      backgroundColor: [
        "#4CAF50",
        "#2196F3",
        "#FF9800",
      ],
    },
  ],
};

  return (
    <AdminLayout>
      <div
  className="reports-container"
  ref={reportRef}
>
<h1>Insurance Reports</h1>
        <button
  onClick={downloadPDF}
  className="download-btn"
>
  Download PDF
</button>

<button
  onClick={exportToExcel}
  className="download-btn"
  style={{ marginLeft: "10px", background: "#28a745" }}
>
  Download Excel
</button>

        <div className="report-cards">

          <div className="report-card">
            <h2>{stats.totalCustomers}</h2>
            <p>Total Customers</p>
          </div>

          <div className="report-card">
            <h2>{stats.totalPolicies}</h2>
            <p>Total Policies</p>
          </div>

          <div className="report-card">
            <h2>{stats.totalClaims}</h2>
            <p>Total Claims</p>
          </div>

          <div className="report-card">
            <h2>₹{stats.totalPremium}</h2>
            <p>Total Revenue</p>
          </div>

        </div>

        <div className="chart-container">
          <h2>Business Overview</h2>

          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: {
                  position: "top",
                },
                title: {
                  display: true,
                  text: "Insurance Management Statistics",
                },
              },
            }}
          />
        </div>

        <div className="chart-container">
  <h2>Business Distribution</h2>

  <div style={{ width: "400px", margin: "auto" }}>
    <Pie data={pieData} />
  </div>
</div>

        <div className="summary">

          <h2>Business Summary</h2>

          <table>

            <tbody>

              <tr>
                <td>Total Customers</td>
                <td>{stats.totalCustomers}</td>
              </tr>

              <tr>
                <td>Total Policies</td>
                <td>{stats.totalPolicies}</td>
              </tr>

              <tr>
                <td>Total Claims</td>
                <td>{stats.totalClaims}</td>
              </tr>

              <tr>
                <td>Total Premium</td>
                <td>₹{stats.totalPremium}</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>
    </AdminLayout>
  );
}

export default Reports;