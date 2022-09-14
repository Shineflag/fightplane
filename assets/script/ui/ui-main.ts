

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

    @property(Node)
    gameStart: Node = null 

    @property(Node)
    game: Node = null 

    @property(Node)
    gameOver: Node = null 

    onLoad() {

    }

    start() {
        this.node.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
        this.node.on(Node.EventType.TOUCH_START, this._onTouchStart, this)
        this.node.on(Node.EventType.TOUCH_END, this._onTouchEnd, this)

        this.gameStart.active = true
    }

    update(dt: number) {

    }

    onDestroy() {
        this.node.off(Node.EventType.TOUCH_MOVE, this._onTouchMove, this)
    }

    _onTouchMove(evt: EventTouch) {
        if(!this.gameManager.isGameStart){
            return 
        }


        let delta = evt.getUIDelta()
        let pos = this.planeNode.position

        this.planeNode.setPosition(pos.x + delta.x*this.planeSpeed, pos.y, pos.z - delta.y*this.planeSpeed)
    }

    _onTouchStart(evt: EventTouch) {
        if(this.gameManager.isGameStart){
            this.gameManager.shoot(true)
        } else {
            this.gameStart.active = false 
            this.game.active = true
            this.gameManager.playEffect("button")
            this.gameManager.gameStart()
        }

    }

    _onTouchEnd(evt: EventTouch) {
        if(!this.gameManager.isGameStart){
            return 
        }
        this.gameManager.shoot(false)
    }

    reStart() {
        this.gameManager.playEffect("button")
        this.gameOver.active = false 
        this.game.active = true
        this.gameManager.gameReStart()
    }

    returnMain() {
        this.gameManager.playEffect("button")
        this.gameOver.active = false 
        this.gameStart.active = true
        this.gameManager.returnMain()
    }
}