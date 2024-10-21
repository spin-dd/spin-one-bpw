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

## Json ファイルの Model 情報を定義

利用する model 情報を定義します。
※コマンドラインで登録する場合に下記のファイルが必要になります。

- [ContentModel の定義](./ContentModel/readme.md)

## JSON ファイルの Model 情報を反映

下記の順番で行います。

- env.{develop|production} ファイルを作成
- Content Model を登録 <https://github.com/spin-dd/spin-one/issues/5>

## 送信するデータを作成

送信する情報を指定のディレクトリに置く
[データ送信の仕様](./Import/readme.md)

### ディレクトリに置き方

- [Media 情報を作成](../Media/readme.md)
- [Content 情報を作成](../Content/readme.md)

### データの登録

用意したデータを Contentful に登録します。

- Media を登録 <https://github.com/spin-dd/spin-one/issues/14>
- COntent の登録 <https://github.com/spin-dd/spin-one/issues/13>
