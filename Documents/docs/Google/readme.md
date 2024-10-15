# Google関連の設定

<https://github.com/spin-dd/spin-one/issues/8>

- [タグマネージャー](https://tagmanager.google.com/#/home)の設定
- [Search Console](https://search.google.com/search-console/about?hl=ja) によるサイトマップ登録

※前提としてサイトのURLが必要になります。

## タグマネージャー(GTM)の設定

参考<https://azkk.co.jp/google_tag-manager>

- <https://tagmanager.google.com/#/home#accounts>でGTM用のアカウント作成を行う

アカウントの作成は原則として1つの会社につき1アカウントになります。

- コンテナの作成
1ドメインに対して1コンテナを作成します。

- Google Analyticsのタグの設定

タグの情報を登録して公開します。

## サーチコンソールの設定

- サイトマップの作成

プラグイン[gatsby-plugin-sitemap](https://www.gatsbyjs.com/plugins/gatsby-plugin-sitemap/)を使用し、サイトマップを作成します。
GitHub に push すれば自動で Netlify にデプロイされ、`{サイトURL}/sitemap/sitemap-0.xml` が作成されます。
<https://github.com/spin-dd/spin-one/issues/6>

- Google アカウントの作成・ログイン
利用するアカウントでログインを行います。アカウントがない場合は作成をします。

- Googleサーチコンソールを開始
今すぐ開始」をクリックします。

- プロパティタイプの選択
「ドメイン」か「URLプレフィックス」を選択して「続行」をクリックします。

- サイトマップの登録
新しいサイトマップの追加から自身のサイトのサイトマップの URL を入力して「送信」ボタンをクリックして登録完了になります。
