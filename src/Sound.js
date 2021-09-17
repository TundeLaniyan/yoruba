class SoundClass {
    #audio = new Audio();
    url = "";
    stop() {
        this.#audio.pause();
        this.#audio.currentTime = 0;
    }
    start(url) {
        this.stop();
        this.#audio = new Audio(url);
        this.url = url;
        this.#audio.play();
    }
}

const Sound = new SoundClass();

export default Sound;