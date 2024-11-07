// Set the default date to today's date on page load
window.onload = function() {
  const dateInput = document.getElementById("date");
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  dateInput.value = `${year}-${month}-${day}`;
};

function toggleOtherPurpose() {
  const purposeSelect = document.getElementById("purpose");
  const otherPurposeDiv = document.getElementById("otherPurposeDiv");

  if (purposeSelect.value === "Others") {
    otherPurposeDiv.style.display = "block";
  } else {
    otherPurposeDiv.style.display = "none";
    document.getElementById("otherPurpose").value = "";
  }
}

function generateGatepass() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const purposeSelect = document.getElementById("purpose").value;
  const otherPurpose = document.getElementById("otherPurpose").value;
  const date = document.getElementById("date").value;
  const purpose = purposeSelect === "Others" ? otherPurpose : purposeSelect;

  if (firstName && lastName && purpose && date) {
    const canvas = document.getElementById("gatepassCanvas");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const logo = new Image();
    logo.src = "CDM Logo.png";
    logo.onload = function() {
      ctx.drawImage(logo, 20, 20, 60, 60);

      ctx.fillStyle = "#044721";
      ctx.font = "bold 20px Arial";
      ctx.fillText("Colegio de Montalban Gatepass", 110, 60);

      ctx.fillText(`Request ID: `, 100, 110);
      ctx.font = "16px Arial";
      ctx.fillText(`Name: ${firstName} ${lastName}`, 100, 140);
      ctx.fillText(`Purpose: ${purpose}`, 100, 160);
      ctx.fillText(`Date: ${date}`, 100, 180);

      ctx.fillStyle = "#ff1744";
      ctx.font = "bold 16px Arial";
      ctx.fillText("Approved", 220, 220);

      canvas.style.display = "block";
    };

    logo.onerror = function() {
      console.error("Failed to load the logo image. Please check the file path.");
      alert("Failed to load the logo image. Please ensure it is in the correct path.");
    };
  } else {
    alert("Please fill in all fields.");
  }
}

function downloadGatepass() {
  const canvas = document.getElementById("gatepassCanvas");
  if (canvas.style.display === "block") {
    const link = document.createElement("a");
    link.download = "CDMGatepass.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  } else {
    alert("Please generate the gatepass before downloading.");
  }
}