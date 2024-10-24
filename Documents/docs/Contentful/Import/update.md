# データの更新

コマンドを実行して以下を行います。

- html で使用するアセットを登録
- html を page 登録
  更新対象のディレクトリから html ファイル存在する

## アセット更新

- 未登録のアセットは [「HTML ファイルを contentful に登録」](./readme.md) >「アセット登録」 と同様の処理を行う
- 既に登録済のアセットを差し替える場合は html ファイルに`src={contentfulのurl}`を指定し、contentful 上で差し替えを行う

## データの照合

- html ファイルのディレクトリから`pagePath`を設定します。
- 設定した`pagePath`が contenful に登録済の場合は上書き保存します。
- 未登録の場合は新規登録します。[「HTML ファイルを contentful に登録」](./readme.md) >「html を page として登録」 と同様の処理を行う
