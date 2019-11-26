//折叠菜单区域（新增）
namespace SWGAME{

    type BtnArrY =
        {
            bgHeight:number,//展开后按钮背景高度
            setBtnY:number,//展开后设置按钮位置
            helpBtnY:number,//展开后帮助按钮位置
            safeBtnY:number,//展开后保险箱按钮位置
            backBtnY:number//展开后返回大厅按钮位置
        };

    export class MenuArea extends egret.DisplayObjectContainer{


        private _foldBtn:GameButton;//折叠按钮

        private _setBtn: GameButton;//设置按钮
        private _helpBtn: GameButton;//游戏秘籍
        private _safeBtn: GameButton;//保险箱按钮
        private _backBtn: GameButton;//返回大厅

        private _btnFrame:egret.DisplayObjectContainer;//折叠区域
        private _btnBg:egret.Bitmap;//按钮背景

        //上述4个按钮展开后Y轴位置
        private _btnArrY:BtnArrY;

        public constructor() {
            super();
            this.initUI()
        }

        private initUI(){

            this.name = 'menuArea';
            //折叠按钮初始化
            this._foldBtn = new GameButton(["sw_btn_fold_png", "sw_btn_fold_png"]);
            this._foldBtn.anchorOffsetX = this._foldBtn.width/2;
            this._foldBtn.anchorOffsetY = this._foldBtn.height/2;
            this._foldBtn.x = 25 + this._foldBtn.width/2;
            this._foldBtn.y = 25 + this._foldBtn.height/2;
            this._foldBtn.touchEnabled = true;
            this.addChild(this._foldBtn);
            this._foldBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFold, this);

            //初始化按钮背景
            this._btnFrame = new egret.DisplayObjectContainer();
            [this._btnFrame.x,this._btnFrame.y]  = [21, 97];
            let bg:egret.Bitmap = new egret.Bitmap();
            bg.texture = RES.getRes("sw_btn_bg_png");
            bg.scale9Grid = new egret.Rectangle(12, 12, 9, 10);
            bg.width = 200;
            bg.height = 20 + 45 + 20;
            bg.name = "sw_btn_bg_img";
            bg.visible = false;
            this._btnFrame.addChild(bg);
            this._btnBg = bg;

            this.addChild(this._btnFrame);

            this._btnArrY= {
                bgHeight:276,
                setBtnY:0,//展开后设置按钮位置
                helpBtnY:0,//展开后帮助按钮位置
                safeBtnY:0,//展开后保险箱按钮位置
                backBtnY:0//展开后返回大厅按钮位置
            };

            //设置按钮初始化
            this._btnArrY.setBtnY = 20;
            this._setBtn = new GameButton(["sw_btn_set_png", "sw_btn_set_png"]);
            this._setBtn.x = 19;
            this._setBtn.y = 20;
            this._setBtn.touchEnabled = false;
            this._setBtn.visible = false;
            this._setBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
            this._btnFrame.addChild(this._setBtn);

            //帮助按钮初始化
            this._btnArrY.helpBtnY = this._btnArrY.setBtnY + this._setBtn.height + 20;
            this._helpBtn = new GameButton(["sw_btn_help_png", "sw_btn_help_png"]);
            this._helpBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnTouch, this);
            this._helpBtn.x = 19;
            this._helpBtn.y = this._btnArrY.setBtnY;
            this._helpBtn.touchEnabled = false;
            this._helpBtn.visible = false;
            this._btnFrame.addChild(this._helpBtn);

