import ControlEvents from "./ControlEvents";
import IController from "./IController";

const KeyboardController: IController = {
    enable: () => {
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') {
                ControlEvents.redUp();
                /*ControlEvents.yellowLeft();
                ControlEvents.blueDown();
                ControlEvents.greenRight();*/
            }
            if (e.key === 'ArrowLeft') {
                ControlEvents.yellowLeft();
            }
            if (e.key === 'ArrowDown') {
                ControlEvents.blueDown();
            }
            if (e.key === 'ArrowRight') {
                ControlEvents.greenRight();
            }
        })
    }
}

export default KeyboardController;