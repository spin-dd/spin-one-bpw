# CONTENT MODEL

<https://github.com/spin-dd/spin-one/issues/5>
<https://github.com/spin-dd/spin-one/issues/23>

[登録するモデル](./JsonFiles.md)
[JSON ファイル](../../../../packages/gatsby-theme-spin-one/data/contentful/content-model.json)に記載した model の情報を指定した contentful の space に登録します。

## env ファイルの設定

登録するために下記の情報を [.envファイル](../../Gatsby/envfile.md)から取得します。

## ContentModel の登録内容

content type に以下の情報を登録します。

- sys

space/environment の情報を登録します。

| key         | 必須 | 備考                                                      |
| ----------- | ---- | --------------------------------------------------------- |
| space       | 〇   | env ファイルから CONTENTFUL_SPACE_ID を取得します。       |
| environment | 〇   | env ファイルから CONTENTFUL_ENVIRONMENT_ID を取得します。 |

- contentTypes

| key          | 必須 | 備考                                                           |
| ------------ | ---- | -------------------------------------------------------------- |
| name         | 〇   | Model の ID を登録します（Page など）                          |
| description  | -    | Model 備考を記載します                                         |
| displayField | 〇   | key を指定し、登録情報を表示名にできます。"name"を登録します。 |
| fields       | 〇   | フィールド情報を作成します。                                   |

## 管理画面での登録情報の確認

- content type に情報を確認できます。
  <https://app.contentful.com/spaces/{spaceId}/content_types/>

- フィールド情報の定義の確認
  <https://app.contentful.com/spaces/{spaceId}/content_types/{ContentType}/fields>
