# Contentful 準備

Contentful のスペースと environment を指定して、以下の情報を登録できます。

- model
- media
- content

## Contentful セットアップ

- [contentful](https://www.contentful.com/)にアカウント登録します
- Contentful Web UI から Environment settings > Locales で `Japanese (ja)` をデフォルトに設定します

## ユーザー情報を設定

コマンド実行の準備として、[env ファイル](../Gatsby/envfile.md)で指定された環境変数を .env ファイルに設定します。

## Content model の設定

コマンドを実行して SPIN-ONE 標準の Content model を Contentful に登録します。

<https://github.com/spin-dd/spin-one/pull/44>

```shell
# .env ファイルに設定した情報から指定の Environment を作成
npx contentful-setup 
```

[contentful-setup.js](</packages/gatsby-theme-spin-one/dist/scripts/contentful-setup.js>)を実行し、ます。

## データを登録

登録するhtml・画像ファイルを指定のディレクトリ`/packages/{プロジェクト}/data/`に置きます。

[データ登録の仕様](./Import/readme.md)

- アセットをMediaに登録
<https://github.com/spin-dd/spin-one/pull/45>

```shell
npx contentful-media-sync
```

[contentful-media-sync.js](/packages/gatsby-theme-spin-one/dist/scripts/contentful-media-sync.js)を実行します。

実行後にContentfulに
Mediaに画像ファイル、Contentにhtmlファイルが登録されます。

[サンプルhtml](/packages/theme-demo/data/sample-asset/index.html)のように置くことで実行できます

## データを更新

既に登録済のデータ情報を更新します。
更新する html を指定のディレクトリ`/packages/{プロジェクト}/data/`に置きます。

## データの一括削除

コマンド実行で env ファイルに指定した Space の Environment のデータ情報を全て削除します。

- コマンド実行時に削除確認を行います。
  「{environment 名}に登録したデータを全て削除します。よろしいでしょうか。(y/n)」

- 「y」を入力してエンターを押したら削除を実行します。

- 「n」を入力してエンターを押したらコマンドを終了します。
