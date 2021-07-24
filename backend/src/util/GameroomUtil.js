const GameroomModel = require("../models/Gameroom");
var current_num = 0;

//roomInfo라는 json에 roomtitle, 그리고
//userID에 개설자(User의 _id) 등을 넣어서 보냄
function addRoom(roomInfo,callback){
    console.log(roomInfo)
    initplayers = [roomInfo.user._id]

    const newRoom = new GameroomModel({
        roomIndex: current_num++,
        roomTitle: roomInfo.roomName,
        players: initplayers
    })
    newRoom.save((err,res) => {
        callback(res);
    });
}

function getAll(callback){
    GameroomModel.find({}, (err, res) =>{
        callback(res)
    });
}

function joinRoom(joinInfo, callback){
    const {roomId, playerId} = joinInfo;
    GameroomModel.findOne({_id: roomId}, (err,res) => {
        if(res.players.includes(playerId)){
            callback();
        }
        else{
            GameroomModel.findOneAndUpdate({_id: roomId}, {
                players: [...res.players, playerId]
            },
            (error) => {callback();});
        }
    })
}
function findCurrentRoom(playerId, callback){
    GameroomModel.find({}, (err,res) => {
        var currentRoom = res.filter(room => room.players.includes(playerId));
        callback(currentRoom._id);
    })
}
function exitRoom(exitInfo, callback){
    const {playerId} = exitInfo;

    GameroomModel.find({}, (err,res) => {
        var currentRoom = res.filter(room => room.players.includes(playerId));
        var afterplayers = currentRoom.players.filter((player) => (player !== playerId));
        if(currentRoom.players.includes(playerId)){
            GameroomModel.findOneAndUpdate({_id: currentRoom._id}, {
                players: afterplayers
            },
            (error) => {callback();});
        }
        else{
            console.log("현재 게임 방에 존재하지 않습니다.");
            callback();
        }
    })
    /*
    GameroomModel.findOne({_id: roomId}, (err, res) => {
        var afterplayers = res.players.filter((player) => (player !== playerId));
        console.log(afterplayers);
        if(res.players.includes(playerId)){
            GameroomModel.findOneAndUpdate({_id: roomId}, {
                players: afterplayers
            },
            (error) => {callback();});
        }
        else{
            console.log("현재 게임 방에 존재하지 않습니다.");
            callback();
        }
    })*/
}

//다른 파일에서 require로 불러와서 .addRoom 이런식으로 붙여서 사용 가능
module.exports = {
    addRoom,
    getAll,
    joinRoom,
    exitRoom,
    findCurrentRoom
};