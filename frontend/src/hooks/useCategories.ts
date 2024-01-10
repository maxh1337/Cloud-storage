import { useQuery } from '@tanstack/react-query'

import { CategoryService } from '@/services/category.service'
import { useAuth } from './useAuth'

export function useCategories() {
	const { data, isLoading } = useQuery({
		queryKey: ['get categories'],
		queryFn: () => CategoryService.getAll(),
		select: ({ data }) => data
	})
	return { data, isLoading }
}

export function useCategoryById(id: number) {
	const { user } = useAuth()

	const { data, isLoading } = useQuery({
		queryKey: ['get category by id'],
		queryFn: () => CategoryService.getById(id),
		select: ({ data }) => data,
		enabled: !!user
	})

	return { data, isLoading }
}
