/**
 * @author garr
 *   /** 
   *━━━━━━神兽出没━━━━━━      
   *     ┏┓　　　┏┓
   * 　 ┏┛┻━━━┛┻┓  + +
   * 
   *  　┃　　　　　　　┃ 
   *  　┃　　　━　　　┃ ++ + + +
   * 　  ████━████ ┃+
   *    ┃　　　　　　　┃
   *    ┃　　　┻　　　┃  
   *    ┃　　　　　　┃
   * 　  ┗━┓　　　┏━┛  Code is far away from bug with the animal protecting
   *       ┃　　　┃    神兽保佑,代码无bug
   *       ┃　　　┃ 
   *       ┃　　　┃ 
   *       ┃　　　┗━━━┓
   * 　　　 ┃　　　　　　　┣┓
   *       ┃　　　　　　　┏┛
   *       ┗┓┓┏━┳┓┏┛
   *       　┃┫┫　┃┫┫
   *         ┗┻┛　┗┻┛
 */
module chessCommonLib {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    export class LobbyChatListItem extends eui.ItemRenderer {

        private chat_lb: eui.Label;
        private name_lb: eui.Label;

        private vipIcon: eui.Image;
        // private chat_line: eui.Image;

        private str: string = "";
        private offsetX: number = 0;
        private offsetY: number = 0;

        private Nickname: string;

        private preStr: string;

        private emoj: egret.Sprite;
        /**表情数组 */
        private emojArr: number[];
        /**是否换行 */
        private isMutiLine: boolean = false;
        /**是否是换行，通过一个测试的textWidth判断 */
        private testLable: eui.Label;
        /**存储文本数组 */
        private textArr: string[];
        /**存储整个内容数组 */
        private contentArr: any[][];
        //设置文本显示最大宽度
        private _MaxWidth: number;
        //对文本进行测量时候，控制当前内容所在的行
        private _height: number;
        //昵称
        private _nickName: string;
        /**当前行所占用宽度 */
        private inlineWidth: number[] = [0, 0, 0, 0, 0, 0];
        constructor() {
            super();
            this.skinName = "chessCommonLib.LobbyChatListItemSkin"
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.emoj = new egret.Sprite();
            this.emoj.x = 10;
            this.emoj.y = 0;

            this.addChild(this.emoj);
            this._MaxWidth = this.chat_lb.width;

        }

