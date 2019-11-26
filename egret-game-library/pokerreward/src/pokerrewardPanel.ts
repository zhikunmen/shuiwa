module pokerreward {
    /**流水战绩 */
    export class pokerrewardPanel extends eui.Component {
        private _arrowR: eui.Image;
        private _profile0: eui.Image;
        private _profile1: eui.Image;
        private _profile2: eui.Image;
        private _totalScore0: eui.Label;
        private _totalScore1: eui.Label;
        private _totalScore2: eui.Label;
        private _detailScroller: eui.Group;
        private _lblNoData: eui.Label;

        public animatable: boolean = true;
        private _displayed: boolean;
        //本类存储的纪录的条数（等于当前完成的对局数）
        private _numRecord: number = 0;
        private _profiles: eui.Image[];
        private _totalScores: eui.Label[];
        private _uids: number[];

        public constructor() {
            super();
            this.skinName = "poker_ScoreRecordPanel";

            this._profiles = [];
            this._totalScores = [];
            this._uids = [];
        }


        protected childrenCreated(): void {
            super.childrenCreated();

            this._profiles.push(this._profile0);
            this._profiles.push(this._profile1);
            this._profiles.push(this._profile2);

            this._totalScores.push(this._totalScore0);
            this._totalScores.push(this._totalScore1);
            this._totalScores.push(this._totalScore2);
        }

        public get displayed() {
            this._displayed = this.parent != null;
            return this._displayed;
        }

        public set displayed(value: boolean) {
            this._displayed = value;
        }

        /**
         * 更新对局得分详情
         *
         * @param {Cmd.RoundScore[]} data
         */
        public updateRecordData(data: Cmd.PokerRoundScore[], userList: any): void {
            //console.log(data);
            //如果头像没满 刷新头像
            //房间最大人数
            let maxNumPlayer: number = userList.length;
            if (this._uids.length < maxNumPlayer) {
                this.updatePlayerProfile(userList);
            }

            //如果有数据 刷新
            if (data && data.length > 0) {
                let playerScores = data[0];
                let numRecord: number = 0;

                if (playerScores) {
                    numRecord = playerScores.score.length;
                }

                //去除无数据时的提示信息
                if (numRecord > 0 && this._lblNoData) {
                    this._lblNoData.parent.removeChild(this._lblNoData);
                    this._lblNoData = null;
                }

                //更新总分
                let totalScores: number[] = this.parseTotalScores(data);
                this.updateTotalScore(totalScores);

                //循环创建 每局的得分详情单元
                for (let i = this._numRecord; i < numRecord; i++) {
                    let record: number[] = this.parseOneRecord(data, i);
                    this.addOneRecord(i + 1, record);
                }
                this._numRecord = numRecord;
            }
        }

        /**
         * 设置面板右边的箭头位置
         * @param {number} x
         * @param {number} y
         */
        public setRightArrowPosition(x: number, y: number): void {
            if (x != null) this._arrowR.x = x;
            if (y != null) this._arrowR.y = y;
        }

        /**
         * 从完成的对局详情数据中，解析出一局的得分数据
         * @param {Cmd.RoundScore[]} dataSource 数据源
         * @param {number} index 数据索引 == 局数-1
         * @returns {number[]}
         */
        private parseOneRecord(dataSource: Cmd.PokerRoundScore[], index: number): number[] {
            let record: number[] = [];
            for (let playerScores of dataSource) {
                let i: number = this._uids.indexOf(playerScores.uid);
                record[i] = playerScores.score[index];
            }
            return record;
        }

        /**
         * 从完成的对局详情数据中，统计出当前各个玩家的总分
         * @param {Cmd.RoundScore[]} dataSource
         * @returns {number[]}
         */
        private parseTotalScores(dataSource: Cmd.PokerRoundScore[]): number[] {
            let scores: number[] = [];
            for (let playerScores of dataSource) {
                let i: number = this._uids.indexOf(playerScores.uid);
                let sum: number = 0;
                playerScores.score.forEach((value) => {
                    sum += value;
                });
                scores[i] = sum;
            }
            return scores;
        }

        /**
         * 更新显示玩家的头像
         */
        private updatePlayerProfile(userList: any): void {
            let players = userList;
            for (let i = 0, len = players.length; i < len; i++) {
                this._uids[i] = players[i].uid;
                this._profiles[i].source = players[i].headUrl;
            }
        }

        /**
         * 更新每个人的总分
         * @param {number[]} scores
         */
        private updateTotalScore(scores: number[]): void {
            for (let i = 0, len = scores.length; i < len; i++) {
                this._totalScores[i].text = "" + scores[i];
            }
        }

        /**
         * 添加一局的得分详情
         * @param {number} round 第n局 从1开始
         * @param {number[]} scores 该局每个人的得分集合
         */
        private addOneRecord(round: number, scores: number[]): void {
            let startY: number = (round - 1) * 54;

            if (round % 2 === 0) {
                let dartBg: eui.Image = new eui.Image();
                dartBg.source = 'pdk_scoreRecord_json.pdk_record_bg_unit';
                dartBg.width = this._detailScroller.width;
                dartBg.y = startY;
                this._detailScroller.addChild(dartBg);
            }

            let lblRound: eui.Label = this.createLabel(`第${round}局`, 8, startY + 17.5, 20);
            this._detailScroller.addChild(lblRound);

            let startX = 112;
            for (let score of scores) {
                let lblScore: eui.Label = this.createLabel('' + score, startX, startY + 17.5);
                this._detailScroller.addChild(lblScore);
                startX += 130;
            }
        }

        private createLabel(text: string, x?: number, y?: number, size: number = 24, color: number = 0x7A523F, width: number = 80, align: string = 'center', ): eui.Label {
            let label: eui.Label = new eui.Label();
            label.text = text;
            label.x = x;
            label.y = y;
            label.size = size;
            label.textColor = color;
            label.width = width;
            label.textAlign = align;
            return label;
        }
    }
}