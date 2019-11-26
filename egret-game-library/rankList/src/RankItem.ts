module rankList {
    export class RankItem extends eui.ItemRenderer {

        public type_img: eui.Image;
        public head_img: eui.Image;
        public _rankTxt: eui.BitmapLabel;
        public nickName_lbl: eui.Label;
        public num_lbl: eui.Label;

        public constructor() {
            super();
            this.skinName = "RankItemSkin";
            this.once(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected dataChanged(): void {
            let data: Cmd.UserRankInfo = this.data;
            this.head_img.source = data.headUrl;
            if (data.rank < 10) {
                this._rankTxt.font = "rank_big_num_fnt";
            }
            else {
                this._rankTxt.font = "rank_small_num_fnt";
            }
            this._rankTxt.text = data.rank + "";
            if (data.nickName.length > 10) {
                this.nickName_lbl.text = (data.nickName).substring(0, 10) + "...";
            }
            else {
                this.nickName_lbl.text = data.nickName;
            }

            if (data.rType == 3) {
                this.type_img.source = "rank_game_res_1_json.paihang_jinzhu";
            }
            else if (data.rType == 4) {
                this.type_img.source = "rank_game_res_1_json.paihang_yinzhu";
            }else if(data.rType == 5){
                this.type_img.source = "game_prop_json.bag_daoju_364";
                commonConfirm.ResUtil.limitImageSize(this.type_img,60);
            }
            this.num_lbl.text = data.allChips + "";
        }

        public destroy(): void {
            // RES.destroyRes(<string>this.head_img.source);
            this.head_img = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}