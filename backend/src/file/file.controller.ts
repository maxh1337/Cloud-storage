import {
	Body,
	Controller,
	Delete,
	Get,
	MaxFileSizeValidator,
	Param,
	ParseFilePipe,
	Post,
	Res,
	StreamableFile,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { Response } from 'express'
import { createReadStream } from 'fs'
import { join } from 'path'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UploadFileFormDataDto } from './dto/upload-file-query.dto'
import { FileService } from './file.service'
import { fileStorage } from './storage'

@Controller('file')
export class FileController {
	constructor(private readonly fileService: FileService) {}

	@Get()
	@Auth()
	async getAll() {
		return this.fileService.getAllFiles()
	}

	@Get('getByTheme/:id')
	@Auth()
	async getAllThemeFiles(@Param('id') id: string) {
		return this.fileService.getAllThemeFiles(+id)
	}

	@Get('download/:fileId')
	@Auth()
	async downloadFile(
		@Param('fileId') fileId: string,
		@Res({ passthrough: true }) res: Response
	): Promise<StreamableFile> {
		const file = await this.fileService.downloadFile(+fileId)
		res.set({
			'Content-Type': 'application/json',
			'Content-Disposition': `attachment; filename=${file.originalName}`
		})

		const strmFile = createReadStream(
			join(process.cwd(), `./uploads/${file.fileName}`)
		)

		return new StreamableFile(strmFile)
	}

	@Post('upload/:themeId')
	@Auth()
	@UseInterceptors(
		FileInterceptor('file', {
			storage: fileStorage
		})
	)
	async upload(
		@UploadedFile(
			new ParseFilePipe({
				validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 20 })]
			})
		)
		file: Express.Multer.File,
		@Param('themeId') themeId: string,
		@Body() dto: UploadFileFormDataDto
	) {
		return this.fileService.uploadFile(file, +themeId, dto)
	}

	@Auth()
	@Delete('delete/:fileId')
	async deleteFile(
		@CurrentUser('id') id: number,
		@Param('fileId') fileId: string
	) {
		return this.fileService.deleteFile(+fileId)
	}
}
