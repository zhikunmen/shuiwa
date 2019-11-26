module reward {
    export class DiamondsPanel extends eui.Component {

        private _closeBtn: eui.WxButton;
        private itme1: eui.Group;
        private itme2: eui.Group;
        private itme3: eui.Group;
        private itme4: eui.Group;
        private groups: eui.Group[];
        private effects: eui.WxContain[] = [];

        private _funs: Function[];
        private _arg: any[];

        public constructor() {
            super();
            this.skinName = "DiamondsPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.groups = [this.itme1, this.itme2, this.itme3, this.itme4];
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i: number = 0; i < this.groups.length; i++) {
                this.groups[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            uniLib.Global.addEventListener(CmdConstant.DIAMONDINTERFACETIPS, this.onDiamondInterfaceTips, this);
            this.initData();
        }

        private initData(type: number = 2): void {
            let req: Cmd.GetDiamondInterfaceTips_C = new Cmd.GetDiamondInterfaceTips_C();
            req.typ = type;
            NetMgr.tcpSend(req);
        }

        private onDiamondInterfaceTips(evt: uniLib.ZqEvent): void {
            let rev: Cmd.GetDiamondInterfaceTips_S = evt.param;
            var tips: number[] = rev.tips;
            if (tips == null || tips.length == 0)
                return;
            this.clearEffect();
            for (var i: number = 0; i < tips.length; i++) {
                this.addEffect(tips[i] - 1);
            }
        }

        private clearEffect(): void {
            for (var i: number = 0; i < this.effects.length; i++) {
                this.effects[i].dispose();
                this.effects[i].removeChildren();
                uniLib.DisplayUtils.removeFromParent(this.effects[i]);
            }
            this.effects = [];
        }

        private addEffect(index: number): void {

            var group: eui.WxContain = new eui.WxContain();
            group.x = group.y = 0;
            var anim: eui.ArmatureComponent = new eui.ArmatureComponent();
            anim.resName = "yuanquan";
            anim.update();
            anim.x = 88;
            anim.y = 89;
            group.addChild(anim);

            var iconNum: number = index + 1;
            var icon: egret.Bitmap = new egret.Bitmap(RES.getRes("reward_icon" + iconNum + "_png"));
            icon.x = (175 - icon.width) / 2;
            icon.y = (178 - icon.height) / 2;;
            group.addChild(icon);

            var tuijian: egret.Bitmap = new egret.Bitmap(RES.getRes("reward_tuijian_png"));
            tuijian.x = 93;
            tuijian.y = -2;
            group.addChild(tuijian);

            this.groups[index].removeChildAt(0);
            this.groups[index].addChildAt(group, 0);
            this.effects.push(group);
        }

        /**
         * 设置回调函数
         * 数组第一个：分享有礼
         *  第二个：每日任务
         * 第三个：免费钻石赛
         * 第四个：领钻石
         * 第五个：商城
        */
        public setBackFuns(funs: Function[], arg: any[]): void {
            this._funs = funs;
            this._arg = arg;
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this.itme1:
                    this.callFun(0);
                    break;
                case this.itme2:
                    this.callFun(1);
                    break;
                case this.itme3:
                    this.callFun(2);
                    break;
                case this.itme4:
                    this.callFun(3);
                    break;
            }
        }

        private callFun(index: number): void {
            if (this._funs && this._funs.length >= index && this._funs[index])
                this._funs[index].apply(this, [this._arg[index]]);
            else {
                console.error("没配置第" + index + "个的回调函数");
            }
        }

        public destroy(): void {
            this._funs = null;
            this.clearEffect();
            uniLib.Global.removeEventListener(CmdConstant.DIAMONDINTERFACETIPS, this.onDiamondInterfaceTips, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i: number = 0; i < this.groups.length; i++) {
                this.groups[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.groups[i] = null;
            this.removeChildren();
        }
    }
}