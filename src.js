import {
  numberInRange,
  Obj,
  UpdateAllObjects,
  Objects,
  SetObjects,
} from "./utils.js";
import { UpdatePositions } from "./math.js";

const slider = document.getElementById("interval-slid");
const addBtn = document.getElementById("btn-addObj");
const rmBtn = document.getElementById("btn-rmObj");
const space = document.getElementsByTagName("space")[0];

space.setAttribute("style", "overflow:auto");

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};

function clearObjects() {
  Objects.forEach((obj) => {
    var element = obj.getElement();
    element.remove();
  });
  SetObjects([]);
}

slider.addEventListener("change", () => (renderInterval = slider.value));
addBtn.addEventListener("click", () => {
  planetCount += 1;
  Initialize();
});
rmBtn.addEventListener("click", () => {
  planetCount -= 1;
  Initialize();
});

var planetCount = 0;

function Initialize() {
  clearObjects();
  if (planetCount < 2) {
    var planet_core = new Obj("CORE", 100000, [0, 0], [0, 0]);
    var planet_1 = new Obj("E-3", 100, [-990, -140], [0, -75]);
    var planet_2 = new Obj("E-5", 200, [-780, -480], [-80, 100]);
  }

  var h = window.innerHeight / 2;

  var vr = [-1000, 1000]; // vector min-max
  var pr = [-h / 1.5, h / 1.5]; // position min-max
  var mr = [100, 3300]; // mass min-max
  for (let i = 0; i < planetCount; i++) {
    var mass = numberInRange(mr[0], mr[1]);
    var vector = [numberInRange(vr[0], vr[1]), numberInRange(vr[0], vr[1])];
    var position = [numberInRange(pr[0], pr[1]), numberInRange(pr[0], pr[1])];
    new Obj("P-" + i, mass, vector, position);
  }
}

function UpdateAnimationDurations() {
  Objects.forEach(
    (o) => (o.getElement().style.transitionDuration = renderInterval + 2 + "ms")
  );
  Objects.forEach(
    (o) =>
      (o.getElement().getVectorElement().style.transitionDuration =
        renderInterval + 2 + "ms")
  );
}

var renderInterval = 10;
function render() {
  UpdateAllObjects();
  UpdatePositions(Objects);
  UpdateAnimationDurations();
  setTimeout(render, renderInterval);
}

Initialize();
render();
