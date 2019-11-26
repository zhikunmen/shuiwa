
module club {
    /**导入成员 */
    export class ClubImportPanel extends commonpanel.LobbyBaseEuiPanel {
        /**导入按钮 */
        private _importBtn: eui.WxButton;
        /**关闭按钮*/
        private _closeBtn: eui.Button;
        /** 数据列表*/
        private _clubList: eui.List;
        /** 数据列表容器*/
        private _clubListArr: eui.ArrayCollection;
        /**可导入俱乐部数据 */
        private _matchArr: Cmd.MathGroup[];
        /**老友圈昵称 */
        private _matchName: string;
        constructor() {
            super();
            this.skinName = "ClubImportSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.GetCanImportMemberListMatchGroup, this.showdate, this);
            this._clubList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.GetCanImportMemberListMatchGroup, this.showdate, this);
            this._clubList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        //初始化
        protected initUI(): void {
            this._clubList.itemRenderer = ClubImportItemPanel;
        }

        private showdate(evt: uniLib.ZqEvent): void {
            var member = evt.param as Cmd.GetCanImportMemberListMatchGroupCmd_CS;
            this._matchArr = member.matchLists;
            this.updateList();
        }
        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._closeBtn:
                    ClubData.getInstance().ClubImportMatchId = 0;
                    super.removePop();
                    break;
                case this._importBtn:
                    if (ClubData.getInstance().ClubImportMatchId == 0) {
                        uniLib.TipsUtils.showConfirm("请选择需要导入的老友圈！", "", "确定", null);
                    } else {
                        uniLib.TipsUtils.showConfirm("确认导入" + this._matchName + "老友圈！", "", "确定", () => {
                            let cmd = new Cmd.ImportMemberListMatchGroupCmd_CS();
                            cmd.fromMatchId = ClubData.getInstance().ClubImportMatchId;
                            cmd.toMatchId = ClubData.getInstance().matchid;
                            NetMgr.tcpSend(cmd);
                            ClubData.getInstance().ClubImportMatchId = 0;
                            super.removePop();
                        }, "取消", null);
                    }
                    break;


            }
        }
        private itemTap(evt: eui.ItemTapEvent): void {
            if (this._clubList.selectedItem) {
                let item = this._clubList.selectedItem as Cmd.MathGroup;
                if (item.matchId == ClubData.getInstance().ClubImportMatchId) {
                    ClubData.getInstance().ClubImportMatchId = 0;
                    this._matchName = "";
                } else {
                    ClubData.getInstance().ClubImportMatchId = item.matchId;
                    this._matchName = item.matchName;
                }
            }
            this.updateList();

        }
        /**更新显示 */
        private updateList(): void {
            if (!this._clubListArr) {
                this._clubListArr = new eui.ArrayCollection(this._matchArr);
                this._clubList.dataProvider = this._clubListArr;
            } else {
                if (Array.isArray(this._clubListArr.source)) {
                    this._clubListArr.removeAll();
                }
                this._clubListArr.replaceAll(this._matchArr);
            }
        }
    }

    /**导入成员Item */
    export class ClubImportItemPanel extends eui.ItemRenderer {
        /** 选中图标*/
        private _selectImg: eui.Image;
        /**俱乐部昵称 */
        private _clubNameText: eui.Label;
        /**俱乐部Id */
        private _clubIdText: eui.Label;
        /** 成员人数*/
        private _numText: eui.Label;
        private _info: Cmd.MathGroup;

        constructor() {
            super();
            this.skinName = "ClubImportItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged(): void {
            this._info = this.data;
            this._clubNameText.text = this._info.matchName;
            this._clubIdText.text = this._info.matchId + '';
            this._numText.text = this._info.memberNum + '';
            if (this._info.matchId == ClubData.getInstance().ClubImportMatchId) {
                this._selectImg.visible = true;
            }
        }
    }
}