/*
 * Copyright 2021 SpinalCom - www.spinalcom.com
 *
 * This file is part of SpinalCore.
 *
 * Please read all of the following terms and conditions
 * of the Free Software license Agreement ("Agreement")
 * carefully.
 *
 * This Agreement is a legally binding contract between
 * the Licensee (as defined below) and SpinalCom that
 * sets forth the terms and conditions that govern your
 * use of the Program. By installing and/or using the
 * Program, you agree to abide by all the terms and
 * conditions stated or referenced herein.
 *
 * If you do not agree to abide by these terms and
 * conditions, do not demonstrate your acceptance and do
 * not install or use the Program.
 * You should have received a copy of the license along
 * with this file. If not, see
 * <http://resources.spinalcom.com/licenses.pdf>.
 */
import * as path from "path";
// import arrayOfRequests from "./absfiles"
// import { arrayOfRequests } from "./finalList";

// List all files in a directory in Node.js recursively in a synchronous fashion


export function getListRequest() {
  const routeDir = path.join(__dirname, 'routes');
  const absfiles = walkSync(routeDir);


  return absfiles.map(el => path.resolve(__dirname, el));

  // var doNotMatch = [];
  // var MatchList = [];
  // for (var i = 0; i < absfiles.length; i++) {
  //     if (arrayOfRequests.indexOf(absfiles[i]) == -1) { doNotMatch.push(absfiles[i]); }
  // }
  // MatchList = arrayOfRequests.concat(doNotMatch)

  // require('fs').writeFile(

  //     './finalList.ts', 'module.exports = ' +

  // JSON.stringify(MatchList, null, 2),

  //     function (err) {
  //         if (err) {
  //             console.error('Crap happens');
  //         }
  //     }
  // );

  // const mapList = MatchList.map((el) => {
  //     return path.resolve(__dirname, el)
  // })
  // return mapList;
}



var walkSync = function (dir: string, filelist?: string[]): string[] {
  var path = path || require('path');
  var fs = fs || require('fs'),
    files = fs.readdirSync(dir);
  filelist = filelist || [];

  files.forEach(function (file) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    }
    else {
      filelist.push(path.relative(__dirname, path.join(dir, file)));
    }
  });
  filelist.sort((a, b) => getIndexCat(a) - getIndexCat(b));
  return filelist;
};

function getCat(filePath: string): string {
  const dir = filePath.split(path.sep);
  for (let idx = 0; idx < dir.length; idx++) {
    if (dir[idx] === 'routes') return dir[idx + 1];
  }
}


function getIndexCat(filePath: string): number {
  const orderCat = [
    "contexts", "nodes", "categoriesAttributs", "attributs", "geographicContext", "IoTNetwork", "tickets", "notes", "calendar", "groupContext", "roomGroup", "equipementGroup", "endpointGroup", "Nomenclature Group", "Analytics", "BIM"
  ];
  const dir = getCat(filePath);
  if (!dir) return 9999;
  return orderCat.indexOf(dir);
}




