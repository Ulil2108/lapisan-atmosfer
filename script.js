const layers = [
  {name: "Permukaan Bumi", info: "Tempat kita tinggal, terdiri dari daratan dan lautan."},
  {name: "Troposfer", info: "Lapisan paling bawah, tempat terjadinya cuaca dan kehidupan. Tinggi ±12 km."},
  {name: "Stratosfer", info: "Mengandung lapisan ozon yang melindungi bumi dari sinar UV. Tinggi 12–50 km."},
  {name: "Mesosfer", info: "Lapisan tempat meteor terbakar. Tinggi 50–85 km."},
  {name: "Termosfer", info: "Lapisan sangat panas, tempat aurora terjadi. Tinggi 85–600 km."},
  {name: "Eksosfer", info: "Lapisan paling luar, transisi ke ruang angkasa. Tinggi >600 km."}
];

let current = 0;

function updateScene() {
  document.getElementById("layer-name").innerText = layers[current].name;
  document.getElementById("info").innerText = layers[current].info;
  document.getElementById("up").disabled = current === layers.length - 1;
  document.getElementById("down").disabled = current === 0;
}

function moveUp() {
  if (current < layers.length - 1) {
    current++;
    updateScene();
  }
}

function moveDown() {
  if (current > 0) {
    current--;
    updateScene();
  }
}

window.onload = updateScene;
