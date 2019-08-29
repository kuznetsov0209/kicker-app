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

const goalSounds = [
  new Sound("phrases_2019/goal/goal_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/goal/goal_3.mp3", Sound.MAIN_BUNDLE)
];

const ownGoalSounds = [
  new Sound("phrases_2019/own/own_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_3.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/own/own_4.mp3", Sound.MAIN_BUNDLE)
];

const helloPlayerSounds = [
  new Sound("phrases_2019/add_player/add_player_1.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/add_player/add_player_2.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/add_player/add_player_3.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/add_player/add_player_4.mp3", Sound.MAIN_BUNDLE),
  new Sound("phrases_2019/add_player/add_player_5.mp3", Sound.MAIN_BUNDLE)
];

const nameToSoundMappings = [
  {
    names: ["alexander", "александр"],
    files: ["phrases_2019/add_player/add_player_Alexander.mp3"]
  },
  {
    names: ["alexey", "алексей"],
    files: ["phrases_2019/add_player/add_player_Alexey.mp3"]
  },
  {
    names: ["andrey", "андрей"],
    files: ["phrases_2019/add_player/add_player_Andrey.mp3"]
  },
  {
    names: ["anastasia", "анастасия"],
    files: ["phrases_2019/add_player/add_player_Anastasia.mp3"]
  },
  {
    names: ["anna", "анна"],
    files: [
      "phrases_2019/add_player/add_player_Anna_1.mp3",
      "phrases_2019/add_player/add_player_Anna_2.mp3"
    ]
  },
  {
    names: ["anton", "антон"],
    files: [
      "phrases_2019/add_player/add_player_Anton_1.mp3",
      "phrases_2019/add_player/add_player_Anton_2.mp3"
    ]
  },
  {
    names: ["artem", "артем", "артём"],
    files: [
      "phrases_2019/add_player/add_player_Artem_1.mp3",
      "phrases_2019/add_player/add_player_Artem_2.mp3"
    ]
  },
  {
    names: ["daniil", "даниил"],
    files: ["phrases_2019/add_player/add_player_Daniil.mp3"]
  },
  {
    names: ["denis", "денис"],
    files: ["phrases_2019/add_player/add_player_Denis.mp3"]
  },
  {
    names: ["dmitriy", "дмитрий"],
    files: ["phrases_2019/add_player/add_player_Dmitriy.mp3"]
  },
  {
    names: ["egor", "егор"],
    files: [
      "phrases_2019/add_player/add_player_Egor_1.mp3",
      "phrases_2019/add_player/add_player_Egor_2.mp3"
    ]
  },
  {
    names: ["ekaterina", "екатерина"],
    files: ["phrases_2019/add_player/add_player_Ekaterina.mp3"]
  },
  {
    names: ["elena", "alena", "елена", "алена", "алёна"],
    files: ["phrases_2019/add_player/add_player_Elena_Alena.mp3"]
  },
  {
    names: ["evgeny", "евгений"],
    files: ["phrases_2019/add_player/add_player_Evgeny.mp3"]
  },
  {
    names: ["ivan", "иван"],
    files: [
      "phrases_2019/add_player/add_player_Ivan_1.mp3",
      "phrases_2019/add_player/add_player_Ivan_2.mp3"
    ]
  },
  {
    names: ["maria", "мария"],
    files: ["phrases_2019/add_player/add_player_Maria.mp3"]
  },
  {
    names: ["maxim", "максим"],
    files: ["phrases_2019/add_player/add_player_Maxim.mp3"]
  },
  {
    names: ["mikhail", "михаил"],
    files: ["phrases_2019/add_player/add_player_Mikhail.mp3"]
  },
  {
    names: ["nikita", "никита"],
    files: ["phrases_2019/add_player/add_player_Nikita.mp3"]
  },
  {
    names: ["roman", "роман"],
    files: ["phrases_2019/add_player/add_player_Roman.mp3"]
  },
  {
    names: ["valeriy", "валерий"],
    files: ["phrases_2019/add_player/add_player_Valeriy.mp3"]
  },
  {
    names: ["viktoria", "виктория"],
    files: ["phrases_2019/add_player/add_player_Viktoria.mp3"]
  },
  {
    names: ["vladimir", "владимир"],
    files: [
      "phrases_2019/add_player/add_player_Vladimir_1.mp3",
      "phrases_2019/add_player/add_player_Vladimir_2.mp3"
    ]
  },
  {
    names: ["vyacheslav", "вячеслав"],
    files: ["phrases_2019/add_player/add_player_Vyacheslav.mp3"]
  }
].map(item => ({
  ...item,
  sounds: item.files.map(fileName => new Sound(fileName, Sound.MAIN_BUNDLE))
}));

function getRandomIndex(length) {
  return Math.round(Math.random() * 100) % length;
}

const notSelectedItemsByScope = new Map();

function getRandomItem(array, { scope = "" }) {
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

  goal() {
    getRandomItem(goalSounds, { scope: "GOAL" }).play();
  }

  ownGoal() {
    getRandomItem(ownGoalSounds, { scope: "OWN_GOAL" }).play();
  }

  helloPlayer(name) {
    const personalGreeting = nameToSoundMappings.find(item =>
      item.names.includes(name.toLowerCase())
    );

    if (personalGreeting) {
      const { names, sounds } = personalGreeting;
      getRandomItem(sounds, { scope: `HELLO_${names[0]}` }).play();
    } else {
      getRandomItem(helloPlayerSounds, { scope: "HELLO_PLAYER" }).play();
    }
  }
}

export default new Sounds();
