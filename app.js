// const { name, age } = require("./basics/person")

// console.log(name, age);

const user = require("./basics/users")

user.userData()

console.log(user.multiply(2, 3));

user.user_arr.forEach(u => {
    console.log(u);
});

// arr = user.user_arr;
// for (let index = 0; index < arr.length; index++) {
//     console.log(arr[index]);
// }

console.log(user.getUserById(2));
