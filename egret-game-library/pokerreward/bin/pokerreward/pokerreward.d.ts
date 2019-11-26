declare module pokerreward {
    class pokerrewardConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        static POKER_REWARD: string;
        /**
         * 玩家战绩
         */
        static roundScore: Cmd.PokerRoundScore[];
        static ACTION_REWARD: string;
    }
}
declare module Cmd {
    /**重连时 战绩数据 */
    function OnShowPokerRoundScore_S(rev: Cmd.ShowPokerRoundScore_S): void;
}
declare module pokerreward {
    /**流水战绩 */
    class pokerrewardPanel extends eui.Component {
        private _arrowR;
        private _profile0;
        private _profile1;
        private _profile2;
        private _totalScore0;
        private _totalScore1;
        private _totalScore2;
        private _detailScroller;
        private _lblNoData;
        animatable: boolean;
        private _displayed;
        private _numRecord;
        private _profiles;
        private _totalScores;
        private _uids;
        constructor();
        protected childrenCreated(): void;
        displayed: boolean;
        /**
         * 更新对局得分详情
         *
         * @param {Cmd.RoundScore[]} data
         */
        updateRecordData(data: Cmd.PokerRoundScore[], userList: any): void;
        /**
         * 设置面板右边的箭头位置
         * @param {number} x
         * @param {number} y
         */
        setRightArrowPosition(x: number, y: number): void;
        /**
         * 从完成的对局详情数据中，解析出一局的得分数据
         * @param {Cmd.RoundScore[]} dataSource 数据源
         * @param {number} index 数据索引 == 局数-1
         * @returns {number[]}
         */
        private parseOneRecord(dataSource, index);
        /**
         * 从完成的对局详情数据中，统计出当前各个玩家的总分
         * @param {Cmd.RoundScore[]} dataSource
         * @returns {number[]}
         */
        private parseTotalScores(dataSource);
        /**
         * 更新显示玩家的头像
         */
        private updatePlayerProfile(userList);
        /**
         * 更新每个人的总分
         * @param {number[]} scores
         */
        private updateTotalScore(scores);
        /**
         * 添加一局的得分详情
         * @param {number} round 第n局 从1开始
         * @param {number[]} scores 该局每个人的得分集合
         */
        private addOneRecord(round, scores);
        private createLabel(text, x?, y?, size?, color?, width?, align?);
    }
}
