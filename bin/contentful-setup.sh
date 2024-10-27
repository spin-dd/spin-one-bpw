# envファイルに設定した情報を読み込む
source .env
npx contentful login --management-token $CONTENTFUL_MANAGEMENT_TOKEN
npx contentful space use --space-id $CONTENTFUL_SPACE_ID
npx contentful space environment create --environment-id $CONTENTFUL_ENVIRONMENT_ID --name $CONTENTFUL_ENVIRONMENT_ID
npx contentful space environment use --environment-id $CONTENTFUL_ENVIRONMENT_ID
npx contentful space import --content-file ./data/contentful/content-model.json --content-model-only true
