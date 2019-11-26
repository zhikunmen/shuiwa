namespace SWGAME{
    export class ChipReal extends eui.Component{
        constructor(){
            super();
        }

        protected createChildren(){
            super.createChildren();
            this.initUI();
        }

        private _chipBg:eui.Image;
        private _chip_selected:eui.Image;

        protected initUI():void{
            this._chip_selected.visible = false;
        }

        private _betPoint:number;

        public  getBetPoint(){
            return this._betPoint;
        }

        public initChip(betPoint:number){
            this._betPoint = betPoint;
            this._chipBg.texture = GameData.getInstance().getChipResByPoint(betPoint);
        }

        //被点击
        //虚拟的被点击，其实点击的是上层透明的虚拟按钮
        public OnClick(){
            if(this.isActive){
                return;
            }

            this.isActive = true;
            this._chip_selected.visible = true;

            this.dispatchEventWith(UIEventConsts.SELECT_CHIP, false, this._betPoint);
        }

        //是否被激活
        private isActive:boolean = false;

        //去除激活
        public deActive(){
            this.isActive = false;
            this._chip_selected.visible = false;
        }

        public clearChip(){
            this.deActive();
            this._betPoint = null;
            this._chipBg.texture = null;
        }

        public destory():void{

            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}