import React from 'react'
import { useTranslation } from 'react-i18next'
import './index.scss'

export default function () {
  const { t } = useTranslation('translations')
  return (
    <div className='<%= className %>'>
      {/*
      DESARROLLAR COMPONENTE
      */}
    </div>
  )
}
