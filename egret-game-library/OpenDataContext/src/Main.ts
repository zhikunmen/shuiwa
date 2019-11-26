class Main extends eui.Component {
    private _myGroup: eui.Group;
    private _scroll: eui.Scroller;
    private _list: eui.List;
    private _head: eui.Image;
    private _nickName: eui.Label;
    private _mark: eui.Label;
    private _rank: eui.Group;
    private _data: eui.ArrayCollection = new eui.ArrayCollection();
    private _layout: eui.TileLayout;
    private _myNick: string = "";
    private _myPoint: number = 0;
    private _icon: eui.Image;
    private isGet: boolean = false;
    private myData: any;
    constructor() {
        super();
        this.init();
        wx.onMessage(data => {
            if (data.nickName) {
                this._myNick = data.nickName;
            }
            if (data.point) {
                this._myPoint = data.point;
            }
            if (data.command == "open") {
                //获取微信朋友圈数据
                if (data.type == "friend") {
                    wx.getFriendCloudStorage({
                        keyList: ["matchpoint"],
                        success: res => {
                            console.error(res);
                            setTimeout((e) => {
                                this.runGame(res);
                            }, 300);
                        },
                        fail: err => {
                            console.log(err);
                        },
                        complete: () => {

                        }
                    });
                } else if (data.type == "group") {
                    wx.getGroupCloudStorage({
                        shareTicket: data.groupid,
                        keyList: ["matchpoint"],
                        success: res => {
                            console.error(data);
                            setTimeout((e) => {
                                this.runGame(res);
                            }, 300);
                        },
                        fail: err => {
                            console.log(err);
                        },
                        complete: () => {
                        }
                    });
                }
            } else if (data.command == "cleanCanvas") {
                this.cancelGame();
            }
        });

        //获取小游戏开放数据接口 --- 结束        
    }
    //初始化界面
    private init(): void {
        this._myGroup = new eui.Group();
        this.addChild(this._myGroup)
        //个人排名
        this._rank = new eui.Group();
        this._rank.width = 100;
        this._rank.height = 84;
        this._rank.x = 2;
        this._rank.y = 456;
        this._myGroup.addChild(this._rank);
        //个人头像
        this._head = new eui.Image();
        this._head.width = 73;
        this._head.height = 73;
        this._head.x = 122.5;
        this._head.y = 463.5;
        this._myGroup.addChild(this._head);
        //积分icon
        this._icon = new eui.Image();
        this._icon.x = 407;
        this._icon.y = 475.5;
        this._icon.source = "openDataContext/resource/rank_mark.png";
        this._myGroup.addChild(this._icon);
        //个人昵称
        this._nickName = new eui.Label();
        this._nickName.size = 24;
        this._nickName.textColor = 0xffffff;
        this._nickName.x = 207;
        this._nickName.y = 488;
        this._myGroup.addChild(this._nickName);
        //个人分数
        this._mark = new eui.Label();
        this._mark.size = 24;
        this._mark.textColor = 0xffffff;
        this._mark.x = 457;
        this._mark.y = 488;
        this._myGroup.addChild(this._mark);
        //滚动对象
        this._list = new eui.List();
        this.addChild(this._list);
        //滚动界面
        this._scroll = new eui.Scroller();
        this._scroll.width = 556;
        this._scroll.height = 453;
        this.addChild(this._scroll);
        this._list.itemRenderer = Item;
        this._list.dataProvider = this._data;
        this._scroll.scrollPolicyH = "off";
        this._scroll.scrollPolicyV = "on";
        this._scroll.horizontalScrollBar = null;
        this._scroll.verticalScrollBar = null;
        this._scroll.viewport = this._list;
        this._layout = new eui.TileLayout();
        this._layout.horizontalGap = 0;
        this._layout.verticalGap = 0;
        this._layout.requestedColumnCount = 1;
        this._list.layout = this._layout;
        this._layout.useVirtualLayout = false;
        this.scaleY = 1.03 * window.innerHeight / window.innerWidth;
    }
    //清空排行榜数据
    private clearView(): void {
        this._scroll.viewport.scrollV = 0;
        this._data.source = [];
        this._data.refresh();
        this._head.source = "";
        this._nickName.text = "--";
        this._mark.text = "--";
    }
    private runGame(res) {
        this.visible = true;
        this.dataHandle(res.data);
    }
    //获取到微信数据，我们自己处理顺序
    private dataHandle(list): void {
        let dataList = [];
        for (var i = 0; i < list.length; i++) {
            let data = { headUrl: "", nickName: "", point: 0, rank: 0 }
            data.headUrl = list[i].avatarUrl;
            data.nickName = list[i].nickname;
            if (list[i].KVDataList.length > 0) {
                data.point = list[i].KVDataList[0].value;
                dataList.push(data);
            }
        }
        dataList.sort((a, b) => {
            return b.point - a.point;
        });
        for (var i = 1; i <= dataList.length; i++) {
            dataList[i - 1].rank = i;
            if (dataList[i - 1].nickName == this._myNick && dataList[i - 1].point == this._myPoint) {
                this.myData = dataList[i - 1];
            }
        }
        this._data.source = dataList;
        this._data.refresh();
        this.initMyInfo();
    }
    //渲染我的排名信息
    private initMyInfo(): void {
        this._rank.removeChildren();
        this._head.source = this.myData.headUrl;
        if (this.myData.rank < 10) {
            let rank_1 = new eui.Image();
            rank_1.source = "openDataContext/resource/rank_big_" + this.myData.rank + ".png";
            this._rank.addChild(rank_1);
            if (this.myData.rank < 4) {
                rank_1.x = 20.5;
                rank_1.y = 12.5;
            } else {
                rank_1.x = 37;
                rank_1.y = 24;
            }
        } else if (this.myData.rank > 9 && this.myData.rank < 100) {
            let rank_1 = new eui.Image();
            rank_1.source = "openDataContext/resource/rank_small_" + Math.floor(this.myData.rank / 10) + ".png";
            this._rank.addChild(rank_1);
            rank_1.x = 32;
            let rank_2 = new eui.Image();
            rank_2.source = "openDataContext/resource/rank_small_" + this.myData.rank % 10 + ".png";
            this._rank.addChild(rank_2);
            rank_2.x = 50;
            rank_1.y = rank_2.y = 30.5;
        } else if (this.myData.rank > 99) {
            let rank_1 = new eui.Image();
            rank_1.source = "openDataContext/resource/rank_small_" + Math.floor(this.myData.rank / 100) + ".png";
            this._rank.addChild(rank_1);
            rank_1.x = 15;
            let rank_2 = new eui.Image();
            rank_2.source = "openDataContext/resource/rank_small_" + Math.floor((this.myData.rank - 100) / 10) + ".png";
            this._rank.addChild(rank_2);
            rank_2.x = 33;
            let rank_3 = new eui.Image();
            rank_3.source = "openDataContext/resource/rank_small_" + (this.myData.rank - 100) % 10 + ".png";
            this._rank.addChild(rank_3);
            rank_3.x = 51;
            rank_1.y = rank_2.y = rank_3.y = 30.5;
        }
        this._nickName.text = this.myData.nickName;
        if (this.myData.nickName.length > 10) {
            this._nickName.text = (this.myData.nickName).substring(0, 10) + "...";
        }
        this._mark.text = "" + this.myData.point;
    }
    private cancelGame(): void {
        this.visible = false;
        this._data.source = [];
        this._data.refresh();
    }
}
class Item extends eui.ItemRenderer {
    private _head: eui.Image;
    private _rank: eui.Group;
    private _nickName: eui.Label;
    private _mark: eui.Label;
    private _bg: eui.Image;
    private _icon: eui.Image;
    public constructor() {
        super();
        this.init();
    }
    private init(): void {
        //底图
        this._bg = new eui.Image();
        this._bg.x = 9;
        this._bg.y = 10;
        this._bg.source = "openDataContext/resource/rank_item_bg.png";
        this.addChild(this._bg);
        //积分icon
        this._icon = new eui.Image();
        this._icon.x = 395;
        this._icon.y = 25.5;
        this._icon.source = "openDataContext/resource/rank_mark.png";
        this.addChild(this._icon);
        //个人排名
        this._rank = new eui.Group();
        this._rank.width = 69;
        this._rank.height = 78;
        this._rank.x = 10;
        this._rank.y = 10.5;
        this.addChild(this._rank);
        //个人头像
        this._head = new eui.Image();
        this._head.width = 73;
        this._head.height = 73;
        this._head.x = 80;
        this._head.y = 13.5;
        this.addChild(this._head);
        //个人昵称
        this._nickName = new eui.Label();
        this._nickName.size = 24;
        this._nickName.textColor = 0xaa2000;
        this._nickName.x = 170;
        this._nickName.y = 38;
        this.addChild(this._nickName);
        //个人分数
        this._mark = new eui.Label();
        this._mark.size = 24;
        this._mark.textColor = 0xaa2000;
        this._mark.x = 445;
        this._mark.y = 38;
        this.addChild(this._mark);
        
    }
    protected dataChanged(): void {
        this._head.source = this.data.headUrl;
        if (this.data.rank < 10) {
            let rank_1 = new eui.Image();
            rank_1.source = "openDataContext/resource/rank_big_" + this.data.rank + ".png";
            this._rank.addChild(rank_1);
            if (this.data.rank < 4) {
                rank_1.x = 5;
                rank_1.y = 9.5;
            } else {
                rank_1.x = 21.5;
                rank_1.y = 21;
            }
        } else if (this.data.rank > 9 && this.data.rank < 100) {
            let rank_1 = new eui.Image();
            rank_1.source = "openDataContext/resource/rank_small_" + Math.floor(this.data.rank / 10) + ".png";
            this._rank.addChild(rank_1);
            rank_1.x = 16.5;
            let rank_2 = new eui.Image();
            rank_2.source = "openDataContext/resource/rank_small_" + this.data.rank % 10 + ".png";
            this._rank.addChild(rank_2);
            rank_2.x = 34.5;
            rank_1.y = rank_2.y = 27.5;
        } else if (this.data.rank > 99) {
            let rank_1 = new eui.Image();
            rank_1.source = "openDataContext/resource/rank_small_" + Math.floor(this.data.rank / 100) + ".png";
            this._rank.addChild(rank_1);
            rank_1.x = 7.5;
            let rank_2 = new eui.Image();
            rank_2.source = "openDataContext/resource/rank_small_" + Math.floor((this.data.rank - 100) / 10) + ".png";
            this._rank.addChild(rank_2);
            rank_2.x = 25.5;
            let rank_3 = new eui.Image();
            rank_3.source = "openDataContext/resource/rank_small_" + (this.data.rank - 100) % 10 + ".png";
            this._rank.addChild(rank_3);
            rank_3.x = 43.5;
            rank_1.y = rank_2.y = rank_3.y = 27.5;
        }
        this._nickName.text = this.data.nickName;
        if (this.data.nickName.length > 10) {
            this._nickName.text = (this.data.nickName).substring(0, 10) + "...";
        }
        this._mark.text = "" + this.data.point;
    }
}
