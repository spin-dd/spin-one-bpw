# お問い合わせフォームの設定

<https://github.com/spin-dd/spin-one/issues/17>
<https://github.com/spin-dd/spin-one/issues/18>

メールアドレスを netlify に登録します。
指定がなければ標準 UI を利用します。カスタムが必要な場合は別途対応を行います。
開発ルールに基づいた html を利用します。

## UI について

基本のフォームでは以下の入力を行えるようにする

| label            | name           | inputtype |
| ---------------- | -------------- | --------- |
| 件名             | title          | text      |
| お客様名         | customer_name  | text      |
| メールアドレス   | customer_email | text      |
| 電話番号         | customer_phone | text      |
| お問い合わせ内容 | subject        | textarea  |

## 開発ルール

`data-netlify="true"`と`form`タグの属性に記載,下記のように実装

```html
<form name="contact" method="POST" action={完了ページ} data-netlify="true">
    <>{内容}</>
</form>
```
