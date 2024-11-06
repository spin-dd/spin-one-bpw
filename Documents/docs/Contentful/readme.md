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

以下のコマンドを実行して SPIN-ONE 標準の Content model を Contentful に登録します。
<https://github.com/spin-dd/spin-one/pull/44>

```shell
# .env ファイルに設定した情報から指定の Environment を作成
npm run contentful-setup
```

## データを登録

登録する html を指定のディレクトリ`packages/{package}/data/html`に置きます。
[データ登録の仕様](./Import/readme.md)

アセットをMediaに登録
<https://github.com/spin-dd/spin-one/pull/45>

```shell
npm run contentful-media-sync {ディレクトリのパス}
```

- Media を登録 <https://github.com/spin-dd/spin-one/issues/14>
- Content の登録 <https://github.com/spin-dd/spin-one/issues/13>

## データを更新

既に登録済のデータ情報を更新します。
更新する html を指定のディレクトリ`spin-one/html`に置きます。
[データ登録の仕様](./Import/readme.md)

## データの一括削除

コマンド実行で env ファイルに指定した Space の Environment のデータ情報を全て削除します。

- コマンド実行時に削除確認を行います。
  「{environment 名}に登録したデータを全て削除します。よろしいでしょうか。(y/n)」

- 「y」を入力してエンターを押したら削除を実行します。

- 「n」を入力してエンターを押したらコマンドを終了します。
