var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var com_main;
(function (com_main) {
    var LegionCheckCell = /** @class */ (function (_super_1) {
        __extends(LegionCheckCell, _super_1);
        function LegionCheckCell(data) {
            var _this = _super_1.call(this) || this;
            _this.skinName = Utils.getAppSkin("common/legion/LegionCheckCellSkin.exml");
            return _this;
        }
        LegionCheckCell.create = function () {
            var obj = ObjectPool.pop(LegionCheckCell, "LegionCheckCell");
            return obj;
        };
        LegionCheckCell.prototype.onDestroy = function () {
            _super_1.prototype.onDestroy.call(this);
            com_main.EventManager.removeEventListeners(this);
        };
        LegionCheckCell.prototype.childrenCreated = function () {
            _super_1.prototype.childrenCreated.call(this);
        };
        LegionCheckCell.prototype.setInfo = function (data, power, name) {
            this.m_comHead.info = data;
            this.m_comFightItem.setFight(power);
            this.m_labName.text = name;
        };
        LegionCheckCell.NAME = 'LegionCheckCell';
        return LegionCheckCell;
    }(com_main.CComponent));
    com_main.LegionCheckCell = LegionCheckCell;
})(com_main || (com_main = {}));
