module commonConfirm {
	export class ResUtil  {
		public static numFormat(num: number): string {
            if (num < 0) { return; }
            if (!(ResUtil.getType(num) === "number")) {
                console.error("wocao,不是个数字，它是个", ResUtil.getType(num));
                return;
            }
            if (num < 10000) {
                return num + "";
            }
            let mod: number = 0;
            let sym: string = ""
            if (Math.abs(num) >= 10000 && Math.abs(num) < 100000000) {
                mod = 10000;
                sym = "万";
            } else {
                mod = 100000000;
                sym = "亿";
            }

            let numStr = ("" + (num / mod));
            if (numStr.lastIndexOf('.') != -1) {
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + 4);
            }
            else {
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + 5);
            }
            let before = numStr.split(".")[0];
            let after = numStr.split(".")[1];
            if (Number(after)) {
                let afterLength = (4 - before.length) > 0 ? 4 - before.length : 0;
                let afterArr = after.split("");
                afterArr.length = afterLength;
                after = afterArr.join("");
                let after2 = (Number("0." + after)).toString();
                after2 = Boolean(after2.split(".")[1]) ? "." + after2.toString().split(".")[1] : ""
                let final = before + after2 + sym;
                return final;
            }
            else {
                return before + sym
            }
        }

		/**获取JavaScript类型 */
        public static getType(o: any) {
            var _toString = Object.prototype.toString;
            //获取对象原型的toString引用
            //列举常用类型
            var _type = {
                "undefined": "undefined",
                "number": "number",
                "boolean": "boolean",
                "string": "string",
                "[object Function]": "function",
                "[object RegExp]": "regexp",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object error]": "error"
            }

            var jsType = _type[typeof o] || _type[_toString.call(o)] || (o ? "object" : "null");

            if (jsType === "number") {
                o = +o;     //该方法效率比自带快
                if (o !== o) {
                    return "NaN"
                }
            }

            
            return jsType;
        }

        public static limitImageSize(img:egret.DisplayObject,maxH:number):void{
            if(img.width > maxH || img.height > maxH){
                if(img.width == img.height){
                    img.width = img.height = maxH;
                }else if(img.width > img.height){
                    var scale:number = maxH/img.width;
                    img.width = maxH;
                    img.height = img.height*scale;
                }else if(img.width < img.height){
                    var scale:number = maxH/img.height;
                    img.height = maxH;
                    img.width = img.width*scale;
                }
            }
        }
	}
}