        protected dataChanged() {
            super.dataChanged();
            this.Nickname = this.data.nickName;

            if (this.emoj) {
                uniLib.DisplayUtils.removeAllChildren(this.emoj);
                uniLib.DisplayUtils.removeFromParent(this.emoj);
            }
            if (!this.emoj) {
                this.emoj = new egret.Sprite();
                this.emoj.x = 10;
            }
            this.addChild(this.emoj);

            this.emojArr = [];
            this.textArr = [];

            this.contentArr = [];
            //初始化当前高度，即所在行
            this._height = 1;

            var patt1 = /\([^\(\)]*\)/g;
            var _content = this.data.content;
            this._nickName = this.data.nickName;

            //这部分拼接，是将最前面vip等级图标，加自己带颜昵称，全部拼一起，，并且使用()将昵称与后面内容分割因为**需求
            if (this.data.nickName && this.data.vip != void 0) {
                _content = "(" + Number(100 + Number(this.data.vip)) + ")" + "" + this.data.nickName + ": " + "()" + this.data.content;
            }
            else { //这种是游戏能系统广播，例如上庄
                _content = "()" + this.data.content;
                this.data.nickName = "";
            }
            if (this.data.type && this.data.type == 1 && uniLib.Global.isInGame) {
                _content = "(49)" + _content;
            }
            // var patt1 = /^(([1-9]?\d|1\d\d|25[0-5]|24[0-9|])(\.(?!$)|$)){4}$/
            var text = _content.match(patt1);
            //这里分割出图片表情数组
            if (Array.isArray(text)) {
                for (let i = 0; i < text.length; i++) {
                    let num = Number(text[i].substring(1, text[i].length - 1));
                    this.emojArr.push(num)
                }
            }
            var content = _content.replace(/\([^\(\)]*\)/g, "/,");
            //这里分割出文本数组
            let text1 = content.split("/,")
            //textArr只是在dubug时候用来进行测试作用
            this.textArr = content.split("/,");


            // window.performance.mark("mark_start_resize");
            //格式化输入内容
            this.formatTxt(text1, this.emojArr);
            //存储每一行已经显示的宽度数值
            var width: number[] = [];
            //通过formatTxt执行后生成每一行的具体内容，这里通过循环显示每一行内容
            for (let i = 1; i < this.contentArr.length; i++) {
                //获取第i行所有内容
                var _chatArray: chatItem[] = this.contentArr[i];
                for (let k = 0; k < _chatArray.length; k++) {
                    let _chatItem: chatItem = _chatArray[k];
                    //由于刷新问题，有些行content会是undefined，这里过滤
                    if (!_chatItem.content) continue;
                    let item = this.getContent(_chatItem)
                    if (_chatItem.type == 1) {
                    }
                    item.y = (i - 1) * 32;
                    if (!width[_chatItem.line]) {
                        width[_chatItem.line] = 0;
                    }
                    item.x = width[_chatItem.line];
                    width[_chatItem.line] = width[_chatItem.line] + item.width;
                    this.emoj.addChild(item);
                }
            }
            //****************  计算下时间*/
            // window.performance.mark("mark_end_resize");
            // window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
            // var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
            // console.error("Time to caul: " + timeToResize[timeToResize.length - 1].duration + "ms");
            //**************** */

            let vipcontent = "" //这个下面chat_lb用来显示控制占位的
            if (this.data.vip > 0) {
                this.vipIcon.source = this.data.vip ? "mid_vip" + this.data.vip : "big_vip0";
                vipcontent = "占  占"

            }
            if (this.data.type && this.data.type == 1 && uniLib.Global.isInGame) {
                vipcontent = vipcontent + " 占"
            }
            var showcontent = vipcontent + this.data.nickName + this.data.content.replace(/\([^\(\)]*\)/g, "　 ");
            showcontent = showcontent.replace(/<\d{1}>/g, "")
            //这里的chat_lb不做显示用途，只是用来控制排版，visible=false。
            this.chat_lb.textFlow = <Array<egret.ITextElement>>[
                { text: showcontent + "", style: { "textColor": 0x239924 } }
            ];
            this.name_lb.text = this.data.nickName + ":";
            if (Number(this.data.vip) < 0) {
                this.vipIcon.source = "";
                this.chat_lb.text = "";
                this.name_lb.text = "";
                uniLib.DisplayUtils.removeAllChildren(this.emoj);
                uniLib.DisplayUtils.removeFromParent(this.emoj);

            }
        }

