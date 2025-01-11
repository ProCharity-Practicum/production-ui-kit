import clsx from 'clsx';
import styles from './Footer.module.scss';
import React from 'react';
import { Anchor } from '@/components/Core/Anchor/Anchor.tsx';

export interface LinkTo {
	linkTitle: string;
	url: string;
}

export interface Column {
	columnTitle: string;
	links: LinkTo[];
}

export interface Sponsor {
	name: string;
	logo: React.ReactNode;
	url: string;
}

export interface SocialLink {
	icon: React.ReactNode;
	name?: string;
	url: string;
}

export type FooterProps = {
	className?: string;
	columns: Column[];
	copyright?: string;
	sponsors?: Sponsor[];
	socialLinks?: SocialLink[];
};

export function Footer({
	className,
	columns,
	copyright,
	sponsors,
	socialLinks,
}: FooterProps) {
	return (
		<footer className={clsx(styles.footer, className)} data-testid="Footer">
			<div className={styles.container}>
				<nav className={clsx(styles.sectionColumns, className)}>
					{columns.map((column, index) => (
						<div key={index} className={clsx(styles.column, className)}>
							<span className={clsx(styles.columnTitle, className)}>
								{column.columnTitle}
							</span>
							<ul className={clsx(styles.sectionLinks, className)}>
								{column.links.map((link, linkIndex) => (
									<li
										key={linkIndex}
										className={clsx(styles.linkItem, className)}
									>
										<Anchor
											href={link.url}
											className={clsx(styles.link, className)}
										>
											{link.linkTitle}
										</Anchor>
									</li>
								))}
							</ul>
						</div>
					))}
				</nav>

				<div className={clsx(styles.partners, className)}>
					{sponsors && (
						<section className={styles.sponsors}>
							{sponsors.map((sponsor, index) => (
								<Anchor
									key={index}
									href={sponsor.url}
									className={styles.sponsorLink}
									aria-label={clsx(sponsor.name, className)}
								>
									{sponsor.logo}
								</Anchor>
							))}
						</section>
					)}

					{socialLinks && (
						<section className={clsx(styles.social, className)}>
							{socialLinks.map((social, index) => (
								<Anchor
									key={index}
									href={social.url}
									className={clsx(styles.socialLink, className)}
									aria-label="Social link"
								>
									{social.icon}
									<span className={clsx(styles.socialText, className)}>
										{social.name}
									</span>
								</Anchor>
							))}
						</section>
					)}
				</div>

				{copyright && (
					<div className={clsx(styles.copyright, className)}>
						<p>{copyright}</p>
					</div>
				)}
			</div>
		</footer>
	);
}
