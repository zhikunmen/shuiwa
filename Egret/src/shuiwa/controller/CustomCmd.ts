namespace Cmd{

    export class CommonChatCmd_Brd {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 聊天内容
         */
        chatContent: SWChatContent;
        GetType(): string { return 'Cmd.SWCommonChatCmd_Brd'; }
    }

}