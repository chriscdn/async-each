function t(t,e,a=(()=>{})){let n=0;const o=t.length,r=t.map((t,r,s)=>new Promise(async(c,l)=>{setTimeout(async()=>{try{const l=await e(t,r,s);c(l),a({progress:n++,total:o,percent:Math.floor(100*n/o),item:t,index:r,result:l})}catch(t){l(t)}},0)}));return Promise.all(r)}export{t as default};
//# sourceMappingURL=async-each.modern.js.map
