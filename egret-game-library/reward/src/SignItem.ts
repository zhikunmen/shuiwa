module reward {
    export class SignItem extends eui.ItemRenderer {

        private sign_bg: eui.Image;
        private sign_corn: eui.Image;
        private sign_day: eui.Label;
        private sign_good_name: eui.Label;
        private sign_mask: eui.Image;
        private sign_icon: eui.Image;

        constructor() {
            super();
            this.skinName = "SignItemSkin";
        }

        protected dataChanged() {
            super.dataChanged();

            var info: Cmd.NoviceItem = this.data;
            let goods: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.sign_day.text = "第" + info.day + "天";
            this.sign_icon.source = "lb_fuli_json." + goods.goodIcon;
            this.sign_good_name.text = goods.goodName + "x" + info.goodNbr;
            if (info.day == 7) {
                this.sign_bg.width = 386;
                /**红包 */
                if (info.goodId == 336) {
                    this.sign_good_name.text = `最高可得${info.goodNbr}福卡`;
                }
            }

            var day: number = info.day == 7 ? 1 : 2;
            if (info.status == 1) {   //1:过期未领
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle"
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = true;
                this.sign_icon.source = "sign_miss"
            }
            else if (info.status == 2) { //2:已领
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle"
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = true;
                this.sign_icon.source = "sign_receive"
            }
            else if (info.status == 3) { //3.当前可领
                this.sign_bg.source = "sign_getbg" + day;
                this.sign_corn.source = "sign_gettitle"
                this.sign_good_name.textColor = 0xffffff;
                this.sign_mask.visible = false;
            }
            else if (info.status == 4) {//4.日期未到不能领
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle"
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = false;
            }
        }

        public setReceived(day: number): void {
            var days: number = day == 7 ? 1 : 2;
            this.sign_bg.source = "sign_missbg" + days;
            this.sign_corn.source = "sign_misstitle"
            this.sign_good_name.textColor = 0xa46359;
            this.sign_mask.visible = true;
            this.sign_icon.source = "sign_receive"
        }

    }
}