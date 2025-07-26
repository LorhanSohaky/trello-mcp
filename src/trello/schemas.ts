import {z} from 'zod';

export const TrelloID = z.string();
export const Action = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idMemberCreator: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		data: z
			.object({
				text: z.string(),
				card: z
					.object({
						id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
						name: z.string(),
						idShort: z.number().int(),
						shortLink: z.string(),
					})
					.partial()
					.passthrough(),
				board: z
					.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), name: z.string(), shortLink: z.string()})
					.partial()
					.passthrough(),
				list: z
					.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), name: z.string()})
					.partial()
					.passthrough(),
			})
			.partial()
			.passthrough(),
		type: z.string(),
		date: z.string().datetime({offset: true}),
		limits: z
			.object({
				reactions: z
					.object({
						perAction: z
							.object({status: z.string(), disableAt: z.number(), warnAt: z.number()})
							.partial()
							.passthrough(),
						uniquePerAction: z
							.object({status: z.string(), disableAt: z.number(), warnAt: z.number()})
							.partial()
							.passthrough(),
					})
					.partial()
					.passthrough(),
			})
			.partial()
			.passthrough(),
		display: z
			.object({
				translationKey: z.string(),
				entities: z
					.object({
						contextOn: z
							.object({
								type: z.string(),
								translationKey: z.string(),
								hideIfContext: z.boolean(),
								idContext: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
							})
							.partial()
							.passthrough(),
						card: z
							.object({
								type: z.string(),
								hideIfContext: z.boolean(),
								id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
								shortLink: z.string(),
								text: z.string(),
							})
							.partial()
							.passthrough(),
						comment: z.object({type: z.string(), text: z.string()}).partial().passthrough(),
						memberCreator: z
							.object({
								type: z.string(),
								id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
								username: z.string(),
								text: z.string(),
							})
							.partial()
							.passthrough(),
					})
					.partial()
					.passthrough(),
			})
			.partial()
			.passthrough(),
		memberCreator: z
			.object({
				id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
				activityBlocked: z.boolean(),
				avatarHash: z.string(),
				avatarUrl: z.string(),
				fullName: z.string(),
				idMemberReferrer: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
				initials: z.string(),
				username: z.string(),
			})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough();
export const CardAging = z.enum(['pirate', 'regular']);
export const ImageDescriptor = z
	.object({width: z.number().int(), height: z.number().int(), url: z.string()})
	.partial()
	.passthrough();
export const Prefs = z
	.object({
		permissionLevel: z.enum(['org', 'board']),
		hideVotes: z.boolean(),
		voting: z.enum(['disabled', 'enabled']),
		comments: z.string(),
		invitations: z.unknown(),
		selfJoin: z.boolean(),
		cardCovers: z.boolean(),
		isTemplate: z.boolean(),
		cardAging: CardAging,
		calendarFeedEnabled: z.boolean(),
		background: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		backgroundImage: z.string().url(),
		backgroundImageScaled: z.array(ImageDescriptor),
		backgroundTile: z.boolean(),
		backgroundBrightness: z.string(),
		backgroundBottomColor: z.string(),
		backgroundTopColor: z.string(),
		canBePublic: z.boolean(),
		canBeEnterprise: z.boolean(),
		canBeOrg: z.boolean(),
		canBePrivate: z.boolean(),
		canInvite: z.boolean(),
	})
	.partial()
	.passthrough();
export const LimitsObject = z
	.object({status: z.enum(['ok', 'warning']), disableAt: z.number(), warnAt: z.number()})
	.partial()
	.passthrough();
export const Limits = z
	.object({attachments: z.object({perBoard: LimitsObject}).partial().passthrough()})
	.partial()
	.passthrough();
