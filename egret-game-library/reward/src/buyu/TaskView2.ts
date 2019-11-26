module reward {
    export class TaskView2 extends eui.Component {

        public task_lst: eui.List;
        private _taskInfo: eui.ArrayCollection;
        private scroll:eui.Scroller;
        private _lastV:number;

        public constructor() {
            super();
            this.skinName = "TaskView2Skin"
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.task_lst.itemRenderer = TaskItem2;
        }

        public setData(tasks: Cmd.DaysTaskItem[]):void{
            this._taskInfo = new eui.ArrayCollection(tasks);
            this.task_lst.dataProvider = this._taskInfo;
        }

        public updateTask(taskId:number):void{
            for(var j:number=0;j<this._taskInfo.source.length;j++){
                if(taskId == this._taskInfo.source[j].taskId){
                    this._taskInfo.source[j].taskStatus = Cmd.TaskStatus.Task_Status_Received;
                    this._taskInfo.replaceItemAt(this._taskInfo.source[j],j);
                    break;
                }
            }
        }


        // private onDailyTask(evt: uniLib.ZqEvent): void {
        //     var curData: Cmd.RequestOnceTaskLobbyCmd_S = evt.param;
        //     if (curData.otherTaskInfo && curData.otherTaskInfo.length > 0) {
        //         this._taskInfo = new eui.ArrayCollection(curData.otherTaskInfo)
        //         this.task_lst.dataProvider = this._taskInfo;
        //     }
        // }

        // private taskNext(e:uniLib.ZqEvent):void{
        //     let rewardData: Cmd.GetDaysTaskRewardLobbyCmd_S = e.param;
        //     var followTasks:Cmd.DaysTaskItem[] = rewardData.followTasks
        //     if(followTasks && followTasks.length>0){
        //         for(var i:number=0;i<this._taskInfo.source.length;i++){
        //             if(rewardData.taskId == this._taskInfo.source[i].taskId){
        //                 this._taskInfo.replaceItemAt(followTasks[0],i);
        //                 break;
        //             }
        //         }
        //     }else{
        //         for(var j:number=0;j<this._taskInfo.source.length;j++){
        //             if(rewardData.taskId == this._taskInfo.source[j].taskId){
        //                 this._taskInfo.source[j].taskStatus = Cmd.TaskStatus.Task_Status_Received;
        //                 this._taskInfo.replaceItemAt(this._taskInfo.source[j],j);
        //                 break;
        //             }
        //         }
        //     }

        //     // this._lastV = this.scroll.viewport.scrollV;
        //     // this.task_lst.dataProvider = new eui.ArrayCollection(this._taskInfo);
        //     // this.task_lst.dataProviderRefreshed();
        //     // this.scroll.viewport.scrollV = this._lastV;
        // }

        public scrollTTo(y:number):void{
            this.scroll.viewport.scrollV = y;
        }

        public destroy(): void {
            for (var i: number = 0; i < this.task_lst.numChildren; i++) {
                let child = this.task_lst.getChildAt(i) as TaskItem;
                child && child.destroy();
            }
            this.task_lst = null;
            this.removeChildren();
        }
    }
}