

import { _decorator, Component, Node, Collider, ITriggerEvent } from 'cc';
import { Constant } from '../framework/constants';
import { GameManager } from '../framework/game-manager';
const { ccclass, property } = _decorator;

const BOUNDCE = 15

/**
 * 
 * Author wawoo
 * Tue Sep 13 2022 15:25:11 GMT+0800 (中国标准时间)
 *
 */
@ccclass('BulletProp')
export class BulletProp extends Component {

    private _speed = 9
    private _speedX = -9 

    private _gameManager:GameManager

    onEnable(){
        const collider = this.getComponent(Collider)
        collider.on("onTriggerEnter", this._onTriggerEnter, this) 
    }

    onDisable() {
        const collider = this.getComponent(Collider)
        collider.off("onTriggerEnter", this._onTriggerEnter, this)
    }

    private _onTriggerEnter(event: ITriggerEvent) { 
        console.log("_onTriggerEnter", event.selfCollider.name, event.selfCollider.node.name)
        const name = event.selfCollider.node.name
        if(name == "bulletH"){
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_H)
        }else if(name == "bulletS") {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_S)

        } else {
            this._gameManager.changeBulletType(Constant.BulletPropType.BULLET_M)
        }
        
        this.node.removeFromParent()
        this.node.destroy()
    }


    
    start() {

    }

    update(dt: number) {
        let pos = this.node.position
        if(pos.x >= BOUNDCE) {
            this._speedX = -this._speed
        }else if(pos.x <= -BOUNDCE) {
            this._speedX = this._speed
        }
        this.node.setPosition(pos.x + this._speedX*dt, pos.y, pos.z + this._speed*dt)
        if(pos.z > 50) {
            this.node.removeFromParent()
            this.node.destroy()
        }
    }

    show(speed: number, gm: GameManager) {
        this._speed = speed
        this._gameManager = gm
    }

    onDestroy() {

    }
}