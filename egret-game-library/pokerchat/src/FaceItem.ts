module pokerchat {
	/**
	 * 动画 聊天id：11-118
	 */
	export class FaceItem extends eui.ItemRenderer {
        private faceid: number;
        private faceItem:eui.Image;
        public constructor() {
            super();
            this.skinName = "poker_FaceItemSkin";
        }
       
        protected dataChanged() {
            super.dataChanged();
            this.faceItem.source = "face" + this.data;
            this.faceid = this.data;
            this.faceItem.scaleX = this.faceItem.scaleY = 0.8;
            this.faceItem.x = 13;
            this.faceItem.y = 10;
        }
        protected childrenCreated() {
            super.childrenCreated();
            this.faceItem.addEventListener( egret.TouchEvent.TOUCH_TAP, this.onClick,this);
        }
        private onClick(e: egret.TouchEvent) {
            var id:string = "1"+this.faceid;
            ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_CHAT,false,id);
        }
    }
}