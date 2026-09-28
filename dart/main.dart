enum Color {
  red,
  green,
  blue
}

enum Status {
  loading,
  idle,
  done
}

class Bird {
  void swim() => print('Swimming... Bird is swimming');
}

// mixin is a way to reuse code in multiple class hierarchies
// mixins are a way to add functionality to a class without 
// using inheritance
mixin Flyer {
  void fly() => print('Flying...');
}

mixin Swimmer {
  void swim() => print('Swimming...');
}

class Duck extends Bird with Swimmer, Flyer {
  @override
  void swim(){
    super.swim();
    print('Swimming... Duck is swimming');
  }
}


// making extensions for anything
extension StringX on String {
  String get capatalised => this[0].toUpperCase() + substring(1);
  String get removeFirstLetter => substring(1);
}

class Point extends Object with Swimmer {
  // const widget which is not rebuild, skip rebuilding
  const Point(this.x, this.y); 
  const Point.origin() : this(0, 0);

  final int x;
  final int y;
}

class User {
  final String name;
  final int age;

  User(this.name, this.age);
  User copyWith({String? name, int? age}){
    return User(name ?? this.name, age ?? this.age);
  }
}

class Length {
  // object is immutable, so we can use const constructor
  // value is final, so it cannot be changed after 
  // initialization
  const Length(this.value);
  final int value;

  Length operator +(Length other) {
    return Length(value + other.value);
  }

  @override
  bool operator ==(Object other){
   return other is Length && other.value == value;
  }

  // if you override ==, you must override hashCode too. Objects 
  // that are equal must have the same hash code. Otherwise Set,
  // Map keys and .toSet() break

  // In real projects, packages like equatable or freezed can 
  // generate == and hashCode for you.
  @override
  int get hashCode => value.hashCode;

  @override
  String toString() => 'Length($value)';
}

class Box<T> {
  final T value;
  Box(this.value);
}

void main() {
  print(Point.origin().x + Point.origin().y);
  print('${Color.red}, ${Color.green}, ${Color.blue}');
  print('${Status.loading}, ${Status.idle}, ${Status.done}');

  Status status = Status.loading;
  print('Current status: $status');

  Duck duck = Duck();
  duck.fly();
  duck.swim();

  // making an extension for String
  // this happens during the compile time, so no performance hit
  // dynamic typing is slower than static typing, so this is a 
  // good way to add functionality to existing types
  print('sam'.capatalised);
  print('sam'.removeFirstLetter.capatalised.removeFirstLetter.capatalised);

  // as the name and age if final here, only way to change
  // make new object with new values, copyWith is a common 
  // pattern for this
  User user = User('Sam', 20);
  user = user.copyWith(name: 'John');

  // we can;t define const here, because we are not sure if 
  // the value will be known at compile time.
  const Length lenA = Length(10);
  const Length lenB = Length(20);
  final Length lenC = lenA + lenB;
  print(lenC.value);
  print(lenA == lenB);
  print(lenC);

  Box<String> boxA = Box('Hello');
  print(boxA.value);
  print(boxA.value.runtimeType);
  Box<int> boxB = Box(10);
  print(boxB.value);
  print(boxB.value.runtimeType);

  print(add(10, 20));
  print(add(10, 20).runtimeType);
  print(namedParams(count: 10, name: 'John'));
  print(namedParams(count: 10, name: 'John').runtimeType);
}

// function with a, b, a + b
// we can return multiple values from a function using tuple
(int, int, int) add(int a, int b) => (a, b, a + b);
({int count, String name}) namedParams({
  int count = 0, String name = 'Sam'
}) => (count: count, name: name);

