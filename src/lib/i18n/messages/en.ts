export const en = {
	nav: {
		home: 'Home',
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
	contact: {
		metaDescription: 'Get in touch with Quad4 via email or secure LXMF messaging.',
		title: 'Contact',
		directMethods: 'Direct Methods',
		email: 'Email',
		emailAddress: 'team@quad4.io',
		lxmf: 'LXMF (Reticulum)',
		address: '7cc8d66b4f6a0e0e49d34af7f6077b5a'
	},
	footer: {
		brand: 'Quad4',
		tagline: 'Software you can own and control.',
		entity: 'Entity',
		legal: 'Legal',
		privacy: 'Privacy Policy',
		terms: 'Terms of Use',
		copyright: '© 2026 Quad4.'
	},
	legal: {
		metaDescription: 'Legal documents for Quad4.',
		backToHome: 'Back to home',
		privacy: {
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
					heading: 'Contact',
					body: 'For privacy-related questions, contact us at team@quad4.io or via the contact page.'
				}
			]
		},
		terms: {
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
