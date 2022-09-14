

import { _decorator, Component, Node, Collider, ITriggerEvent, AudioSource } from 'cc';
import { Constant } from '../framework/constants';
const { ccclass, property } = _decorator;

/**
 * 
 * Author wawoo
 * Fri Sep 09 2022 18:24:01 GMT+0800 (中国标准时间)
 *
 */
@ccclass('SelfPlane')
export class SelfPlane extends Component {
    public lifeValue = 5 
    public isDie= false

    private _curLife = 0

    private _audioSource: AudioSource = null 



    //初始化
    init() {
        this._curLife = this.lifeValue
        this.isDie = false
    }

    onLoad() {
        this._audioSource = this.getComponent(AudioSource)
    }

    onEnable(){
        const collider = this.getComponent(Collider)
        collider.on("onTriggerEnter", this._onTriggerEnter, this) 
    }

    onDisable() {
        const collider = this.getComponent(Collider)
        collider.off("onTriggerEnter", this._onTriggerEnter, this)
    }


    update(dt: number) {

    }

    onDestroy() {

    }

    private _onTriggerEnter(event: ITriggerEvent) {
        const group = event.otherCollider.getGroup()
        if(group === Constant.CollisionType.ENEMY_PLANE || group === Constant.CollisionType.ENEMY_BULLET){
            // console.log("reduce blood")
            this._curLife-- 
            if(this._curLife <= 0) {
                this.isDie = true
                this._audioSource.play()
            }
        }
    }
}