export const Board = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string().optional(),
		desc: z.string().optional(),
		descData: z.string().optional(),
		closed: z.boolean().optional(),
		idMemberCreator: TrelloID.regex(/^[0-9a-fA-F]{24}$/).optional(),
		idOrganization: TrelloID.regex(/^[0-9a-fA-F]{24}$/).optional(),
		pinned: z.boolean().optional(),
		url: z.string().optional(),
		shortUrl: z.string().optional(),
		prefs: Prefs.optional(),
		labelNames: z
			.object({
				green: z.string(),
				yellow: z.string(),
				orange: z.string(),
				red: z.string(),
				purple: z.string(),
				blue: z.string(),
				sky: z.string(),
				lime: z.string(),
				pink: z.string(),
				black: z.string(),
			})
			.partial()
			.passthrough()
			.optional(),
		limits: Limits.optional(),
		starred: z.boolean().optional(),
		memberships: z.string().optional(),
		shortLink: z.string().optional(),
		subscribed: z.boolean().optional(),
		powerUps: z.string().optional(),
		dateLastActivity: z.string().optional(),
		dateLastView: z.string().optional(),
		idTags: z.string().optional(),
		datePluginDisable: z.string().nullish(),
		creationMethod: z.string().nullish(),
		ixUpdate: z.number().int().optional(),
		templateGallery: z.string().nullish(),
		enterpriseOwned: z.boolean().optional(),
	})
	.passthrough();
export const Checklist = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
	.partial()
	.passthrough();
export const Color = z.enum(['yellow', 'purple', 'blue', 'red', 'green', 'orange', 'black', 'sky', 'pink', 'lime']);
export const Label = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idBoard: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string().min(0).max(16384).nullable(),
		color: Color.nullable(),
	})
	.partial()
	.passthrough();

export const Card = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		address: z.string().nullable(),
		badges: z
			.object({
				attachmentsByType: z
					.object({trello: z.object({board: z.number(), card: z.number()}).partial().passthrough()})
					.partial()
					.passthrough(),
				location: z.boolean(),
				votes: z.number().int(),
				viewingMemberVoted: z.boolean(),
				subscribed: z.boolean(),
				fogbugz: z.string(),
				checkItems: z.number().int(),
				checkItemsChecked: z.number().int(),
				comments: z.number().int(),
				attachments: z.number().int(),
				description: z.boolean(),
				due: z.string().nullable(),
				start: z.string().nullable(),
				dueComplete: z.boolean(),
			})
			.partial()
			.passthrough(),
		checkItemStates: z.array(z.string()),
		closed: z.boolean(),
		coordinates: z.string().nullable(),
		creationMethod: z.string().nullable(),
		dateLastActivity: z.string().datetime({offset: true}),
		desc: z.string(),
		descData: z
			.object({emoji: z.object({}).partial().passthrough()})
			.partial()
			.passthrough(),
		due: z.string().nullable(),
		dueReminder: z.string().nullable(),
		idBoard: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idChecklists: z.array(z.union([Checklist, TrelloID])),
		idLabels: z.array(z.union([Label, TrelloID])),
		idList: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idMembers: z.array(TrelloID),
		idMembersVoted: z.array(TrelloID),
		idShort: z.number().int(),
		idAttachmentCover: TrelloID.regex(/^[0-9a-fA-F]{24}$/).nullable(),
		labels: z.array(TrelloID),
		limits: Limits,
		locationName: z.string().nullable(),
		manualCoverAttachment: z.boolean(),
		name: z.string(),
		pos: z.number(),
		shortLink: z.string(),
		shortUrl: z.string(),
		subscribed: z.boolean(),
		url: z.string(),
		cover: z
			.object({
				idAttachment: TrelloID.regex(/^[0-9a-fA-F]{24}$/).nullable(),
				color: Color.nullable(),
				idUploadedBackground: z.boolean().nullable(),
				size: z.literal('normal'),
				brightness: z.enum(['light', 'dark']),
				isTemplate: z.boolean(),
			})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough();
export const TrelloList = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string(),
		closed: z.boolean(),
		pos: z.number(),
		softLimit: z.string(),
		idBoard: z.string(),
		subscribed: z.boolean(),
		limits: Limits,
	})
	.partial()
	.passthrough();
