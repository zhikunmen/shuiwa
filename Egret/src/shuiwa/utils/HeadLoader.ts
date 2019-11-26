module SWGAME {
    export class HeadLoader {
        private static _instance:HeadLoader;
        public static getInstance(){
            if(!HeadLoader._instance){
                HeadLoader._instance = new HeadLoader();
            }

            return HeadLoader._instance;
        }

        public static destroy(){
            if(HeadLoader._instance){
                HeadLoader._instance = null;
            }
        }

        public load(url:string,completeFun?:Function,ioErrFun?:Function,callObj?:Object):void{

            let data:any=this.getHeadCache(url);
            if(data){
                if(completeFun){
                    completeFun.call(callObj,data);
                }
            }else{

                let imageLoader= new egret.ImageLoader();

                let loadError:Function;
                let loadSuccess:Function;

                loadSuccess = (event: egret.Event)=>{

                    imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, loadError, this);

                    let loader:egret.ImageLoader = event.currentTarget;

                    this.saveHeadCache(url, loader.data);

                    if(completeFun){
                        completeFun.call(callObj, loader.data);
                    }
                };

                loadError = (event: egret.IOErrorEvent)=>{

                    imageLoader.removeEventListener(egret.IOErrorEvent.IO_ERROR, loadSuccess, this);

                    if(ioErrFun){
                        ioErrFun.call(callObj,[url]);
                    }
                };



                imageLoader.once(egret.Event.COMPLETE, loadSuccess, this);
                imageLoader.once(egret.IOErrorEvent.IO_ERROR, loadError, this);

                // this._imageLoader.crossOrigin = "anonymous";

                imageLoader.load(url);
            }
        }


        public getHeadCache(headUrl:string):any{
            if(!uniLib.Global.localCache){
                uniLib.Global.localCache={};
            }else{
                if(uniLib.Global.localCache[headUrl]){
                    return uniLib.Global.localCache[headUrl];
                }
            }
            return null;
        }
        public saveHeadCache(url:string,data:any):void{
            if(!uniLib.Global.localCache){
                uniLib.Global.localCache={};
            }
            uniLib.Global.localCache[url]=data;
        }
    }
}