#!/usr/bin/env node
'use strict';

var dotenv = require('dotenv');
var contentfulManagement = require('contentful-management');
var contentfulImport = require('contentful-import');

var contentTypes = [
	{
		sys: {
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			id: "element",
			type: "ContentType",
			createdAt: "2024-09-09T09:49:37.688Z",
			updatedAt: "2024-09-10T09:50:20.526Z",
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			},
			publishedVersion: 43,
			publishedAt: "2024-09-10T09:50:20.526Z",
			firstPublishedAt: "2024-09-09T09:49:38.759Z",
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			publishedCounter: 22,
			version: 44,
			publishedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			urn: "crn:contentful:::content:spaces/8h71zrqfbfma/environments/sample/content_types/element"
		},
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
		sys: {
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			id: "component",
			type: "ContentType",
			createdAt: "2024-09-09T09:49:37.689Z",
			updatedAt: "2024-09-10T09:50:19.965Z",
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			},
			publishedVersion: 43,
			publishedAt: "2024-09-10T09:50:19.965Z",
			firstPublishedAt: "2024-09-09T09:49:39.956Z",
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			publishedCounter: 22,
			version: 44,
			publishedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			urn: "crn:contentful:::content:spaces/8h71zrqfbfma/environments/sample/content_types/component"
		},
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
		sys: {
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			id: "image",
			type: "ContentType",
			createdAt: "2024-09-09T09:49:37.723Z",
			updatedAt: "2024-09-10T09:50:21.055Z",
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			},
			publishedVersion: 43,
			publishedAt: "2024-09-10T09:50:21.055Z",
			firstPublishedAt: "2024-09-09T09:49:39.402Z",
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			publishedCounter: 22,
			version: 44,
			publishedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			urn: "crn:contentful:::content:spaces/8h71zrqfbfma/environments/sample/content_types/image"
		},
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
		sys: {
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			id: "template",
			type: "ContentType",
			createdAt: "2024-09-09T09:49:37.727Z",
			updatedAt: "2024-09-10T09:50:21.574Z",
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			},
			publishedVersion: 43,
			publishedAt: "2024-09-10T09:50:21.574Z",
			firstPublishedAt: "2024-09-09T09:49:41.154Z",
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			publishedCounter: 22,
			version: 44,
			publishedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			urn: "crn:contentful:::content:spaces/8h71zrqfbfma/environments/sample/content_types/template"
		},
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
		sys: {
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			id: "page",
			type: "ContentType",
			createdAt: "2024-09-10T08:55:29.913Z",
			updatedAt: "2024-09-16T10:32:39.841Z",
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			},
			publishedVersion: 3,
			publishedAt: "2024-09-16T10:32:39.841Z",
			firstPublishedAt: "2024-09-10T08:55:30.498Z",
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "37oT30ZZM6eRQwRsLjxSZh"
				}
			},
			publishedCounter: 2,
			version: 4,
			publishedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "37oT30ZZM6eRQwRsLjxSZh"
				}
			},
			urn: "crn:contentful:::content:spaces/8h71zrqfbfma/environments/sample/content_types/page"
		},
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
		sys: {
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			id: "information",
			type: "ContentType",
			createdAt: "2024-09-10T09:46:24.688Z",
			updatedAt: "2024-09-10T09:50:19.422Z",
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			},
			publishedVersion: 5,
			publishedAt: "2024-09-10T09:50:19.422Z",
			firstPublishedAt: "2024-09-10T09:46:28.642Z",
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			publishedCounter: 3,
			version: 6,
			publishedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "2lm3sz3KBqEAt3dHQghfWk"
				}
			},
			urn: "crn:contentful:::content:spaces/8h71zrqfbfma/environments/sample/content_types/information"
		},
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
		sys: {
			id: "default",
			type: "EditorInterface",
			space: {
				sys: {
					id: "8h71zrqfbfma",
					type: "Link",
					linkType: "Space"
				}
			},
			version: 44,
			createdAt: "2024-09-09T09:49:39.002Z",
			createdBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			updatedAt: "2024-09-10T09:50:26.139Z",
			updatedBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			contentType: {
				sys: {
					id: "element",
					type: "Link",
					linkType: "ContentType"
				}
			},
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			}
		},
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
		sys: {
			id: "default",
			type: "EditorInterface",
			space: {
				sys: {
					id: "8h71zrqfbfma",
					type: "Link",
					linkType: "Space"
				}
			},
			version: 44,
			createdAt: "2024-09-09T09:49:40.160Z",
			createdBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			updatedAt: "2024-09-10T09:50:25.462Z",
			updatedBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			contentType: {
				sys: {
					id: "component",
					type: "Link",
					linkType: "ContentType"
				}
			},
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			}
		},
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
		sys: {
			id: "default",
			type: "EditorInterface",
			space: {
				sys: {
					id: "8h71zrqfbfma",
					type: "Link",
					linkType: "Space"
				}
			},
			version: 44,
			createdAt: "2024-09-09T09:49:39.583Z",
			createdBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			updatedAt: "2024-09-10T09:50:26.142Z",
			updatedBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			contentType: {
				sys: {
					id: "image",
					type: "Link",
					linkType: "ContentType"
				}
			},
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			}
		},
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
		sys: {
			id: "default",
			type: "EditorInterface",
			space: {
				sys: {
					id: "8h71zrqfbfma",
					type: "Link",
					linkType: "Space"
				}
			},
			version: 44,
			createdAt: "2024-09-09T09:49:41.364Z",
			createdBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			updatedAt: "2024-09-10T09:50:25.462Z",
			updatedBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			contentType: {
				sys: {
					id: "template",
					type: "Link",
					linkType: "ContentType"
				}
			},
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			}
		},
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
		sys: {
			id: "default",
			type: "EditorInterface",
			space: {
				sys: {
					id: "8h71zrqfbfma",
					type: "Link",
					linkType: "Space"
				}
			},
			version: 4,
			createdAt: "2024-09-10T08:55:30.765Z",
			createdBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			updatedAt: "2024-09-16T10:32:40.527Z",
			updatedBy: {
				sys: {
					id: "37oT30ZZM6eRQwRsLjxSZh",
					type: "Link",
					linkType: "User"
				}
			},
			contentType: {
				sys: {
					id: "page",
					type: "Link",
					linkType: "ContentType"
				}
			},
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			}
		},
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
		sys: {
			id: "default",
			type: "EditorInterface",
			space: {
				sys: {
					id: "8h71zrqfbfma",
					type: "Link",
					linkType: "Space"
				}
			},
			version: 6,
			createdAt: "2024-09-10T09:46:28.832Z",
			createdBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			updatedAt: "2024-09-10T09:50:26.139Z",
			updatedBy: {
				sys: {
					id: "2lm3sz3KBqEAt3dHQghfWk",
					type: "Link",
					linkType: "User"
				}
			},
			contentType: {
				sys: {
					id: "information",
					type: "Link",
					linkType: "ContentType"
				}
			},
			environment: {
				sys: {
					id: "sample",
					type: "Link",
					linkType: "Environment"
				}
			}
		},
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
		optional: true,
		sys: {
			type: "Locale",
			id: "5PmCrVN49ynsWAQ7Hhlv6m",
			version: 1,
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			environment: {
				sys: {
					type: "Link",
					linkType: "Environment",
					id: "sample",
					uuid: "3c5dc592-69d2-4f7c-95c0-68ffdf4f74a0"
				}
			},
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "37oT30ZZM6eRQwRsLjxSZh"
				}
			},
			createdAt: "2024-09-16T06:56:46Z",
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "37oT30ZZM6eRQwRsLjxSZh"
				}
			},
			updatedAt: "2024-09-16T06:56:46Z"
		}
	},
	{
		name: "Japanese",
		code: "ja",
		fallbackCode: null,
		"default": true,
		contentManagementApi: true,
		contentDeliveryApi: true,
		optional: false,
		sys: {
			type: "Locale",
			id: "2QLUK2ptSk9yrtsDOfV02d",
			version: 1,
			space: {
				sys: {
					type: "Link",
					linkType: "Space",
					id: "8h71zrqfbfma"
				}
			},
			environment: {
				sys: {
					type: "Link",
					linkType: "Environment",
					id: "sample",
					uuid: "3c5dc592-69d2-4f7c-95c0-68ffdf4f74a0"
				}
			},
			createdBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "37oT30ZZM6eRQwRsLjxSZh"
				}
			},
			createdAt: "2024-09-16T06:56:46Z",
			updatedBy: {
				sys: {
					type: "Link",
					linkType: "User",
					id: "37oT30ZZM6eRQwRsLjxSZh"
				}
			},
			updatedAt: "2024-09-16T06:56:46Z"
		}
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
