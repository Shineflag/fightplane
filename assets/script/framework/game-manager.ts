

import { _decorator, Component, Node, Prefab, instantiate,math, Vec3, BoxCollider, Collider, macro  } from 'cc';
import { Bullet } from '../bullet/bullet';
import { BulletProp } from '../bullet/bullet-prop';
import { EnemyPlane } from '../plane/enemy-plane';
import { Constant } from './constants';
const { ccclass, property } = _decorator;

//敌机出现的Z轴坐标
const ENEMY_PLANE_POS_Z = -50
/**
 * 
 * Author wawoo
 * Fri Sep 09 2022 19:28:06 GMT+0800 (中国标准时间)
 *
 */
@ccclass('GameManager')
export class GameManager extends Component {

    // bullet
    @property(Prefab)
    bullet01: Prefab

    @property(Prefab)
    bullet02: Prefab

    @property(Prefab)
    bullet03: Prefab

    @property(Prefab)
    bullet04: Prefab

    @property(Prefab)
    bullet05: Prefab

    @property(Node) 
    bulletRoot: Node

    @property(Prefab)
    enemy01: Prefab
    @property(Prefab)
    enemy02: Prefab

    @property
    enemy1Speed = 0.5

    @property
    enemy2Speed = 0.7

    @property
    createEnemyTime = 1

    @property(Prefab)
    bulletPropM: Prefab
    @property(Prefab)
    bulletPropH: Prefab
    @property(Prefab)
    bulletPropS: Prefab
    
    @property
    bulletPropSpeed = 9



    @property(Node)
    playerPlane: Node

    @property
    shootTime = 0.1

    @property
    bulletSpped:number = 10

    private _currShootTime = 0 
    private _isShooting = false


    private _curCreateEnemyTime = 0 
    private _combinationPlan = Constant.Combination.PLAN1;
    private _bulletType = Constant.BulletPropType.BULLET_M



    start() {
        this._init()
    }

    update(dt: number) {
        this._currShootTime += dt
        if(this._isShooting && this._currShootTime > this.shootTime) {
            this.createPlayerBullet()
            this._currShootTime = 0 
        }

        this._curCreateEnemyTime += dt 
        console.log(this._combinationPlan)
        
        switch(this._combinationPlan) {
            case Constant.Combination.PLAN1:
                if(this._curCreateEnemyTime > this.createEnemyTime) {
                    this.createEnemhyPlane()
                    this._curCreateEnemyTime = 0
                }
                break
            case Constant.Combination.PLAN2:
                if(this._curCreateEnemyTime > this.createEnemyTime*0.9) {
                    const comb = math.randomRangeInt(1,3)
                    if(comb === Constant.Combination.PLAN2) {
                        this.createCombination1()
                    } else {
                        this.createEnemhyPlane()
                    }
                    this._curCreateEnemyTime = 0
                }

                break
            case Constant.Combination.PLAN3:
                    if(this._curCreateEnemyTime > this.createEnemyTime*0.8) {
                        const comb = math.randomRangeInt(1,4)
                        if(comb === Constant.Combination.PLAN3){
                            this.createCombination2()
                        }else if(comb === Constant.Combination.PLAN2) {
                            this.createCombination1()
                        } else {
                            this.createEnemhyPlane()
                        }
                        this._curCreateEnemyTime = 0
                    }
    
                break
            default:
                console.log(this._combinationPlan)
        }


    }

    _init() {
        this._currShootTime = this.shootTime  
        this.changePlaneMode()
    }

    createPlayerBullet() {
        console.log("createPlayerBullet", this._bulletType)
        if(this._bulletType == Constant.BulletPropType.BULLET_H){
            this.createPlayerBulletH()
        } else if(this._bulletType == Constant.BulletPropType.BULLET_S) {
            this.createPlayerBulletS()
        } else {
            this.createPlayerBulletM()
        }

    } 

    createPlayerBulletM() {
        const bullet = instantiate(this.bullet01)
        bullet.setParent(this.bulletRoot)

        const pos = this.playerPlane.position
        bullet.setPosition(pos.x, pos.y, pos.z -7)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.show(this.bulletSpped, false)
    } 

    createPlayerBulletH() {
        const pos = this.playerPlane.position

        //left 
        const bullet1 = instantiate(this.bullet03)
        bullet1.setParent(this.bulletRoot)
        bullet1.setPosition(pos.x - 2.5, pos.y, pos.z -7)
        const bulletComp1 = bullet1.getComponent(Bullet)
        bulletComp1.show(this.bulletSpped, false)

        //right
        const bullet2 = instantiate(this.bullet03)
        bullet2.setParent(this.bulletRoot)
        bullet2.setPosition(pos.x + 2.5, pos.y, pos.z -7)
        const bulletComp2 = bullet2.getComponent(Bullet)
        bulletComp2.show(this.bulletSpped, false)
    } 

