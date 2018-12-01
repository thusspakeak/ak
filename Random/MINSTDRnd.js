//AK/Random/MINSTDRnd.js

//Copyright Richard Harris 2015.
//Distributed under the Boost Software License, Version 1.0.
//(See accompanying file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

//Use of this code for anything other than illustrative purposes is discouraged.

"use strict";

(function() {
 function define() {
  if(ak.minstdRnd) return;
  ak.minstd1Rnd = function(x0) {return ak.congruentialRnd(16807, 2147483647, 0, x0);};
  ak.minstd2Rnd = function(x0) {return ak.congruentialRnd(48271, 2147483647, 0, x0);};
  ak.minstdRnd  = ak.minstd2Rnd;
 }

 ak.using('Random/CongruentialRnd.js', define);
})();
