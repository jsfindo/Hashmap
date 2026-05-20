class Hashmap{
    constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.size = 0;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);

    }

     hash(key) {
  let hashCode = 0;

  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = primeNumber * hashCode + key.charCodeAt(i);
  }

  return hashCode % this.capacity;
} 

 resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity).fill(null).map(() => []);
    this.size = 0;

    // Rehash all existing entries into new buckets
    for (let bucket of oldBuckets) {
      for (let [key, value] of bucket) {
        this.set(key, value);
      }
    }
  }

set(key, value){
    
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Update existing key if found (avoid duplicates)
    for (let pair of bucket) {
      if (pair[0] === key) {
        pair[1] = value;
        return;
      }
    }

    // Otherwise insert new pair and track size
    bucket.push([key, value]);
    this.size++;

    // Resize if load factor exceeded
    if (this.size / this.capacity > this.loadFactor) {
      this.resize();
}

}

get(key){
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Update existing key if found (avoid duplicates)
    for (let pair of bucket) {
      if (pair[0] === key){
        return pair[1]

      }
    
     

}
 return null
}

has(key){
    const index = this.hash(key);
    const bucket = this.buckets[index];

    // Update existing key if found (avoid duplicates)
    for (let pair of bucket) {
      if (pair[0] === key){
        return true

      }
    
     

}
 return false
}

remove(key){
  const index = this.hash(key);
  const bucket = this.buckets[index];

  for (let i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      bucket.splice(i, 1); // 👈 actually removes the pair
      this.size--;
      return true;
    }
  }
  return false; // 👈 must be outside the loop
}


length(){
    
 return this.size;
}


keys() {
  const keysArray = [];
  for (let bucket of this.buckets) {
    for (let pair of bucket) {
      keysArray.push(pair[0]);
    }
  }
  return keysArray;
}

values() {
  const valueArray = [];
  for (let bucket of this.buckets) {
    for (let pair of bucket) {
      valueArray.push(pair[1]);
    }
  }
  return valueArray;
}

clear() {
  this.buckets = new Array(this.capacity).fill(null).map(() => []);
  this.size = 0;
}

entries() {
  const entriesArray = [];
  for (let bucket of this.buckets) {
    for (let pair of bucket) {
      entriesArray.push(pair);
    }
  }
  return entriesArray;
}
}
const map = new Hashmap();

// set
map.set("name", "Alice");
map.set("age", "30");
map.set("city", "Helsinki");
map.set("country", "Finland");

console.log("--- set ---");
console.log(map.get("name"));    // Alice
console.log(map.get("age"));     // 30
console.log(map.get("missing")); // null

// update existing key
map.set("name", "Bob");
console.log("\n--- update ---");
console.log(map.get("name")); // Bob

// has
console.log("\n--- has ---");
console.log(map.has("city"));    // true
console.log(map.has("missing")); // false

// length
console.log("\n--- length ---");
console.log(map.length()); // 4

// remove
console.log("\n--- remove ---");
console.log(map.remove("age"));     // true
console.log(map.remove("missing")); // false
console.log(map.length());          // 3

// keys, values, entries
console.log("\n--- keys ---");
console.log(map.keys()); // ["name", "city", "country"]

console.log("\n--- values ---");
console.log(map.values()); // ["Bob", "Helsinki", "Finland"]

console.log("\n--- entries ---");
console.log(map.entries()); // [["name","Bob"],["city","Helsinki"],["country","Finland"]]

// resize — add enough entries to trigger it
console.log("\n--- resize ---");
for (let i = 0; i < 20; i++) {
  map.set(`key${i}`, `value${i}`);
}
console.log("capacity after resize:", map.capacity); // 32 or 64
console.log("size after resize:", map.length());     // 23

// clear
console.log("\n--- clear ---");
map.clear();
console.log(map.length()); // 0
console.log(map.keys());   // []
console.log(map.get("name")); // null