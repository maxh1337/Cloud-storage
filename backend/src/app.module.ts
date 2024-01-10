import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { FileModule } from './file/file.module'
import { PrismaService } from './prisma.service'

import { ThemeModule } from './theme/theme.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		AuthModule,
		UserModule,
		FileModule,
		ThemeModule
	],
	controllers: [AppController],
	providers: [AppService, PrismaService]
})
export class AppModule {}
