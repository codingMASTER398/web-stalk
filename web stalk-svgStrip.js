javascript:
    function closewindow() {
        document.getElementById('wsDiv').remove()
    };
//create DOM object first to not throw errors
[...document.querySelectorAll("div")].forEach((e) => {
    e.style.filter = "blur(1.5rem)"
});
//haha svg go brrrrrrrrrrrrrrrrrrrr
document.body.style = "margin: 0; height: 100%; overflow: hidden";
var wsLoading = document.createElement('div');
wsLoading.id = "wsLoading";
wsLoading.style = `position: fixed;left: 40%;top: 30%;z-index: 2147483646;background-color: rgb(37, 37, 37);width: 17%;border-radius: 25px;`
wsLoading.innerHTML = `
 <h1 style="text-align: center; color:white;">web stalk</h1><br><p style="text-align: center; color:white;">snowlord7 for gui code,\nsynapse x (same method for stream sniper),\nand lemons</p></div>`
document.getElementsByTagName('body')[0].appendChild(wsLoading);
setTimeout(() => {
    document.body.style = "";
    document.getElementById('wsLoading').remove();
    [...document.querySelectorAll("div")].forEach((e) => {
        e.style.filter = ""
    })
    var wsDiv = document.createElement('div');
    wsDiv.id = 'wsDiv';
    wsDiv.style = 'font-family: \'Source Sans Pro\', sans-serif;border: 3px solid rgb(37, 37, 37); position: absolute; display: block; left: 0px; background-color: #101211; z-index: 2147483647; top: 0;';
    wsDiv.innerHTML = `<style>input::placeholder {color: #fff;} </style><link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro&display=swap" rel="stylesheet">
            <div id="wsGui" style="background-color: rgb(37, 37, 37); cursor: move;"><button id="wsClose" style="color:white;position:absolute;top: 6px;text-align: right;display: inline-block;background-color:transparent;font-family:Arial;font-size: 30px;text-decoration:none;border: none;right: 0px;" onclick="closewindow()">X</button><h3 style=" color: white; margin: 0 auto; text-align: center">web stalk</h3></div><br><center><p style="color:white; ">username / user id</p><input type="text" id="wsUser" style="margin:10px; text-align: center; color: white; background-color: #323232; font-size: 25px;" placeholder="enter it here"><br><br><p style="color:white; ">place id:</p><input type="text" style="text-align: center; color: white; background-color: #323232; font-size: 25px" id="wsPlaceId" placeholder="enter it here, dude"><br><br>
            <button id="wsStartButton" style="background-color: #161616;border: none;width: 95%;padding: 10px;color:white;">start</button></center>`;
    document.getElementsByTagName('body')[0].appendChild(wsDiv);
    dragElement(document.getElementById(("wsDiv")));
    var webStalk = new Object()
    webStalk.active = false;
    webStalk.url = "https://www.roblox.com/headshot-thumbnail/image?userId=wsIdHERE&width=48&height=48";
    webStalk.cancelled = false;
    var wsStartButton = document.getElementById('wsStartButton');

    function check() {
        if (webStalk.active) {
            wsStartButton.innerText = 'cancelled.'
            setTimeout(function() {
                wsStartButton.innerText = 'cancelled.';
                webStalk.cancelled = true;
                webStalk.active = false;
            }, 250);
            setTimeout(function() {
                wsStartButton.innerText = 'start'
            }, 1000);
            return;
        };
        webStalk.active = true;
        webStalk.cancelled = false;
        var wsUser = document.getElementById('wsUser').value,
            wsPlaceId = document.getElementById('wsPlaceId').value;
        var wsPage = 0,
            wsHeadshotUrl = "";
        if (isNaN(Number(document.getElementById('wsUser').value))) {
            fetch('https://api.roblox.com/users/get-by-username?username=' + wsUser)
                .then((resp) => resp.json())
                .then((data) => {
                    wsHeadshotUrl = webStalk.url.replace('wsIdHERE', data.Id)
                    fetch(wsHeadshotUrl)
                        .then(function(resp) {
                            console.log(resp)
                            wsHeadshotUrl = resp['url'];
                            a()
                            console.log(wsHeadshotUrl)
                        })

                })
        } else {
            wsHeadshotUrl = webStalk.url.replace('wsIdHERE', wsUser)
            fetch(wsHeadshotUrl)
                .then(function(resp) {
                    wsHeadshotUrl = resp['url'];
                    a()
                })
        }

        function a() {
            if (webStalk.cancelled && !webStalk.active) {
                webStalk.cancelled = false;
                return webStalk.active = false;
            }
            fetch(`https://www.roblox.com/games/getgameinstancesjson?placeId=${wsPlaceId}&startindex=${wsPage}`)
                .then((resp) => resp.json())
                .then((data) => {
                    wsPage += 10;
                    if (wsPage > data.TotalCollectionSize) {
                        wsStartButton.innerText = 'couldn\'t find them, (vip?)';
                        setTimeout(function() {
                            wsStartButton.innerText = 'start'
                        }, 5000);
                        return webStalk.active = false;
                    };
                    wsStartButton.innerText = "scanned " + wsPage + '/' + data.TotalCollectionSize + ' servers';
                    for (let i = 0; i < data.Collection.length; i++) {
                        let server = data.Collection[i];
                        for (let j = 0; j < server.CurrentPlayers.length; j++) {
                            let player = server.CurrentPlayers[j];
                            if (player.Thumbnail.Url == wsHeadshotUrl) {
                                if (server.Capacity == server.CurrentPlayers.length) {
                                    wsStartButton.innerText = 'complete. (it\'s full)';
                                    setTimeout(function() {
                                        wsStartButton.innerText = 'start'
                                    }, 5000);
                                    eval(server.JoinScript);
                                    webStalk.active = false
                                    return true;
                                }
                                wsStartButton.innerText = 'complete.';
                                setTimeout(function() {
                                    wsStartButton.innerText = 'start'
                                }, 5000);
                                eval(server['JoinScript']);
                                webStalk.active = false
                                return true;
                            }
                        }
                    }
                    a()
                });
        }
    }



    if (Number(window.location.pathname.split('/')[2])) {
        document.getElementById('wsPlaceId').value = Number(window.location.pathname.split('/')[2]);
    }

    function dragElement(elmnt) {
        var pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById("wsGui")) {
            document.getElementById("wsGui").onmousedown = dragMouseDown
        } else {
            elmnt.onmousedown = dragMouseDown
        }

        function dragMouseDown(e) {
            e = e || window.event;
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag
        }

        function elementDrag(e) {
            e = e || window.event;
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px"
        }

        function closeDragElement() {
            document.onmouseup = null;
            document.onmousemove = null
        }
    }
    if (wsStartButton.addEventListener) {
        wsStartButton.addEventListener("click", check, false)
    } else if (wsStartButton.attachEvent) {
        wsStartButton.attachEvent('onclick', check)
    }
    var cspbypass1 = document.getElementById("wsClose");
    if (cspbypass1.addEventListener) {
        cspbypass1.addEventListener("click", closewindow, false)
    } else if (cspbypass1.attachEvent) {
        cspbypass1.attachEvent('onclick', closewindow)
    }
}, 5000)
