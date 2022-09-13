

import { _decorator, Component, Node } from 'cc';
import { GameManager } from '../framework/game-manager';
const { ccclass, property } = _decorator;

const OUT_OF_BOUNCE = 50 

/**
 * 
 * Author wawoo
 * Sun Sep 11 2022 11:50:11 GMT+0800 (中国标准时间)
 *
 */
@ccclass('EnemyPlane')
export class EnemyPlane extends Component {


    private _speed = 0
    private _needBullet = false
    private _gameManager: GameManager

    private _curCreateBulltime = 0 
    createBulletTime = 1

    onLoad() {

    }

    start() {

    }

    update(dt: number) {
        const pos = this.node.position
        const z = pos.z + this._speed*dt 
        this.node.setPosition(pos.x, pos.y, z)
        if(z > OUT_OF_BOUNCE) {
            this.node.removeFromParent()
            this.node.destroy()
        }

        if(this._needBullet){
            this._curCreateBulltime += dt
            if(this._curCreateBulltime > this.createBulletTime) {
                this._gameManager.createEnemyBullet(pos)
                this._curCreateBulltime = 0
            }
        }
    }


    onDestroy() {

    }

    show(speed: number, needBullet?: boolean, gameManage?: GameManager) {
        this._speed = speed
        this._needBullet = needBullet
        this._gameManager = gameManage

    }
}