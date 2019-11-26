/**
 * 游戏内任务面板
 */
module paoupgrade {

	export class GameInTaskPanel extends eui.Component {

        private item1:paoupgrade.GameInTaskItem;
        private item2:paoupgrade.GameInTaskItem;

        private left_btn: eui.WxButton;
        private right_btn: eui.WxButton;
        private scroll:eui.Scroller;

        private group:eui.Group;
        private close_btn:eui.Group;
        private open_btn:eui.Group;
        private _wanchengEffect:dragonBones.Movie;


        private allTasks:Cmd.DaysTaskItem[];
        private index:number;
        private posX:number[] = [-239,0,239];
        private taskItems:paoupgrade.GameInTaskItem[];
        private item_index:number;
        private isTween:boolean;
        private _curTaskId:number;
        private _receivedTaskId:number;
        private _reqType:number = 0;

        public constructor() {
            super();
            this.skinName = "GameInTaskSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.taskItems = [this.item1,this.item2];
            this.addEvents();
            this.initData(1);
        }

         private addEvents(): void {
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.left_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.right_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.scroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener("OnceTaskLobby", this.onMsgReceiveHandler, this);
            uniLib.Global.addEventListener("IntoFreeGold", this.onMsgReceiveHandler, this);
         }

        private initData(type:number):void{
            if(type == 1){
                var req1: Cmd.RequestOnceTaskLobbyCmd_C = new Cmd.RequestOnceTaskLobbyCmd_C();
                NetMgr.tcpSend(req1);
            }else if(type == 2){
                var req2: Cmd.IntoFreeGoldLobbyCmd_C = new Cmd.IntoFreeGoldLobbyCmd_C();
                NetMgr.tcpSend(req2);
            }
            this._reqType = type;
        }

        private onMsgReceiveHandler(evt: uniLib.ZqEvent):void{
            if(evt.type == "OnceTaskLobby"){
                var curData: Cmd.RequestOnceTaskLobbyCmd_S = evt.param;
                let tasks = curData.fktasks.concat(curData.qhtasks).concat(curData.diamondtasks);
                this.updateTaskList(tasks);
            }else if(evt.type == "IntoFreeGold"){
                var curData1: Cmd.IntoFreeGoldLobbyCmd_S = evt.param;
                if (curData1.otherTaskInfo && curData1.otherTaskInfo.length > 0) {
                    this.updateTaskList(curData1.otherTaskInfo);
                }else{
                    this.destroy();
                }
            }
        }

        private updateTaskList(tasks:Cmd.DaysTaskItem[]):void{
            this.allTasks = [];
            for(var i:number=0;i<tasks.length;i++){
                if(tasks[i] && tasks[i].taskStatus < 3)
                    this.allTasks.push(tasks[i]);
            }
            this.allTasks.sort((a: Cmd.DaysTaskItem,b: Cmd.DaysTaskItem): number=>
                {
                    if(a.taskStatus == 2)
                        if(a.taskId > b.taskId) return -2;
                        else return -3;
                    else{
                        if(a.taskId > b.taskId) return 1;
                        else if(a.taskId == b.taskId) return 0;
                        return -1;
                    }
                })
            if(this.allTasks.length >0){
                if(this._curTaskId){
                    var ind = this.getIndex(this._curTaskId);
                    this.index = ind == -1 ? 0 : ind;
                }else{
                    this.index = 0;
                    this.item_index = 0;
                }
                this._curTaskId = this.allTasks[this.index].taskId;
                var finish:boolean = this.taskItems[this.item_index].setInfo(this.allTasks[this.index]);
                if(finish){
                    if(this._receivedTaskId == this._curTaskId){
                        if(this.effectType != 2)
                            this.playWanchenEffect(2);
                    }else{
                        this._receivedTaskId = this._curTaskId;
                        this.playWanchenEffect(1);
                    }
                }else
                    this.effectStop();
            }else{
                if(this._reqType == 1)
                    this.initData(2);
                else if(this._reqType == 2)
                    this.destroy();
            }
        }

        private getIndex(taskId:number):number{
            for(var i:number=0;i<this.allTasks.length;i++){
                if(this.allTasks[i].taskId == taskId)
                    return i;
            }
            return -1;
        }

