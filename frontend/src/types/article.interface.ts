import { IAuthor } from './author.interface'
import { ICategory } from './category.interface'
import { IJournal } from './journal.interface'
import { INewspaper } from './newspaper.interface'

export interface IArticle {
	id: number
	name: string
	category: ICategory
	author: IAuthor
	journal?: IJournal
	newsPaper?: INewspaper
	keywords: string[]
	year: number
	articleNumber: number
	startPage: number
}

export interface IArticleDetails {
	articles: IArticle
}

export type TypeArticles = {
	articles: IArticle[]
}

export type TypePaginationArticles = {
	length: number
	articles: IArticle[]
}
