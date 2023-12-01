// Tests.js

class Tests {
  constructor(titleNumber, tags, description, tasks) {
    this.titleTest = `Title test #${titleNumber}`;
    this.tags = tags;
    this.description = description;
    this.tasks = tasks;
  }
}

const tasks = [
  {
    "question": "Który wódz po śmierci Gajusza Mariusza, prowadził wojnę domową z Sullą?",
    "answers": [
      {
        "content": "LUCJUSZ CYNNA",
        "isCorrect": true
      },
      {
        "content": "JULIUSZ CEZAR",
        "isCorrect": false
      },
      {
        "content": "LUCJUSZ MURENA",
        "isCorrect": false
      },
      {
        "content": "MAREK KRASSUS",
        "isCorrect": false
      }
    ],
    "duration": 30
  },
  {
    "question": "Kto był pierwszym królem Polski?",
    "answers": [
      {
        "content": "BOLESLAW CHROBRY",
        "isCorrect": false
      },
      {
        "content": "MIESZKO I",
        "isCorrect": true
      },
      {
        "content": "KAZIMIERZ WIELKI",
        "isCorrect": false
      },
      {
        "content": "JAN III SOBIESKI",
        "isCorrect": false
      }
    ],
    "duration": 45
  },
  {
    "question": "Które miasto jest stolicą Japonii?",
    "answers": [
      {
        "content": "SEOUL",
        "isCorrect": false
      },
      {
        "content": "BEIJING",
        "isCorrect": false
      },
      {
        "content": "TOKIO",
        "isCorrect": true
      },
      {
        "content": "HANOI",
        "isCorrect": false
      }
    ],
    "duration": 20
  },
  {
    "question": "Który pierwiastek chemiczny ma symbol 'O'?",
    "answers": [
      {
        "content": "TLLEN",
        "isCorrect": false
      },
      {
        "content": "OXYGEN",
        "isCorrect": true
      },
      {
        "content": "GOLD",
        "isCorrect": false
      },
      {
        "content": "IRON",
        "isCorrect": false
      }
    ],
    "duration": 25
  }
];

const TestsList = [
  new Tests(1, ['#Tag1', '#Tag2'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...', tasks),
  new Tests(2, ['#Tag3', '#Tag4'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...', tasks),
  new Tests(3, ['#Tag5', '#Tag6'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...', tasks),
  new Tests(4, ['#Tag7', '#Tag8'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...', tasks),
  new Tests(5, ['#Tag7', '#Tag8'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...', tasks),
  new Tests(6, ['#Tag7', '#Tag8'], 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...', tasks),
];

export { Tests, TestsList };
