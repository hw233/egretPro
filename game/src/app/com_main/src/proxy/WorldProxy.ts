class WorldProxy extends BaseProxy {

    public static m_pVersion: number = null;//城池缓存的数据版本


    protected listenerProtoNotifications(): any[] {
        return [
            [ProtoDef.CITY_BATTLE_LOAD_WORLD_MAP, this, 'CityBattleLoadWorldMapReq', 'CityBattleLoadWorldMapResp'],//请求世界地图数据
            [ProtoDef.CITY_BATTLE_EXIT_WORLD_MAP, this, 'CITY_BATTLE_EXIT_WORLD_MAP', ''],//退出世界地图
            // [ProtoDef.WORLD_GET_RES_EVENT_REWARD, this, 'GainEventRewardReq', ''],//野外资源点奖励
            // [ProtoDef.WORLD_SPECIAL_EVENT_REWARD, this, '', 'SpecialEventRewardResp'],//特殊事件奖励通知

            // [ProtoDef.WORLD_ATTACK_EVENT_LIST, this, 'RequestBattleListReq', 'RequestBattleListResp'],//世界地图攻击事件列表
            // [ProtoDef.WORLD_UPDATE_ATTACK_EVENT, this, '', 'UpdateSingleBattleResp'],//更新攻击事件
            // [ProtoDef.WORLD_GET_BATTLE_ID, this, 'GetBattleIdReq', 'GetBattleIdResp'],//获取battleid

            // [ProtoDef.WORLD_VISIT_LIST, this, 'VisitEventListReq', 'VisitEventListResp'],//获取可以拜访的列表返回
            // [ProtoDef.WORLD_EVENT_VISIT, this, 'GeneralVisitReq', 'GeneralVisitResp'],//事件拜访
            // [ProtoDef.WORLD_VISIT_BATTLE_ID, this, '', 'VisitEventBattleIdResp'],//推送拜访比武战斗id


            // [ProtoDef.WORLD_SIEGE_LIST, this, 'BattleMatchListReq', 'BattleMatchListResp'],//攻城战所有信息
            // [ProtoDef.WORLD_SIEGE_UPDATE, this, '', 'UpdateCitybattleQueueResp'],//更新攻城战信息
            // [ProtoDef.WORLD_SIEGE_RESULT, this, '', 'CloseCitybattleQueueResp'],//攻城战信息结果
            // [ProtoDef.WORLD_SIEGE_UPDATE_BATTLE, this, '', 'UpdateBattleMatchIdResp'],//攻城战信息结果
            // [ProtoDef.WORLD_SIEGE_CITY_RESULT, this, '', 'UpdateFinalBattleResultResp'],//攻城战信息结果
            // [ProtoDef.WORLD_SIEGE_KILL_LIST, this, 'BattleKillRanksReq', 'BattleKillRanksResp'],//攻城战排行榜


        ];
    }

    protected listenerProtoNotificationsNew(): [number, any, string, ProxyEnum][] {
        return [
            [ProtoDef.S2C_CITY_UPDATE, this, 'S2C_CITY_UPDATE', ProxyEnum.RECEIVE],//推送更新单个城池

            [ProtoDef.C2S_GENERAL_VISIT, this, 'C2S_GENERAL_VISIT', ProxyEnum.SEND],       //拜访事件
            [ProtoDef.S2C_GENERAL_VISIT, this, 'S2C_GENERAL_VISIT', ProxyEnum.RECEIVE],
            [ProtoDef.S2C_VISIT_EVENT_UPDATE, this, 'S2C_VISIT_EVENT_UPDATE', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_TEAMMOVE_LIST, this, 'C2S_TEAMMOVE_LIST', ProxyEnum.SEND],// 移动对象
            [ProtoDef.S2C_TEAMMOVE_LIST, this, 'S2C_TEAMMOVE_LIST', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_TEAMMOVE_TO, this, 'C2S_TEAMMOVE_TO', ProxyEnum.SEND],// 发起移动
            [ProtoDef.S2C_TEAMMOVE_TO, this, 'S2C_TEAMMOVE_TO', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_TEAMMOVE_QUICKEN, this, 'C2S_TEAMMOVE_QUICKEN', ProxyEnum.SEND],// 移动对象加速
            [ProtoDef.S2C_TEAMMOVE_QUICKEN, this, 'S2C_TEAMMOVE_QUICKEN', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_TEAMMOVE_RETURN, this, 'C2S_TEAMMOVE_RETURN', ProxyEnum.SEND],// 原路返回
            [ProtoDef.S2C_TEAMMOVE_RETURN, this, 'S2C_TEAMMOVE_RETURN', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_WORLDMAP_EVENT_ACT, this, 'C2S_WORLDMAP_EVENT_ACT', ProxyEnum.SEND],// 事件操作
            [ProtoDef.S2C_WORLDMAP_EVENT_ACT, this, 'S2C_WORLDMAP_EVENT_ACT', ProxyEnum.RECEIVE],
            [ProtoDef.S2C_WORLDMAP_EVENT_OVER, this, 'S2C_WORLDMAP_EVENT_OVER', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_WORLDMAP_EVENT_COLLECTION_QUICKEN, this, 'C2S_WORLDMAP_EVENT_COLLECTION_QUICKEN', ProxyEnum.SEND],// 采集加速
            [ProtoDef.S2C_WORLDMAP_EVENT_COLLECTION_QUICKEN, this, 'S2C_WORLDMAP_EVENT_COLLECTION_QUICKEN', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_CITY_WAR_GO, this, 'C2S_CITY_WAR_GO', ProxyEnum.SEND], //进入城市战场
            [ProtoDef.S2C_CITY_WAR_GO, this, 'S2C_CITY_WAR_GO', ProxyEnum.RECEIVE],

            [ProtoDef.S2C_CITY_ITEM_COUNT, this, 'S2C_CITY_ITEM_COUNT', ProxyEnum.RECEIVE], //广播队伍数量

            [ProtoDef.C2S_CITY_WAR_MYTEAM, this, 'C2S_CITY_WAR_MYTEAM', ProxyEnum.SEND], //根据城市ID，获取我攻击的所有队伍
            [ProtoDef.S2C_CITY_WAR_MYTEAM, this, 'S2C_CITY_WAR_MYTEAM', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_CITY_WAR_TEAM, this, 'C2S_CITY_WAR_TEAM', ProxyEnum.SEND], //获取为打仗的队伍数据
            [ProtoDef.S2C_CITY_WAR_TEAM, this, 'S2C_CITY_WAR_TEAM', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_CITY_WAR_OUT, this, 'C2S_CITY_WAR_TEAM', ProxyEnum.SEND], //退出战场
            [ProtoDef.S2C_CITY_WAR_OUT, this, 'S2C_CITY_WAR_OUT', ProxyEnum.RECEIVE],

            [ProtoDef.S2C_CITY_WAR_SINGLE_OVER, this, 'S2C_CITY_WAR_SINGLE_OVER', ProxyEnum.RECEIVE], //单场战斗完成通知
            [ProtoDef.S2C_CITY_WAR_SETTLEMENT, this, 'S2C_CITY_WAR_SETTLEMENT', ProxyEnum.RECEIVE], //国战总结算

            [ProtoDef.C2S_CITY_WAR_CONFRONTATION_LIST, this, 'C2S_CITY_WAR_CONFRONTATION_LIST', ProxyEnum.SEND], //国战对战列表
            [ProtoDef.S2C_CITY_WAR_CONFRONTATION_LIST, this, 'S2C_CITY_WAR_CONFRONTATION_LIST', ProxyEnum.RECEIVE], //国战对战列表

            [ProtoDef.C2S_CITY_WAR_DMG_RANK, this, 'C2S_CITY_WAR_DMG_RANK', ProxyEnum.SEND],//攻城战排行榜
            [ProtoDef.S2C_CITY_WAR_DMG_RANK, this, 'S2C_CITY_WAR_DMG_RANK', ProxyEnum.RECEIVE],//攻城战排行榜

            [ProtoDef.C2S_CITY_WATCH_WAR_TEAM, this, 'C2S_CITY_WATCH_WAR_TEAM', ProxyEnum.SEND],//获取别的队伍战斗情况（前端观战完成时才调用）
            [ProtoDef.S2C_CITY_WATCH_WAR_TEAM, this, 'S2C_CITY_WATCH_WAR_TEAM', ProxyEnum.RECEIVE],//获取别的队伍战斗情况（前端观战完成时才调用）

            [ProtoDef.C2S_WORLDMAP_INFORMATION, this, 'C2S_WORLDMAP_INFORMATION', ProxyEnum.SEND], //警报
            [ProtoDef.S2C_WORLDMAP_INFORMATION, this, 'S2C_WORLDMAP_INFORMATION', ProxyEnum.RECEIVE], //警报

            [ProtoDef.S2C_WORLDMAP_INFORMATION_MASS_NOTICE, this, 'S2C_WORLDMAP_INFORMATION_MASS_NOTICE', ProxyEnum.RECEIVE], //集结信号

            [ProtoDef.C2S_MILITARYMERITS_REWARD_INFO, this, 'C2S_MILITARYMERITS_REWARD_INFO', ProxyEnum.SEND], //战力奖励
            [ProtoDef.S2C_MILITARYMERITS_REWARD_INFO, this, 'S2C_MILITARYMERITS_REWARD_INFO', ProxyEnum.RECEIVE],

            [ProtoDef.C2S_MILITARYMERITS_REWARD_RECEIVE, this, 'C2S_MILITARYMERITS_REWARD_RECEIVE', ProxyEnum.SEND], //警报
            [ProtoDef.S2C_MILITARYMERITS_REWARD_RECEIVE, this, 'S2C_MILITARYMERITS_REWARD_RECEIVE', ProxyEnum.RECEIVE], //警报

            [ProtoDef.S2C_WORLDMAP_EVENT_WAR_OVER, this, 'S2C_WORLDMAP_EVENT_WAR_OVER', ProxyEnum.RECEIVE], //事件战斗完成

            [ProtoDef.C2S_GET_MAP_EVENT_DATA, this, 'C2S_GET_MAP_EVENT_DATA', ProxyEnum.SEND], //刷新资源点
            [ProtoDef.S2C_GET_MAP_EVENT_DATA, this, 'S2C_GET_MAP_EVENT_DATA', ProxyEnum.RECEIVE], //更新资源点

            [ProtoDef.C2S_VISIT_DATA_REFRESH, this, 'C2S_VISIT_DATA_REFRESH', ProxyEnum.SEND], //刷新拜访武将
            [ProtoDef.S2C_VISIT_DATA_REFRESH, this, 'S2C_VISIT_DATA_REFRESH', ProxyEnum.RECEIVE], //刷新拜访武将

            [ProtoDef.C2S_VISIT_CD_SPEED, this, 'C2S_VISIT_CD_SPEED', ProxyEnum.SEND], //加速时间
            [ProtoDef.S2C_VISIT_CD_SPEED, this, 'S2C_VISIT_CD_SPEED', ProxyEnum.RECEIVE], //加速时间

            [ProtoDef.C2S_UNLOCK_CITY, this, 'C2S_UNLOCK_CITY', ProxyEnum.SEND], //解锁城池
            [ProtoDef.S2C_UNLOCK_CITY, this, 'S2C_UNLOCK_CITY', ProxyEnum.RECEIVE], //解锁城池

            [ProtoDef.C2S_MAP_EVENT_BUY, this, 'C2S_MAP_EVENT_BUY', ProxyEnum.SEND], //次数购买
            [ProtoDef.S2C_MAP_EVENT_BUY, this, 'S2C_MAP_EVENT_BUY', ProxyEnum.RECEIVE], //次数购买

            [ProtoDef.C2S_CITY_ITEM_INFO, this, 'C2S_CITY_ITEM_INFO', ProxyEnum.SEND], //城池驻军详情
            [ProtoDef.S2C_CITY_ITEM_INFO, this, 'S2C_CITY_ITEM_INFO', ProxyEnum.RECEIVE], //城池驻军详情

            [ProtoDef.S2C_TEAMMOVE_DEL, this, 'S2C_TEAMMOVE_DEL', ProxyEnum.RECEIVE], //删除移动
        ]
    }

    public execute(notification: AGame.INotification) {
        let protocol: number = Number(notification.getName());
        let body = notification.getBody();
        debug(`WorldProxy===protocol: ${protocol}`, body)
        switch (protocol) {
            case ProtoDef.CITY_BATTLE_LOAD_WORLD_MAP: {
                let data = body as gameProto.ICityBattleLoadWorldMapResp;
                WorldProxy.m_pVersion = data.version;
                WorldModel.worldLevel = data.wordLv;
                WorldModel.initCityBuildInfo(data.cityInfo);
                WorldModel.parseEventList(data.mapEventData, true);
                WorldModel.parseVisitEventList(data.visitEventData, true);
                WorldModel.initCityLockData(data.mapUnLock);
                com_main.EventMgr.dispatchEvent(TaskWorldEvent.WORLD_CITY_UPDATE, data.cityInfo);
                break;
            }
            case ProtoDef.S2C_CITY_UPDATE: {    //城池状态更新 
                let data = body as gameProto.S2C_CITY_UPDATE;
                WorldModel.initCityBuildInfo(data.cityInfo);
                com_main.EventMgr.dispatchEvent(TaskWorldEvent.WORLD_CITY_UPDATE, data.cityInfo);
                break;
            }
            case ProtoDef.S2C_MAP_EVENT_BUY: {    //次数更新
                let data = body as gameProto.S2C_MAP_EVENT_BUY;
                if (data.state == 0) EffectUtils.showTips(GCode(CLEnum.MAT_BUY_SUC));
                break;
            }
            case ProtoDef.S2C_VISIT_EVENT_UPDATE: {   //拜访事件更新
                let data = body as gameProto.S2C_VISIT_EVENT_UPDATE;
                if (data.state == 1) {
                    WorldModel.removeVisitEvent(data.visitEventData.cityId);
                } else {
                    WorldModel.updateVisitEvent(data.visitEventData);
                }
                break;
            }
            // case ProtoDef.S2C_TEAMMOVE_DEL: {   //删除行军路线
            //     let data = body as gameProto.S2C_TEAMMOVE_DEL;
            //      worldview 处理
            //     break;
            // }
            case ProtoDef.S2C_UNLOCK_CITY: {   //城池解锁
                let data = body as gameProto.S2C_UNLOCK_CITY;
                let cityInfo: gameProto.ICityInfo = WorldModel.getCityBuildInfo(data.cityId);
                let taskUnlockCfg: WorldMapUnlockTaskConfig = C.WorldMapUnlockTaskConfig[cityInfo.unlockTaskId];
                let worldMapCfg: WorldMapConfig = C.WorldMapConfig[data.cityId];
                let isVictory = data.errorCode == 0;
                if (data.errorCode == 0) {
                    WorldModel.updateCityLockState(data.cityId);
                    if (taskUnlockCfg.type == WorldLockTaskType.FIGHT) {
                        WorldModel.isUnlockFightFinish = true;
                    }
                    if (taskUnlockCfg.type == WorldLockTaskType.FIGHT) {
                        WorldModel.m_pInitMoveId = data.cityId;
                        WorldModel.unLockCid = data.cityId;
                        WorldModel.unLockTaskId = taskUnlockCfg.id;

                        if (FightResponseUtil.victory && GuideModel.doWarEndStep()) {
                            break;
                        }
                        Utils.open_view(TASK_UI.POP_RESULT_ARENA_BATTLE_VIEW, { result: isVictory, rewards: Utils.parseCommonItemJson(worldMapCfg.unlockReward), battleType: CheckPointType.UNLOCK_WAR });
                        WorldModel.isFromUnLockFight = true;
                    }
                } else {
                    // EffectUtils.showTips("城池解锁失败")
                    Utils.open_view(TASK_UI.POP_RESULT_ARENA_BATTLE_VIEW, { result: isVictory, rewards: Utils.parseCommonItemJson(worldMapCfg.unlockReward), battleType: CheckPointType.UNLOCK_WAR });
                }


                break;
            }
            case ProtoDef.S2C_TEAMMOVE_LIST: {   //移动队列
                let data = body as gameProto.S2C_TEAMMOVE_LIST;
                WorldModel.parseTeamMove(data.teamMoveDataResp, true);
                WorldModel.runScene();
                break;
            }
            case ProtoDef.S2C_CITY_ITEM_INFO: {   //移动队列
                let data = body as gameProto.S2C_CITY_ITEM_INFO;
                WorldModel.parseTroop(data.defPlayerWarData)
                break;
            }
            case ProtoDef.S2C_TEAMMOVE_TO: { //移动回调
                let data = body as gameProto.S2C_TEAMMOVE_TO;
                WorldModel.parseTeamMove(data.teamMoveDataResp);
                break;
            }
            case ProtoDef.S2C_TEAMMOVE_QUICKEN: {    //加速
                let data = body as gameProto.S2C_TEAMMOVE_QUICKEN;
                WorldModel.parseTeamMove([data.teamMoveDataResp]);
                break;
            }
            case ProtoDef.S2C_TEAMMOVE_RETURN: {     //返回
                let data = body as gameProto.S2C_TEAMMOVE_RETURN;
                WorldModel.parseTeamMove([data.teamMoveDataResp]);
                break;
            }

            case ProtoDef.S2C_WORLDMAP_EVENT_ACT: {  //事件操作返回
                let data = body as gameProto.S2C_WORLDMAP_EVENT_ACT
                if (data.state == 0) {
                    WorldModel.updateWorldEvent(data.mapEventData);
                } else if (data.state == 3802) {
                    EffectUtils.showTips("次数不够")
                }
                break;
            }

            case ProtoDef.S2C_WORLDMAP_EVENT_OVER: { //事件完成
                let data = body as gameProto.S2C_WORLDMAP_EVENT_OVER;
                break;
            }
            case ProtoDef.S2C_WORLDMAP_EVENT_COLLECTION_QUICKEN: {   //采集加速
                let data = body as gameProto.S2C_WORLDMAP_EVENT_COLLECTION_QUICKEN;
                if (data.state == 0) {
                    WorldModel.updateWorldEvent(data.mapEventData);
                }
                break;
            }
            case ProtoDef.S2C_CITY_WAR_GO: {  //进入城市战场
                let data = body as gameProto.S2C_CITY_WAR_GO;
                if (data.state == 0) {
                    WorldModel.setCityWarInfo(data);
                    WorldProxy.send_C2S_CITY_WAR_MYTEAM(data.cityId);
                }
                break;
            }

            case ProtoDef.S2C_CITY_ITEM_COUNT: {
                WorldModel.setCityItemCount(body);
                com_main.EventMgr.dispatchEvent(BattleEvent.CITY_ITEM_COUNT_UPDATE, null);
                break;
            }

            case ProtoDef.S2C_WORLDMAP_INFORMATION: {  //警报
                let data = body as gameProto.S2C_WORLDMAP_INFORMATION;
                WorldModel.updateWarnInfomation(data);
                com_main.EventMgr.dispatchEvent(TaskWorldEvent.WARN_UPDATE, null);
                break;
            }
            case ProtoDef.S2C_WORLDMAP_INFORMATION_MASS_NOTICE: {  //警报
                let data = body as gameProto.S2C_WORLDMAP_INFORMATION_MASS_NOTICE;
                WorldModel.updateWarnNotice(data);
                /**手动请求警报 */
                WorldProxy.C2S_WORLDMAP_INFORMATION(RoleData.countryId);
                break;
            }
            case ProtoDef.S2C_CITY_WAR_MYTEAM: {
                let data = body as gameProto.S2C_CITY_WAR_MYTEAM;
                let first: gameProto.IMyTeamWar = data.myTeamWar[0];

                if (!WorldModel.isInCityWar() || data.cityId != WorldModel.getCityWarInfo().cityId) {
                    WorldProxy.send_C2S_CITY_WAR_OUT(data.cityId);
                    return
                }

                WorldModel.initCityWarMyteam(data);

                // 如果已经再观战
                for (let myTeam of data.myTeamWar) {
                    if (myTeam.battleId && myTeam.battleId == BattleModel.getJoinedBattleId() && RoleData.playerId == WorldModel.m_watchPlayerId) {
                        return;
                    }
                }

                // 如果战斗结束 选择当前观看队伍的战斗观看
                for (let myTeam of data.myTeamWar) {
                    if (RoleData.playerId == WorldModel.m_watchPlayerId && myTeam.teamId == WorldModel.m_watchTeamId) {
                        if (myTeam.battleId != 0) {
                            // BattleProxy.send_C2S_WAR_REENTRY_BATTLE(myTeam.battleId);
                            WorldModel.setCurWatchTeamId(RoleData.playerId, myTeam.teamId);
                            WorldProxy.send_C2S_CITY_WATCH_WAR_TEAM(WorldModel.getCityWarInfo().cityId, RoleData.playerId, myTeam.teamId);
                            return;
                        }
                    }
                }

                // 选择一场战斗进行观看
                for (let myTeam of data.myTeamWar) {
                    if (myTeam.battleId != 0) {
                        // BattleProxy.send_C2S_WAR_REENTRY_BATTLE(myTeam.battleId);
                        WorldModel.setCurWatchTeamId(RoleData.playerId, myTeam.teamId);
                        WorldProxy.send_C2S_CITY_WATCH_WAR_TEAM(WorldModel.getCityWarInfo().cityId, RoleData.playerId, myTeam.teamId);
                        return;
                    }
                }

                if (first) {
                    //等待界面
                    if (SceneManager.getCurrScene() != SceneEnums.BATTLE_MAP) {
                        SceneManager.enterScene(SceneEnums.WAIT_BATTLE_MAP, { teamId: first.teamId });
                    }

                } else {
                    // 观战
                    // WorldProxy.send_C2S_CITY_WAR_CONFRONTATION_LIST(WorldModel.getCityWarInfo().cityId);

                    WorldProxy.send_C2S_CITY_WATCH_WAR_TEAM(WorldModel.getCityWarInfo().cityId, 0, 0);
                }


                break;
            }
            case ProtoDef.S2C_CITY_WAR_TEAM: {

                break;
            }

            case ProtoDef.S2C_CITY_WATCH_WAR_TEAM: {
                let data = body as gameProto.IS2C_CITY_WATCH_WAR_TEAM;
                if (data.state != 0) {
                    //观战中退出，有队伍的等待结算界面
                    if (!WorldModel.getIsHaveTeam()) {
                        SceneManager.runSceneBefore(SceneOperateEnums.WATCH_WORLD_BATTLE);
                        Utils.showErrorCode(data.state);
                    }
                    return;
                }
                BattleProxy.send_C2S_WAR_REENTRY_BATTLE(data.battleId);
                WorldModel.setCurWatchTeamId(data.playerId, data.teamId);
                break;
            }

            case ProtoDef.S2C_GET_MAP_EVENT_DATA: {
                let data = body as gameProto.S2C_GET_MAP_EVENT_DATA;
                WorldModel.parseEventList(data.mapEventData, false, true);

                break;
            }
            case ProtoDef.S2C_CITY_WAR_OUT: {
                let data = body as gameProto.S2C_CITY_WAR_OUT
                if (data.state == 0 && WorldModel.getCityWarInfo() && WorldModel.getCityWarInfo().cityId == data.cityId) {
                    WorldModel.cleanCityWarInfo();
                }
                break;
            }

            case ProtoDef.S2C_VISIT_DATA_REFRESH: {
                let data = body as gameProto.S2C_VISIT_DATA_REFRESH;
                WorldModel.updateVisitEvent(data.visitEventData);
                break;
            }
            case ProtoDef.S2C_VISIT_CD_SPEED: {
                let data = body as gameProto.S2C_VISIT_CD_SPEED;
                WorldModel.updateVisitEvent(data.visitEventData);
                break;
            }
            case ProtoDef.S2C_WORLDMAP_EVENT_WAR_OVER: {
                let data = body as gameProto.S2C_WORLDMAP_EVENT_WAR_OVER;

                //结算
                FightResponseUtil.addResultCache(notification);
                break;
            }
            case ProtoDef.S2C_MILITARYMERITS_REWARD_INFO: {
                let data = body as gameProto.S2C_MILITARYMERITS_REWARD_INFO;
                WorldModel.updateExploitAward(data.receivedIds)
                break;
            }
            case ProtoDef.S2C_MILITARYMERITS_REWARD_RECEIVE: {
                let data = body as gameProto.IS2C_MILITARYMERITS_REWARD_RECEIVE;
                if (data.errorCode == 0) {
                    WorldModel.updateExploitAward([data.id])
                } else {
                    EffectUtils.showTips(GCode(CLEnum.WOR_BAT_GET_FAL))
                }
                break;
            }
            case ProtoDef.S2C_CITY_WAR_SINGLE_OVER: {
                // //单场战斗完成通知
                // let cityWarInfo = WorldModel.getCityWarInfo();
                // let cityId = cityWarInfo.cityId;
                // WorldProxy.send_C2S_CITY_WAR_MYTEAM(cityId);
                break;
            }

            case ProtoDef.S2C_CITY_WAR_SETTLEMENT: {
                // //国战总结算  
                let ret = WorldModel.updateSiegeResult(body);
                notification.setBody(ret);
                com_main.EventMgr.dispatchEvent(BattleEvent.BATTLE_SIEGE_END, { result: ret });
                break;

            }

            case ProtoDef.S2C_CITY_WAR_CONFRONTATION_LIST: {
                WorldModel.setSiegeList(body);
                break;
            }


            case ProtoDef.S2C_CITY_WAR_DMG_RANK: {
                WorldModel.initSiegeKill(body);
                break;
            }
            // default:
            //     break;
        }

        AGame.ServiceBuilder.notifyView(notification);
    }


    /**请求世界地图数据 */
    public static send_CITY_BATTLE_LOAD_WORLD_MAP() {
        let data = AGame.ServiceBuilder.newClazz(ProtoDef.CITY_BATTLE_LOAD_WORLD_MAP);

        if (WorldProxy.m_pVersion != null)
            data.version = WorldProxy.m_pVersion;

        AGame.ServiceBuilder.sendMessage(data);
    }

    /**请求世界事件 */
    // public static send_CITY_BATTLE_WORLD_AFFAIRS(type: WorldEventType) {
    // 	if (RoleData.countryId == 0) return;

    // 	let data = AGame.ServiceBuilder.newClazz(ProtoDef.CITY_BATTLE_WORLD_AFFAIRS);
    // 	data.type = type;

    // 	AGame.ServiceBuilder.sendMessage(data);
    // }




    /**获取队伍列表队列 */
    public static C2S_TEAMMOVE_LIST(ids: gameProto.ITeamValueKey[]) {
        let data: gameProto.C2S_TEAMMOVE_LIST = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_TEAMMOVE_LIST);
        data.teamValueKey = ids;
        if (ids.length == 0) {
            //进入场景请求队伍列表
            AGame.ServiceBuilder.sendMessage(data, null, null, true);
        } else {
            //普通同步
            AGame.ServiceBuilder.sendMessage(data);
        }
    }

    /**部队前往 */
    public static C2S_TEAMMOVE_TO(teamMoveData: gameProto.ITeamMoveData[], cityId?: number) {
        let data: gameProto.C2S_TEAMMOVE_TO = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_TEAMMOVE_TO);
        data.teamMoveData = teamMoveData;
        data.cityId = cityId;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
    * 请求部队加速
    * @static
    * @param  {number} aid 部队id
    * @param  {number} ty 类型(1:25，2:50)
    * @return void type 1为道具加速 2为元宝加速
    * @memberof WorldProxy
    */
    public static C2S_TEAMMOVE_QUICKEN(teamId: number, itemid: number, type: number = 1) {
        let data: gameProto.C2S_TEAMMOVE_QUICKEN = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_TEAMMOVE_QUICKEN);
        data.teamId = teamId,
            data.itemId = itemid;
        data.type = type;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**
     * 请求部队召回
     * @static
     * @param  {number} aid 部队id
     * @return void
     * @memberof WorldProxy
     */
    public static C2S_TEAMMOVE_RETURN(teamId: number) {
        let data: gameProto.C2S_TEAMMOVE_RETURN = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_TEAMMOVE_RETURN);
        data.teamId = teamId,
            data.itemId = PropEnum.WORLE_MOVE_BACK;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**事件操作 */
    public static C2S_WORLDMAP_EVENT_ACT(eventCoordinatesId: number, eventDataId: number, teamId: number, cityId?: number) {
        let data: gameProto.C2S_WORLDMAP_EVENT_ACT = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_WORLDMAP_EVENT_ACT);
        data.eventDataId = eventDataId;
        data.eventCoordinatesId = eventCoordinatesId;
        data.teamId = teamId;
        data.cityId = cityId;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**采集加速 */
    public static C2S_WORLDMAP_EVENT_COLLECTION_QUICKEN(eventCoordinatesId: number, itemId: number, count: number) {
        let data: gameProto.C2S_WORLDMAP_EVENT_COLLECTION_QUICKEN = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_WORLDMAP_EVENT_COLLECTION_QUICKEN);
        data.eventCoordinatesId = eventCoordinatesId;
        data.itemId = itemId;
        data.count = count;
        // data.cityId = cityId;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**事件拜访 */
    public static C2S_GENERAL_VISIT(gid: number, cid: number) {
        let data: gameProto.C2S_GENERAL_VISIT = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_GENERAL_VISIT);
        data.generalId = gid,
            data.cityId = cid,
            AGame.ServiceBuilder.sendMessage(data);
    }
    /**请求国战已领取的奖励数据 */
    public static C2S_MILITARYMERITS_REWARD_INFO() {
        let data: gameProto.C2S_MILITARYMERITS_REWARD_INFO = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_MILITARYMERITS_REWARD_INFO);
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
     * 请求已领取奖励数据
     */
    public static C2S_MILITARYMERITS_REWARD_RECEIVE(id: number) {
        let data: gameProto.C2S_MILITARYMERITS_REWARD_RECEIVE = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_MILITARYMERITS_REWARD_RECEIVE);
        data.id = id;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
 * 请求攻击事件列表
 * @static
 * @return void
 * @memberof WorldProxy
 */
    public static send_WORLD_ATTACK_EVENT_LIST() {
        // let data = AGame.ServiceBuilder.newClazz(ProtoDef.WORLD_ATTACK_EVENT_LIST);
        // AGame.ServiceBuilder.sendMessage(data);
    }

    /**
     * 请求战场id
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_WORLD_GET_BATTLE_ID(id: number) {
        // let data = AGame.ServiceBuilder.newClazz(ProtoDef.WORLD_GET_BATTLE_ID);
        // data.id = id;
        // AGame.ServiceBuilder.sendMessage(data);
    }


    public static send_CITY_BATTLE_EXIT_WORLD_MAP() {
        let data = AGame.ServiceBuilder.newClazz(ProtoDef.CITY_BATTLE_EXIT_WORLD_MAP);
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
     * 请求警报信息
     */
    public static C2S_WORLDMAP_INFORMATION(countryId: number) {
        let data: gameProto.C2S_WORLDMAP_INFORMATION = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_WORLDMAP_INFORMATION);
        data.countryId = countryId;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
     * 请求事件点刷新
     * 
     */
    public static C2S_GET_MAP_EVENT_DATA(...eventCoordinatesId: number[]) {
        let data: gameProto.C2S_GET_MAP_EVENT_DATA = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_GET_MAP_EVENT_DATA);
        data.eventCoordinatesId = eventCoordinatesId;
        AGame.ServiceBuilder.sendMessage(data);
        delete WorldModel.m_pResRefEventMap[eventCoordinatesId[0]];
    }
    /**
     * 刷新武将显示
     */
    public static C2S_VISIT_DATA_REFRESH(cityId: number) {
        let data: gameProto.C2S_VISIT_DATA_REFRESH = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_VISIT_DATA_REFRESH);
        data.cityId = cityId;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**
  * 解锁城池
  */
    public static C2S_UNLOCK_CITY(cityId: number, teamId?: number) {
        let data: gameProto.C2S_UNLOCK_CITY = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_UNLOCK_CITY);
        data.cityId = cityId;
        data.teamId = teamId;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
 * 次数购买
 */
    public static C2S_MAP_EVENT_BUY(type: number) {
        let data: gameProto.C2S_MAP_EVENT_BUY = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_MAP_EVENT_BUY);
        data.type = type;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
