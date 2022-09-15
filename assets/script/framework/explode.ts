

import { _decorator, Component, Node } from 'cc';
import { PoolManager } from './pool-manager';
const { ccclass, property } = _decorator;

/**
 * 
 * Author wawoo
 * Thu Sep 15 2022 11:42:56 GMT+0800 (中国标准时间)
 *
 */
@ccclass('Explode')
export class Explode extends Component {
    onLoad() {

    }

    onEnable() {
        this.scheduleOnce(this._putBack, 2)
    }

    private _putBack() {
        PoolManager.instance().putNode(this.node)
    }

    start() {

    }

    update(dt: number) {

    }

    onDestroy() {

    }
}