        /**传入分割好的字符串数组和图片表情数组
         * 根据分割规则，字符串数组每个元素和图片表情数组是通过插入合并
         * eg 字符串数组：[1,3,5]
         *    图片表情数组 [2,4,6]
         *    合并产生完成内容 [1,2,3,4,5,6]
         */
        private formatTxt(strArr: any[], emojArr: any[]) {
            for (let i = 0; i < strArr.length; i++) {
                //用来判断当前循环中，是否产生了字符串太长而分割，同时标记换行
                let isSlice: boolean = false;
                //以文本对象作为测量基准
                var test = new ChatWordCalculateItem(strArr[i]);
                //按照之前表情和字符串分割，每个字符串后面跟一个表情，这里生成下一个要显示的表情，用于宽度计算从而对当前行文本内容进行控制
                var emojTest: ChatImageItem;
                let emojWidth = 0;
                if (emojArr[i]) {
                    let resName = this.getRes(Number(emojArr[i]))
                    emojTest = new ChatImageItem(resName);
                    emojWidth = emojTest.width;
                    emojTest.destory();
                }
                //这里进行字符串拆分，为可能的换行分割准备
                let _text = strArr[i].split("");
                //记录当产生换行时候，字符串分割的位置
                let index = 0;
                var _text3 = ""//临时保存test文本内容，为了处理一段带有颜色的话被换行导致前半部分没有颜色
                //判断当前文本加上当前行已经占用的宽度，是否超出了当前行最大宽度，来进行换行
                while (test.width + this.inlineWidth[this._height] > this._MaxWidth) {
                    let _text2 = _text;
                     if (!_text2.length) {//这里已经出错了
                        this.contentArr = [];
                        return
                    }
                    _text2.length = _text2.length - 1;
                    index = _text2.length;
                    test.destory();
                    test = new ChatWordCalculateItem(_text2.join(""));
                    _text3 = _text2.join("")
                    isSlice = true;
                }
                /**这里用于处理：当一段被标记颜色的文本因为换行，导致前面一段文本丢失了颜色的情况
                 * 例如  abcdegd<1>
                 * 分割后  "abcd"   "egd<1>"
                 * 这时候前面一段丢失了颜色标记<1>  暂时注释，需要测试验证所有情况
                 * @param _text3
                 */
                /**---------------start---------------- */
                if (isSlice) {
                    let reg1 = strArr[i].match(/(<\w{1}>)/g)
                    if (reg1) {
                        let str = strArr[i].replace(/<\w{1}>/g, "/,");
                        let text1: any[] = str.split("/,");
                        let temp1 = _text3.replace(/<\w{1}>/g, "/,").split("/,");
                        let index1;
                        for (let i = 0; i < text1.length; i++) {
                            if (text1[i].indexOf(temp1[temp1.length - 1]) != -1) {
                                index1 = i;
                            }
                        }
                        test = new ChatWordCalculateItem(_text3 + reg1[index1]);
                    }
                }

                /**---------------end---------------- */
                //分割后剩余字符串
                let remain = strArr[i].slice(index);
                if (!this.contentArr[this._height]) {
                    this.contentArr[this._height] = [];
                }
                //将处理后 当前行内容放进来，此时test内容分割后不会超出当前行的
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test.width;
                this.contentArr[this._height].push(new chatItem(this._height, test.text1, test.width, 1))

                //当前文本产生换行的时候，对remain进行处理
                if (isSlice) {
                    this.textArr.splice(i + 1, 0, remain);
                    let tempArr = remain.split("");
                    let tempTest = new ChatWordCalculateItem(remain);
                    //如果换行后剩余的文本仍然超出一行显示的范围。
                    if (tempTest.width > this._MaxWidth) {
                        //算出单个字符的长度，转换成英文字符计算量
                        //按照单个字符长度对剩余字符串数组进行等量分割。
                        var sliceArr: any[] = this.sliceArray(tempArr)
                        //对分出的每个再进行处理
                        for (let i = 0; i < sliceArr.length; i++) {
                            this._height = this._height + 1;
                            if (!this.contentArr[this._height]) {
                                this.contentArr[this._height] = [];
                            }
                            let test2 = new ChatWordCalculateItem(sliceArr[i].join(""));
                            this.contentArr[this._height].push(new chatItem(this._height, sliceArr[i].join(""), test2.width, 1))
                            this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                        }
                    }
                    //如果剩余文本并未超过下一行显示
                    else {
                        this._height = this._height + 1;
                        let test2 = new ChatWordCalculateItem(remain);
                        if (!this.contentArr[this._height]) {
                            this.contentArr[this._height] = [];
                        }
                        this.contentArr[this._height].push(new chatItem(this._height, remain, test2.width, 1))
                        this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                    }
                }

                //-------------添加文本后面的图片表情
                //如果此时添加表情刚好超出本行
                if (this.inlineWidth[this._height] + emojWidth > this._MaxWidth) {
                    this._height = this._height + 1;
                    if (!this.contentArr[this._height]) {
                        this.contentArr[this._height] = [];
                    }
                }
                this.contentArr[this._height].push(new chatItem(this._height, emojArr[i], emojWidth, 2))
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + emojWidth;
                if (test) {
                    test.destory();
                }

            }

        }

