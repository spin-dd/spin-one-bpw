# SPIN-ONE

## 概要

このリポジトリでは、SPIN-ONE Gatsby テーマパッケージを提供します。

以下のパッケージが含まれます。

- `packages/gatsby-theme-spin-one`：SPIN-ONE テーマパッケージ本体
- `packages/theme-demo`：SPIN-ONE テーマパッケージ開発用のデモサイト
  - SPIN-ONE テーマパッケージの開発、動作確認を行う

## 開発方法

SPIN-ONE テーマパッケージの開発を行う手順をまとめます。
全体的な流れとして、開発環境を構築し、デモサイトのコンテンツを登録、これらを使ってテーマパッケージの開発を行えるようにします。

### 0. 開発環境構築

1. Contentfulのアカウントを作成し、Spaceを作成します。あわせて、Content Management API トークン、Content Delivery API トークンを発行します
2. `packages/theme-demo/.env` ファイルを作成し、以下の環境変数を設定します
   - `CONTENTFUL_SPACE_ID`：Contentful の Space ID
   - `CONTENTFUL_MANAGEMENT_TOKEN`：Contentful の Content Management API トークン
   - `CONTENTFUL_ACCESS_TOKEN`：Contentful の Content Delivery API トークン
3. リポジトリのルートディレクトリで `npm ci` を実行します

これでテーマパッケージ、デモサイトの開発環境が整いました。

### 1. デモサイトのコンテンツ登録

1. リポジトリのルートディレクトリにて `npm run build:theme` を実行し、テーマパッケージをビルドします
1. `packages/theme-demo` ディレクトリに移動します
1. `npm run init:contentful-setup` を実行し、Contentful に SPIN-ONE 標準の Content model を登録します
1. `npm run init:contentful-sync` を実行し、[デモサイトのデータソース（html、各種画像）](https://github.com/spin-dd/spin-one/tree/main/packages/theme-demo/demo-data)を Contentful に同期します
   - なお、 #55 で用意される具体的なサンプルが提供されていないため、簡単なリソースを対象に動作確認しています

これでデモサイトのコンテンツが Contentful に登録されました。

### 2. テーマパッケージの開発（動作確認）

テーマパッケージ、デモサイトそれぞれでビルドなどの処理を決められた順序で行う必要があり、それらをまとめたスクリプトを利用します。

```console
# リポジトリのルートディレクトリにて
npm run dev:demo
```

これでデモサイトの開発環境が起動し、テーマパッケージの動作確認ができるようになりました。
