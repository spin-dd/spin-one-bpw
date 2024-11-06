# Gatsby でローカル開発を行う

- 開発手法に従って開発を行います。
- CSS は tailwind を利用します。

## ローカルビルド

- [.env ファイルの設定](./envfile.md)
  `packages\theme-demo\.env`ファイルにcontentful の情報などを記載します。

- `$ gatsby develop`の実行

※リポジトリルートにて
`cd packages/{実行したいプロジェクト}`
`npm run develop`

※ [Contentful に model 情報が登録](../Contentful/readme.md)を行っていない場合はビルド時にエラーとなります。

<http://localhost:8000/{contentfulのpagaPath}>で確認が行えます。

## 開発手法

- [Themes | Gatsby](https://www.gatsbyjs.com/docs/themes/)に従う
  - <https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/#gatsby-themes>
    - 基本的にはサイト横断で利用できる機能を共通パッケージ化して利用するイメージ
    - 機能更新時には個別サイトが依存している gatsby-theme パッケージのバージョンを更新するだけで良い
  - 主要な概念と機能
    - <https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/>
  - gatsby-theme が守るべきルール
    - <https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/theme-conventions/>
- その他
  - [Using Multiple Gatsby Themes | Gatsby](https://www.gatsbyjs.com/docs/themes/using-multiple-gatsby-themes/)
    - パスをわけることで複数の theme を採用できる。（使用するか未定）

## CSS

<https://github.com/spin-dd/spin-one/issues/7>

- [tailwind](https://tailwindcss.com/)を採用

## 標準コンポーネント

`src > component`に作成します。
[component の一覧](./Component/readme.md)

### todo:component の方式を決める
