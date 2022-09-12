import React from 'react'
import classNames from 'classnames'

type ButtonProps = {
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	className: string;
	outline?: React.ReactNode;
	disabled?: React.ReactNode;
	children?: React.ReactNode
}

export const Button: React.FC<ButtonProps> = ({ onClick, className, outline, disabled, children }) => {
	return (
		<button
			onClick={onClick}
			className={classNames('button', className, {
				'button--outline': outline,
				'button--disabled': disabled
			})}
		>
			{children}
		</button>
	)
}