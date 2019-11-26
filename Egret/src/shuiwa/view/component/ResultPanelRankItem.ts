namespace SWGAME{

    export interface ResultPanelRankItemData {
        rank?:string,
        headUrl:string,
        nickName:string,
        point:string;
    }

    export class ResultPanelRankItem extends eui.ItemRenderer{
        public constructor(){
            super();
            this.skinName = sw_resultPanelRankItem;

        }

        // private _realHeadImg:egret.Bitmap;

        private _headImg_bg:eui.Image;

        //金逗图标
        private _golden_icon:eui.Image;
        //钻石图标
        private _diamond_icon:eui.Image;


        protected dataChanged():void{

            if(RoomInfo.getInstance().roomType == 1){
                //金币场
                this._diamond_icon.visible = false;
            }else{
                //钻石场
                this._golden_icon.visible = false;
            }

            // if(!this._realHeadImg) {
            //     let data: ResultPanelRankItemData = this.data;
            //     HeadLoader.getInstance().load(data.headUrl, this.onLoadSuccess, this.onLoadError, this);
            // }

            this._headImg_bg.source = this.data.headUrl;

        }

        // private onLoadSuccess(data:egret.BitmapData){
        //     // this._headImg.source = data.source;
        //     let headImg:egret.Bitmap = new egret.Bitmap(data);
        //     headImg.name = 'headImg_real';
        //     headImg.x = this._headImg_bg.x;
        //     headImg.y = this._headImg_bg.y;
        //     headImg.width = this._headImg_bg.width;
        //     headImg.height = this._headImg_bg.height;
        //     this._realHeadImg = headImg;
        //     this.addChild(headImg);
        // }


        // private onLoadError(url:string){
        //     console.warn("ResultPanelRankItemData:用户头像获取失败!");
        // }
    }
}