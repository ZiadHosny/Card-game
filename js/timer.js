function timer() {
    interval = setInterval(() => {
        sec--;
        if (sec < 0) {
            min--;
            sec = 59;
        }

        if (sec < 0 || min < 0) {
            gameOver();
            return;
        }
        timerDiv.innerHTML = '0' + min + ' : ' + (sec < 10 ? '0' + sec : sec);
    }, 1000);
}
