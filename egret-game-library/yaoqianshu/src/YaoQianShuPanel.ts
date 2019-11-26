module yaoqianshu {
    export class YaoQianShuPanel extends eui.Component {

        private _closeBtn: eui.WxButton;
        private _anim: dragonBones.Movie;
        private _level: eui.BitmapLabel;
        private _progressTex: eui.Label;
        private _pickUp: eui.WxButton;
        private _recharge: eui.WxButton;
        private _upgrade: eui.WxButton;
        private _yaojinzhu: eui.WxButton;
        private _yaoyinzhu: eui.WxButton;
        private _glodNum: eui.ProgressBar;
        private _pcikupGroup: eui.Group;
        private _mcardTip: eui.Group;
        private moneyTreeData: Cmd.GetMoneyTreeDataLobby_S;
        private timer: number;
        private _jinyinzhuNum: number[] = [0, 0];//索引0 是金猪 1 是银猪

        private GOLDTREE_YAODONG: string = "yaodong";
        private GOLDTREE_JINBISHAO: string = "jinbishao";
        private GOLDTREE_JINBIDUO: string = "jinbiduo";

        constructor() {
            super();
            this.skinName = "YaoQianShuSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvents();
            var movie: string = "yaoqianshu";
            this._anim = uniLib.DragonUtils.createDragonBonesDisplay(movie + "_ske_json", movie + "_tex_json", movie + "_tex_png", uniLib.DragonType.ARMATURE);
            this._anim.display.x = 490;
            this._anim.display.y = 380;
            this._anim.display.scaleX = this._anim.display.scaleY = 1.5
            this._anim.display.touchEnabled = true;
            this.addChildAt(this._anim.display, 9);
            this._glodNum.minimum = 0;
            this._mcardTip.touchEnabled = false;
            this.initUI();

            if(MJLobbyData.getInstance().lobbyId == 60){
                this._yaojinzhu.visible = false;
                this._yaoyinzhu.visible = false;
            }
        }

        private addEvents(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(CmdConstant.GLODELE_DATA, this.updata, this);
            uniLib.Global.addEventListener(CmdConstant.GLODELE_GETREWARD, this.getRewardResult, this);
            uniLib.Global.addEventListener(CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.addEventListener(CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
        }

        private removeEvents(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.removeEventListener(CmdConstant.GLODELE_DATA, this.updata, this);
            uniLib.Global.removeEventListener(CmdConstant.GLODELE_GETREWARD, this.getRewardResult, this);
            uniLib.Global.removeEventListener(CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
        }

        private onTouchHandle(e: egret.TouchEvent): void {
            let target: any = e.target;
            if (target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            } else if (target == this._pickUp) {
                if (MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid) {
                    this.getReward();
                } else {
                    this.getMonthCard();
                }
            } else if (target == this._anim.display) {
                this.playAnim(this.GOLDTREE_YAODONG);
                if (!MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid)
                    this._mcardTip.visible = true;
                this.clear();
                this.timer = setTimeout(() => {
                    this.treeShake(this.moneyTreeData.produce);
                    this._mcardTip.visible = false;
                }, 1000);
            } else if (target == this._upgrade || target == this._recharge) {
                LobbyModuleMgr.getInstance().showMarketPanel(0);
            } else if (target == this._yaojinzhu) {
                this.userDaoJu(335, this._jinyinzhuNum[0]);
            } else if (target == this._yaoyinzhu) {
                this.userDaoJu(334, this._jinyinzhuNum[1]);
            }
        }

        private userDaoJu(goodId: number, num: number): void {
            if (num == 0) {
                match.OnGetSceneInfoHpMatchCmd_C(match.BigSceneType.TYPE_PIG, match.GameId.ID_MATCH_PIG)
            } else {
                let req: Cmd.BackpackExchangeRequestBackpackCmd_C = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo: Cmd.BackpackInfo = new Cmd.BackpackInfo();
                packInfo.goodId = goodId;
                packInfo.number = 1;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
            }
        }

        /**
         * 刷新页面数据
         */
        private updata(e: uniLib.ZqEvent): void {
            this.moneyTreeData = e.param;
            let level = this.moneyTreeData.level;
            this.treeShake(this.moneyTreeData.produce);
            if (Boolean(this.moneyTreeData.receive)) {
                this._pickUp.currentState = "up";
                this._pickUp.touchEnabled = true;
            } else {
                this._pickUp.currentState = "disabled";
                this._pickUp.touchEnabled = false;
            }
            // this._pickUp.enabled = Boolean(this.moneyTreeData.receive);
            if (level > 0) {
                this._level.text = "L" + level;
                this.getGlod(this.moneyTreeData.produce, level);
            } else {
                this._recharge.visible = true;
                this._pcikupGroup.visible = false;
            }
        }

        /*设置金币数量和进度条*/
        private getGlod(val: number, level: number): void {
            var max = ((level - 1) * 60 + 1000) * 5;
            // val = max/2;
            this._glodNum.maximum = max;
            this._glodNum.value = val;
            this._progressTex.textFlow = <Array<egret.ITextElement>>[{ text: val + "", style: { "textColor": 0xffffff } }, { text: "/" + max, style: { "textColor": 0xffc430 } }];
        }

        /**
         * 领取金币返回数据
         */
        private getRewardResult(e: uniLib.ZqEvent): void {
            let rev: Cmd.GetMoneyTreeGoldLobby_S = e.param;
            uniLib.TipsUtils.showTipsDownToUp("领取了" + this.moneyTreeData.produce + "金币！");
            this.initUI();
        }

        //查找
        private backPackListHandler(evt: uniLib.ZqEvent): void {
            var curData: Cmd.BackpackInfoReturnBackpackCmd_S = evt.param;
            var backpackList: Cmd.BackpackInfo[] = curData.backpackList;
            if (backpackList && backpackList.length > 0) {
                backpackList.forEach(b => {
                    if (b.goodId == 335)  //金猪
                        this._jinyinzhuNum[0] = b.number;
                    else if (b.goodId == 334)    //银猪
                        this._jinyinzhuNum[1] = b.number;
                })
            }
        }

        private backPackExchangeHandler(evt: uniLib.ZqEvent): void {
            var curData: Cmd.BackpackExchangeReturnBackpackCmd_S = evt.param;
            if (curData.backpackInfo.goodId == 335)
                this._jinyinzhuNum[0] = curData.backpackInfo.number;
            else if (curData.backpackInfo.goodId == 334)
                this._jinyinzhuNum[1] = curData.backpackInfo.number;
        }

        /**获取月卡信息*/
        private getMonthCard(): void {
            let msg: uniLib.MsgBox = new uniLib.MsgBox("月卡用户才能领取，是否立即开通月卡？", "", "开通", () => {
                let req = new Cmd.GetMonthCardInfoLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                NetMgr.tcpSend(req);
            }, "取消", null, this);
            uniLib.PopUpMgr.addPopUp(msg, null, true, true, false, uniLib.PopUpEffect.CENTER);
        }


        /**
         * 获取金币
         */
        private getReward(): void {
            let req: Cmd.GetMoneyTreeGoldLobby_C = new Cmd.GetMoneyTreeGoldLobby_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);
        }

        private initUI(): void {
            let req: Cmd.GetMoneyTreeDataLobby_C = new Cmd.GetMoneyTreeDataLobby_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);

            let req1: Cmd.BackpackInfoRequestBackpackCmd_C = new Cmd.BackpackInfoRequestBackpackCmd_C();
            NetMgr.tcpSend(req1);
        }

        /** 根据金币数量要确定摇钱树动画*/
        private treeShake(goldNum: number) {
            if (goldNum > ((this.moneyTreeData.level - 1) * 60 + 1000) * 2.5) {
                // this._anim.play(this.GOLDTREE_JINBIDUO);
                this.playAnim(this.GOLDTREE_JINBIDUO);
            } else {
                // this._anim.play(this.GOLDTREE_JINBISHAO);
                this.playAnim(this.GOLDTREE_JINBISHAO);
            }
        }
        private animationName: string;
        private playAnim(animationName: string): void {
            this.animationName = animationName;
            uniLib.DragonUtils.runDragonBonesArmature(this._anim, animationName);
        }

        private clear(): void {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        }

        public destroy(): void {
            this.removeEvents();
            this._mcardTip.visible = false;
            this.clear();
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeFromParent(this._anim.display);
            if (this.animationName)
                uniLib.DragonUtils.destoryDragonBonesArmature(this._anim, this.animationName);
        }
    }
}