#!/usr/bin/env node
'use strict';

var dotenv = require('dotenv');
var contentfulManagement = require('contentful-management');
var contentfulImport = require('contentful-import');

var contentTypes = [
	{
		displayField: "name",
		name: "Element",
		description: "",
		fields: [
			{
				id: "name",
				name: "name",
				type: "Symbol",
				localized: false,
				required: false,
				validations: [
					{
						unique: true
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "body",
				name: "body",
				type: "RichText",
				localized: true,
				required: true,
				validations: [
					{
						enabledMarks: [
						],
						message: "Marks are not allowed"
					},
					{
						enabledNodeTypes: [
							"embedded-entry-block"
						],
						message: "Only block entry nodes are allowed"
					},
					{
						nodes: {
						}
					}
				],
				disabled: false,
				omitted: false
			}
		]
	},
	{
		displayField: "name",
		name: "Component",
		description: "",
		fields: [
			{
				id: "name",
				name: "name",
				type: "Symbol",
				localized: false,
				required: true,
				validations: [
					{
						unique: true
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "moduleName",
				name: "moduleName",
				type: "Symbol",
				localized: false,
				required: true,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "props",
				name: "props",
				type: "Object",
				localized: true,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "body",
				name: "body",
				type: "RichText",
				localized: true,
				required: false,
				validations: [
					{
						enabledMarks: [
						],
						message: "Marks are not allowed"
					},
					{
						enabledNodeTypes: [
							"embedded-entry-block",
							"embedded-entry-inline"
						],
						message: "Only block entry and inline entry nodes are allowed"
					},
					{
						nodes: {
							"embedded-entry-block": [
								{
									linkContentType: [
										"component",
										"element",
										"image"
									],
									message: null
								}
							]
						}
					}
				],
				disabled: false,
				omitted: false
			}
		]
	},
	{
		displayField: "name",
		name: "Image",
		description: "",
		fields: [
			{
				id: "name",
				name: "name",
				type: "Symbol",
				localized: false,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "moduleName",
				name: "moduleName",
				type: "Symbol",
				localized: false,
				required: true,
				validations: [
					{
						"in": [
							"Image"
						]
					}
				],
				defaultValue: {
					ja: "Image"
				},
				disabled: false,
				omitted: false
			},
			{
				id: "props",
				name: "props",
				type: "Object",
				localized: true,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "body",
				name: "body",
				type: "Link",
				localized: false,
				required: true,
				validations: [
					{
						linkMimetypeGroup: [
							"image"
						]
					}
				],
				disabled: false,
				omitted: false,
				linkType: "Asset"
			}
		]
	},
	{
		displayField: "name",
		name: "Template",
		description: "",
		fields: [
			{
				id: "name",
				name: "name",
				type: "Symbol",
				localized: false,
				required: true,
				validations: [
					{
						unique: true
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "head",
				name: "head",
				type: "RichText",
				localized: true,
				required: false,
				validations: [
					{
						enabledMarks: [
						],
						message: "Marks are not allowed"
					},
					{
						enabledNodeTypes: [
							"embedded-entry-block"
						],
						message: "Only block entry nodes are allowed"
					},
					{
						nodes: {
							"embedded-entry-block": [
								{
									linkContentType: [
										"element"
									],
									message: null
								}
							]
						}
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "body",
				name: "body",
				type: "RichText",
				localized: true,
				required: true,
				validations: [
					{
						enabledMarks: [
						],
						message: "Marks are not allowed"
					},
					{
						enabledNodeTypes: [
							"embedded-entry-block",
							"embedded-entry-inline"
						],
						message: "Only block entry and inline entry nodes are allowed"
					},
					{
						nodes: {
							"embedded-entry-block": [
								{
									linkContentType: [
										"component",
										"element",
										"image"
									],
									message: null
								}
							]
						}
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "script",
				name: "script",
				type: "RichText",
				localized: true,
				required: false,
				validations: [
					{
						enabledMarks: [
						],
						message: "Marks are not allowed"
					},
					{
						enabledNodeTypes: [
							"embedded-entry-block"
						],
						message: "Only block entry nodes are allowed"
					},
					{
						nodes: {
						}
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "context",
				name: "context",
				type: "Object",
				localized: true,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			}
		]
	},
	{
		displayField: "pagePath",
		name: "Page",
		description: "",
		fields: [
			{
				id: "pagePath",
				name: "pagePath",
				type: "Symbol",
				localized: false,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "head",
				name: "head",
				type: "RichText",
				localized: false,
				required: false,
				validations: [
					{
						enabledMarks: [
							"bold",
							"italic",
							"underline",
							"code",
							"superscript",
							"subscript",
							"strikethrough"
						],
						message: "Only bold, italic, underline, code, superscript, subscript, and strikethrough marks are allowed"
					},
					{
						enabledNodeTypes: [
							"heading-1",
							"heading-2",
							"heading-3",
							"heading-4",
							"heading-5",
							"heading-6",
							"ordered-list",
							"unordered-list",
							"hr",
							"blockquote",
							"embedded-entry-block",
							"embedded-asset-block",
							"table",
							"asset-hyperlink",
							"embedded-entry-inline",
							"entry-hyperlink",
							"hyperlink"
						],
						message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to asset, inline entry, link to entry, and link to Url nodes are allowed"
					},
					{
						nodes: {
						}
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "body",
				name: "body",
				type: "RichText",
				localized: true,
				required: false,
				validations: [
					{
						enabledMarks: [
							"bold",
							"italic",
							"underline",
							"code",
							"superscript",
							"subscript",
							"strikethrough"
						],
						message: "Only bold, italic, underline, code, superscript, subscript, and strikethrough marks are allowed"
					},
					{
						enabledNodeTypes: [
							"heading-1",
							"heading-2",
							"heading-3",
							"heading-4",
							"heading-5",
							"heading-6",
							"ordered-list",
							"unordered-list",
							"hr",
							"blockquote",
							"embedded-entry-block",
							"embedded-asset-block",
							"table",
							"asset-hyperlink",
							"embedded-entry-inline",
							"entry-hyperlink",
							"hyperlink"
						],
						message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to asset, inline entry, link to entry, and link to Url nodes are allowed"
					},
					{
						nodes: {
						}
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "script",
				name: "script",
				type: "RichText",
				localized: false,
				required: false,
				validations: [
					{
						enabledMarks: [
							"bold",
							"italic",
							"underline",
							"code",
							"superscript",
							"subscript",
							"strikethrough"
						],
						message: "Only bold, italic, underline, code, superscript, subscript, and strikethrough marks are allowed"
					},
					{
						enabledNodeTypes: [
							"heading-1",
							"heading-2",
							"heading-3",
							"heading-4",
							"heading-5",
							"heading-6",
							"ordered-list",
							"unordered-list",
							"hr",
							"blockquote",
							"embedded-entry-block",
							"embedded-asset-block",
							"table",
							"asset-hyperlink",
							"embedded-entry-inline",
							"entry-hyperlink",
							"hyperlink"
						],
						message: "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule, quote, block entry, asset, table, link to asset, inline entry, link to entry, and link to Url nodes are allowed"
					},
					{
						nodes: {
						}
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "context",
				name: "context",
				type: "Object",
				localized: false,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			}
		]
	},
	{
		displayField: "slug",
		name: "Information",
		description: "",
		fields: [
			{
				id: "slug",
				name: "slug",
				type: "Symbol",
				localized: false,
				required: true,
				validations: [
					{
						unique: true
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "label",
				name: "label",
				type: "Symbol",
				localized: false,
				required: true,
				validations: [
					{
						"in": [
							"news",
							"important"
						]
					}
				],
				disabled: false,
				omitted: false
			},
			{
				id: "title",
				name: "title",
				type: "Symbol",
				localized: true,
				required: true,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "body",
				name: "body",
				type: "Text",
				localized: true,
				required: false,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "publishDate",
				name: "publishDate",
				type: "Date",
				localized: false,
				required: true,
				validations: [
				],
				disabled: false,
				omitted: false
			},
			{
				id: "thumbnail",
				name: "thumbnail",
				type: "Link",
				localized: false,
				required: false,
				validations: [
					{
						linkContentType: [
							"image"
						]
					}
				],
				disabled: false,
				omitted: false,
				linkType: "Entry"
			}
		]
	}
];
var editorInterfaces = [
	{
		controls: [
			{
				fieldId: "name",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "body",
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			}
		]
	},
	{
		controls: [
			{
				fieldId: "name",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "moduleName",
				settings: {
					helpText: "https://react-bootstrap.github.io/components/alerts/"
				},
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "props",
				widgetId: "objectEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "body",
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			}
		]
	},
	{
		controls: [
			{
				fieldId: "name",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "moduleName",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "props",
				settings: {
					helpText: "https://www.gatsbyjs.com/docs/reference/built-in-components/gatsby-plugin-image/#shared-props"
				},
				widgetId: "objectEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "body",
				widgetId: "assetLinkEditor",
				widgetNamespace: "builtin"
			}
		]
	},
	{
		controls: [
			{
				fieldId: "name",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "head",
				settings: {
					helpText: "https://github.com/nfl/react-helmet#reference-guide"
				},
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "body",
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "script",
				settings: {
					helpText: "jQuery 依存処理などを記述する（利用は非推奨）"
				},
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "context",
				widgetId: "objectEditor",
				widgetNamespace: "builtin"
			}
		]
	},
	{
		controls: [
			{
				fieldId: "pagePath",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "head",
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "body",
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "script",
				widgetId: "richTextEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "context",
				widgetId: "objectEditor",
				widgetNamespace: "builtin"
			}
		]
	},
	{
		controls: [
			{
				fieldId: "slug",
				widgetId: "slugEditor",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "label",
				widgetId: "dropdown",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "title",
				widgetId: "singleLine",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "body",
				widgetId: "markdown",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "publishDate",
				settings: {
					ampm: "24",
					format: "dateonly"
				},
				widgetId: "datePicker",
				widgetNamespace: "builtin"
			},
			{
				fieldId: "thumbnail",
				widgetId: "entryCardEditor",
				widgetNamespace: "builtin"
			}
		]
	}
];
var locales = [
	{
		name: "English",
		code: "en",
		fallbackCode: "ja",
		"default": false,
		contentManagementApi: true,
		contentDeliveryApi: true,
		optional: true
	},
	{
		name: "Japanese",
		code: "ja",
		fallbackCode: null,
		"default": true,
		contentManagementApi: true,
		contentDeliveryApi: true,
		optional: false
	}
];
var content = {
	contentTypes: contentTypes,
	editorInterfaces: editorInterfaces,
	locales: locales
};

// envファイルに設定した情報を読み込む
dotenv.config();
const spaceId = process.env.CONTENTFUL_SPACE_ID;
const managementToken = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
const environmentId = process.env.CONTENTFUL_ENVIRONMENT_ID;
if (!spaceId || !managementToken || !environmentId) {
    console.error('Contentfulの設定が不足しています。');
    process.exit(1);
}
const client = contentfulManagement.createClient({
    accessToken: managementToken,
});
async function setupContentful() {
    try {
        const space = await client.getSpace(spaceId);
        // スペースを使用
        console.log(`Using space: ${spaceId}`);
        // 環境の存在確認
        const environments = await space.getEnvironments();
        if (environments.items.some((env) => env.sys.id === environmentId)) {
            console.log(`Environment already exists: ${environmentId}`);
            return;
        }
        // 環境を作成
        await space.createEnvironmentWithId(environmentId, { name: environmentId });
        console.log(`Environment created: ${environmentId}`);
        // SPIN ONE標準Content Modelをインポート
        await contentfulImport({
            spaceId,
            environmentId,
            managementToken,
            content,
            contentModelOnly: true,
        });
        console.log('Content model imported successfully');
    }
    catch (error) {
        console.error('Error setting up Contentful:', error);
        process.exit(1);
    }
}
setupContentful();
