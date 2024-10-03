import csv from 'csv-parser';
import * as fs from 'fs';

const imageURL =
"https://raw.githubusercontent.com/msikma/pokesprite/refs/heads/master/pokemon-gen8/regular";

const parser = async (csvfile) => {
    const results = [];
        const data = new Promise( (resolve, reject) => {
            fs.createReadStream(csvfile)
            .pipe(csv())
            .on('data', (data) => {
                data.ImgUrl = `${imageURL}/${data.Name.toString().toLowerCase()}.png`
                results.push(data)
            
            })
            .on('end', () => {
                resolve(results);
            })
            .on('error', e => {
                reject(e)
            })
        });
        return data;
}

export default parser;