export const MemberPrefs = z
	.object({
		timezoneInfo: z
			.object({
				offsetCurrent: z.number().int(),
				timezoneCurrent: z.string(),
				offsetNext: z.number().int(),
				dateNext: z.string(),
				timezoneNext: z.string(),
			})
			.partial()
			.passthrough(),
		privacy: z
			.object({
				fullName: z.enum(['public', 'private', 'collaborator']),
				avatar: z.enum(['public', 'private', 'collaborator']),
			})
			.partial()
			.passthrough(),
		sendSummaries: z.boolean(),
		minutesBetweenSummaries: z.number().int(),
		minutesBeforeDeadlineToNotify: z.number().int(),
		colorBlind: z.boolean(),
		locale: z.string(),
		timezone: z.string(),
		twoFactor: z.object({enabled: z.boolean(), needsNewBackups: z.boolean()}).partial().passthrough(),
	})
	.partial()
	.passthrough();
export const Member = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		activityBlocked: z.boolean(),
		avatarHash: z.string(),
		avatarUrl: z.string(),
		bio: z.string(),
		bioData: z
			.object({emoji: z.object({}).partial().passthrough()})
			.partial()
			.passthrough(),
		confirmed: z.boolean(),
		fullName: z.string(),
		idEnterprise: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idEnterprisesDeactivated: z.array(z.string()),
		idMemberReferrer: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idPremOrgsAdmin: z.array(TrelloID),
		initials: z.string(),
		memberType: z.enum(['normal', 'ghost']),
		nonPublic: z
			.object({fullName: z.string(), initials: z.string(), avatarUrl: z.string(), avatarHash: z.string()})
			.partial()
			.passthrough(),
		nonPublicAvailable: z.boolean(),
		products: z.array(z.number().int()),
		url: z.string(),
		username: z.string(),
		status: z.literal('disconnected'),
		aaEmail: z.string().email().nullable(),
		aaEnrolledDate: z.string().nullable(),
		aaId: z.string().nullable(),
		avatarSource: z.enum(['gravatar', 'upload']),
		email: z.string(),
		gravatarHash: z.string(),
		idBoards: z.array(TrelloID),
		idOrganizations: z.array(TrelloID),
		idEnterprisesAdmin: z.array(TrelloID),
		limits: LimitsObject,
		loginTypes: z.array(z.enum(['password', 'saml'])),
		marketingOptIn: z.object({optedIn: z.boolean(), date: z.string()}).partial().passthrough(),
		messagesDismissed: z
			.object({
				name: z.string(),
				count: z.string(),
				lastDismissed: z.string(),
				_id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
			})
			.partial()
			.passthrough(),
		oneTimeMessagesDismissed: z.array(z.string()),
		prefs: MemberPrefs,
		trophies: z.array(z.string()),
		uploadedAvatarHash: z.string(),
		uploadedAvatarUrl: z.string(),
		premiumFeatures: z.array(z.string()),
		isAaMastered: z.boolean(),
		ixUpdate: z.number(),
		idBoardsPinned: z.array(TrelloID).nullable(),
	})
	.partial()
	.passthrough();
export const Organization = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
	.partial()
	.passthrough();
export const post_actions_idaction_reactions_Body = z
	.object({shortName: z.string(), skinVariation: z.string(), native: z.string(), unified: z.string()})
	.partial()
	.passthrough();
export const Memberships = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
	.partial()
	.passthrough();