    createPlayerBulletS() {
        const pos = this.playerPlane.position

        //middle
        const bullet = instantiate(this.bullet05)
        bullet.setParent(this.bulletRoot)
        bullet.setPosition(pos.x, pos.y, pos.z -7)
        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.show(this.bulletSpped, false)

        //left 
        const bullet1 = instantiate(this.bullet05)
        bullet1.setParent(this.bulletRoot)
        bullet1.setPosition(pos.x - 4, pos.y, pos.z -7)
        const bulletComp1 = bullet1.getComponent(Bullet)
        bulletComp1.show(this.bulletSpped, false, Constant.Direction.LEFT)

        //right
        const bullet2 = instantiate(this.bullet05)
        bullet2.setParent(this.bulletRoot)
        bullet2.setPosition(pos.x + 4, pos.y, pos.z -7)
        const bulletComp2 = bullet2.getComponent(Bullet)
        bulletComp2.show(this.bulletSpped, false, Constant.Direction.RIGHT)
    } 

    createEnemyBullet(pos: Vec3) {
        const bullet = instantiate(this.bullet01)
        bullet.setParent(this.bulletRoot)
        bullet.setPosition(pos.x, pos.y, pos.z + 6)

        const bulletComp = bullet.getComponent(Bullet)
        bulletComp.show(this.bulletSpped, true)

        const colliderComp = bullet.getComponent(BoxCollider)
        colliderComp.setGroup(Constant.CollisionType.ENEMY_BULLET)
        colliderComp.setMask(Constant.CollisionType.SELF_PLANE)
    } 

    public shoot(v: boolean) {
        this._isShooting = v
    }

    createEnemhyPlane() {
        const whichEnemy = math.randomRangeInt(1,3)
        let prefab: Prefab = null 
        let speed  = 0 
        if(whichEnemy == Constant.EnemyType.TYPE1) {
            prefab = this.enemy01
            speed = this.enemy1Speed
        } else {
            prefab = this.enemy02
            speed = this.enemy2Speed
        } 

        const enemy = instantiate(prefab)
        enemy.setParent(this.node)
        const comp = enemy.getComponent(EnemyPlane)
        comp.show(speed, true, this)

        const x = math.randomRangeInt(-25, 26)
        enemy.setPosition(x, 0, ENEMY_PLANE_POS_Z)
        
    }

    createCombination1() {
        const enemyArray = new Array<Node>(5)
        for(let i = 0; i< enemyArray.length; i++) {
            let plane = instantiate(this.enemy01)
            plane.setParent(this.node)
            plane.setPosition(-20 + i*10, 0, ENEMY_PLANE_POS_Z)
            const comp = plane.getComponent(EnemyPlane)
            comp.show(this.enemy1Speed, false, this)
        }
    }

    createCombination2() {
        const z = [-60, -55, -50, -45, -50, -55, -60]  // V字型
        for(let i = 0; i < 7; i++) {
            let plane = instantiate(this.enemy02)
            plane.setParent(this.node)
            plane.setPosition(-21 + i*7, 0, z[i])
            const comp = plane.getComponent(EnemyPlane)
            comp.show(this.enemy2Speed,  false, this)
        }
    }

    createBulletProp() {
        const prop = math.randomRangeInt(1,4)
        let prefab: Prefab = null 
        if(prop === Constant.BulletPropType.BULLET_H) {
            prefab = this.bulletPropH
        }else if(prop === Constant.BulletPropType.BULLET_S) {
            prefab = this.bulletPropS
        }else {
            prefab = this.bulletPropM
        }
        const bulletProp = instantiate(prefab)
        bulletProp.setParent(this.node)
        bulletProp.setPosition(15, 0, -50)
        const comp = bulletProp.getComponent(BulletProp)
        comp.show(this.bulletPropSpeed, this)
    }

    addScore() {

    }

    changeBulletType(type: number) {
        console.log("changeBulletType", this._bulletType)
        this._bulletType = type
        console.log("changeBulletType", this._bulletType)
    }

    changePlaneMode() {
        this.schedule(this._modeChanged, 10, macro.REPEAT_FOREVER)
    }

    private _modeChanged() {
        console.log("_modeChanged", this)
        this._combinationPlan++
        if(this._combinationPlan > 3) {
            this._combinationPlan = 1
        }

        this.createBulletProp()
    }
}