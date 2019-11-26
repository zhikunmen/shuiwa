module loading {

    /**
     * 加载多个资源配置文件
     */
    export function loadConfigs(configUrls: string[], resourceRoot: string = "resource/") {
        function cngFun(url: string, resRoot: string) {
            return RES.loadConfig(url, resRoot);
        }
        let allArr = [];
        for (let i = 0; i < configUrls.length; i++) {
            allArr.push(cngFun(configUrls[i], resourceRoot));
        }
        return new Promise(function (resolve, reject) {
            Promise.all(allArr).then(() => { resolve(1) }, () => { egret.error("config 加载失败"); reject(0) });
        });
    }

    /**
     * 加载多个主题配置文件
     */
    var index: number = 0;
    export function loadThems(themUrls: string[], onCompleteCall: Function, onErrorCall: Function, thisObj: any, themRoot?: string) {
        if (themUrls[index].indexOf("thm.json") > 0) {
            let theme = new eui.Theme(themUrls[index], egret.MainContext.instance.stage);
            theme.once(eui.UIEvent.COMPLETE, themCall, this);
        }
        else {
             RES.getResByUrl(themRoot ? themRoot + themUrls[index] : themUrls[index], (data, url) => {
                    window["JSONParseClass"]["setData"](data);
                    egret.callLater(() => {
                        themCall(data);
                    }, this);
                }, this, RES.ResourceItem.TYPE_JSON);
            // uniLib.ResUtils.getTheme(, themCall, themCall, this, themRoot, "commonjs2")
        }
        function themCall(obj: any) {
            if (obj) {
                if (themUrls[++index])
                    loadThems(themUrls, onCompleteCall, onErrorCall, thisObj, themRoot);
                else {
                    if (onCompleteCall)
                        onCompleteCall.call(thisObj, []);
                }
            }
            else {
                if (onErrorCall)
                    onErrorCall.call(thisObj, []);
            }
        }
    }
}