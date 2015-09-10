var dynamicKey = 'foodness';
var newObj = {
  [dynamicKey]: 'pizza',
  staticKey: 'cocacola'
}
// console.log(newObj)

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
    console.warn(`you're all going to pay for this!`);
  }
};

console.log(cart.wheels);

// export default { cart };