
module FlopMachine {

	export const TURN = "turn";

	export const GET_CHIPS = "getChips";

	export const GUESS = "guess";

	export const JACKPOT = "jackPot";

	export const CLOSE_GUESS = "closeGuess";

	export const HANG_UP = "hang_up";
}


module Cmd {
	/**
	 * 发牌 换牌
	 */
	export function OnTurnLobbyCmd_S(rev: Cmd.TurnLobbyCmd_S) {
		uniLib.Global.dispatchEvent(FlopMachine.TURN, rev);
	}
	/**
	 * 取分
	 */
	export function OnGetLotchipsLobbyCmd_S(rev: Cmd.GetLotchipsLobbyCmd_S) {
		uniLib.Global.dispatchEvent(FlopMachine.GET_CHIPS, rev);
	}

	/**
	 * 猜大小
	 */
	export function OnGuessLobbyCmd_S(rev: Cmd.GuessLobbyCmd_S) {
		uniLib.Global.dispatchEvent(FlopMachine.GUESS, rev);
	}

	/**彩金更新 */
	export function OnGetJackpotLobbyCmd_S(rev: Cmd.GetJackpotLobbyCmd_S) {
		uniLib.Global.dispatchEvent(FlopMachine.JACKPOT, rev);
	}

	/**挂机 */
	export function OnHangUpLobbyCmd_S(rev: Cmd.HangUpLobbyCmd_S) {
		uniLib.Global.dispatchEvent(FlopMachine.HANG_UP, rev);
	}
}