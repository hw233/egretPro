var CampController = /** @class */ (function () {
    function CampController(obj) {
        this.bgWidth = 1408;
        this.bgHeight = 2502;
        this.camp = [];
        this.campBitmap = [];
        this.obj = obj;
        this.init();
        var tiledata = MapData.getTileMapConfig(BattleModel.getMapId());
        if (tiledata) {
            this.bgWidth = tiledata.col * tiledata.w;
            this.bgHeight = tiledata.row * tiledata.h;
        }
        else {
            error("小地图还没读取到战斗地图大小数据，将使用默认大小");
        }
    }
    CampController.prototype.InitSmallMap = function () {
        this.mapGroup = new eui.Component();
        this.mapGroup.height = this.obj.realMap_Img.height;
        this.mapGroup.width = this.bgWidth / (this.bgHeight / this.mapGroup.height);
        this.mapGroup.anchorOffsetX = this.mapGroup.width / 2;
        this.mapGroup.x = this.obj.smallMap_Group.width / 2;
        this.mapGroup.y = this.obj.smallMap_Group.height - this.mapGroup.height;
        this.obj.smallMap_Group.addChild(this.mapGroup);
        // debug(this.obj.realMap_Img.height,this.obj.smallMap_Group.width);
    };
    CampController.prototype.init = function () {
        if (this.obj.smallMap_Group) {
            debug("初始化阵营图片");
            if (!this.green || !this.red || !this.yellow) {
                this.green = RES.getRes("fight_component_BattleBar_json.fight_component_icon-4-1");
                this.red = RES.getRes("fight_component_BattleBar_json.fight_component_icon-4-2");
                this.yellow = RES.getRes("BattleBar_json.fight_component_icon-4-3");
                debug("图片的texture:", this.green, this.red, this.yellow);
                this.InitSmallMap();
            }
        }
    };
    CampController.prototype.conversionCoordinates = function (pos) {
        var point = new egret.Point();
        point.x = this.mapGroup.width / (this.bgWidth / pos.x);
        point.y = this.mapGroup.height / (this.bgHeight / pos.y);
        return point;
    };
    //1：魏国 蓝
    //2：蜀国 红
    //3：吴国 绿
    CampController.prototype.draw = function () {
        for (var i = this.campBitmap.length; i < this.camp.length; i++) {
            var img = null;
            if (this.camp[i].campFactionId == 0) {
                img = Utils.DisplayUtils.createPBitmap(this.green);
            }
            if (this.camp[i].campFactionId == 1) {
                img = Utils.DisplayUtils.createPBitmap(this.red);
            }
            if (this.camp[i].campFactionId == 2) {
                img = Utils.DisplayUtils.createPBitmap(this.yellow);
            }
            img.x = this.conversionCoordinates(this.camp[i].campPos).x;
            img.y = this.conversionCoordinates(this.camp[i].campPos).y;
            Utils.addChild(this.mapGroup, img);
            debug("图片信息为：", img);
            this.campBitmap.push(img);
        }
        return true;
    };
    CampController.prototype.addCamp = function (id, pos, factionId, playerId) {
        if (!playerId)
            playerId = 1;
        this.camp.push({ campId: id, campPos: pos, campFactionId: factionId, campPlayerId: playerId });
        // debug("成功添加点坐标：", id);
    };
    CampController.prototype.moveCamp = function (id, pos, playerId) {
        for (var i = 0; i < this.campBitmap.length; i++) {
            if (this.camp.length == this.campBitmap.length) {
                if (this.camp[i].campId == id) {
                    this.campBitmap[i].x = this.conversionCoordinates(pos).x;
                    this.campBitmap[i].y = this.conversionCoordinates(pos).y;
                    // debug("成功赋值点坐标:", this.campBitmap[i].x, this.campBitmap[i].y);
                }
            }
        }
    };
    CampController.prototype.deleteCamp = function (id, playerId) {
        for (var i = 0; i < this.camp.length; i++) {
            if (this.camp[i].campId == id) {
                // Utils.removeFromParent(this.campBitmap[i]);
                this.camp.splice(i, 1);
                this.campBitmap[i].onDestroy();
                this.campBitmap.splice(i, 1);
                // debug("成功删除点坐标:", id);
                break;
            }
        }
    };
    return CampController;
}());
