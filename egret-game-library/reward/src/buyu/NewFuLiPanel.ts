module reward {
    /**
     * 大厅福利界面
     */
    export class NewFuLiPanel extends eui.Component {

        public men_rbtn1: eui.RadioButton;
        public men_rbtn2: eui.RadioButton;
        public men_rbtn3: eui.RadioButton;
        public close_btn: eui.WxButton;
        public task_view1: reward.TaskView2;
        public task_view2: reward.TaskView2;
        public task_view3: reward.TaskView2;

        public red1: eui.Image;
        public red2: eui.Image;

        private _viewGroup: reward.TaskView2[];
        private _btnGroup: eui.RadioButton[];
        private _defaultMenu:number;
        /**
        * 默认任务
        */
        private _taskId: number;
        private _pos:number;

        public constructor(taskId?:number ) {
            super();
            if(taskId)
                this._taskId = taskId;
            this.skinName = "NewFuliPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._viewGroup = [this.task_view1, this.task_view2, this.task_view3];
            // this._viewGroup[this._defaultMenu].visible = true;

            this._btnGroup = [this.men_rbtn1, this.men_rbtn2, this.men_rbtn3];
            // this._btnGroup[this._defaultMenu].selected = true;


            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.men_rbtn1.group.addEventListener(egret.Event.CHANGE, this.showTabContent, this);
            uniLib.Global.addEventListener(CmdConstant.NEW_ONCETASK_LOBBY, this.onOnceTaskHandler, this);
            uniLib.Global.addEventListener(reward.CmdConstant.NEW_ONCEREWARD_LOBBY, this.onOnceRewardHandler,this);
            // this.men_rbtn1.group.selectedValue = this._defaultMenu;
           
            // this.addRedPoint();
            this.initData();
        }

        private initData(): void {
            var req: Cmd.RequestOnceTaskLobbyCmd_C = new Cmd.RequestOnceTaskLobbyCmd_C();
            NetMgr.tcpSend(req);
        }

        private onOnceTaskHandler(evt: uniLib.ZqEvent):void{
            var curData: Cmd.RequestOnceTaskLobbyCmd_S = evt.param;
            this.task_view1.setData(curData.fktasks);
            this.task_view2.setData(curData.qhtasks);
            this.task_view3.setData(curData.diamondtasks);
            
            if(this._taskId){
                if(this.findTask(curData.fktasks)> -1){
                    this.setMenu(0);
                }else if(this.findTask(curData.qhtasks) > -1){
                    this.setMenu(1);
                }else if(this.findTask(curData.diamondtasks) > -1){
                    this.setMenu(2);
                }else{
                    this.setMenu(0);
                }
            }else{
                this.setMenu(0);
            }
        }

        private setMenu(defaultMenu:number):void{
            this._defaultMenu = defaultMenu;
            this._viewGroup[this._defaultMenu].visible = true;
            this._btnGroup[this._defaultMenu].selected = true;
            this.men_rbtn1.group.selectedValue = this._defaultMenu;
            if(this._pos>3){
                this._viewGroup[this._defaultMenu].scrollTTo(this._pos*147);
            }
        }

        private findTask(tasks: Cmd.DaysTaskItem[]):number{
            if(tasks == null || tasks.length == 0)
                return -1;
            else{
                for(var i:number = 0;i<tasks.length;i++){
                    if(tasks[i].taskId == this._taskId){
                        this._pos = i;
                        return i;
                    }
                }
            }
        }

        private onOnceRewardHandler(evt: uniLib.ZqEvent):void{
            var curData: Cmd.GetOnceRewardLobbyCmd_S = evt.param;
            this.task_view1.updateTask(curData.taskId);
            this.task_view2.updateTask(curData.taskId);
            this.task_view3.updateTask(curData.taskId);
        }

        // private addRedPoint() {
        //     LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
        //     LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Task_EveryDay, [[this.red2]]);
        // }

        // private removeRedPoint() {
        //     LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Act_DaySign);
        //     LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Task_EveryDay);
        // }
        private showTabContent(evt: egret.Event): void {
            this._viewGroup[this._defaultMenu].visible = false;
            let rbGroup: eui.RadioButtonGroup = evt.target;
            this._defaultMenu = parseInt(rbGroup.selectedValue);
            this._viewGroup[this._defaultMenu].visible = true;
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            uniLib.PopUpMgr.removePopUp(this);
        }


        public destroy(): void {
            // this.removeRedPoint();
            uniLib.Global.removeEventListener(CmdConstant.NEW_ONCETASK_LOBBY, this.onOnceTaskHandler, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.NEW_ONCEREWARD_LOBBY, this.onOnceRewardHandler,this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.men_rbtn1.group.removeEventListener(egret.Event.CHANGE, this.showTabContent, this);
            for(var i:number=0;i<this._viewGroup.length;i++){
                this._viewGroup[i].destroy();
            }
            this._viewGroup = null;
            this._btnGroup = null;
            this.removeChildren();
        }
    }
}