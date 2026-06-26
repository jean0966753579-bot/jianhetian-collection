# 網站部署與新增收藏流程

這個網站是純靜態網站，可以部署到 GitHub Pages、Netlify、Cloudflare Pages 或任何支援靜態檔案的主機。

## 建議部署方式：GitHub Pages

1. 建立一個 GitHub repository。
2. 把整個資料夾內容推上 repository。
3. 到 GitHub repository 的 `Settings` -> `Pages`。
4. Source 選 `Deploy from a branch`。
5. Branch 選 `main`，資料夾選 `/root`。
6. 儲存後等待 GitHub 產生網站網址。

## 每次新增收藏

1. 把照片放到 `assets/items/`。
2. 照片命名建議使用編號，例如 `026-0.jpg`。
3. 複製 `items/template-collection-item.html`。
4. 另存成新的作品頁，例如 `items/no-026-name.html`。
5. 依照 No.025 的格式填入：
   - 編號
   - 作品名稱
   - 材質
   - 克重
   - 尺寸
   - 工藝
   - 備註
   - 收藏說明
6. 在 `index.html` 的「我的收藏」區新增一張卡片，連到新的作品頁。
7. 推上網站後，公開網站就會更新。

## 目前已建立的正式作品格式

範例作品頁：

- `items/no-025-yaochan-wanguan.html`

首頁卡片使用同一組基本欄位：編號、名稱、短介紹、克重、尺寸、照片。
