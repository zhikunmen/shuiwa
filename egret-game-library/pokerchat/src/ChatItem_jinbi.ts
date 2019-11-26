module pokerchat {
	/**
	 * 快捷聊天 id：20-25  金币
	 */
    export class ChatItem_jinbi extends eui.ItemRenderer {
        private chatid: number;
        private chatItem: eui.Label;
        public constructor() {
            super();
            this.skinName = "poker_jinbi_ChatItemSkin";
        }

        protected dataChanged() {
            super.dataChanged();
            this.chatid = this.data;
            let shortArr = [
                "又断线了，网络怎么这么差啊！",
                "各位，真不好意思，我要离开一会",
                "你的牌打得也忒好了！",
                "下次咱们再玩吧！",
                "不要走，决战到天亮！",
                "快点吧，都等得我花都谢了！"
            ];
            this.chatItem.text = shortArr[this.data];
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        private onClick(e: egret.TouchEvent) {
            var name: string = "2" + this.chatid;
            ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_CHAT, false, name);
        }
    }
}