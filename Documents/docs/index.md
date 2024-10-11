# SPIN-ONE開発ガイド

以下の組み合わせでホームページを作成

- [gatsby.js](https://www.gatsbyjs.com/)
- [Contentful](https://www.contentful.com/)
- [netlify](https://www.netlify.com/)

## ドキュメントについて

[mkdocs](https://mkdocs-origin.readthedocs.io/en/latest/)で作成しています。
pythonインストール後`pip install mkdocs`で利用できます。

## Quick start

以下のコマンドでプロジェクトをクローンしてパッケージインストールを行えます。
`gatsby new testSpinOne git@github.com:spin-dd/spin-one.git`

## 開発ワークフロー

以下の順番に行います。

- [Contenfulの準備](./Contentful/index.md)
- [Gatsbyの準備](./Gatsby/index.md)
- [DNS設定](./DNS/index.md)
- [Netlifyの設定](./netlify/index.md)
- [Googleの設定](./Google/index.md)

## Contenfulの準備

Contentfulの準備を行います。
[Contentfulの設定](./Contentful/index.md)

- Contentfulの情報設定
- Jsonファイルの定義
- データ登録

## 開発セットアップ

- PCセットアップ
- ローカル環境の作成

## DNSサーバー設定

- ドメインの取得
- SSLの設定

## netlifyの設定

- netlifyに登録
- サイト情報を登録する
- contentfulにwebhookを登録する

## Google関連を設定する

- タグマネージャー
- サーチコンソールの設定
