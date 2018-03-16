import * as fs from "fs";

export const writeToFs = (model, data) => {
    const string = JSON.stringify(data);
    fs.readFile('./mocks/' + model + '.json', 'utf8', function (err, contents) {
        console.log(contents);
    });
    fs.writeFile(__dirname + "/mocks/" + model + '.json', string, 'utf8', function (err) {
        if (err) return console.error(err);
        console.log('done');
    });

};