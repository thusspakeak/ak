//AK/Optimise/BlindfoldMinimum.js

//Copyright Richard Harris 2014.
//Distributed under the Boost Software License, Version 1.0.
//(See accompanying file LICENSE_1_0.txt or copy at http://www.boost.org/LICENSE_1_0.txt)

//Use of this code for anything other than illustrative purposes is discouraged.

"use strict";

(function() {
 function define() {
  if(ak.blindfoldMinimum) return;

  function uniMinimum(f, x0, d, steps, rnd) {
   var step = 0;
   var x1, f0, f1;

   if(ak.nativeType(x0)!==ak.NUMBER_T || !isFinite(x0)) throw new Error('invalid argument in ak.blindfoldMinimum');
   if(ak.nativeType(d)!==ak.NUMBER_T || !isFinite(d))  throw new Error('invalid delta in ak.blindfoldMinimum');

   if(isNaN(f0 = f(x0))) f0 = ak.INFINITY;

   while(step++<steps) {
    x1 = x0 + d*(2*rnd()-1);
    if(isNaN(f1 = f(x1))) f1 = ak.INFINITY;

    if(f1<=f0) {
     f0 = f1;
     x0 = x1;
    }
   }
   return !isNaN(f(x0)) ? x0 : ak.NaN;
  }

  function multiMinimum(f, x, d, steps, rnd) {
   var step = 0;
   var n, i, x0, x1, f0, f1;

   if(ak.type(x)!==ak.VECTOR_T || x.dims()===0) throw new Error('invalid argument in ak.blindfoldMinimum');

   n = x.dims();
   for(i=0;i<n && isFinite(x.at(i));++i);
   if(i<n) throw new Error('invalid argument in ak.blindfoldMinimum');

   if(ak.nativeType(d)===ak.NUMBER_T) d = ak.vector(n, d);
   else if(ak.type(d)!==ak.VECTOR_T || d.dims()!==n) throw new Error('invalid delta in ak.blindfoldMinimum');

   for(i=0;i<n && isFinite(d.at(i));++i);
   if(i<n) throw new Error('invalid delta in ak.blindfoldMinimum');

   d  = d.toArray();
   x0 = x.toArray();
   x1 = new Array(n);

   if(isNaN(f0 = f(x))) f0 = ak.INFINITY;

   while(step++<steps) {
    for(i=0;i<n;++i) x1[i] = x0[i] + d[i]*(2*rnd()-1);
    x = ak.vector(x1);
    if(isNaN(f1 = f(x))) f1 = ak.INFINITY;

    if(f1<=f0) {
     f0 = f1;
     x0 = x.toArray();
    }
   }
   x = ak.vector(x0);
   return !isNaN(f(x)) ? x : ak.vector(n, ak.NaN);
  }

  function minimum(f, x, d, steps, rnd) {
   if(ak.nativeType(d)===ak.UNDEFINED_T) d = (1+ak.abs(x))/64;
   return ak.nativeType(x)===ak.NUMBER_T ? uniMinimum(f, x, d, steps, rnd) : multiMinimum(f, x, d, steps, rnd);
  }

  ak.blindfoldMinimum = function(f, steps, rnd) {
   if(ak.nativeType(f)!==ak.FUNCTION_T) throw new Error('invalid function in ak.blindfoldMinimum');

   steps = ak.nativeType(steps)===ak.UNDEFINED_T ? 1024 : ak.floor(Math.abs(steps));
   if(!isFinite(steps)) throw new Error('invalid number of steps in ak.blindfoldMinimum');

   if(ak.nativeType(rnd)===ak.UNDEFINED_T) rnd = Math.random;
   else if(ak.nativeType(rnd)!==ak.FUNCTION_T) throw new Error('invalid random number generator in ak.blindfoldMinimum');

   return function(x, d) {return minimum(f, x, d, steps, rnd);};
  };
 }

 ak.using('Matrix/Vector.js', define);
})();