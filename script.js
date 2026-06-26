const STORAGE_KEY = "jianhetian-collection-uploads";
const EDIT_STORAGE_KEY = "jianhetian-collection-edits";

const uploadForm = document.querySelector("#uploadForm");
const photoInput = document.querySelector("#photoInput");
const uploadedGrid = document.querySelector("#uploadedGrid");
const clearUploads = document.querySelector("#clearUploads");
const photoDrop = document.querySelector(".photo-drop");

const catalog = {
  "no-001-xiao-long-gui": {
    title: "小龍龜",
    number: "No.001",
    image: "assets/items/001-0.jpg",
    detailImage: "../assets/items/001-0.jpg",
    summary: "開門的小籽，形制靈巧，龜甲紋路清楚，適合作為隨身把玩小件。",
    category: "和田玉",
    material: "開門的小籽",
    weight: "約 19 g",
    size: "約 35*2*15 mm",
    craft: "小件雕刻",
    note: "開門小籽，形制靈巧",
    story:
      "開門的小籽，題名「小龍龜」。作品尺寸小巧，龜甲紋路清楚，整體帶有溫潤皮色與把玩件的親近感，重量約 19 克，尺寸約 35*2*15 mm。",
  },
  "no-025-yaochan-wanguan": {
    title: "腰纏萬貫",
    number: "No.025",
    image: "assets/items/25-0.jpg",
    detailImage: "../assets/items/25-0.jpg",
    summary: "青花籽料，三色籽料巧雕，工藝與料子都不错。",
    category: "和田玉",
    material: "青花籽料、三色籽料巧雕",
    weight: "130 g",
    size: "40/81/26 mm",
    craft: "巧雕",
    note: "工藝料子都不错",
    story:
      "青花籽料，三色籽料巧雕。作品題名「腰纏萬貫」，以料色分布配合雕工呈現層次，整體工藝與料子表現都不错。",
  },
};

const readJson = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || fallback;
  } catch {
    return fallback;
  }
};

const writeJson = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const readUploads = () => readJson(STORAGE_KEY, []);
const saveUploads = (uploads) => writeJson(STORAGE_KEY, uploads);
const readEdits = () => readJson(EDIT_STORAGE_KEY, {});
const saveEdits = (edits) => writeJson(EDIT_STORAGE_KEY, edits);

const getItemData = (id) => ({
  ...catalog[id],
  ...(readEdits()[id] || {}),
});

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

const renderUploads = () => {
  if (!uploadedGrid) return;

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

const itemIdFromHref = (href) => {
  const match = href.match(/items\/(.+?)\.html/);
  return match?.[1] || "";
};

const itemIdFromPath = () => {
  const match = window.location.pathname.match(/\/items\/(.+?)\.html$/);
  return match?.[1] || "";
};

const imageForContext = (data, isDetailPage) => {
  if (data.imageOverride) return data.imageOverride;
  return isDetailPage ? data.detailImage : data.image;
};

const setMetaValue = (label, value) => {
  document.querySelectorAll(".meta-list div").forEach((row) => {
    const dt = row.querySelector("dt");
    const dd = row.querySelector("dd");
    if (dt?.textContent.trim() === label && dd) {
      dd.textContent = value;
    }
  });
};

const applyCardData = (card, id) => {
  const data = getItemData(id);
  if (!data.title) return;

  const image = card.querySelector(".post-media img");
  const title = card.querySelector(".post-body h3");
  const summary = card.querySelector(".post-body > p:not(.post-date)");
  const facts = card.querySelectorAll(".quick-facts dd");

  if (image) {
    image.src = imageForContext(data, false);
    image.alt = `${data.number} ${data.title}`;
  }
  if (title) title.textContent = data.title;
  if (summary) summary.textContent = data.summary;
  if (facts[0]) facts[0].textContent = data.weight;
  if (facts[1]) facts[1].textContent = data.size;
};

const applyDetailData = (id) => {
  const data = getItemData(id);
  if (!data.title) return;

  const image = document.querySelector(".item-photo img");
  const title = document.querySelector(".item-content h1");
  const story = document.querySelector(".story p");

  if (image) {
    image.src = imageForContext(data, true);
    image.alt = `${data.number} ${data.title}`;
  }
  if (title) title.textContent = data.title;
  if (story) story.textContent = data.story;

  setMetaValue("類別", data.category);
  setMetaValue("材質", data.material);
  setMetaValue("重量", data.weight);
  setMetaValue("克重", data.weight);
  setMetaValue("尺寸", data.size);
  setMetaValue("工藝", data.craft);
  setMetaValue("備註", data.note);
};

const createEditButton = (id) => {
  const button = document.createElement("button");
  button.className = "edit-item-button";
  button.type = "button";
  button.textContent = "編輯";
  button.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    openEditDialog(id);
  });
  return button;
};

