module packbag {
    export class PackBagItem extends eui.ItemRenderer {

        public bag_bg: eui.Image;
        public bag_icon: eui.Image;
        public bag_num: eui.BitmapLabel;

        constructor() {
            super();
            this.skinName = "PackBagItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged() {
            super.dataChanged();

            var info: Cmd.BackpackInfo = this.data;
            if(info == null){
                this.bag_num.text = "";
                this.bag_icon.source = null;
                this.touchEnabled = false;
                this.touchChildren = false;
                return;
            }
            this.touchEnabled = true;
            this.touchChildren = true;

            var texWidth = 0;
            if(info.lefttime == undefined){
                this.bag_num.text = info.number+"";
            }else{
                var day:number = Math.floor(info.lefttime/(3600*24));
                this.bag_num.text = day+"天";
            }
            this.bag_num.width = this.operateWidth(this.bag_num.text);;
            this.bag_icon.source = "game_prop_json.bag_daoju_"+info.goodId;

        }

        private operateWidth(str:string):number{
            var length:number = 0;
            for(var i:number=0;i<str.length;i++){
                if(str.charAt(i) == ".")
                    length += 7;
                else if(str.charAt(i) == "4")
                    length += 18;
                else if(str.charAt(i) == "天")
                    length += 26;
                else 
                    length += 17;
            }
            return length;
        }

    }
}