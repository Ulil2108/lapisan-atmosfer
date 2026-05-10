// Data lapisan atmosfer dengan informasi lengkap
const layers = [
  {
    id: 0,
    name: "Permukaan Bumi",
    height: "0 km",
    temperature: "Bervariasi",
    info: "Anda berada di permukaan Bumi. Tekan tombol 'Naik' untuk mulai menjelajahi lapisan-lapisan atmosfer yang melindungi planet kita!"
  },
  {
    id: 1,
    name: "Troposfer",
    height: "0 - 17 km",
    temperature: "Menurun seiring ketinggian",
    info: "Lapisan paling bawah dari atmosfer. Inilah tempat cuaca terjadi! Troposfer mengandung 80% dari seluruh massa udara atmosfer. Anda dapat melihat awan, hujan, angin, dan semua fenomena cuaca terjadi di sini."
  },
  {
    id: 2,
    name: "Stratosfer",
    height: "17 - 50 km",
    temperature: "Meningkat seiring ketinggian",
    info: "Lapisan yang mengandung ozon (O₃) yang sangat penting! Ozon melindungi Bumi dari radiasi ultraviolet (UV) yang berbahaya dari matahari. Stratosfer relatif tenang tanpa turbulensi yang berarti."
  },
  {
    id: 3,
    name: "Mesosfer",
    height: "50 - 85 km",
    temperature: "Menurun hingga -90°C",
    info: "Lapisan terdingin di seluruh atmosfer! Suhu dapat mencapai -90°C. Meteor dari luar angkasa memasuki lapisan ini dan terbakar karena gesekan udara, menciptakan apa yang kita kenal sebagai 'bintang jatuh' atau meteor."
  },
  {
    id: 4,
    name: "Termosfer",
    height: "85 - 500 km",
    temperature: "Ribuan derajat Celsius",
    info: "Lapisan yang sangat panas dengan suhu bisa mencapai ribuan derajat Celsius! Panas ini dihasilkan dari penyerapan radiasi ultraviolet ekstrem dari matahari. Di sini terjadi fenomena Aurora Borealis (Cahaya Utara) dan Termosfer adalah tempat dimana satelit mengorbit."
  },
  {
    id: 5,
    name: "Eksosfer",
    height: "Di atas 500 km",
    temperature: "Sangat tinggi dan terus meningkat",
    info: "Lapisan paling luar dari atmosfer Bumi. Ini adalah transisi antara atmosfer dan ruang angkasa. Udara sangat jarang di sini dengan sangat sedikit molekul. Ini adalah tempat dimana satelit buatan dan Stasiun Luar Angkasa Internasional (ISS) mengorbit. Selamat! Anda telah mencapai lapisan tertinggi!"
  }
];

// Variabel untuk tracking posisi saat ini
let currentLayerIndex = 0;

// Update tampilan sesuai lapisan yang dipilih
function updateScene() {
  const layer = layers[currentLayerIndex];
  
  // Update nama lapisan di heading
  document.getElementById("current-layer-name").innerText = layer.name;
  
  // Update deskripsi lapisan
  document.getElementById("layer-info").innerHTML = `<p>${layer.info}</p>`;
  
  // Sembunyikan semua detail lapisan
  document.querySelectorAll(".layer-detail").forEach(detail => {
    detail.classList.add("hidden");
  });
  
  // Tampilkan detail lapisan yang sesuai
  if (currentLayerIndex > 0) {
    const detailId = `detail-${getLayerClass(layer.name)}`;
    const detailElement = document.getElementById(detailId);
    if (detailElement) {
      detailElement.classList.remove("hidden");
    }
  }
  
  // Update posisi astronot dengan animasi
  updateAstronautPosition();
  
  // Update highlight pada lapisan yang aktif
  updateLayerHighlight();
  
  // Update state tombol
  updateButtonStates();
}

// Fungsi untuk mendapatkan class name dari nama lapisan
function getLayerClass(layerName) {
  const classMap = {
    "Troposfer": "troposphere",
    "Stratosfer": "stratosphere",
    "Mesosfer": "mesosphere",
    "Termosfer": "thermosphere",
    "Eksosfer": "exosphere"
  };
  return classMap[layerName] || "";
}

// Update posisi astronot berdasarkan lapisan
function updateAstronautPosition() {
  const astronaut = document.getElementById("astronaut");
  const positions = [130, 215, 380, 555, 600];
  
  if (currentLayerIndex === 0) {
    astronaut.style.bottom = "130px";
  } else {
    astronaut.style.bottom = positions[currentLayerIndex - 1] + "px";
  }
}

// Highlight lapisan yang aktif
function updateLayerHighlight() {
  // Hapus highlight dari semua lapisan
  document.querySelectorAll(".atmosphere-layer").forEach(layer => {
    layer.classList.remove("active");
  });
  
  // Tambah highlight ke lapisan aktif
  if (currentLayerIndex > 0) {
    const layerClass = getLayerClass(layers[currentLayerIndex].name);
    const activeLayer = document.getElementById(`layer-${layerClass}`);
    if (activeLayer) {
      activeLayer.classList.add("active");
    }
  }
}

// Update state tombol (enable/disable)
function updateButtonStates() {
  const btnUp = document.getElementById("btn-up");
  const btnDown = document.getElementById("btn-down");
  
  // Disable tombol "Turun" jika di permukaan bumi
  btnDown.disabled = currentLayerIndex === 0;
  
  // Disable tombol "Naik" jika di lapisan tertinggi
  btnUp.disabled = currentLayerIndex === layers.length - 1;
}

// Fungsi untuk naik ke lapisan lebih tinggi
function moveUp() {
  if (currentLayerIndex < layers.length - 1) {
    currentLayerIndex++;
    updateScene();
    playAnimation("up");
  }
}

// Fungsi untuk turun ke lapisan lebih rendah
function moveDown() {
  if (currentLayerIndex > 0) {
    currentLayerIndex--;
    updateScene();
    playAnimation("down");
  }
}

// Animasi visual saat bergerak
function playAnimation(direction) {
  const astronaut = document.getElementById("astronaut");
  astronaut.style.transition = "none";
  astronaut.style.opacity = "0.7";
  
  setTimeout(() => {
    astronaut.style.transition = "bottom 0.5s ease";
    astronaut.style.opacity = "1";
  }, 50);
}

// Keyboard support
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") {
    moveUp();
  } else if (e.key === "ArrowDown") {
    moveDown();
  }
});

// Initialize ketika page dimuat
window.addEventListener("load", () => {
  updateScene();
});
