export function getScore(response){
    if (typeof response !== 'function') {
        console.log("Need callback function on input")
        return 0
    }
    const req = new Request("https://h.548b.ru/rs.php?read");
    fetch(req).then((fetch_resp) => {
        if(fetch_resp.ok) {
            fetch_resp.text().then((resp_str)=>{
                if(isNaN(parseInt(resp_str))){
                    response(0)
                } else {
                    response(parseInt(resp_str))
                }
            })
        } else {
            response(0)
        }
    })
}
export function putScore(score){
    const req = new Request("https://h.548b.ru/rs.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: encodeURI("pass=P@ssw0rd&data=" + parseInt(score))
    });
    fetch(req)
}