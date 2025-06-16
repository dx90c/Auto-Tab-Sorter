# 自動排序分頁 Auto Tab Sorter (v2.5)

本軟體是由ChatGpt製作

一個極簡的 Chrome 擴充功能，點擊圖示即可自動將所有分頁依照主網域分組排序。

## 🧩 功能介紹

- 自動偵測所有開啟的分頁
- 將所有分頁合併至主視窗
- 依「主網域分組 → 分頁數量排序（多者靠右） → URL 字典順」排列分頁
- 支援 `http(s)`、`chrome://newtab` 頁面
- 不含 GUI，不含最大化選項，點一下就完成排序！

## 🗂️ 主網域辨識邏輯

- 一般情況下取倒數兩段，例如：`example.com`、`abc.co.jp`
- 特例處理 `.gov.tw`，取倒數三段，例如：`moenv.gov.tw`

## 🔧 安裝方式（開發者模式）

1. 開啟 Chrome 瀏覽器，前往 `chrome://extensions/`
2. 開啟右上角「開發者模式」
3. 點擊「載入未封裝項目」，選取本專案資料夾
4. 點擊擴充圖示，即可立即排序所有分頁！

## 📁 檔案結構

auto-tab-sorter/
├── background.js
├── manifest.json
├── icons/
│ ├── icon16.png
│ ├── icon32.png
│ ├── icon48.png
│ └── icon128.png

