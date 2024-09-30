// Función para cargar todos los registros guardados al cargar la página
function loadRecords() {
  const records = JSON.parse(localStorage.getItem("records")) || [];
  const recordList = document.getElementById("record-list");
  recordList.innerHTML = ""; // Limpiar tabla antes de añadir los registros

  records.forEach((record) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${record.date}</td>
            <td>$${record.cost}</td>
            <td>$${record.sale}</td>
            <td>$${record.gain}</td>
        `;
    recordList.appendChild(row);
  });
}

// Función para guardar un nuevo registro
function saveRecord() {
  const cost = parseFloat(document.getElementById("cost").value);
  const sale = parseFloat(document.getElementById("sale").value);
  const date = document.getElementById("date").value;

  if (isNaN(cost) || isNaN(sale) || !date) {
    alert("Por favor, ingrese todos los campos correctamente.");
    return;
  }

  const gain = sale - cost;
  const record = { cost, sale, gain, date };

  // Guardar en localStorage
  let records = JSON.parse(localStorage.getItem("records")) || [];
  records.push(record);
  localStorage.setItem("records", JSON.stringify(records));

  alert(`Registro guardado. Ganancia: $${gain.toFixed(2)}`);
  clearForm();

  // Recargar los registros en la tabla
  loadRecords();
}

// Función para buscar registros por fecha
function searchRecord() {
  const searchDate = document.getElementById("searchDate").value;
  const resultsDiv = document.getElementById("results");

  if (!searchDate) {
    alert("Por favor, ingrese una fecha.");
    return;
  }

  // Obtener los registros de localStorage
  const records = JSON.parse(localStorage.getItem("records")) || [];
  const results = records.filter((record) => record.date === searchDate);

  if (results.length > 0) {
    let resultsHtml = "<ul>";
    results.forEach((record) => {
      resultsHtml += `<li>Costo: $${record.cost}, Venta: $${record.sale}, Ganancia: $${record.gain}, Fecha: ${record.date}</li>`;
    });
    resultsHtml += "</ul>";
    resultsDiv.innerHTML = resultsHtml;
  } else {
    resultsDiv.innerHTML = "No se encontraron registros para esta fecha.";
  }
}

// Función para limpiar el formulario
function clearForm() {
  document.getElementById("cost").value = "";
  document.getElementById("sale").value = "";
  document.getElementById("date").value = "";
}

// Cargar registros cuando se carga la página
window.onload = loadRecords;
