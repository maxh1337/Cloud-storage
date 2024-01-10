import { FC, useEffect, useState } from 'react'

import { useDebounce } from '@/hooks/useDebounce'

import { IArticle } from '@/types/article.interface'
import { QueryObserverResult, RefetchOptions } from '@tanstack/react-query'
import styles from './Range.module.scss'

interface IRange {
	min?: number
	max: number
	fromInitialValue?: string
	toInitialValue?: string
	onChangeFromValue: (value: string) => void
	onChangeToValue: (value: string) => void
	refetch: (
		options?: RefetchOptions | undefined
	) => Promise<QueryObserverResult<IArticle[], Error>>
}

const Range: FC<IRange> = ({
	min = 0,
	max = 2024,
	onChangeFromValue,
	onChangeToValue,
	fromInitialValue,
	toInitialValue,
	refetch
}) => {
	const [fromValue, setFromValue] = useState(fromInitialValue || '')
	const [toValue, setToValue] = useState(toInitialValue || '')

	const debouncedFromValue = useDebounce(fromValue, 500)
	const debouncedToValue = useDebounce(toValue, 500)

	useEffect(() => {
		onChangeFromValue(debouncedFromValue)
		refetch()
	}, [debouncedFromValue])

	useEffect(() => {
		onChangeToValue(debouncedToValue)
		refetch()
	}, [debouncedToValue])

	return (
		<div className={styles.range}>
			<input
				min={min}
				max={max}
				type='number'
				placeholder='From'
				value={fromValue}
				onChange={e => setFromValue(e.target.value)}
			/>
			{' - '}
			<input
				min={min}
				max={max}
				type='number'
				placeholder='To'
				value={toValue}
				onChange={e => setToValue(e.target.value)}
			/>
		</div>
	)
}

export default Range
