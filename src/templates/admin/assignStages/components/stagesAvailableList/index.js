import React, { memo } from 'react'
import TreeStageItem from "../treeStageItem";
import './index.scss'

export default memo(function ({ availableMissionStages = [] }) {
    return (
        <div className="stage-available-list-to-assign">
            {availableMissionStages.map(stage =>
                <TreeStageItem
                    key={stage.id}
                    stage={stage}
                    showCollapseButton={false}
                    showDeleteButton={false}
                />)}
        </div>
    )
})
