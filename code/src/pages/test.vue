<template>
  <div>
		test		
  </div>
</template>

<script>
var bob = {
    _name: "Bob",
    _friends: ["Bob", "hzl"],
    printFriends() {
        this._friends.forEach(f => {
            console.log(this._name + ' knows ' + f);
        })
    }
}
bob.printFriends();


function square() {
    let example = () => {
        let numbers = [];
        for (let number of arguments) {
            numbers.push(number * number);
        }
        return numbers;
    }
    return example();
}
console.log(square(2, 4, 7.5, 8, 11.5, 21));

var obj = {
    // Sets the prototype. "__proto__" or '__proto__' would also work.
    // __proto__: theProtoObj,
    // Computed property name does not set prototype or trigger early error for
    // duplicate __proto__ properties.
    // ['__proto__']: somethingElse,
    // Shorthand for ‘handler: handler’
    // handler,
    // Methods
    toString() {
     // Super calls
    //  return "d " + super.toString();
    },
    // Computed (dynamic) property names
    [ "prop_" + (() => 42)() ]: 42
};
console.log(obj.prop_42)
export default {
	mounted() {
		// bob.printFriends();
		console.log(123)
	}
}
</script>
