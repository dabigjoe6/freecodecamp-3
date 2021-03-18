require("dotenv").config();
let mongoose = require("mongoose");

try {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
} catch (e) {
  console.warn(e);
}

let personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: Number,
  favoriteFoods: [String],
});

let Person = new mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  const newPerson = new Person({
    name: "Joseph",
    age: 20,
    favoriteFoods: ["rice", "swallow"],
  });
  newPerson
    .save()
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      done(err);
    });
};

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople)
    .then((data) => {
      done(null, data);
    })
    .catch((err) => {
      done(err);
    });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, docs) => {
    if (err) {
      console.warn(err);
      done(err);
    }

    done(null, docs);
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, doc) => {
    if (err) {
      console.warn(err);
      done(err);
    }

    done(null, doc);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, doc) => {
    if (err) {
      console.warn(err);
      done(err);
    }

    done(null, doc);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, doc) => {
    if (err) {
      console.warn(err);
      done(err);
    }

    try {
      doc.favoriteFoods.push(foodToAdd);
      doc
        .save()
        .then((data) => {
          done(null, data);
        })
        .catch((err) => {
          console.warn(err);
          done(err);
        });
    } catch (e) {
      console.warn(err);
      done(err);
    }
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate(
    { name: personName },
    { age: ageToSet },
    { new: true },
    (err, doc) => {
      if (err) {
        console.warn(err);
        done(err);
      }

      done(null, doc);
    }
  );
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
