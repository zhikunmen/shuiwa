module Cmd {

    export function KnapsackDispatch(cmd: string, obj?: any, bubbles = true): void {
        uniLib.Global.dispatchEvent(cmd, obj, bubbles)
    }

    /**更新物品数据 */
    export function OnBackpackExchangeReturnBackpackCmd_S(rev: Cmd.BackpackExchangeReturnBackpackCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = knapsack.KnapsackConst.SUCCESS;
        }
        if (rev.resultCode == knapsack.KnapsackConst.SUCCESS) {
            KnapsackDispatch(knapsack.KnapsackConst.BackpackExchangeReturnBackpack, rev);
        }
    }

    /**返回背包数据*/
    export function OnBackpackInfoReturnBackpackCmd_S(rev: Cmd.BackpackInfoReturnBackpackCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = knapsack.KnapsackConst.SUCCESS;
        }
        if (rev.resultCode == knapsack.KnapsackConst.SUCCESS) {
            KnapsackDispatch(knapsack.KnapsackConst.BackpackInfoReturnBackpack, rev);
        }
    }


}