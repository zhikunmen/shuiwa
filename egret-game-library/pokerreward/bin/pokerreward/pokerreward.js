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
var pokerreward;
(function (pokerreward) {
    var pokerrewardConst = (function () {
        function pokerrewardConst() {
        }
        pokerrewardConst.RES_JSON = "resource/pokerreward/pokerreward.res_5f98eb7.json";
        pokerrewardConst.THM_JSON = "resource/pokerreward/gameEui_9569581d.json";
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        pokerrewardConst.POKER_REWARD = "poker_reward";
        /**
         * 玩家战绩
         */
        pokerrewardConst.roundScore = [];
        //战绩显示
        pokerrewardConst.ACTION_REWARD = "action_reward";
        return pokerrewardConst;
    }());
    pokerreward.pokerrewardConst = pokerrewardConst;
    __reflect(pokerrewardConst.prototype, "pokerreward.pokerrewardConst");
})(pokerreward || (pokerreward = {}));
var Cmd;
(function (Cmd) {
    /**重连时 战绩数据 */
    function OnShowPokerRoundScore_S(rev) {
        var scores = rev.rs;
        for (var i = 0; i < scores.length; i++) {
            var score = scores[i];
            if (!(score.score instanceof Array)) {
                score.score = [];
            }
        }
        pokerreward.pokerrewardConst.roundScore = rev.rs;
        uniLib.Global.dispatchEvent(pokerreward.pokerrewardConst.ACTION_REWARD);
    }
    Cmd.OnShowPokerRoundScore_S = OnShowPokerRoundScore_S;
})(Cmd || (Cmd = {}));
var pokerreward;
(function (pokerreward) {
    /**流水战绩 */
    var pokerrewardPanel = (function (_super) {
        __extends(pokerrewardPanel, _super);
        function pokerrewardPanel() {
            var _this = _super.call(this) || this;
            _this.animatable = true;
            //本类存储的纪录的条数（等于当前完成的对局数）
            _this._numRecord = 0;
            _this.skinName = "poker_ScoreRecordPanel";
            _this._profiles = [];
            _this._totalScores = [];
            _this._uids = [];
            return _this;
        }
        pokerrewardPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._profiles.push(this._profile0);
            this._profiles.push(this._profile1);
            this._profiles.push(this._profile2);
            this._totalScores.push(this._totalScore0);
            this._totalScores.push(this._totalScore1);
            this._totalScores.push(this._totalScore2);
        };
        Object.defineProperty(pokerrewardPanel.prototype, "displayed", {
            get: function () {
                this._displayed = this.parent != null;
                return this._displayed;
            },
            set: function (value) {
                this._displayed = value;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新对局得分详情
         *
         * @param {Cmd.RoundScore[]} data
         */
        pokerrewardPanel.prototype.updateRecordData = function (data, userList) {
            //console.log(data);
            //如果头像没满 刷新头像
            //房间最大人数
            var maxNumPlayer = userList.length;
            if (this._uids.length < maxNumPlayer) {
                this.updatePlayerProfile(userList);
            }
            //如果有数据 刷新
            if (data && data.length > 0) {
                var playerScores = data[0];
                var numRecord = 0;
                if (playerScores) {
                    numRecord = playerScores.score.length;
                }
                //去除无数据时的提示信息
                if (numRecord > 0 && this._lblNoData) {
                    this._lblNoData.parent.removeChild(this._lblNoData);
                    this._lblNoData = null;
                }
                //更新总分
                var totalScores = this.parseTotalScores(data);
                this.updateTotalScore(totalScores);
                //循环创建 每局的得分详情单元
                for (var i = this._numRecord; i < numRecord; i++) {
                    var record = this.parseOneRecord(data, i);
                    this.addOneRecord(i + 1, record);
                }
                this._numRecord = numRecord;
            }
        };
        /**
         * 设置面板右边的箭头位置
         * @param {number} x
         * @param {number} y
         */
        pokerrewardPanel.prototype.setRightArrowPosition = function (x, y) {
            if (x != null)
                this._arrowR.x = x;
            if (y != null)
                this._arrowR.y = y;
        };
        /**
         * 从完成的对局详情数据中，解析出一局的得分数据
         * @param {Cmd.RoundScore[]} dataSource 数据源
         * @param {number} index 数据索引 == 局数-1
         * @returns {number[]}
         */
        pokerrewardPanel.prototype.parseOneRecord = function (dataSource, index) {
            var record = [];
            for (var _i = 0, dataSource_1 = dataSource; _i < dataSource_1.length; _i++) {
                var playerScores = dataSource_1[_i];
                var i = this._uids.indexOf(playerScores.uid);
                record[i] = playerScores.score[index];
            }
            return record;
        };
        /**
         * 从完成的对局详情数据中，统计出当前各个玩家的总分
         * @param {Cmd.RoundScore[]} dataSource
         * @returns {number[]}
         */
        pokerrewardPanel.prototype.parseTotalScores = function (dataSource) {
            var scores = [];
            var _loop_1 = function (playerScores) {
                var i = this_1._uids.indexOf(playerScores.uid);
                var sum = 0;
                playerScores.score.forEach(function (value) {
                    sum += value;
                });
                scores[i] = sum;
            };
            var this_1 = this;
            for (var _i = 0, dataSource_2 = dataSource; _i < dataSource_2.length; _i++) {
                var playerScores = dataSource_2[_i];
                _loop_1(playerScores);
            }
            return scores;
        };
        /**
         * 更新显示玩家的头像
         */
        pokerrewardPanel.prototype.updatePlayerProfile = function (userList) {
            var players = userList;
            for (var i = 0, len = players.length; i < len; i++) {
                this._uids[i] = players[i].uid;
                this._profiles[i].source = players[i].headUrl;
            }
        };
        /**
         * 更新每个人的总分
         * @param {number[]} scores
         */
        pokerrewardPanel.prototype.updateTotalScore = function (scores) {
            for (var i = 0, len = scores.length; i < len; i++) {
                this._totalScores[i].text = "" + scores[i];
            }
        };
        /**
         * 添加一局的得分详情
         * @param {number} round 第n局 从1开始
         * @param {number[]} scores 该局每个人的得分集合
         */
        pokerrewardPanel.prototype.addOneRecord = function (round, scores) {
            var startY = (round - 1) * 54;
            if (round % 2 === 0) {
                var dartBg = new eui.Image();
                dartBg.source = 'pdk_scoreRecord_json.pdk_record_bg_unit';
                dartBg.width = this._detailScroller.width;
                dartBg.y = startY;
                this._detailScroller.addChild(dartBg);
            }
            var lblRound = this.createLabel("\u7B2C" + round + "\u5C40", 8, startY + 17.5, 20);
            this._detailScroller.addChild(lblRound);
            var startX = 112;
            for (var _i = 0, scores_1 = scores; _i < scores_1.length; _i++) {
                var score = scores_1[_i];
                var lblScore = this.createLabel('' + score, startX, startY + 17.5);
                this._detailScroller.addChild(lblScore);
                startX += 130;
            }
        };
        pokerrewardPanel.prototype.createLabel = function (text, x, y, size, color, width, align) {
            if (size === void 0) { size = 24; }
            if (color === void 0) { color = 0x7A523F; }
            if (width === void 0) { width = 80; }
            if (align === void 0) { align = 'center'; }
            var label = new eui.Label();
            label.text = text;
            label.x = x;
            label.y = y;
            label.size = size;
            label.textColor = color;
            label.width = width;
            label.textAlign = align;
            return label;
        };
        return pokerrewardPanel;
    }(eui.Component));
    pokerreward.pokerrewardPanel = pokerrewardPanel;
    __reflect(pokerrewardPanel.prototype, "pokerreward.pokerrewardPanel");
})(pokerreward || (pokerreward = {}));
