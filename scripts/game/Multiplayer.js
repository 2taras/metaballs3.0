export default class Multiplayer {
    constructor(scene){
        this.scene = scene
        this.channel_amount = 1
        this.ws = new WebSocket("wss://g.548b.ru/wss")
        this.ws.addEventListener('message', this.receive.bind(this))
        setInterval(this.send_poll.bind(this), 500)
    }
    send_poll(){
        this.gen("ship")
    }
    receive(ws_inp){
        let ws_data = ws_inp.data
        if(typeof(this.pass) == "undefined"){
            this.pass = JSON.parse(ws_data).pass
            this.ws.send("connect globalmb")
            this.ws.send("binary")
            return
        }
        try{
            if(JSON.parse(ws_data).pass == this.pass){
                this.ws_internal_parser(JSON.parse(ws_data).data)
                return
            }
        }catch(e){}
        ws_data.arrayBuffer().then(this.recev_bin)
    }
    ws_internal_parser(data){
        if(Number.isInteger(parseInt(data))){
            this.channel_amount = parseInt(data);
        }
        if(Array.isArray(data)){
            console.log("Public channels");
            console.log(data);
        }
        if(data == "Ok"){
            console.log("Websocket receive ok");
        }
    }
    recev_bin(bin){
        let ar = new Float64Array(bin)
        if(ar[1] != window.user_id) this.pars_ar(ar)
    }
    pars_ar(ar){
        
    }
    gen(id){
        for (let obj of this.scene.objects){
            if(obj.id == id){
                this.ws.send(this.gen_ar(obj))
            }
        }
    }
    gen_ar(obj){
        let ar = new Float64Array(16)
        ar[0] = obj.num_id
        ar[1] = obj.user_id
        ar[2] = obj.object_id
        ar[3] = obj.position.x
        ar[4] = obj.position.y
        ar[5] = obj.velocity.x
        ar[6] = obj.velocity.y
        ar[7] = obj.acceleration.x
        ar[8] = obj.acceleration.y
        ar[9] = obj.rotation
        ar[10] = window.ship_skin
        return ar
    }
}