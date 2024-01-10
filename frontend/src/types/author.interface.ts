import { IArticle } from './article.interface'

export interface IAuthor {
	id: number
	name: string
	articles: IArticle[]
}
