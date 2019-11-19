import Sound from "react-native-sound";
Sound.setCategory("Playback");

const startSounds = [new Sound("start.mp3", Sound.MAIN_BUNDLE)];

const goalRedSounds = [
  new Sound("goal-human1.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human2.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human3.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human4.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human5.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human6.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human7.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human8.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human9.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human10.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human11.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human12.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human13.mp3", Sound.MAIN_BUNDLE)
];
const goalBlueSounds = [
  new Sound("goal-robot1.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot2.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot3.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot4.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot5.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot6.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot7.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot8.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot9.mp3", Sound.MAIN_BUNDLE)
];

const ownGoalRedSounds = [
  new Sound("own-human1.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human2.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human3.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human4.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human5.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human6.mp3", Sound.MAIN_BUNDLE)
];

const ownGoalBlueSounds = [
  new Sound("own-robot1.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot2.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot3.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot4.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot5.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot6.mp3", Sound.MAIN_BUNDLE)
];

const finishRedLoseSounds = [
  new Sound("finish-human-lose1.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose2.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose3.mp3", Sound.MAIN_BUNDLE)
];

const finishBlueLoseSounds = [
  new Sound("finish-human-lose1.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose2.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose3.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose4.mp3", Sound.MAIN_BUNDLE)
];

function getRandomIndex(length) {
  return Math.round(Math.random() * 100) % length;
}

class Sounds {
  start() {
    startSounds[getRandomIndex(startSounds.length)].play();
  }

  finishRedLose() {
    finishRedLoseSounds[getRandomIndex(finishRedLoseSounds.length)].play();
  }

  finishBlueLose() {
    finishBlueLoseSounds[getRandomIndex(finishBlueLoseSounds.length)].play();
  }

  goalRed() {
    goalRedSounds[getRandomIndex(goalRedSounds.length)].play();
  }

  goalBlue() {
    goalBlueSounds[getRandomIndex(goalBlueSounds.length)].play();
  }

  ownGoalRed() {
    ownGoalRedSounds[getRandomIndex(ownGoalRedSounds.length)].play();
  }

  ownGoalBlue() {
    ownGoalBlueSounds[getRandomIndex(ownGoalBlueSounds.length)].play();
  }
}

export default new Sounds();
