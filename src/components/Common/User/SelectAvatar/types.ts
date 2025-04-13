export interface ISelectAvatar {
	avatar: string;
	onDeleteAvatar: () => Promise<{ ok: boolean }>;
	onChangeAvatar: (newAvatar: string) => void;
	variant?: 'volunteer' | 'nko';
}
