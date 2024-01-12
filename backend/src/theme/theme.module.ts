import { Module } from '@nestjs/common'
import { FileService } from 'src/file/file.service'
import { PrismaService } from 'src/prisma.service'
import { FolderController } from './theme.controller'
import { ThemeService } from './theme.service'

@Module({
	controllers: [FolderController],
	providers: [ThemeService, PrismaService, FileService]
})
export class ThemeModule {}
