import { Permission } from '@wbce-d9/types';

export const appRecommendedPermissions: Partial<Permission>[] = [
	{
		collection: 'sigedin_files',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_files',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_files',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_files',
		action: 'delete',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_dashboards',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_dashboards',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_dashboards',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_dashboards',
		action: 'delete',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_panels',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_panels',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_panels',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_panels',
		action: 'delete',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_folders',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_folders',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_folders',
		action: 'update',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_folders',
		action: 'delete',
		permissions: {},
	},
	{
		collection: 'sigedin_users',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_users',
		action: 'update',
		permissions: {
			id: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: [
			'first_name',
			'last_name',
			'email',
			'password',
			'location',
			'title',
			'description',
			'avatar',
			'language',
			'theme',
			'tfa_secret',
		],
	},
	{
		collection: 'sigedin_roles',
		action: 'read',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_shares',
		action: 'read',
		permissions: {
			_or: [
				{
					role: {
						_eq: '$CURRENT_ROLE',
					},
				},
				{
					role: {
						_null: true,
					},
				},
			],
		},
		fields: ['*'],
	},
	{
		collection: 'sigedin_shares',
		action: 'create',
		permissions: {},
		fields: ['*'],
	},
	{
		collection: 'sigedin_shares',
		action: 'update',
		permissions: {
			user_created: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: ['*'],
	},
	{
		collection: 'sigedin_shares',
		action: 'delete',
		permissions: {
			user_created: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: ['*'],
	},
	{
		collection: 'sigedin_flows',
		action: 'read',
		permissions: {
			trigger: {
				_eq: 'manual',
			},
		},
		fields: ['id', 'name', 'icon', 'color', 'options', 'trigger'],
	},
];

export const appMinimalPermissions: Partial<Permission>[] = [
	{
		collection: 'sigedin_activity',
		action: 'read',
		permissions: {
			user: {
				_eq: '$CURRENT_USER',
			},
		},
	},
	{
		collection: 'sigedin_activity',
		action: 'create',
		validation: {
			comment: {
				_nnull: true,
			},
		},
	},
	{
		collection: 'sigedin_collections',
		action: 'read',
	},
	{
		collection: 'sigedin_fields',
		action: 'read',
	},
	{
		collection: 'sigedin_permissions',
		action: 'read',
		permissions: {
			role: {
				_eq: '$CURRENT_ROLE',
			},
		},
	},
	{
		collection: 'sigedin_presets',
		action: 'read',
		permissions: {
			_or: [
				{
					user: {
						_eq: '$CURRENT_USER',
					},
				},
				{
					_and: [
						{
							user: {
								_null: true,
							},
						},
						{
							role: {
								_eq: '$CURRENT_ROLE',
							},
						},
					],
				},
				{
					_and: [
						{
							user: {
								_null: true,
							},
						},
						{
							role: {
								_null: true,
							},
						},
					],
				},
			],
		},
	},
	{
		collection: 'sigedin_presets',
		action: 'create',
		validation: {
			user: {
				_eq: '$CURRENT_USER',
			},
		},
	},
	{
		collection: 'sigedin_presets',
		action: 'update',
		permissions: {
			user: {
				_eq: '$CURRENT_USER',
			},
		},
	},
	{
		collection: 'sigedin_presets',
		action: 'delete',
		permissions: {
			user: {
				_eq: '$CURRENT_USER',
			},
		},
	},
	{
		collection: 'sigedin_relations',
		action: 'read',
	},
	{
		collection: 'sigedin_roles',
		action: 'read',
		permissions: {
			id: {
				_eq: '$CURRENT_ROLE',
			},
		},
	},
	{
		collection: 'sigedin_settings',
		action: 'read',
	},
	{
		collection: 'sigedin_shares',
		action: 'read',
		permissions: {
			user_created: {
				_eq: '$CURRENT_USER',
			},
		},
	},
	{
		collection: 'sigedin_users',
		action: 'read',
		permissions: {
			id: {
				_eq: '$CURRENT_USER',
			},
		},
		fields: [
			'id',
			'first_name',
			'last_name',
			'last_page',
			'email',
			'password',
			'location',
			'title',
			'description',
			'tags',
			'preferences_divider',
			'avatar',
			'language',
			'theme',
			'tfa_secret',
			'status',
			'role',
		],
	},
];
