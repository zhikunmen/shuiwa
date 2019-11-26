module guide {
    export class FirstGuidePanel extends eui.Component {

        public exchange_btn: eui.WxButton;
        public sign_lst: eui.List;
        public todayReward_lbl: eui.Label;
        public reward_blbl: eui.BitmapLabel;
        public desc_lbl: eui.Label;

        private _info: Cmd.GetNewRedPackdInfoHpMatchCmd_S;

        public constructor(info?: Cmd.GetNewRedPackdInfoHpMatchCmd_S) {
            super();
            this._info = info;
            this.skinName = "FirstGuidePanelSkin";
        }

        public childrenCreated(): void {
            super.childrenCreated();
            this.desc_lbl.textFlow = <Array<egret.ITextElement>>[{ text: "2.每日随机领取1元以上奖券，游戏" }, { text: "五分钟", style: { textColor: 0xff0000 } },
            { text: "后领取，可获得更高奖励" }];
            uniLib.Global.addEventListener(guide.GuideConsts.REDPACK_DATA, this.onUpdate, this);
            this.exchange_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            this.sign_lst.itemRenderer = GuideItem;
            if (this._info) {
                this.setData(this._info);
            }
            else {
                NetMgr.tcpSend(new Cmd.GetNewRedPackdInfoHpMatchCmd_C());
            }
        }

        private setData(info: Cmd.GetNewRedPackdInfoHpMatchCmd_S) {
            this.sign_lst.dataProvider = new eui.ArrayCollection(info.infos);
            this.sign_lst.dataProviderRefreshed();
            this.todayReward_lbl.text = info.todayNum + "奖券";
            this.reward_blbl.text = info.totalNum.toFixed(1) + "元";
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (this._info.bChange == 0) {
                let confim = new commonConfirm.ConfirmPanel("第七日签到完成后才可以兑换红包哦");
                uniLib.PopUpMgr.addPopUp(confim, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (this._info.bChange == 1) {
                if (this._info.totalNum > 0) {
                    let confim = new commonConfirm.ConfirmPanel("满10元才可提现，是否兑换成等额金币", null, null, () => {
                        NetMgr.tcpSend(new Cmd.ExchangeNewRedPackHpMatchCmd_C());
                        uniLib.PopUpMgr.removePopUp(this);
                    }, () => { });
                    uniLib.PopUpMgr.addPopUp(confim, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                }
            }
        }

        private onItemTap() {
            let info: Cmd.NewSignItem = this.sign_lst.selectedItem;
            info.status == 3 && NetMgr.tcpSend(new Cmd.GetNewRedPackRewardHpMatch_C());
        }

        private onUpdate(evt: uniLib.ZqEvent) {
            this._info = evt.param;
            this.setData(evt.param);
        }

        public destroy(): void {
            this._info = null;
            uniLib.Global.removeEventListener(guide.GuideConsts.REDPACK_DATA, this.onUpdate, this);
            this.exchange_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            this.removeChildren();
        }
    }

    class GuideItem extends eui.ItemRenderer {

        public rev_img: eui.Image;
        public day_lbl: eui.Label;
        public light_img: eui.Image;

        constructor() {
            super();
            this.skinName = "GuideItemSkin";
            this.once(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.NewSignItem = this.data;
            this.day_lbl.text = `第${info.day}天`;
            if (info.status == 1) {
                this.light_img.visible = false;
                this.rev_img.visible = true;
                this.rev_img.source = "guide_sign_json.lb_xinshou_weilingqu";
            }
            else if (info.status == 2) {
                this.light_img.visible = false;
                this.rev_img.visible = true;
                this.rev_img.source = "guide_sign_json.lb_xinshou_yilingqu";
            }
            else if (info.status == 3) {
                this.light_img.visible = true;
                egret.Tween.get(this.light_img, { loop: true }).to({ rotation: 360 }, 1000);
                this.rev_img.visible = false;
            }
            else if (info.status == 4) {
                this.light_img.visible = false;
                this.rev_img.visible = false;
            }
        }

        public destroy() {
            egret.Tween.removeTweens(this.light_img);
            this.light_img = null;
        }
    }
}