* 刷新加速
*/
    public static C2S_VISIT_CD_SPEED(cityId: number, gold: boolean, itemId: number, itemCout: number) {
        let data: gameProto.C2S_VISIT_CD_SPEED = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_VISIT_CD_SPEED);
        data.cityId = cityId;
        data.gold = gold;
        data.itemId = itemId;
        data.itemCount = itemCout;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**查看城池驻军信息 */
    public static C2S_CITY_ITEM_INFO(cityId: number) {
        let data: gameProto.C2S_CITY_ITEM_INFO = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_ITEM_INFO);
        data.cityId = cityId;
        AGame.ServiceBuilder.sendMessage(data);
    }
    /**
     * 攻城战所有信息
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_WORLD_SIEGE_LIST() {
        // let data = AGame.ServiceBuilder.newClazz(ProtoDef.WORLD_SIEGE_LIST);
        // AGame.ServiceBuilder.sendMessage(data);
    }


    /**
     * 攻城排行
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_C2S_CITY_WAR_DMG_RANK(cid: number) {
        let data = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WAR_DMG_RANK);
        data.cityId = cid;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**
     * 进入城市战场
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_C2S_CITY_WAR_GO(cid: number) {
        let data = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WAR_GO);
        data.cityId = cid;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**
     * 根据城市ID，获取我攻击的所有队伍
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_C2S_CITY_WAR_MYTEAM(cid: number) {
        let data = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WAR_MYTEAM);
        data.cityId = cid;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**
     * 获取为打仗的队伍数据
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_C2S_CITY_WAR_TEAM(cid: number, teamId: number) {
        let data: gameProto.C2S_CITY_WAR_TEAM = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WAR_TEAM);
        data.cityId = cid;
        data.teamId = teamId;
        AGame.ServiceBuilder.sendMessage(data);
    }


    /**
     * 退出战场
     * @static
     * @return void
     * @memberof WorldProxy
     */
    public static send_C2S_CITY_WAR_OUT(cid: number) {
        let data: gameProto.C2S_CITY_WAR_OUT = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WAR_OUT);
        data.cityId = cid;
        AGame.ServiceBuilder.sendMessage(data);
    }

    /**
     * 国战对战列表
     * @static
     * @return cid 城池id
     * @memberof WorldProxy
     */
    public static send_C2S_CITY_WAR_CONFRONTATION_LIST(cid: number) {
        let data: gameProto.C2S_CITY_WAR_CONFRONTATION_LIST = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WAR_CONFRONTATION_LIST);
        data.cityId = cid;
        data.page = 0;
        AGame.ServiceBuilder.sendMessage(data);
    }

    public static send_C2S_CITY_WATCH_WAR_TEAM(cid: number, playerId: number, teamId: number) {
        let data: gameProto.C2S_CITY_WATCH_WAR_TEAM = AGame.ServiceBuilder.newClazz(ProtoDef.C2S_CITY_WATCH_WAR_TEAM);
        data.cityId = cid;
        data.playerId = playerId;
        data.teamId = teamId;
        AGame.ServiceBuilder.sendMessage(data);
    }




}