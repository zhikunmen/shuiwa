module reward {
    /**
     * 大厅福利界面
     */
    export class FuLiPanel extends eui.Component {

        public sign_rbtn: eui.RadioButton;
        public task_rbtn: eui.RadioButton;
        public introduce_rbtn: eui.RadioButton;
        public close_btn: eui.WxButton;
        public introduce_grp: eui.Group;
        public sign_view: reward.SignView;
        public task_view: reward.TaskView;

        public red1: eui.Image;
        public red2: eui.Image;
        private content:eui.Label;
        private operate:eui.Label;

        private _viewGroup: egret.DisplayObject[];
        private _btnGroup: eui.RadioButton[];

        /**
        * 默认菜单
        */
        private _defaultMenu: number;
        private _introduce: string[];

        public constructor(defaultMenu: number = 0,introduce:string[] = null) {
            super();
            this._defaultMenu = defaultMenu;
            this._introduce =  introduce;
            this.skinName = "FuliPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.introduce_grp.visible = false;
            this.sign_view.visible = false;
            this.task_view.visible = false;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_rbtn.group.addEventListener(egret.Event.CHANGE, this.showTabContent, this);
            this.sign_rbtn.group.selectedValue = this._defaultMenu;
            if(this._introduce){
                this.content.text = this._introduce[0];
                this.operate.y = this.content.y + this.content.textHeight + 28;
                this.operate.text = this._introduce[1];
            }

            this._viewGroup = [this.sign_view, this.task_view, this.introduce_grp];
            this._viewGroup[this._defaultMenu].visible = true;

            this._btnGroup = [this.sign_rbtn, this.task_rbtn, this.introduce_rbtn];
            this._btnGroup[this._defaultMenu].selected = true;
            this.addRedPoint();

            uniLib.Global.addEventListener(CmdConstant.NOVICEINFO, this.onNoviceInfo, this);
        }

        private addRedPoint() {
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Task_EveryDay, [[this.red2]]);
        }

        private removeRedPoint() {
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Act_DaySign);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Task_EveryDay);
        }
        private showTabContent(evt: egret.Event): void {
            this._viewGroup[this._defaultMenu].visible = false;
            let rbGroup: eui.RadioButtonGroup = evt.target;
            this._defaultMenu = parseInt(rbGroup.selectedValue);
            this._viewGroup[this._defaultMenu].visible = true;
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            uniLib.PopUpMgr.removePopUp(this);
        }

        /**
         * 签到领取了之后直接显示任务
         */
        private onNoviceInfo(evt: uniLib.ZqEvent): void {
            this.sign_view.onNoviceInfo(evt.param);
            let canReceive: boolean = false;
            for (var i: number = 0; i < evt.param.length; i++) {
                if (evt.param[i].status == 3)
                    canReceive = true;
            }
            if (canReceive) {

            }
            else {
                this._viewGroup[this._defaultMenu].visible = false;
                this._defaultMenu = 1;
                this._viewGroup[this._defaultMenu].visible = true;
                this._btnGroup[this._defaultMenu].selected = true;
            }
        }

        public destroy(): void {
            this._introduce = null;
            uniLib.Global.removeEventListener(CmdConstant.NOVICEINFO, this.onNoviceInfo, this);
            this._viewGroup = null;
            this._btnGroup = null;
            this.removeRedPoint();
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_rbtn.group.removeEventListener(egret.Event.CHANGE, this.showTabContent, this);
            this.sign_view.destroy();
            this.task_view.destroy();
            this.removeChildren();
        }
    }
}