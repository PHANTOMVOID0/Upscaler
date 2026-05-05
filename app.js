// --- State ---
let currentRes = '4K';
let hasImage = false;

// --- Upload ---
const fileInput = document.getElementById('fileInput');
const uploadZone = document.getElementById('uploadZone');

fileInput.addEventListener('change', handleFile);

uploadZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadZone.style.borderColor = 'var(--accent)';
});

uploadZone.addEventListener('dragleave', () => {
  uploadZone.style.borderColor = '';
});

uploadZone.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadZone.style.borderColor = '';
  const file = e.dataTransfer.files[0];
  if (file && file.type.startsWith('image/')) {
    loadImage(file);
  }
});

function handleFile(e) {
  const file = e.target.files[0];
  if (file) loadImage(file);
}

function loadImage(file) {
  const url = URL.createObjectURL(file);
  document.getElementById('origImg').src = url;
  document.getElementById('previewGrid').style.display = 'grid';
  document.getElementById('uploadInner').innerHTML = `
    <div class="upload-icon" style="opacity:0.4">◈</div>
    <div class="upload-main">${file.name}</div>
    <div class="upload-sub">Click to change image</div>
  `;
  const kb = (file.size / 1024).toFixed(0);
  const mb = (file.size / 1048576).toFixed(2);
  document.getElementById('fileInfo').textContent =
    `${file.name} · ${mb > 0.99 ? mb + ' MB' : kb + ' KB'} · ${file.type.replace('image/', '').toUpperCase()}`;
  hasImage = true;
}

// --- Sliders ---
function syncSlider(name) {
  const map = {
    steps:   { slider: 'stepsSlider',   display: 'stepsDisplay',   format: v => Math.round(v) },
    cfg:     { slider: 'cfgSlider',     display: 'cfgDisplay',     format: v => parseFloat(v).toFixed(1) },
    denoise: { slider: 'denoiseSlider', display: 'denoiseDisplay', format: v => parseFloat(v).toFixed(2) },
  };
  const { slider, display, format } = map[name];
  document.getElementById(display).textContent = format(document.getElementById(slider).value);
}

// --- Resolution ---
function setRes(el, res) {
  document.querySelectorAll('.res-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  currentRes = res;
}

// --- Config builder ---
function getConfig() {
  return {
    task: 'image_restoration_upscale',
    positive_prompt: document.getElementById('posPrompt').textContent.trim(),
    negative_prompt: document.getElementById('negPrompt').textContent.trim(),
    parameters: {
      steps: parseInt(document.getElementById('stepsSlider').value),
      cfg_scale: parseFloat(document.getElementById('cfgSlider').value),
      denoising_strength: parseFloat(document.getElementById('denoiseSlider').value),
      upscaler: document.getElementById('upscalerSelect').value,
      target_resolution: currentRes,
    },
  };
}

// --- Export JSON ---
function exportJSON() {
  const cfg = getConfig();
  const json = JSON.stringify(cfg, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'restoration_config.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showToast('restoration_config.json downloaded!');
}

// --- Copy config ---
function copyAllConfig() {
  const cfg = getConfig();
  navigator.clipboard.writeText(JSON.stringify(cfg, null, 2))
    .then(() => showToast('Full config copied to clipboard!'))
    .catch(() => showToast('Copy failed — try the Export button instead.'));
}

// --- Copy individual prompt ---
function copyText(type) {
  const id = type === 'pos' ? 'posPrompt' : 'negPrompt';
  const text = document.getElementById(id).textContent.trim();
  navigator.clipboard.writeText(text)
    .then(() => showToast((type === 'pos' ? 'Positive' : 'Negative') + ' prompt copied!'))
    .catch(() => showToast('Copy failed.'));
}

// --- Toast ---
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2800);
}
