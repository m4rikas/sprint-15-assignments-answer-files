import fs from "fs/promises";

async function loadData() {
  const data = await fs.readFile("./users.json");
  // console.log(JSON.parse(data));
  return JSON.parse(data);
}

async function run() {
  let data = await loadData();

  const operation = process.argv[2];
  console.log(`Here's the operation you invoked: "${operation}"`);
  const incomingData = process.argv[3];
  console.log(`Here's the data you supplied: "${incomingData}"`);

  if (operation === "add") {
    addUser(data, incomingData);
  }
  if (operation === "delete") {
    data = deleteUser(data, incomingData);
  }

  console.log(`Here's what "users.json" is about to be *re-written* with:`);
  console.log(data);
  await saveData(data);
}

function addUser(data, newUser) {
  const newId = data.reduce((a, c) => Math.max(a, c.id), 0) + 1;
  data.push({ id: newId, name: newUser });
}

function deleteUser(data, removeId) {
  return data.filter((user) => user.id !== parseInt(removeId));
}

async function saveData(data) {
  return fs.writeFile("./users.json", JSON.stringify(data));
}

run();
