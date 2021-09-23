import Sound from "react-native-sound";
Sound.setCategory("Playback");

const startSounds = [new Sound("start.mp3", Sound.MAIN_BUNDLE)];

const goalRedSounds = [
  new Sound("goal-human1.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-human2.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human3.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human4.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human5.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-human6.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-human7.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-human8.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human9.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human10.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-human11.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-human12.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-human13.mp3", Sound.MAIN_BUNDLE)
  new Sound("phrases_2019/goal/goal_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_3.mp3", Sound.MAIN_BUNDLE)
];
const goalBlueSounds = [
  new Sound("goal-robot1.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot2.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-robot3.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot4.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot5.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot6.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot7.mp3", Sound.MAIN_BUNDLE),
  // new Sound("goal-robot8.mp3", Sound.MAIN_BUNDLE),
  new Sound("goal-robot9.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_3.mp3", Sound.MAIN_BUNDLE)
];

const ownGoalRedSounds = [
  // new Sound("own-human1.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human2.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human3.mp3", Sound.MAIN_BUNDLE),
  // new Sound("own-human4.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human5.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-human6.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_3.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_4.mp3", Sound.MAIN_BUNDLE)
];

const ownGoalBlueSounds = [
  new Sound("own-robot1.mp3", Sound.MAIN_BUNDLE),
  // new Sound("own-robot2.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot3.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot4.mp3", Sound.MAIN_BUNDLE),
  // new Sound("own-robot5.mp3", Sound.MAIN_BUNDLE),
  new Sound("own-robot6.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_3.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_4.mp3", Sound.MAIN_BUNDLE)
];

const finishRedLoseSounds = [
  new Sound("finish-human-lose1.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose2.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-human-lose3.mp3", Sound.MAIN_BUNDLE)
];

const finishBlueLoseSounds = [
  new Sound("finish-robot-lose1.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-robot-lose2.mp3", Sound.MAIN_BUNDLE),
  new Sound("finish-robot-lose3.mp3", Sound.MAIN_BUNDLE)
  // new Sound("finish-robot-lose4.mp3", Sound.MAIN_BUNDLE)
];

const randomSounds = [
  new Sound("phrases_2019/random/random_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_3.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_4.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_5.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_6.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_7.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_8.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_9.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_10.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_11.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/random/random_12.mp3", Sound.MAIN_BUNDLE)
];

function getRandomIndex(length: number) {
  return Math.round(Math.random() * 100) % length;
}

const notSelectedItemsByScope = new Map();

function getRandomItem(array: any, { scope = "" }) {
  let notSelectedItems = notSelectedItemsByScope.get(scope);
  if (!notSelectedItems) {
    notSelectedItems = [...array];
  }
  const randomIndex = getRandomIndex(notSelectedItems.length);
  const randomItem = notSelectedItems[randomIndex];
  notSelectedItems.splice(randomIndex, 1);
  if (notSelectedItems.length === 0) {
    notSelectedItems = array;
  }
  notSelectedItemsByScope.set(scope, notSelectedItems);
  return randomItem;
}

class Sounds {
  start() {
    getRandomItem(startSounds, { scope: "START" }).play();
  }

  finishRedLose() {
    getRandomItem(finishRedLoseSounds, { scope: "FINISH_RED_LOSE" }).play();
  }

  finishBlueLose() {
    getRandomItem(finishBlueLoseSounds, { scope: "FINISH_BLUE_LOSE" }).play();
  }

  goalRed() {
    getRandomItem(goalRedSounds, { scope: "GOAL_RED" }).play();
  }

  goalBlue() {
    getRandomItem(goalBlueSounds, { scope: "GOAL_BLUE" }).play();
  }

  ownGoalRed() {
    getRandomItem(ownGoalRedSounds, { scope: "OWN_GOAL_RED" }).play();
  }

  ownGoalBlue() {
    getRandomItem(ownGoalBlueSounds, { scope: "OWN_GOAL_BLUE" }).play();
  }

  random() {
    getRandomItem(randomSounds, { scope: "RANDOM" }).play();
  }
}

export default new Sounds();
