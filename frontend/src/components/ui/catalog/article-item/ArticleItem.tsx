import { FC } from 'react'

import { IArticle } from '@/types/article.interface'

const ArticleItem: FC<{ article: IArticle }> = ({ article }) => {
	return (
		<div className='animate-scaleIn'>
			<h3 className='mt-2 font-semibold text-white text-xl pb-2'>
				«{article.name}»
			</h3>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Категория:</dt>
				<dt className=' ml-2 text-white'>{article.category.name}</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Автор:</dt>
				<dt className=' ml-2 text-white '>{article.author.name}</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Журнал:</dt>
				<dt className=' ml-2 text-white '>
					{article.journal?.name ? article.journal?.name : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Газета:</dt>
				<dt className=' ml-2 text-white '>
					{article.newsPaper?.name ? article.newsPaper?.name : ' — '}
				</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Номер статьи:</dt>
				<dt className=' ml-2 text-white'>{article.articleNumber}</dt>
			</div>
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Начальная страница:</dt>
				<dt className=' ml-2 text-white'>{article.startPage}</dt>
			</div>
			{article.keywords.length ? (
				<ul className='block pl-2 my-2'>
					{article.keywords.map(keyword => (
						<li key={keyword} className=' inline-block list-none mr-2'>
							<p className=' block px-2 py-0.5 border-gray2 border border-1 rounded-lg text-white text-xs'>
								{keyword}
							</p>
						</li>
					))}
				</ul>
			) : null}
			<div className=' flex pl-2'>
				<dt className=' text-gray2'>Дата выпуска:</dt>
				<dt className=' ml-2 text-white'>{article.year}</dt>
			</div>
		</div>
	)
}

export default ArticleItem
