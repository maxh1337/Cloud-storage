import { FC } from 'react'

import { IJournal } from '@/types/journal.interface'

const AnotherItem: FC<{ item: IJournal }> = ({ item }) => {
	return (
		<div className='animate-scaleIn'>
			<h3 className='mt-2 font-semibold text-white text-xl pb-2'>
				«{item.name}»
			</h3>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Номер:</dt>
				<dt className=' ml-2 text-white'>{item.number}</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Дата выпуска:</dt>
				<dt className=' ml-2 text-white'>{item.year}</dt>
			</div>
			{item.articles.length ? (
				<ul className='block pl-2 my-2'>
					{item.articles.map(item => (
						<li key={item.id} className=' inline-block list-none mr-2'>
							<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
								{item.name}
							</p>
						</li>
					))}
				</ul>
			) : (
				<dt className=' text-red pl-2'>Статей нет</dt>
			)}
		</div>
	)
}

export default AnotherItem
