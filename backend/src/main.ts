import { NestFactory } from '@nestjs/core'
import * as express from 'express'
import { join } from 'path'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.setGlobalPrefix('api')

	app.enableCors()

	app.enableShutdownHooks()

	app.use('/uploads', express.static(join(__dirname, '..', 'uploads')))

	await app.listen(4200)
}
bootstrap()
