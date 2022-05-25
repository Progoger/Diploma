function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

export {getRandomInt, sleep}