export const ErrorApi = z.object({code: z.string(), message: z.string()}).passthrough();
export const fields = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idMemberCreator: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		data: z
			.object({
				text: z.string(),
				card: z
					.object({
						id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
						name: z.string(),
						idShort: z.number().int(),
						shortLink: z.string(),
					})
					.partial()
					.passthrough(),
				board: z
					.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), name: z.string(), shortLink: z.string()})
					.partial()
					.passthrough(),
				list: z
					.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), name: z.string()})
					.partial()
					.passthrough(),
			})
			.partial()
			.passthrough(),
		type: z.string(),
		date: z.string().datetime({offset: true}),
		limits: z
			.object({
				reactions: z
					.object({
						perAction: z
							.object({status: z.string(), disableAt: z.number(), warnAt: z.number()})
							.partial()
							.passthrough(),
						uniquePerAction: z
							.object({status: z.string(), disableAt: z.number(), warnAt: z.number()})
							.partial()
							.passthrough(),
					})
					.partial()
					.passthrough(),
			})
			.partial()
			.passthrough(),
		display: z
			.object({
				translationKey: z.string(),
				entities: z
					.object({
						contextOn: z
							.object({
								type: z.string(),
								translationKey: z.string(),
								hideIfContext: z.boolean(),
								idContext: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
							})
							.partial()
							.passthrough(),
						card: z
							.object({
								type: z.string(),
								hideIfContext: z.boolean(),
								id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
								shortLink: z.string(),
								text: z.string(),
							})
							.partial()
							.passthrough(),
						comment: z.object({type: z.string(), text: z.string()}).partial().passthrough(),
						memberCreator: z
							.object({
								type: z.string(),
								id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
								username: z.string(),
								text: z.string(),
							})
							.partial()
							.passthrough(),
					})
					.partial()
					.passthrough(),
			})
			.partial()
			.passthrough(),
		memberCreator: z
			.object({
				id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
				activityBlocked: z.boolean(),
				avatarHash: z.string(),
				avatarUrl: z.string(),
				fullName: z.string(),
				idMemberReferrer: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
				initials: z.string(),
				username: z.string(),
			})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough()
	.optional();
export const BoardStars = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idBoard: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		pos: z.number().int(),
	})
	.partial()
	.passthrough();
export const CustomField = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idModel: z.string(),
		modelType: z.enum(['card', 'board', 'member']),
		fieldGroup: z.string(),
		display: z
			.object({
				cardFront: z.boolean(),
				name: z.string(),
				pos: z.string(),
				options: z.array(
					z
						.object({
							id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
							idCustomField: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
							value: z.object({text: z.string()}).partial().passthrough(),
							color: z.string(),
							pos: z.number(),
						})
						.partial()
						.passthrough(),
				),
			})
			.partial()
			.passthrough(),
		type: z.string(),
	})
	.partial()
	.passthrough();
export const fields__2 = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idBoard: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string().min(0).max(16384).nullable(),
		color: Color.nullable(),
	})
	.partial()
	.passthrough()
	.optional();
export const Plugin = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
	.partial()
	.passthrough();
export const pos = z.union([z.enum(['top', 'bottom']), z.number()]).optional();
export const idMembers = z.array(TrelloID).optional();
export const attachments = z
	.union([z.literal('cover'), z.boolean()])
	.optional()
	.default(false);
export const cover = z
	.object({
		value: z
			.object({
				color: z.enum(['pink', 'yellow', 'lime', 'blue', 'black', 'orange', 'red', 'purple', 'sky', 'green']),
				brightness: z.enum(['dark', 'light']),
				url: z.string(),
			})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough()
	.optional();
export const Attachment = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		bytes: z.string().nullable(),
		date: z.string(),
		edgeColor: Color.nullable(),
		idMember: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		isUpload: z.boolean(),
		mimeType: z.string(),
		name: z.string(),
		previews: z.array(z.string()),
		url: z.string(),
		pos: z.number(),
	})
	.partial()
	.passthrough();
