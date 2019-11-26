module match {
    /**
     * 红包奖励
     */
    export class HpwPackageReward extends eui.Component {

        public record_rbtn: eui.RadioButton;
        public detail_rbtn: eui.RadioButton;
        public openPackage_img: eui.Image;
        public close_btn: match.BaseButton;
        public help_btn: match.BaseButton;
        public revSum_lbl: eui.Label;
        public reward_lst: eui.List;

        private _arrColl: eui.ArrayCollection;

        constructor() {
            super();
            this.skinName = "HpwPackageRewardSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this._arrColl = new eui.ArrayCollection([]);
            this.reward_lst.itemRenderer = HpwPackageRewardItem;
            this.reward_lst.dataProvider = this._arrColl;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

            uniLib.Global.addEventListener(match.EVENT_PACKAGEREWARD, this.onEventHandler, this);
        }

        private onEventHandler(evt: uniLib.ZqEvent) {
            let param: Cmd.GetRedPackRewardInfoLobbyCmd_S = evt.param;
            this.revSum_lbl.text = param.num.toString();
            this._arrColl.source = param.infos.length ? param.infos : [];
            this._arrColl.refresh();
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.detail_rbtn) {
                this._arrColl.source = [];
                this._arrColl.refresh();
            }
            else if (evt.target == this.record_rbtn) {
                this._arrColl.source = [];
                this._arrColl.refresh();
            }
            else if (evt.target == this.openPackage_img) {

            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if(evt.target == this.help_btn){
                let str = '1、玩家在红包比赛场中拿到对应名次获得现金红包。\n2、玩家红包开启时，默认为最大可取整数，满1元可发起提现。 \n3、玩家提取现金红包需关注微信公众号和绑定手机号之后，分享到朋友圈中即可在公众号后台提现。无法领取成功可联系微信客服。\n4、该活动红包最终解释权归本公司所有。'
                let msg = new HpwMsgBox("", str);
                uniLib.PopUpMgr.addPopUp(msg, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
            }
        }

        public destroy() {
            this._arrColl = null;
            uniLib.Global.removeEventListener(match.EVENT_PACKAGEREWARD, this.onEventHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}