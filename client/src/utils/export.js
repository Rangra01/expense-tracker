import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// 📄 EXPORT CSV
export const exportCSV = (transactions) => {
  const headers = ["Type", "Amount", "Category", "Date"];

  const rows = transactions.map((t) => [
    t.type,
    t.amount,
    t.category,
    new Date(t.date).toLocaleDateString(),
  ]);

  let csvContent =
    "data:text/csv;charset=utf-8," +
    [headers, ...rows].map((e) => e.join(",")).join("\n");

  const link = document.createElement("a");
  link.setAttribute("href", encodeURI(csvContent));
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
};

// 📄 EXPORT PDF
export const exportPDF = (transactions) => {
  const doc = new jsPDF();

  const tableData = transactions.map((t) => [
    t.type,
    t.amount,
    t.category,
    new Date(t.date).toLocaleDateString(),
  ]);

  autoTable(doc, {
    head: [["Type", "Amount", "Category", "Date"]],
    body: tableData,
  });

  doc.save("transactions.pdf");
};