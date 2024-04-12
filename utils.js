import { GetAngle, GetAngleRadian, GetDistance } from "./math.js";

export function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const space = document.getElementsByTagName("space")[0];
export var Objects = [];

export function SetObjects(objNew) {
  Objects = objNew;
}

export class Obj {
  constructor(id, mass, vector = [0, 0], position = [0, 0]) {
    this.Id = id;
    this.Mass = mass;
    this.Vector = vector;
    this.Position = position;
    Objects.push(this);
    this.getElement();
  }

  getElement() {
    var diameter = parseInt(Math.log10(this.Mass) * 10);

    var element = document.getElementById("obj-" + this.Id);

    if (!element) {
      element = document.createElement("obj");
      element.id = "obj-" + this.Id;
      element.style.backgroundColor = getRandomColor();
      element.style.width = diameter + "px";

    //   element.innerText = this.Id;
      var vect = document.createElement("fp");
      vect.id = "fp-" + this.Id;
      vect.style.backgroundColor = getRandomColor();
      element.appendChild(vect);
      space.appendChild(element);
    }

    this.updateElement();
    element.getVectorElement = () => document.getElementById("fp-" + this.Id);
    return element;
  }

  updateElement() {
    const element = document.getElementById("obj-" + this.Id);
    if (!element) return;
    const position_x = window.innerHeight / 2 + this.Position[0];
    const position_y = window.innerWidth / 2 + this.Position[1];
    element.style.bottom = position_x + "px";
    element.style.left = position_y + "px";

    var diameter = parseInt(Math.log10(this.Mass) * 10);

    const vect = document.getElementById("fp-" + this.Id);
    if (!vect) return;
    vect.style.transform = `translate(${diameter / 2}px, ${
      diameter / 2
    }px) rotate(${GetAngle([0, 0], this.Vector) - 90}deg)`;
    vect.style.width =
      parseInt(Math.log(GetDistance([0, 0], this.Vector)) * 3) + "px";
  }
}

export function UpdateAllObjects() {
  Objects.forEach((o) => o.updateElement());
}

export function numberInRange(max, min) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
