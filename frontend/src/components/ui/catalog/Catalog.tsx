'use client'

import { FC } from 'react'

import Loader from '../Loader'

import { IArticle } from '@/types/article.interface'
import Heading from '../Heading'
import ArticleItem from './article-item/ArticleItem'

interface ICatalog {
	data: IArticle[] | undefined
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ title, data, isLoading }) => {
	if (isLoading) return <Loader />
	return (
		<section>
			{title && <Heading className='mb-5 text-white'>{title}</Heading>}
			{data?.length ? (
				<>
					<div className='grid grid-cols-3 gap-10'>
						{data.map(article => (
							<ArticleItem key={article.id} article={article} />
						))}
					</div>
				</>
			) : (
				<div className=' text-white'>There are no articles</div>
			)}
		</section>
	)
}

export default Catalog
