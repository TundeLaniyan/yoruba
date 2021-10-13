const fs = require("fs");
const { join } = require("path");

const data = fs.readFileSync(join(__dirname, "data3.json"));
const json = JSON.parse(data);
const { lesson } = json;

const newLesson = lesson.map((cur) => {
  const text = cur.words.map((element, index) => ({
    English: element,
    Yoruba: cur.language[index] || "",
  }));
  return { title: cur.title, description: cur.description, text };
});

const lessonString = JSON.stringify({ lesson: newLesson }, null, 2);
fs.writeFile(join(__dirname, "data1.json"), lessonString, (err) =>
  console.log(err || "success")
);
