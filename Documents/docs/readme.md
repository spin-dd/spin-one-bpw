# SPIN-ONE開発ガイド

以下の組み合わせでホームページを作成

- [gatsby.js](https://www.gatsbyjs.com/)
- [Contentful](https://www.contentful.com/)
- [netlify](https://www.netlify.com/)

## ドキュメントについて

[mkdocs](https://mkdocs-origin.readthedocs.io/en/latest/)で作成しています。
pythonインストール後`pip install mkdocs`で利用できます。

## 開発準備

Gatsbyの環境作成をしてレポジトリのダウンロードとパッケージインストールを行い、開発ワークフローの準備をします。

### Gatsbyの環境作成

クイックスタートガイドに従う
<https://www.gatsbyjs.com/docs/quick-start/>

- Nodejsのインストール（2024/10時点では20.17.0）
- Gatsby Cliのダウンロード `npm install -g gatsby-cli`
- githubの登録
- vscodeをインストール

### レポジトリのダウンロードとパッケージインストール

ローカル開発・コマンドラインを実行できるようにします。

- `gatsby new {任意のディレクトリ名} git@github.com:spin-dd/spin-one.git`

## 開発ワークフロー

以下の順番に行います。

- SPINONEのプロジェクトを初期化
- [Gatsbyの準備](./Gatsby/readme.md)
- [Contenfulの準備](./Contentful/readme.md)
- [Netlifyの設定](./netlify/readme.md)
- [DNS設定](./DNS/readme.md)
- [Googleの設定](./Google/readme.md)
- リリース
- 上記の後に修正があれば

## プロジェクトの初期化

- PCセットアップ
- ローカル環境の作成

## Gatsbyの準備

## Contenfulの準備

Contentfulの準備を行います。
[Contentfulの設定](./Contentful/readme.md)

- Contentfulの情報設定
- Jsonファイルの定義
- データ登録

※Contentfulにデータを登録を行うことでローカルビルドが行えます。

## netlifyの設定

- netlifyに登録
- レポジトリ情報を登録する
- contentfulにwebhookを登録する

## DNS設定

- ドメインの取得
- SSLの設定
- netlifyにカスタムドメイン登録

## Google設定する

- タグマネージャー
- サーチコンソールの設定
