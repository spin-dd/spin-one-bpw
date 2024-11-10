# SPIN-ONE 開発ガイド

以下の組み合わせでホームページを作成

- [gatsby.js](https://www.gatsbyjs.com/)
- [Contentful](https://www.contentful.com/)
- [netlify](https://www.netlify.com/)

## 開発準備

Gatsby の環境作成をしてレポジトリのダウンロードとパッケージインストールを行い、開発ワークフローの準備をします。

### Gatsby の環境作成

クイックスタートガイドに従う
<https://www.gatsbyjs.com/docs/quick-start/>

- Nodejs のインストール（2024/10 時点では 20.17.0）
- Gatsby Cli のダウンロード `npm install -g gatsby-cli`
- github の登録
- vscode をインストール

### レポジトリのダウンロードとパッケージインストール

ローカル開発・コマンドラインを実行できるようにします。

- `gatsby new {任意のディレクトリ名} git@github.com:spin-dd/spin-one.git`

## 開発ワークフロー

以下の順番に行います。

- [SPIN-ONE のプロジェクトを初期化](./github/readme.md)
- [Contenful の準備](./Contentful/readme.md)
- [Gatsby でローカル開発を行う](./Gatsby/readme.md)
- [Netlify の設定](./netlify/readme.md)
- [DNS 設定](./DNS/readme.md)
- [Google の設定](./Google/readme.md)
- [リリース](./release/readme.md)

上記の後に修正があれば contentful データなどを変更します。
