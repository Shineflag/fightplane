

import { _decorator, Component, Node, AudioClip, AudioSource } from 'cc';
const { ccclass, property } = _decorator;


interface IAudioMap {
    [name: string]: AudioClip
}
/**
 * 
 * Author wawoo
 * Wed Sep 14 2022 14:47:07 GMT+0800 (中国标准时间)
 *
 */
@ccclass('AudioManager')
export class AudioManager extends Component {

    @property([AudioClip]) 
    audioClip: AudioClip[] = []

    private _dict: IAudioMap = {}
    private _audioSource: AudioSource = null 


    onLoad() {

    }

    start() {
        for(let i=0; i< this.audioClip.length; i++){
            const e = this.audioClip[i]
            this._dict[e.name] = e 
        }
        this._audioSource = this.getComponent(AudioSource)
    }

    update(dt: number) {

    }

    onDestroy() {

    }

    play(name: string) {
        const clip = this._dict[name]
        if(clip !== undefined){
            this._audioSource.playOneShot(clip)
        }
    }
}