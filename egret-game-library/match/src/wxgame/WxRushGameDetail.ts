module match {
    /**
     * 闯关报名
     */
    export class WxRushGameDetail extends eui.Component {

        public bg_img: eui.Image;
        public title_img: eui.Image;
        public close_btn: eui.WxButton;
        public begin_btn: eui.WxButton;
        public continue_btn: eui.WxButton;
        public condition_lbl: eui.Label;

        public pass_db: dragonBones.Armature;

        private _data: Cmd.RushInfo;
        private _gameId: number;

        constructor(data: { info: Cmd.RushInfo, gameId: number }) {
            super();
            this._gameId = data.gameId;
            this._data = data.info;
            this.skinName = "WxRushGameDetailSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.bg_img.width = uniLib.Global.screenWidth;
            this.bg_img.x = (this.width - uniLib.Global.screenWidth) >> 1;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.continue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (this._data) {
                this.title_img.source = `match_rush_json.cg_js_title_${this._data.type}`;
                let round;
                for (let i = 0; i < this._data.details.length; i++) {
                    let det = this._data.details[i];
                    this["reward" + i].text = this.format(det.rewads);
                    this["zz" + i].source = det.pass ? "match_rush_json.cg_js_zhuzi_2" : "match_rush_json.cg_js_zhuzi_1";
                    this["tg" + i].visible = det.pass;
                    if (det.maxFokas) {
                        this["cd" + i] && (this["cd" + i].visible = !det.pass);
                        this["fk" + i] && (this["fk" + i].visible = !det.pass);
                        this["fkl" + i] && (this["fkl" + i].visible = !det.pass);
                        this["fkl" + i] && (this["fkl" + i].text = `${det.minFokas}-${det.maxFokas}`);
                    }
                    this["cg" + i].text = det.userNbr + "人闯关成功";
                    if (det.pass == 0 && round == undefined) {
                        round = i;
                    }
                }
                if (round != undefined) {
                    this.pass_db = uniLib.DragonUtils.createDragonBonesDisplay("jiangbei_ske_json", "jiangbei_tex_json", "jiangbei_tex_png", uniLib.DragonType.ARMATURE);
                    let slot = this.pass_db.getSlot("jiangbei");
                    let bmp = new egret.Bitmap(RES.getRes(`match_rush_json.cg_js_jiangbei${round + 1}`));
                    bmp.anchorOffsetX = bmp.width >> 1;
                    bmp.anchorOffsetY = bmp.height >> 1;
                    slot.display = bmp;
                    this.pass_db.display.x = this[`round${round}`].x + 54;
                    this.pass_db.display.y = this[`round${round}`].y + 54;
                    this[`round${round}`].visible = false;
                    uniLib.DragonUtils.runDragonBonesArmature(this.pass_db, "newAnimation", 0);
                    this.addChild(this.pass_db.display);
                }
                if (this._data.signFee) {
                    this.continue_btn.visible = false;
                    this.begin_btn.horizontalCenter = 0;
                    let signFee = this._data.signFee[0];
                    this.begin_btn.label = "x" + (signFee.goodNbr > 10000 ? signFee.goodNbr / 10000 + "万" : signFee.goodNbr);
                    if (signFee.goodId == GoodType.TYPE_DIAMOND) {
                        this.begin_btn["type"].source = "wx_lb_res_json.lb_diamond_png";
                    }
                    else if (signFee.goodId == GoodType.TYPE_FUKA) {
                        this.begin_btn["type"].source = "wx_lb_res_json.cg_baoming_BMfuka_png";
                    }
                    else if (signFee.goodId == GoodType.TYPE_GOLD) {
                        this.begin_btn["type"].source = "wx_lb_res_json.lb_jinbi_jinbi_png";
                    }
                    if (this._data.enterLimit) {
                        this.condition_lbl.textFlow = <Array<egret.ITextElement>>[{ text: `报名条件:福卡≥${this._data.enterLimit}`, style: { underline: true } }];
                        this.condition_lbl.visible = true;
                    }
                }
                else {
                    this.begin_btn.visible = false;
                    this.continue_btn.horizontalCenter = 0;
                }
            }
        }

        private format(items: Cmd.RewardItem[]): string {
            let egg = "";
            let str;
            for (let i = 0; i < items.length; i++) {
                str = str ? str + "\n" : "";
                let item = items[i];
                if (item.goodId == GoodType.TYPE_DIAMOND) {
                    str += `${item.goodNbr}钻石`;
                }
                else if (item.goodId == GoodType.TYPE_FUKA) {
                    str += `${item.goodNbr}福卡`;
                }
                else if (item.goodId == GoodType.TYPE_GOLD) {
                    str += `${item.goodNbr}金币`;
                }
                else if (item.goodId == GoodType.TYPE_EGG) {
                    egg = "福卡彩蛋";
                }
            }
            return str + egg;
        }


        public onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.begin_btn) {
                let signFee = this._data.signFee[0];
                if (judgeItemIsEnough(signFee.goodId, signFee.goodNbr)) {
                    OnEnterRushHpMatchCmd_C(this._data.type, this._gameId);
                }
            }
            else if (evt.target == this.continue_btn) {
                OnEnterRushHpMatchCmd_C(this._data.type, this._gameId);
            }
        }

        public destroy() {
            uniLib.DragonUtils.destoryDragonBonesArmature(this.pass_db, "newAnimation");
            this.pass_db = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.continue_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._data = null;
        }
    }
}