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
  "no-003-ba-fang-lai-cai": {
    title: "八方來財",
    number: "No.003",
    image: "assets/items/003-0.jpg",
    detailImage: "../assets/items/003-0.jpg",
    summary: "獨籽雕刻掛墜，黃皮巧雕螃蟹趴在如水般的玉石如意、靈芝上，寓意八方來財。",
    category: "和田玉",
    material: "獨籽，黃皮巧雕",
    weight: "41.8 g（含繩）",
    size: "48*25*24 mm",
    craft: "獨籽雕刻、巧雕",
    note: "底部保留僵石，黃皮光滑，玉質油潤",
    story:
      "獨籽雕刻「八方來財」掛墜。正面以黃皮巧雕螃蟹，趴在如水般的玉石如意與靈芝上，底部保留僵石更顯特別；黃皮光滑，玉質油潤。螃蟹自古有「橫財大將軍」之稱，象徵縱橫四海、八方來財。尺寸 48*25*24 mm，重 41.8 克（含繩）。",
  },
  "no-007-shan-shui": {
    title: "山水",
    number: "No.007",
    image: "assets/items/007-0.jpg",
    detailImage: "../assets/items/007-0.jpg",
    summary: "新疆和田玉青花籽料，玉質細膩油潤，獨籽雕刻，開門毛孔皮色，器型飽滿的大把件。",
    category: "和田玉",
    material: "新疆和田玉青花籽料",
    weight: "98.8 g",
    size: "71*51*15 mm",
    craft: "獨籽雕刻",
    note: "開門毛孔皮色，皮色漂亮，器型飽滿",
    story:
      "新疆和田玉青花籽料「山水」。玉質細膩油潤，獨籽雕刻，開門毛孔皮色，皮色漂亮；器型飽滿，屬大把件。尺寸 71*51*15 mm，重 98.8 克。",
  },
  "no-012-yu-tu-song-fu": {
    title: "玉兔送福",
    number: "No.012",
    image: "assets/items/012-0.jpg",
    detailImage: "../assets/items/012-0.jpg",
    summary: "獨籽滿肉，打燈通透肉質細膩，正面巧雕玉兔、金錢、靈芝，上方刻有如意。",
    category: "和田玉",
    material: "獨籽滿肉",
    weight: "65.7 g（含繩）",
    size: "51*28*29 mm",
    craft: "獨籽雕刻、巧雕",
    note: "背後為黃油皮有道皮裂，觸手油潤，適合小手把收藏把玩",
    story:
      "獨籽滿肉「玉兔送福」。打燈通透，肉質細膩；正面巧雕玉兔、金錢、靈芝，上方刻有如意。背後為黃油皮，有道皮裂，觸手油潤；大塊頭、大克重，適合當小手把收藏把玩。尺寸 51*28*29 mm，重 65.7 克（含繩）。",
  },
  "no-014-bai-rou-di-huang-qin-long": {
    title: "白肉底黄沁獨籽雕刻龍",
    number: "No.014",
    image: "assets/items/014-0.jpg",
    detailImage: "../assets/items/014-0.jpg",
    summary: "白肉底黃沁獨籽雕刻，脂粉佳油性十足，毛孔清晰皮孔開門，純手工雕刻龍。",
    category: "和田玉",
    material: "白肉底黃沁獨籽",
    weight: "27 g",
    size: "49*31*14 mm",
    craft: "純手工雕刻龍",
    note: "黃沁保真，毛孔清晰皮孔開門，玉意事業興榮",
    story:
      "白肉底黃沁獨籽雕刻龍。脂粉佳，油性十足；黃沁保真，毛孔清晰、皮孔開門。作品以純手工雕刻龍，工藝不俗，玉意事業興榮，相當漂亮。尺寸 49*31*14 mm，重 27 克。",
  },
  "no-015-fang-gu-long": {
    title: "仿古龍",
    number: "No.015",
    image: "assets/items/015-0.jpg",
    detailImage: "../assets/items/015-0.jpg",
    summary: "紅沁、青玉底，料子老氣脂粉佳、油性十足，手工仿古雕刻龍與銅錢。",
    category: "和田玉",
    material: "紅沁、青玉底獨籽",
    weight: "30 g",
    size: "50*31*11 mm",
    craft: "手工仿古雕刻龍、銅錢",
    note: "獨籽雕刻開門毛孔，升龍張口旋身，配飾、掛件都可",
    story:
      "紅沁、青玉底「仿古龍」。料子老氣，脂粉佳、油性十足；獨籽雕刻開門毛孔。作品以手工仿古雕刻龍與銅錢，升龍張口旋身，玉意事業興榮，配飾、掛件都可。尺寸 50*31*11 mm，重 30 克。",
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
  "no-026-qing-yu-huan": {
    title: "青玉獾",
    number: "No.026",
    image: "assets/items/026-0.jpg",
    detailImage: "../assets/items/026-0.jpg",
    summary: "新疆和闐籽料早期作品，型制古樸十分有味，皮殼包漿漂亮，獾音同歡取其吉意。",
    category: "和田玉",
    material: "新疆和闐籽料",
    weight: "約 28.6 g（含繩）",
    size: "42.3*22*22 mm",
    craft: "早期作品、提油",
    note: "型制古樸，皮殼包漿漂亮，整體品項完整",
    story:
      "新疆和闐籽料「青玉獾」。早期作品，型制古樸十分有味，皮殼包漿漂亮，整體品項完整。獾音同歡，取其吉意。「提油」用意於摹古及顯色，使用純天然原料；一般經過提油的玉器，都會較光澤油潤。尺寸 42.3*22*22 mm，含繩約 28.6 克。",
  },
  "no-027-qing-bai-yu-yu-pei-shi": {
    title: "青白玉魚佩飾",
    number: "No.027",
    image: "assets/items/027-0.jpg",
    detailImage: "../assets/items/027-0.jpg",
    summary: "早期青白玉魚佩飾，玉魚雕得靈動悠遊，皮殼及包漿老味十足，油潤可愛。",
    category: "和田玉",
    material: "青白玉",
    weight: "未記錄",
    size: "96*25*7.5 mm",
    craft: "魚形佩飾雕件",
    note: "參考年代：早期；雕工佳，品相完整",
    story:
      "青白玉魚佩飾。此玉魚雕得非常靈動悠遊，皮殼及包漿老味十足，超 Q 油潤，雕工讚，品相完整。參考年代為早期，尺寸長 96 mm、寬 25 mm、厚 7.5 mm。",
  },
  "no-031-bai-yu-song-shu-pu-tao": {
    title: "白玉松鼠葡萄",
    number: "No.031",
    image: "assets/items/031-0.jpg",
    detailImage: "../assets/items/031-0.jpg",
    summary: "脂白和田松鼠葡萄鏤空雕件，玉必有工，工必有意，意必吉祥。",
    category: "和田玉",
    material: "脂白和田玉",
    weight: "未記錄",
    size: "未記錄",
    craft: "鏤空雕件",
    note: "松鼠葡萄寓意財壽雙收、多子多孫、聚財長壽",
    story:
      "脂白和田「松鼠葡萄」鏤空雕件。玉必有工，工必有意，意必吉祥。松，意指蒼松，有長壽之意；鼠，有數來寶的寓意；松鼠則寓意財壽雙收、身體健康、財源滾滾。葡萄多籽，寓意多子；鼠的繁衍能力也強，因此和田松鼠葡萄也寓意多子多孫、子孫滿堂。以現代說法看，松鼠葡萄雕件也有聚財與長壽之意，顆顆葡萄代表錢滾錢、錢母生錢子。",
  },
  "no-041-hui-shou-pi-xiu": {
    title: "回首貔貅",
    number: "No.041",
    image: "assets/items/041-0.jpg",
    detailImage: "../assets/items/041-0.jpg",
    summary: "白玉回首貔貅，皮色優、型好霸氣，手抱如意，寓意招財又如意。",
    category: "和田玉",
    material: "白玉",
    weight: "91.2 g",
    size: "57*36*32 mm",
    craft: "貔貅雕件",
    note: "白到沒朋友，細皮嫩肉，皮色優，型好霸氣",
    story:
      "白玉「回首貔貅」收藏件。白到沒朋友，細皮嫩肉，皮色優，型好霸氣，是個人特別珍藏品之一。回首貔貅手抱如意，寓意招財又如意；此件實物很優，拍攝不易，尺寸 57*36*32 mm，重 91.2 克。",
  },
  "no-042-guan-yin": {
    title: "觀音",
    number: "No.042",
    image: "assets/items/042-0.jpg",
    detailImage: "../assets/items/042-0.jpg",
    summary: "新疆和田獨籽料巧雕觀音，利用側臉後方雞骨白與沁色雕出頭髮、髮飾。",
    category: "和田玉",
    material: "新疆和田獨籽料",
    weight: "41.7 g",
    size: "57.2*29.8*21.7 mm",
    craft: "巧雕觀音",
    note: "側臉後方雕頭髮、髮飾，髮尾以蓮花收尾",
    story:
      "新疆和田獨籽料雕件「觀音」。此件算是巧雕，利用觀音側臉後方的雞骨白與沁色，雕出頭髮與髮飾，髮尾用蓮花收尾，讓觀音法相更顯慈祥。尺寸 57.2*29.8*21.7 mm，重 41.7 克。",
  },
  "no-043-dai-zi-shang-chao": {
    title: "帶子上朝",
    number: "No.043",
    image: "assets/items/043-0.jpg",
    detailImage: "../assets/items/043-0.jpg",
    summary: "新疆和闐籽料雙貔貅，鴻運當頭、帶子上朝，高青白，白度佳料子好。",
    category: "和田玉",
    material: "新疆和闐籽料，黑紅皮三色料",
    weight: "38.7 g",
    size: "48*32*20 mm",
    craft: "獨籽蘇州工藝",
    note: "高青白上看二級，白度佳，肉眼略見結構，配戴合適",
    story:
      "新疆和闐籽料雙貔貅「帶子上朝」。作品寓意鴻運當頭、帶子上朝；自然光拍攝，高青白上看二級，白度佳、料子好，肉眼略見結構。開門黑紅皮三色料，獨籽蘇州工藝，配戴合適。尺寸 48*32*20 mm，重 38.7 克。",
  },
  "no-046-nian-nian-you-yu": {
    title: "年年有餘",
    number: "No.046",
    image: "assets/items/046-0.png",
    detailImage: "../assets/items/046-0.png",
    summary: "新疆和田玉籽料，青白玉棗紅皮，老熟玉質細膩油潤，純手工巧雕魚與蓮蓬。",
    category: "和田玉",
    material: "新疆和田玉籽料，青白玉棗紅皮",
    weight: "42 g",
    size: "未記錄",
    craft: "獨籽雕刻、純手工巧雕",
    note: "開門皮孔色根清晰，皮色保真",
    story:
      "新疆和田玉籽料「年年有餘」。青白玉棗紅皮，老熟玉質細膩油潤，獨籽雕刻，開門皮孔色根清晰，皮色保真。作品以純手工巧雕魚與蓮蓬，題意年年有餘。重 42 克。",
  },
  "no-047-xi-shang-mei-shao": {
    title: "喜上眉梢",
    number: "No.047",
    image: "assets/items/047-0.jpg",
    detailImage: "../assets/items/047-0.jpg",
    summary: "新疆和田玉籽料青白玉，獨籽滿工立體鏤空雕，開門黑紅皮色。",
    category: "和田玉",
    material: "新疆和田玉籽料，青白玉",
    weight: "33 g",
    size: "42*36*21 mm",
    craft: "獨籽滿工立體鏤空雕",
    note: "開門黑紅皮色，老熟料玉質溫潤油性十足",
    story:
      "新疆和田玉籽料「喜上眉梢」。青白玉，獨籽滿工立體鏤空雕，開門黑紅皮色。老熟料玉質溫潤，油性十足，題意喜上眉梢、春風滿面。尺寸 42*36*21 mm，重 33 克。",
  },
  "no-048-tu-jue-cuo": {
    title: "土埆厝",
    number: "No.048",
    image: "assets/items/048-0.jpg",
    detailImage: "../assets/items/048-0.jpg",
    summary: "土埆厝家族聚會與修繕紀錄，收錄屋外合照、室內餐敘、山景、泥磚牆修補與農具陳列。",
    category: "生活記錄",
    material: "土埆厝、紅磚、老農具、家族照片",
    weight: "10 張照片",
    size: "生活記錄",
    craft: "老屋修繕與生活保存",
    note: "補充土埆厝照片",
    story:
      "土埆厝照片記錄家族相聚、老屋外觀、室內餐敘、周邊山景，以及泥磚牆修補與傳統農具陳列。這組照片把老屋的生活溫度、修繕過程與家人團聚的片刻一併保存下來。",
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
      <button class="delete-upload-button" type="button" aria-label="刪除 ${escapeHtml(item.title)} 暫存">刪除</button>
    `;
    article.querySelector(".delete-upload-button")?.addEventListener("click", () => {
      saveUploads(readUploads().filter((upload) => upload.id !== item.id));
      renderUploads();
    });
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
