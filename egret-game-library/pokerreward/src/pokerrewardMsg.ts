module Cmd {
	/**重连时 战绩数据 */
	export function OnShowPokerRoundScore_S(rev: Cmd.ShowPokerRoundScore_S) {
		let scores: Cmd.PokerRoundScore[] = rev.rs;
		for (let i: number = 0; i < scores.length; i++) {
			let score: Cmd.PokerRoundScore = scores[i];
			if (!(score.score instanceof Array)) {
				score.score = [];
			}
		}
		pokerreward.pokerrewardConst.roundScore = rev.rs;
		uniLib.Global.dispatchEvent(pokerreward.pokerrewardConst.ACTION_REWARD);
	}
}