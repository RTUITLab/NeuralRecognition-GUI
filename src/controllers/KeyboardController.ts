import ControlEvents from "./ControlEvents";
import IController from "./IController";

const KeyboardController: IController = {
    enable: () => {
        var socket = new WebSocket("ws://localhost:9999");
        socket.onopen = function()
        {
            socket.send("WaitingForCommand");
        };
        socket.onclose = function(event)
        {
            if (event.wasClean)
            {
                alert('Соединение закрыто чисто');
            } else {
                alert('Обрыв соединения');
            }
            alert('Код: ' + event.code + ' причина: ' + event.reason);
        };

        socket.onmessage = function(event)
        {
            console.log(event.data)
            if (event.data === 'Up') {
                ControlEvents.redUp();
                /*ControlEvents.yellowLeft();
                ControlEvents.blueDown();
                ControlEvents.greenRight();*/
            }
            if (event.data === 'Left') {
                ControlEvents.yellowLeft();
            }
            if (event.data === 'Down') {
                ControlEvents.blueDown();
            }
            if (event.data === 'Right') {
                ControlEvents.greenRight();
            }
            socket.send("WaitingForCommand");
        };
    }
}

export default KeyboardController;