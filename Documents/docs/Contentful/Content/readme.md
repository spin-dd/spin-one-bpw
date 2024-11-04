# CONTENT

コマンドで content フォルダの html ファイルを contentful のスペースの`Content`に登録を行います。
前提として ContentModel と Media 情報をスペースに登録しておく必要があります。

<https://github.com/spin-dd/spin-one/issues/13>
<https://github.com/spin-dd/spin-one/issues/30>

## ENV ファイルの設定

登録するために下記の情報を env ファイルから取得します。

| 変数名                      | 入力内容                                        |
| --------------------------- | ----------------------------------------------- |
| CONTENTFUL_SPACE_ID         | スペース ID を入力                              |
| CONTENTFUL_MANAGEMENT_TOKEN | Content Management API - access token           |
| CONTENTFUL_DELIVERY_TOKEN   | Content Delivery API - access token             |
| ENVIROMENT_ID               | Environment ID を入力(未入力なら master とする) |

`CONTENTFUL_SPACE_ID`に該当するスペースの
`ENVIROMENT_ID`に該当するスペースに content を新規登録します。

## Content Model の登録

[contentmodel](../ContentModel/readme.md)をプログラムで登録します。

## CONTENT ファイルの登録

HP のデータを.html ファイル、アセットファイルをまとめて登録します。
[HTML ファイルを contentful に登録の流れ](../Import/readme.md)
