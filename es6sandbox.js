// var dynamicKey = 'foodness';
// var newObj = {
//   [dynamicKey]: 'pizza',
//   staticKey: 'cocacola'
// }
// console.log(newObj)

var x = 0;
var y = true;

var obj = Object.assign({}, { x, y });

var cart = {
  _wheels: 4,
  get wheels () {
    console.log('getting wheel value');
    return this._wheels;
  },
  set wheels (value) {
    console.log('setting new wheel value');
    if (value < this._wheels) {
      throw new Error('hey, come back here!');  
    }
    this._wheels = value;
  },
  dismantle () {
    this._wheels = 0;
    // console.warn(`you're all going to pay for this!`);
  }
};

// console.log(cart.wheels);

var obj = { a: 1 };
var copy = Object.assign({b: 2}, obj);
// console.log(copy); 
// console.log(obj);

class ProtoModel {
  // defaults: { invalid: true }
  constructor (model={}) {
    this.attributes = Object.assign({}, this.defaults, model);
    console.log(this);
    this.stuff = 'invalid things';
  }
  
  log () {
    console.log(this.stuff);
  }
}

// var pm = new ProtoModel();
// pm.log();

class Car {
  constructor () {
    this.topSpeed = Math.random()
  }
  static isFaster (left, right) {
    return left.topSpeed > right.topSpeed
  }
}
// console.log(Car.isFaster(new Car(), new Car()));

{ 
  let outer = 'I am so eccentric!'
  {
    let inner = 'I play with neighbors in my block and the sewers'
    {
      let innermost = 'I only play with neighbors in my block'
      // console.log(innermost);
    }
    // console.log(outer);
  }
}

var matches = [{
  "id": 0,
  "players": [
    {
      "id": 0,
      "name": "han",
      "damage_taken": [0, 0]
    },
    {
      "id": 1,
      "name": "bossk",
      "damage_taken": [0, 0, 0]
    }
  ]
  
}];

var matchId = 0;
var playersIndex = 0;
var {
  [matchId]: {
    players: {
      [playersIndex]: {
        damage_taken
      }
    }
  }
} = matches;

console.log('damage_taken, ', damage_taken);
// console.log('player', player);
// console.log('players, ', players);


// export default { cart };