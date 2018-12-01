//AK/Series/FibonacciSeries.js

//Copyright Richard Harris 2016.
//Distributed under the Boost Software License, Version 1.0.
//(See accompanying file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

//Use of this code for anything other than illustrative purposes is discouraged.

"use strict";

(function() {
 function define() {
  if(ak.fibonacciSeries) return;

  var MUL = 1/Math.sqrt(5);

  ak.fibonacciSeries = function(i) {
   if(i!==ak.floor(i) || i<0) throw new Error('invalid index in ak.fibonacciSeries');
   return ak.round(Math.pow(ak.PHI, i+2)*MUL)-1;
  };
 }
 ak.using('', define);
})();
