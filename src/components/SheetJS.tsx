import { read, utils, writeFile } from 'xlsx';

interface President {
  Name: string;
  Index: number;
}

const f = await (await fetch("https://sheetjs.com/pres.xlsx")).arrayBuffer();
const wb = read(f);
const data = utils.sheet_to_json<President>(wb.Sheets[wb.SheetNames[0]]);
console.log(data);