const enhanceCards = () => {
  document.querySelectorAll(".post-card a[href^='items/']").forEach((link) => {
    const id = itemIdFromHref(link.getAttribute("href") || "");
    if (!catalog[id]) return;

    const card = link.closest(".post-card");
    if (!card || card.querySelector(".edit-item-button")) return;

    card.classList.add("editable-item");
    applyCardData(card, id);
    card.append(createEditButton(id));
  });
};

const enhanceDetailPage = () => {
  const id = itemIdFromPath();
  if (!catalog[id]) return;

  applyDetailData(id);

  const content = document.querySelector(".item-content");
  if (!content || content.querySelector(".edit-item-button")) return;
  content.prepend(createEditButton(id));
};

const ensureEditDialog = () => {
  let dialog = document.querySelector("#editDialog");
  if (dialog) return dialog;

  dialog = document.createElement("div");
  dialog.id = "editDialog";
  dialog.className = "edit-dialog";
  dialog.hidden = true;
  dialog.innerHTML = `
    <div class="edit-dialog-backdrop" data-edit-close></div>
    <form class="edit-dialog-panel" id="editForm">
      <div class="edit-dialog-heading">
        <div>
          <p class="section-label">本機編輯</p>
          <h2>修改收藏資料</h2>
        </div>
        <button class="text-button" type="button" data-edit-close>關閉</button>
      </div>
      <input name="id" type="hidden">
      <div class="edit-fields">
        <label>
          <span>作品名稱</span>
          <input name="title" type="text" required>
        </label>
        <label>
          <span>材質</span>
          <input name="material" type="text">
        </label>
        <label>
          <span>重量 / 克重</span>
          <input name="weight" type="text">
        </label>
        <label>
          <span>尺寸</span>
          <input name="size" type="text">
        </label>
        <label>
          <span>工藝</span>
          <input name="craft" type="text">
        </label>
        <label>
          <span>備註</span>
          <input name="note" type="text">
        </label>
        <label class="wide-field">
          <span>首頁短介紹</span>
          <textarea name="summary" rows="3"></textarea>
        </label>
        <label class="wide-field">
          <span>收藏說明</span>
          <textarea name="story" rows="5"></textarea>
        </label>
        <label class="wide-field">
          <span>更換圖片</span>
          <input name="image" type="file" accept="image/*">
        </label>
      </div>
      <p class="edit-note">修改會保存在目前瀏覽器。若要讓公開網站永久更新，請把修改內容交給 Codex 發布。</p>
      <div class="edit-actions">
        <button class="text-button" type="button" id="resetEdit">還原這件</button>
        <button class="primary-button" type="submit">儲存修改</button>
      </div>
    </form>
  `;

  document.body.append(dialog);
  dialog.querySelectorAll("[data-edit-close]").forEach((control) => {
    control.addEventListener("click", () => {
      dialog.hidden = true;
    });
  });

  dialog.querySelector("#resetEdit").addEventListener("click", () => {
    const id = dialog.querySelector("[name='id']").value;
    const edits = readEdits();
    delete edits[id];
    saveEdits(edits);
    dialog.hidden = true;
    applyAllEdits();
  });

  dialog.querySelector("#editForm").addEventListener("submit", async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const id = String(formData.get("id"));
    const existing = readEdits()[id] || {};
    const next = {
      ...existing,
      title: String(formData.get("title") || "").trim(),
      material: String(formData.get("material") || "").trim(),
      weight: String(formData.get("weight") || "").trim(),
      size: String(formData.get("size") || "").trim(),
      craft: String(formData.get("craft") || "").trim(),
      note: String(formData.get("note") || "").trim(),
      summary: String(formData.get("summary") || "").trim(),
      story: String(formData.get("story") || "").trim(),
    };

    const image = formData.get("image");
    if (image instanceof File && image.size > 0) {
      next.imageOverride = await shrinkPhoto(image);
    }

    const edits = readEdits();
    edits[id] = next;
    saveEdits(edits);
    dialog.hidden = true;
    applyAllEdits();
  });

  return dialog;
};

const openEditDialog = (id) => {
  const dialog = ensureEditDialog();
  const form = dialog.querySelector("#editForm");
  const data = getItemData(id);

  form.elements.id.value = id;
  form.elements.title.value = data.title || "";
  form.elements.material.value = data.material || "";
  form.elements.weight.value = data.weight || "";
  form.elements.size.value = data.size || "";
  form.elements.craft.value = data.craft || "";
  form.elements.note.value = data.note || "";
  form.elements.summary.value = data.summary || "";
  form.elements.story.value = data.story || "";
  form.elements.image.value = "";
  dialog.hidden = false;
  form.elements.title.focus();
};

const applyAllEdits = () => {
  enhanceCards();
  enhanceDetailPage();
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
applyAllEdits();
