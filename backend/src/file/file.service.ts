import { Injectable, NotFoundException } from '@nestjs/common'
import { unlink } from 'fs/promises'
import { PrismaService } from 'src/prisma.service'
import { UploadFileFormDataDto } from './dto/upload-file-query.dto'

@Injectable()
export class FileService {
	constructor(private prisma: PrismaService) {}

	async getAllFiles() {
		return await this.prisma.file.findMany({})
	}

	async getAllThemeFiles(themeId: number) {
		return await this.prisma.file.findMany({
			where: {
				themeId: themeId
			}
		})
	}

	async uploadFile(
		file: Express.Multer.File,
		themeId: number,
		dto: UploadFileFormDataDto
	) {
		const linkedTheme = await this.prisma.theme.findUnique({
			where: {
				id: themeId
			}
		})

		console.log(themeId)

		if (!linkedTheme) throw new NotFoundException('Theme not found')

		const uploadedFile = await this.prisma.file.create({
			data: {
				fileName: file.filename,
				originalName: file.originalname,
				size: file.size,
				mimeType: file.mimetype,
				theme: {
					connect: {
						id: themeId
					}
				},
				themeName: linkedTheme.themeName,
				executorName: dto.executorName,
				developmentDepartment: dto.developmentDepartment
			}
		})

		return uploadedFile
	}

	async downloadFile(fileId: number) {
		const file = await this.prisma.file.findUnique({
			where: {
				id: fileId
			}
		})

		if (!file) throw new NotFoundException('File not found')

		return file
	}

	async deleteFile(fileId: number) {
		const file = await this.prisma.file.findUnique({
			where: {
				id: fileId
			}
		})

		if (!file) throw new NotFoundException('File not found')

		await unlink(`./uploads/${file.fileName}`)

		await this.prisma.file.delete({
			where: {
				id: fileId
			}
		})

		return file
	}
}
