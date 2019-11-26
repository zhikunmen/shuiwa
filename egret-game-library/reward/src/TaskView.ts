module reward {
    export class TaskView extends eui.Component {

        public task_lst: eui.List;
        private _taskInfo: eui.ArrayCollection;
        private scroll:eui.Scroller;
        private _lastV:number;

        public constructor() {
            super();
            if(NetMgr.getLoginCfg().lobbyId == 60){
                this.skinName = "TaskView1Skin"
            }else{
                this.skinName = "TaskViewSkin"
            }
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initData();
        }

        private initData(): void {
            this.task_lst.itemRenderer = TaskItem;
            uniLib.Global.addEventListener(CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            uniLib.Global.addEventListener(reward.CmdConstant.DAYSTASKREWARD, this.taskNext,this);
            var req: Cmd.IntoFreeGoldLobbyCmd_C = new Cmd.IntoFreeGoldLobbyCmd_C();
            NetMgr.tcpSend(req);
        }

        private onDailyTask(evt: uniLib.ZqEvent): void {
            var curData: Cmd.IntoFreeGoldLobbyCmd_S = evt.param;
            if (curData.otherTaskInfo && curData.otherTaskInfo.length > 0) {
                if(uniLib.Global.is_sandbox != 0 && uniLib.Global.isWxGame()){
                    this._taskInfo = new eui.ArrayCollection(this.filterExamine(curData.otherTaskInfo))
                }else{
                    this._taskInfo = new eui.ArrayCollection(curData.otherTaskInfo)
                }
                this.task_lst.dataProvider = this._taskInfo;
            }
        }

        private filterExamine(otherTaskInfo: Cmd.DaysTaskItem[]):Cmd.DaysTaskItem[]{
            var returns: Cmd.DaysTaskItem[] = []
            for(var i:number=0;i<otherTaskInfo.length;i++){
                if(otherTaskInfo[i].taskId != 61 && otherTaskInfo[i].taskId != 80){
                    returns.push(otherTaskInfo[i]);
                }
            }
            return returns;
        }

        private taskNext(e:uniLib.ZqEvent):void{
            let rewardData: Cmd.GetDaysTaskRewardLobbyCmd_S = e.param;
            var followTasks:Cmd.DaysTaskItem[] = rewardData.followTasks
            if(followTasks && followTasks.length>0){
                for(var i:number=0;i<this._taskInfo.source.length;i++){
                    if(rewardData.taskId == this._taskInfo.source[i].taskId){
                        this._taskInfo.replaceItemAt(followTasks[0],i);
                        break;
                    }
                }
            }else{
                for(var j:number=0;j<this._taskInfo.source.length;j++){
                    if(rewardData.taskId == this._taskInfo.source[j].taskId){
                        this._taskInfo.source[j].taskStatus = Cmd.TaskStatus.Task_Status_Received;
                        this._taskInfo.replaceItemAt(this._taskInfo.source[j],j);
                        break;
                    }
                }
            }

            // this._lastV = this.scroll.viewport.scrollV;
            // this.task_lst.dataProvider = new eui.ArrayCollection(this._taskInfo);
            // this.task_lst.dataProviderRefreshed();
            // this.scroll.viewport.scrollV = this._lastV;
        }

        public destroy(): void {
            for (var i: number = 0; i < this.task_lst.numChildren; i++) {
                let child = this.task_lst.getChildAt(i) as TaskItem;
                child && child.destroy();
            }
            this.task_lst = null;
            uniLib.Global.removeEventListener(CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.DAYSTASKREWARD, this.taskNext,this);
            this.removeChildren();
        }
    }
}