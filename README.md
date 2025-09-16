# Battle Trinity Cup Website

ドラゴンクエストXのコンテンツ「バトルトリニティ」を題材にした **非公式大型大会サイト** です。  
大会概要、エントリー情報、歴代優勝チーム、最新ニュースなどを掲載しています。  
個人制作ポートフォリオとして公開しており、Webフロントエンドの実装力を示す作品です。

---

## 公開URL
GitHub Pages にて公開しています。  
⇒ https://ot0yo58.github.io/battletrinity-cup/

---

## 主な機能
- **トップページをシングルページ風に切り替える簡易SPA**
  - JavaScriptとHistory APIを利用してナビゲーションを実装
- **ヒーローセクションのスライドショー**
  - jQueryを用いたフェード切り替え
- **大会ごとの個別ページ**
  - サマーカップ / ウィンターカップ（各大会の動画・詳細を掲載）
- **YouTube動画のレスポンシブ埋め込み**
  - アスペクト比ボックスを利用した可変レイアウト
- **JSON-LD構造化データ（Event Schema）対応**
  - Google検索結果にイベント情報を反映可能
- **SEO用ファイルの設置**
  - `robots.txt`, `sitemap.xml` を用意
- **レスポンシブデザイン**
  - PC / スマートフォン両対応

---

## 使用技術
- HTML5 / CSS3
- JavaScript (jQuery)
- GitHub Pages (ホスティング)

---

## ディレクトリ構成
├── index.html # トップページ（SPA）

├── summer1.html # 第一回サマーカップ

├── summer2.html # 第二回サマーカップ

├── winter1.html # 第一回ウィンターカップ

├── winter2.html # 第二回ウィンターカップ

├── robots.txt # クロール制御

├── sitemap.xml # サイトマップ

├── css/

│ └── styles.css # サイト共通スタイル

├── js/

│ └── script.js # SPA処理・スライドショー

└── images/ # 大会バナー・優勝者写真など

├── info.png

├── summer1.jpg

├── summer2.jpg

├── summer3.jpg

├── winter1.jpg

├── winter2.jpg

├── winner1.jpg

├── winner2.jpg

└── winner3.jpg


---

## 今後の改善予定
- 大会が開催され次第追加ページを順次作成
- お問い合わせ / エントリーフォームの再実装
  ⇒荒らされたことにより、エントリーフォーム中止となったため、セキュリティ対策を含めた再実装
- アクセシビリティ改善（prefers-reduced-motion対応）
- CI/CD 自動デプロイ導入

---

## 作者
- 制作者: **三浦 豊晴 (Toyoharu Miura)**
- GitHub: [miura-portfolio](https://github.com/miura-portfolio)

