# お問い合わせフォームの設定

<https://github.com/spin-dd/spin-one/issues/17>
<https://github.com/spin-dd/spin-one/issues/18>

メールアドレスを netlify に登録します。

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

form`タグの属性指定

- name を属性を指定
- `data-netlify="true"`とする
- `method="POST"`とする
- action 属性に送信完了ページを作成

```html
<form name="contact" method="POST" action='./success' data-netlify="true">
    <>{内容}</>
</form>
```

## 送信完了ページ

- `action`属性にページの URL を指定する
- URL をフォーム画面の URL 末尾に'/success'をつける
- 文言表示「送信に成功しました。」
- 「TOP に戻る」ボタンを表示
