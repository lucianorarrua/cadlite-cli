import React, { useMemo } from 'react'
import { Col, Row, Switch } from 'antd'
import { useTranslation } from 'react-i18next'
import { getByFilter, createRecord, updateRecord, deleteRecord } from './redux-sagas/actions'
import { useTable } from 'hooks/useTable'
import Head from '../components/header/head'
import FormAddEditModal from './form'
import Message from 'features/aliados/dashboard/messageModal/messageModal'
import TableAliados from 'components/customTable/tableAliados'
import EditButton from 'cad-lite/Admin/components/editButton'
import './index.scss'

export default () => {
  const { t } = useTranslation('translations')
  const {
    onCreate,
    onChange,
    onSearch,
    onUpdate,
    onSelect,
    onCheckChange,
    data: {
      items,
      total,
      loading,
      creating,
      options,
      updating,
      statusLoading,
      loadingAuto,
      innerState: { openModal, showMessage }
    },
    innerStateMethod: { setOpenModal, setShowMessage }
  } = useTable({
    reducer: '<%= reducerName %>',
    getByFilter,
    createRecord,
    updateRecord,
    deleteRecord,
    onFinish: ({ message }) => message && setShowMessage(message)
  })

  const columns = [
    {
      index: 'name',
      name: 'Sample',
      sort: true
    },
    {
      index: 'active',
      name: t('admin_dashboard.Estado'),
      sort: false,
      render: (status, row) => (
        <Row align='middle'>
          <Switch loading={statusLoading[row.id]} onChange={v => onCheckChange(row, v)} checked={status} />
          <p style={{ margin: '0 0 0 10px' }}>
            {status ? t('admin_dashboard.Switch_on') : t('admin_dashboard.Switch_off')}
          </p>
        </Row>
      )
    },
    {
      index: 'option',
      name: t('admin_dashboard.Options'),
      sort: false,
      render: (_, r) => (
        <Row justify='space-between' wrap={false} className='option-row-admin-cadlite'>
          <Col>
            <EditButton onClick={() => setOpenModal(r)} />
          </Col>
        </Row>
      )
    }
  ]

  const HeadMemorized = useMemo(() => {
    const onClickAgregarHandler = () => setOpenModal(true)
    return (
      <Head
        title={t('<%= adminNameSnakeCase %>_admin.title')}
        buttonText={t('header_admin.button')}
        onClick={onClickAgregarHandler}
        options={options}
        handleSearch={onSearch}
        onSelect={onSelect}
        loadingAuto={loadingAuto}
      />
    )
  }, [t, options, loadingAuto])

  const TableMemorized = useMemo(() => (
    <TableAliados
      labelPagination={t('perfil_admin.filter_pag')}
      loading={loading}
      columns={columns}
      body={items}
      change={onChange}
      total={total}
    />), [t, loading, columns, items, total])

  const FormAddMemorized = useMemo(() => (
    <FormAddEditModal
      show={!!openModal}
      isEdit={typeof openModal === 'object'}
      data={typeof openModal === 'object' ? openModal : {}}
      creating={creating}
      updating={updating}
      onClose={() => setOpenModal(false)}
      onFinish={[onCreate, onUpdate]}
    />), [openModal, creating, updating, onCreate, onUpdate, setOpenModal])

  return (
    <div className='<%= adminNameKebabCase %>-cadlite-<%= hash %> catalogue-card'>
      {HeadMemorized}
      <div className='catalogue-card-body'>
        {TableMemorized}
      </div>
      {FormAddMemorized}
      <Message showMessage={showMessage} cancel={() => setShowMessage(false)} title={showMessage} />
    </div>
  )
}
