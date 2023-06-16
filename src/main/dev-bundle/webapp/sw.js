try{self["workbox:core:7.0.0"]&&_()}catch{}const M=(a,...e)=>{let t=a;return e.length>0&&(t+=` :: ${JSON.stringify(e)}`),t},S=M;class l extends Error{constructor(e,t){const s=S(e,t);super(s),this.name=e,this.details=t}}const V=new Set,f={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:typeof registration<"u"?registration.scope:""},v=a=>[f.prefix,a,f.suffix].filter(e=>e&&e.length>0).join("-"),W=a=>{for(const e of Object.keys(f))a(e)},U={updateDetails:a=>{W(e=>{typeof a[e]=="string"&&(f[e]=a[e])})},getGoogleAnalyticsName:a=>a||v(f.googleAnalytics),getPrecacheName:a=>a||v(f.precache),getPrefix:()=>f.prefix,getRuntimeName:a=>a||v(f.runtime),getSuffix:()=>f.suffix};function L(a,e){const t=new URL(a);for(const s of e)t.searchParams.delete(s);return t.href}async function F(a,e,t,s){const r=L(e.url,t);if(e.url===r)return a.match(e,s);const n=Object.assign(Object.assign({},s),{ignoreSearch:!0}),i=await a.keys(e,n);for(const c of i){const o=L(c.url,t);if(r===o)return a.match(c,s)}}let b;function q(){if(b===void 0){const a=new Response("");if("body"in a)try{new Response(a.body),b=!0}catch{b=!1}b=!1}return b}class H{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}async function B(){for(const a of V)await a()}const $=a=>new URL(String(a),location.href).href.replace(new RegExp(`^${location.origin}`),"");function j(a){return new Promise(e=>setTimeout(e,a))}function I(a,e){const t=e();return a.waitUntil(t),t}async function G(a,e){let t=null;if(a.url&&(t=new URL(a.url).origin),t!==self.location.origin)throw new l("cross-origin-copy-response",{origin:t});const s=a.clone(),r={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},n=e?e(r):r,i=q()?s.body:await s.blob();return new Response(i,n)}function z(){self.addEventListener("activate",()=>self.clients.claim())}try{self["workbox:precaching:7.0.0"]&&_()}catch{}const Q="__WB_REVISION__";function J(a){if(!a)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(typeof a=="string"){const n=new URL(a,location.href);return{cacheKey:n.href,url:n.href}}const{revision:e,url:t}=a;if(!t)throw new l("add-to-cache-list-unexpected-type",{entry:a});if(!e){const n=new URL(t,location.href);return{cacheKey:n.href,url:n.href}}const s=new URL(t,location.href),r=new URL(t,location.href);return s.searchParams.set(Q,e),{cacheKey:s.href,url:r.href}}class X{constructor(){this.updatedURLs=[],this.notUpdatedURLs=[],this.handlerWillStart=async({request:e,state:t})=>{t&&(t.originalRequest=e)},this.cachedResponseWillBeUsed=async({event:e,state:t,cachedResponse:s})=>{if(e.type==="install"&&t&&t.originalRequest&&t.originalRequest instanceof Request){const r=t.originalRequest.url;s?this.notUpdatedURLs.push(r):this.updatedURLs.push(r)}return s}}}class Y{constructor({precacheController:e}){this.cacheKeyWillBeUsed=async({request:t,params:s})=>{const r=(s==null?void 0:s.cacheKey)||this._precacheController.getCacheKeyForURL(t.url);return r?new Request(r,{headers:t.headers}):t},this._precacheController=e}}try{self["workbox:strategies:7.0.0"]&&_()}catch{}function y(a){return typeof a=="string"?new Request(a):a}class Z{constructor(e,t){this._cacheKeys={},Object.assign(this,t),this.event=t.event,this._strategy=e,this._handlerDeferred=new H,this._extendLifetimePromises=[],this._plugins=[...e.plugins],this._pluginStateMap=new Map;for(const s of this._plugins)this._pluginStateMap.set(s,{});this.event.waitUntil(this._handlerDeferred.promise)}async fetch(e){const{event:t}=this;let s=y(e);if(s.mode==="navigate"&&t instanceof FetchEvent&&t.preloadResponse){const i=await t.preloadResponse;if(i)return i}const r=this.hasCallback("fetchDidFail")?s.clone():null;try{for(const i of this.iterateCallbacks("requestWillFetch"))s=await i({request:s.clone(),event:t})}catch(i){if(i instanceof Error)throw new l("plugin-error-request-will-fetch",{thrownErrorMessage:i.message})}const n=s.clone();try{let i;i=await fetch(s,s.mode==="navigate"?void 0:this._strategy.fetchOptions);for(const c of this.iterateCallbacks("fetchDidSucceed"))i=await c({event:t,request:n,response:i});return i}catch(i){throw r&&await this.runCallbacks("fetchDidFail",{error:i,event:t,originalRequest:r.clone(),request:n.clone()}),i}}async fetchAndCachePut(e){const t=await this.fetch(e),s=t.clone();return this.waitUntil(this.cachePut(e,s)),t}async cacheMatch(e){const t=y(e);let s;const{cacheName:r,matchOptions:n}=this._strategy,i=await this.getCacheKey(t,"read"),c=Object.assign(Object.assign({},n),{cacheName:r});s=await caches.match(i,c);for(const o of this.iterateCallbacks("cachedResponseWillBeUsed"))s=await o({cacheName:r,matchOptions:n,cachedResponse:s,request:i,event:this.event})||void 0;return s}async cachePut(e,t){const s=y(e);await j(0);const r=await this.getCacheKey(s,"write");if(!t)throw new l("cache-put-with-no-response",{url:$(r.url)});const n=await this._ensureResponseSafeToCache(t);if(!n)return!1;const{cacheName:i,matchOptions:c}=this._strategy,o=await self.caches.open(i),h=this.hasCallback("cacheDidUpdate"),g=h?await F(o,r.clone(),["__WB_REVISION__"],c):null;try{await o.put(r,h?n.clone():n)}catch(u){if(u instanceof Error)throw u.name==="QuotaExceededError"&&await B(),u}for(const u of this.iterateCallbacks("cacheDidUpdate"))await u({cacheName:i,oldResponse:g,newResponse:n.clone(),request:r,event:this.event});return!0}async getCacheKey(e,t){const s=`${e.url} | ${t}`;if(!this._cacheKeys[s]){let r=e;for(const n of this.iterateCallbacks("cacheKeyWillBeUsed"))r=y(await n({mode:t,request:r,event:this.event,params:this.params}));this._cacheKeys[s]=r}return this._cacheKeys[s]}hasCallback(e){for(const t of this._strategy.plugins)if(e in t)return!0;return!1}async runCallbacks(e,t){for(const s of this.iterateCallbacks(e))await s(t)}*iterateCallbacks(e){for(const t of this._strategy.plugins)if(typeof t[e]=="function"){const s=this._pluginStateMap.get(t);yield n=>{const i=Object.assign(Object.assign({},n),{state:s});return t[e](i)}}}waitUntil(e){return this._extendLifetimePromises.push(e),e}async doneWaiting(){let e;for(;e=this._extendLifetimePromises.shift();)await e}destroy(){this._handlerDeferred.resolve(null)}async _ensureResponseSafeToCache(e){let t=e,s=!1;for(const r of this.iterateCallbacks("cacheWillUpdate"))if(t=await r({request:this.request,response:t,event:this.event})||void 0,s=!0,!t)break;return s||t&&t.status!==200&&(t=void 0),t}}class N{constructor(e={}){this.cacheName=U.getRuntimeName(e.cacheName),this.plugins=e.plugins||[],this.fetchOptions=e.fetchOptions,this.matchOptions=e.matchOptions}handle(e){const[t]=this.handleAll(e);return t}handleAll(e){e instanceof FetchEvent&&(e={event:e,request:e.request});const t=e.event,s=typeof e.request=="string"?new Request(e.request):e.request,r="params"in e?e.params:void 0,n=new Z(this,{event:t,request:s,params:r}),i=this._getResponse(n,s,t),c=this._awaitComplete(i,n,s,t);return[i,c]}async _getResponse(e,t,s){await e.runCallbacks("handlerWillStart",{event:s,request:t});let r;try{if(r=await this._handle(t,e),!r||r.type==="error")throw new l("no-response",{url:t.url})}catch(n){if(n instanceof Error){for(const i of e.iterateCallbacks("handlerDidError"))if(r=await i({error:n,event:s,request:t}),r)break}if(!r)throw n}for(const n of e.iterateCallbacks("handlerWillRespond"))r=await n({event:s,request:t,response:r});return r}async _awaitComplete(e,t,s,r){let n,i;try{n=await e}catch{}try{await t.runCallbacks("handlerDidRespond",{event:r,request:s,response:n}),await t.doneWaiting()}catch(c){c instanceof Error&&(i=c)}if(await t.runCallbacks("handlerDidComplete",{event:r,request:s,response:n,error:i}),t.destroy(),i)throw i}}class d extends N{constructor(e={}){e.cacheName=U.getPrecacheName(e.cacheName),super(e),this._fallbackToNetwork=e.fallbackToNetwork!==!1,this.plugins.push(d.copyRedirectedCacheableResponsesPlugin)}async _handle(e,t){const s=await t.cacheMatch(e);return s||(t.event&&t.event.type==="install"?await this._handleInstall(e,t):await this._handleFetch(e,t))}async _handleFetch(e,t){let s;const r=t.params||{};if(this._fallbackToNetwork){const n=r.integrity,i=e.integrity,c=!i||i===n;s=await t.fetch(new Request(e,{integrity:e.mode!=="no-cors"?i||n:void 0})),n&&c&&e.mode!=="no-cors"&&(this._useDefaultCacheabilityPluginIfNeeded(),await t.cachePut(e,s.clone()))}else throw new l("missing-precache-entry",{cacheName:this.cacheName,url:e.url});return s}async _handleInstall(e,t){this._useDefaultCacheabilityPluginIfNeeded();const s=await t.fetch(e);if(!await t.cachePut(e,s.clone()))throw new l("bad-precaching-response",{url:e.url,status:s.status});return s}_useDefaultCacheabilityPluginIfNeeded(){let e=null,t=0;for(const[s,r]of this.plugins.entries())r!==d.copyRedirectedCacheableResponsesPlugin&&(r===d.defaultPrecacheCacheabilityPlugin&&(e=s),r.cacheWillUpdate&&t++);t===0?this.plugins.push(d.defaultPrecacheCacheabilityPlugin):t>1&&e!==null&&this.plugins.splice(e,1)}}d.defaultPrecacheCacheabilityPlugin={async cacheWillUpdate({response:a}){return!a||a.status>=400?null:a}};d.copyRedirectedCacheableResponsesPlugin={async cacheWillUpdate({response:a}){return a.redirected?await G(a):a}};class ee{constructor({cacheName:e,plugins:t=[],fallbackToNetwork:s=!0}={}){this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map,this._strategy=new d({cacheName:U.getPrecacheName(e),plugins:[...t,new Y({precacheController:this})],fallbackToNetwork:s}),this.install=this.install.bind(this),this.activate=this.activate.bind(this)}get strategy(){return this._strategy}precache(e){this.addToCacheList(e),this._installAndActiveListenersAdded||(self.addEventListener("install",this.install),self.addEventListener("activate",this.activate),this._installAndActiveListenersAdded=!0)}addToCacheList(e){const t=[];for(const s of e){typeof s=="string"?t.push(s):s&&s.revision===void 0&&t.push(s.url);const{cacheKey:r,url:n}=J(s),i=typeof s!="string"&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==r)throw new l("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:r});if(typeof s!="string"&&s.integrity){if(this._cacheKeysToIntegrities.has(r)&&this._cacheKeysToIntegrities.get(r)!==s.integrity)throw new l("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(r,s.integrity)}if(this._urlsToCacheKeys.set(n,r),this._urlsToCacheModes.set(n,i),t.length>0){const c=`Workbox is precaching URLs without revision info: ${t.join(", ")}
This is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(c)}}}install(e){return I(e,async()=>{const t=new X;this.strategy.plugins.push(t);for(const[n,i]of this._urlsToCacheKeys){const c=this._cacheKeysToIntegrities.get(i),o=this._urlsToCacheModes.get(n),h=new Request(n,{integrity:c,cache:o,credentials:"same-origin"});await Promise.all(this.strategy.handleAll({params:{cacheKey:i},request:h,event:e}))}const{updatedURLs:s,notUpdatedURLs:r}=t;return{updatedURLs:s,notUpdatedURLs:r}})}activate(e){return I(e,async()=>{const t=await self.caches.open(this.strategy.cacheName),s=await t.keys(),r=new Set(this._urlsToCacheKeys.values()),n=[];for(const i of s)r.has(i.url)||(await t.delete(i),n.push(i.url));return{deletedURLs:n}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}getIntegrityForCacheKey(e){return this._cacheKeysToIntegrities.get(e)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s)return(await self.caches.open(this.strategy.cacheName)).match(s)}createHandlerBoundToURL(e){const t=this.getCacheKeyForURL(e);if(!t)throw new l("non-precached-url",{url:e});return s=>(s.request=new Request(e),s.params=Object.assign({cacheKey:t},s.params),this.strategy.handle(s))}}let k;const R=()=>(k||(k=new ee),k);try{self["workbox:routing:7.0.0"]&&_()}catch{}const x="GET",m=a=>a&&typeof a=="object"?a:{handle:a};class p{constructor(e,t,s=x){this.handler=m(t),this.match=e,this.method=s}setCatchHandler(e){this.catchHandler=m(e)}}class te extends p{constructor(e,t,s){const r=({url:n})=>{const i=e.exec(n.href);if(i&&!(n.origin!==location.origin&&i.index!==0))return i.slice(1)};super(r,t,s)}}class se{constructor(){this._routes=new Map,this._defaultHandlerMap=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&e.data.type==="CACHE_URLS"){const{payload:t}=e.data,s=Promise.all(t.urlsToCache.map(r=>{typeof r=="string"&&(r=[r]);const n=new Request(...r);return this.handleRequest({request:n,event:e})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return;const r=s.origin===location.origin,{params:n,route:i}=this.findMatchingRoute({event:t,request:e,sameOrigin:r,url:s});let c=i&&i.handler;const o=e.method;if(!c&&this._defaultHandlerMap.has(o)&&(c=this._defaultHandlerMap.get(o)),!c)return;let h;try{h=c.handle({url:s,request:e,event:t,params:n})}catch(u){h=Promise.reject(u)}const g=i&&i.catchHandler;return h instanceof Promise&&(this._catchHandler||g)&&(h=h.catch(async u=>{if(g)try{return await g.handle({url:s,request:e,event:t,params:n})}catch(P){P instanceof Error&&(u=P)}if(this._catchHandler)return this._catchHandler.handle({url:s,request:e,event:t});throw u})),h}findMatchingRoute({url:e,sameOrigin:t,request:s,event:r}){const n=this._routes.get(s.method)||[];for(const i of n){let c;const o=i.match({url:e,sameOrigin:t,request:s,event:r});if(o)return c=o,(Array.isArray(c)&&c.length===0||o.constructor===Object&&Object.keys(o).length===0||typeof o=="boolean")&&(c=void 0),{route:i,params:c}}return{}}setDefaultHandler(e,t=x){this._defaultHandlerMap.set(t,m(e))}setCatchHandler(e){this._catchHandler=m(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new l("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(t>-1)this._routes.get(e.method).splice(t,1);else throw new l("unregister-route-route-not-registered")}}let w;const ae=()=>(w||(w=new se,w.addFetchListener(),w.addCacheListener()),w);function E(a,e,t){let s;if(typeof a=="string"){const n=new URL(a,location.href),i=({url:c})=>c.href===n.href;s=new p(i,e,t)}else if(a instanceof RegExp)s=new te(a,e,t);else if(typeof a=="function")s=new p(a,e,t);else if(a instanceof p)s=a;else throw new l("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});return ae().registerRoute(s),s}function re(a,e=[]){for(const t of[...a.searchParams.keys()])e.some(s=>s.test(t))&&a.searchParams.delete(t);return a}function*ne(a,{ignoreURLParametersMatching:e=[/^utm_/,/^fbclid$/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:r}={}){const n=new URL(a,location.href);n.hash="",yield n.href;const i=re(n,e);if(yield i.href,t&&i.pathname.endsWith("/")){const c=new URL(i.href);c.pathname+=t,yield c.href}if(s){const c=new URL(i.href);c.pathname+=".html",yield c.href}if(r){const c=r({url:n});for(const o of c)yield o.href}}class ie extends p{constructor(e,t){const s=({request:r})=>{const n=e.getURLsToCacheKeys();for(const i of ne(r.url,t)){const c=n.get(i);if(c){const o=e.getIntegrityForCacheKey(c);return{cacheKey:c,integrity:o}}}};super(s,e.strategy)}}function ce(a){const e=R(),t=new ie(e,a);E(t)}function T(a){return R().getCacheKeyForURL(a)}function D(a){return R().matchPrecache(a)}function oe(a){R().precache(a)}function le(a,e){oe(a),ce(e)}class he extends p{constructor(e,{allowlist:t=[/./],denylist:s=[]}={}){super(r=>this._match(r),e),this._allowlist=t,this._denylist=s}_match({url:e,request:t}){if(t&&t.mode!=="navigate")return!1;const s=e.pathname+e.search;for(const r of this._denylist)if(r.test(s))return!1;return!!this._allowlist.some(r=>r.test(s))}}const ue={cacheWillUpdate:async({response:a})=>a.status===200||a.status===0?a:null};class fe extends N{constructor(e={}){super(e),this.plugins.some(t=>"cacheWillUpdate"in t)||this.plugins.unshift(ue),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){const s=[],r=[];let n;if(this._networkTimeoutSeconds){const{id:o,promise:h}=this._getTimeoutPromise({request:e,logs:s,handler:t});n=o,r.push(h)}const i=this._getNetworkPromise({timeoutId:n,request:e,logs:s,handler:t});r.push(i);const c=await t.waitUntil((async()=>await t.waitUntil(Promise.race(r))||await i)());if(!c)throw new l("no-response",{url:e.url});return c}_getTimeoutPromise({request:e,logs:t,handler:s}){let r;return{promise:new Promise(i=>{r=setTimeout(async()=>{i(await s.cacheMatch(e))},this._networkTimeoutSeconds*1e3)}),id:r}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,handler:r}){let n,i;try{i=await r.fetchAndCachePut(t)}catch(c){c instanceof Error&&(n=c)}return e&&clearTimeout(e),(n||!i)&&(i=await r.cacheMatch(t)),i}}class de extends N{constructor(e={}){super(e),this._networkTimeoutSeconds=e.networkTimeoutSeconds||0}async _handle(e,t){let s,r;try{const n=[t.fetch(e)];if(this._networkTimeoutSeconds){const i=j(this._networkTimeoutSeconds*1e3);n.push(i)}if(r=await Promise.race(n),!r)throw new Error(`Timed out the network response after ${this._networkTimeoutSeconds} seconds.`)}catch(n){n instanceof Error&&(s=n)}if(!r)throw new l("no-response",{url:e.url,error:s});return r}}importScripts("sw-runtime-resources-precache.js");self.skipWaiting();z();let C=[{url:".",revision:"9f5af08c57b7cb3fcd215fc0d67a320d"},{url:"VAADIN/build/FlowBootstrap-feff2646.js",revision:"86c7b60228bd60b898bd22f12bb25dd6"},{url:"VAADIN/build/FlowClient-d5d5e377.js",revision:"3759ac769d45708784fa1ea28709029d"},{url:"VAADIN/build/generated-flow-imports-2e53cc39.js",revision:"ffedebc7449bf9777358fbf9e6c66f5a"},{url:"VAADIN/build/indexhtml-ed7ddbff.js",revision:"7e7a307fb85deb55e82450520541d202"},{url:"VAADIN/build/vaadin-app-layout-37492a04-8bb8b99a.js",revision:"0695e42cc9878329a8020865a9eaa23e"},{url:"VAADIN/build/vaadin-avatar-7047be31-2dce0fdf.js",revision:"a1fa11dc70694f625a368b9c4fefecbd"},{url:"VAADIN/build/vaadin-big-decimal-field-b42c1de1-441e68d2.js",revision:"646c8f52418076d3d81c02417f4aa487"},{url:"VAADIN/build/vaadin-button-79ad9d5f-93ab654f.js",revision:"c0d8c6c5bd5954ddae2dd05d3fe9f8e2"},{url:"VAADIN/build/vaadin-checkbox-13797fc9-7088358c.js",revision:"4e1a4cc5aee0c516f1d7d1aa7c29d210"},{url:"VAADIN/build/vaadin-checkbox-group-a9a9e85d-efd7bf91.js",revision:"b3b58b3352dd1c94c3d6278f2b2f4b5c"},{url:"VAADIN/build/vaadin-combo-box-9046f78f-8e48caea.js",revision:"db5dbb2aea7945d41e10523560416849"},{url:"VAADIN/build/vaadin-email-field-da851bcb-19a96745.js",revision:"8f65d672b1cf4a612e77ea9531fb7e02"},{url:"VAADIN/build/vaadin-horizontal-layout-f7b1ab51-73664eb1.js",revision:"bd1aadaf84c0cfeaade7d9eb15831a46"},{url:"VAADIN/build/vaadin-integer-field-6e2954cf-e6d828bc.js",revision:"b3e649c64f1b096d98b167fb85fb16b8"},{url:"VAADIN/build/vaadin-menu-bar-be33385c-347b906a.js",revision:"d2684357690f92485b1d84e3302daf2b"},{url:"VAADIN/build/vaadin-mobile-drag-drop-dc77d352.js",revision:"7db9aabaecd5d6ede2149ad0fe107f3c"},{url:"VAADIN/build/vaadin-number-field-31df11f5-f6dc8cf2.js",revision:"14ca8457bb658aa222b12a88d6f47f26"},{url:"VAADIN/build/vaadin-password-field-49ffb113-79ba4eaf.js",revision:"f19e8e90bb86fb15eaa5b880416ba9a7"},{url:"VAADIN/build/vaadin-progress-bar-3b53bb70-b4d90018.js",revision:"843627ce6259d38d9026ad4e303b8251"},{url:"VAADIN/build/vaadin-radio-group-4a6e2cf4-fd5d0e5e.js",revision:"bfe52441fa34cffa869e5f00e6761979"},{url:"VAADIN/build/vaadin-scroller-35e68818-8e4b2c31.js",revision:"68262f31a035621b75fbabe90bfa020b"},{url:"VAADIN/build/vaadin-select-5d6ab45b-c032499c.js",revision:"f5e67240d722ca430c35312e86f0cf3e"},{url:"VAADIN/build/vaadin-split-layout-10c9713b-f69b0bba.js",revision:"2941f99f3bbf0c58f839015155d15d64"},{url:"VAADIN/build/vaadin-text-area-41c5f60c-273f9553.js",revision:"754c4d0b06f25f80e19c8f8225a43ee0"},{url:"VAADIN/build/vaadin-text-field-e82c445d-b4a23b50.js",revision:"214fd9e3f0b3d62e2ea112db073fa08b"},{url:"VAADIN/build/vaadin-time-picker-2fa5314f-5ea5219e.js",revision:"ac9b899eac76ce39c6697f9808d85fdc"},{url:"VAADIN/build/vaadin-vertical-layout-ff73c403-ae022399.js",revision:"4d083b36d1d8289086f27b0a171f9eb3"},{url:"VAADIN/build/vaadin-virtual-list-62d4499a-76d73a99.js",revision:"03d4ca1990ac73d274dc671fd28468d6"}],pe=C.findIndex(a=>a.url===".")>=0;var K;(K=self.additionalManifestEntries)!=null&&K.length&&C.push(...self.additionalManifestEntries.filter(a=>a.url!=="."||!pe));const ge=".",be=new URL(self.registration.scope);async function we(a){const e=await a.text();return new Response(e.replace(/<base\s+href=[^>]*>/,`<base href="${self.registration.scope}">`),a)}function ye(a){return C.some(e=>T(e.url)===T(`${a}`))}let A=!1;function O(){return{async fetchDidFail(){A=!0},async fetchDidSucceed({response:a}){return A=!1,a}}}const me=new de({plugins:[O()]});new fe({plugins:[O()]});E(new he(async a=>{async function e(){const s=await D(ge);return s?we(s):void 0}function t(){return a.url.pathname===be.pathname?e():ye(a.url)?D(a.request):e()}if(!self.navigator.onLine){const s=await t();if(s)return s}try{return await me.handle(a)}catch(s){const r=await t();if(r)return r;throw s}}));le(C);self.addEventListener("message",a=>{var e;typeof a.data!="object"||!("method"in a.data)||a.data.method==="Vaadin.ServiceWorker.isConnectionLost"&&"id"in a.data&&((e=a.source)==null||e.postMessage({id:a.data.id,result:A},[]))});
