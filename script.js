const STORAGE_KEY = "jianhetian-collection-uploads";

const uploadForm = document.querySelector("#uploadForm");
const photoInput = document.querySelector("#photoInput");
const uploadedGrid = document.querySelector("#uploadedGrid");
const clearUploads = document.querySelector("#clearUploads");
const photoDrop = document.querySelector(".photo-drop");

const readUploads = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

const saveUploads = (uploads) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(uploads));
};

const escapeHtml = (value) =>
  String(value).replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });

const formatDate = (value) => {
  if (!value) return "未填日期";
  return new Intl.DateTimeFormat("zh-Hant", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(`${value}T00:00:00`));
};

const renderUploads = () => {
  const uploads = readUploads();
  uploadedGrid.innerHTML = "";
  uploadedGrid.hidden = uploads.length === 0;

  uploads.forEach((item) => {
    const article = document.createElement("article");
    article.className = "post-card uploaded-card";
    article.innerHTML = `
      <div class="post-media">
        <img src="${item.photo}" alt="${escapeHtml(item.title)}">
      </div>
      <div class="post-body">
        <p class="post-date">${escapeHtml(formatDate(item.date))}</p>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.note || "尚未填寫備註。")}</p>
        <dl class="quick-facts">
          <div>
            <dt>類別</dt>
            <dd>${escapeHtml(item.category || "未填")}</dd>
          </div>
          <div>
            <dt>材質</dt>
            <dd>${escapeHtml(item.material || "未填")}</dd>
          </div>
        </dl>
      </div>
    `;
    uploadedGrid.prepend(article);
  });
};

const readFileAsDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });

const loadImage = (source) =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener("load", () => resolve(image));
    image.addEventListener("error", reject);
    image.src = source;
  });

const shrinkPhoto = async (file) => {
  const source = await readFileAsDataUrl(file);
  const image = await loadImage(source);
  const longestSide = 1600;
  const ratio = Math.min(1, longestSide / Math.max(image.width, image.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(image.width * ratio);
  canvas.height = Math.round(image.height * ratio);

  const context = canvas.getContext("2d");
  context.drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg", 0.86);
};

photoInput?.addEventListener("change", () => {
  const fileName = photoInput.files?.[0]?.name;
  if (fileName) {
    photoDrop.dataset.file = fileName;
  }
});

uploadForm?.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(uploadForm);
  const file = formData.get("photo");
  if (!(file instanceof File) || file.size === 0) return;

  const photo = await shrinkPhoto(file);
  const upload = {
    id: crypto.randomUUID(),
    photo,
    title: String(formData.get("title") || "未命名收藏").trim(),
    category: String(formData.get("category") || "").trim(),
    material: String(formData.get("material") || "").trim(),
    date: String(formData.get("date") || ""),
    note: String(formData.get("note") || "").trim(),
  };

  saveUploads([...readUploads(), upload]);
  uploadForm.reset();
  delete photoDrop.dataset.file;
  renderUploads();
  document.querySelector("#collection")?.scrollIntoView({ behavior: "smooth" });
});

clearUploads?.addEventListener("click", () => {
  localStorage.removeItem(STORAGE_KEY);
  renderUploads();
});

renderUploads();
