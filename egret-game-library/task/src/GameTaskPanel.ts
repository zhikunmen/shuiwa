module task {
    export class GameTaskPanel extends eui.Component {

        private task_list:eui.List;
        private _gameId:number;
        private _sceneId:number;
        private _currentTasks: eui.ArrayCollection;
        private _anim:dragonBones.Movie;
        private _bombNum:egret.BitmapText;

        constructor(gameId:number,sceneId:number) {
            super();
            this._gameId = gameId;
            this._sceneId = sceneId
            this.skinName = "GameTaskSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.visible = false;	
            this.addEvents();
            this.x = -1;
            this.task_list.itemRenderer = task.GameTaskItem;
            this.initData();
        }

        private initData():void{
            let req:Cmd.GetGameTaskListLobbyCmd_C = new Cmd.GetGameTaskListLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.gameId = this._gameId;
            req.sceneId = this._sceneId;
            NetMgr.tcpSend(req);
        }

        private addEvents(): void {
            uniLib.Global.addEventListener(CmdConstant.GAME_TASK_LIST_DATA, this.listUpdata, this);
            uniLib.Global.addEventListener(CmdConstant.UPDATE_GAME_TASK_DATA, this.itemUpdata, this);
            uniLib.Global.addEventListener(CmdConstant.NEXT_GAME_TASK_DATA, this.itemNext, this);
        }

        private removeEvents(): void {
            uniLib.Global.removeEventListener(CmdConstant.GAME_TASK_LIST_DATA, this.listUpdata, this);
            uniLib.Global.removeEventListener(CmdConstant.UPDATE_GAME_TASK_DATA, this.itemUpdata, this);
            uniLib.Global.removeEventListener(CmdConstant.NEXT_GAME_TASK_DATA, this.itemNext, this);
        }

        /**
         * 刷新页面数据
         */
        private listUpdata(e:uniLib.ZqEvent):void{
            let curData:Cmd.GetGameTaskListLobbyCmd_S  = e.param;
            let taskItems:Cmd.DaysTaskItem[] = curData.gameTaskInfo;
            if (taskItems && taskItems.length > 0) {
                if(taskItems.length>3)
                    taskItems = taskItems.slice(0,2);
                this._currentTasks = new eui.ArrayCollection(taskItems);
                this.task_list.dataProvider = this._currentTasks;
                this.visible = true;
            }
        }

         /**
         * 刷新页面数据
         */
        private itemUpdata(e:uniLib.ZqEvent):void{
            if(this._currentTasks == null){
                this.initData();
                return;
            }
            let curData:Cmd.GetGameTaskScheduleLobbyCmd_S  = e.param;
            for(var i:number=0;i<this._currentTasks.source.length;i++){
                if(this._currentTasks.source[i].taskId == curData.taskId){
                    this._currentTasks.source[i].current = curData.pre;
                    this._currentTasks.source[i].taskStatus = curData.receive > 0 ? Cmd.TaskStatus.Task_Status_Received :Cmd.TaskStatus.Task_Status_Progress; 
                    this._currentTasks.replaceItemAt(this._currentTasks.source[i],i);
                    break;
                }
            }
            
        }

         /**
         * 刷新页面数据
         */
        private itemNext(e:uniLib.ZqEvent):void{
            if(this._currentTasks == null){
                this.initData();
                return;
            }
            let curData:Cmd.GetGameTaskRewardLobbyCmd_S  = e.param;
            if(this._anim == null){
                var movie:string = "rwdb";
                this._anim = uniLib.DragonUtils.createDragonBonesDisplay(movie+"_ske_json", movie+"_tex_json",movie+"_tex_png",uniLib.DragonType.ARMATURE);
                
                this._anim.display.x = 133;
                this._anim.display.y = 68;
            }
            this.addChild(this._anim.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._anim,"newAnimation",1);

            if(curData.followTasks &&curData.followTasks.length>0){
                for(var i:number=0;i<this._currentTasks.source.length;i++){
                    if(this._currentTasks.source[i].taskId == curData.taskId){
                        this._currentTasks.replaceItemAt(curData.followTasks[0],i);
                        // this.playAnim(curData.taskId,i);
                        break;
                    }
                }
            }
            
        }

        private playAnim(taskId:number,index:number):void{
            let task: table.TableGameTaskConfig = ConfigMgr.getInstance().getGameTaskCfgById(taskId);
            var num:number = 0;
            if (task.taskReward) {
                num = task.taskReward[0].goodNbr;
            }else{
                return;
            }

            var posY:number[] = [46,91,136]
            if(this._bombNum == null){
                this._bombNum = new egret.BitmapText();
                this._bombNum.font = RES.getRes("pdk_bomb1_fnt");
                this.addChild(this._bombNum);
                this._bombNum.x = 200;
            }
            this._bombNum.text = "+"+num;
            this._bombNum.y = posY[index];
            this._bombNum.visible = true;
            egret.Tween.removeTweens(this._bombNum);
            egret.Tween.get(this._bombNum).to({y:posY[index]-40},120).call(()=>{
                this._bombNum.visible = false;
            },this);
        }
        
        public destroy():void{
            if(this._bombNum)
                egret.Tween.removeTweens(this._bombNum);
            if(this._anim)
                uniLib.DragonUtils.destoryDragonBonesArmature(this._anim,"newAnimation");
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}