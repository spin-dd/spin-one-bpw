# CONTENT MODEL

contentfulの`Content Type`の定義

## ContentModelの登録内容

 content typeに以下の情報を登録します。

|key|必須|備考|
|---|----|---|
|name|〇|ModelのIDを登録します（Pageなど）|
|description|-|Model備考を記載します|
|displayField|〇|keyを指定し、登録情報を表示名にできます。"name"を登録します。|
|fields|〇|フィールド情報を作成します。|
|sys|〇|environmentなどの情報を登録できます。|

## 管理画面での登録情報の確認

- content typeに情報を確認できます。
<https://app.contentful.com/spaces/{spaceId}/content_types/>

- フィールド情報の定義の確認
<https://app.contentful.com/spaces/{spaceId}/content_types/{ContentType}/fields>
