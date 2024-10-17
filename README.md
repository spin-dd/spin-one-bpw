# SPIN ONE

以下の組み合わせでホームページを作成

- [gatsby.js](https://www.gatsbyjs.com/)
- [Contentful](https://www.contentful.com/)
- [netlify](https://www.netlify.com/)

## Quick start

以下のコマンドでプロジェクトをクローンしてパッケージインストールを行えます。
`gatsby new testSpinOne git@github.com:spin-dd/spin-one.git`

## Gatsby

Gatsby theme で開発

- [Themes | Gatsby](https://www.gatsbyjs.com/docs/themes/)
  - <https://www.gatsbyjs.com/docs/themes/what-are-gatsby-themes/#gatsby-themes>
    - [gatsby-theme-fujimoto](https://github.com/spin-dd/fujimoto-site/tree/main/packages/gatsby-theme) のときと変わっていない（メジャーバージョンも v5 のまま）
    - 基本的にはサイト横断で利用できる機能を共通パッケージ化して利用するイメージ
    - 機能更新時には個別サイトが依存している gatsby-theme パッケージのバージョンを更新するだけで良い
  - 主要な概念と機能（gatsby-theme-fujimoto でも利用している）
    - <https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/shadowing/>
  - gatsby-theme が守るべきルール
    - <https://www.gatsbyjs.com/docs/how-to/plugins-and-themes/theme-conventions/>
- その他
  - [Using Multiple Gatsby Themes | Gatsby](https://www.gatsbyjs.com/docs/themes/using-multiple-gatsby-themes/)
    - パスをわけることで複数の theme を採用できる。こちらは gatsby-theme-fujimoto でも採用しておらず（ユースケースもなかったが）

## Contenful

- <https://www.contentful.com/>
ContentModel:Pageに登録したデータを表示
URLから検索して表示
ローカルでは<http://localhost:8000/{pagaPath}>でページ表示を指定

## netlify

- <https://www.netlify.com/>

TODO

- 各モデルの登録ルールは別ドキュメントに作成
- APIアクセスのコマンドなどを別ドキュメントに記載
