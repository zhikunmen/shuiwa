module match {
    export class WxPigPassItem extends eui.ItemRenderer {
        public lock_img: eui.Image;
        public pass_lbl: eui.Label;

        constructor(data: Cmd.ChallengeInfo) {
            super();
            this.skinName = "WxPigPassItemSkin";
        }

        protected dataChanged() {
            super.dataChanged();
            let info: Cmd.RoundItem = this.data;
            if (info.unlock == 1) {
                this.lock_img.visible = false;
                this.touchEnabled = true;
                this.touchChildren = true;
                this.pass_lbl.text = `第${info.round}关`;
            }
            else {
                this.lock_img.visible = true;
                this.touchChildren = false;
                this.touchEnabled = false;
                this.pass_lbl.text = "";
            }
        }
    }
}