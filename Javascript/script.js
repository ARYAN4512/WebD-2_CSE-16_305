//mixed object
let mixedObject={
    name:"Alice",
    age:25,
    hobbies:["reading","travelling","coding"],
    address:{
        street:"123 main st",
         city:"New York",
         country:"USA",
    },
    greet:function(){
}
} 
console.log(mixedObject.name);
console.log(mixedObject.age);
console.log(mixedObject.hobbies(0));
console.log(mixedObject.hobbies(1));
console.log(mixedObject.hobbies(2));
console.log(mixedObject.address);


// object inside array
let people=[
    {name:"Alice",age:25},
    {name:"Bob",age:30},
    {name:"Charlie",age:35}
];
console.log(people[0]);
console.log(people[1].age);
console.log(people[2].name);

// array inside object
let company={
    name:"Tech Corp",
    employees:["Alice","Bob","Charlie"]
};