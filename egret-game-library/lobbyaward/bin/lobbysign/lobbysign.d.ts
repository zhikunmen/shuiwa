declare module lobbyaward {
    class AwardConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static LOBBY_AWARD: string;
    }
    /**暂存数据 对应表数据 */
    class Data {
        /**每日签到 */
        static sign: Dictionary<table.TableSignIn>;
        /**道具表 */
        static goods: Dictionary<table.TableGoodsConfig>;
        /**任务 免费金币 */
        static task: Dictionary<table.LobbyTaskConfig>;
    }
}
/**
* 字典
* TypeScript字典中的Key只能为String 或者 Number
* 使用方法：
* 例如有个学生类Student,学生的学号为Number类型,需要将N个学生实例按照学号为Key，实例为Value的形式存入Dictionary
* 定义：var dict: Dictionary<Student> = {};
* 存入：dict[201038889066] = stu1;    //stu1是一个Student实例
* 读取：var value = dict[201038889066];
* 遍历：        for(var dicKey in dict)
*                        console.log("key=" + dicKey + "value=" + dict[dicKey]);
*/
interface Dictionary<TValue> {
    [key: string]: TValue;
    [key: number]: TValue;
}
declare module lobbyaward {
    class LobbyGetAwardPanel extends eui.Component {
        private guang;
        private bgRect;
        private image;
        private awardimage;
        private okBtn;
        private jinbiText;
        private _freeGoldMc;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        setData(jinbi: number, type: number): void;
    }
}