export const AttachmentFields = z.enum([
	'id',
	'bytes',
	'date',
	'edgeColor',
	'idMember',
	'isUpload',
	'mimeType',
	'name',
	'previews',
	'url',
	'pos',
]);
export const fields__3 = z.array(AttachmentFields).optional();
export const put_cards_idcard_customfield_idcustomfield_item_Body = z.union([
	z
		.object({
			value: z
				.object({
					text: z.string(),
					checked: z.boolean(),
					date: z.string().datetime({offset: true}),
					number: z.number(),
				})
				.partial()
				.passthrough(),
		})
		.partial()
		.passthrough(),
	z
		.object({idValue: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
		.partial()
		.passthrough(),
]);
export const put_cards_idcard_customfields_Body = z
	.object({
		customFieldItems: z.array(
			z
				.object({
					idCustomField: z.unknown(),
					value: z
						.object({
							text: z.string(),
							checked: z.boolean(),
							date: z.string().datetime({offset: true}),
							number: z.number(),
						})
						.partial()
						.passthrough(),
					idValue: z.unknown(),
				})
				.partial()
				.passthrough(),
		),
	})
	.partial()
	.passthrough();
export const CustomFieldItems = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		value: z.object({checked: z.string()}).partial().passthrough(),
		idCustomField: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idModel: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		modelType: z.enum(['card', 'board', 'member']),
	})
	.partial()
	.passthrough();
export const CheckItem = z
	.object({
		idChecklist: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		state: z.enum(['complete', 'incomplete']),
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string(),
		nameData: z.string().nullable(),
		pos: z.string(),
	})
	.partial()
	.passthrough();
export const posStringOrNumber = z.union([z.enum(['top', 'bottom']), z.number()]);
export const value = z.union([posStringOrNumber, TrelloID]);
export const post_customfields_Body = z
	.object({
		idModel: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		modelType: z.literal('board'),
		name: z.string(),
		type: z.enum(['checkbox', 'list', 'number', 'text', 'date']),
		options: z.string().optional(),
		pos: posStringOrNumber,
		display_cardFront: z.boolean().optional().default(true),
	})
	.passthrough();
export const put_customfields_id_Body = z
	.object({name: z.string(), pos: posStringOrNumber, 'display/cardFront': z.boolean()})
	.partial()
	.passthrough();
export const Emoji = z
	.object({
		trello: z.array(
			z
				.object({
					unified: z.string(),
					name: z.string(),
					native: z.string(),
					shortName: z.string(),
					shortNames: z.array(z.string()),
					text: z.string(),
					texts: z.string().nullable(),
					category: z.string(),
					sheetX: z.number(),
					sheetY: z.number(),
					tts: z.string(),
					keywords: z.array(z.string()),
				})
				.partial()
				.passthrough(),
		),
	})
	.partial()
	.passthrough();
export const Enterprise = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string(),
		displayName: z.string(),
		logoHash: z.string().nullable(),
		logoUrl: z.string().nullable(),
		prefs: z
			.object({
				ssoOnly: z.boolean(),
				signup: z.object({banner: z.string(), bannerHtml: z.string()}).partial().passthrough(),
				mandatoryTransferDate: z.string().nullable(),
				brandingColor: z.string(),
				autoJoinOrganizations: z.boolean(),
				notifications: z.object({}).partial().passthrough(),
				maxMembers: z.number().nullable(),
			})
			.partial()
			.passthrough(),
		organizationPrefs: z
			.object({
				boardVisibilityRestrict: z.object({}).partial().passthrough(),
				boardDeleteRestrict: z.object({}).partial().passthrough(),
				attachmentRestrictions: z.array(z.enum(['computer', 'trello', 'google-drive', 'box', 'onedrive', 'link'])),
			})
			.partial()
			.passthrough(),
		ssoActivationFailed: z.boolean(),
		idAdmins: z.array(TrelloID),
		enterpriseDomains: z.array(z.string()),
		isRealEnterprise: z.boolean(),
		pluginWhitelistingEnabled: z.array(TrelloID),
		idOrganizations: z.array(TrelloID),
		products: z.array(z.number()),
		licenses: z
			.object({
				maxMembers: z.number().nullable(),
				totalMembers: z.number(),
				relatedEnterprises: z.array(
					z.object({name: z.string(), displayName: z.string(), count: z.number()}).partial().passthrough(),
				),
			})
			.partial()
			.passthrough(),
		domains: z.array(z.string()),
		dateOrganizationPrefsLastUpdated: z.string(),
		idp: z
			.object({requestSigned: z.boolean(), certificate: z.string().nullable(), loginUrl: z.string().nullable()})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough();
