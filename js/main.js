let changeNumbers = (number) => {
    let str = "";
    switch (number) {
        case 1:
            return (str = "first");
        case 2:
            return (str = "second");
        case 3:
            return (str = "third");
        case 4:
            return (str = "fourth");
        case 5:
            return (str = "fifth");
        case 6:
            return (str = "sixth");
        case 7:
            return (str = "seventh");
        case 8:
            return (str = "eighth");
    }
    return str;
};

const message = new SpeechSynthesisUtterance();

const speak = (text) => {
    console.log(text);
    message.text = text.trim();
    if (message.text !== "") {
        speechSynthesis.speak(message);
    }
};

$(".floor-number").on("click", async (e) => {
    let floor = +e.target.id;
    if (floor === elevator.currentFloor) {
        speak("You are on the current floor");
    }
    if (floor < elevator.currentFloor) {
        speak(
            `The doors are closing, we are descending on the ${changeNumbers(
                floor
            )} floor`
        );
    } else if (floor > elevator.currentFloor) {
        speak(
            `The doors are closing, we are ascending on the ${changeNumbers(
                floor
            )} floor`
        );
    }
    closeElev();
    await sleep(500);
    elevator.toFloor(floor);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let elevTop = 767;

let upElev = () => {
    elevTop -= 70;
    $(".closeElev img").css("top", `${elevTop}px`);
    $(".openElev img").css("top", `${elevTop}px`);
};

let downElev = () => {
    elevTop += 70;
    $(".closeElev img").css("top", `${elevTop}px`);
    $(".openElev img").css("top", `${elevTop}px`);
};

let openElev = () => {
    $(".closeElev img").css("display", "none");
    $(".openElev img").css("display", "block");
};

let closeElev = () => {
    $(".closeElev img").css("display", "block");
    $(".openElev img").css("display", "none");
};

let elevator = {
    currentFloor: 1,
    minFloor: 1,
    maxFloor: 8,
    printFloor() {
        $("#current-floor__span").html(`${this.currentFloor}`);
    },
    upOneFloor() {
        if (this.currentFloor < this.maxFloor) {
            this.currentFloor++;
            this.printFloor();
        } else {
            alert("Error");
        }
    },
    downOneFloor() {
        if (this.currentFloor > this.minFloor) {
            this.currentFloor--;
            this.printFloor();
        } else {
            alert("Error");
        }
    },
    async toFloor(getFloor) {
        while (this.currentFloor !== getFloor) {
            if (getFloor > this.currentFloor && getFloor <= this.maxFloor) {
                await sleep(1000);
                this.upOneFloor();
                upElev();
            } else if (
                getFloor < this.currentFloor &&
                getFloor >= this.minFloor
            ) {
                await sleep(1000);
                this.downOneFloor();
                downElev();
            } else {
                alert("Error");
            }
        }
        await sleep(1500);
        openElev();
        speak(
            `${changeNumbers(this.currentFloor)} floor. The doors are opening`
        );
    },
};
