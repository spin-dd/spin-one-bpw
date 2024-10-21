# Contentful 準備

Contentful のスペースと enviroment を指定して、以下の情報を登録できます。

- model
- media
- content

## Contentful の情報設定

- [contentful](https://www.contentful.com/)にアカウント登録
- SpaceID の取得
- `Enviroment ID`を取得
- アクセストークン作成

## ユーザー情報を設定

コマンド実行時に contentful にアクセスするため
[env ファイル](../Gatsby/envfile.md)に記載した contentful の情報を設定する

## Model 情報を定義された Json ファイルを 情報を登録

SPIN-ONE では標準の [model ファイル](../../../data/contentful/contentmodel.json)を事前に用意しています。

コマンド実行時に env ファイルに設定した情報を`SpaceID`と`Enviroment ID`model ファイルを書き換え、contentmodel 情報の登録を行います。

- [ContentModel の定義](./ContentModel/readme.md)

- Content Model を登録 <https://github.com/spin-dd/spin-one/issues/5>

contentmodel をカスタムする場合は model ファイルの修正を行ってください

## データを登録

登録する html を指定のディレクトリ`spin-one/html`に置きます。
[データ登録の仕様](./Import/readme.md)

- Media を登録 <https://github.com/spin-dd/spin-one/issues/14>
- Content の登録 <https://github.com/spin-dd/spin-one/issues/13>
