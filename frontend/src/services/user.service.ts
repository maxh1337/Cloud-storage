import { IUser } from '@/types/user.interface'

import { instance } from '@/api/api.interceptor'

const USERS = 'users'

export const UserService = {
	async getProfile() {
		return instance<IUser>({
			url: `${USERS}/profile`,
			method: 'GET'
		})
	}
}
