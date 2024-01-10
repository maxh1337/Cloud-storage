import { IsEmail, IsOptional, IsString } from 'class-validator'

export class UserDto {
	@IsOptional()
	@IsEmail()
	email: string

	@IsOptional()
	@IsString()
	password?: string
}
