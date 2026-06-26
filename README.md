# 簡禾田收藏小天地

一個用來整理收藏照片、資料與心得的靜態網站。

## 使用方式

1. 直接用瀏覽器打開 `index.html`。
2. 到「上傳照片」區選擇收藏照片，填寫名稱、類別、材質、入手日期與備註。
3. 按「加入收藏」後，照片會出現在「我的收藏」區。
4. 若要永久發布到網站，請把照片放到 `assets/items/`，並依照 `DEPLOY.md` 的方式新增正式作品頁。

## 注意事項

- 目前上傳資料會保存在同一台電腦、同一個瀏覽器的本機暫存中。
- 若要做成永久網站資料，請把照片放入 `assets/items/`，再複製 `items/example-hetian-jade.html` 建立正式收藏頁。
- `script.js` 會自動把照片縮到較適合網頁保存的大小，避免瀏覽器暫存太快滿。

## 檔案說明

- `index.html`：首頁、上傳表單與收藏圖錄。
- `script.js`：照片預覽、本機保存與收藏卡片渲染。
- `styles.css`：網站版面與表單樣式。
- `items/example-hetian-jade.html`：單件收藏頁範例。
- `items/template-collection-item.html`：新增正式收藏頁時可複製的模板。
- `items/no-025-yaochan-wanguan.html`：No.025「腰纏萬貫」正式作品頁。
- `assets/items/`：建議放正式收藏照片的位置。
- `DEPLOY.md`：網站部署與後續新增收藏流程。
