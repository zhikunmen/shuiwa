// TypeScript file
module clubnew {
    export class DataManage {
        public static MatchMemberTypeToString(type: number) {
            if (!type) {
                return "游  客";
            }
            else if (type == 1) {
                return "白名单";
            }
            else if (type == 2) {
                return "黑名单";
            } else if (type == 3) {
                return "黄名单";
            } else if (type == 4) {
                return "VIP";
            }
        }
        public static MatchMemberTypeToColor(type: number) {
            if (!type) {
                return 0x486d42;
            }
            else if (type == 1) {
                return 0x48FF00;
            }
            else if (type == 2) {
                return 0xcb2424;
            } else if (type == 3) {
                return 0xba6901;
            } else if (type == 4) {
                return 0xF4C775;
            }
        }
    }

}