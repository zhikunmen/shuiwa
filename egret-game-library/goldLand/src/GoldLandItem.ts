module goldLand {
    export class GoldLandItem extends eui.ItemRenderer {

        public static CardTypes:string[] = ["4炸弹","12连顺并胜利","3炸弹并胜利","10连胜","6连胜","累积胜利100局","双关"];
        public static time2str(num: number): string {
            if (num == null)
                return "";
            num = num.toString().length == 10 ? num * 1000 : num;
            var date: Date = new Date();
            date.setTime(num);
            var str: string =  this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
            return str;
        }
        private static getNumStr(num: number): string {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        }

        private card_type: eui.Label;
        private nick_name: eui.Label;
        private num_txt: eui.Label;
        private time_txt: eui.Label;

        constructor() {
            super();
            this.skinName = "GoldLandItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged() {
            super.dataChanged();
            var info: Cmd.HeavenAwardInfo = this.data;

            if(info.uid == uniLib.UserInfo.uid){
                this.card_type.textColor = 0x131cd9;
                this.nick_name.textColor = 0x131cd9;
                this.num_txt.textColor = 0x131cd9;
                this.time_txt.textColor = 0x131cd9;
            }else{
                this.card_type.textColor = 0xD34A1A;
                this.nick_name.textColor = 0xD34A1A;
                this.num_txt.textColor = 0xD34A1A;
                this.time_txt.textColor = 0xD34A1A;
            }

            this.card_type.text = GoldLandItem.CardTypes[info.type -1];
            this.card_type.anchorOffsetX = this.card_type.width>>1;
            this.nick_name.text = info.nickName;
            this.nick_name.anchorOffsetX = this.nick_name.width>>1;
            this.num_txt.text = info.chips+"";
            this.num_txt.anchorOffsetX = this.num_txt.width>>1;

            this.time_txt.text = GoldLandItem.time2str(info.time);
            this.time_txt.anchorOffsetX = this.time_txt.width>>1;

            
        }

        public destroy(): void {
            
        }
    }
}