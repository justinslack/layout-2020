if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise(async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()})),r.then(()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]})},r=(r,s)=>{Promise.all(r.map(e)).then(e=>s(1===e.length?e[0]:e))},s={require:Promise.resolve(r)};self.define=(r,i,c)=>{s[r]||(s[r]=Promise.resolve().then(()=>{let s={};const a={uri:location.origin+r.slice(1)};return Promise.all(i.map(r=>{switch(r){case"exports":return s;case"module":return a;default:return e(r)}})).then(e=>{const r=c(...e);return s.default||(s.default=r),s})}))}}define("./service-worker.js",["./workbox-9f2a03dc"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.precacheAndRoute([{url:"android-chrome-192x192.png",revision:"ec3e16c4fe2b68992b201b93a4a0ed36"},{url:"android-chrome-512x512.png",revision:"e4c25ebd783364c7470c9003165634e6"},{url:"apple-touch-icon.png",revision:"5ffcfdade5fd279301acd7d47d009a57"},{url:"dist/css/styles.css",revision:"f02410612bdba2b122d3954b56e28ccc"},{url:"examples/alignment.html",revision:"33b9fc0c652d25aae558f436b37de581"},{url:"examples/gap.html",revision:"2ddd76279b05b27fb6c91c536bb493a2"},{url:"examples/html-template.html",revision:"0e98f4b81e7767b41ad4480cc705f54e"},{url:"examples/logical-properties.html",revision:"f1474c03ddb2cd16e0a77865f81e6dd9"},{url:"examples/masonry.html",revision:"03f106f5f74c08431e397616322c949f"},{url:"examples/shapes.html",revision:"c1380e50e0eb299a1079b896dc80b5c4"},{url:"examples/sizing.html",revision:"2021115a2b1784fb63d804783b77b23e"},{url:"favicon-16x16.png",revision:"7beadbd3e9e1b70a2b5deead78d3e00e"},{url:"favicon-32x32.png",revision:"a501b0ecbabad758b397caeb781bbadc"},{url:"favicon.ico",revision:"cb9fb97e42a92701e357a4b4d9483804"},{url:"index.html",revision:"254b8e6f419dc5fab46b13319920e11c"},{url:"mstile-144x144.png",revision:"bcdf514a474db329a19775b953daee23"},{url:"mstile-150x150.png",revision:"eaa96605adccb42f4245027e20cdd27b"},{url:"mstile-310x150.png",revision:"0d26b01c75bb58ea550358e03180e045"},{url:"mstile-310x310.png",revision:"3b9859c3b36a5cc75c5766d3533ee107"},{url:"mstile-70x70.png",revision:"4269bd86031826a335f1f34c581a8d40"},{url:"src/js/class-toggler.es6.js",revision:"76bb7d1d18e5c0b630778d99f2d7f596"},{url:"src/js/prism.js",revision:"848e099a169b557d97d7bca403de7fe8"},{url:"src/js/script.js",revision:"31dcfa8f5a20e1a8bc43a0532851a482"}],{})}));
//# sourceMappingURL=service-worker.js.map
