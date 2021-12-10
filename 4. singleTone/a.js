class A {
  constructor() {
    this.a = 0;
  }

  get getA() {
    return this.a;
  }

  set setA(value) {
    this.a = value;
  }
}

module.exports = new A();
