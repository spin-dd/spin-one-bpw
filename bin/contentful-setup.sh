# envファイルに設定した情報を読み込む
source .env
npx contentful space environment create --environment-id $CONTENTFUL_ENVIRONMENT_ID --name $CONTENTFUL_ENVIRONMENT_ID --space-id $CONTENTFUL_SPACE_ID --management-token $CONTENTFUL_MANAGEMENT_TOKEN
