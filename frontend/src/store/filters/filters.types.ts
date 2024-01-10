import { TypeArticleDataFilters } from '@/services/article/article.types'

export interface IFiltersState {
	isFilterUpdated: boolean
	queryParams: TypeArticleDataFilters
}

export interface IFiltersActionsPayload {
	key: keyof TypeArticleDataFilters
	value: string
}
