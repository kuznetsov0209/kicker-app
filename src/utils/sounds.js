import Sound from "react-native-sound";

const startSound = new Sound(
  "on_press_start_sound.mp3",
  Sound.MAIN_BUNDLE,
  error => {
    if (error) {
      console.log("failed to load the sound", error);
      return;
    }
  }
);
const goalSound = new Sound("on_press_goal.mp3", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
});
const ownGoalSound = new Sound("on_press_own.mp3", Sound.MAIN_BUNDLE, error => {
  if (error) {
    console.log("failed to load the sound", error);
    return;
  }
});
const playStartSound = () => {
  startSound.play();
};
const playGoalSound = () => {
  goalSound.play();
};
const playOwnSound = () => {
  ownGoalSound.play();
};

export { playStartSound, playGoalSound, playOwnSound };
