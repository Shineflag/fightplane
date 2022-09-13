

import { _decorator, Component, Node, EventTouch } from 'cc';
import { GameManager } from '../framework/game-manager';
const { ccclass, property } = _decorator;

/**
 * 
 * Author wawoo
 * Fri Sep 09 2022 18:29:23 GMT+0800 (中国标准时间)
 *
 */
@ccclass('UiMain')
export class UiMain extends Component {

    @property
    public planeSpeed = 100

    @property(Node)
    public planeNode: Node

    @property(GameManager)
    gameManager: GameManager

    onLoad() {

    }

    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
        this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this)
        this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this)
    }

    update(dt: number) {

    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    }

    _onTouchMove(evt: EventTouch) {
        // console.log("_onTouchMove", evt)
        let delta = evt.getUIDelta()
        let pos = this.planeNode.position
        // console.log("_onTouchMove", evt, delta, pos)
        this.planeNode.setPosition(pos.x + delta.x*this.planeSpeed, pos.y, pos.z - delta.y*this.planeSpeed)
    }

    _onTouchStart(evt: EventTouch) {
        this.gameManager.shoot(true)
    }

    _onTouchEnd(evt: EventTouch) {
        this.gameManager.shoot(false)
    }
}