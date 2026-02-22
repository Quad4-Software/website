export const en = {
	nav: {
		home: 'Home',
		about: 'About',
		contact: 'Contact',
		git: 'Git'
	},
	home: {
		metaDescription: 'Sovereign, decentralized, and privacy-first software tools.',
		badge: 'Privacy • Security • Efficiency',
		title: 'Software for a sovereign decentralized future.',
		subtitle: 'Building and improving software for everyone.',
		privacy: {
			title: 'Privacy-built',
			body: 'Local software, your data stays yours. No analytics, telemetry, or ads.'
		},
		secure: {
			title: 'Secure',
			body: 'Security-focused development practices and deployment options.'
		},
		efficient: {
			title: 'Efficient',
			body: 'Low resource usage and support for old and new systems.'
		},
		projects: 'Projects',
		comingSoon: 'Coming Soon',
		apps: {
			webnews: {
				title: 'WebNews',
				desc: 'Cross-platform news aggregator with built-in full-text extraction.'
			},
			softwareStation: {
				title: 'Software Station',
				desc: 'High-performance software distribution system.'
			},
			linkingTool: {
				title: 'Linking Tool',
				desc: 'Client-side mapping of relationships between entities.'
			},
			lxmfy: {
				title: 'LXMFy',
				desc: 'Framework for building autonomous entities on Reticulum.'
			},
			surveilled: {
				title: 'Surveilled',
				desc: 'A map of cameras in the world using OpenStreetMap data.'
			},
			meshchatx: {
				title: 'MeshChatX',
				desc: 'A Reticulum MeshChat fork from the future.'
			},
			reticulumGo: {
				title: 'Reticulum-Go',
				desc: 'Reticulum stack implementation in Go.'
			},
			lxmfCliChat: {
				title: 'LXMF-CLI-Chat',
				desc: 'Basic LXMF TUI and CLI Chat Client.'
			},
			rnsPageNode: {
				title: 'RNS-Page-Node',
				desc: 'A simple way to serve pages and files over the Reticulum network.'
			}
		},
		linkGit: 'Git',
		linkWebsite: 'Website'
	},
	about: {
		metaDescription: 'Who is Quad4: an entity of privacy-focused individuals building, funding (donating), and promoting sovereign, decentralized software.',
		title: 'About Quad4',
		lead: 'Quad4 is an entity of privacy-focused individuals dedicated to building, funding (donating), and promoting sovereign, decentralized software for everyone.',
		skills:
			'Our collective experience spans software development, privacy and security, ethical hacking, OSINT (open-source intelligence), GEOINT (geospatial intelligence), SIGINT (signals intelligence), counter-intel, anti-censorship tech, psychology, other intelligence and tradecraft, 3D printing, firearms, drones, radio, and related disciplines.',
		structure: 'There is no business, company, or the like. There is no formal membership, no hierarchy, and no leadership, only people contributing to the same goals.'
	},
	contact: {
		metaDescription: 'Get in touch with Quad4 via email or secure LXMF messaging.',
		title: 'Contact',
		directMethods: 'Direct Methods',
		email: 'Email',
		emailAddress: 'team@quad4.io',
		lxmf: 'LXMF (Reticulum) (Preferred)',
		address: '7cc8d66b4f6a0e0e49d34af7f6077b5a',
		reticulumClients: 'Reticulum clients and software',
		xmpp: 'XMPP',
		xmppAddress: 'team@chat.quad4.io'
	},
	footer: {
		brand: 'Quad4',
		tagline: 'Software you can own and control.',
		source: 'Website source',
		entity: 'Entity',
		legal: 'Legal',
		privacy: 'Privacy Policy',
		terms: 'Terms of Use',
		generativeAi: 'Generative AI',
		copyright: '© 2026 Quad4.'
	},
	generativeAi: {
		metaDescription: 'How Quad4 uses generative AI and LLMs: stylometry, self-hosted open weights models, and code usage rules.',
		title: 'Generative AI',
		intro: 'We may use generative AI (LLMs) to hide our stylometric footprint in text and code.',
		stylometryLink: 'https://www.whonix.org/wiki/Stylometry',
		stylometryLinkText: 'Stylometry (Whonix)',
		hosting:
			'We use a few different open-weights models, hosted on our own hardware, in VMs with GPU passthrough, and offline.',
		rulesTitle: 'Our LLM usage rules for code:',
		rules: [
			'Does not decide architecture decisions.',
			'Does not touch math-related code or cryptography functions.',
			'SAST, linting, tests (including property-based testing).',
			'No hardcoding dependency versions.'
		]
	},
	legal: {
		metaDescription: 'Legal documents for Quad4.',
		backToHome: 'Back to home',
		privacy: {
			metaDescription: 'Quad4 Privacy Policy: no tracking, analytics, or advertising. How we handle data and Shield.',
			title: 'Privacy Policy',
			lastUpdated: 'Last updated',
			lastUpdatedDate: 'February 2026',
			sections: [
				{
					heading: 'Overview',
					body: 'Quad4 respects your privacy. This site does not use tracking, analytics, or advertising. We do not collect personal data through this website beyond what you voluntarily send (e.g. via contact).'
				},
				{
					heading: 'Data we do not collect',
					body: 'We do not log visits, use cookies for tracking, or integrate third-party analytics. Server logs may contain IP and request metadata for operational and security purposes; we do not use them to profile users.'
				},
				{
					heading: 'Shield (reverse proxy)',
					body: 'This site is fronted by Quad4 Shield, a reverse-proxy security layer. Shield may process request metadata (e.g. IP, path, headers) for proof-of-work, flood and abuse limits, blocklists, and bans. Shield does not perform TLS termination or certificate issuance; that is handled by a proxy in front of it. We do not use Shield data for tracking or profiling.'
				},
				{
					heading: 'Contact',
					body: 'For privacy-related questions, contact us at team@quad4.io or via the contact page.'
				}
			]
		},
		terms: {
			metaDescription: 'Quad4 Terms of Use: use of this site, software and links, and changes to terms.',
			title: 'Terms of Use',
			lastUpdated: 'Last updated',
			lastUpdatedDate: 'February 2026',
			sections: [
				{
					heading: 'Use of this site',
					body: 'This website and its content are provided for informational purposes. You may use the site in accordance with applicable law. Do not attempt to disrupt the service or misuse our systems.'
				},
				{
					heading: 'Software and links',
					body: 'We self-host our Git (Gitea). Links to project pages or other third-party sites may be outside our control. Software we develop may have its own licenses and terms; see the respective repositories and documentation.'
				},
				{
					heading: 'Changes',
					body: 'We may update these terms and the content on this site from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.'
				}
			]
		}
	},
	company: {
		summary:
			'Quad4 builds sovereign, decentralized, and privacy-first software. We develop local and self-hosted tools and open-source software for the broader community. Our products include WebNews, Software Station, Linking Tool, LXMFy, Surveilled, and MeshChatX.',
		targetCustomers:
			'Target customers: researchers, organizations needing self-hosted or custom software, and users who want to own and control their tools and data.',
		contactEmail: 'Contact: team@quad4.io'
	},
	a11y: {
		toggleTheme: 'Toggle theme'
	}
} as const;

export type Messages = typeof en;
