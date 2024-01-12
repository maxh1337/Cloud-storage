import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { FileService } from 'src/file/file.service'
import { PrismaService } from 'src/prisma.service'
import { CreateThemeDto } from './dto/create-folder.dto'

@Injectable()
export class ThemeService {
	constructor(
		private prisma: PrismaService,
		private fileService: FileService
	) {}

	async getAll() {
		return await this.prisma.theme.findMany({
			select: {
				id: true,
				themeName: true,
				themeCode: true,
				themeHead: true,
				startDate: true,
				endDate: true,
				files: true
			}
		})
	}

	async getById(id: number) {
		const isExist = await this.prisma.theme.findUnique({
			where: {
				id
			}
		})

		if (!isExist) throw new NotFoundException('Theme not found')

		return this.prisma.theme.findUnique({
			where: {
				id
			},
			select: {
				id: true,
				themeName: true,
				themeCode: true,
				themeHead: true,
				startDate: true,
				endDate: true,
				files: true
			}
		})
	}

	async create(dto: CreateThemeDto) {
		const isExist = await this.prisma.theme.findUnique({
			where: { themeName: dto.themeName }
		})

		if (isExist)
			throw new BadRequestException('Theme with that name already Exist')

		const theme = await this.prisma.theme.create({
			data: {
				themeName: dto.themeName,
				themeCode: dto.themeCode,
				themeHead: dto.themeHead,
				endDate: dto.endDate
			},
			include: {
				files: true
			}
		})

		return theme
	}

	async delete(id: number) {
		const isExist = await this.prisma.theme.findUnique({
			where: {
				id
			},
			include: {
				files: true
			}
		})

		if (!isExist) throw new NotFoundException('Theme not found')

		if (isExist.files.length !== 0) {
			isExist.files.map(file => {
				this.fileService.deleteFile(file.id)
			})
		}

		return await this.prisma.theme.delete({
			where: {
				id
			}
		})
	}
}
