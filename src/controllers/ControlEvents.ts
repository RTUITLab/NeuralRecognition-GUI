const ControlEvents = {
    redUp: () => {
        document.dispatchEvent(new Event("redUp", {bubbles: true}));
    },
    greenRight: () => {
        document.dispatchEvent(new Event("greenRight", {bubbles: true}));
    },
    blueDown: () => {
        document.dispatchEvent(new Event("blueDown", {bubbles: true}));
    },
    yellowLeft: () => {
        document.dispatchEvent(new Event("yellowLeft", {bubbles: true}));
    }
}

export default ControlEvents;
