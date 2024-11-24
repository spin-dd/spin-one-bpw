// カスタムコンポーネント出力用のカスタムタグ
declare namespace JSX {
  interface IntrinsicElements {
    'custom-tag': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
  }
}
