import { IsDateString, IsString } from 'class-validator'

export class CreateThemeDto {
	@IsString()
	themeName: string

	@IsString()
	themeCode: string

	@IsString()
	themeHead: string

	@IsDateString()
	endDate: string
}
