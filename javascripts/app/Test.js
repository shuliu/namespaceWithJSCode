
import { helpers } from '../verdor/namespace.extend';

let myHelp = new helpers();
let myApp = {};

myHelp.extend(myApp, 'modules.moduleA.moduleB.moduleC');
myHelp.extend(myApp, 'longer.version.looks.like.this');

console.log(myApp);