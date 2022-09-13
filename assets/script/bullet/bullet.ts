

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

const BULLETRANGE = -100

/**
 * 
 * Author wawoo
 * Fri Sep 09 2022 19:00:38 GMT+0800 (中国标准时间)
 *
 */
@ccclass('Bullet')
export class Bullet extends Component {

    private _bulletSpped = 10

    private _isEnemy = false



    onLoad() {

    }

    start() {

    }

    update(dt: number) {
        let pos = this.node.position
        let delta = this._bulletSpped*dt
        if(this._isEnemy) {
            this.node.setPosition(pos.x, pos.y, pos.z + delta)
            if(this.node.position.z > -BULLETRANGE) {
                this.node.removeFromParent()
                this.node.destroy()
            }
        }else {
            this.node.setPosition(pos.x, pos.y, pos.z - delta)

            if(this.node.position.z < BULLETRANGE) {
                this.node.removeFromParent()
                this.node.destroy()
            }
        }

    }

    show(speed: number, isEnemy: boolean) {
        this._bulletSpped = speed
        this._isEnemy = isEnemy
    }

    onDestroy() {

    }
}