'use client'

import { FC } from 'react'

import Loader from '../Loader'

import { IJournal } from '@/types/journal.interface'
import Heading from '../Heading'
import AnotherItem from './article-item/AnotherItem'

interface ICatalog {
	data: IJournal[] | undefined
	isLoading?: boolean
	title?: string
}

const AnotherCatalog: FC<ICatalog> = ({ title, data, isLoading }) => {
	if (isLoading) return <Loader />
	return (
		<section>
			{title && <Heading className='mb-5 text-white'>{title}</Heading>}
			{data?.length ? (
				<>
					<div className='grid grid-cols-3 gap-10'>
						{data.map(item => (
							<AnotherItem key={item.id} item={item} />
						))}
					</div>
				</>
			) : (
				<div className=' text-white'>There are no articles</div>
			)}
		</section>
	)
}

export default AnotherCatalog
