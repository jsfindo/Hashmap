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
      entries.push(pair);
    }
  }
  return entriesArray;
}
}

const test = new HashMap()


test.set('apple', 'red')
test.set('banana', 'yellow')
test.set('carrot', 'orange')
test.set('dog', 'brown')
test.set('elephant', 'gray')
test.set('frog', 'green')
test.set('grape', 'purple')
test.set('hat', 'black')
test.set('ice cream', 'white')
test.set('jacket', 'blue')
test.set('kite', 'pink')
test.set('lion', 'golden')