export const EnterpriseAuditLog = z
	.object({
		idAction: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		type: z.string(),
		date: z.string(),
		memberCreator: z
			.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), username: z.string(), fullName: z.string()})
			.partial()
			.passthrough(),
		organization: z
			.object({
				enterpriseJoinRequest: z
					.object({
						idEnterprise: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
						idMember: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
						date: z.string(),
					})
					.partial()
					.passthrough()
					.nullable(),
				id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
				name: z.string(),
			})
			.partial()
			.passthrough(),
		member: z
			.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), username: z.string(), fullName: z.string()})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough();
export const EnterpriseAdmin = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), fullName: z.string(), username: z.string()})
	.partial()
	.passthrough();
export const Membership = z
	.object({
		managed: z.boolean(),
		licensed: z.boolean(),
		admin: z.boolean(),
		deactivated: z.boolean(),
		collaborator: z.boolean(),
		member: z
			.object({
				id: z.string(),
				fullname: z.string(),
				username: z.string(),
				dateLastImpression: z.string(),
				email: z.string(),
				initials: z.string(),
				avatarURL: z.string(),
				memberType: z.string(),
				confirmed: z.boolean(),
			})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough();
export const TransferrableOrganization = z
	.object({
		transferrable: z.boolean(),
		newBillableMembers: z.array(
			z
				.object({
					id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
					fullName: z.string(),
					username: z.string(),
					initials: z.string(),
					avatarHash: z.string(),
				})
				.partial()
				.passthrough(),
		),
		restrictedMembers: z.array(
			z
				.object({
					id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
					fullName: z.string(),
					username: z.string(),
					initials: z.string(),
					avatarHash: z.string(),
				})
				.partial()
				.passthrough(),
		),
	})
	.partial()
	.passthrough();
export const idOrganizations = z.array(Organization);
export const ClaimableOrganizations = z
	.object({
		organizations: z.array(
			z
				.object({
					name: z.string(),
					displayName: z.string(),
					activeMembershipCount: z.number(),
					idActiveAdmins: z.array(TrelloID),
					products: z.array(z.number()),
					id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
					logoUrl: z.string().nullable(),
					dateLastActive: z.string().nullable(),
				})
				.partial()
				.passthrough(),
		),
		claimableCount: z.number(),
	})
	.partial()
	.passthrough();
export const PendingOrganizations = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idMember: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		memberRequestor: z
			.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), fullName: z.string()})
			.partial()
			.passthrough(),
		date: z.string(),
		displayName: z.string(),
		membershipCount: z.number(),
		logoUrl: z.string().nullable(),
		transferability: z
			.object({
				transferrable: z.boolean(),
				newBillableMembers: z.array(
					z
						.object({
							id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
							fullName: z.string(),
							username: z.string(),
							initials: z.string(),
							avatarHash: z.string(),
						})
						.partial()
						.passthrough(),
				),
				restrictedMembers: z.array(
					z
						.object({
							id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
							fullName: z.string(),
							username: z.string(),
							initials: z.string(),
							avatarHash: z.string(),
						})
						.partial()
						.passthrough(),
				),
			})
			.partial()
			.passthrough(),
	})
	.partial()
	.passthrough();
export const pos__2 = z.union([z.number(), z.enum(['top', 'bottom'])]).optional();
export const value__2 = z.union([z.string(), z.number(), z.enum(['top', 'bottom']), z.boolean()]).optional();
export const id = z.union([TrelloID, z.string()]);
export const BoardBackground = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
	.partial()
	.passthrough();
