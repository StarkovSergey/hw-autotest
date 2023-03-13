import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'
import s from './SuperButton.module.css'
import clsx from 'clsx'

// тип пропсов обычной кнопки, children в котором храниться название кнопки там уже описан
type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

type SuperButtonPropsType = DefaultButtonPropsType & {
  xType?: string
}

const SuperButton: React.FC<SuperButtonPropsType> = ({
                                                       xType,
                                                       className,
                                                       disabled,
                                                       ...restProps // все остальные пропсы попадут в объект restProps, там же будет children
                                                     }) => {
  const finalClassName = clsx(s.button, !xType && s.default, xType === 'red' && s.red, xType === 'secondary' && s.secondary, disabled && s.disabled)

          // s.button + '' + (disabled ? s.disabled : xType === 'red' ? s.red + s.secondary : s.default) // задачка на смешивание классов

  return (<button
      disabled={disabled}
      className={finalClassName}
      {...restProps} // отдаём кнопке остальные пропсы если они есть (children там внутри)
    />)
}

export default SuperButton
