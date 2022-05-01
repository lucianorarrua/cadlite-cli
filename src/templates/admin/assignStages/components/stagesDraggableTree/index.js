import React, { useState, useEffect } from 'react'
import { Tree } from "antd";
import TreeStageItem from "../treeStageItem";
import './index.scss'

/**
 * @typedef {{ id: number,name: string, backgroundColor: string, textColor: string, nextStages: StageTreeItem[]}} Stage
 * @typedef {{ id: number, name: string, nextStages: StageTreeItem[]}} StageTreeItem
 * @typedef {{ title: JSX.Element, key: string, children: StageTreeNode[]}} StageTreeNode
 */

export default function ({ currentMissionStages = [], loadingCurrentMissionStages }) {
    const [treeData, setTreeData] = useState([]);
    const [expandedKeys, setExpandedKeys] = useState([])

    useEffect(() => {
        const firstStage = (currentMissionStages || []).find(cms => cms.stageLast === null);
        if (!!firstStage) {
            const tree = createNode(firstStage, currentMissionStages)
            setTreeData([tree]);
            setExpandedKeys(getKeys(tree))
        }
    }, [currentMissionStages])

    useEffect(() => {
        console.log("🚀 ~ file: index.js ~ line 55 ~ treeData", treeData)
    }, [treeData])

    /**
     * Recibe un nodo y devuelve un arreglo con su key y las keys de todos los nodos hijos/nieto/etc.
     * @param {StageTreeNode} node - Nodo a partir del cual se desea obtener las keys. Si se envía el nodo root se recibirán todas las keys.
     */
    const getKeys = (node) => {
        let childrenKeys = []
        if (!!node.children?.length) {
            childrenKeys = node.children.map(getKeys);
        }
        return [node.key, ...childrenKeys].flat();
    }

    /**
     * Función recursiva para crear los nodos del arbol
     * @param {{stage:Stage, stageLast:number?}} stageItem - Una stage de la misión (item de respuesta del backend).
     * @param {{stage:Stage, stageLast:number?}[]} missionStageList - Lista de todas las stages de la misión (arreglo de la respuesta del backend).
     * @param {string} parentKey - Key padre del nodo a crear. Si es el nodo raíz se envía vacío.
     * @returns {StageTreeNode}
     */
    const createNode = (stageItem, missionStageList, parentKey) => {
        const keyNode = `${parentKey ? parentKey + '-' : ''}${stageItem.stage.id}`;
        const nextStages = missionStageList.filter(stage => stage.stageLast === stageItem.stage.id)
        return {
            title: <TreeStageItem
                stage={stageItem.stage}
                onDelete={deleteClickItemHandler}
                onCollapse={() => collapseClickItemHandler(keyNode)}
            />,
            key: keyNode,
            children: nextStages?.map(childrenStage => createNode(childrenStage, missionStageList, keyNode))
        };
    }

    const collapseClickItemHandler = (keyNode) => setExpandedKeys(eKeys => {
        const deleteKeyIndex = eKeys.findIndex((v) => v === keyNode);
        if (deleteKeyIndex === -1) {
            return [...eKeys, keyNode]
        }
        let newArray = [...eKeys];
        newArray.splice(deleteKeyIndex, 1);
        return newArray;

    })

    const deleteClickItemHandler = (stage) => {
        // TODO acá llamar al endpoint para eliminar la stage
        console.log("🚀 ~ file: index.js ~ line 83 ~ deleteClickItemHandler ~ stage", stage)
    }

    const dragEnterHandler = info => {
        //console.log(info);
        // expandedKeys 需要受控时设置
        // this.setState({
        //   expandedKeys: info.expandedKeys,
        // });
    };

    const dropHandler = info => {
        console.log(info);
        const dropKey = info.node.key;
        console.log("🚀 ~ file: index.js ~ line 89 ~ dropKey", dropKey)
        const dragKey = info.dragNode.key;
        console.log("🚀 ~ file: index.js ~ line 91 ~ dragKey", dragKey)
        const dropPos = info.node.pos.split('-');
        console.log("🚀 ~ file: index.js ~ line 93 ~ dropPos", dropPos)
        const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);
        console.log("🚀 ~ file: index.js ~ line 95 ~ dropPosition", dropPosition)
        debugger
        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].key === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };
        const data = [...treeData];

        // Find dragObject
        let dragObj;
        loop(data, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!info.dropToGap) {
            // Drop on the content
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
            });
        } else if (
            (info.node.props.children || []).length > 0 && // Has children
            info.node.props.expanded && // Is expanded
            dropPosition === 1 // On the bottom gap
        ) {
            loop(data, dropKey, item => {
                item.children = item.children || [];
                // where to insert 示例添加到头部，可以是随意位置
                item.children.unshift(dragObj);
                // in previous version, we use item.children.push(dragObj) to insert the
                // item to the tail of the children
            });
        } else {
            let ar;
            let i;
            loop(data, dropKey, (item, index, arr) => {
                ar = arr;
                i = index;
            });
            if (dropPosition === -1) {
                ar.splice(i, 0, dragObj);
            } else {
                ar.splice(i + 1, 0, dragObj);
            }
        }
        setTreeData(data);
    };

    return (
        <Tree
            className="stages-draggable-tree"
            expandedKeys={expandedKeys}
            disabled={loadingCurrentMissionStages}
            draggable
            blockNode
            selectable={false}
            onDragEnter={dragEnterHandler}
            onDrop={dropHandler}
            showIcon={false}
            treeData={treeData}
        />
    )
}
