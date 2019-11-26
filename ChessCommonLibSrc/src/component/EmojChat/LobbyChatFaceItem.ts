module chessCommonLib {

    /**进入标准场的界面 */
    //大厅更多麻将UI
    export class LobbyChatFaceItem extends eui.ItemRenderer {
      
	private faceIcon: eui.Image;
        

        private faceid: number;

        constructor() {
            super();
            this.skinName = "chessCommonLib.LobbyChatFcaeItemSkin"
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.faceIcon.addEventListener( egret.TouchEvent.TOUCH_TAP, this.showDetail,this);
        }

        protected dataChanged() {
            super.dataChanged();
           this.faceIcon.source = "face_Big_" + this.data;
           this.faceid = this.data;

        }
        /**显示详情 */
        private showDetail() {
            ChatEventDispatcher.instance.dispatchEventWith(ChatEventConsts.SEND_SMILEY, false, this.faceid);
        }
    }



}