            //保险箱按钮初始化
            this._btnArrY.safeBtnY = this._btnArrY.helpBtnY + this._helpBtn.height + 20;
            this._safeBtn = new GameButton(["sw_btn_safe_png", "sw_btn_safe_png"]);
            this._safeBtn.x = 19;
            this._safeBtn.y = this._btnArrY.setBtnY;
            this._safeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSafeBtnTouch, this);
            this._safeBtn.touchEnabled = false;
            this._safeBtn.visible = false;
            this._btnFrame.addChild(this._safeBtn);

            //返回按钮初始化
            this._btnArrY.backBtnY = this._btnArrY.safeBtnY + this._safeBtn.height + 20;
            this._backBtn = new GameButton(["sw_btn_return_png", "sw_btn_return_png"]);
            this._backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveRoom, this);
            this._backBtn.x = 19;
            this._backBtn.y = this._btnArrY.setBtnY;
            this._backBtn.touchEnabled = false;
            this._backBtn.visible = false;
            this._btnFrame.addChild(this._backBtn);

            //调整上面按钮的深度
            this._btnFrame.swapChildren(this._backBtn, this._setBtn);
            this._btnFrame.swapChildren(this._safeBtn, this._helpBtn);
        }

        public destroy(): void {
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeAllChildren(this);

            if (this._setBtn) {
                this._setBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSet, this);
                uniLib.DisplayUtils.removeFromParent(this._setBtn);
                this._setBtn.destory();
            }

            if (this._backBtn) {
                this._backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeaveRoom, this);
                uniLib.DisplayUtils.removeFromParent(this._backBtn);
                this._backBtn.destory();
            }
            if (this._helpBtn) {
                this._helpBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onHelpBtnTouch, this);
                uniLib.DisplayUtils.removeFromParent(this._helpBtn);
                this._helpBtn.destory();
            }


            this._setBtn = null;
            this._backBtn = null;//返回大厅
            this._helpBtn = null;//游戏秘籍

        }

        private onFold(){

            if(this._btnBg.visible){
                //未折叠状态
                //变为不可点击状态
                this._setBtn.touchEnabled = false;
                this._helpBtn.touchEnabled = false;
                this._safeBtn.touchEnabled = false;
                this._backBtn.touchEnabled = false;

                //折叠动画
                btnTween(this._setBtn,this._setBtn.y,false);
                btnTween(this._helpBtn,this._setBtn.y,false);
                btnTween(this._safeBtn,this._setBtn.y,false);
                btnTween(this._backBtn,this._setBtn.y,false);
                egret.Tween.get(this._btnBg).to({height:20 + 45 + 20},200,egret.Ease.circInOut).call(()=>{
                    this._btnBg.visible = false;
                });

                egret.Tween.get(this._foldBtn).to({rotation:0},200,egret.Ease.circInOut);

                return;
            }

            //已折叠状态

            //变为可见状态
            this._setBtn.visible = true;
            this._helpBtn.visible = true;
            this._safeBtn.visible = true;
            this._backBtn.visible = true;
            this._btnBg.visible = true;

            //播放展开/折叠动画
            function btnTween(btn:GameButton, posititonY:number, type:boolean){
                //type:true展开，false折叠
                egret.Tween.get(btn).to({y:posititonY},200,egret.Ease.circInOut)
                    .call(()=>{
                        if(type) {
                            btn.touchEnabled = true;
                        }else{
                            btn.visible = false;
                        }
                    });
            }

            btnTween(this._setBtn,this._btnArrY.setBtnY,true);
            btnTween(this._helpBtn,this._btnArrY.helpBtnY,true);
            btnTween(this._safeBtn,this._btnArrY.safeBtnY,true);
            btnTween(this._backBtn,this._btnArrY.backBtnY,true);
            egret.Tween.get(this._btnBg).to({height:this._btnArrY.bgHeight},200,egret.Ease.circInOut);
            egret.Tween.get(this._foldBtn).to({rotation:-180},200,egret.Ease.circInOut);
        }

        private onSet(): void {
            this.dispatchEventWith(UIEventConsts.SHOW_SETTING);
        }

        private onHelpBtnTouch(): void {
            this.dispatchEventWith(UIEventConsts.SHOW_HELP);
        }

        private onLeaveRoom() {

            this.dispatchEventWith(UIEventConsts.EXIT_GAME, false);

        }

        private onSafeBtnTouch(){
            //TODO
            console.warn('open safe');
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SAFEBOX);
        }

    }
}