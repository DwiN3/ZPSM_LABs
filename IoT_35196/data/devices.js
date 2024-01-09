class devices {
    constructor( id, name, place, command, color) {
      this.id = id;
      this.name = name;
      this.place = place;
      this.command = command;
      this.color = color;
    }
  }

const devicesList = [
new devices("1", "Lampa", "Kuchnia", "light on / light off", "#FF8000"),
new devices("2", "Roleta 1", "Salon", "up / down", "#0077ff"),
new devices("3", "Roleta 2", "Salon", "up / down", "#0077ff"),
];

export { devices, devicesList };