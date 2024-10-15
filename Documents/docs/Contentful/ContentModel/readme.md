# CONTENT MODEL

contentfulの`Content Type`の定義
<https://github.com/spin-dd/spin-one/issues/5>
<https://github.com/spin-dd/spin-one/issues/23>

## envファイルの設定

登録するために下記の情報をenvファイルから取得します。

|変数名|入力内容|
|-----|--------|
|CONTENTFUL_SPACE_ID|スペースIDを入力|
|CONTENTFUL_ACCESS_TOKEN|CMAアクセストークンを入力|
|CONTENTFUL_MANAGEMENT_TOKEN|Content Delivery API - access token|
|ENVIROMENT_ID|Environment IDを入力(未入力ならmasterとする)|

## ContentModelの登録内容

 content typeに以下の情報を登録します。

- sys

space/environmenの情報を登録します。

|key|必須|備考|
|---|----|---|
|space|〇|envファイルからCONTENTFUL_SPACE_IDを取得します。|
|environment|〇|envファイルからENVIROMENT_IDを取得します。|

- contentTypes

|key|必須|備考|
|---|----|---|
|name|〇|ModelのIDを登録します（Pageなど）|
|description|-|Model備考を記載します|
|displayField|〇|keyを指定し、登録情報を表示名にできます。"name"を登録します。|
|fields|〇|フィールド情報を作成します。|

※ fieldsの入力内容は[sample.json](./sample.json)を参照

## 管理画面での登録情報の確認

- content typeに情報を確認できます。
<https://app.contentful.com/spaces/{spaceId}/content_types/>

- フィールド情報の定義の確認
<https://app.contentful.com/spaces/{spaceId}/content_types/{ContentType}/fields>
