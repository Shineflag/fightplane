

import { _decorator, Component, Node, Prefab, NodePool, instantiate } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 
 * Author wawoo
 * Wed Sep 14 2022 16:08:25 GMT+0800 (中国标准时间)
 *
 */

interface IDictPool {
    [name: string]: NodePool
}

interface IDictPrefab {
    [name: string]: Prefab
}


@ccclass('PoolManager')
export class PoolManager  {

    private static _instance: PoolManager 
    
    public static instance() {
        if(!this._instance) {
            this._instance = new PoolManager()
        }
        return this._instance
    }

    private _dictPool: IDictPool = {}
    private _dictPrefab: IDictPrefab = {}

    getNode(prefab: Prefab, parent: Node) {
        const name = prefab.name 
        let node: Node = null 
        const pool = this._dictPool[name]
        if(pool) {
            if(pool.size() > 0){
                node = pool.get()
            } else {
                node = instantiate(prefab)
            }
        } else {
            this._dictPool[name] = new NodePool()
            node = instantiate(prefab)
        }

        node.setParent(parent)
        node.active = true 

        // console.log("getNode", node.name, prefab.name)
        return node
    }

    putNode(node: Node) {
        const name = node.name 
        node.removeFromParent()

        let pool = this._dictPool[name]
        if(!pool){
            pool = new NodePool()
            this._dictPool[name] = pool
        }
        pool.put(node)
    }



}