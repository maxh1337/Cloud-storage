export const ARTICLES = 'article'

export type TypeArticleData = {
	name: string
	price: number
	description?: string
	images: string[]
	categoryId: number
}

export type TypeArticleDataFilters = {
	searchTerm?: string
	categoryId?: string
	yearFrom?: string
	yearTo?: string
}

export type TypeParamsFilters = {
	searchParams: TypeArticleDataFilters
}