        private toNumber(data: any): number {
            if (!data) {
                return 0;
            }
            return Number(data);

        }

        /*
   * 将一个数组分成几个同等长度的数组
   * array[分割的原数组]
   * size[每个子数组的长度]
   */
        private sliceArray(array: any[]) {
            //分别获取大端和小端的宽度
            // this.log();
            var _width = 0;
            var result: any[] = [];
            var tempArr = array;
            var index = 0;
            for (let i = 0; i < array.length; i++) {
                _width = _width + new ChatWordCalculateItem(array[i]).width
                if (_width >= this._MaxWidth) {
                    _width = 0;
                    result.push((tempArr.slice(0, i - index + 1)));
                    index = i;
                    tempArr = array.slice(i + 1, array.length);
                }
                if (i == (array.length - 1)) {
                    result.push(tempArr.slice(0, i + 1));
                }
            }
            return result;
        }


        /**获取对应的内容 */
        private getContent(data: chatItem) {
            var item;
            if (data.type == 1) {
                let _content = this.getColor(data.content);
                // item = new ChatWordItem(data.content, parseInt(color, 16));
                item = new ChatWordItem(_content, true);

            }
            else if (data.type == 2) {
                //这里传入的是要显示的资源名字，目前只支持高度为27;如果是vip，使用min规格
                let resName = this.getRes(Number(data.content))
                item = new ChatImageItem(resName);
            }
            return item;
        }

        /**获取资源名 */
        private getRes(index: number) {
            var str: string = "";
            if (index < 50) {
                str = "face_Small_" + index;
            }
            else {
                str = "min_vip" + (index - 100)
            }
            return str
        }
        //获取颜色
        private getColor(str: string): any[] {
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            let content: any = [];
            let _color = "";
            if (str.match(/<\w{1}>/g)) {
                content = this.getHighOderColor(str);
            }
            else {
                if (str.indexOf(this._nickName) != -1 && str.indexOf(this._nickName) == 0) {
                    _color = "0xf8da94"
                    content.push({ text: str, color: _color })
                    //lazy一下
                    this.getColor = function (str: string): any[] {
                        str = str.replace(/(^\s*)|(\s*$)/g, "");
                        let content: any = [];
                        let _color = "";
                        if (str.match(/<\w{1}>/g)) {
                            content = this.getHighOderColor(str);
                        }
                        else {
                            _color = "0xf1dbf8"
                            content.push({ text: str, color: _color })
                        }
                        return content
                    }
                }
                else {
                    _color = "0xf1dbf8"
                    content.push({ text: str, color: _color })
                }
            }
            return content
        }

        /**获取颜色的高阶版，由服务器控制颜色输出，后期可以配表扩充
         * 格式为<1>
         */
        private getHighOderColor(str): any[] {
            let colorArr = str.match(/<\w{1}>/g);
            let colorStruct = ["0xffe097", "0xf9e3ff", "0xffd200", "0x0aaee0"]
            str = str.replace(/<\w{1}>/g, "/,");
            let text1 = str.split("/,");
            let content: any = [];
            for (let i = 0; i < text1.length; i++) {
                let color = colorArr[i] ? colorArr[i] : "";
                content.push({ text: text1[i], color: colorStruct[Number(color[1] - 1)] })
            }
            return content;
        }

    }

    class chatItem {
        /**
         * 行数
         */
        public line: number;
        /**
         * 内容
         */
        public content: any;
        /**
       * 内容
       */
        public width: number;
        /**
       * 类型：1文本 2图片
       */
        public type: number;

        constructor(line, content, width, type) {
            this.line = line;
            this.content = content;
            this.width = width;
            this.type = type;
        }
    }



}


