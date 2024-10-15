# CONTENT

コマンドでcontentfulの`Content`の登録を行います。
前提としてContentModelとMedia情報をスペースに登録しておく必要があります。

## ENVファイルの設定

登録するために下記の情報をenvファイルから取得します。

|変数名|入力内容|
|-----|--------|
|CONTENTFUL_SPACE_ID|スペースIDを入力|
|CONTENTFUL_ACCESS_TOKEN|CMAアクセストークンを入力|
|CONTENTFUL_MANAGEMENT_TOKEN|Content Delivery API - access token|
|ENVIROMENT_ID|Environment IDを入力(未入力ならmasterとする)|

`CONTENTFUL_SPACE_ID`に該当するスペースの
`ENVIROMENT_ID`に該当するスペースにcontentを新規登録します。

## CONTENTファイルの設定

以下の[contentmodel](../ContentModel/index.md)を登録可能です。

Contentful > Content ディレクトリに下記フォルダを登録します。

- Component
- Element
- Image
- Page
- Templete
- Information

![alt text](image.png)

## Componentの登録

Contentful > Content > Component ディレクトリに
htmlファイルを配置し、ファイルごとに登録します。

### `name`の設定

htmlファイル名を`name`として登録します

### `moduleName`の設定

htmlファイルの開始タグに`data-component-module-name`にmoduleNameを定義する

### `props`の設定

htmlファイルの開始タグに`data-component-props`にstringでJSON objectを定義する

### body

HTMLファイルの内容をbodyとする

```html
<div
 data-component-module-name={moduleName}
 data-component-props='{"title":"string","date":"Date","num":"number"}'
 >
    内容
</div>
```

## Elementの登録

componentから`moduleName`,`props`を除いたものをelementとして扱います。

```html
{body}
```

## Imageの登録

※事前にMediaに画像情報をアップロードする必要があります。
Mediaに登録したイメージファイル(.jpg .pngファイルなど)のリンクを取得して表示します。

Contentful > Content > Image ディレクトリにhtmlファイルを置きます。

```html
<img
data-moduleName="moduleName"
src={body}
...props
/>
```

### name

htmlファイル名

### moduleName

data-moduleNameに定義します。

### body(画像リンク)

Mediaに登録された画像のURLをBodyとします。

### props

`data-moduleName`,`src`を除く属性を`props`とします。

## Pageの登録

Pageディレクトリのhtmlファイルを取得します。
ディレクトリのパスから`pagePath`を定義します。
htmlの内容から`head`,`body`,`script`の内容を取得します。

下記のcontentを事前に登録します。

- Component
- Element
- Image

### pagePathの定義

Pageディレクトリから相対パスで取得します。
index.htmlは""として扱います。

例

- Page>index.htmlのhtmlファイルは"/"として登録
- Page>about>info.htmlのhtmlファイルは"/about/info"として登録

### headの定義

htmlファイルからheadタグからRichTextで登録します`<head>{Rich Text}</head>`

### bodyの定義

htmlファイルからbodyタグからRichTextで登録します`<body>{Rich Text}</body>`

### scriptの定義

htmlファイルからscriptタグからRichTextで登録します`<script>{Rich Text}</script>`
