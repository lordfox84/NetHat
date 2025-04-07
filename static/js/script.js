function fetchSpeed() {
  document.getElementById("download").textContent = "Loading...";
  document.getElementById("upload").textContent = "Loading...";
  document.getElementById("ping").textContent = "Loading...";

  document.getElementById("dl-spinner").className = "loader";
  document.getElementById("ul-spinner").className = "loader";
  document.getElementById("ping-spinner").className = "loader";

  fetch("/speedtest")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("download").textContent = data.download + " Mbps";
      document.getElementById("upload").textContent = data.upload + " Mbps";
      document.getElementById("ping").textContent = data.ping + " ms";

      document.getElementById("dl-spinner").className = "";
      document.getElementById("ul-spinner").className = "";
      document.getElementById("ping-spinner").className = "";
    })
    .catch((error) => {
      document.getElementById("download").textContent = "Error";
      document.getElementById("upload").textContent = "Error";
      document.getElementById("ping").textContent = "Error";

      document.getElementById("dl-spinner").className = "";
      document.getElementById("ul-spinner").className = "";
      document.getElementById("ping-spinner").className = "";

      console.error("Speedtest failed:", error);
    });
}

function fetchDevices() {
  document.getElementById("devices").textContent = "Loading...";

  fetch("/devices")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("devices").textContent = data.devices;
    })
    .catch((error) => {
      document.getElementById("devices").textContent = "Error fetching devices";
      console.error("Device fetch failed:", error);
    });
}
