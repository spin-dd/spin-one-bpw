# Contentful準備

## Contentfulの情報設定

- [contentful](https://www.contentful.com/)にアカウント登録
- SpaceIDの取得
- `Enviroment ID`を取得
- アクセストークン作成

## Jsonファイルの定義

※コマンドラインで登録する場合に下記のファイルが必要になります。

- ContentModelの定義
- Mediaの定義
- Content定義

## データ登録

下記の順番で行います。
※コマンドラインで行う場合はCLIインストールと`.env`ファイルが必要になります。

- CLIインストール `npm install -g contentful-cli`
- env.{develop|production} ファイルを作成
- Content Modelを登録 <https://github.com/spin-dd/spin-one/issues/5>
- Mediaを登録 <https://github.com/spin-dd/spin-one/issues/14>
- COntentの登録 <https://github.com/spin-dd/spin-one/issues/13>
