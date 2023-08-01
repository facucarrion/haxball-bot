(function () {
  'use strict';

  var ROLES={PLAYER:0,ADMIN:1,MASTER:2};var NOTIFICATION={NONE:0,CHAT:1,SPECIAL:2};var FONT_WEIGHT={NORMAL:null,BOLD:"bold",ITALIC:"italic",SMALL:"small",SMALL_BOLD:"small-bold",SMALL_ITALIC:"small-italic"};var COLORS={RED:16724787,BLUE:5757183,GRAY:11382189,GREEN:9174822};var TEAMS={SPECTATOR:{value:0,symbol:"\uD83D\uDC41\uFE0F",color:COLORS.GRAY},RED:{value:1,symbol:"\uD83D\uDD34",color:COLORS.RED},BLUE:{value:2,symbol:"\uD83D\uDD35",color:COLORS.BLUE}};

  var VARIANTS={NORMAL:{color:COLORS.GRAY,style:FONT_WEIGHT.NORMAL,sound:NOTIFICATION.CHAT,msgBuilder:function msgBuilder(msg){return msg}},WELCOME:{color:COLORS.GRAY,style:FONT_WEIGHT.BOLD,sound:NOTIFICATION.CHAT,msgBuilder:function msgBuilder(msg){return "\uD83D\uDC4B | ".concat(msg)}},DANGER:{color:COLORS.RED,style:FONT_WEIGHT.BOLD,sound:NOTIFICATION.SPECIAL,msgBuilder:function msgBuilder(msg){return "\uD83D\uDC62 | ".concat(msg)}},ERROR:{color:COLORS.RED,style:FONT_WEIGHT.BOLD,sound:NOTIFICATION.SPECIAL,msgBuilder:function msgBuilder(msg){return "\u274C | ERROR: ".concat(msg)}}};function sendCustomAnnouncement(_ref){var msg=_ref.msg,_ref$target=_ref.target,target=_ref$target===void 0?null:_ref$target,_ref$variant=_ref.variant,variant=_ref$variant===void 0?"NORMAL":_ref$variant,room=_ref.room;var _VARIANTS$variant=VARIANTS[variant],_VARIANTS$variant$col=_VARIANTS$variant.color,color=_VARIANTS$variant$col===void 0?COLORS.GRAY:_VARIANTS$variant$col,_VARIANTS$variant$sty=_VARIANTS$variant.style,style=_VARIANTS$variant$sty===void 0?FONT_WEIGHT.NORMAL:_VARIANTS$variant$sty,_VARIANTS$variant$sou=_VARIANTS$variant.sound,sound=_VARIANTS$variant$sou===void 0?NOTIFICATION.CHAT:_VARIANTS$variant$sou,_VARIANTS$variant$msg=_VARIANTS$variant.msgBuilder,msgBuilder=_VARIANTS$variant$msg===void 0?function(msg){return msg}:_VARIANTS$variant$msg;room.sendAnnouncement(msgBuilder(msg),target,color,style,sound);}

  var roomConfig={roomName:"V\xE9nganse a la Verga",playerName:"\uD83E\uDD42 Facu Bot","public":false,password:"123",maxPlayers:12,token:"thr1.AAAAAGTHv-3imYQgKYEC8g.rguSqoIz84Y",noPlayer:true};var adminPassword=Math.floor(Math.random()*10000).toString();function initialConfig(room,_ref){_ref.scoreLimit;_ref.timeLimit;room.setScoreLimit(5);room.setTimeLimit(10);room.setTeamsLock(true);room.setKickRateLimit(6,0,0);}

  var COMMAND_ERRORS={NOT_FOUND:"El comando no existe.",NOT_ALLOWED:"No tienes permisos para ejecutar este comando."};var ADMIN_COMMAND_ERRORS={INCORRECT_PASSWORD:"La contrase\xF1a es incorrecta."};

  function instantRestart(_ref){var room=_ref.extras.room;room.stopGame();setTimeout(function(){room.startGame();},10);return {success:true,error:null}}

  var claimAdmCommand=function claimAdmCommand(_ref){var player=_ref.player,body=_ref.body,extras=_ref.extras;var response={success:false,error:null};if(body!==extras.adminPassword){response.error=ADMIN_COMMAND_ERRORS.INCORRECT_PASSWORD;return response}extras.room.setPlayerAdmin(player.id,true);extras.room.sendAnnouncement("El jugador ".concat(player.name," ha reclamado el rol de administrador de la sala."),null,65280);return response};var autokick=function autokick(_ref2){var player=_ref2.player,extras=_ref2.extras;extras.room.kickPlayer(player.id,"Chau pa! Cuidate.",false);return {success:false,error:null}};

  var COMMANDS=[{name:"claim-admin",aliases:["adm","god"],roles:[ROLES.PLAYER],desc:"Reclama el rol de administrador de la sala.","function":claimAdmCommand},{name:"autokick",aliases:["bb","nv"],roles:[ROLES.PLAYER],desc:"Autokick","function":autokick},{name:"restart",aliases:["rr"],roles:[ROLES.ADMIN],desc:"Reinicia la sala.","function":instantRestart}];var findCommand=function findCommand(command){return COMMANDS.find(function(item){return item.name===command||item.aliases.includes(command)})};var isCommand=function isCommand(msg,isAdmin){var response={isCommand:false,command:null,error:null};if(msg[0]!=="!")return response;response.isCommand=true;response.command=msg.split(" ")[0].substring(1);var selectedCommand=findCommand(response.command);if(!selectedCommand)response.error=COMMAND_ERRORS.NOT_FOUND;console.log(selectedCommand);console.log(selectedCommand.roles.includes(ROLES.ADMIN));console.log(!isAdmin);if(selectedCommand.roles.includes(ROLES.ADMIN)&&!isAdmin)response.error=COMMAND_ERRORS.NOT_ALLOWED;return response};var executeCommand=function executeCommand(_ref){var command=_ref.command,player=_ref.player,body=_ref.body,_ref$extras=_ref.extras,extras=_ref$extras===void 0?{}:_ref$extras;return findCommand(command)["function"]({player:player,body:body,extras:extras})};

  function handleOnPLayerChat(_ref){var player=_ref.player,message=_ref.message,_ref$extras=_ref.extras,adminPassword=_ref$extras.adminPassword,room=_ref$extras.room;var isCommandResult=isCommand(message,player.admin);if(isCommandResult.isCommand){if(isCommandResult.error){console.log(isCommandResult.error);sendCustomAnnouncement({msg:isCommandResult.error,variant:"ERROR",target:player.id,room:room});}else {var executeCommandResult=executeCommand({command:isCommandResult.command,player:player,body:message.split(" ").slice(1).join(" "),extras:{room:room,adminPassword:adminPassword}});if(executeCommandResult.error){sendCustomAnnouncement({msg:executeCommandResult.error,variant:"ERROR",target:player.id,room:room});}}}else {var teamData=Object.values(TEAMS).find(function(team){return team.value===player.team});room.sendAnnouncement("[".concat(teamData.symbol,"] ").concat(player.name,": ").concat(message),FONT_WEIGHT.ITALIC,teamData.color,1);}return false}

  console.log("Admin password: ".concat(adminPassword));var room=HBInit(roomConfig);initialConfig(room,{scoreLimit:5,timeLimit:10});room.onPlayerJoin=function(player){sendCustomAnnouncement({msg:"Bienvenido ".concat(player.name,"!"),target:player.id,variant:"WELCOME",room:room});};room.onPlayerTeamChange=function(changedPlayer,byPlayer){};room.onPlayerLeave=function(player){return false};room.onPlayerKicked=function(kickedPlayer,reason,ban,byPlayer){if(!byPlayer)return false;sendCustomAnnouncement({msg:"El jugador ".concat(kickedPlayer.name," ha sido ").concat(ban?"BANEADO":"KICKEADO"," por ").concat(byPlayer.name,"."),variant:"DANGER",room:room});};room.onPlayerChat=function(player,message){return handleOnPLayerChat({player:player,message:message,extras:{room:room,adminPassword:adminPassword}})};room.onPlayerActivity=function(player){};room.onPlayerBallKick=function(player){};room.onGameStart=function(byPlayer){};room.onGameStop=function(byPlayer){};room.onGamePause=function(byPlayer){};room.onGameUnpause=function(byPlayer){};room.onTeamGoal=function(team){};room.onPositionsReset=function(){};room.onRoomLink=function(url){};room.onPlayerAdminChange=function(changedPlayer,byPlayer){};room.onStadiumChange=function(newStadiumName,byPlayer){};room.onGameTick=function(){};

})();
