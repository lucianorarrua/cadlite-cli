import React from 'react'
import { Typography } from "antd";
import { DownOutlined, CloseOutlined } from "@ant-design/icons";
import './index.scss'

const { Text } = Typography;

export default function ({
  stage,
  showDeleteButton = true,
  showCollapseButton = true,
  onDelete,
  onCollapse
}) {
  const iconParams = {
    height: 15,
    width: 15
  }

  const clickDeleteHandler = () => onDelete && onDelete(stage)

  const clickCollapseHandler = () => onCollapse && onCollapse(stage)

  return (
    <div className='tree-stage-item-mission-stages'>
      {showCollapseButton &&
        <DownOutlined
          {...iconParams}
          onClick={clickCollapseHandler}
        />}
      <Text>
        {stage.name}
      </Text>
      {showDeleteButton &&
        <CloseOutlined
          {...iconParams}
          onClick={clickDeleteHandler}
        />}
    </div>
  )
}