# Contentful準備

## Contentfulの情報設定

- [contentful](https://www.contentful.com/)にアカウント登録
- SpaceIDの取得
- `Enviroment ID`を取得
- アクセストークン作成

## Jsonファイルの定義

※コマンドラインで登録する場合に下記のファイルが必要になります。

- [ContentModelの定義](./ContentModel/readme.md)

## JSONファイルの反映

下記の順番で行います。
※コマンドラインで行う場合はCLIインストールと`.env`ファイルが必要になります。

- CLIインストール `npm install -g contentful-cli`
- env.{develop|production} ファイルを作成
- Content Modelを登録 <https://github.com/spin-dd/spin-one/issues/5>

## 送信するデータを作成

送信する情報を指定のディレクトリに置く

## TODOディレクトリに置き方決める

- Media情報を作成
- Content情報を作成

## データの登録

用意したデータをContentfulに登録します。

- Mediaを登録 <https://github.com/spin-dd/spin-one/issues/14>
- COntentの登録 <https://github.com/spin-dd/spin-one/issues/13>
