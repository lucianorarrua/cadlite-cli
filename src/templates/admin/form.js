import { Form, Input } from 'antd'
import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import GenericModal from '../components/genericModal'
import './index.scss'

const FormUser = ({
  creating,
  updating,
  onClose,
  onFinish,
  show,
  isEdit,
  data
}) => {
  const { t } = useTranslation('translations')
  const [form] = Form.useForm()
  const [onCreate, onUpdate] = onFinish
  const [counters, setCounters] = useState({ })

  useEffect(() => {
    if (show) {
      checkEdit()
    }
  }, [show])

  const setCount = v => {
    setCounters(s => {
      return { ...s, [v]: form.getFieldValue(v)?.length }
    })
  }

  const checkCount = () => {
    Object.keys(form.getFieldsValue()).forEach(key => {
      typeof form.getFieldValue(key) === 'string' && setCount(key)
    })
  }

  const clear = () => {
    form.resetFields()
  }

  const checkEdit = () => {
    if (isEdit && data) {
      form.setFieldsValue({
        name: data?.name,
        active: data.active,
        description: data.description
      })
    } else {
      form.resetFields()
    }
    checkCount()
  }

  const submitFormHandler = values => {
    if (isEdit) {
      onUpdate({ ...values, active: data.active, id: data.id })
    } else {
      values.active = true
      onCreate({ ...values, active: true })
    }
  }

  const cancelModalHandler = () => {
    onClose && onClose()
    clear()
  }

  return (
    <GenericModal
      form={form}
      title={`${!isEdit ? t('admin_modal.Add') : t('admin_modal.EDIT')} ${t('<%= adminNameSnakeCase %>_admin.title')}`}
      visible={show}
      creating={creating}
      updating={updating}
      className='add-<%= adminNameKebabCase %>-cadlite-<%= hash %>'
      onCancel={cancelModalHandler}
      closable
    >
      <Form
        form={form}
        layout='vertical'
        onFinish={submitFormHandler}
      >
        <Form.Item
          required={false}
          label={`${t('<%= adminNameSnakeCase %>_admin.name')}*`}
          name='name'
          rules={[
            {
              required: true,
              message: t('admin_form.camp_obl')
            },
            {
              max: 30,
              message: 'Debe tener 30 caracteres como máximo'
            },
            {
              message: t('admin_form.camp_span'),
              pattern: new RegExp(/^\S/, 'gm')
            },
            {
              message: t('admin_form.camp_fin'),
              pattern: new RegExp(/\S$/, 'gm')
            }
          ]}
        >
          <Input
            suffix={<p style={{ color: '#838383', margin: 0 }}>{`${counters.name || 0}/30`}</p>}
            maxLength={30}
            placeholder={t('placeholder.corp')}
            onChange={() => setCount('name')}
          />
        </Form.Item>
        <Form.Item
          required={false}
          label={`${t('<%= adminNameSnakeCase %>_admin.description')}`}
          name='description'
          rules={[
            {
              max: 300,
              message: t('admin_form.camp_300')
            },
            {
              message: t('admin_form.camp_span'),
              pattern: new RegExp(/^\S/, 'gm')
            },
            {
              message: t('admin_form.camp_fin'),
              pattern: new RegExp(/\S$/, 'gm')
            }
          ]}
        >
          <Input.TextArea
            maxLength={300}
            showCount
            autoSize={{ minRows: 4, maxRows: 7 }}
            onChange={() => setCount('description')}
            className='input-form'
          />
        </Form.Item>
      </Form>
    </GenericModal>

  )
}

export default FormUser
