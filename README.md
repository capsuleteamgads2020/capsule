# capsule

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm start
```

### Compiles and deploy for production
```
gcloud app deploy
```

### Compiles and deploy for production with non-interactive
```
gcloud app deploy --quiet
```

### Open project on default browser
```
gcloud app browse
```

### Customize configuration
See [Configuration Reference](https://cloud.google.com/appengine/docs/standard/nodejs/quickstart#local-machine_1).

### Handling error
https://stackoverflow.com/a/36703397
https://www.smashingmagazine.com/2020/08/error-handling-nodejs-error-classes/
https://bezkoder.com/node-js-mongodb-auth-jwt/
https://stackoverflow.com/questions/10695629/what-is-the-parameter-next-used-for-in-express
https://softauthor.com/firebase-cloud-firestore-add-set-update-delete/
https://www.youtube.com/watch?v=i5B5ZZGq9xI&list=PLNEuOb0G_N12Vaf9mCSWHNecDreh-wVlX
https://www.youtube.com/playlist?list=PL4cUxeGkcC9i_aLkr62adUTJi53y7OjOf

const pets = ['cat', 'dog', 'bat'];
const animals = ['goat', 'cow', 'pig'];
pets.filter(pet => {
    if(!animals.includes(pet)) {
        animals.push(pet);
    }
});

var ref = db.collection('arrays-test').doc('mydoc');
  
  ref.set({ arr: [] }).then(console.log)
  ref.update({
    arr: firebase.firestore.FieldValue.arrayUnion({ foo: "BAR" })
  });
 
  db.collection('arrays-test')
    .where('arr', 'array-contains', { foo: "BAR" })
    .get().then(function(snap) {
      if (snap) {
      	snap.docs.forEach(function (doc) {
       		console.log(doc.id);
        	console.log(doc.data());
        });
      }
    });