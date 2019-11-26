var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var redpackets;
(function (redpackets) {
    var RedPacketsConst = (function () {
        function RedPacketsConst() {
        }
        RedPacketsConst.RES_JSON = "resource/redpackets/redpackets.res_6ec24f0a.json";
        RedPacketsConst.THM_JSON = "resource/redpackets/gameEui_aaedc30d.json";
        /**
         * 公共loading需要加载的资源组
         */
        RedPacketsConst.PUB_REDPACKETS = "pub_redpackets";
        /**邀请有礼界面 */
        RedPacketsConst.SHARE_INVITEDATA = "share_invitedata";
        /**领取奖励 */
        RedPacketsConst.SHARE_INVITEAWARD = "share_inviteaward";
        /**不可以领取邀请奖励通知 */
        RedPacketsConst.NOTCAN_GETINVITE = "notcanGetInvite";
        return RedPacketsConst;
    }());
    redpackets.RedPacketsConst = RedPacketsConst;
    __reflect(RedPacketsConst.prototype, "redpackets.RedPacketsConst");
    /**
     * 打包成app之后的分享 不支持分享图片
     * @shareType 分享类型
     * @state 跳转公众号需要携带的参数 多个参数以_分割 发送给平台的参数
     * @extData 发送给服务器的扩展字段 json字符串
     * @roomId 房间号id
     * @title 标题
     * @description 描述
     * @callBack 分享回调
     * @callObj 回调函数域
     * @shareWay 0好友 1 朋友圈 默认为好友
     */
    function shareNativeMessage(shareType, roomId, state, extData, title, description, callBack, callObj, shareWay) {
        if (roomId === void 0) { roomId = 0; }
        if (state === void 0) { state = ""; }
        if (extData === void 0) { extData = ""; }
        if (title === void 0) { title = ""; }
        if (description === void 0) { description = ""; }
        if (callBack === void 0) { callBack = null; }
        if (callObj === void 0) { callObj = null; }
        if (shareWay === void 0) { shareWay = 0; }
        if (uniLib.Global.isNative) {
            var vo = new uniLib.WXShareVo();
            vo.shareWay = shareWay;
            var lobbyConfig = MJLobbyData.getInstance().lobbyConfig;
            if (LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.wx_wbappid) {
                var nick = uniLib.UserInfo.nickName;
                if (nick.length > 5) {
                    nick = nick.slice(0, 5);
                }
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.wx_wbappid + "&redirect_uri=http://" + lobbyConfig.newLink + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.wx_wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + (roomId ? roomId : 0) + "|" + nick + "|" + Cmd.ShareOpType.click + "_" + state) + "&connect_redirect=1#wechat_redirect";
            }
            else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = !!title ? title : lobbyConfig.shareTitle;
            vo.description = !!description ? description : lobbyConfig.shareContent;
            uniLib.ZQGameSdk.share(vo, function (msg) {
                if (msg && msg.code == 0) {
                    var req = new Cmd.UploadShareInfoLittleGameLobbyCmd_CS();
                    req.opType = Cmd.ShareOpType.share;
                    req.shareType = shareType;
                    req.extData = extData;
                    NetMgr.tcpSend(req);
                    callBack && callBack.call(callObj);
                }
                else if (msg.code == 1) {
                    uniLib.TipsUtils.showTipsDownToUp("分享取消");
                }
                else if (msg.code == 2) {
                    uniLib.TipsUtils.showTipsDownToUp("分享被拒绝");
                }
            }, this);
        }
    }
    redpackets.shareNativeMessage = shareNativeMessage;
})(redpackets || (redpackets = {}));
var Cmd;
(function (Cmd) {
    function OnGetInviteInfoLittleGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(redpackets.RedPacketsConst.SHARE_INVITEDATA, rev);
        }
    }
    Cmd.OnGetInviteInfoLittleGameLobbyCmd_S = OnGetInviteInfoLittleGameLobbyCmd_S;
    function OnGetInviteRewardLittleGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(redpackets.RedPacketsConst.SHARE_INVITEAWARD, rev);
            wxgame.Global.instance.aldSendEvent("周边系统", "分享有礼领取钻石成功");
        }
    }
    Cmd.OnGetInviteRewardLittleGameLobbyCmd_S = OnGetInviteRewardLittleGameLobbyCmd_S;
})(Cmd || (Cmd = {}));
var redpackets;
(function (redpackets) {
    /**现金红包 */
    var RedPacketsPanel = (function (_super) {
        __extends(RedPacketsPanel, _super);
        function RedPacketsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "redpacketsSkin";
            return _this;
        }
        RedPacketsPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
        };
        RedPacketsPanel.prototype.destroy = function () {
            this._inviteInfo = null;
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.removeEventListener(redpackets.RedPacketsConst.SHARE_INVITEAWARD, this.update, this);
            uniLib.Global.removeEventListener(redpackets.RedPacketsConst.SHARE_INVITEDATA, this.init, this);
        };
        RedPacketsPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.addEventListener(redpackets.RedPacketsConst.SHARE_INVITEAWARD, this.update, this);
            uniLib.Global.addEventListener(redpackets.RedPacketsConst.SHARE_INVITEDATA, this.init, this);
            var req = new Cmd.GetInviteInfoLittleGameLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        /**初次导入数据 */
        RedPacketsPanel.prototype.init = function (evt) {
            this.tips_lbl.textFlow = [{ text: "邀请", style: { textColor: 0xe9cdaf } }, { text: "新用户玩5局游戏", style: { textColor: 0xdeff00 } },
                { text: "领", style: { textColor: 0xe9cdaf } }, { text: "1.66元", style: { textColor: 0xdeff00 } }, { text: "及以上随机现金，自动提现！", style: { textColor: 0xe9cdaf } }];
            var data = evt.param;
            this._inviteInfo = data;
            this.updateHead();
        };
        /**更新数据，领奖 */
        RedPacketsPanel.prototype.update = function (evt) {
            var _this = this;
            this._isHaveAward = false;
            var data = evt.param;
            /**领取奖励动画 */
            var awardPanel = new lobbyaward.LobbyGetAwardPanel();
            awardPanel.setData(data.goods[0].goodsNum, 3);
            uniLib.PopUpMgr.addPopUp(awardPanel, null, true, true);
            var changedata = this._inviteInfo;
            changedata.info.forEach(function (f, index) {
                if (f.id == data.id) {
                    _this._inviteInfo.info[index].status = 4;
                }
                if (_this._inviteInfo.info[index].status == 3) {
                    _this._isHaveAward = true;
                }
            });
            if (this._isHaveAward == false) {
                uniLib.Global.dispatchEvent(redpackets.RedPacketsConst.NOTCAN_GETINVITE);
            }
            this.updateHead();
            uniLib.TipsUtils.showTipsDownToUp("如有问题请联系客服");
        };
        /**更新数据 */
        RedPacketsPanel.prototype.updateHead = function () {
            var _this = this;
            var data = this._inviteInfo.info;
            data.forEach(function (f, index) {
                var good;
                good = ConfigMgr.getInstance().getGoodCfgById(f.goods.goodsId);
                var btn = _this["btn_" + index];
                if (btn) {
                    if (f.goods.goodsId == 32) {
                        btn.skin["awardTxt"].text = f.goods.goodsNum + "金币";
                    }
                    else if (f.goods.goodsId == 296) {
                        btn.skin["awardTxt"].text = "最高" + f.goods.goodsNum + "元";
                    }
                    else if (f.goods.goodsId == 6) {
                        btn.skin["awardTxt"].text = f.goods.goodsNum + "钻石";
                    }
                    /**漳州使用 当前状态 status
                     * 1：等待邀请(这时候不会有昵称和头像信息)
                     * 2：已邀请但局数未满
                     * 3: 已邀请且局数已满可领取奖励
                     * 4：已邀请奖励已领取 */
                    _this.setPlayerIconMask(btn.skin["head"]);
                    if (f.status == 1) {
                        btn.touchEnabled = true;
                    }
                    else if (f.status == 2) {
                        btn.touchEnabled = true;
                        btn.skin["numTxt"].text = f.curGameNbr + "/" + f.allGameNbr + "局";
                        btn.skin["head"].source = f.headUrl;
                    }
                    else if (f.status == 3) {
                        btn.touchEnabled = true;
                        btn.skin["numTxt"].text = f.curGameNbr + "/" + f.allGameNbr + "局";
                        btn.skin["awardTxt"].text = "领取现金";
                        btn.skin["head"].source = f.headUrl;
                    }
                    else if (f.status == 4) {
                        btn.touchEnabled = false;
                        btn.skin["numTxt"].text = f.curGameNbr + "/" + f.allGameNbr + "局";
                        btn.skin["head"].source = f.headUrl;
                        btn.skin["awardTxt"].text = "";
                        btn.skin["type"].source = "mjl_redpackets_istrue"; //已领取
                        btn.skin["type0"].source = "mjl_redpackets_istrue";
                        btn.skin["get"].visible = true;
                    }
                }
            });
        };
        /**蒙版 */
        RedPacketsPanel.prototype.setPlayerIconMask = function (image) {
            var maskTexture = RES.getRes("lb_lobby_headBg_png");
            var maskImg = new egret.Bitmap();
            image.parent.addChild(maskImg);
            maskImg.texture = maskTexture;
            maskImg.width = 114;
            maskImg.height = 114;
            maskImg.x = (image.width - maskImg.width) / 2 + image.x;
            maskImg.y = (image.height - maskImg.height) / 2 + image.y;
            image.mask = maskImg;
        };
        RedPacketsPanel.prototype.btnClick = function (evt) {
            switch (evt.target) {
                case this.btn_0:
                case this.btn_1:
                case this.btn_2:
                    var index = parseInt(evt.target.name);
                    if (this._inviteInfo && this._inviteInfo.info[index]) {
                        var info = this._inviteInfo.info[index];
                        if (info.status == 1) {
                            this.clickShare();
                        }
                        else if (info.status == 2) {
                            uniLib.TipsUtils.showTipsDownToUp("该玩家在任意游戏中完成5局即可领取！");
                        }
                        else if (info.status == 3) {
                            var req = new Cmd.GetInviteRewardLittleGameLobbyCmd_C();
                            req.id = this._inviteInfo.info[index].id;
                            NetMgr.tcpSend(req);
                        }
                    }
                    break;
            }
        };
        /**分享操作 */
        RedPacketsPanel.prototype.clickShare = function () {
            if (uniLib.Global.isWxGame()) {
                var vo = new uniLib.WXShareVo();
                vo.shareType = Cmd.ShareType.invite;
                uniLib.ZQGameSdk.share(vo);
            }
            else {
                redpackets.shareNativeMessage(Cmd.ShareType.invite, 0, Cmd.ShareType.invite.toString());
            }
        };
        return RedPacketsPanel;
    }(eui.Component));
    redpackets.RedPacketsPanel = RedPacketsPanel;
    __reflect(RedPacketsPanel.prototype, "redpackets.RedPacketsPanel");
})(redpackets || (redpackets = {}));
