

import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

/**
 * 
 * Author wawoo
 * Fri Sep 09 2022 17:22:00 GMT+0800 (中国标准时间)
 *
 */
@ccclass('MoveBg')
export class MoveBg extends Component {
    @property(Node)
    bg01: Node 

    @property(Node)
    bg02: Node 

    private _bgSpeed = 10 
    private _bgMovingRange = 90 


    start() {
        this._init()
    }

    update(dt: number) {
   
        this._moveBacgroud(dt)
    }

    private _init() {
        this.bg01.setPosition(0,0,0)
        this.bg02.setPosition(0,0,-this._bgMovingRange)
    }

    private _moveBacgroud(dt: number) {
        let delta = this._bgSpeed*dt 
        this.bg01.setPosition(0,0, this.bg01.position.z + delta)
        this.bg02.setPosition(0,0, this.bg02.position.z + delta)

        if(this.bg01.position.z > this._bgMovingRange) {
            this.bg01.setPosition(0, 0, this.bg02.position.z-this._bgMovingRange)
        }
        if(this.bg02.position.z > this._bgMovingRange) {
            this.bg02.setPosition(0, 0, this.bg01.position.z-this._bgMovingRange)
        }
    }
}