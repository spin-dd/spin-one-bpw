# Gatsbyでローカル開発を行う

## 開発セットアップ

クイックスタートガイドに従う
<https://www.gatsbyjs.com/docs/quick-start/>

- Nodejsのインストール（2024/10時点では20.17.0）
- Gatsby Cliのダウンロード `npm install -g gatsby-cli`
- githubの登録
- vscodeをインストール

## ローカルビルド

- レポジトリのクローンとパッケージインストール

`gatsby new testSpinOne git@github.com:spin-dd/spin-one.git`

- envファイルの設定
contentfulの情報などを記載します。

- `$ gatsby develop`の実行

※ [Contentfulにmodel情報が登録](../Contentful/readme.md)を行っていない場合はビルド時にエラーとなります。

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
