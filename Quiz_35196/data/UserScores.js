// ./data/UserScore.js
class UserScores {
    constructor(nick, point, type, date) {
      this.nick = nick;
      this.point = point;
      this.type = type;
      this.date = date;
    }
  }

  const userScores = [
    new UserScores("asdf", "18/20", "test1", "21-11-2018"),
    new UserScores("asdf1", "15/20", "test1", "21-11-2018"),
    new UserScores("asdf3", "12/20", "test1", "21-11-2018"),
    new UserScores("asdf4", "20/20", "test1", "21-11-2018"),
  ];

  export { UserScores, userScores };