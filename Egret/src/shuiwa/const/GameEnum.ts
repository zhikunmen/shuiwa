namespace SWGAME{
    //补充Cmd中没有定义的枚举类型
    export namespace GameEnum {
        //用户进入房间方式
        export enum EnterType {
            //正常/断线重连进入
            NormalEnter = 1,

            //中途加入
            InGameEnter = 2
        }
    }
}