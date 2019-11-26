module rankList {
    export class RankVC extends eui.Component {
        public goldPig_btn: eui.Group;
        public _friendBg: eui.Image;
        public _friendBtn:eui.Image;
        public silverPig_btn: eui.Group;
        public _groupBg: eui.Image;
        public _closeBtn: eui.WxButton;
        public rank_img: eui.Image;
        public head_img: eui.Image;
        public type_img: eui.Image;
        public rank_blbl: eui.BitmapLabel;
        public nickName_lbl: eui.Label;
        public num_lbl: eui.Label;
        public _rankList: eui.List;

        private _arrColl: eui.ArrayCollection;
        /**金猪 银猪排行数据 */
        private _goldData: Cmd.GetRankListLobbyCmd_S;
        private _silverData: Cmd.GetRankListLobbyCmd_S;
        private _type:number = 3;

        constructor(type?:number) {
            super();
            if(type)
                this._type = type;
            this.skinName = "RankVCSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvent();
            this._arrColl = new eui.ArrayCollection();
            this._rankList.itemRenderer = RankItem;
            this._rankList.dataProvider = this._arrColl;
            this.nickName_lbl.text = uniLib.UserInfo.nickName;
            this.head_img.source = uniLib.UserInfo.headUrl;
            if(this._type == 5){
                this.silverPig_btn.visible = false;
                this._friendBtn.source = "rank_game_res_1_json.paihang_dantoubang";
                this.type_img.source = "game_prop_json.bag_daoju_364";
                commonConfirm.ResUtil.limitImageSize(this.type_img,60);
                this.goldPig_btn.touchEnabled = false;
            }
            this.getData(this._type);
        }

        //事件监听
        private addEvent(): void {
            uniLib.Global.addEventListener(RankConst.RANK_DATA, this.getWorld, this);
            this.goldPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.silverPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
            this._rankList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        }

        private getData(type: number) {
            let req = new Cmd.GetRankListLobbyCmd_C();
            req.rType = type;
            NetMgr.tcpSend(req);
        }

        private onTouch(evt: egret.TouchEvent) {
            if (evt.target == this.goldPig_btn) {
                this.goldPig_btn.touchEnabled = false;
                this.silverPig_btn.touchEnabled = true;
                this._friendBg.source = "rank_title_bg_2";
                this._groupBg.source = "rank_title_bg_1";
                this.type_img.source = "rank_game_res_1_json.paihang_jinzhu";
                if (this._goldData) {
                    this.setView(this._goldData);
                }
                else {
                    this.getData(3);
                }
            }
            else if (evt.target == this.silverPig_btn) {
                this.silverPig_btn.touchEnabled = false;
                this.goldPig_btn.touchEnabled = true;
                this._groupBg.source = "rank_title_bg_2";
                this._friendBg.source = "rank_title_bg_1";
                this.type_img.source = "rank_game_res_1_json.paihang_yinzhu";
                if (this._silverData) {
                    this.setView(this._silverData);
                }
                else {
                    this.getData(4);
                }
            }
        }

        //渲染世界排行榜
        private getWorld(evt: uniLib.ZqEvent): void {
            let data: Cmd.GetRankListLobbyCmd_S = evt.param;
            /**3金猪 4银猪*/
            if (data.rType == 3) {
                this._goldData = data;
            }
            else if (data.rType == 4) {
                this._silverData = data;
            }
            this.setView(data);
        }

        private setView(data: Cmd.GetRankListLobbyCmd_S) {
            this._arrColl.removeAll();
            this._arrColl.replaceAll(data.rankInfo);
            this._arrColl.refresh();
            if (data.myRank) {
                if (data.myRank < 10) {
                    this.rank_blbl.font = "rank_big_num_fnt";
                }
                else {
                    this.rank_blbl.font = "rank_small_num_fnt";
                }
                this.rank_blbl.text = data.myRank + "";
                this.rank_img.visible = false;
            }
            else {
                this.rank_blbl.text = "";
                this.rank_img.visible = true;
            }
            this.num_lbl.text = data.myChips + "";
        }

        //移除该面板
        private removeSelf(): void {
            uniLib.PopUpMgr.removePopUp(this, uniLib.PopUpEffect.LEFT);
        }

        private onItemTap() {
            let info: Cmd.UserRankInfo = this._rankList.selectedItem;
            let req = new Cmd.UserInfoSearchLobbyCmd_C();
            req.uid = info.uid;
            NetMgr.tcpSend(req);
        }

        private removeEvent(): void {
            uniLib.Global.removeEventListener(RankConst.RANK_DATA, this.getWorld, this);
            this.goldPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.silverPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
            this._rankList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        }

        public destroy(): void {
            this.removeEvent();
            this._arrColl = null;
            this._goldData = null;
            this._silverData = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
