import { IsString } from 'class-validator'

export class UploadFileFormDataDto {
	@IsString()
	executorName: string

	@IsString()
	developmentDepartment: string
}
