# netlify 設定

## netlify アカウント

- [netlify](https://www.netlify.com/)アカウント登録
- アクセストークン取得

## サイト情報を登録する

- github/レポジトリの連携
- netlify の環境変数の設定
- お問い合わせ情報の登録(メールアドレスなど)

### github/レポジトリの連携

レポジトリを netlify に登録します。
github と netlify の連携が自動的に行われます。
デフォルトではすべてのブランチ更新時にビルドが行われるので、ビルドするブランチを制限します。

- `main`ブランチ
- ``

## contentful に webhook を登録する

※ Contentful で操作を行います。

- contentful に nelify の webhook を登録
- contentful で更新時にデプロイするモデルを指定する

## カスタムドメイン設定

- [DNS の設定](../DNS/readme.md)設定を行います。
- netlify 画面からカスタムドメインの設定を行います。

## Google 関連を設定する

Google 関連の設定を行います。
[タグマネージャー・サーチコンソールの設定(HTML の head か netlify に設定するか検討)](../Google/readme.md)
