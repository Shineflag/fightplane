

import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/constants';
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

    onEnable(){
        const collider = this.getComponent(Collider)
        collider.on("onTriggerEnter", this._onTriggerEnter, this) 
    }

    onDisable() {
        const collider = this.getComponent(Collider)
        collider.off("onTriggerEnter", this._onTriggerEnter, this)
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

    
    private _onTriggerEnter(event: ITriggerEvent) {
        const group = event.otherCollider.getGroup()
        if(group === Constant.CollisionType.SELF_PLANE || group === Constant.CollisionType.SELF_BULLET){
            this._gameManager.playEffect("enemy")
            this.node.removeFromParent()
            this.node.destroy()
            this._gameManager.addScore()
        }
    }
}