module chessCommonLib {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    export class LobbyChatListItemTemp extends eui.ItemRenderer {

        private chat_lb: eui.Label;
        private name_lb: eui.Label;

        private vipIcon: eui.Image;

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
        private _MaxWidth: number;
        private _height: number;

        /**当前行所占用宽度 */
        private inlineWidth: number[] = [0, 0, 0, 0, 0, 0];
        constructor() {
            super();
            this.skinName = "chessCommonLib.LobbyChatListItemSkin"
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.emoj = new egret.Sprite();
            this.emoj.x = 17;
            this.emoj.y = 7;

            this.addChild(this.emoj);
            this._MaxWidth = this.chat_lb.width;

        }

        protected dataChanged() {
            super.dataChanged();

            this.Nickname = this.data.nickName;

            if (!this.emoj) {
                this.emoj = new egret.Sprite();
                this.emoj.x = 20;
                this.addChild(this.emoj);
            }
            this.emojArr = [];
            this.textArr = [];
            this.contentArr = [];
            this._height = 1;

            var patt1 = /\([^\(\)]*\)/g;
            var text = this.data.content.match(patt1);
            if (Array.isArray(text)) {
                for (let i = 0; i < text.length; i++) {
                    let num = Number(text[i].substring(1, text[i].length - 1));
                    this.emojArr.push(num)
                }
            }

            var content = this.data.content.replace(/\([^\(\)]*\)/g, "/,");
            let text1 = content.split("/,")
            this.textArr = content.split("/,");
            // console.error(">>>>>>初始化文本数组", content.split("/,"));
            // console.error(">>>>>>初始化表情数组emojArr", this.emojArr);
            // console.error(">>>>>>text", Number(text[0].substring(1,text[0].length-1)));
            uniLib.DisplayUtils.removeAllChildren(this.emoj);

            this.formatTxt(text1, this.emojArr);

            var width: number[] = [0, 0, 0, 0,];

            for (let i = 1; i < this.contentArr.length; i++) {
                //获取第i行所有内容
                var _chatArray: chatItem[] = this.contentArr[i];
                // console.error("获取第i行所有内容",_chatArray);

                for (let k = 0; k < _chatArray.length; k++) {
                    let _chatItem: chatItem = _chatArray[k];
                    // console.error("获取第i行所有内容_chatItem",_chatItem);

                    if (!_chatItem.content) continue;
                    let item = this.getContent(_chatItem)
                    if (_chatItem.type == 1) {
                        // console.error("获取第i行所有内容item",item.$children[0]);

                    }
                    item.y = i * 32;
                    if (!width[_chatItem.line]) {
                        width[_chatItem.line] = 0;
                    }
                    item.x = width[_chatItem.line];
                    width[_chatItem.line] = width[_chatItem.line] + item.width;
                    this.emoj.addChild(item);
                }
            }

            if (this.data.vip > 0) {
                this.vipIcon.source = this.data.vip ? "mid_vip" + this.data.vip : "big_vip0";
            }

            var showcontent = this.data.content.replace(/\([^\(\)]*\)/g, "　 ");
            //这里的chat_lb不做显示用途，只是用来控制排版，visible=false。
            this.chat_lb.textFlow = <Array<egret.ITextElement>>[
                { text: showcontent + "", style: { "textColor": 0xffffff } }
            ];
            this.name_lb.text = this.data.nickName;
            if (Number(this.data.vip) < 0) {
                this.vipIcon.source = "";
                this.chat_lb.text = "";
                this.name_lb.text = "";
            }
            // console.error(">>>>>>this.chat_lb.text11", this.chat_lb.width);
            // console.error(">>>>>>this.chat_lb.textWidth", this.chat_lb.textWidth);


        }

        private formatTxt(strArr: any[], emojArr: any[]) {

            //console.error("-----循环开始////////////////////////////////");
            for (let i = 0; i < strArr.length; i++) {
                //用来判断当前循环中，是否产生了字符串太长而分割，同时标记换行
                let isSlice: boolean = false;
                //以文本对象作为测量基准
                let test = new ChatWordItem(strArr[i]);
                //console.error("-----数据开始formatTxt", strArr[i], "--", test.width);
                let _text = strArr[i].split("");
                // console.error("--strArr[i].split(", _text);
                var index = 0;
                //按照之前表情和字符串分割，每个字符串后面跟一个表情
                let emojTest: ChatImageItem;
                let emojWidth = 0;
                if (emojArr[i]) {
                    emojTest = new ChatImageItem("face_Small_" + emojArr[i]);
                    emojWidth = emojTest.width;
                }

                // console.error("当前行已经占用的宽度", this.inlineWidth[this._height]);
                // console.error("行已经占用的宽度", this.inlineWidth);
                //判断当前文本加上当前行已经占用的宽度，是否超出了当前行最大宽度，来进行换行
                while (test.width + this.inlineWidth[this._height] > this._MaxWidth) {
                    let _text2 = _text;
                    _text2.length = _text2.length - 1;
                    // console.error("_text2", test.$children[0]["text"]);
                    index = _text2.length;
                    test = new ChatWordItem(_text2.join(""));
                    isSlice = true;
                }
                let remain = strArr[i].slice(index);



                var languages = [
                    { name: "最终的文本test", fileExtension: test.$children[0]["text"] },
                    { name: "分割的长度", fileExtension: index },
                    { name: "剩余的的内容", fileExtension: remain },

                ];
                if (!this.contentArr[this._height]) {
                    this.contentArr[this._height] = [];
                }
                // console.error("this.inlineWidth[this._height]", this.inlineWidth[this._height]);
                // console.error("11this.inlineWidth[this._height]", this.toNumber(this.inlineWidth[this._height]));
                // console.error("test.width", test.width);

                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test.width;
                this.contentArr[this._height].push(new chatItem(this._height, test.$children[0]["text"], test.width, 1))

                //console.table(languages);
                //当前文本产生换行的时候
                if (isSlice) {
                    this.textArr.splice(i + 1, 0, remain);
                    let tempArr = remain.split("");
                    let tempTest = new ChatWordItem(strArr[i]);
                    //如果换行后剩余的文本仍然超出一行显示的范围。
                    if (tempTest.width > this._MaxWidth) {
                        //算出单个字符的长度
                        let size = Math.floor(this._MaxWidth / this.chat_lb.size);
                        //按照单个字符长度对剩余字符串数组进行等量分割。
                        var sliceArr: any[] = this.sliceArray(tempArr, size)
                        //对分出的每个再进行处理
                        for (let i = 0; i < sliceArr.length; i++) {
                            this._height = this._height + 1;
                            if (!this.contentArr[this._height]) {
                                this.contentArr[this._height] = [];
                            }
                            let test2 = new ChatWordItem(sliceArr[i].join(""));

                            this.contentArr[this._height].push(new chatItem(this._height, sliceArr[i].join(""), test2.width, 1))
                            this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                        }
                    }
                    //如果剩余文本并未超过下一行显示
                    else {
                        this._height = this._height + 1;
                        let test2 = new ChatWordItem(remain);
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


                // console.error("修正后的文本数组", this.textArr);
                console.error("目前的内容数组", this.contentArr);
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
        private sliceArray(array, size) {
            var result: any[] = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        }
        /**获取对应的内容 */
        private getContent(data: chatItem) {
            var item;
            if (data.type == 1) {
                item = new ChatWordItem(data.content);
            }
            else if (data.type == 2) {
                item = new ChatImageItem("face_Small_" + data.content);
            }
            return item;
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


