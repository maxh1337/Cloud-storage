import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	UsePipes,
	ValidationPipe
} from '@nestjs/common'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CreateThemeDto } from './dto/create-folder.dto'
import { ThemeService } from './theme.service'

@Controller('folder')
export class FolderController {
	constructor(private readonly themeService: ThemeService) {}

	@Get()
	// @Auth()
	async getAll() {
		return this.themeService.getAll()
	}

	@Get(':id')
	// @Auth()
	async getById(@Param('id') id: string) {
		return this.themeService.getById(+id)
	}

	@Post()
	@Auth()
	@UsePipes(new ValidationPipe())
	async createFolder(@Body() dto: CreateThemeDto) {
		return this.themeService.create(dto)
	}

	@Delete('delete/:id')
	@Auth()
	async delete(@Param('id') id: string) {
		return this.themeService.delete(+id)
	}
}
