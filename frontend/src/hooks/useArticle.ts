'use client'

import { ArticleService } from '@/services/article/article.service'
import { useQuery } from '@tanstack/react-query'
import { useAuth } from './useAuth'

export function useArticles() {
	const { user } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['get articles'],
		queryFn: () => ArticleService.getAll(),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading }
}

export function useArticlesByCategoryId(id: number) {
	const { user } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['get articles by id'],
		queryFn: () => ArticleService.getByCategoryId(id),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading }
}