export const pos__3 = z.union([z.enum(['top', 'bottom']), z.number()]);
export const CustomEmoji = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), url: z.string(), name: z.string()})
	.partial()
	.passthrough();
export const CustomSticker = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		url: z.string(),
		scaled: z.array(
			z
				.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/)})
				.partial()
				.passthrough(),
		),
	})
	.partial()
	.passthrough();
export const Notification = z
	.object({
		id: z.string(),
		unread: z.boolean(),
		type: z.literal('cardDueSoon'),
		date: z.string(),
		dateRead: z.string(),
		data: z.string(),
		card: Card,
		board: Board,
		idMemberCreator: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idAction: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		reactions: z.array(z.any()),
	})
	.partial()
	.passthrough();
export const SavedSearch = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), name: z.string(), query: z.string(), pos: posStringOrNumber})
	.partial()
	.passthrough();
export const TokenPermission = z
	.object({
		idModel: z.union([TrelloID, z.literal('*')]),
		modelType: z.enum(['board', 'member', 'organization', 'enterprise']),
		read: z.boolean(),
		write: z.boolean(),
	})
	.partial()
	.passthrough();
export const Token = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		identifier: z.string(),
		idMember: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		dateCreated: z.string().datetime({offset: true}),
		dateExpires: z.string().datetime({offset: true}).nullable(),
		permissions: z.array(TokenPermission),
	})
	.partial()
	.passthrough();
export const BlockedKey = z.enum([
	'notification_comment_card',
	'notification_added_a_due_date',
	'notification_changed_due_date',
	'notification_card_due_soon',
	'notification_removed_from_card',
	'notification_added_attachment_to_card',
	'notification_created_card',
	'notification_moved_card',
	'notification_archived_card',
	'notification_unarchived_card',
]);
export const Channel = z.literal('email');
export const NotificationChannelSettings = z
	.object({
		id: z.string(),
		idMember: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		blockedKeys: z.array(BlockedKey),
		channel: Channel,
	})
	.partial()
	.passthrough();
export const put_members_id_notificationChannelSettings_channel_blockedKeys_Body = z
	.object({channel: Channel, blockedKeys: z.union([BlockedKey, z.array(BlockedKey)])})
	.passthrough();
export const put_members_id_notificationChannelSettings_channel_blockedKeys_Body__2 = z
	.object({blockedKeys: z.union([BlockedKey, z.array(BlockedKey)])})
	.passthrough();
export const Export = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		status: z.object({attempts: z.number(), finished: z.boolean(), stage: z.string()}).partial().passthrough(),
		startedAt: z.string().datetime({offset: true}),
		size: z.string().nullable(),
		exportUrl: z.string().nullable(),
	})
	.partial()
	.passthrough();
export const PluginData = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		idPlugin: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		scope: z.enum(['member', 'board', 'organization', 'card']),
		idModel: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		value: z.string(),
		access: z.enum(['private', 'shared']),
	})
	.partial()
	.passthrough();
export const id__2 = z.union([z.string(), TrelloID]);
export const Tag = z
	.object({id: TrelloID.regex(/^[0-9a-fA-F]{24}$/), name: z.string()})
	.partial()
	.passthrough();
export const post_plugins_idplugin_listing_Body = z
	.object({description: z.string(), locale: z.string(), overview: z.string(), name: z.string()})
	.partial()
	.passthrough();
export const PluginListing = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		name: z.string(),
		locale: z.string(),
		description: z.string(),
		overview: z.string(),
	})
	.partial()
	.passthrough();
export const idBoards = z.union([z.literal('mine'), TrelloID]).optional();
export const Webhook = z
	.object({
		id: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		description: z.string(),
		idModel: TrelloID.regex(/^[0-9a-fA-F]{24}$/),
		callbackURL: z.string(),
		active: z.boolean(),
		consecutiveFailures: z.number(),
		firstConsecutiveFailDate: z.string().nullable(),
	})
	.partial()
	.passthrough();
