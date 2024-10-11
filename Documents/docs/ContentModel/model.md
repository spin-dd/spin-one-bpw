# CONTENT MODEL

モデル情報は以下を作成します。
下記を`name`として登録します。

- Page
- Component
- Element
- Templete
- Information

## Page

- `pagePath`: Short text
  - サイト内のパスに対応
- `head`: Rich text
  - ページの head タグ内のマークアップ
  - Component、Element、Image を指定可能
- `body`: Rich text
  - ページの body タグ内のマークアップ
  - Component、Element、Image を指定可能
- `script`: Rich text
  - 記述された script tag を useEffect で実行する
  - 主に jQuery 依存処理実行用の拡張フィールド
    - ※利用は非推奨
- `context`: JSON Object
  - 未使用（拡張用）

## Component

- Gatsby で moduleName に指定した任意の外部 React Component モジュールに変換されます

詳細

- `name`: Short text
  - Contentful 内の識別子
- `moduleName`: Short text
  - Gatsby で変換する React Module の名称
  - docs/contentful-component-module-name.md を参照
- `props`: JSON object
  - Gatsby で React Component 化する際に props として I/F する値
- `body`: Rich text
  - React Component の Children 要素となるマークアップ
  - Component、Element、Image を指定可能

## Element

- moduleName と props の指定がない Component
- サイト内で共通するマークアップに利用することを想定
- 例：header、footer

詳細

- `name`: Short text
  - Contentful 内の識別子
- `body`: Rich text
  - React Component の Children 要素となるマークアップ
  - Component、Element、Image を指定可能

## Image

- moduleName = Image で body に Asset を指定可能な Component
- Asset 登録した画像を参照する際に利用することを想定

詳細

- `name`: Short text
  - Contentful 内の識別子
- `moduleName`: Short text
  - Image 固定
- `props`: JSON object
  - width、height を指定することで Contentful の機能でリサイズする
  - 未指定時はオリジナルサイズを取得する
  - その他指定したすべてのプロパティを img タグに付与する
- `body`: Rich text
  - Asset を指定可能

## Template

- gatsby-node で取得したデータに基づいて複数の詳細ページを生成するのに利用
  - Template informationDetail
- カスタムコンポーネントが利用するテンプレート入稿用
  - それ以外（対応するカスタムコンポーネントについては docs/contentful-component-module-name.md を参照）
- 基本的なフィールドは `Page` を継承
- Template.body には
  - Component、Element、Image を指定可能
  - inline entry として Component[CustomTemplateText] を指定することで属性値、あるいはテキストを出力可能

詳細

- `name`: Short text
  - テンプレート名
  - gatsby-node 内からテンプレートを一意に参照するために利用
- `body`: Rich text
  - ページの body タグ内のマークアップ
  - Component、Element、Image を指定可能
- `head`: Rich text
  - ページの head タグ内のマークアップ
  - Component、Element、Image を指定可能
- `script`: Rich text
  - 記述された JavaScript を useEffect で実行する
  - 主に jQuery 依存処理実行用の拡張フィールド（※利用は非推奨）
- `context`: JSON Object
  - 未使用（拡張用）
