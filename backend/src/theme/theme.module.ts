import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma.service'
import { FolderController } from './theme.controller'
import { ThemeService } from './theme.service'

@Module({
	controllers: [FolderController],
	providers: [ThemeService, PrismaService]
})
export class ThemeModule {}