        private onTouchTapHandler(evt: egret.TouchEvent): void {
            var target = evt.currentTarget;
            if(target == this.left_btn){
                if(this.index == 0 || this.isTween){
                    return;
                }
                this.index --;

                this.item_index = 1 - this.item_index;
                this.taskItems[this.item_index].x = this.posX[2];
                this._curTaskId = this.allTasks[this.index].taskId;
                var finish1:boolean = this.taskItems[this.item_index].setInfo(this.allTasks[this.index]);
                this.isTween = true;
                egret.Tween.get(this.taskItems[this.item_index]).to({x:this.posX[1]},200).call(()=>{
                    this.isTween = false;
                    finish1?this.playWanchenEffect(2):this.effectStop();});
                egret.Tween.get(this.taskItems[1 - this.item_index]).to({x:this.posX[0]},200);
            }else if(target == this.right_btn){
                if(this.allTasks.length <2 ||this.index == this.allTasks.length-1 || this.isTween){
                    return;
                }
                this.index ++;

                this.item_index = 1 - this.item_index;
                this.taskItems[this.item_index].x = this.posX[0];
                this._curTaskId = this.allTasks[this.index].taskId;
                var finish2:boolean = this.taskItems[this.item_index].setInfo(this.allTasks[this.index]);
                this.isTween = true;
                this.effectStop();
                egret.Tween.get(this.taskItems[this.item_index]).to({x:this.posX[1]},200).call(()=>{
                    this.isTween = false;
                    finish2?this.playWanchenEffect(2):this.effectStop();});
                egret.Tween.get(this.taskItems[1 - this.item_index]).to({x:this.posX[2]},200);
            }else if(target == this.scroll){
                LobbyModuleMgr.getInstance().showNewFuliPanel(this.allTasks[this.index].taskId);
            }else if(target == this.close_btn){
               egret.Tween.get(this.group).to({y:-112},200).call(()=>{this.open_btn.visible = true})
            }else if(target == this.open_btn){
                 this.open_btn.visible = false;
                 egret.Tween.get(this.group).to({y:0},200);
            }
        }

        private effectType:number = 0;
        public playWanchenEffect(type:number):void{
            if(this._wanchengEffect == null){
                this._wanchengEffect = uniLib.DragonUtils.createDragonBonesDisplay("renwuwancheng_ske_json", "renwuwancheng_tex_json","renwuwancheng_tex_png",uniLib.DragonType.ARMATURE);
                this._wanchengEffect.touchEnabled = false;
            }
            if(this.effectType == 1)
                this._wanchengEffect.removeEventListener(egret.Event.LOOP_COMPLETE,this.effectComplete,this);
            this.effectType = type;
            this._wanchengEffect.display.x = 135;
            this._wanchengEffect.display.y = 42;
            this.group.addChild(this._wanchengEffect.display);
            if(this.effectType == 1)
                this._wanchengEffect.addEventListener(egret.Event.LOOP_COMPLETE,this.effectComplete,this);
            uniLib.DragonUtils.runDragonBonesArmature(this._wanchengEffect,this.effectType+"",this.effectType == 1 ? 1:0);
        }

        private effectComplete(e:egret.Event):void{
            this._wanchengEffect.removeEventListener(egret.Event.LOOP_COMPLETE,this.effectComplete,this);
            this.effectType = 2;
            uniLib.DragonUtils.runDragonBonesArmature(this._wanchengEffect,this.effectType+"",0);
        }

        private effectStop():void{
            if(this._wanchengEffect ){
                this._wanchengEffect.animation.stop();
                uniLib.DisplayUtils.removeFromParent(this._wanchengEffect.display);
            }
        }

        private removeEvents():void{
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.open_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.left_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.right_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.scroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener("OnceTaskLobby", this.onMsgReceiveHandler, this);
            uniLib.Global.removeEventListener("IntoFreeGold", this.onMsgReceiveHandler, this);
        }

        public destroy(): void {
            this.taskItems = null;
            this.isTween = false;
            if(this._wanchengEffect ){
                uniLib.DisplayUtils.removeFromParent(this._wanchengEffect.display);
                uniLib.DragonUtils.destoryDragonBonesArmature(this._wanchengEffect,this.effectType+"");
                this._wanchengEffect = null;
            }
            egret.Tween.removeTweens(this.item1);
            egret.Tween.removeTweens(this.item2);
            egret.Tween.removeTweens(this.group);
            this.removeEvents();
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
    
} 