

import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/constants';
import { PoolManager } from '../framework/pool-manager';
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

    private _direction = Constant.Direction.MIDDLE



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
        let pos = this.node.position
        let delta = this._bulletSpped*dt
        if(this._isEnemy) {
            this.node.setPosition(pos.x, pos.y, pos.z + delta)
            if(this.node.position.z > -BULLETRANGE) {
                PoolManager.instance().putNode(this.node)
            }
        }else {
            if(this._direction === Constant.Direction.LEFT){
                this.node.setPosition(pos.x - delta*0.3, pos.y, pos.z - delta)
            } else if(this._direction === Constant.Direction.RIGHT) {
                this.node.setPosition(pos.x + delta*0.3, pos.y, pos.z - delta)
            } else {
                this.node.setPosition(pos.x, pos.y, pos.z - delta)
            }


            if(this.node.position.z < BULLETRANGE) {
                PoolManager.instance().putNode(this.node)
            }
        }

    }

    show(speed: number, isEnemy: boolean, direction: number = Constant.Direction.MIDDLE) {
        this._bulletSpped = speed
        this._isEnemy = isEnemy

        this._direction = direction
    }

    private _onTriggerEnter(event: ITriggerEvent) {
        PoolManager.instance().putNode(this.node)
    }

    onDestroy() {

    }
}