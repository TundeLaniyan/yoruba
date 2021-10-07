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
  async play(url) {
    this.stop();
    this.#audio = new Audio(url);
    this.url = url;
    const duration = await this.getDuration(this.#audio);
    await this.playDelay(duration);
  }
  getDuration(audio) {
    return new Promise(function (resolve) {
      audio.addEventListener("loadedmetadata", function () {
        resolve(audio.duration * 1000);
      });
    });
  }
  playDelay(delay) {
    return new Promise((resolve) => {
      this.#audio.play();
      setTimeout(() => resolve(), delay);
    });
  }
}

const Sound = new SoundClass();

export default Sound;
