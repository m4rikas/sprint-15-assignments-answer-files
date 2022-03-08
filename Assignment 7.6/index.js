import mongoose from "mongoose";

// Connection to MongoDB
const connectionString = "mongodb://localhost:27017/marvel";

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB Connection Error"));

// User Schema
const xmenCharacterSchema = new mongoose.Schema({
  code_name: { type: String },
  real_name: { type: String },
  team: { type: String },
  marvel_comic: { type: String },
});

// Model
const Member = mongoose.model("Character", xmenCharacterSchema);

async function createMembers() {
  const wolverine = new Member({
    code_name: "Wolverine",
    real_name: "James Howlett",
    team: "blue",
    marvel_comic: "X-Men",
  });
  wolverine.save();

  const beast = new Member({
    code_name: "Beast",
    real_name: "Hank McCoy",
    team: "blue",
    marvel_comic: "X-Men",
  });

  const iceMan = new Member({
    code_name: "Psylocke",
    real_name: "Betsy Braddock",
    team: "blue",
    marvel_comic: "X-Men",
  });
  iceMan.save();

  const storm = new Member({
    code_name: "Storm",
    real_name: "Ororo Munroe",
    team: "gold",
    marvel_comic: "X-Men",
  });
  console.log(`createMembers run`);
  await storm.save();
  process.exit();
}

async function findMember() {
  const target = await Member.findOne({ team: "gold" });
  console.log(
    `Attempted to find an X-Men member on team "${target.team}" with the following result:`,
    target
  );
  process.exit();
}

async function deleteAll() {
  const targets = await Member.find({ team: "blue" });
  console.log(`Here are the charcters in the marvel_comic 'x-men':`, targets);
  console.log(`deleteAll run`);
  await Member.deleteMany({ team: "blue" });

  process.exit();
}

async function updateOne() {
  const targets = await Member.findOne({ code_name: "Storm" });
  console.log(
    `Here's the first instance of a character named 'Storm':`,
    targets
  );
  const result = await Member.findOneAndUpdate(
    { code_name: "Storm" },
    { $set: { code_name: "Ice Man", real_name: "Louis Drake" } },
    { returnDocument: "after" }
  );
  // const result = await Member.deleteMany({marvel_comic: "X-Men"},{returnDocument: "after"})
  console.log(`Here are the entries remaining in your database:`, result);

  process.exit();
}

// findMember();
// createMembers();
// deleteAll();
updateOne();
