# リリース手順

- github のブランチ`release`をリリースレポジトリとします。
- contentful の Enviroment`release`に本番用の content を使用します。

## github ブランチのリリース

※ 原則として netlify 上で`relese`,`main`のブランチ以外のビルドを行わないよう設定します。

`main`ブランチに開発に更新ブランチをマージします。
マージ後、netlify 上でビルドが行われます。
ビルド完了後 netlify 上で`main`ブランチの最新ビルドの URL を確認して動作確認を行います。
動作確認が問題なければ`release`に対して`main`ブランチの PR を作成してマージします。
`release`ブランチのビルド完了後、本番 URL でリリース内容が反映されることを確認します。

## Contentful のリリース

※ 原則として contentful 上で`relese`,`main`の Enviroment 以外のビルド通知を行わないよう設定します。

`main`に content を登録・更新を行い、ビルドを行います。
テスト環境で content 更新内容を確認します。
`release`環境に content の内容を登録・更新し、ビルドを行います。
ビルド完了後、本番 URL でリリース内容が反映されることを確認します。

### TODO: webhookビルドのタイミングを設計
