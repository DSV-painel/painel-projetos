(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))r(s);new MutationObserver(s=>{for(const o of s)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&r(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const o={};return s.integrity&&(o.integrity=s.integrity),s.referrerPolicy&&(o.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?o.credentials="include":s.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(s){if(s.ep)return;s.ep=!0;const o=t(s);fetch(s.href,o)}})();const he={activeTab:"dashboard",activeProjectId:null,activeProject:null,isDirty:!1,sidebarCollapsed:!1,currentUser:{uid:"usr_01_dist_gestor",nome:"Carlos Silva (DIST)",email:"carlos.silva@detran.sp.gov.br",perfil:"gestor_dist"}},gt=new Map;function _t(n,e){return gt.has(n)||gt.set(n,new Set),gt.get(n).add(e),()=>gt.get(n).delete(e)}function or(n,e){gt.has(n)&&gt.get(n).forEach(t=>{try{t(e,he)}catch(r){console.error(`Erro no listener de ${n}:`,r)}}),n!=="change"&&gt.has("change")&&gt.get("change").forEach(t=>{try{t(he)}catch(r){console.error("Erro no listener geral 'change':",r)}})}function oe(){return{...he}}function Ze(n){he.activeProject=n,he.activeProjectId=n?n.id:null,or("projectChange",n)}function Ot(n){he.activeTab!==n&&(he.activeTab=n,he.isDirty=!1,or("tabChange",n))}function De(n){he.isDirty!==n&&(he.isDirty=!!n,or("dirtyChange",he.isDirty))}function uh(){he.sidebarCollapsed=!he.sidebarCollapsed,or("sidebarChange",he.sidebarCollapsed)}function dh(n){he.currentUser={...n},or("userChange",he.currentUser)}function ws(){var n,e;return((n=he.currentUser)==null?void 0:n.perfil)==="admin"||((e=he.currentUser)==null?void 0:e.perfil)==="gestor_dist"}var Ha={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const hc=function(n){const e=[];let t=0;for(let r=0;r<n.length;r++){let s=n.charCodeAt(r);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&r+1<n.length&&(n.charCodeAt(r+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++r)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},hh=function(n){const e=[];let t=0,r=0;for(;t<n.length;){const s=n[t++];if(s<128)e[r++]=String.fromCharCode(s);else if(s>191&&s<224){const o=n[t++];e[r++]=String.fromCharCode((s&31)<<6|o&63)}else if(s>239&&s<365){const o=n[t++],a=n[t++],c=n[t++],u=((s&7)<<18|(o&63)<<12|(a&63)<<6|c&63)-65536;e[r++]=String.fromCharCode(55296+(u>>10)),e[r++]=String.fromCharCode(56320+(u&1023))}else{const o=n[t++],a=n[t++];e[r++]=String.fromCharCode((s&15)<<12|(o&63)<<6|a&63)}}return e.join("")},pc={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,r=[];for(let s=0;s<n.length;s+=3){const o=n[s],a=s+1<n.length,c=a?n[s+1]:0,u=s+2<n.length,h=u?n[s+2]:0,f=o>>2,v=(o&3)<<4|c>>4;let E=(c&15)<<2|h>>6,T=h&63;u||(T=64,a||(E=64)),r.push(t[f],t[v],t[E],t[T])}return r.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(hc(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):hh(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,r=[];for(let s=0;s<n.length;){const o=t[n.charAt(s++)],c=s<n.length?t[n.charAt(s)]:0;++s;const h=s<n.length?t[n.charAt(s)]:64;++s;const v=s<n.length?t[n.charAt(s)]:64;if(++s,o==null||c==null||h==null||v==null)throw new ph;const E=o<<2|c>>4;if(r.push(E),h!==64){const T=c<<4&240|h>>2;if(r.push(T),v!==64){const R=h<<6&192|v;r.push(R)}}}return r},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class ph extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const fh=function(n){const e=hc(n);return pc.encodeByteArray(e,!0)},os=function(n){return fh(n).replace(/\./g,"")},fc=function(n){try{return pc.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mh(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gh=()=>mh().__FIREBASE_DEFAULTS__,vh=()=>{if(typeof process>"u"||typeof Ha>"u")return;const n=Ha.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},yh=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&fc(n[1]);return e&&JSON.parse(e)},As=()=>{try{return gh()||vh()||yh()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},mc=n=>{var e,t;return(t=(e=As())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},_h=n=>{const e=mc(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const r=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),r]:[e.substring(0,t),r]},gc=()=>{var n;return(n=As())===null||n===void 0?void 0:n.config},vc=n=>{var e;return(e=As())===null||e===void 0?void 0:e[`_${n}`]};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bh{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,r)=>{t?this.reject(t):this.resolve(r),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,r))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Eh(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},r=e||"demo-project",s=n.iat||0,o=n.sub||n.user_id;if(!o)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const a=Object.assign({iss:`https://securetoken.google.com/${r}`,aud:r,iat:s,exp:s+3600,auth_time:s,sub:o,user_id:o,firebase:{sign_in_provider:"custom",identities:{}}},n);return[os(JSON.stringify(t)),os(JSON.stringify(a)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Pe(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ih(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Pe())}function Th(){var n;const e=(n=As())===null||n===void 0?void 0:n.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function wh(){return typeof navigator<"u"&&navigator.userAgent==="Cloudflare-Workers"}function Ah(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function Sh(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Rh(){const n=Pe();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Ph(){return!Th()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function Ch(){try{return typeof indexedDB=="object"}catch{return!1}}function xh(){return new Promise((n,e)=>{try{let t=!0;const r="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(r);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(r),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var o;e(((o=s.error)===null||o===void 0?void 0:o.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dh="FirebaseError";class ot extends Error{constructor(e,t,r){super(t),this.code=e,this.customData=r,this.name=Dh,Object.setPrototypeOf(this,ot.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,ar.prototype.create)}}class ar{constructor(e,t,r){this.service=e,this.serviceName=t,this.errors=r}create(e,...t){const r=t[0]||{},s=`${this.service}/${e}`,o=this.errors[e],a=o?kh(o,r):"Error",c=`${this.serviceName}: ${a} (${s}).`;return new ot(s,c,r)}}function kh(n,e){return n.replace(Vh,(t,r)=>{const s=e[r];return s!=null?String(s):`<${r}?>`})}const Vh=/\{\$([^}]+)}/g;function Nh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function as(n,e){if(n===e)return!0;const t=Object.keys(n),r=Object.keys(e);for(const s of t){if(!r.includes(s))return!1;const o=n[s],a=e[s];if(Ga(o)&&Ga(a)){if(!as(o,a))return!1}else if(o!==a)return!1}for(const s of r)if(!t.includes(s))return!1;return!0}function Ga(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lr(n){const e=[];for(const[t,r]of Object.entries(n))Array.isArray(r)?r.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(r));return e.length?"&"+e.join("&"):""}function Oh(n,e){const t=new Lh(n,e);return t.subscribe.bind(t)}class Lh{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(r=>{this.error(r)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,r){let s;if(e===void 0&&t===void 0&&r===void 0)throw new Error("Missing Observer.");Mh(e,["next","error","complete"])?s=e:s={next:e,error:t,complete:r},s.next===void 0&&(s.next=di),s.error===void 0&&(s.error=di),s.complete===void 0&&(s.complete=di);const o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?s.error(this.finalError):s.complete()}catch{}}),this.observers.push(s),o}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(r){typeof console<"u"&&console.error&&console.error(r)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function Mh(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function di(){}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Le(n){return n&&n._delegate?n._delegate:n}class Ut{constructor(e,t,r){this.name=e,this.instanceFactory=t,this.type=r,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const kt="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jh{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const r=new bh;if(this.instancesDeferred.set(t,r),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&r.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const r=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(r)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:r})}catch(o){if(s)return null;throw o}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(Fh(e))try{this.getOrInitializeService({instanceIdentifier:kt})}catch{}for(const[t,r]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const o=this.getOrInitializeService({instanceIdentifier:s});r.resolve(o)}catch{}}}}clearInstance(e=kt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=kt){return this.instances.has(e)}getOptions(e=kt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,r=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(r))throw Error(`${this.name}(${r}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:r,options:t});for(const[o,a]of this.instancesDeferred.entries()){const c=this.normalizeInstanceIdentifier(o);r===c&&a.resolve(s)}return s}onInit(e,t){var r;const s=this.normalizeInstanceIdentifier(t),o=(r=this.onInitCallbacks.get(s))!==null&&r!==void 0?r:new Set;o.add(e),this.onInitCallbacks.set(s,o);const a=this.instances.get(s);return a&&e(a,s),()=>{o.delete(e)}}invokeOnInitCallbacks(e,t){const r=this.onInitCallbacks.get(t);if(r)for(const s of r)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let r=this.instances.get(e);if(!r&&this.component&&(r=this.component.instanceFactory(this.container,{instanceIdentifier:Uh(e),options:t}),this.instances.set(e,r),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(r,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,r)}catch{}return r||null}normalizeInstanceIdentifier(e=kt){return this.component?this.component.multipleInstances?e:kt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function Uh(n){return n===kt?void 0:n}function Fh(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $h{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new jh(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var W;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(W||(W={}));const qh={debug:W.DEBUG,verbose:W.VERBOSE,info:W.INFO,warn:W.WARN,error:W.ERROR,silent:W.SILENT},Bh=W.INFO,zh={[W.DEBUG]:"log",[W.VERBOSE]:"log",[W.INFO]:"info",[W.WARN]:"warn",[W.ERROR]:"error"},Hh=(n,e,...t)=>{if(e<n.logLevel)return;const r=new Date().toISOString(),s=zh[e];if(s)console[s](`[${r}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Ji{constructor(e){this.name=e,this._logLevel=Bh,this._logHandler=Hh,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in W))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?qh[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,W.DEBUG,...e),this._logHandler(this,W.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,W.VERBOSE,...e),this._logHandler(this,W.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,W.INFO,...e),this._logHandler(this,W.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,W.WARN,...e),this._logHandler(this,W.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,W.ERROR,...e),this._logHandler(this,W.ERROR,...e)}}const Gh=(n,e)=>e.some(t=>n instanceof t);let Wa,Ka;function Wh(){return Wa||(Wa=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Kh(){return Ka||(Ka=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const yc=new WeakMap,Ai=new WeakMap,_c=new WeakMap,hi=new WeakMap,Yi=new WeakMap;function Qh(n){const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("success",o),n.removeEventListener("error",a)},o=()=>{t(bt(n.result)),s()},a=()=>{r(n.error),s()};n.addEventListener("success",o),n.addEventListener("error",a)});return e.then(t=>{t instanceof IDBCursor&&yc.set(t,n)}).catch(()=>{}),Yi.set(e,n),e}function Jh(n){if(Ai.has(n))return;const e=new Promise((t,r)=>{const s=()=>{n.removeEventListener("complete",o),n.removeEventListener("error",a),n.removeEventListener("abort",a)},o=()=>{t(),s()},a=()=>{r(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",o),n.addEventListener("error",a),n.addEventListener("abort",a)});Ai.set(n,e)}let Si={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Ai.get(n);if(e==="objectStoreNames")return n.objectStoreNames||_c.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return bt(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Yh(n){Si=n(Si)}function Xh(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const r=n.call(pi(this),e,...t);return _c.set(r,e.sort?e.sort():[e]),bt(r)}:Kh().includes(n)?function(...e){return n.apply(pi(this),e),bt(yc.get(this))}:function(...e){return bt(n.apply(pi(this),e))}}function Zh(n){return typeof n=="function"?Xh(n):(n instanceof IDBTransaction&&Jh(n),Gh(n,Wh())?new Proxy(n,Si):n)}function bt(n){if(n instanceof IDBRequest)return Qh(n);if(hi.has(n))return hi.get(n);const e=Zh(n);return e!==n&&(hi.set(n,e),Yi.set(e,n)),e}const pi=n=>Yi.get(n);function ep(n,e,{blocked:t,upgrade:r,blocking:s,terminated:o}={}){const a=indexedDB.open(n,e),c=bt(a);return r&&a.addEventListener("upgradeneeded",u=>{r(bt(a.result),u.oldVersion,u.newVersion,bt(a.transaction),u)}),t&&a.addEventListener("blocked",u=>t(u.oldVersion,u.newVersion,u)),c.then(u=>{o&&u.addEventListener("close",()=>o()),s&&u.addEventListener("versionchange",h=>s(h.oldVersion,h.newVersion,h))}).catch(()=>{}),c}const tp=["get","getKey","getAll","getAllKeys","count"],np=["put","add","delete","clear"],fi=new Map;function Qa(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(fi.get(e))return fi.get(e);const t=e.replace(/FromIndex$/,""),r=e!==t,s=np.includes(t);if(!(t in(r?IDBIndex:IDBObjectStore).prototype)||!(s||tp.includes(t)))return;const o=async function(a,...c){const u=this.transaction(a,s?"readwrite":"readonly");let h=u.store;return r&&(h=h.index(c.shift())),(await Promise.all([h[t](...c),s&&u.done]))[0]};return fi.set(e,o),o}Yh(n=>({...n,get:(e,t,r)=>Qa(e,t)||n.get(e,t,r),has:(e,t)=>!!Qa(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class rp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(sp(t)){const r=t.getImmediate();return`${r.library}/${r.version}`}else return null}).filter(t=>t).join(" ")}}function sp(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const Ri="@firebase/app",Ja="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const tt=new Ji("@firebase/app"),ip="@firebase/app-compat",op="@firebase/analytics-compat",ap="@firebase/analytics",lp="@firebase/app-check-compat",cp="@firebase/app-check",up="@firebase/auth",dp="@firebase/auth-compat",hp="@firebase/database",pp="@firebase/data-connect",fp="@firebase/database-compat",mp="@firebase/functions",gp="@firebase/functions-compat",vp="@firebase/installations",yp="@firebase/installations-compat",_p="@firebase/messaging",bp="@firebase/messaging-compat",Ep="@firebase/performance",Ip="@firebase/performance-compat",Tp="@firebase/remote-config",wp="@firebase/remote-config-compat",Ap="@firebase/storage",Sp="@firebase/storage-compat",Rp="@firebase/firestore",Pp="@firebase/vertexai-preview",Cp="@firebase/firestore-compat",xp="firebase",Dp="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pi="[DEFAULT]",kp={[Ri]:"fire-core",[ip]:"fire-core-compat",[ap]:"fire-analytics",[op]:"fire-analytics-compat",[cp]:"fire-app-check",[lp]:"fire-app-check-compat",[up]:"fire-auth",[dp]:"fire-auth-compat",[hp]:"fire-rtdb",[pp]:"fire-data-connect",[fp]:"fire-rtdb-compat",[mp]:"fire-fn",[gp]:"fire-fn-compat",[vp]:"fire-iid",[yp]:"fire-iid-compat",[_p]:"fire-fcm",[bp]:"fire-fcm-compat",[Ep]:"fire-perf",[Ip]:"fire-perf-compat",[Tp]:"fire-rc",[wp]:"fire-rc-compat",[Ap]:"fire-gcs",[Sp]:"fire-gcs-compat",[Rp]:"fire-fst",[Cp]:"fire-fst-compat",[Pp]:"fire-vertex","fire-js":"fire-js",[xp]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Yn=new Map,Vp=new Map,Ci=new Map;function Ya(n,e){try{n.container.addComponent(e)}catch(t){tt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function on(n){const e=n.name;if(Ci.has(e))return tt.debug(`There were multiple attempts to register component ${e}.`),!1;Ci.set(e,n);for(const t of Yn.values())Ya(t,n);for(const t of Vp.values())Ya(t,n);return!0}function Xi(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}function vt(n){return n.settings!==void 0}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Np={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},Et=new ar("app","Firebase",Np);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Op{constructor(e,t,r){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=r,this.container.addComponent(new Ut("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw Et.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mn=Dp;function bc(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const r=Object.assign({name:Pi,automaticDataCollectionEnabled:!1},e),s=r.name;if(typeof s!="string"||!s)throw Et.create("bad-app-name",{appName:String(s)});if(t||(t=gc()),!t)throw Et.create("no-options");const o=Yn.get(s);if(o){if(as(t,o.options)&&as(r,o.config))return o;throw Et.create("duplicate-app",{appName:s})}const a=new $h(s);for(const u of Ci.values())a.addComponent(u);const c=new Op(t,r,a);return Yn.set(s,c),c}function Zi(n=Pi){const e=Yn.get(n);if(!e&&n===Pi&&gc())return bc();if(!e)throw Et.create("no-app",{appName:n});return e}function Lp(){return Array.from(Yn.values())}function It(n,e,t){var r;let s=(r=kp[n])!==null&&r!==void 0?r:n;t&&(s+=`-${t}`);const o=s.match(/\s|\//),a=e.match(/\s|\//);if(o||a){const c=[`Unable to register library "${s}" with version "${e}":`];o&&c.push(`library name "${s}" contains illegal characters (whitespace or "/")`),o&&a&&c.push("and"),a&&c.push(`version name "${e}" contains illegal characters (whitespace or "/")`),tt.warn(c.join(" "));return}on(new Ut(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mp="firebase-heartbeat-database",jp=1,Xn="firebase-heartbeat-store";let mi=null;function Ec(){return mi||(mi=ep(Mp,jp,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(Xn)}catch(t){console.warn(t)}}}}).catch(n=>{throw Et.create("idb-open",{originalErrorMessage:n.message})})),mi}async function Up(n){try{const t=(await Ec()).transaction(Xn),r=await t.objectStore(Xn).get(Ic(n));return await t.done,r}catch(e){if(e instanceof ot)tt.warn(e.message);else{const t=Et.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});tt.warn(t.message)}}}async function Xa(n,e){try{const r=(await Ec()).transaction(Xn,"readwrite");await r.objectStore(Xn).put(e,Ic(n)),await r.done}catch(t){if(t instanceof ot)tt.warn(t.message);else{const r=Et.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});tt.warn(r.message)}}}function Ic(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fp=1024,$p=30*24*60*60*1e3;class qp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new zp(t),this._heartbeatsCachePromise=this._storage.read().then(r=>(this._heartbeatsCache=r,r))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),o=Za();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===o||this._heartbeatsCache.heartbeats.some(a=>a.date===o)?void 0:(this._heartbeatsCache.heartbeats.push({date:o,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(a=>{const c=new Date(a.date).valueOf();return Date.now()-c<=$p}),this._storage.overwrite(this._heartbeatsCache))}catch(r){tt.warn(r)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=Za(),{heartbeatsToSend:r,unsentEntries:s}=Bp(this._heartbeatsCache.heartbeats),o=os(JSON.stringify({version:2,heartbeats:r}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),o}catch(t){return tt.warn(t),""}}}function Za(){return new Date().toISOString().substring(0,10)}function Bp(n,e=Fp){const t=[];let r=n.slice();for(const s of n){const o=t.find(a=>a.agent===s.agent);if(o){if(o.dates.push(s.date),el(t)>e){o.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),el(t)>e){t.pop();break}r=r.slice(1)}return{heartbeatsToSend:t,unsentEntries:r}}class zp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return Ch()?xh().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await Up(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Xa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return Xa(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function el(n){return os(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hp(n){on(new Ut("platform-logger",e=>new rp(e),"PRIVATE")),on(new Ut("heartbeat",e=>new qp(e),"PRIVATE")),It(Ri,Ja,n),It(Ri,Ja,"esm2017"),It("fire-js","")}Hp("");var Gp="firebase",Wp="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */It(Gp,Wp,"app");var tl=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var Lt,Tc;(function(){var n;/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/function e(b,m){function g(){}g.prototype=m.prototype,b.D=m.prototype,b.prototype=new g,b.prototype.constructor=b,b.C=function(_,I,w){for(var y=Array(arguments.length-2),se=2;se<arguments.length;se++)y[se-2]=arguments[se];return m.prototype[I].apply(_,y)}}function t(){this.blockSize=-1}function r(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.B=Array(this.blockSize),this.o=this.h=0,this.s()}e(r,t),r.prototype.s=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.o=this.h=0};function s(b,m,g){g||(g=0);var _=Array(16);if(typeof m=="string")for(var I=0;16>I;++I)_[I]=m.charCodeAt(g++)|m.charCodeAt(g++)<<8|m.charCodeAt(g++)<<16|m.charCodeAt(g++)<<24;else for(I=0;16>I;++I)_[I]=m[g++]|m[g++]<<8|m[g++]<<16|m[g++]<<24;m=b.g[0],g=b.g[1],I=b.g[2];var w=b.g[3],y=m+(w^g&(I^w))+_[0]+3614090360&4294967295;m=g+(y<<7&4294967295|y>>>25),y=w+(I^m&(g^I))+_[1]+3905402710&4294967295,w=m+(y<<12&4294967295|y>>>20),y=I+(g^w&(m^g))+_[2]+606105819&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(m^I&(w^m))+_[3]+3250441966&4294967295,g=I+(y<<22&4294967295|y>>>10),y=m+(w^g&(I^w))+_[4]+4118548399&4294967295,m=g+(y<<7&4294967295|y>>>25),y=w+(I^m&(g^I))+_[5]+1200080426&4294967295,w=m+(y<<12&4294967295|y>>>20),y=I+(g^w&(m^g))+_[6]+2821735955&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(m^I&(w^m))+_[7]+4249261313&4294967295,g=I+(y<<22&4294967295|y>>>10),y=m+(w^g&(I^w))+_[8]+1770035416&4294967295,m=g+(y<<7&4294967295|y>>>25),y=w+(I^m&(g^I))+_[9]+2336552879&4294967295,w=m+(y<<12&4294967295|y>>>20),y=I+(g^w&(m^g))+_[10]+4294925233&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(m^I&(w^m))+_[11]+2304563134&4294967295,g=I+(y<<22&4294967295|y>>>10),y=m+(w^g&(I^w))+_[12]+1804603682&4294967295,m=g+(y<<7&4294967295|y>>>25),y=w+(I^m&(g^I))+_[13]+4254626195&4294967295,w=m+(y<<12&4294967295|y>>>20),y=I+(g^w&(m^g))+_[14]+2792965006&4294967295,I=w+(y<<17&4294967295|y>>>15),y=g+(m^I&(w^m))+_[15]+1236535329&4294967295,g=I+(y<<22&4294967295|y>>>10),y=m+(I^w&(g^I))+_[1]+4129170786&4294967295,m=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(m^g))+_[6]+3225465664&4294967295,w=m+(y<<9&4294967295|y>>>23),y=I+(m^g&(w^m))+_[11]+643717713&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^m&(I^w))+_[0]+3921069994&4294967295,g=I+(y<<20&4294967295|y>>>12),y=m+(I^w&(g^I))+_[5]+3593408605&4294967295,m=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(m^g))+_[10]+38016083&4294967295,w=m+(y<<9&4294967295|y>>>23),y=I+(m^g&(w^m))+_[15]+3634488961&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^m&(I^w))+_[4]+3889429448&4294967295,g=I+(y<<20&4294967295|y>>>12),y=m+(I^w&(g^I))+_[9]+568446438&4294967295,m=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(m^g))+_[14]+3275163606&4294967295,w=m+(y<<9&4294967295|y>>>23),y=I+(m^g&(w^m))+_[3]+4107603335&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^m&(I^w))+_[8]+1163531501&4294967295,g=I+(y<<20&4294967295|y>>>12),y=m+(I^w&(g^I))+_[13]+2850285829&4294967295,m=g+(y<<5&4294967295|y>>>27),y=w+(g^I&(m^g))+_[2]+4243563512&4294967295,w=m+(y<<9&4294967295|y>>>23),y=I+(m^g&(w^m))+_[7]+1735328473&4294967295,I=w+(y<<14&4294967295|y>>>18),y=g+(w^m&(I^w))+_[12]+2368359562&4294967295,g=I+(y<<20&4294967295|y>>>12),y=m+(g^I^w)+_[5]+4294588738&4294967295,m=g+(y<<4&4294967295|y>>>28),y=w+(m^g^I)+_[8]+2272392833&4294967295,w=m+(y<<11&4294967295|y>>>21),y=I+(w^m^g)+_[11]+1839030562&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^m)+_[14]+4259657740&4294967295,g=I+(y<<23&4294967295|y>>>9),y=m+(g^I^w)+_[1]+2763975236&4294967295,m=g+(y<<4&4294967295|y>>>28),y=w+(m^g^I)+_[4]+1272893353&4294967295,w=m+(y<<11&4294967295|y>>>21),y=I+(w^m^g)+_[7]+4139469664&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^m)+_[10]+3200236656&4294967295,g=I+(y<<23&4294967295|y>>>9),y=m+(g^I^w)+_[13]+681279174&4294967295,m=g+(y<<4&4294967295|y>>>28),y=w+(m^g^I)+_[0]+3936430074&4294967295,w=m+(y<<11&4294967295|y>>>21),y=I+(w^m^g)+_[3]+3572445317&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^m)+_[6]+76029189&4294967295,g=I+(y<<23&4294967295|y>>>9),y=m+(g^I^w)+_[9]+3654602809&4294967295,m=g+(y<<4&4294967295|y>>>28),y=w+(m^g^I)+_[12]+3873151461&4294967295,w=m+(y<<11&4294967295|y>>>21),y=I+(w^m^g)+_[15]+530742520&4294967295,I=w+(y<<16&4294967295|y>>>16),y=g+(I^w^m)+_[2]+3299628645&4294967295,g=I+(y<<23&4294967295|y>>>9),y=m+(I^(g|~w))+_[0]+4096336452&4294967295,m=g+(y<<6&4294967295|y>>>26),y=w+(g^(m|~I))+_[7]+1126891415&4294967295,w=m+(y<<10&4294967295|y>>>22),y=I+(m^(w|~g))+_[14]+2878612391&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~m))+_[5]+4237533241&4294967295,g=I+(y<<21&4294967295|y>>>11),y=m+(I^(g|~w))+_[12]+1700485571&4294967295,m=g+(y<<6&4294967295|y>>>26),y=w+(g^(m|~I))+_[3]+2399980690&4294967295,w=m+(y<<10&4294967295|y>>>22),y=I+(m^(w|~g))+_[10]+4293915773&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~m))+_[1]+2240044497&4294967295,g=I+(y<<21&4294967295|y>>>11),y=m+(I^(g|~w))+_[8]+1873313359&4294967295,m=g+(y<<6&4294967295|y>>>26),y=w+(g^(m|~I))+_[15]+4264355552&4294967295,w=m+(y<<10&4294967295|y>>>22),y=I+(m^(w|~g))+_[6]+2734768916&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~m))+_[13]+1309151649&4294967295,g=I+(y<<21&4294967295|y>>>11),y=m+(I^(g|~w))+_[4]+4149444226&4294967295,m=g+(y<<6&4294967295|y>>>26),y=w+(g^(m|~I))+_[11]+3174756917&4294967295,w=m+(y<<10&4294967295|y>>>22),y=I+(m^(w|~g))+_[2]+718787259&4294967295,I=w+(y<<15&4294967295|y>>>17),y=g+(w^(I|~m))+_[9]+3951481745&4294967295,b.g[0]=b.g[0]+m&4294967295,b.g[1]=b.g[1]+(I+(y<<21&4294967295|y>>>11))&4294967295,b.g[2]=b.g[2]+I&4294967295,b.g[3]=b.g[3]+w&4294967295}r.prototype.u=function(b,m){m===void 0&&(m=b.length);for(var g=m-this.blockSize,_=this.B,I=this.h,w=0;w<m;){if(I==0)for(;w<=g;)s(this,b,w),w+=this.blockSize;if(typeof b=="string"){for(;w<m;)if(_[I++]=b.charCodeAt(w++),I==this.blockSize){s(this,_),I=0;break}}else for(;w<m;)if(_[I++]=b[w++],I==this.blockSize){s(this,_),I=0;break}}this.h=I,this.o+=m},r.prototype.v=function(){var b=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);b[0]=128;for(var m=1;m<b.length-8;++m)b[m]=0;var g=8*this.o;for(m=b.length-8;m<b.length;++m)b[m]=g&255,g/=256;for(this.u(b),b=Array(16),m=g=0;4>m;++m)for(var _=0;32>_;_+=8)b[g++]=this.g[m]>>>_&255;return b};function o(b,m){var g=c;return Object.prototype.hasOwnProperty.call(g,b)?g[b]:g[b]=m(b)}function a(b,m){this.h=m;for(var g=[],_=!0,I=b.length-1;0<=I;I--){var w=b[I]|0;_&&w==m||(g[I]=w,_=!1)}this.g=g}var c={};function u(b){return-128<=b&&128>b?o(b,function(m){return new a([m|0],0>m?-1:0)}):new a([b|0],0>b?-1:0)}function h(b){if(isNaN(b)||!isFinite(b))return v;if(0>b)return x(h(-b));for(var m=[],g=1,_=0;b>=g;_++)m[_]=b/g|0,g*=4294967296;return new a(m,0)}function f(b,m){if(b.length==0)throw Error("number format error: empty string");if(m=m||10,2>m||36<m)throw Error("radix out of range: "+m);if(b.charAt(0)=="-")return x(f(b.substring(1),m));if(0<=b.indexOf("-"))throw Error('number format error: interior "-" character');for(var g=h(Math.pow(m,8)),_=v,I=0;I<b.length;I+=8){var w=Math.min(8,b.length-I),y=parseInt(b.substring(I,I+w),m);8>w?(w=h(Math.pow(m,w)),_=_.j(w).add(h(y))):(_=_.j(g),_=_.add(h(y)))}return _}var v=u(0),E=u(1),T=u(16777216);n=a.prototype,n.m=function(){if(P(this))return-x(this).m();for(var b=0,m=1,g=0;g<this.g.length;g++){var _=this.i(g);b+=(0<=_?_:4294967296+_)*m,m*=4294967296}return b},n.toString=function(b){if(b=b||10,2>b||36<b)throw Error("radix out of range: "+b);if(R(this))return"0";if(P(this))return"-"+x(this).toString(b);for(var m=h(Math.pow(b,6)),g=this,_="";;){var I=F(g,m).g;g=U(g,I.j(m));var w=((0<g.g.length?g.g[0]:g.h)>>>0).toString(b);if(g=I,R(g))return w+_;for(;6>w.length;)w="0"+w;_=w+_}},n.i=function(b){return 0>b?0:b<this.g.length?this.g[b]:this.h};function R(b){if(b.h!=0)return!1;for(var m=0;m<b.g.length;m++)if(b.g[m]!=0)return!1;return!0}function P(b){return b.h==-1}n.l=function(b){return b=U(this,b),P(b)?-1:R(b)?0:1};function x(b){for(var m=b.g.length,g=[],_=0;_<m;_++)g[_]=~b.g[_];return new a(g,~b.h).add(E)}n.abs=function(){return P(this)?x(this):this},n.add=function(b){for(var m=Math.max(this.g.length,b.g.length),g=[],_=0,I=0;I<=m;I++){var w=_+(this.i(I)&65535)+(b.i(I)&65535),y=(w>>>16)+(this.i(I)>>>16)+(b.i(I)>>>16);_=y>>>16,w&=65535,y&=65535,g[I]=y<<16|w}return new a(g,g[g.length-1]&-2147483648?-1:0)};function U(b,m){return b.add(x(m))}n.j=function(b){if(R(this)||R(b))return v;if(P(this))return P(b)?x(this).j(x(b)):x(x(this).j(b));if(P(b))return x(this.j(x(b)));if(0>this.l(T)&&0>b.l(T))return h(this.m()*b.m());for(var m=this.g.length+b.g.length,g=[],_=0;_<2*m;_++)g[_]=0;for(_=0;_<this.g.length;_++)for(var I=0;I<b.g.length;I++){var w=this.i(_)>>>16,y=this.i(_)&65535,se=b.i(I)>>>16,pe=b.i(I)&65535;g[2*_+2*I]+=y*pe,N(g,2*_+2*I),g[2*_+2*I+1]+=w*pe,N(g,2*_+2*I+1),g[2*_+2*I+1]+=y*se,N(g,2*_+2*I+1),g[2*_+2*I+2]+=w*se,N(g,2*_+2*I+2)}for(_=0;_<m;_++)g[_]=g[2*_+1]<<16|g[2*_];for(_=m;_<2*m;_++)g[_]=0;return new a(g,0)};function N(b,m){for(;(b[m]&65535)!=b[m];)b[m+1]+=b[m]>>>16,b[m]&=65535,m++}function L(b,m){this.g=b,this.h=m}function F(b,m){if(R(m))throw Error("division by zero");if(R(b))return new L(v,v);if(P(b))return m=F(x(b),m),new L(x(m.g),x(m.h));if(P(m))return m=F(b,x(m)),new L(x(m.g),m.h);if(30<b.g.length){if(P(b)||P(m))throw Error("slowDivide_ only works with positive integers.");for(var g=E,_=m;0>=_.l(b);)g=k(g),_=k(_);var I=O(g,1),w=O(_,1);for(_=O(_,2),g=O(g,2);!R(_);){var y=w.add(_);0>=y.l(b)&&(I=I.add(g),w=y),_=O(_,1),g=O(g,1)}return m=U(b,I.j(m)),new L(I,m)}for(I=v;0<=b.l(m);){for(g=Math.max(1,Math.floor(b.m()/m.m())),_=Math.ceil(Math.log(g)/Math.LN2),_=48>=_?1:Math.pow(2,_-48),w=h(g),y=w.j(m);P(y)||0<y.l(b);)g-=_,w=h(g),y=w.j(m);R(w)&&(w=E),I=I.add(w),b=U(b,y)}return new L(I,b)}n.A=function(b){return F(this,b).h},n.and=function(b){for(var m=Math.max(this.g.length,b.g.length),g=[],_=0;_<m;_++)g[_]=this.i(_)&b.i(_);return new a(g,this.h&b.h)},n.or=function(b){for(var m=Math.max(this.g.length,b.g.length),g=[],_=0;_<m;_++)g[_]=this.i(_)|b.i(_);return new a(g,this.h|b.h)},n.xor=function(b){for(var m=Math.max(this.g.length,b.g.length),g=[],_=0;_<m;_++)g[_]=this.i(_)^b.i(_);return new a(g,this.h^b.h)};function k(b){for(var m=b.g.length+1,g=[],_=0;_<m;_++)g[_]=b.i(_)<<1|b.i(_-1)>>>31;return new a(g,b.h)}function O(b,m){var g=m>>5;m%=32;for(var _=b.g.length-g,I=[],w=0;w<_;w++)I[w]=0<m?b.i(w+g)>>>m|b.i(w+g+1)<<32-m:b.i(w+g);return new a(I,b.h)}r.prototype.digest=r.prototype.v,r.prototype.reset=r.prototype.s,r.prototype.update=r.prototype.u,Tc=r,a.prototype.add=a.prototype.add,a.prototype.multiply=a.prototype.j,a.prototype.modulo=a.prototype.A,a.prototype.compare=a.prototype.l,a.prototype.toNumber=a.prototype.m,a.prototype.toString=a.prototype.toString,a.prototype.getBits=a.prototype.i,a.fromNumber=h,a.fromString=f,Lt=a}).apply(typeof tl<"u"?tl:typeof self<"u"?self:typeof window<"u"?window:{});var Fr=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};/** @license
Copyright The Closure Library Authors.
SPDX-License-Identifier: Apache-2.0
*/var wc,qn,Ac,Kr,xi,Sc,Rc,Pc;(function(){var n,e=typeof Object.defineProperties=="function"?Object.defineProperty:function(i,l,d){return i==Array.prototype||i==Object.prototype||(i[l]=d.value),i};function t(i){i=[typeof globalThis=="object"&&globalThis,i,typeof window=="object"&&window,typeof self=="object"&&self,typeof Fr=="object"&&Fr];for(var l=0;l<i.length;++l){var d=i[l];if(d&&d.Math==Math)return d}throw Error("Cannot find global object")}var r=t(this);function s(i,l){if(l)e:{var d=r;i=i.split(".");for(var p=0;p<i.length-1;p++){var A=i[p];if(!(A in d))break e;d=d[A]}i=i[i.length-1],p=d[i],l=l(p),l!=p&&l!=null&&e(d,i,{configurable:!0,writable:!0,value:l})}}function o(i,l){i instanceof String&&(i+="");var d=0,p=!1,A={next:function(){if(!p&&d<i.length){var S=d++;return{value:l(S,i[S]),done:!1}}return p=!0,{done:!0,value:void 0}}};return A[Symbol.iterator]=function(){return A},A}s("Array.prototype.values",function(i){return i||function(){return o(this,function(l,d){return d})}});/** @license

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/var a=a||{},c=this||self;function u(i){var l=typeof i;return l=l!="object"?l:i?Array.isArray(i)?"array":l:"null",l=="array"||l=="object"&&typeof i.length=="number"}function h(i){var l=typeof i;return l=="object"&&i!=null||l=="function"}function f(i,l,d){return i.call.apply(i.bind,arguments)}function v(i,l,d){if(!i)throw Error();if(2<arguments.length){var p=Array.prototype.slice.call(arguments,2);return function(){var A=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(A,p),i.apply(l,A)}}return function(){return i.apply(l,arguments)}}function E(i,l,d){return E=Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?f:v,E.apply(null,arguments)}function T(i,l){var d=Array.prototype.slice.call(arguments,1);return function(){var p=d.slice();return p.push.apply(p,arguments),i.apply(this,p)}}function R(i,l){function d(){}d.prototype=l.prototype,i.aa=l.prototype,i.prototype=new d,i.prototype.constructor=i,i.Qb=function(p,A,S){for(var V=Array(arguments.length-2),X=2;X<arguments.length;X++)V[X-2]=arguments[X];return l.prototype[A].apply(p,V)}}function P(i){const l=i.length;if(0<l){const d=Array(l);for(let p=0;p<l;p++)d[p]=i[p];return d}return[]}function x(i,l){for(let d=1;d<arguments.length;d++){const p=arguments[d];if(u(p)){const A=i.length||0,S=p.length||0;i.length=A+S;for(let V=0;V<S;V++)i[A+V]=p[V]}else i.push(p)}}class U{constructor(l,d){this.i=l,this.j=d,this.h=0,this.g=null}get(){let l;return 0<this.h?(this.h--,l=this.g,this.g=l.next,l.next=null):l=this.i(),l}}function N(i){return/^[\s\xa0]*$/.test(i)}function L(){var i=c.navigator;return i&&(i=i.userAgent)?i:""}function F(i){return F[" "](i),i}F[" "]=function(){};var k=L().indexOf("Gecko")!=-1&&!(L().toLowerCase().indexOf("webkit")!=-1&&L().indexOf("Edge")==-1)&&!(L().indexOf("Trident")!=-1||L().indexOf("MSIE")!=-1)&&L().indexOf("Edge")==-1;function O(i,l,d){for(const p in i)l.call(d,i[p],p,i)}function b(i,l){for(const d in i)l.call(void 0,i[d],d,i)}function m(i){const l={};for(const d in i)l[d]=i[d];return l}const g="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function _(i,l){let d,p;for(let A=1;A<arguments.length;A++){p=arguments[A];for(d in p)i[d]=p[d];for(let S=0;S<g.length;S++)d=g[S],Object.prototype.hasOwnProperty.call(p,d)&&(i[d]=p[d])}}function I(i){var l=1;i=i.split(":");const d=[];for(;0<l&&i.length;)d.push(i.shift()),l--;return i.length&&d.push(i.join(":")),d}function w(i){c.setTimeout(()=>{throw i},0)}function y(){var i=$s;let l=null;return i.g&&(l=i.g,i.g=i.g.next,i.g||(i.h=null),l.next=null),l}class se{constructor(){this.h=this.g=null}add(l,d){const p=pe.get();p.set(l,d),this.h?this.h.next=p:this.g=p,this.h=p}}var pe=new U(()=>new Fs,i=>i.reset());class Fs{constructor(){this.next=this.g=this.h=null}set(l,d){this.h=l,this.g=d,this.next=null}reset(){this.next=this.g=this.h=null}}let In,Tn=!1,$s=new se,Ho=()=>{const i=c.Promise.resolve(void 0);In=()=>{i.then(xd)}};var xd=()=>{for(var i;i=y();){try{i.h.call(i.g)}catch(d){w(d)}var l=pe;l.j(i),100>l.h&&(l.h++,i.next=l.g,l.g=i)}Tn=!1};function at(){this.s=this.s,this.C=this.C}at.prototype.s=!1,at.prototype.ma=function(){this.s||(this.s=!0,this.N())},at.prototype.N=function(){if(this.C)for(;this.C.length;)this.C.shift()()};function be(i,l){this.type=i,this.g=this.target=l,this.defaultPrevented=!1}be.prototype.h=function(){this.defaultPrevented=!0};var Dd=function(){if(!c.addEventListener||!Object.defineProperty)return!1;var i=!1,l=Object.defineProperty({},"passive",{get:function(){i=!0}});try{const d=()=>{};c.addEventListener("test",d,l),c.removeEventListener("test",d,l)}catch{}return i}();function wn(i,l){if(be.call(this,i?i.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,i){var d=this.type=i.type,p=i.changedTouches&&i.changedTouches.length?i.changedTouches[0]:null;if(this.target=i.target||i.srcElement,this.g=l,l=i.relatedTarget){if(k){e:{try{F(l.nodeName);var A=!0;break e}catch{}A=!1}A||(l=null)}}else d=="mouseover"?l=i.fromElement:d=="mouseout"&&(l=i.toElement);this.relatedTarget=l,p?(this.clientX=p.clientX!==void 0?p.clientX:p.pageX,this.clientY=p.clientY!==void 0?p.clientY:p.pageY,this.screenX=p.screenX||0,this.screenY=p.screenY||0):(this.clientX=i.clientX!==void 0?i.clientX:i.pageX,this.clientY=i.clientY!==void 0?i.clientY:i.pageY,this.screenX=i.screenX||0,this.screenY=i.screenY||0),this.button=i.button,this.key=i.key||"",this.ctrlKey=i.ctrlKey,this.altKey=i.altKey,this.shiftKey=i.shiftKey,this.metaKey=i.metaKey,this.pointerId=i.pointerId||0,this.pointerType=typeof i.pointerType=="string"?i.pointerType:kd[i.pointerType]||"",this.state=i.state,this.i=i,i.defaultPrevented&&wn.aa.h.call(this)}}R(wn,be);var kd={2:"touch",3:"pen",4:"mouse"};wn.prototype.h=function(){wn.aa.h.call(this);var i=this.i;i.preventDefault?i.preventDefault():i.returnValue=!1};var Er="closure_listenable_"+(1e6*Math.random()|0),Vd=0;function Nd(i,l,d,p,A){this.listener=i,this.proxy=null,this.src=l,this.type=d,this.capture=!!p,this.ha=A,this.key=++Vd,this.da=this.fa=!1}function Ir(i){i.da=!0,i.listener=null,i.proxy=null,i.src=null,i.ha=null}function Tr(i){this.src=i,this.g={},this.h=0}Tr.prototype.add=function(i,l,d,p,A){var S=i.toString();i=this.g[S],i||(i=this.g[S]=[],this.h++);var V=Bs(i,l,p,A);return-1<V?(l=i[V],d||(l.fa=!1)):(l=new Nd(l,this.src,S,!!p,A),l.fa=d,i.push(l)),l};function qs(i,l){var d=l.type;if(d in i.g){var p=i.g[d],A=Array.prototype.indexOf.call(p,l,void 0),S;(S=0<=A)&&Array.prototype.splice.call(p,A,1),S&&(Ir(l),i.g[d].length==0&&(delete i.g[d],i.h--))}}function Bs(i,l,d,p){for(var A=0;A<i.length;++A){var S=i[A];if(!S.da&&S.listener==l&&S.capture==!!d&&S.ha==p)return A}return-1}var zs="closure_lm_"+(1e6*Math.random()|0),Hs={};function Go(i,l,d,p,A){if(Array.isArray(l)){for(var S=0;S<l.length;S++)Go(i,l[S],d,p,A);return null}return d=Qo(d),i&&i[Er]?i.K(l,d,h(p)?!!p.capture:!1,A):Od(i,l,d,!1,p,A)}function Od(i,l,d,p,A,S){if(!l)throw Error("Invalid event type");var V=h(A)?!!A.capture:!!A,X=Ws(i);if(X||(i[zs]=X=new Tr(i)),d=X.add(l,d,p,V,S),d.proxy)return d;if(p=Ld(),d.proxy=p,p.src=i,p.listener=d,i.addEventListener)Dd||(A=V),A===void 0&&(A=!1),i.addEventListener(l.toString(),p,A);else if(i.attachEvent)i.attachEvent(Ko(l.toString()),p);else if(i.addListener&&i.removeListener)i.addListener(p);else throw Error("addEventListener and attachEvent are unavailable.");return d}function Ld(){function i(d){return l.call(i.src,i.listener,d)}const l=Md;return i}function Wo(i,l,d,p,A){if(Array.isArray(l))for(var S=0;S<l.length;S++)Wo(i,l[S],d,p,A);else p=h(p)?!!p.capture:!!p,d=Qo(d),i&&i[Er]?(i=i.i,l=String(l).toString(),l in i.g&&(S=i.g[l],d=Bs(S,d,p,A),-1<d&&(Ir(S[d]),Array.prototype.splice.call(S,d,1),S.length==0&&(delete i.g[l],i.h--)))):i&&(i=Ws(i))&&(l=i.g[l.toString()],i=-1,l&&(i=Bs(l,d,p,A)),(d=-1<i?l[i]:null)&&Gs(d))}function Gs(i){if(typeof i!="number"&&i&&!i.da){var l=i.src;if(l&&l[Er])qs(l.i,i);else{var d=i.type,p=i.proxy;l.removeEventListener?l.removeEventListener(d,p,i.capture):l.detachEvent?l.detachEvent(Ko(d),p):l.addListener&&l.removeListener&&l.removeListener(p),(d=Ws(l))?(qs(d,i),d.h==0&&(d.src=null,l[zs]=null)):Ir(i)}}}function Ko(i){return i in Hs?Hs[i]:Hs[i]="on"+i}function Md(i,l){if(i.da)i=!0;else{l=new wn(l,this);var d=i.listener,p=i.ha||i.src;i.fa&&Gs(i),i=d.call(p,l)}return i}function Ws(i){return i=i[zs],i instanceof Tr?i:null}var Ks="__closure_events_fn_"+(1e9*Math.random()>>>0);function Qo(i){return typeof i=="function"?i:(i[Ks]||(i[Ks]=function(l){return i.handleEvent(l)}),i[Ks])}function Ee(){at.call(this),this.i=new Tr(this),this.M=this,this.F=null}R(Ee,at),Ee.prototype[Er]=!0,Ee.prototype.removeEventListener=function(i,l,d,p){Wo(this,i,l,d,p)};function Ce(i,l){var d,p=i.F;if(p)for(d=[];p;p=p.F)d.push(p);if(i=i.M,p=l.type||l,typeof l=="string")l=new be(l,i);else if(l instanceof be)l.target=l.target||i;else{var A=l;l=new be(p,i),_(l,A)}if(A=!0,d)for(var S=d.length-1;0<=S;S--){var V=l.g=d[S];A=wr(V,p,!0,l)&&A}if(V=l.g=i,A=wr(V,p,!0,l)&&A,A=wr(V,p,!1,l)&&A,d)for(S=0;S<d.length;S++)V=l.g=d[S],A=wr(V,p,!1,l)&&A}Ee.prototype.N=function(){if(Ee.aa.N.call(this),this.i){var i=this.i,l;for(l in i.g){for(var d=i.g[l],p=0;p<d.length;p++)Ir(d[p]);delete i.g[l],i.h--}}this.F=null},Ee.prototype.K=function(i,l,d,p){return this.i.add(String(i),l,!1,d,p)},Ee.prototype.L=function(i,l,d,p){return this.i.add(String(i),l,!0,d,p)};function wr(i,l,d,p){if(l=i.i.g[String(l)],!l)return!0;l=l.concat();for(var A=!0,S=0;S<l.length;++S){var V=l[S];if(V&&!V.da&&V.capture==d){var X=V.listener,fe=V.ha||V.src;V.fa&&qs(i.i,V),A=X.call(fe,p)!==!1&&A}}return A&&!p.defaultPrevented}function Jo(i,l,d){if(typeof i=="function")d&&(i=E(i,d));else if(i&&typeof i.handleEvent=="function")i=E(i.handleEvent,i);else throw Error("Invalid listener argument");return 2147483647<Number(l)?-1:c.setTimeout(i,l||0)}function Yo(i){i.g=Jo(()=>{i.g=null,i.i&&(i.i=!1,Yo(i))},i.l);const l=i.h;i.h=null,i.m.apply(null,l)}class jd extends at{constructor(l,d){super(),this.m=l,this.l=d,this.h=null,this.i=!1,this.g=null}j(l){this.h=arguments,this.g?this.i=!0:Yo(this)}N(){super.N(),this.g&&(c.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function An(i){at.call(this),this.h=i,this.g={}}R(An,at);var Xo=[];function Zo(i){O(i.g,function(l,d){this.g.hasOwnProperty(d)&&Gs(l)},i),i.g={}}An.prototype.N=function(){An.aa.N.call(this),Zo(this)},An.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};var Qs=c.JSON.stringify,Ud=c.JSON.parse,Fd=class{stringify(i){return c.JSON.stringify(i,void 0)}parse(i){return c.JSON.parse(i,void 0)}};function Js(){}Js.prototype.h=null;function ea(i){return i.h||(i.h=i.i())}function ta(){}var Sn={OPEN:"a",kb:"b",Ja:"c",wb:"d"};function Ys(){be.call(this,"d")}R(Ys,be);function Xs(){be.call(this,"c")}R(Xs,be);var Pt={},na=null;function Ar(){return na=na||new Ee}Pt.La="serverreachability";function ra(i){be.call(this,Pt.La,i)}R(ra,be);function Rn(i){const l=Ar();Ce(l,new ra(l))}Pt.STAT_EVENT="statevent";function sa(i,l){be.call(this,Pt.STAT_EVENT,i),this.stat=l}R(sa,be);function xe(i){const l=Ar();Ce(l,new sa(l,i))}Pt.Ma="timingevent";function ia(i,l){be.call(this,Pt.Ma,i),this.size=l}R(ia,be);function Pn(i,l){if(typeof i!="function")throw Error("Fn must not be null and must be a function");return c.setTimeout(function(){i()},l)}function Cn(){this.g=!0}Cn.prototype.xa=function(){this.g=!1};function $d(i,l,d,p,A,S){i.info(function(){if(i.g)if(S)for(var V="",X=S.split("&"),fe=0;fe<X.length;fe++){var Q=X[fe].split("=");if(1<Q.length){var Ie=Q[0];Q=Q[1];var Te=Ie.split("_");V=2<=Te.length&&Te[1]=="type"?V+(Ie+"="+Q+"&"):V+(Ie+"=redacted&")}}else V=null;else V=S;return"XMLHTTP REQ ("+p+") [attempt "+A+"]: "+l+`
`+d+`
`+V})}function qd(i,l,d,p,A,S,V){i.info(function(){return"XMLHTTP RESP ("+p+") [ attempt "+A+"]: "+l+`
`+d+`
`+S+" "+V})}function Wt(i,l,d,p){i.info(function(){return"XMLHTTP TEXT ("+l+"): "+zd(i,d)+(p?" "+p:"")})}function Bd(i,l){i.info(function(){return"TIMEOUT: "+l})}Cn.prototype.info=function(){};function zd(i,l){if(!i.g)return l;if(!l)return null;try{var d=JSON.parse(l);if(d){for(i=0;i<d.length;i++)if(Array.isArray(d[i])){var p=d[i];if(!(2>p.length)){var A=p[1];if(Array.isArray(A)&&!(1>A.length)){var S=A[0];if(S!="noop"&&S!="stop"&&S!="close")for(var V=1;V<A.length;V++)A[V]=""}}}}return Qs(d)}catch{return l}}var Sr={NO_ERROR:0,gb:1,tb:2,sb:3,nb:4,rb:5,ub:6,Ia:7,TIMEOUT:8,xb:9},oa={lb:"complete",Hb:"success",Ja:"error",Ia:"abort",zb:"ready",Ab:"readystatechange",TIMEOUT:"timeout",vb:"incrementaldata",yb:"progress",ob:"downloadprogress",Pb:"uploadprogress"},Zs;function Rr(){}R(Rr,Js),Rr.prototype.g=function(){return new XMLHttpRequest},Rr.prototype.i=function(){return{}},Zs=new Rr;function lt(i,l,d,p){this.j=i,this.i=l,this.l=d,this.R=p||1,this.U=new An(this),this.I=45e3,this.H=null,this.o=!1,this.m=this.A=this.v=this.L=this.F=this.S=this.B=null,this.D=[],this.g=null,this.C=0,this.s=this.u=null,this.X=-1,this.J=!1,this.O=0,this.M=null,this.W=this.K=this.T=this.P=!1,this.h=new aa}function aa(){this.i=null,this.g="",this.h=!1}var la={},ei={};function ti(i,l,d){i.L=1,i.v=Dr(Ke(l)),i.m=d,i.P=!0,ca(i,null)}function ca(i,l){i.F=Date.now(),Pr(i),i.A=Ke(i.v);var d=i.A,p=i.R;Array.isArray(p)||(p=[String(p)]),Ta(d.i,"t",p),i.C=0,d=i.j.J,i.h=new aa,i.g=$a(i.j,d?l:null,!i.m),0<i.O&&(i.M=new jd(E(i.Y,i,i.g),i.O)),l=i.U,d=i.g,p=i.ca;var A="readystatechange";Array.isArray(A)||(A&&(Xo[0]=A.toString()),A=Xo);for(var S=0;S<A.length;S++){var V=Go(d,A[S],p||l.handleEvent,!1,l.h||l);if(!V)break;l.g[V.key]=V}l=i.H?m(i.H):{},i.m?(i.u||(i.u="POST"),l["Content-Type"]="application/x-www-form-urlencoded",i.g.ea(i.A,i.u,i.m,l)):(i.u="GET",i.g.ea(i.A,i.u,null,l)),Rn(),$d(i.i,i.u,i.A,i.l,i.R,i.m)}lt.prototype.ca=function(i){i=i.target;const l=this.M;l&&Qe(i)==3?l.j():this.Y(i)},lt.prototype.Y=function(i){try{if(i==this.g)e:{const Te=Qe(this.g);var l=this.g.Ba();const Jt=this.g.Z();if(!(3>Te)&&(Te!=3||this.g&&(this.h.h||this.g.oa()||xa(this.g)))){this.J||Te!=4||l==7||(l==8||0>=Jt?Rn(3):Rn(2)),ni(this);var d=this.g.Z();this.X=d;t:if(ua(this)){var p=xa(this.g);i="";var A=p.length,S=Qe(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ct(this),xn(this);var V="";break t}this.h.i=new c.TextDecoder}for(l=0;l<A;l++)this.h.h=!0,i+=this.h.i.decode(p[l],{stream:!(S&&l==A-1)});p.length=0,this.h.g+=i,this.C=0,V=this.h.g}else V=this.g.oa();if(this.o=d==200,qd(this.i,this.u,this.A,this.l,this.R,Te,d),this.o){if(this.T&&!this.K){t:{if(this.g){var X,fe=this.g;if((X=fe.g?fe.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!N(X)){var Q=X;break t}}Q=null}if(d=Q)Wt(this.i,this.l,d,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,ri(this,d);else{this.o=!1,this.s=3,xe(12),Ct(this),xn(this);break e}}if(this.P){d=!0;let Me;for(;!this.J&&this.C<V.length;)if(Me=Hd(this,V),Me==ei){Te==4&&(this.s=4,xe(14),d=!1),Wt(this.i,this.l,null,"[Incomplete Response]");break}else if(Me==la){this.s=4,xe(15),Wt(this.i,this.l,V,"[Invalid Chunk]"),d=!1;break}else Wt(this.i,this.l,Me,null),ri(this,Me);if(ua(this)&&this.C!=0&&(this.h.g=this.h.g.slice(this.C),this.C=0),Te!=4||V.length!=0||this.h.h||(this.s=1,xe(16),d=!1),this.o=this.o&&d,!d)Wt(this.i,this.l,V,"[Invalid Chunked Response]"),Ct(this),xn(this);else if(0<V.length&&!this.W){this.W=!0;var Ie=this.j;Ie.g==this&&Ie.ba&&!Ie.M&&(Ie.j.info("Great, no buffering proxy detected. Bytes received: "+V.length),ci(Ie),Ie.M=!0,xe(11))}}else Wt(this.i,this.l,V,null),ri(this,V);Te==4&&Ct(this),this.o&&!this.J&&(Te==4?Ma(this.j,this):(this.o=!1,Pr(this)))}else lh(this.g),d==400&&0<V.indexOf("Unknown SID")?(this.s=3,xe(12)):(this.s=0,xe(13)),Ct(this),xn(this)}}}catch{}finally{}};function ua(i){return i.g?i.u=="GET"&&i.L!=2&&i.j.Ca:!1}function Hd(i,l){var d=i.C,p=l.indexOf(`
`,d);return p==-1?ei:(d=Number(l.substring(d,p)),isNaN(d)?la:(p+=1,p+d>l.length?ei:(l=l.slice(p,p+d),i.C=p+d,l)))}lt.prototype.cancel=function(){this.J=!0,Ct(this)};function Pr(i){i.S=Date.now()+i.I,da(i,i.I)}function da(i,l){if(i.B!=null)throw Error("WatchDog timer not null");i.B=Pn(E(i.ba,i),l)}function ni(i){i.B&&(c.clearTimeout(i.B),i.B=null)}lt.prototype.ba=function(){this.B=null;const i=Date.now();0<=i-this.S?(Bd(this.i,this.A),this.L!=2&&(Rn(),xe(17)),Ct(this),this.s=2,xn(this)):da(this,this.S-i)};function xn(i){i.j.G==0||i.J||Ma(i.j,i)}function Ct(i){ni(i);var l=i.M;l&&typeof l.ma=="function"&&l.ma(),i.M=null,Zo(i.U),i.g&&(l=i.g,i.g=null,l.abort(),l.ma())}function ri(i,l){try{var d=i.j;if(d.G!=0&&(d.g==i||si(d.h,i))){if(!i.K&&si(d.h,i)&&d.G==3){try{var p=d.Da.g.parse(l)}catch{p=null}if(Array.isArray(p)&&p.length==3){var A=p;if(A[0]==0){e:if(!d.u){if(d.g)if(d.g.F+3e3<i.F)Mr(d),Or(d);else break e;li(d),xe(18)}}else d.za=A[1],0<d.za-d.T&&37500>A[2]&&d.F&&d.v==0&&!d.C&&(d.C=Pn(E(d.Za,d),6e3));if(1>=fa(d.h)&&d.ca){try{d.ca()}catch{}d.ca=void 0}}else Dt(d,11)}else if((i.K||d.g==i)&&Mr(d),!N(l))for(A=d.Da.g.parse(l),l=0;l<A.length;l++){let Q=A[l];if(d.T=Q[0],Q=Q[1],d.G==2)if(Q[0]=="c"){d.K=Q[1],d.ia=Q[2];const Ie=Q[3];Ie!=null&&(d.la=Ie,d.j.info("VER="+d.la));const Te=Q[4];Te!=null&&(d.Aa=Te,d.j.info("SVER="+d.Aa));const Jt=Q[5];Jt!=null&&typeof Jt=="number"&&0<Jt&&(p=1.5*Jt,d.L=p,d.j.info("backChannelRequestTimeoutMs_="+p)),p=d;const Me=i.g;if(Me){const Ur=Me.g?Me.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(Ur){var S=p.h;S.g||Ur.indexOf("spdy")==-1&&Ur.indexOf("quic")==-1&&Ur.indexOf("h2")==-1||(S.j=S.l,S.g=new Set,S.h&&(ii(S,S.h),S.h=null))}if(p.D){const ui=Me.g?Me.g.getResponseHeader("X-HTTP-Session-Id"):null;ui&&(p.ya=ui,Z(p.I,p.D,ui))}}d.G=3,d.l&&d.l.ua(),d.ba&&(d.R=Date.now()-i.F,d.j.info("Handshake RTT: "+d.R+"ms")),p=d;var V=i;if(p.qa=Fa(p,p.J?p.ia:null,p.W),V.K){ma(p.h,V);var X=V,fe=p.L;fe&&(X.I=fe),X.B&&(ni(X),Pr(X)),p.g=V}else Oa(p);0<d.i.length&&Lr(d)}else Q[0]!="stop"&&Q[0]!="close"||Dt(d,7);else d.G==3&&(Q[0]=="stop"||Q[0]=="close"?Q[0]=="stop"?Dt(d,7):ai(d):Q[0]!="noop"&&d.l&&d.l.ta(Q),d.v=0)}}Rn(4)}catch{}}var Gd=class{constructor(i,l){this.g=i,this.map=l}};function ha(i){this.l=i||10,c.PerformanceNavigationTiming?(i=c.performance.getEntriesByType("navigation"),i=0<i.length&&(i[0].nextHopProtocol=="hq"||i[0].nextHopProtocol=="h2")):i=!!(c.chrome&&c.chrome.loadTimes&&c.chrome.loadTimes()&&c.chrome.loadTimes().wasFetchedViaSpdy),this.j=i?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}function pa(i){return i.h?!0:i.g?i.g.size>=i.j:!1}function fa(i){return i.h?1:i.g?i.g.size:0}function si(i,l){return i.h?i.h==l:i.g?i.g.has(l):!1}function ii(i,l){i.g?i.g.add(l):i.h=l}function ma(i,l){i.h&&i.h==l?i.h=null:i.g&&i.g.has(l)&&i.g.delete(l)}ha.prototype.cancel=function(){if(this.i=ga(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const i of this.g.values())i.cancel();this.g.clear()}};function ga(i){if(i.h!=null)return i.i.concat(i.h.D);if(i.g!=null&&i.g.size!==0){let l=i.i;for(const d of i.g.values())l=l.concat(d.D);return l}return P(i.i)}function Wd(i){if(i.V&&typeof i.V=="function")return i.V();if(typeof Map<"u"&&i instanceof Map||typeof Set<"u"&&i instanceof Set)return Array.from(i.values());if(typeof i=="string")return i.split("");if(u(i)){for(var l=[],d=i.length,p=0;p<d;p++)l.push(i[p]);return l}l=[],d=0;for(p in i)l[d++]=i[p];return l}function Kd(i){if(i.na&&typeof i.na=="function")return i.na();if(!i.V||typeof i.V!="function"){if(typeof Map<"u"&&i instanceof Map)return Array.from(i.keys());if(!(typeof Set<"u"&&i instanceof Set)){if(u(i)||typeof i=="string"){var l=[];i=i.length;for(var d=0;d<i;d++)l.push(d);return l}l=[],d=0;for(const p in i)l[d++]=p;return l}}}function va(i,l){if(i.forEach&&typeof i.forEach=="function")i.forEach(l,void 0);else if(u(i)||typeof i=="string")Array.prototype.forEach.call(i,l,void 0);else for(var d=Kd(i),p=Wd(i),A=p.length,S=0;S<A;S++)l.call(void 0,p[S],d&&d[S],i)}var ya=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Qd(i,l){if(i){i=i.split("&");for(var d=0;d<i.length;d++){var p=i[d].indexOf("="),A=null;if(0<=p){var S=i[d].substring(0,p);A=i[d].substring(p+1)}else S=i[d];l(S,A?decodeURIComponent(A.replace(/\+/g," ")):"")}}}function xt(i){if(this.g=this.o=this.j="",this.s=null,this.m=this.l="",this.h=!1,i instanceof xt){this.h=i.h,Cr(this,i.j),this.o=i.o,this.g=i.g,xr(this,i.s),this.l=i.l;var l=i.i,d=new Vn;d.i=l.i,l.g&&(d.g=new Map(l.g),d.h=l.h),_a(this,d),this.m=i.m}else i&&(l=String(i).match(ya))?(this.h=!1,Cr(this,l[1]||"",!0),this.o=Dn(l[2]||""),this.g=Dn(l[3]||"",!0),xr(this,l[4]),this.l=Dn(l[5]||"",!0),_a(this,l[6]||"",!0),this.m=Dn(l[7]||"")):(this.h=!1,this.i=new Vn(null,this.h))}xt.prototype.toString=function(){var i=[],l=this.j;l&&i.push(kn(l,ba,!0),":");var d=this.g;return(d||l=="file")&&(i.push("//"),(l=this.o)&&i.push(kn(l,ba,!0),"@"),i.push(encodeURIComponent(String(d)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),d=this.s,d!=null&&i.push(":",String(d))),(d=this.l)&&(this.g&&d.charAt(0)!="/"&&i.push("/"),i.push(kn(d,d.charAt(0)=="/"?Xd:Yd,!0))),(d=this.i.toString())&&i.push("?",d),(d=this.m)&&i.push("#",kn(d,eh)),i.join("")};function Ke(i){return new xt(i)}function Cr(i,l,d){i.j=d?Dn(l,!0):l,i.j&&(i.j=i.j.replace(/:$/,""))}function xr(i,l){if(l){if(l=Number(l),isNaN(l)||0>l)throw Error("Bad port number "+l);i.s=l}else i.s=null}function _a(i,l,d){l instanceof Vn?(i.i=l,th(i.i,i.h)):(d||(l=kn(l,Zd)),i.i=new Vn(l,i.h))}function Z(i,l,d){i.i.set(l,d)}function Dr(i){return Z(i,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),i}function Dn(i,l){return i?l?decodeURI(i.replace(/%25/g,"%2525")):decodeURIComponent(i):""}function kn(i,l,d){return typeof i=="string"?(i=encodeURI(i).replace(l,Jd),d&&(i=i.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),i):null}function Jd(i){return i=i.charCodeAt(0),"%"+(i>>4&15).toString(16)+(i&15).toString(16)}var ba=/[#\/\?@]/g,Yd=/[#\?:]/g,Xd=/[#\?]/g,Zd=/[#\?@]/g,eh=/#/g;function Vn(i,l){this.h=this.g=null,this.i=i||null,this.j=!!l}function ct(i){i.g||(i.g=new Map,i.h=0,i.i&&Qd(i.i,function(l,d){i.add(decodeURIComponent(l.replace(/\+/g," ")),d)}))}n=Vn.prototype,n.add=function(i,l){ct(this),this.i=null,i=Kt(this,i);var d=this.g.get(i);return d||this.g.set(i,d=[]),d.push(l),this.h+=1,this};function Ea(i,l){ct(i),l=Kt(i,l),i.g.has(l)&&(i.i=null,i.h-=i.g.get(l).length,i.g.delete(l))}function Ia(i,l){return ct(i),l=Kt(i,l),i.g.has(l)}n.forEach=function(i,l){ct(this),this.g.forEach(function(d,p){d.forEach(function(A){i.call(l,A,p,this)},this)},this)},n.na=function(){ct(this);const i=Array.from(this.g.values()),l=Array.from(this.g.keys()),d=[];for(let p=0;p<l.length;p++){const A=i[p];for(let S=0;S<A.length;S++)d.push(l[p])}return d},n.V=function(i){ct(this);let l=[];if(typeof i=="string")Ia(this,i)&&(l=l.concat(this.g.get(Kt(this,i))));else{i=Array.from(this.g.values());for(let d=0;d<i.length;d++)l=l.concat(i[d])}return l},n.set=function(i,l){return ct(this),this.i=null,i=Kt(this,i),Ia(this,i)&&(this.h-=this.g.get(i).length),this.g.set(i,[l]),this.h+=1,this},n.get=function(i,l){return i?(i=this.V(i),0<i.length?String(i[0]):l):l};function Ta(i,l,d){Ea(i,l),0<d.length&&(i.i=null,i.g.set(Kt(i,l),P(d)),i.h+=d.length)}n.toString=function(){if(this.i)return this.i;if(!this.g)return"";const i=[],l=Array.from(this.g.keys());for(var d=0;d<l.length;d++){var p=l[d];const S=encodeURIComponent(String(p)),V=this.V(p);for(p=0;p<V.length;p++){var A=S;V[p]!==""&&(A+="="+encodeURIComponent(String(V[p]))),i.push(A)}}return this.i=i.join("&")};function Kt(i,l){return l=String(l),i.j&&(l=l.toLowerCase()),l}function th(i,l){l&&!i.j&&(ct(i),i.i=null,i.g.forEach(function(d,p){var A=p.toLowerCase();p!=A&&(Ea(this,p),Ta(this,A,d))},i)),i.j=l}function nh(i,l){const d=new Cn;if(c.Image){const p=new Image;p.onload=T(ut,d,"TestLoadImage: loaded",!0,l,p),p.onerror=T(ut,d,"TestLoadImage: error",!1,l,p),p.onabort=T(ut,d,"TestLoadImage: abort",!1,l,p),p.ontimeout=T(ut,d,"TestLoadImage: timeout",!1,l,p),c.setTimeout(function(){p.ontimeout&&p.ontimeout()},1e4),p.src=i}else l(!1)}function rh(i,l){const d=new Cn,p=new AbortController,A=setTimeout(()=>{p.abort(),ut(d,"TestPingServer: timeout",!1,l)},1e4);fetch(i,{signal:p.signal}).then(S=>{clearTimeout(A),S.ok?ut(d,"TestPingServer: ok",!0,l):ut(d,"TestPingServer: server error",!1,l)}).catch(()=>{clearTimeout(A),ut(d,"TestPingServer: error",!1,l)})}function ut(i,l,d,p,A){try{A&&(A.onload=null,A.onerror=null,A.onabort=null,A.ontimeout=null),p(d)}catch{}}function sh(){this.g=new Fd}function ih(i,l,d){const p=d||"";try{va(i,function(A,S){let V=A;h(A)&&(V=Qs(A)),l.push(p+S+"="+encodeURIComponent(V))})}catch(A){throw l.push(p+"type="+encodeURIComponent("_badmap")),A}}function kr(i){this.l=i.Ub||null,this.j=i.eb||!1}R(kr,Js),kr.prototype.g=function(){return new Vr(this.l,this.j)},kr.prototype.i=function(i){return function(){return i}}({});function Vr(i,l){Ee.call(this),this.D=i,this.o=l,this.m=void 0,this.status=this.readyState=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.u=new Headers,this.h=null,this.B="GET",this.A="",this.g=!1,this.v=this.j=this.l=null}R(Vr,Ee),n=Vr.prototype,n.open=function(i,l){if(this.readyState!=0)throw this.abort(),Error("Error reopening a connection");this.B=i,this.A=l,this.readyState=1,On(this)},n.send=function(i){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const l={headers:this.u,method:this.B,credentials:this.m,cache:void 0};i&&(l.body=i),(this.D||c).fetch(new Request(this.A,l)).then(this.Sa.bind(this),this.ga.bind(this))},n.abort=function(){this.response=this.responseText="",this.u=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Nn(this)),this.readyState=0},n.Sa=function(i){if(this.g&&(this.l=i,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=i.headers,this.readyState=2,On(this)),this.g&&(this.readyState=3,On(this),this.g)))if(this.responseType==="arraybuffer")i.arrayBuffer().then(this.Qa.bind(this),this.ga.bind(this));else if(typeof c.ReadableStream<"u"&&"body"in i){if(this.j=i.body.getReader(),this.o){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.v=new TextDecoder;wa(this)}else i.text().then(this.Ra.bind(this),this.ga.bind(this))};function wa(i){i.j.read().then(i.Pa.bind(i)).catch(i.ga.bind(i))}n.Pa=function(i){if(this.g){if(this.o&&i.value)this.response.push(i.value);else if(!this.o){var l=i.value?i.value:new Uint8Array(0);(l=this.v.decode(l,{stream:!i.done}))&&(this.response=this.responseText+=l)}i.done?Nn(this):On(this),this.readyState==3&&wa(this)}},n.Ra=function(i){this.g&&(this.response=this.responseText=i,Nn(this))},n.Qa=function(i){this.g&&(this.response=i,Nn(this))},n.ga=function(){this.g&&Nn(this)};function Nn(i){i.readyState=4,i.l=null,i.j=null,i.v=null,On(i)}n.setRequestHeader=function(i,l){this.u.append(i,l)},n.getResponseHeader=function(i){return this.h&&this.h.get(i.toLowerCase())||""},n.getAllResponseHeaders=function(){if(!this.h)return"";const i=[],l=this.h.entries();for(var d=l.next();!d.done;)d=d.value,i.push(d[0]+": "+d[1]),d=l.next();return i.join(`\r
`)};function On(i){i.onreadystatechange&&i.onreadystatechange.call(i)}Object.defineProperty(Vr.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(i){this.m=i?"include":"same-origin"}});function Aa(i){let l="";return O(i,function(d,p){l+=p,l+=":",l+=d,l+=`\r
`}),l}function oi(i,l,d){e:{for(p in d){var p=!1;break e}p=!0}p||(d=Aa(d),typeof i=="string"?d!=null&&encodeURIComponent(String(d)):Z(i,l,d))}function ie(i){Ee.call(this),this.headers=new Map,this.o=i||null,this.h=!1,this.v=this.g=null,this.D="",this.m=0,this.l="",this.j=this.B=this.u=this.A=!1,this.I=null,this.H="",this.J=!1}R(ie,Ee);var oh=/^https?$/i,ah=["POST","PUT"];n=ie.prototype,n.Ha=function(i){this.J=i},n.ea=function(i,l,d,p){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.D+"; newUri="+i);l=l?l.toUpperCase():"GET",this.D=i,this.l="",this.m=0,this.A=!1,this.h=!0,this.g=this.o?this.o.g():Zs.g(),this.v=this.o?ea(this.o):ea(Zs),this.g.onreadystatechange=E(this.Ea,this);try{this.B=!0,this.g.open(l,String(i),!0),this.B=!1}catch(S){Sa(this,S);return}if(i=d||"",d=new Map(this.headers),p)if(Object.getPrototypeOf(p)===Object.prototype)for(var A in p)d.set(A,p[A]);else if(typeof p.keys=="function"&&typeof p.get=="function")for(const S of p.keys())d.set(S,p.get(S));else throw Error("Unknown input type for opt_headers: "+String(p));p=Array.from(d.keys()).find(S=>S.toLowerCase()=="content-type"),A=c.FormData&&i instanceof c.FormData,!(0<=Array.prototype.indexOf.call(ah,l,void 0))||p||A||d.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[S,V]of d)this.g.setRequestHeader(S,V);this.H&&(this.g.responseType=this.H),"withCredentials"in this.g&&this.g.withCredentials!==this.J&&(this.g.withCredentials=this.J);try{Ca(this),this.u=!0,this.g.send(i),this.u=!1}catch(S){Sa(this,S)}};function Sa(i,l){i.h=!1,i.g&&(i.j=!0,i.g.abort(),i.j=!1),i.l=l,i.m=5,Ra(i),Nr(i)}function Ra(i){i.A||(i.A=!0,Ce(i,"complete"),Ce(i,"error"))}n.abort=function(i){this.g&&this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1,this.m=i||7,Ce(this,"complete"),Ce(this,"abort"),Nr(this))},n.N=function(){this.g&&(this.h&&(this.h=!1,this.j=!0,this.g.abort(),this.j=!1),Nr(this,!0)),ie.aa.N.call(this)},n.Ea=function(){this.s||(this.B||this.u||this.j?Pa(this):this.bb())},n.bb=function(){Pa(this)};function Pa(i){if(i.h&&typeof a<"u"&&(!i.v[1]||Qe(i)!=4||i.Z()!=2)){if(i.u&&Qe(i)==4)Jo(i.Ea,0,i);else if(Ce(i,"readystatechange"),Qe(i)==4){i.h=!1;try{const V=i.Z();e:switch(V){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var l=!0;break e;default:l=!1}var d;if(!(d=l)){var p;if(p=V===0){var A=String(i.D).match(ya)[1]||null;!A&&c.self&&c.self.location&&(A=c.self.location.protocol.slice(0,-1)),p=!oh.test(A?A.toLowerCase():"")}d=p}if(d)Ce(i,"complete"),Ce(i,"success");else{i.m=6;try{var S=2<Qe(i)?i.g.statusText:""}catch{S=""}i.l=S+" ["+i.Z()+"]",Ra(i)}}finally{Nr(i)}}}}function Nr(i,l){if(i.g){Ca(i);const d=i.g,p=i.v[0]?()=>{}:null;i.g=null,i.v=null,l||Ce(i,"ready");try{d.onreadystatechange=p}catch{}}}function Ca(i){i.I&&(c.clearTimeout(i.I),i.I=null)}n.isActive=function(){return!!this.g};function Qe(i){return i.g?i.g.readyState:0}n.Z=function(){try{return 2<Qe(this)?this.g.status:-1}catch{return-1}},n.oa=function(){try{return this.g?this.g.responseText:""}catch{return""}},n.Oa=function(i){if(this.g){var l=this.g.responseText;return i&&l.indexOf(i)==0&&(l=l.substring(i.length)),Ud(l)}};function xa(i){try{if(!i.g)return null;if("response"in i.g)return i.g.response;switch(i.H){case"":case"text":return i.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in i.g)return i.g.mozResponseArrayBuffer}return null}catch{return null}}function lh(i){const l={};i=(i.g&&2<=Qe(i)&&i.g.getAllResponseHeaders()||"").split(`\r
`);for(let p=0;p<i.length;p++){if(N(i[p]))continue;var d=I(i[p]);const A=d[0];if(d=d[1],typeof d!="string")continue;d=d.trim();const S=l[A]||[];l[A]=S,S.push(d)}b(l,function(p){return p.join(", ")})}n.Ba=function(){return this.m},n.Ka=function(){return typeof this.l=="string"?this.l:String(this.l)};function Ln(i,l,d){return d&&d.internalChannelParams&&d.internalChannelParams[i]||l}function Da(i){this.Aa=0,this.i=[],this.j=new Cn,this.ia=this.qa=this.I=this.W=this.g=this.ya=this.D=this.H=this.m=this.S=this.o=null,this.Ya=this.U=0,this.Va=Ln("failFast",!1,i),this.F=this.C=this.u=this.s=this.l=null,this.X=!0,this.za=this.T=-1,this.Y=this.v=this.B=0,this.Ta=Ln("baseRetryDelayMs",5e3,i),this.cb=Ln("retryDelaySeedMs",1e4,i),this.Wa=Ln("forwardChannelMaxRetries",2,i),this.wa=Ln("forwardChannelRequestTimeoutMs",2e4,i),this.pa=i&&i.xmlHttpFactory||void 0,this.Xa=i&&i.Tb||void 0,this.Ca=i&&i.useFetchStreams||!1,this.L=void 0,this.J=i&&i.supportsCrossDomainXhr||!1,this.K="",this.h=new ha(i&&i.concurrentRequestLimit),this.Da=new sh,this.P=i&&i.fastHandshake||!1,this.O=i&&i.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.Ua=i&&i.Rb||!1,i&&i.xa&&this.j.xa(),i&&i.forceLongPolling&&(this.X=!1),this.ba=!this.P&&this.X&&i&&i.detectBufferingProxy||!1,this.ja=void 0,i&&i.longPollingTimeout&&0<i.longPollingTimeout&&(this.ja=i.longPollingTimeout),this.ca=void 0,this.R=0,this.M=!1,this.ka=this.A=null}n=Da.prototype,n.la=8,n.G=1,n.connect=function(i,l,d,p){xe(0),this.W=i,this.H=l||{},d&&p!==void 0&&(this.H.OSID=d,this.H.OAID=p),this.F=this.X,this.I=Fa(this,null,this.W),Lr(this)};function ai(i){if(ka(i),i.G==3){var l=i.U++,d=Ke(i.I);if(Z(d,"SID",i.K),Z(d,"RID",l),Z(d,"TYPE","terminate"),Mn(i,d),l=new lt(i,i.j,l),l.L=2,l.v=Dr(Ke(d)),d=!1,c.navigator&&c.navigator.sendBeacon)try{d=c.navigator.sendBeacon(l.v.toString(),"")}catch{}!d&&c.Image&&(new Image().src=l.v,d=!0),d||(l.g=$a(l.j,null),l.g.ea(l.v)),l.F=Date.now(),Pr(l)}Ua(i)}function Or(i){i.g&&(ci(i),i.g.cancel(),i.g=null)}function ka(i){Or(i),i.u&&(c.clearTimeout(i.u),i.u=null),Mr(i),i.h.cancel(),i.s&&(typeof i.s=="number"&&c.clearTimeout(i.s),i.s=null)}function Lr(i){if(!pa(i.h)&&!i.s){i.s=!0;var l=i.Ga;In||Ho(),Tn||(In(),Tn=!0),$s.add(l,i),i.B=0}}function ch(i,l){return fa(i.h)>=i.h.j-(i.s?1:0)?!1:i.s?(i.i=l.D.concat(i.i),!0):i.G==1||i.G==2||i.B>=(i.Va?0:i.Wa)?!1:(i.s=Pn(E(i.Ga,i,l),ja(i,i.B)),i.B++,!0)}n.Ga=function(i){if(this.s)if(this.s=null,this.G==1){if(!i){this.U=Math.floor(1e5*Math.random()),i=this.U++;const A=new lt(this,this.j,i);let S=this.o;if(this.S&&(S?(S=m(S),_(S,this.S)):S=this.S),this.m!==null||this.O||(A.H=S,S=null),this.P)e:{for(var l=0,d=0;d<this.i.length;d++){t:{var p=this.i[d];if("__data__"in p.map&&(p=p.map.__data__,typeof p=="string")){p=p.length;break t}p=void 0}if(p===void 0)break;if(l+=p,4096<l){l=d;break e}if(l===4096||d===this.i.length-1){l=d+1;break e}}l=1e3}else l=1e3;l=Na(this,A,l),d=Ke(this.I),Z(d,"RID",i),Z(d,"CVER",22),this.D&&Z(d,"X-HTTP-Session-Id",this.D),Mn(this,d),S&&(this.O?l="headers="+encodeURIComponent(String(Aa(S)))+"&"+l:this.m&&oi(d,this.m,S)),ii(this.h,A),this.Ua&&Z(d,"TYPE","init"),this.P?(Z(d,"$req",l),Z(d,"SID","null"),A.T=!0,ti(A,d,null)):ti(A,d,l),this.G=2}}else this.G==3&&(i?Va(this,i):this.i.length==0||pa(this.h)||Va(this))};function Va(i,l){var d;l?d=l.l:d=i.U++;const p=Ke(i.I);Z(p,"SID",i.K),Z(p,"RID",d),Z(p,"AID",i.T),Mn(i,p),i.m&&i.o&&oi(p,i.m,i.o),d=new lt(i,i.j,d,i.B+1),i.m===null&&(d.H=i.o),l&&(i.i=l.D.concat(i.i)),l=Na(i,d,1e3),d.I=Math.round(.5*i.wa)+Math.round(.5*i.wa*Math.random()),ii(i.h,d),ti(d,p,l)}function Mn(i,l){i.H&&O(i.H,function(d,p){Z(l,p,d)}),i.l&&va({},function(d,p){Z(l,p,d)})}function Na(i,l,d){d=Math.min(i.i.length,d);var p=i.l?E(i.l.Na,i.l,i):null;e:{var A=i.i;let S=-1;for(;;){const V=["count="+d];S==-1?0<d?(S=A[0].g,V.push("ofs="+S)):S=0:V.push("ofs="+S);let X=!0;for(let fe=0;fe<d;fe++){let Q=A[fe].g;const Ie=A[fe].map;if(Q-=S,0>Q)S=Math.max(0,A[fe].g-100),X=!1;else try{ih(Ie,V,"req"+Q+"_")}catch{p&&p(Ie)}}if(X){p=V.join("&");break e}}}return i=i.i.splice(0,d),l.D=i,p}function Oa(i){if(!i.g&&!i.u){i.Y=1;var l=i.Fa;In||Ho(),Tn||(In(),Tn=!0),$s.add(l,i),i.v=0}}function li(i){return i.g||i.u||3<=i.v?!1:(i.Y++,i.u=Pn(E(i.Fa,i),ja(i,i.v)),i.v++,!0)}n.Fa=function(){if(this.u=null,La(this),this.ba&&!(this.M||this.g==null||0>=this.R)){var i=2*this.R;this.j.info("BP detection timer enabled: "+i),this.A=Pn(E(this.ab,this),i)}},n.ab=function(){this.A&&(this.A=null,this.j.info("BP detection timeout reached."),this.j.info("Buffering proxy detected and switch to long-polling!"),this.F=!1,this.M=!0,xe(10),Or(this),La(this))};function ci(i){i.A!=null&&(c.clearTimeout(i.A),i.A=null)}function La(i){i.g=new lt(i,i.j,"rpc",i.Y),i.m===null&&(i.g.H=i.o),i.g.O=0;var l=Ke(i.qa);Z(l,"RID","rpc"),Z(l,"SID",i.K),Z(l,"AID",i.T),Z(l,"CI",i.F?"0":"1"),!i.F&&i.ja&&Z(l,"TO",i.ja),Z(l,"TYPE","xmlhttp"),Mn(i,l),i.m&&i.o&&oi(l,i.m,i.o),i.L&&(i.g.I=i.L);var d=i.g;i=i.ia,d.L=1,d.v=Dr(Ke(l)),d.m=null,d.P=!0,ca(d,i)}n.Za=function(){this.C!=null&&(this.C=null,Or(this),li(this),xe(19))};function Mr(i){i.C!=null&&(c.clearTimeout(i.C),i.C=null)}function Ma(i,l){var d=null;if(i.g==l){Mr(i),ci(i),i.g=null;var p=2}else if(si(i.h,l))d=l.D,ma(i.h,l),p=1;else return;if(i.G!=0){if(l.o)if(p==1){d=l.m?l.m.length:0,l=Date.now()-l.F;var A=i.B;p=Ar(),Ce(p,new ia(p,d)),Lr(i)}else Oa(i);else if(A=l.s,A==3||A==0&&0<l.X||!(p==1&&ch(i,l)||p==2&&li(i)))switch(d&&0<d.length&&(l=i.h,l.i=l.i.concat(d)),A){case 1:Dt(i,5);break;case 4:Dt(i,10);break;case 3:Dt(i,6);break;default:Dt(i,2)}}}function ja(i,l){let d=i.Ta+Math.floor(Math.random()*i.cb);return i.isActive()||(d*=2),d*l}function Dt(i,l){if(i.j.info("Error code "+l),l==2){var d=E(i.fb,i),p=i.Xa;const A=!p;p=new xt(p||"//www.google.com/images/cleardot.gif"),c.location&&c.location.protocol=="http"||Cr(p,"https"),Dr(p),A?nh(p.toString(),d):rh(p.toString(),d)}else xe(2);i.G=0,i.l&&i.l.sa(l),Ua(i),ka(i)}n.fb=function(i){i?(this.j.info("Successfully pinged google.com"),xe(2)):(this.j.info("Failed to ping google.com"),xe(1))};function Ua(i){if(i.G=0,i.ka=[],i.l){const l=ga(i.h);(l.length!=0||i.i.length!=0)&&(x(i.ka,l),x(i.ka,i.i),i.h.i.length=0,P(i.i),i.i.length=0),i.l.ra()}}function Fa(i,l,d){var p=d instanceof xt?Ke(d):new xt(d);if(p.g!="")l&&(p.g=l+"."+p.g),xr(p,p.s);else{var A=c.location;p=A.protocol,l=l?l+"."+A.hostname:A.hostname,A=+A.port;var S=new xt(null);p&&Cr(S,p),l&&(S.g=l),A&&xr(S,A),d&&(S.l=d),p=S}return d=i.D,l=i.ya,d&&l&&Z(p,d,l),Z(p,"VER",i.la),Mn(i,p),p}function $a(i,l,d){if(l&&!i.J)throw Error("Can't create secondary domain capable XhrIo object.");return l=i.Ca&&!i.pa?new ie(new kr({eb:d})):new ie(i.pa),l.Ha(i.J),l}n.isActive=function(){return!!this.l&&this.l.isActive(this)};function qa(){}n=qa.prototype,n.ua=function(){},n.ta=function(){},n.sa=function(){},n.ra=function(){},n.isActive=function(){return!0},n.Na=function(){};function jr(){}jr.prototype.g=function(i,l){return new Ve(i,l)};function Ve(i,l){Ee.call(this),this.g=new Da(l),this.l=i,this.h=l&&l.messageUrlParams||null,i=l&&l.messageHeaders||null,l&&l.clientProtocolHeaderRequired&&(i?i["X-Client-Protocol"]="webchannel":i={"X-Client-Protocol":"webchannel"}),this.g.o=i,i=l&&l.initMessageHeaders||null,l&&l.messageContentType&&(i?i["X-WebChannel-Content-Type"]=l.messageContentType:i={"X-WebChannel-Content-Type":l.messageContentType}),l&&l.va&&(i?i["X-WebChannel-Client-Profile"]=l.va:i={"X-WebChannel-Client-Profile":l.va}),this.g.S=i,(i=l&&l.Sb)&&!N(i)&&(this.g.m=i),this.v=l&&l.supportsCrossDomainXhr||!1,this.u=l&&l.sendRawJson||!1,(l=l&&l.httpSessionIdParam)&&!N(l)&&(this.g.D=l,i=this.h,i!==null&&l in i&&(i=this.h,l in i&&delete i[l])),this.j=new Qt(this)}R(Ve,Ee),Ve.prototype.m=function(){this.g.l=this.j,this.v&&(this.g.J=!0),this.g.connect(this.l,this.h||void 0)},Ve.prototype.close=function(){ai(this.g)},Ve.prototype.o=function(i){var l=this.g;if(typeof i=="string"){var d={};d.__data__=i,i=d}else this.u&&(d={},d.__data__=Qs(i),i=d);l.i.push(new Gd(l.Ya++,i)),l.G==3&&Lr(l)},Ve.prototype.N=function(){this.g.l=null,delete this.j,ai(this.g),delete this.g,Ve.aa.N.call(this)};function Ba(i){Ys.call(this),i.__headers__&&(this.headers=i.__headers__,this.statusCode=i.__status__,delete i.__headers__,delete i.__status__);var l=i.__sm__;if(l){e:{for(const d in l){i=d;break e}i=void 0}(this.i=i)&&(i=this.i,l=l!==null&&i in l?l[i]:void 0),this.data=l}else this.data=i}R(Ba,Ys);function za(){Xs.call(this),this.status=1}R(za,Xs);function Qt(i){this.g=i}R(Qt,qa),Qt.prototype.ua=function(){Ce(this.g,"a")},Qt.prototype.ta=function(i){Ce(this.g,new Ba(i))},Qt.prototype.sa=function(i){Ce(this.g,new za)},Qt.prototype.ra=function(){Ce(this.g,"b")},jr.prototype.createWebChannel=jr.prototype.g,Ve.prototype.send=Ve.prototype.o,Ve.prototype.open=Ve.prototype.m,Ve.prototype.close=Ve.prototype.close,Pc=function(){return new jr},Rc=function(){return Ar()},Sc=Pt,xi={mb:0,pb:1,qb:2,Jb:3,Ob:4,Lb:5,Mb:6,Kb:7,Ib:8,Nb:9,PROXY:10,NOPROXY:11,Gb:12,Cb:13,Db:14,Bb:15,Eb:16,Fb:17,ib:18,hb:19,jb:20},Sr.NO_ERROR=0,Sr.TIMEOUT=8,Sr.HTTP_ERROR=6,Kr=Sr,oa.COMPLETE="complete",Ac=oa,ta.EventType=Sn,Sn.OPEN="a",Sn.CLOSE="b",Sn.ERROR="c",Sn.MESSAGE="d",Ee.prototype.listen=Ee.prototype.K,qn=ta,ie.prototype.listenOnce=ie.prototype.L,ie.prototype.getLastError=ie.prototype.Ka,ie.prototype.getLastErrorCode=ie.prototype.Ba,ie.prototype.getStatus=ie.prototype.Z,ie.prototype.getResponseJson=ie.prototype.Oa,ie.prototype.getResponseText=ie.prototype.oa,ie.prototype.send=ie.prototype.ea,ie.prototype.setWithCredentials=ie.prototype.Ha,wc=ie}).apply(typeof Fr<"u"?Fr:typeof self<"u"?self:typeof window<"u"?window:{});const nl="@firebase/firestore";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ae{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}Ae.UNAUTHENTICATED=new Ae(null),Ae.GOOGLE_CREDENTIALS=new Ae("google-credentials-uid"),Ae.FIRST_PARTY=new Ae("first-party-uid"),Ae.MOCK_USER=new Ae("mock-user");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let gn="10.14.0";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ft=new Ji("@firebase/firestore");function jn(){return Ft.logLevel}function j(n,...e){if(Ft.logLevel<=W.DEBUG){const t=e.map(eo);Ft.debug(`Firestore (${gn}): ${n}`,...t)}}function nt(n,...e){if(Ft.logLevel<=W.ERROR){const t=e.map(eo);Ft.error(`Firestore (${gn}): ${n}`,...t)}}function an(n,...e){if(Ft.logLevel<=W.WARN){const t=e.map(eo);Ft.warn(`Firestore (${gn}): ${n}`,...t)}}function eo(n){if(typeof n=="string")return n;try{/**
* @license
* Copyright 2020 Google LLC
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function B(n="Unexpected state"){const e=`FIRESTORE (${gn}) INTERNAL ASSERTION FAILED: `+n;throw nt(e),new Error(e)}function Y(n,e){n||B()}function H(n,e){return n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const C={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class M extends ot{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class et{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cc{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class Kp{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(Ae.UNAUTHENTICATED))}shutdown(){}}class Qp{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class Jp{constructor(e){this.t=e,this.currentUser=Ae.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){Y(this.o===void 0);let r=this.i;const s=u=>this.i!==r?(r=this.i,t(u)):Promise.resolve();let o=new et;this.o=()=>{this.i++,this.currentUser=this.u(),o.resolve(),o=new et,e.enqueueRetryable(()=>s(this.currentUser))};const a=()=>{const u=o;e.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},c=u=>{j("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.o&&(this.auth.addAuthTokenListener(this.o),a())};this.t.onInit(u=>c(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?c(u):(j("FirebaseAuthCredentialsProvider","Auth not yet detected"),o.resolve(),o=new et)}},0),a()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(r=>this.i!==e?(j("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(Y(typeof r.accessToken=="string"),new Cc(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.o&&this.auth.removeAuthTokenListener(this.o),this.o=void 0}u(){const e=this.auth&&this.auth.getUid();return Y(e===null||typeof e=="string"),new Ae(e)}}class Yp{constructor(e,t,r){this.l=e,this.h=t,this.P=r,this.type="FirstParty",this.user=Ae.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class Xp{constructor(e,t,r){this.l=e,this.h=t,this.P=r}getToken(){return Promise.resolve(new Yp(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(Ae.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Zp{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class ef{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){Y(this.o===void 0);const r=o=>{o.error!=null&&j("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${o.error.message}`);const a=o.token!==this.R;return this.R=o.token,j("FirebaseAppCheckTokenProvider",`Received ${a?"new":"existing"} token.`),a?t(o.token):Promise.resolve()};this.o=o=>{e.enqueueRetryable(()=>r(o))};const s=o=>{j("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=o,this.o&&this.appCheck.addTokenListener(this.o)};this.A.onInit(o=>s(o)),setTimeout(()=>{if(!this.appCheck){const o=this.A.getImmediate({optional:!0});o?s(o):j("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(Y(typeof t.token=="string"),this.R=t.token,new Zp(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.o&&this.appCheck.removeTokenListener(this.o),this.o=void 0}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function tf(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let r=0;r<n;r++)t[r]=Math.floor(256*Math.random());return t}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xc{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let r="";for(;r.length<20;){const s=tf(40);for(let o=0;o<s.length;++o)r.length<20&&s[o]<t&&(r+=e.charAt(s[o]%e.length))}return r}}function J(n,e){return n<e?-1:n>e?1:0}function ln(n,e,t){return n.length===e.length&&n.every((r,s)=>t(r,e[s]))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ue{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new M(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new M(C.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new M(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new M(C.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return ue.fromMillis(Date.now())}static fromDate(e){return ue.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),r=Math.floor(1e6*(e-1e3*t));return new ue(t,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?J(this.nanoseconds,e.nanoseconds):J(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.timestamp=e}static fromTimestamp(e){return new z(e)}static min(){return new z(new ue(0,0))}static max(){return new z(new ue(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Zn{constructor(e,t,r){t===void 0?t=0:t>e.length&&B(),r===void 0?r=e.length-t:r>e.length-t&&B(),this.segments=e,this.offset=t,this.len=r}get length(){return this.len}isEqual(e){return Zn.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof Zn?e.forEach(r=>{t.push(r)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,r=this.limit();t<r;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const r=Math.min(e.length,t.length);for(let s=0;s<r;s++){const o=e.get(s),a=t.get(s);if(o<a)return-1;if(o>a)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class ee extends Zn{construct(e,t,r){return new ee(e,t,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}toUriEncodedString(){return this.toArray().map(encodeURIComponent).join("/")}static fromString(...e){const t=[];for(const r of e){if(r.indexOf("//")>=0)throw new M(C.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);t.push(...r.split("/").filter(s=>s.length>0))}return new ee(t)}static emptyPath(){return new ee([])}}const nf=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class ge extends Zn{construct(e,t,r){return new ge(e,t,r)}static isValidIdentifier(e){return nf.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),ge.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new ge(["__name__"])}static fromServerFormat(e){const t=[];let r="",s=0;const o=()=>{if(r.length===0)throw new M(C.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(r),r=""};let a=!1;for(;s<e.length;){const c=e[s];if(c==="\\"){if(s+1===e.length)throw new M(C.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const u=e[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new M(C.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);r+=u,s+=2}else c==="`"?(a=!a,s++):c!=="."||a?(r+=c,s++):(o(),s++)}if(o(),a)throw new M(C.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new ge(t)}static emptyPath(){return new ge([])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ${constructor(e){this.path=e}static fromPath(e){return new $(ee.fromString(e))}static fromName(e){return new $(ee.fromString(e).popFirst(5))}static empty(){return new $(ee.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&ee.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return ee.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new $(new ee(e.slice()))}}function rf(n,e){const t=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=z.fromTimestamp(r===1e9?new ue(t+1,0):new ue(t,r));return new wt(s,$.empty(),e)}function sf(n){return new wt(n.readTime,n.key,-1)}class wt{constructor(e,t,r){this.readTime=e,this.documentKey=t,this.largestBatchId=r}static min(){return new wt(z.min(),$.empty(),-1)}static max(){return new wt(z.max(),$.empty(),-1)}}function of(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=$.comparator(n.documentKey,e.documentKey),t!==0?t:J(n.largestBatchId,e.largestBatchId))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const af="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class lf{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function cr(n){if(n.code!==C.FAILED_PRECONDITION||n.message!==af)throw n;j("LocalStore","Unexpectedly lost primary lease")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class D{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&B(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new D((r,s)=>{this.nextCallback=o=>{this.wrapSuccess(e,o).next(r,s)},this.catchCallback=o=>{this.wrapFailure(t,o).next(r,s)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof D?t:D.resolve(t)}catch(t){return D.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):D.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):D.reject(t)}static resolve(e){return new D((t,r)=>{t(e)})}static reject(e){return new D((t,r)=>{r(e)})}static waitFor(e){return new D((t,r)=>{let s=0,o=0,a=!1;e.forEach(c=>{++s,c.next(()=>{++o,a&&o===s&&t()},u=>r(u))}),a=!0,o===s&&t()})}static or(e){let t=D.resolve(!1);for(const r of e)t=t.next(s=>s?D.resolve(s):r());return t}static forEach(e,t){const r=[];return e.forEach((s,o)=>{r.push(t.call(this,s,o))}),this.waitFor(r)}static mapArray(e,t){return new D((r,s)=>{const o=e.length,a=new Array(o);let c=0;for(let u=0;u<o;u++){const h=u;t(e[h]).next(f=>{a[h]=f,++c,c===o&&r(a)},f=>s(f))}})}static doWhile(e,t){return new D((r,s)=>{const o=()=>{e()===!0?t().next(()=>{o()},s):r()};o()})}}function cf(n){const e=n.match(/Android ([\d.]+)/i),t=e?e[1].split(".").slice(0,2).join("."):"-1";return Number(t)}function ur(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class to{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=r=>this.ie(r),this.se=r=>t.writeSequenceNumber(r))}ie(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.se&&this.se(e),e}}to.oe=-1;function Ss(n){return n==null}function ls(n){return n===0&&1/n==-1/0}function uf(n){return typeof n=="number"&&Number.isInteger(n)&&!ls(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function rl(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function vn(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function Dc(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class re{constructor(e,t){this.comparator=e,this.root=t||me.EMPTY}insert(e,t){return new re(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,me.BLACK,null,null))}remove(e){return new re(this.comparator,this.root.remove(e,this.comparator).copy(null,null,me.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const r=this.comparator(e,t.key);if(r===0)return t.value;r<0?t=t.left:r>0&&(t=t.right)}return null}indexOf(e){let t=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(e,r.key);if(s===0)return t+r.left.size;s<0?r=r.left:(t+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,r)=>(e(t,r),!1))}toString(){const e=[];return this.inorderTraversal((t,r)=>(e.push(`${t}:${r}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new $r(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new $r(this.root,e,this.comparator,!1)}getReverseIterator(){return new $r(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new $r(this.root,e,this.comparator,!0)}}class $r{constructor(e,t,r,s){this.isReverse=s,this.nodeStack=[];let o=1;for(;!e.isEmpty();)if(o=t?r(e.key,t):1,t&&s&&(o*=-1),o<0)e=this.isReverse?e.left:e.right;else{if(o===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}}class me{constructor(e,t,r,s,o){this.key=e,this.value=t,this.color=r??me.RED,this.left=s??me.EMPTY,this.right=o??me.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,r,s,o){return new me(e??this.key,t??this.value,r??this.color,s??this.left,o??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,r){let s=this;const o=r(e,s.key);return s=o<0?s.copy(null,null,null,s.left.insert(e,t,r),null):o===0?s.copy(null,t,null,null,null):s.copy(null,null,null,null,s.right.insert(e,t,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return me.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let r,s=this;if(t(e,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),t(e,s.key)===0){if(s.right.isEmpty())return me.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,me.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,me.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw B();const e=this.left.check();if(e!==this.right.check())throw B();return e+(this.isRed()?0:1)}}me.EMPTY=null,me.RED=!0,me.BLACK=!1;me.EMPTY=new class{constructor(){this.size=0}get key(){throw B()}get value(){throw B()}get color(){throw B()}get left(){throw B()}get right(){throw B()}copy(e,t,r,s,o){return this}insert(e,t,r){return new me(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ye{constructor(e){this.comparator=e,this.data=new re(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,r)=>(e(t),!1))}forEachInRange(e,t){const r=this.data.getIteratorFrom(e[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,e[1])>=0)return;t(s.key)}}forEachWhile(e,t){let r;for(r=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();r.hasNext();)if(!e(r.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new sl(this.data.getIterator())}getIteratorFrom(e){return new sl(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(r=>{t=t.add(r)}),t}isEqual(e){if(!(e instanceof ye)||this.size!==e.size)return!1;const t=this.data.getIterator(),r=e.data.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(this.comparator(s,o)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new ye(this.comparator);return t.data=e,t}}class sl{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ue{constructor(e){this.fields=e,e.sort(ge.comparator)}static empty(){return new Ue([])}unionWith(e){let t=new ye(ge.comparator);for(const r of this.fields)t=t.add(r);for(const r of e)t=t.add(r);return new Ue(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return ln(this.fields,e.fields,(t,r)=>t.isEqual(r))}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kc extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _e{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(s){try{return atob(s)}catch(o){throw typeof DOMException<"u"&&o instanceof DOMException?new kc("Invalid base64 string: "+o):o}}(e);return new _e(t)}static fromUint8Array(e){const t=function(s){let o="";for(let a=0;a<s.length;++a)o+=String.fromCharCode(s[a]);return o}(e);return new _e(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const r=new Uint8Array(t.length);for(let s=0;s<t.length;s++)r[s]=t.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return J(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}_e.EMPTY_BYTE_STRING=new _e("");const df=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function At(n){if(Y(!!n),typeof n=="string"){let e=0;const t=df.exec(n);if(Y(!!t),t[1]){let s=t[1];s=(s+"000000000").substr(0,9),e=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:e}}return{seconds:ae(n.seconds),nanos:ae(n.nanos)}}function ae(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function $t(n){return typeof n=="string"?_e.fromBase64String(n):_e.fromUint8Array(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function no(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function ro(n){const e=n.mapValue.fields.__previous_value__;return no(e)?ro(e):e}function er(n){const e=At(n.mapValue.fields.__local_write_time__.timestampValue);return new ue(e.seconds,e.nanos)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hf{constructor(e,t,r,s,o,a,c,u,h){this.databaseId=e,this.appId=t,this.persistenceKey=r,this.host=s,this.ssl=o,this.forceLongPolling=a,this.autoDetectLongPolling=c,this.longPollingOptions=u,this.useFetchStreams=h}}class tr{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new tr("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof tr&&e.projectId===this.projectId&&e.database===this.database}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qr={mapValue:{}};function qt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?no(n)?4:ff(n)?9007199254740991:pf(n)?10:11:B()}function We(n,e){if(n===e)return!0;const t=qt(n);if(t!==qt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return er(n).isEqual(er(e));case 3:return function(s,o){if(typeof s.timestampValue=="string"&&typeof o.timestampValue=="string"&&s.timestampValue.length===o.timestampValue.length)return s.timestampValue===o.timestampValue;const a=At(s.timestampValue),c=At(o.timestampValue);return a.seconds===c.seconds&&a.nanos===c.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(s,o){return $t(s.bytesValue).isEqual($t(o.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(s,o){return ae(s.geoPointValue.latitude)===ae(o.geoPointValue.latitude)&&ae(s.geoPointValue.longitude)===ae(o.geoPointValue.longitude)}(n,e);case 2:return function(s,o){if("integerValue"in s&&"integerValue"in o)return ae(s.integerValue)===ae(o.integerValue);if("doubleValue"in s&&"doubleValue"in o){const a=ae(s.doubleValue),c=ae(o.doubleValue);return a===c?ls(a)===ls(c):isNaN(a)&&isNaN(c)}return!1}(n,e);case 9:return ln(n.arrayValue.values||[],e.arrayValue.values||[],We);case 10:case 11:return function(s,o){const a=s.mapValue.fields||{},c=o.mapValue.fields||{};if(rl(a)!==rl(c))return!1;for(const u in a)if(a.hasOwnProperty(u)&&(c[u]===void 0||!We(a[u],c[u])))return!1;return!0}(n,e);default:return B()}}function nr(n,e){return(n.values||[]).find(t=>We(t,e))!==void 0}function cn(n,e){if(n===e)return 0;const t=qt(n),r=qt(e);if(t!==r)return J(t,r);switch(t){case 0:case 9007199254740991:return 0;case 1:return J(n.booleanValue,e.booleanValue);case 2:return function(o,a){const c=ae(o.integerValue||o.doubleValue),u=ae(a.integerValue||a.doubleValue);return c<u?-1:c>u?1:c===u?0:isNaN(c)?isNaN(u)?0:-1:1}(n,e);case 3:return il(n.timestampValue,e.timestampValue);case 4:return il(er(n),er(e));case 5:return J(n.stringValue,e.stringValue);case 6:return function(o,a){const c=$t(o),u=$t(a);return c.compareTo(u)}(n.bytesValue,e.bytesValue);case 7:return function(o,a){const c=o.split("/"),u=a.split("/");for(let h=0;h<c.length&&h<u.length;h++){const f=J(c[h],u[h]);if(f!==0)return f}return J(c.length,u.length)}(n.referenceValue,e.referenceValue);case 8:return function(o,a){const c=J(ae(o.latitude),ae(a.latitude));return c!==0?c:J(ae(o.longitude),ae(a.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return ol(n.arrayValue,e.arrayValue);case 10:return function(o,a){var c,u,h,f;const v=o.fields||{},E=a.fields||{},T=(c=v.value)===null||c===void 0?void 0:c.arrayValue,R=(u=E.value)===null||u===void 0?void 0:u.arrayValue,P=J(((h=T==null?void 0:T.values)===null||h===void 0?void 0:h.length)||0,((f=R==null?void 0:R.values)===null||f===void 0?void 0:f.length)||0);return P!==0?P:ol(T,R)}(n.mapValue,e.mapValue);case 11:return function(o,a){if(o===qr.mapValue&&a===qr.mapValue)return 0;if(o===qr.mapValue)return 1;if(a===qr.mapValue)return-1;const c=o.fields||{},u=Object.keys(c),h=a.fields||{},f=Object.keys(h);u.sort(),f.sort();for(let v=0;v<u.length&&v<f.length;++v){const E=J(u[v],f[v]);if(E!==0)return E;const T=cn(c[u[v]],h[f[v]]);if(T!==0)return T}return J(u.length,f.length)}(n.mapValue,e.mapValue);default:throw B()}}function il(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return J(n,e);const t=At(n),r=At(e),s=J(t.seconds,r.seconds);return s!==0?s:J(t.nanos,r.nanos)}function ol(n,e){const t=n.values||[],r=e.values||[];for(let s=0;s<t.length&&s<r.length;++s){const o=cn(t[s],r[s]);if(o)return o}return J(t.length,r.length)}function un(n){return Di(n)}function Di(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const r=At(t);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return $t(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return $.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let r="[",s=!0;for(const o of t.values||[])s?s=!1:r+=",",r+=Di(o);return r+"]"}(n.arrayValue):"mapValue"in n?function(t){const r=Object.keys(t.fields||{}).sort();let s="{",o=!0;for(const a of r)o?o=!1:s+=",",s+=`${a}:${Di(t.fields[a])}`;return s+"}"}(n.mapValue):B()}function al(n,e){return{referenceValue:`projects/${n.projectId}/databases/${n.database}/documents/${e.path.canonicalString()}`}}function ki(n){return!!n&&"integerValue"in n}function so(n){return!!n&&"arrayValue"in n}function ll(n){return!!n&&"nullValue"in n}function cl(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Qr(n){return!!n&&"mapValue"in n}function pf(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="__vector__"}function Gn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return vn(n.mapValue.fields,(t,r)=>e.mapValue.fields[t]=Gn(r)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Gn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function ff(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e){this.value=e}static empty(){return new Oe({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let r=0;r<e.length-1;++r)if(t=(t.mapValue.fields||{})[e.get(r)],!Qr(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Gn(t)}setAll(e){let t=ge.emptyPath(),r={},s=[];e.forEach((a,c)=>{if(!t.isImmediateParentOf(c)){const u=this.getFieldsMap(t);this.applyChanges(u,r,s),r={},s=[],t=c.popLast()}a?r[c.lastSegment()]=Gn(a):s.push(c.lastSegment())});const o=this.getFieldsMap(t);this.applyChanges(o,r,s)}delete(e){const t=this.field(e.popLast());Qr(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return We(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let r=0;r<e.length;++r){let s=t.mapValue.fields[e.get(r)];Qr(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},t.mapValue.fields[e.get(r)]=s),t=s}return t.mapValue.fields}applyChanges(e,t,r){vn(t,(s,o)=>e[s]=o);for(const s of r)delete e[s]}clone(){return new Oe(Gn(this.value))}}function Vc(n){const e=[];return vn(n.fields,(t,r)=>{const s=new ge([t]);if(Qr(r)){const o=Vc(r.mapValue).fields;if(o.length===0)e.push(s);else for(const a of o)e.push(s.child(a))}else e.push(s)}),new Ue(e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,r,s,o,a,c){this.key=e,this.documentType=t,this.version=r,this.readTime=s,this.createTime=o,this.data=a,this.documentState=c}static newInvalidDocument(e){return new Se(e,0,z.min(),z.min(),z.min(),Oe.empty(),0)}static newFoundDocument(e,t,r,s){return new Se(e,1,t,z.min(),r,s,0)}static newNoDocument(e,t){return new Se(e,2,t,z.min(),z.min(),Oe.empty(),0)}static newUnknownDocument(e,t){return new Se(e,3,t,z.min(),z.min(),Oe.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(z.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Oe.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Oe.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=z.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof Se&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new Se(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cs{constructor(e,t){this.position=e,this.inclusive=t}}function ul(n,e,t){let r=0;for(let s=0;s<n.position.length;s++){const o=e[s],a=n.position[s];if(o.field.isKeyField()?r=$.comparator($.fromName(a.referenceValue),t.key):r=cn(a,t.data.field(o.field)),o.dir==="desc"&&(r*=-1),r!==0)break}return r}function dl(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!We(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class us{constructor(e,t="asc"){this.field=e,this.dir=t}}function mf(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Nc{}class ce extends Nc{constructor(e,t,r){super(),this.field=e,this.op=t,this.value=r}static create(e,t,r){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,r):new vf(e,t,r):t==="array-contains"?new bf(e,r):t==="in"?new Ef(e,r):t==="not-in"?new If(e,r):t==="array-contains-any"?new Tf(e,r):new ce(e,t,r)}static createKeyFieldInFilter(e,t,r){return t==="in"?new yf(e,r):new _f(e,r)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(cn(t,this.value)):t!==null&&qt(this.value)===qt(t)&&this.matchesComparison(cn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return B()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Fe extends Nc{constructor(e,t){super(),this.filters=e,this.op=t,this.ae=null}static create(e,t){return new Fe(e,t)}matches(e){return Oc(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ae!==null||(this.ae=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ae}getFilters(){return Object.assign([],this.filters)}}function Oc(n){return n.op==="and"}function Lc(n){return gf(n)&&Oc(n)}function gf(n){for(const e of n.filters)if(e instanceof Fe)return!1;return!0}function Vi(n){if(n instanceof ce)return n.field.canonicalString()+n.op.toString()+un(n.value);if(Lc(n))return n.filters.map(e=>Vi(e)).join(",");{const e=n.filters.map(t=>Vi(t)).join(",");return`${n.op}(${e})`}}function Mc(n,e){return n instanceof ce?function(r,s){return s instanceof ce&&r.op===s.op&&r.field.isEqual(s.field)&&We(r.value,s.value)}(n,e):n instanceof Fe?function(r,s){return s instanceof Fe&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((o,a,c)=>o&&Mc(a,s.filters[c]),!0):!1}(n,e):void B()}function jc(n){return n instanceof ce?function(t){return`${t.field.canonicalString()} ${t.op} ${un(t.value)}`}(n):n instanceof Fe?function(t){return t.op.toString()+" {"+t.getFilters().map(jc).join(" ,")+"}"}(n):"Filter"}class vf extends ce{constructor(e,t,r){super(e,t,r),this.key=$.fromName(r.referenceValue)}matches(e){const t=$.comparator(e.key,this.key);return this.matchesComparison(t)}}class yf extends ce{constructor(e,t){super(e,"in",t),this.keys=Uc("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class _f extends ce{constructor(e,t){super(e,"not-in",t),this.keys=Uc("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Uc(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(r=>$.fromName(r.referenceValue))}class bf extends ce{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return so(t)&&nr(t.arrayValue,this.value)}}class Ef extends ce{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&nr(this.value.arrayValue,t)}}class If extends ce{constructor(e,t){super(e,"not-in",t)}matches(e){if(nr(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!nr(this.value.arrayValue,t)}}class Tf extends ce{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!so(t)||!t.arrayValue.values)&&t.arrayValue.values.some(r=>nr(this.value.arrayValue,r))}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wf{constructor(e,t=null,r=[],s=[],o=null,a=null,c=null){this.path=e,this.collectionGroup=t,this.orderBy=r,this.filters=s,this.limit=o,this.startAt=a,this.endAt=c,this.ue=null}}function hl(n,e=null,t=[],r=[],s=null,o=null,a=null){return new wf(n,e,t,r,s,o,a)}function io(n){const e=H(n);if(e.ue===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(r=>Vi(r)).join(","),t+="|ob:",t+=e.orderBy.map(r=>function(o){return o.field.canonicalString()+o.dir}(r)).join(","),Ss(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(r=>un(r)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(r=>un(r)).join(",")),e.ue=t}return e.ue}function oo(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!mf(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Mc(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!dl(n.startAt,e.startAt)&&dl(n.endAt,e.endAt)}function Ni(n){return $.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dr{constructor(e,t=null,r=[],s=[],o=null,a="F",c=null,u=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=r,this.filters=s,this.limit=o,this.limitType=a,this.startAt=c,this.endAt=u,this.ce=null,this.le=null,this.he=null,this.startAt,this.endAt}}function Af(n,e,t,r,s,o,a,c){return new dr(n,e,t,r,s,o,a,c)}function ao(n){return new dr(n)}function pl(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Fc(n){return n.collectionGroup!==null}function Wn(n){const e=H(n);if(e.ce===null){e.ce=[];const t=new Set;for(const o of e.explicitOrderBy)e.ce.push(o),t.add(o.field.canonicalString());const r=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(a){let c=new ye(ge.comparator);return a.filters.forEach(u=>{u.getFlattenedFilters().forEach(h=>{h.isInequality()&&(c=c.add(h.field))})}),c})(e).forEach(o=>{t.has(o.canonicalString())||o.isKeyField()||e.ce.push(new us(o,r))}),t.has(ge.keyField().canonicalString())||e.ce.push(new us(ge.keyField(),r))}return e.ce}function $e(n){const e=H(n);return e.le||(e.le=Sf(e,Wn(n))),e.le}function Sf(n,e){if(n.limitType==="F")return hl(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(s=>{const o=s.dir==="desc"?"asc":"desc";return new us(s.field,o)});const t=n.endAt?new cs(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new cs(n.startAt.position,n.startAt.inclusive):null;return hl(n.path,n.collectionGroup,e,n.filters,n.limit,t,r)}}function Oi(n,e){const t=n.filters.concat([e]);return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),t,n.limit,n.limitType,n.startAt,n.endAt)}function Li(n,e,t){return new dr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function Rs(n,e){return oo($e(n),$e(e))&&n.limitType===e.limitType}function $c(n){return`${io($e(n))}|lt:${n.limitType}`}function Yt(n){return`Query(target=${function(t){let r=t.path.canonicalString();return t.collectionGroup!==null&&(r+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(r+=`, filters: [${t.filters.map(s=>jc(s)).join(", ")}]`),Ss(t.limit)||(r+=", limit: "+t.limit),t.orderBy.length>0&&(r+=`, orderBy: [${t.orderBy.map(s=>function(a){return`${a.field.canonicalString()} (${a.dir})`}(s)).join(", ")}]`),t.startAt&&(r+=", startAt: ",r+=t.startAt.inclusive?"b:":"a:",r+=t.startAt.position.map(s=>un(s)).join(",")),t.endAt&&(r+=", endAt: ",r+=t.endAt.inclusive?"a:":"b:",r+=t.endAt.position.map(s=>un(s)).join(",")),`Target(${r})`}($e(n))}; limitType=${n.limitType})`}function Ps(n,e){return e.isFoundDocument()&&function(r,s){const o=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(o):$.isDocumentKey(r.path)?r.path.isEqual(o):r.path.isImmediateParentOf(o)}(n,e)&&function(r,s){for(const o of Wn(r))if(!o.field.isKeyField()&&s.data.field(o.field)===null)return!1;return!0}(n,e)&&function(r,s){for(const o of r.filters)if(!o.matches(s))return!1;return!0}(n,e)&&function(r,s){return!(r.startAt&&!function(a,c,u){const h=ul(a,c,u);return a.inclusive?h<=0:h<0}(r.startAt,Wn(r),s)||r.endAt&&!function(a,c,u){const h=ul(a,c,u);return a.inclusive?h>=0:h>0}(r.endAt,Wn(r),s))}(n,e)}function Rf(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function qc(n){return(e,t)=>{let r=!1;for(const s of Wn(n)){const o=Pf(s,e,t);if(o!==0)return o;r=r||s.field.isKeyField()}return 0}}function Pf(n,e,t){const r=n.field.isKeyField()?$.comparator(e.key,t.key):function(o,a,c){const u=a.data.field(o),h=c.data.field(o);return u!==null&&h!==null?cn(u,h):B()}(n.field,e,t);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return B()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r!==void 0){for(const[s,o]of r)if(this.equalsFn(s,e))return o}}has(e){return this.get(e)!==void 0}set(e,t){const r=this.mapKeyFn(e),s=this.inner[r];if(s===void 0)return this.inner[r]=[[e,t]],void this.innerSize++;for(let o=0;o<s.length;o++)if(this.equalsFn(s[o][0],e))return void(s[o]=[e,t]);s.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),r=this.inner[t];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],e))return r.length===1?delete this.inner[t]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(e){vn(this.inner,(t,r)=>{for(const[s,o]of r)e(s,o)})}isEmpty(){return Dc(this.inner)}size(){return this.innerSize}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Cf=new re($.comparator);function rt(){return Cf}const Bc=new re($.comparator);function Bn(...n){let e=Bc;for(const t of n)e=e.insert(t.key,t);return e}function zc(n){let e=Bc;return n.forEach((t,r)=>e=e.insert(t,r.overlayedDocument)),e}function Nt(){return Kn()}function Hc(){return Kn()}function Kn(){return new yn(n=>n.toString(),(n,e)=>n.isEqual(e))}const xf=new re($.comparator),Df=new ye($.comparator);function G(...n){let e=Df;for(const t of n)e=e.add(t);return e}const kf=new ye(J);function Vf(){return kf}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function lo(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:ls(e)?"-0":e}}function Gc(n){return{integerValue:""+n}}function Nf(n,e){return uf(e)?Gc(e):lo(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cs{constructor(){this._=void 0}}function Of(n,e,t){return n instanceof ds?function(s,o){const a={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return o&&no(o)&&(o=ro(o)),o&&(a.fields.__previous_value__=o),{mapValue:a}}(t,e):n instanceof rr?Kc(n,e):n instanceof sr?Qc(n,e):function(s,o){const a=Wc(s,o),c=fl(a)+fl(s.Pe);return ki(a)&&ki(s.Pe)?Gc(c):lo(s.serializer,c)}(n,e)}function Lf(n,e,t){return n instanceof rr?Kc(n,e):n instanceof sr?Qc(n,e):t}function Wc(n,e){return n instanceof hs?function(r){return ki(r)||function(o){return!!o&&"doubleValue"in o}(r)}(e)?e:{integerValue:0}:null}class ds extends Cs{}class rr extends Cs{constructor(e){super(),this.elements=e}}function Kc(n,e){const t=Jc(e);for(const r of n.elements)t.some(s=>We(s,r))||t.push(r);return{arrayValue:{values:t}}}class sr extends Cs{constructor(e){super(),this.elements=e}}function Qc(n,e){let t=Jc(e);for(const r of n.elements)t=t.filter(s=>!We(s,r));return{arrayValue:{values:t}}}class hs extends Cs{constructor(e,t){super(),this.serializer=e,this.Pe=t}}function fl(n){return ae(n.integerValue||n.doubleValue)}function Jc(n){return so(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}function Mf(n,e){return n.field.isEqual(e.field)&&function(r,s){return r instanceof rr&&s instanceof rr||r instanceof sr&&s instanceof sr?ln(r.elements,s.elements,We):r instanceof hs&&s instanceof hs?We(r.Pe,s.Pe):r instanceof ds&&s instanceof ds}(n.transform,e.transform)}class jf{constructor(e,t){this.version=e,this.transformResults=t}}class qe{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new qe}static exists(e){return new qe(void 0,e)}static updateTime(e){return new qe(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function Jr(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class xs{}function Yc(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new co(n.key,qe.none()):new hr(n.key,n.data,qe.none());{const t=n.data,r=Oe.empty();let s=new ye(ge.comparator);for(let o of e.fields)if(!s.has(o)){let a=t.field(o);a===null&&o.length>1&&(o=o.popLast(),a=t.field(o)),a===null?r.delete(o):r.set(o,a),s=s.add(o)}return new Ht(n.key,r,new Ue(s.toArray()),qe.none())}}function Uf(n,e,t){n instanceof hr?function(s,o,a){const c=s.value.clone(),u=gl(s.fieldTransforms,o,a.transformResults);c.setAll(u),o.convertToFoundDocument(a.version,c).setHasCommittedMutations()}(n,e,t):n instanceof Ht?function(s,o,a){if(!Jr(s.precondition,o))return void o.convertToUnknownDocument(a.version);const c=gl(s.fieldTransforms,o,a.transformResults),u=o.data;u.setAll(Xc(s)),u.setAll(c),o.convertToFoundDocument(a.version,u).setHasCommittedMutations()}(n,e,t):function(s,o,a){o.convertToNoDocument(a.version).setHasCommittedMutations()}(0,e,t)}function Qn(n,e,t,r){return n instanceof hr?function(o,a,c,u){if(!Jr(o.precondition,a))return c;const h=o.value.clone(),f=vl(o.fieldTransforms,u,a);return h.setAll(f),a.convertToFoundDocument(a.version,h).setHasLocalMutations(),null}(n,e,t,r):n instanceof Ht?function(o,a,c,u){if(!Jr(o.precondition,a))return c;const h=vl(o.fieldTransforms,u,a),f=a.data;return f.setAll(Xc(o)),f.setAll(h),a.convertToFoundDocument(a.version,f).setHasLocalMutations(),c===null?null:c.unionWith(o.fieldMask.fields).unionWith(o.fieldTransforms.map(v=>v.field))}(n,e,t,r):function(o,a,c){return Jr(o.precondition,a)?(a.convertToNoDocument(a.version).setHasLocalMutations(),null):c}(n,e,t)}function Ff(n,e){let t=null;for(const r of n.fieldTransforms){const s=e.data.field(r.field),o=Wc(r.transform,s||null);o!=null&&(t===null&&(t=Oe.empty()),t.set(r.field,o))}return t||null}function ml(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ln(r,s,(o,a)=>Mf(o,a))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class hr extends xs{constructor(e,t,r,s=[]){super(),this.key=e,this.value=t,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ht extends xs{constructor(e,t,r,s,o=[]){super(),this.key=e,this.data=t,this.fieldMask=r,this.precondition=s,this.fieldTransforms=o,this.type=1}getFieldMask(){return this.fieldMask}}function Xc(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const r=n.data.field(t);e.set(t,r)}}),e}function gl(n,e,t){const r=new Map;Y(n.length===t.length);for(let s=0;s<t.length;s++){const o=n[s],a=o.transform,c=e.data.field(o.field);r.set(o.field,Lf(a,c,t[s]))}return r}function vl(n,e,t){const r=new Map;for(const s of n){const o=s.transform,a=t.data.field(s.field);r.set(s.field,Of(o,a,e))}return r}class co extends xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class $f extends xs{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qf{constructor(e,t,r,s){this.batchId=e,this.localWriteTime=t,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(e,t){const r=t.mutationResults;for(let s=0;s<this.mutations.length;s++){const o=this.mutations[s];o.key.isEqual(e.key)&&Uf(o,e,r[s])}}applyToLocalView(e,t){for(const r of this.baseMutations)r.key.isEqual(e.key)&&(t=Qn(r,e,t,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(e.key)&&(t=Qn(r,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const r=Hc();return this.mutations.forEach(s=>{const o=e.get(s.key),a=o.overlayedDocument;let c=this.applyToLocalView(a,o.mutatedFields);c=t.has(s.key)?null:c;const u=Yc(a,c);u!==null&&r.set(s.key,u),a.isValidDocument()||a.convertToNoDocument(z.min())}),r}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),G())}isEqual(e){return this.batchId===e.batchId&&ln(this.mutations,e.mutations,(t,r)=>ml(t,r))&&ln(this.baseMutations,e.baseMutations,(t,r)=>ml(t,r))}}class uo{constructor(e,t,r,s){this.batch=e,this.commitVersion=t,this.mutationResults=r,this.docVersions=s}static from(e,t,r){Y(e.mutations.length===r.length);let s=function(){return xf}();const o=e.mutations;for(let a=0;a<o.length;a++)s=s.insert(o[a].key,r[a].version);return new uo(e,t,r,s)}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bf{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zf{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var le,K;function Hf(n){switch(n){default:return B();case C.CANCELLED:case C.UNKNOWN:case C.DEADLINE_EXCEEDED:case C.RESOURCE_EXHAUSTED:case C.INTERNAL:case C.UNAVAILABLE:case C.UNAUTHENTICATED:return!1;case C.INVALID_ARGUMENT:case C.NOT_FOUND:case C.ALREADY_EXISTS:case C.PERMISSION_DENIED:case C.FAILED_PRECONDITION:case C.ABORTED:case C.OUT_OF_RANGE:case C.UNIMPLEMENTED:case C.DATA_LOSS:return!0}}function Zc(n){if(n===void 0)return nt("GRPC error has no .code"),C.UNKNOWN;switch(n){case le.OK:return C.OK;case le.CANCELLED:return C.CANCELLED;case le.UNKNOWN:return C.UNKNOWN;case le.DEADLINE_EXCEEDED:return C.DEADLINE_EXCEEDED;case le.RESOURCE_EXHAUSTED:return C.RESOURCE_EXHAUSTED;case le.INTERNAL:return C.INTERNAL;case le.UNAVAILABLE:return C.UNAVAILABLE;case le.UNAUTHENTICATED:return C.UNAUTHENTICATED;case le.INVALID_ARGUMENT:return C.INVALID_ARGUMENT;case le.NOT_FOUND:return C.NOT_FOUND;case le.ALREADY_EXISTS:return C.ALREADY_EXISTS;case le.PERMISSION_DENIED:return C.PERMISSION_DENIED;case le.FAILED_PRECONDITION:return C.FAILED_PRECONDITION;case le.ABORTED:return C.ABORTED;case le.OUT_OF_RANGE:return C.OUT_OF_RANGE;case le.UNIMPLEMENTED:return C.UNIMPLEMENTED;case le.DATA_LOSS:return C.DATA_LOSS;default:return B()}}(K=le||(le={}))[K.OK=0]="OK",K[K.CANCELLED=1]="CANCELLED",K[K.UNKNOWN=2]="UNKNOWN",K[K.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",K[K.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",K[K.NOT_FOUND=5]="NOT_FOUND",K[K.ALREADY_EXISTS=6]="ALREADY_EXISTS",K[K.PERMISSION_DENIED=7]="PERMISSION_DENIED",K[K.UNAUTHENTICATED=16]="UNAUTHENTICATED",K[K.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",K[K.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",K[K.ABORTED=10]="ABORTED",K[K.OUT_OF_RANGE=11]="OUT_OF_RANGE",K[K.UNIMPLEMENTED=12]="UNIMPLEMENTED",K[K.INTERNAL=13]="INTERNAL",K[K.UNAVAILABLE=14]="UNAVAILABLE",K[K.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gf(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Wf=new Lt([4294967295,4294967295],0);function yl(n){const e=Gf().encode(n),t=new Tc;return t.update(e),new Uint8Array(t.digest())}function _l(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),r=e.getUint32(4,!0),s=e.getUint32(8,!0),o=e.getUint32(12,!0);return[new Lt([t,r],0),new Lt([s,o],0)]}class ho{constructor(e,t,r){if(this.bitmap=e,this.padding=t,this.hashCount=r,t<0||t>=8)throw new zn(`Invalid padding: ${t}`);if(r<0)throw new zn(`Invalid hash count: ${r}`);if(e.length>0&&this.hashCount===0)throw new zn(`Invalid hash count: ${r}`);if(e.length===0&&t!==0)throw new zn(`Invalid padding when bitmap length is 0: ${t}`);this.Ie=8*e.length-t,this.Te=Lt.fromNumber(this.Ie)}Ee(e,t,r){let s=e.add(t.multiply(Lt.fromNumber(r)));return s.compare(Wf)===1&&(s=new Lt([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Te).toNumber()}de(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Ie===0)return!1;const t=yl(e),[r,s]=_l(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,s,o);if(!this.de(a))return!1}return!0}static create(e,t,r){const s=e%8==0?0:8-e%8,o=new Uint8Array(Math.ceil(e/8)),a=new ho(o,s,t);return r.forEach(c=>a.insert(c)),a}insert(e){if(this.Ie===0)return;const t=yl(e),[r,s]=_l(t);for(let o=0;o<this.hashCount;o++){const a=this.Ee(r,s,o);this.Ae(a)}}Ae(e){const t=Math.floor(e/8),r=e%8;this.bitmap[t]|=1<<r}}class zn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ds{constructor(e,t,r,s,o){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=o}static createSynthesizedRemoteEventForCurrentChange(e,t,r){const s=new Map;return s.set(e,pr.createSynthesizedTargetChangeForCurrentChange(e,t,r)),new Ds(z.min(),s,new re(J),rt(),G())}}class pr{constructor(e,t,r,s,o){this.resumeToken=e,this.current=t,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=o}static createSynthesizedTargetChangeForCurrentChange(e,t,r){return new pr(r,t,G(),G(),G())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Yr{constructor(e,t,r,s){this.Re=e,this.removedTargetIds=t,this.key=r,this.Ve=s}}class eu{constructor(e,t){this.targetId=e,this.me=t}}class tu{constructor(e,t,r=_e.EMPTY_BYTE_STRING,s=null){this.state=e,this.targetIds=t,this.resumeToken=r,this.cause=s}}class bl{constructor(){this.fe=0,this.ge=Il(),this.pe=_e.EMPTY_BYTE_STRING,this.ye=!1,this.we=!0}get current(){return this.ye}get resumeToken(){return this.pe}get Se(){return this.fe!==0}get be(){return this.we}De(e){e.approximateByteSize()>0&&(this.we=!0,this.pe=e)}ve(){let e=G(),t=G(),r=G();return this.ge.forEach((s,o)=>{switch(o){case 0:e=e.add(s);break;case 2:t=t.add(s);break;case 1:r=r.add(s);break;default:B()}}),new pr(this.pe,this.ye,e,t,r)}Ce(){this.we=!1,this.ge=Il()}Fe(e,t){this.we=!0,this.ge=this.ge.insert(e,t)}Me(e){this.we=!0,this.ge=this.ge.remove(e)}xe(){this.fe+=1}Oe(){this.fe-=1,Y(this.fe>=0)}Ne(){this.we=!0,this.ye=!0}}class Kf{constructor(e){this.Le=e,this.Be=new Map,this.ke=rt(),this.qe=El(),this.Qe=new re(J)}Ke(e){for(const t of e.Re)e.Ve&&e.Ve.isFoundDocument()?this.$e(t,e.Ve):this.Ue(t,e.key,e.Ve);for(const t of e.removedTargetIds)this.Ue(t,e.key,e.Ve)}We(e){this.forEachTarget(e,t=>{const r=this.Ge(t);switch(e.state){case 0:this.ze(t)&&r.De(e.resumeToken);break;case 1:r.Oe(),r.Se||r.Ce(),r.De(e.resumeToken);break;case 2:r.Oe(),r.Se||this.removeTarget(t);break;case 3:this.ze(t)&&(r.Ne(),r.De(e.resumeToken));break;case 4:this.ze(t)&&(this.je(t),r.De(e.resumeToken));break;default:B()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.Be.forEach((r,s)=>{this.ze(s)&&t(s)})}He(e){const t=e.targetId,r=e.me.count,s=this.Je(t);if(s){const o=s.target;if(Ni(o))if(r===0){const a=new $(o.path);this.Ue(t,a,Se.newNoDocument(a,z.min()))}else Y(r===1);else{const a=this.Ye(t);if(a!==r){const c=this.Ze(e),u=c?this.Xe(c,e,a):1;if(u!==0){this.je(t);const h=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Qe=this.Qe.insert(t,h)}}}}}Ze(e){const t=e.me.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:o=0}=t;let a,c;try{a=$t(r).toUint8Array()}catch(u){if(u instanceof kc)return an("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{c=new ho(a,s,o)}catch(u){return an(u instanceof zn?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return c.Ie===0?null:c}Xe(e,t,r){return t.me.count===r-this.nt(e,t.targetId)?0:2}nt(e,t){const r=this.Le.getRemoteKeysForTarget(t);let s=0;return r.forEach(o=>{const a=this.Le.tt(),c=`projects/${a.projectId}/databases/${a.database}/documents/${o.path.canonicalString()}`;e.mightContain(c)||(this.Ue(t,o,null),s++)}),s}rt(e){const t=new Map;this.Be.forEach((o,a)=>{const c=this.Je(a);if(c){if(o.current&&Ni(c.target)){const u=new $(c.target.path);this.ke.get(u)!==null||this.it(a,u)||this.Ue(a,u,Se.newNoDocument(u,e))}o.be&&(t.set(a,o.ve()),o.Ce())}});let r=G();this.qe.forEach((o,a)=>{let c=!0;a.forEachWhile(u=>{const h=this.Je(u);return!h||h.purpose==="TargetPurposeLimboResolution"||(c=!1,!1)}),c&&(r=r.add(o))}),this.ke.forEach((o,a)=>a.setReadTime(e));const s=new Ds(e,t,this.Qe,this.ke,r);return this.ke=rt(),this.qe=El(),this.Qe=new re(J),s}$e(e,t){if(!this.ze(e))return;const r=this.it(e,t.key)?2:0;this.Ge(e).Fe(t.key,r),this.ke=this.ke.insert(t.key,t),this.qe=this.qe.insert(t.key,this.st(t.key).add(e))}Ue(e,t,r){if(!this.ze(e))return;const s=this.Ge(e);this.it(e,t)?s.Fe(t,1):s.Me(t),this.qe=this.qe.insert(t,this.st(t).delete(e)),r&&(this.ke=this.ke.insert(t,r))}removeTarget(e){this.Be.delete(e)}Ye(e){const t=this.Ge(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}xe(e){this.Ge(e).xe()}Ge(e){let t=this.Be.get(e);return t||(t=new bl,this.Be.set(e,t)),t}st(e){let t=this.qe.get(e);return t||(t=new ye(J),this.qe=this.qe.insert(e,t)),t}ze(e){const t=this.Je(e)!==null;return t||j("WatchChangeAggregator","Detected inactive target",e),t}Je(e){const t=this.Be.get(e);return t&&t.Se?null:this.Le.ot(e)}je(e){this.Be.set(e,new bl),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.Ue(e,t,null)})}it(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function El(){return new re($.comparator)}function Il(){return new re($.comparator)}const Qf={asc:"ASCENDING",desc:"DESCENDING"},Jf={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Yf={and:"AND",or:"OR"};class Xf{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Mi(n,e){return n.useProto3Json||Ss(e)?e:{value:e}}function ps(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function nu(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function Zf(n,e){return ps(n,e.toTimestamp())}function Be(n){return Y(!!n),z.fromTimestamp(function(t){const r=At(t);return new ue(r.seconds,r.nanos)}(n))}function po(n,e){return ji(n,e).canonicalString()}function ji(n,e){const t=function(s){return new ee(["projects",s.projectId,"databases",s.database])}(n).child("documents");return e===void 0?t:t.child(e)}function ru(n){const e=ee.fromString(n);return Y(lu(e)),e}function Ui(n,e){return po(n.databaseId,e.path)}function gi(n,e){const t=ru(e);if(t.get(1)!==n.databaseId.projectId)throw new M(C.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new M(C.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new $(iu(t))}function su(n,e){return po(n.databaseId,e)}function em(n){const e=ru(n);return e.length===4?ee.emptyPath():iu(e)}function Fi(n){return new ee(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function iu(n){return Y(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Tl(n,e,t){return{name:Ui(n,e),fields:t.value.mapValue.fields}}function tm(n,e){let t;if("targetChange"in e){e.targetChange;const r=function(h){return h==="NO_CHANGE"?0:h==="ADD"?1:h==="REMOVE"?2:h==="CURRENT"?3:h==="RESET"?4:B()}(e.targetChange.targetChangeType||"NO_CHANGE"),s=e.targetChange.targetIds||[],o=function(h,f){return h.useProto3Json?(Y(f===void 0||typeof f=="string"),_e.fromBase64String(f||"")):(Y(f===void 0||f instanceof Buffer||f instanceof Uint8Array),_e.fromUint8Array(f||new Uint8Array))}(n,e.targetChange.resumeToken),a=e.targetChange.cause,c=a&&function(h){const f=h.code===void 0?C.UNKNOWN:Zc(h.code);return new M(f,h.message||"")}(a);t=new tu(r,s,o,c||null)}else if("documentChange"in e){e.documentChange;const r=e.documentChange;r.document,r.document.name,r.document.updateTime;const s=gi(n,r.document.name),o=Be(r.document.updateTime),a=r.document.createTime?Be(r.document.createTime):z.min(),c=new Oe({mapValue:{fields:r.document.fields}}),u=Se.newFoundDocument(s,o,a,c),h=r.targetIds||[],f=r.removedTargetIds||[];t=new Yr(h,f,u.key,u)}else if("documentDelete"in e){e.documentDelete;const r=e.documentDelete;r.document;const s=gi(n,r.document),o=r.readTime?Be(r.readTime):z.min(),a=Se.newNoDocument(s,o),c=r.removedTargetIds||[];t=new Yr([],c,a.key,a)}else if("documentRemove"in e){e.documentRemove;const r=e.documentRemove;r.document;const s=gi(n,r.document),o=r.removedTargetIds||[];t=new Yr([],o,s,null)}else{if(!("filter"in e))return B();{e.filter;const r=e.filter;r.targetId;const{count:s=0,unchangedNames:o}=r,a=new zf(s,o),c=r.targetId;t=new eu(c,a)}}return t}function nm(n,e){let t;if(e instanceof hr)t={update:Tl(n,e.key,e.value)};else if(e instanceof co)t={delete:Ui(n,e.key)};else if(e instanceof Ht)t={update:Tl(n,e.key,e.data),updateMask:dm(e.fieldMask)};else{if(!(e instanceof $f))return B();t={verify:Ui(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(r=>function(o,a){const c=a.transform;if(c instanceof ds)return{fieldPath:a.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(c instanceof rr)return{fieldPath:a.field.canonicalString(),appendMissingElements:{values:c.elements}};if(c instanceof sr)return{fieldPath:a.field.canonicalString(),removeAllFromArray:{values:c.elements}};if(c instanceof hs)return{fieldPath:a.field.canonicalString(),increment:c.Pe};throw B()}(0,r))),e.precondition.isNone||(t.currentDocument=function(s,o){return o.updateTime!==void 0?{updateTime:Zf(s,o.updateTime)}:o.exists!==void 0?{exists:o.exists}:B()}(n,e.precondition)),t}function rm(n,e){return n&&n.length>0?(Y(e!==void 0),n.map(t=>function(s,o){let a=s.updateTime?Be(s.updateTime):Be(o);return a.isEqual(z.min())&&(a=Be(o)),new jf(a,s.transformResults||[])}(t,e))):[]}function sm(n,e){return{documents:[su(n,e.path)]}}function im(n,e){const t={structuredQuery:{}},r=e.path;let s;e.collectionGroup!==null?(s=r,t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(s=r.popLast(),t.structuredQuery.from=[{collectionId:r.lastSegment()}]),t.parent=su(n,s);const o=function(h){if(h.length!==0)return au(Fe.create(h,"and"))}(e.filters);o&&(t.structuredQuery.where=o);const a=function(h){if(h.length!==0)return h.map(f=>function(E){return{field:Xt(E.field),direction:lm(E.dir)}}(f))}(e.orderBy);a&&(t.structuredQuery.orderBy=a);const c=Mi(n,e.limit);return c!==null&&(t.structuredQuery.limit=c),e.startAt&&(t.structuredQuery.startAt=function(h){return{before:h.inclusive,values:h.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(h){return{before:!h.inclusive,values:h.position}}(e.endAt)),{_t:t,parent:s}}function om(n){let e=em(n.parent);const t=n.structuredQuery,r=t.from?t.from.length:0;let s=null;if(r>0){Y(r===1);const f=t.from[0];f.allDescendants?s=f.collectionId:e=e.child(f.collectionId)}let o=[];t.where&&(o=function(v){const E=ou(v);return E instanceof Fe&&Lc(E)?E.getFilters():[E]}(t.where));let a=[];t.orderBy&&(a=function(v){return v.map(E=>function(R){return new us(Zt(R.field),function(x){switch(x){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(E))}(t.orderBy));let c=null;t.limit&&(c=function(v){let E;return E=typeof v=="object"?v.value:v,Ss(E)?null:E}(t.limit));let u=null;t.startAt&&(u=function(v){const E=!!v.before,T=v.values||[];return new cs(T,E)}(t.startAt));let h=null;return t.endAt&&(h=function(v){const E=!v.before,T=v.values||[];return new cs(T,E)}(t.endAt)),Af(e,s,a,o,c,"F",u,h)}function am(n,e){const t=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return B()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function ou(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const r=Zt(t.unaryFilter.field);return ce.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Zt(t.unaryFilter.field);return ce.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const o=Zt(t.unaryFilter.field);return ce.create(o,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const a=Zt(t.unaryFilter.field);return ce.create(a,"!=",{nullValue:"NULL_VALUE"});default:return B()}}(n):n.fieldFilter!==void 0?function(t){return ce.create(Zt(t.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return B()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Fe.create(t.compositeFilter.filters.map(r=>ou(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return B()}}(t.compositeFilter.op))}(n):B()}function lm(n){return Qf[n]}function cm(n){return Jf[n]}function um(n){return Yf[n]}function Xt(n){return{fieldPath:n.canonicalString()}}function Zt(n){return ge.fromServerFormat(n.fieldPath)}function au(n){return n instanceof ce?function(t){if(t.op==="=="){if(cl(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NAN"}};if(ll(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(cl(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NOT_NAN"}};if(ll(t.value))return{unaryFilter:{field:Xt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xt(t.field),op:cm(t.op),value:t.value}}}(n):n instanceof Fe?function(t){const r=t.getFilters().map(s=>au(s));return r.length===1?r[0]:{compositeFilter:{op:um(t.op),filters:r}}}(n):B()}function dm(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function lu(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yt{constructor(e,t,r,s,o=z.min(),a=z.min(),c=_e.EMPTY_BYTE_STRING,u=null){this.target=e,this.targetId=t,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=o,this.lastLimboFreeSnapshotVersion=a,this.resumeToken=c,this.expectedCount=u}withSequenceNumber(e){return new yt(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new yt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hm{constructor(e){this.ct=e}}function pm(n){const e=om({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?Li(e,e.limit,"L"):e}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fm{constructor(){this.un=new mm}addToCollectionParentIndex(e,t){return this.un.add(t),D.resolve()}getCollectionParents(e,t){return D.resolve(this.un.getEntries(t))}addFieldIndex(e,t){return D.resolve()}deleteFieldIndex(e,t){return D.resolve()}deleteAllFieldIndexes(e){return D.resolve()}createTargetIndexes(e,t){return D.resolve()}getDocumentsMatchingTarget(e,t){return D.resolve(null)}getIndexType(e,t){return D.resolve(0)}getFieldIndexes(e,t){return D.resolve([])}getNextCollectionGroupToUpdate(e){return D.resolve(null)}getMinOffset(e,t){return D.resolve(wt.min())}getMinOffsetFromCollectionGroup(e,t){return D.resolve(wt.min())}updateCollectionGroup(e,t,r){return D.resolve()}updateIndexEntries(e,t){return D.resolve()}}class mm{constructor(){this.index={}}add(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t]||new ye(ee.comparator),o=!s.has(r);return this.index[t]=s.add(r),o}has(e){const t=e.lastSegment(),r=e.popLast(),s=this.index[t];return s&&s.has(r)}getEntries(e){return(this.index[e]||new ye(ee.comparator)).toArray()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(e){this.Ln=e}next(){return this.Ln+=2,this.Ln}static Bn(){return new dn(0)}static kn(){return new dn(-1)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class gm{constructor(){this.changes=new yn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,Se.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const r=this.changes.get(t);return r!==void 0?D.resolve(r):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vm{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ym{constructor(e,t,r,s){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=r,this.indexManager=s}getDocument(e,t){let r=null;return this.documentOverlayCache.getOverlay(e,t).next(s=>(r=s,this.remoteDocumentCache.getEntry(e,t))).next(s=>(r!==null&&Qn(r.mutation,s,Ue.empty(),ue.now()),s))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.getLocalViewOfDocuments(e,r,G()).next(()=>r))}getLocalViewOfDocuments(e,t,r=G()){const s=Nt();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,r).next(o=>{let a=Bn();return o.forEach((c,u)=>{a=a.insert(c,u.overlayedDocument)}),a}))}getOverlayedDocuments(e,t){const r=Nt();return this.populateOverlays(e,r,t).next(()=>this.computeViews(e,t,r,G()))}populateOverlays(e,t,r){const s=[];return r.forEach(o=>{t.has(o)||s.push(o)}),this.documentOverlayCache.getOverlays(e,s).next(o=>{o.forEach((a,c)=>{t.set(a,c)})})}computeViews(e,t,r,s){let o=rt();const a=Kn(),c=function(){return Kn()}();return t.forEach((u,h)=>{const f=r.get(h.key);s.has(h.key)&&(f===void 0||f.mutation instanceof Ht)?o=o.insert(h.key,h):f!==void 0?(a.set(h.key,f.mutation.getFieldMask()),Qn(f.mutation,h,f.mutation.getFieldMask(),ue.now())):a.set(h.key,Ue.empty())}),this.recalculateAndSaveOverlays(e,o).next(u=>(u.forEach((h,f)=>a.set(h,f)),t.forEach((h,f)=>{var v;return c.set(h,new vm(f,(v=a.get(h))!==null&&v!==void 0?v:null))}),c))}recalculateAndSaveOverlays(e,t){const r=Kn();let s=new re((a,c)=>a-c),o=G();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(a=>{for(const c of a)c.keys().forEach(u=>{const h=t.get(u);if(h===null)return;let f=r.get(u)||Ue.empty();f=c.applyToLocalView(h,f),r.set(u,f);const v=(s.get(c.batchId)||G()).add(u);s=s.insert(c.batchId,v)})}).next(()=>{const a=[],c=s.getReverseIterator();for(;c.hasNext();){const u=c.getNext(),h=u.key,f=u.value,v=Hc();f.forEach(E=>{if(!o.has(E)){const T=Yc(t.get(E),r.get(E));T!==null&&v.set(E,T),o=o.add(E)}}),a.push(this.documentOverlayCache.saveOverlays(e,h,v))}return D.waitFor(a)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(r=>this.recalculateAndSaveOverlays(e,r))}getDocumentsMatchingQuery(e,t,r,s){return function(a){return $.isDocumentKey(a.path)&&a.collectionGroup===null&&a.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Fc(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,r,s):this.getDocumentsMatchingCollectionQuery(e,t,r,s)}getNextDocuments(e,t,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,r,s).next(o=>{const a=s-o.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,r.largestBatchId,s-o.size):D.resolve(Nt());let c=-1,u=o;return a.next(h=>D.forEach(h,(f,v)=>(c<v.largestBatchId&&(c=v.largestBatchId),o.get(f)?D.resolve():this.remoteDocumentCache.getEntry(e,f).next(E=>{u=u.insert(f,E)}))).next(()=>this.populateOverlays(e,h,o)).next(()=>this.computeViews(e,u,h,G())).next(f=>({batchId:c,changes:zc(f)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new $(t)).next(r=>{let s=Bn();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(e,t,r,s){const o=t.collectionGroup;let a=Bn();return this.indexManager.getCollectionParents(e,o).next(c=>D.forEach(c,u=>{const h=function(v,E){return new dr(E,null,v.explicitOrderBy.slice(),v.filters.slice(),v.limit,v.limitType,v.startAt,v.endAt)}(t,u.child(o));return this.getDocumentsMatchingCollectionQuery(e,h,r,s).next(f=>{f.forEach((v,E)=>{a=a.insert(v,E)})})}).next(()=>a))}getDocumentsMatchingCollectionQuery(e,t,r,s){let o;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,r.largestBatchId).next(a=>(o=a,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,r,o,s))).next(a=>{o.forEach((u,h)=>{const f=h.getKey();a.get(f)===null&&(a=a.insert(f,Se.newInvalidDocument(f)))});let c=Bn();return a.forEach((u,h)=>{const f=o.get(u);f!==void 0&&Qn(f.mutation,h,Ue.empty(),ue.now()),Ps(t,h)&&(c=c.insert(u,h))}),c})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _m{constructor(e){this.serializer=e,this.hr=new Map,this.Pr=new Map}getBundleMetadata(e,t){return D.resolve(this.hr.get(t))}saveBundleMetadata(e,t){return this.hr.set(t.id,function(s){return{id:s.id,version:s.version,createTime:Be(s.createTime)}}(t)),D.resolve()}getNamedQuery(e,t){return D.resolve(this.Pr.get(t))}saveNamedQuery(e,t){return this.Pr.set(t.name,function(s){return{name:s.name,query:pm(s.bundledQuery),readTime:Be(s.readTime)}}(t)),D.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bm{constructor(){this.overlays=new re($.comparator),this.Ir=new Map}getOverlay(e,t){return D.resolve(this.overlays.get(t))}getOverlays(e,t){const r=Nt();return D.forEach(t,s=>this.getOverlay(e,s).next(o=>{o!==null&&r.set(s,o)})).next(()=>r)}saveOverlays(e,t,r){return r.forEach((s,o)=>{this.ht(e,t,o)}),D.resolve()}removeOverlaysForBatchId(e,t,r){const s=this.Ir.get(r);return s!==void 0&&(s.forEach(o=>this.overlays=this.overlays.remove(o)),this.Ir.delete(r)),D.resolve()}getOverlaysForCollection(e,t,r){const s=Nt(),o=t.length+1,a=new $(t.child("")),c=this.overlays.getIteratorFrom(a);for(;c.hasNext();){const u=c.getNext().value,h=u.getKey();if(!t.isPrefixOf(h.path))break;h.path.length===o&&u.largestBatchId>r&&s.set(u.getKey(),u)}return D.resolve(s)}getOverlaysForCollectionGroup(e,t,r,s){let o=new re((h,f)=>h-f);const a=this.overlays.getIterator();for(;a.hasNext();){const h=a.getNext().value;if(h.getKey().getCollectionGroup()===t&&h.largestBatchId>r){let f=o.get(h.largestBatchId);f===null&&(f=Nt(),o=o.insert(h.largestBatchId,f)),f.set(h.getKey(),h)}}const c=Nt(),u=o.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((h,f)=>c.set(h,f)),!(c.size()>=s)););return D.resolve(c)}ht(e,t,r){const s=this.overlays.get(r.key);if(s!==null){const a=this.Ir.get(s.largestBatchId).delete(r.key);this.Ir.set(s.largestBatchId,a)}this.overlays=this.overlays.insert(r.key,new Bf(t,r));let o=this.Ir.get(t);o===void 0&&(o=G(),this.Ir.set(t,o)),this.Ir.set(t,o.add(r.key))}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Em{constructor(){this.sessionToken=_e.EMPTY_BYTE_STRING}getSessionToken(e){return D.resolve(this.sessionToken)}setSessionToken(e,t){return this.sessionToken=t,D.resolve()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fo{constructor(){this.Tr=new ye(de.Er),this.dr=new ye(de.Ar)}isEmpty(){return this.Tr.isEmpty()}addReference(e,t){const r=new de(e,t);this.Tr=this.Tr.add(r),this.dr=this.dr.add(r)}Rr(e,t){e.forEach(r=>this.addReference(r,t))}removeReference(e,t){this.Vr(new de(e,t))}mr(e,t){e.forEach(r=>this.removeReference(r,t))}gr(e){const t=new $(new ee([])),r=new de(t,e),s=new de(t,e+1),o=[];return this.dr.forEachInRange([r,s],a=>{this.Vr(a),o.push(a.key)}),o}pr(){this.Tr.forEach(e=>this.Vr(e))}Vr(e){this.Tr=this.Tr.delete(e),this.dr=this.dr.delete(e)}yr(e){const t=new $(new ee([])),r=new de(t,e),s=new de(t,e+1);let o=G();return this.dr.forEachInRange([r,s],a=>{o=o.add(a.key)}),o}containsKey(e){const t=new de(e,0),r=this.Tr.firstAfterOrEqual(t);return r!==null&&e.isEqual(r.key)}}class de{constructor(e,t){this.key=e,this.wr=t}static Er(e,t){return $.comparator(e.key,t.key)||J(e.wr,t.wr)}static Ar(e,t){return J(e.wr,t.wr)||$.comparator(e.key,t.key)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Im{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.Sr=1,this.br=new ye(de.Er)}checkEmpty(e){return D.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,r,s){const o=this.Sr;this.Sr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const a=new qf(o,t,r,s);this.mutationQueue.push(a);for(const c of s)this.br=this.br.add(new de(c.key,o)),this.indexManager.addToCollectionParentIndex(e,c.key.path.popLast());return D.resolve(a)}lookupMutationBatch(e,t){return D.resolve(this.Dr(t))}getNextMutationBatchAfterBatchId(e,t){const r=t+1,s=this.vr(r),o=s<0?0:s;return D.resolve(this.mutationQueue.length>o?this.mutationQueue[o]:null)}getHighestUnacknowledgedBatchId(){return D.resolve(this.mutationQueue.length===0?-1:this.Sr-1)}getAllMutationBatches(e){return D.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const r=new de(t,0),s=new de(t,Number.POSITIVE_INFINITY),o=[];return this.br.forEachInRange([r,s],a=>{const c=this.Dr(a.wr);o.push(c)}),D.resolve(o)}getAllMutationBatchesAffectingDocumentKeys(e,t){let r=new ye(J);return t.forEach(s=>{const o=new de(s,0),a=new de(s,Number.POSITIVE_INFINITY);this.br.forEachInRange([o,a],c=>{r=r.add(c.wr)})}),D.resolve(this.Cr(r))}getAllMutationBatchesAffectingQuery(e,t){const r=t.path,s=r.length+1;let o=r;$.isDocumentKey(o)||(o=o.child(""));const a=new de(new $(o),0);let c=new ye(J);return this.br.forEachWhile(u=>{const h=u.key.path;return!!r.isPrefixOf(h)&&(h.length===s&&(c=c.add(u.wr)),!0)},a),D.resolve(this.Cr(c))}Cr(e){const t=[];return e.forEach(r=>{const s=this.Dr(r);s!==null&&t.push(s)}),t}removeMutationBatch(e,t){Y(this.Fr(t.batchId,"removed")===0),this.mutationQueue.shift();let r=this.br;return D.forEach(t.mutations,s=>{const o=new de(s.key,t.batchId);return r=r.delete(o),this.referenceDelegate.markPotentiallyOrphaned(e,s.key)}).next(()=>{this.br=r})}On(e){}containsKey(e,t){const r=new de(t,0),s=this.br.firstAfterOrEqual(r);return D.resolve(t.isEqual(s&&s.key))}performConsistencyCheck(e){return this.mutationQueue.length,D.resolve()}Fr(e,t){return this.vr(e)}vr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}Dr(e){const t=this.vr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tm{constructor(e){this.Mr=e,this.docs=function(){return new re($.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const r=t.key,s=this.docs.get(r),o=s?s.size:0,a=this.Mr(t);return this.docs=this.docs.insert(r,{document:t.mutableCopy(),size:a}),this.size+=a-o,this.indexManager.addToCollectionParentIndex(e,r.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const r=this.docs.get(t);return D.resolve(r?r.document.mutableCopy():Se.newInvalidDocument(t))}getEntries(e,t){let r=rt();return t.forEach(s=>{const o=this.docs.get(s);r=r.insert(s,o?o.document.mutableCopy():Se.newInvalidDocument(s))}),D.resolve(r)}getDocumentsMatchingQuery(e,t,r,s){let o=rt();const a=t.path,c=new $(a.child("")),u=this.docs.getIteratorFrom(c);for(;u.hasNext();){const{key:h,value:{document:f}}=u.getNext();if(!a.isPrefixOf(h.path))break;h.path.length>a.length+1||of(sf(f),r)<=0||(s.has(f.key)||Ps(t,f))&&(o=o.insert(f.key,f.mutableCopy()))}return D.resolve(o)}getAllFromCollectionGroup(e,t,r,s){B()}Or(e,t){return D.forEach(this.docs,r=>t(r))}newChangeBuffer(e){return new wm(this)}getSize(e){return D.resolve(this.size)}}class wm extends gm{constructor(e){super(),this.cr=e}applyChanges(e){const t=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?t.push(this.cr.addEntry(e,s)):this.cr.removeEntry(r)}),D.waitFor(t)}getFromCache(e,t){return this.cr.getEntry(e,t)}getAllFromCache(e,t){return this.cr.getEntries(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Am{constructor(e){this.persistence=e,this.Nr=new yn(t=>io(t),oo),this.lastRemoteSnapshotVersion=z.min(),this.highestTargetId=0,this.Lr=0,this.Br=new fo,this.targetCount=0,this.kr=dn.Bn()}forEachTarget(e,t){return this.Nr.forEach((r,s)=>t(s)),D.resolve()}getLastRemoteSnapshotVersion(e){return D.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return D.resolve(this.Lr)}allocateTargetId(e){return this.highestTargetId=this.kr.next(),D.resolve(this.highestTargetId)}setTargetsMetadata(e,t,r){return r&&(this.lastRemoteSnapshotVersion=r),t>this.Lr&&(this.Lr=t),D.resolve()}Kn(e){this.Nr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.kr=new dn(t),this.highestTargetId=t),e.sequenceNumber>this.Lr&&(this.Lr=e.sequenceNumber)}addTargetData(e,t){return this.Kn(t),this.targetCount+=1,D.resolve()}updateTargetData(e,t){return this.Kn(t),D.resolve()}removeTargetData(e,t){return this.Nr.delete(t.target),this.Br.gr(t.targetId),this.targetCount-=1,D.resolve()}removeTargets(e,t,r){let s=0;const o=[];return this.Nr.forEach((a,c)=>{c.sequenceNumber<=t&&r.get(c.targetId)===null&&(this.Nr.delete(a),o.push(this.removeMatchingKeysForTargetId(e,c.targetId)),s++)}),D.waitFor(o).next(()=>s)}getTargetCount(e){return D.resolve(this.targetCount)}getTargetData(e,t){const r=this.Nr.get(t)||null;return D.resolve(r)}addMatchingKeys(e,t,r){return this.Br.Rr(t,r),D.resolve()}removeMatchingKeys(e,t,r){this.Br.mr(t,r);const s=this.persistence.referenceDelegate,o=[];return s&&t.forEach(a=>{o.push(s.markPotentiallyOrphaned(e,a))}),D.waitFor(o)}removeMatchingKeysForTargetId(e,t){return this.Br.gr(t),D.resolve()}getMatchingKeysForTargetId(e,t){const r=this.Br.yr(t);return D.resolve(r)}containsKey(e,t){return D.resolve(this.Br.containsKey(t))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sm{constructor(e,t){this.qr={},this.overlays={},this.Qr=new to(0),this.Kr=!1,this.Kr=!0,this.$r=new Em,this.referenceDelegate=e(this),this.Ur=new Am(this),this.indexManager=new fm,this.remoteDocumentCache=function(s){return new Tm(s)}(r=>this.referenceDelegate.Wr(r)),this.serializer=new hm(t),this.Gr=new _m(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.Kr=!1,Promise.resolve()}get started(){return this.Kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new bm,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let r=this.qr[e.toKey()];return r||(r=new Im(t,this.referenceDelegate),this.qr[e.toKey()]=r),r}getGlobalsCache(){return this.$r}getTargetCache(){return this.Ur}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Gr}runTransaction(e,t,r){j("MemoryPersistence","Starting transaction:",e);const s=new Rm(this.Qr.next());return this.referenceDelegate.zr(),r(s).next(o=>this.referenceDelegate.jr(s).next(()=>o)).toPromise().then(o=>(s.raiseOnCommittedEvent(),o))}Hr(e,t){return D.or(Object.values(this.qr).map(r=>()=>r.containsKey(e,t)))}}class Rm extends lf{constructor(e){super(),this.currentSequenceNumber=e}}class mo{constructor(e){this.persistence=e,this.Jr=new fo,this.Yr=null}static Zr(e){return new mo(e)}get Xr(){if(this.Yr)return this.Yr;throw B()}addReference(e,t,r){return this.Jr.addReference(r,t),this.Xr.delete(r.toString()),D.resolve()}removeReference(e,t,r){return this.Jr.removeReference(r,t),this.Xr.add(r.toString()),D.resolve()}markPotentiallyOrphaned(e,t){return this.Xr.add(t.toString()),D.resolve()}removeTarget(e,t){this.Jr.gr(t.targetId).forEach(s=>this.Xr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(e,t.targetId).next(s=>{s.forEach(o=>this.Xr.add(o.toString()))}).next(()=>r.removeTargetData(e,t))}zr(){this.Yr=new Set}jr(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return D.forEach(this.Xr,r=>{const s=$.fromPath(r);return this.ei(e,s).next(o=>{o||t.removeEntry(s,z.min())})}).next(()=>(this.Yr=null,t.apply(e)))}updateLimboDocument(e,t){return this.ei(e,t).next(r=>{r?this.Xr.delete(t.toString()):this.Xr.add(t.toString())})}Wr(e){return 0}ei(e,t){return D.or([()=>D.resolve(this.Jr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Hr(e,t)])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class go{constructor(e,t,r,s){this.targetId=e,this.fromCache=t,this.$i=r,this.Ui=s}static Wi(e,t){let r=G(),s=G();for(const o of t.docChanges)switch(o.type){case 0:r=r.add(o.doc.key);break;case 1:s=s.add(o.doc.key)}return new go(e,t.fromCache,r,s)}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pm{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cm{constructor(){this.Gi=!1,this.zi=!1,this.ji=100,this.Hi=function(){return Ph()?8:cf(Pe())>0?6:4}()}initialize(e,t){this.Ji=e,this.indexManager=t,this.Gi=!0}getDocumentsMatchingQuery(e,t,r,s){const o={result:null};return this.Yi(e,t).next(a=>{o.result=a}).next(()=>{if(!o.result)return this.Zi(e,t,s,r).next(a=>{o.result=a})}).next(()=>{if(o.result)return;const a=new Pm;return this.Xi(e,t,a).next(c=>{if(o.result=c,this.zi)return this.es(e,t,a,c.size)})}).next(()=>o.result)}es(e,t,r,s){return r.documentReadCount<this.ji?(jn()<=W.DEBUG&&j("QueryEngine","SDK will not create cache indexes for query:",Yt(t),"since it only creates cache indexes for collection contains","more than or equal to",this.ji,"documents"),D.resolve()):(jn()<=W.DEBUG&&j("QueryEngine","Query:",Yt(t),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Hi*s?(jn()<=W.DEBUG&&j("QueryEngine","The SDK decides to create cache indexes for query:",Yt(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,$e(t))):D.resolve())}Yi(e,t){if(pl(t))return D.resolve(null);let r=$e(t);return this.indexManager.getIndexType(e,r).next(s=>s===0?null:(t.limit!==null&&s===1&&(t=Li(t,null,"F"),r=$e(t)),this.indexManager.getDocumentsMatchingTarget(e,r).next(o=>{const a=G(...o);return this.Ji.getDocuments(e,a).next(c=>this.indexManager.getMinOffset(e,r).next(u=>{const h=this.ts(t,c);return this.ns(t,h,a,u.readTime)?this.Yi(e,Li(t,null,"F")):this.rs(e,h,t,u)}))})))}Zi(e,t,r,s){return pl(t)||s.isEqual(z.min())?D.resolve(null):this.Ji.getDocuments(e,r).next(o=>{const a=this.ts(t,o);return this.ns(t,a,r,s)?D.resolve(null):(jn()<=W.DEBUG&&j("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Yt(t)),this.rs(e,a,t,rf(s,-1)).next(c=>c))})}ts(e,t){let r=new ye(qc(e));return t.forEach((s,o)=>{Ps(e,o)&&(r=r.add(o))}),r}ns(e,t,r,s){if(e.limit===null)return!1;if(r.size!==t.size)return!0;const o=e.limitType==="F"?t.last():t.first();return!!o&&(o.hasPendingWrites||o.version.compareTo(s)>0)}Xi(e,t,r){return jn()<=W.DEBUG&&j("QueryEngine","Using full collection scan to execute query:",Yt(t)),this.Ji.getDocumentsMatchingQuery(e,t,wt.min(),r)}rs(e,t,r,s){return this.Ji.getDocumentsMatchingQuery(e,r,s).next(o=>(t.forEach(a=>{o=o.insert(a.key,a)}),o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xm{constructor(e,t,r,s){this.persistence=e,this.ss=t,this.serializer=s,this.os=new re(J),this._s=new yn(o=>io(o),oo),this.us=new Map,this.cs=e.getRemoteDocumentCache(),this.Ur=e.getTargetCache(),this.Gr=e.getBundleCache(),this.ls(r)}ls(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new ym(this.cs,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.cs.setIndexManager(this.indexManager),this.ss.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.os))}}function Dm(n,e,t,r){return new xm(n,e,t,r)}async function cu(n,e){const t=H(n);return await t.persistence.runTransaction("Handle user change","readonly",r=>{let s;return t.mutationQueue.getAllMutationBatches(r).next(o=>(s=o,t.ls(e),t.mutationQueue.getAllMutationBatches(r))).next(o=>{const a=[],c=[];let u=G();for(const h of s){a.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}for(const h of o){c.push(h.batchId);for(const f of h.mutations)u=u.add(f.key)}return t.localDocuments.getDocuments(r,u).next(h=>({hs:h,removedBatchIds:a,addedBatchIds:c}))})})}function km(n,e){const t=H(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=e.batch.keys(),o=t.cs.newChangeBuffer({trackRemovals:!0});return function(c,u,h,f){const v=h.batch,E=v.keys();let T=D.resolve();return E.forEach(R=>{T=T.next(()=>f.getEntry(u,R)).next(P=>{const x=h.docVersions.get(R);Y(x!==null),P.version.compareTo(x)<0&&(v.applyToRemoteDocument(P,h),P.isValidDocument()&&(P.setReadTime(h.commitVersion),f.addEntry(P)))})}),T.next(()=>c.mutationQueue.removeMutationBatch(u,v))}(t,r,e,o).next(()=>o.apply(r)).next(()=>t.mutationQueue.performConsistencyCheck(r)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(r,s,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(c){let u=G();for(let h=0;h<c.mutationResults.length;++h)c.mutationResults[h].transformResults.length>0&&(u=u.add(c.batch.mutations[h].key));return u}(e))).next(()=>t.localDocuments.getDocuments(r,s))})}function uu(n){const e=H(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.Ur.getLastRemoteSnapshotVersion(t))}function Vm(n,e){const t=H(n),r=e.snapshotVersion;let s=t.os;return t.persistence.runTransaction("Apply remote event","readwrite-primary",o=>{const a=t.cs.newChangeBuffer({trackRemovals:!0});s=t.os;const c=[];e.targetChanges.forEach((f,v)=>{const E=s.get(v);if(!E)return;c.push(t.Ur.removeMatchingKeys(o,f.removedDocuments,v).next(()=>t.Ur.addMatchingKeys(o,f.addedDocuments,v)));let T=E.withSequenceNumber(o.currentSequenceNumber);e.targetMismatches.get(v)!==null?T=T.withResumeToken(_e.EMPTY_BYTE_STRING,z.min()).withLastLimboFreeSnapshotVersion(z.min()):f.resumeToken.approximateByteSize()>0&&(T=T.withResumeToken(f.resumeToken,r)),s=s.insert(v,T),function(P,x,U){return P.resumeToken.approximateByteSize()===0||x.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:U.addedDocuments.size+U.modifiedDocuments.size+U.removedDocuments.size>0}(E,T,f)&&c.push(t.Ur.updateTargetData(o,T))});let u=rt(),h=G();if(e.documentUpdates.forEach(f=>{e.resolvedLimboDocuments.has(f)&&c.push(t.persistence.referenceDelegate.updateLimboDocument(o,f))}),c.push(Nm(o,a,e.documentUpdates).next(f=>{u=f.Ps,h=f.Is})),!r.isEqual(z.min())){const f=t.Ur.getLastRemoteSnapshotVersion(o).next(v=>t.Ur.setTargetsMetadata(o,o.currentSequenceNumber,r));c.push(f)}return D.waitFor(c).next(()=>a.apply(o)).next(()=>t.localDocuments.getLocalViewOfDocuments(o,u,h)).next(()=>u)}).then(o=>(t.os=s,o))}function Nm(n,e,t){let r=G(),s=G();return t.forEach(o=>r=r.add(o)),e.getEntries(n,r).next(o=>{let a=rt();return t.forEach((c,u)=>{const h=o.get(c);u.isFoundDocument()!==h.isFoundDocument()&&(s=s.add(c)),u.isNoDocument()&&u.version.isEqual(z.min())?(e.removeEntry(c,u.readTime),a=a.insert(c,u)):!h.isValidDocument()||u.version.compareTo(h.version)>0||u.version.compareTo(h.version)===0&&h.hasPendingWrites?(e.addEntry(u),a=a.insert(c,u)):j("LocalStore","Ignoring outdated watch update for ",c,". Current version:",h.version," Watch version:",u.version)}),{Ps:a,Is:s}})}function Om(n,e){const t=H(n);return t.persistence.runTransaction("Get next mutation batch","readonly",r=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(r,e)))}function Lm(n,e){const t=H(n);return t.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return t.Ur.getTargetData(r,e).next(o=>o?(s=o,D.resolve(s)):t.Ur.allocateTargetId(r).next(a=>(s=new yt(e,a,"TargetPurposeListen",r.currentSequenceNumber),t.Ur.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=t.os.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(t.os=t.os.insert(r.targetId,r),t._s.set(e,r.targetId)),r})}async function $i(n,e,t){const r=H(n),s=r.os.get(e),o=t?"readwrite":"readwrite-primary";try{t||await r.persistence.runTransaction("Release target",o,a=>r.persistence.referenceDelegate.removeTarget(a,s))}catch(a){if(!ur(a))throw a;j("LocalStore",`Failed to update sequence numbers for target ${e}: ${a}`)}r.os=r.os.remove(e),r._s.delete(s.target)}function wl(n,e,t){const r=H(n);let s=z.min(),o=G();return r.persistence.runTransaction("Execute query","readwrite",a=>function(u,h,f){const v=H(u),E=v._s.get(f);return E!==void 0?D.resolve(v.os.get(E)):v.Ur.getTargetData(h,f)}(r,a,$e(e)).next(c=>{if(c)return s=c.lastLimboFreeSnapshotVersion,r.Ur.getMatchingKeysForTargetId(a,c.targetId).next(u=>{o=u})}).next(()=>r.ss.getDocumentsMatchingQuery(a,e,t?s:z.min(),t?o:G())).next(c=>(Mm(r,Rf(e),c),{documents:c,Ts:o})))}function Mm(n,e,t){let r=n.us.get(e)||z.min();t.forEach((s,o)=>{o.readTime.compareTo(r)>0&&(r=o.readTime)}),n.us.set(e,r)}class Al{constructor(){this.activeTargetIds=Vf()}fs(e){this.activeTargetIds=this.activeTargetIds.add(e)}gs(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Vs(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class jm{constructor(){this.so=new Al,this.oo={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,r){}addLocalQueryTarget(e,t=!0){return t&&this.so.fs(e),this.oo[e]||"not-current"}updateQueryState(e,t,r){this.oo[e]=t}removeLocalQueryTarget(e){this.so.gs(e)}isLocalQueryTarget(e){return this.so.activeTargetIds.has(e)}clearQueryState(e){delete this.oo[e]}getAllActiveQueryTargets(){return this.so.activeTargetIds}isActiveQueryTarget(e){return this.so.activeTargetIds.has(e)}start(){return this.so=new Al,Promise.resolve()}handleUserChange(e,t,r){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Um{_o(e){}shutdown(){}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sl{constructor(){this.ao=()=>this.uo(),this.co=()=>this.lo(),this.ho=[],this.Po()}_o(e){this.ho.push(e)}shutdown(){window.removeEventListener("online",this.ao),window.removeEventListener("offline",this.co)}Po(){window.addEventListener("online",this.ao),window.addEventListener("offline",this.co)}uo(){j("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ho)e(0)}lo(){j("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ho)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Br=null;function vi(){return Br===null?Br=function(){return 268435456+Math.round(2147483648*Math.random())}():Br++,"0x"+Br.toString(16)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Fm={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $m{constructor(e){this.Io=e.Io,this.To=e.To}Eo(e){this.Ao=e}Ro(e){this.Vo=e}mo(e){this.fo=e}onMessage(e){this.po=e}close(){this.To()}send(e){this.Io(e)}yo(){this.Ao()}wo(){this.Vo()}So(e){this.fo(e)}bo(e){this.po(e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const we="WebChannelConnection";class qm extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const r=t.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),o=encodeURIComponent(this.databaseId.database);this.Do=r+"://"+t.host,this.vo=`projects/${s}/databases/${o}`,this.Co=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${o}`}get Fo(){return!1}Mo(t,r,s,o,a){const c=vi(),u=this.xo(t,r.toUriEncodedString());j("RestConnection",`Sending RPC '${t}' ${c}:`,u,s);const h={"google-cloud-resource-prefix":this.vo,"x-goog-request-params":this.Co};return this.Oo(h,o,a),this.No(t,u,h,s).then(f=>(j("RestConnection",`Received RPC '${t}' ${c}: `,f),f),f=>{throw an("RestConnection",`RPC '${t}' ${c} failed with error: `,f,"url: ",u,"request:",s),f})}Lo(t,r,s,o,a,c){return this.Mo(t,r,s,o,a)}Oo(t,r,s){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+gn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((o,a)=>t[a]=o),s&&s.headers.forEach((o,a)=>t[a]=o)}xo(t,r){const s=Fm[t];return`${this.Do}/v1/${r}:${s}`}terminate(){}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}No(e,t,r,s){const o=vi();return new Promise((a,c)=>{const u=new wc;u.setWithCredentials(!0),u.listenOnce(Ac.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case Kr.NO_ERROR:const f=u.getResponseJson();j(we,`XHR for RPC '${e}' ${o} received:`,JSON.stringify(f)),a(f);break;case Kr.TIMEOUT:j(we,`RPC '${e}' ${o} timed out`),c(new M(C.DEADLINE_EXCEEDED,"Request time out"));break;case Kr.HTTP_ERROR:const v=u.getStatus();if(j(we,`RPC '${e}' ${o} failed with status:`,v,"response text:",u.getResponseText()),v>0){let E=u.getResponseJson();Array.isArray(E)&&(E=E[0]);const T=E==null?void 0:E.error;if(T&&T.status&&T.message){const R=function(x){const U=x.toLowerCase().replace(/_/g,"-");return Object.values(C).indexOf(U)>=0?U:C.UNKNOWN}(T.status);c(new M(R,T.message))}else c(new M(C.UNKNOWN,"Server responded with status "+u.getStatus()))}else c(new M(C.UNAVAILABLE,"Connection failed."));break;default:B()}}finally{j(we,`RPC '${e}' ${o} completed.`)}});const h=JSON.stringify(s);j(we,`RPC '${e}' ${o} sending request:`,s),u.send(t,"POST",h,r,15)})}Bo(e,t,r){const s=vi(),o=[this.Do,"/","google.firestore.v1.Firestore","/",e,"/channel"],a=Pc(),c=Rc(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},h=this.longPollingOptions.timeoutSeconds;h!==void 0&&(u.longPollingTimeout=Math.round(1e3*h)),this.useFetchStreams&&(u.useFetchStreams=!0),this.Oo(u.initMessageHeaders,t,r),u.encodeInitMessageHeaders=!0;const f=o.join("");j(we,`Creating RPC '${e}' stream ${s}: ${f}`,u);const v=a.createWebChannel(f,u);let E=!1,T=!1;const R=new $m({Io:x=>{T?j(we,`Not sending because RPC '${e}' stream ${s} is closed:`,x):(E||(j(we,`Opening RPC '${e}' stream ${s} transport.`),v.open(),E=!0),j(we,`RPC '${e}' stream ${s} sending:`,x),v.send(x))},To:()=>v.close()}),P=(x,U,N)=>{x.listen(U,L=>{try{N(L)}catch(F){setTimeout(()=>{throw F},0)}})};return P(v,qn.EventType.OPEN,()=>{T||(j(we,`RPC '${e}' stream ${s} transport opened.`),R.yo())}),P(v,qn.EventType.CLOSE,()=>{T||(T=!0,j(we,`RPC '${e}' stream ${s} transport closed`),R.So())}),P(v,qn.EventType.ERROR,x=>{T||(T=!0,an(we,`RPC '${e}' stream ${s} transport errored:`,x),R.So(new M(C.UNAVAILABLE,"The operation could not be completed")))}),P(v,qn.EventType.MESSAGE,x=>{var U;if(!T){const N=x.data[0];Y(!!N);const L=N,F=L.error||((U=L[0])===null||U===void 0?void 0:U.error);if(F){j(we,`RPC '${e}' stream ${s} received error:`,F);const k=F.status;let O=function(g){const _=le[g];if(_!==void 0)return Zc(_)}(k),b=F.message;O===void 0&&(O=C.INTERNAL,b="Unknown error status: "+k+" with message "+F.message),T=!0,R.So(new M(O,b)),v.close()}else j(we,`RPC '${e}' stream ${s} received:`,N),R.bo(N)}}),P(c,Sc.STAT_EVENT,x=>{x.stat===xi.PROXY?j(we,`RPC '${e}' stream ${s} detected buffering proxy`):x.stat===xi.NOPROXY&&j(we,`RPC '${e}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.wo()},0),R}}function yi(){return typeof document<"u"?document:null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ks(n){return new Xf(n,!0)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class du{constructor(e,t,r=1e3,s=1.5,o=6e4){this.ui=e,this.timerId=t,this.ko=r,this.qo=s,this.Qo=o,this.Ko=0,this.$o=null,this.Uo=Date.now(),this.reset()}reset(){this.Ko=0}Wo(){this.Ko=this.Qo}Go(e){this.cancel();const t=Math.floor(this.Ko+this.zo()),r=Math.max(0,Date.now()-this.Uo),s=Math.max(0,t-r);s>0&&j("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Ko} ms, delay with jitter: ${t} ms, last attempt: ${r} ms ago)`),this.$o=this.ui.enqueueAfterDelay(this.timerId,s,()=>(this.Uo=Date.now(),e())),this.Ko*=this.qo,this.Ko<this.ko&&(this.Ko=this.ko),this.Ko>this.Qo&&(this.Ko=this.Qo)}jo(){this.$o!==null&&(this.$o.skipDelay(),this.$o=null)}cancel(){this.$o!==null&&(this.$o.cancel(),this.$o=null)}zo(){return(Math.random()-.5)*this.Ko}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hu{constructor(e,t,r,s,o,a,c,u){this.ui=e,this.Ho=r,this.Jo=s,this.connection=o,this.authCredentialsProvider=a,this.appCheckCredentialsProvider=c,this.listener=u,this.state=0,this.Yo=0,this.Zo=null,this.Xo=null,this.stream=null,this.e_=0,this.t_=new du(e,t)}n_(){return this.state===1||this.state===5||this.r_()}r_(){return this.state===2||this.state===3}start(){this.e_=0,this.state!==4?this.auth():this.i_()}async stop(){this.n_()&&await this.close(0)}s_(){this.state=0,this.t_.reset()}o_(){this.r_()&&this.Zo===null&&(this.Zo=this.ui.enqueueAfterDelay(this.Ho,6e4,()=>this.__()))}a_(e){this.u_(),this.stream.send(e)}async __(){if(this.r_())return this.close(0)}u_(){this.Zo&&(this.Zo.cancel(),this.Zo=null)}c_(){this.Xo&&(this.Xo.cancel(),this.Xo=null)}async close(e,t){this.u_(),this.c_(),this.t_.cancel(),this.Yo++,e!==4?this.t_.reset():t&&t.code===C.RESOURCE_EXHAUSTED?(nt(t.toString()),nt("Using maximum backoff delay to prevent overloading the backend."),this.t_.Wo()):t&&t.code===C.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.l_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.mo(t)}l_(){}auth(){this.state=1;const e=this.h_(this.Yo),t=this.Yo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Yo===t&&this.P_(r,s)},r=>{e(()=>{const s=new M(C.UNKNOWN,"Fetching auth token failed: "+r.message);return this.I_(s)})})}P_(e,t){const r=this.h_(this.Yo);this.stream=this.T_(e,t),this.stream.Eo(()=>{r(()=>this.listener.Eo())}),this.stream.Ro(()=>{r(()=>(this.state=2,this.Xo=this.ui.enqueueAfterDelay(this.Jo,1e4,()=>(this.r_()&&(this.state=3),Promise.resolve())),this.listener.Ro()))}),this.stream.mo(s=>{r(()=>this.I_(s))}),this.stream.onMessage(s=>{r(()=>++this.e_==1?this.E_(s):this.onNext(s))})}i_(){this.state=5,this.t_.Go(async()=>{this.state=0,this.start()})}I_(e){return j("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}h_(e){return t=>{this.ui.enqueueAndForget(()=>this.Yo===e?t():(j("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Bm extends hu{constructor(e,t,r,s,o,a){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}T_(e,t){return this.connection.Bo("Listen",e,t)}E_(e){return this.onNext(e)}onNext(e){this.t_.reset();const t=tm(this.serializer,e),r=function(o){if(!("targetChange"in o))return z.min();const a=o.targetChange;return a.targetIds&&a.targetIds.length?z.min():a.readTime?Be(a.readTime):z.min()}(e);return this.listener.d_(t,r)}A_(e){const t={};t.database=Fi(this.serializer),t.addTarget=function(o,a){let c;const u=a.target;if(c=Ni(u)?{documents:sm(o,u)}:{query:im(o,u)._t},c.targetId=a.targetId,a.resumeToken.approximateByteSize()>0){c.resumeToken=nu(o,a.resumeToken);const h=Mi(o,a.expectedCount);h!==null&&(c.expectedCount=h)}else if(a.snapshotVersion.compareTo(z.min())>0){c.readTime=ps(o,a.snapshotVersion.toTimestamp());const h=Mi(o,a.expectedCount);h!==null&&(c.expectedCount=h)}return c}(this.serializer,e);const r=am(this.serializer,e);r&&(t.labels=r),this.a_(t)}R_(e){const t={};t.database=Fi(this.serializer),t.removeTarget=e,this.a_(t)}}class zm extends hu{constructor(e,t,r,s,o,a){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,r,s,a),this.serializer=o}get V_(){return this.e_>0}start(){this.lastStreamToken=void 0,super.start()}l_(){this.V_&&this.m_([])}T_(e,t){return this.connection.Bo("Write",e,t)}E_(e){return Y(!!e.streamToken),this.lastStreamToken=e.streamToken,Y(!e.writeResults||e.writeResults.length===0),this.listener.f_()}onNext(e){Y(!!e.streamToken),this.lastStreamToken=e.streamToken,this.t_.reset();const t=rm(e.writeResults,e.commitTime),r=Be(e.commitTime);return this.listener.g_(r,t)}p_(){const e={};e.database=Fi(this.serializer),this.a_(e)}m_(e){const t={streamToken:this.lastStreamToken,writes:e.map(r=>nm(this.serializer,r))};this.a_(t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hm extends class{}{constructor(e,t,r,s){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=r,this.serializer=s,this.y_=!1}w_(){if(this.y_)throw new M(C.FAILED_PRECONDITION,"The client has already been terminated.")}Mo(e,t,r,s){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([o,a])=>this.connection.Mo(e,ji(t,r),s,o,a)).catch(o=>{throw o.name==="FirebaseError"?(o.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),o):new M(C.UNKNOWN,o.toString())})}Lo(e,t,r,s,o){return this.w_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([a,c])=>this.connection.Lo(e,ji(t,r),s,a,c,o)).catch(a=>{throw a.name==="FirebaseError"?(a.code===C.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),a):new M(C.UNKNOWN,a.toString())})}terminate(){this.y_=!0,this.connection.terminate()}}class Gm{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.S_=0,this.b_=null,this.D_=!0}v_(){this.S_===0&&(this.C_("Unknown"),this.b_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.b_=null,this.F_("Backend didn't respond within 10 seconds."),this.C_("Offline"),Promise.resolve())))}M_(e){this.state==="Online"?this.C_("Unknown"):(this.S_++,this.S_>=1&&(this.x_(),this.F_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.C_("Offline")))}set(e){this.x_(),this.S_=0,e==="Online"&&(this.D_=!1),this.C_(e)}C_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}F_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.D_?(nt(t),this.D_=!1):j("OnlineStateTracker",t)}x_(){this.b_!==null&&(this.b_.cancel(),this.b_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wm{constructor(e,t,r,s,o){this.localStore=e,this.datastore=t,this.asyncQueue=r,this.remoteSyncer={},this.O_=[],this.N_=new Map,this.L_=new Set,this.B_=[],this.k_=o,this.k_._o(a=>{r.enqueueAndForget(async()=>{Gt(this)&&(j("RemoteStore","Restarting streams for network reachability change."),await async function(u){const h=H(u);h.L_.add(4),await fr(h),h.q_.set("Unknown"),h.L_.delete(4),await Vs(h)}(this))})}),this.q_=new Gm(r,s)}}async function Vs(n){if(Gt(n))for(const e of n.B_)await e(!0)}async function fr(n){for(const e of n.B_)await e(!1)}function pu(n,e){const t=H(n);t.N_.has(e.targetId)||(t.N_.set(e.targetId,e),bo(t)?_o(t):_n(t).r_()&&yo(t,e))}function vo(n,e){const t=H(n),r=_n(t);t.N_.delete(e),r.r_()&&fu(t,e),t.N_.size===0&&(r.r_()?r.o_():Gt(t)&&t.q_.set("Unknown"))}function yo(n,e){if(n.Q_.xe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(z.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}_n(n).A_(e)}function fu(n,e){n.Q_.xe(e),_n(n).R_(e)}function _o(n){n.Q_=new Kf({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),ot:e=>n.N_.get(e)||null,tt:()=>n.datastore.serializer.databaseId}),_n(n).start(),n.q_.v_()}function bo(n){return Gt(n)&&!_n(n).n_()&&n.N_.size>0}function Gt(n){return H(n).L_.size===0}function mu(n){n.Q_=void 0}async function Km(n){n.q_.set("Online")}async function Qm(n){n.N_.forEach((e,t)=>{yo(n,e)})}async function Jm(n,e){mu(n),bo(n)?(n.q_.M_(e),_o(n)):n.q_.set("Unknown")}async function Ym(n,e,t){if(n.q_.set("Online"),e instanceof tu&&e.state===2&&e.cause)try{await async function(s,o){const a=o.cause;for(const c of o.targetIds)s.N_.has(c)&&(await s.remoteSyncer.rejectListen(c,a),s.N_.delete(c),s.Q_.removeTarget(c))}(n,e)}catch(r){j("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),r),await fs(n,r)}else if(e instanceof Yr?n.Q_.Ke(e):e instanceof eu?n.Q_.He(e):n.Q_.We(e),!t.isEqual(z.min()))try{const r=await uu(n.localStore);t.compareTo(r)>=0&&await function(o,a){const c=o.Q_.rt(a);return c.targetChanges.forEach((u,h)=>{if(u.resumeToken.approximateByteSize()>0){const f=o.N_.get(h);f&&o.N_.set(h,f.withResumeToken(u.resumeToken,a))}}),c.targetMismatches.forEach((u,h)=>{const f=o.N_.get(u);if(!f)return;o.N_.set(u,f.withResumeToken(_e.EMPTY_BYTE_STRING,f.snapshotVersion)),fu(o,u);const v=new yt(f.target,u,h,f.sequenceNumber);yo(o,v)}),o.remoteSyncer.applyRemoteEvent(c)}(n,t)}catch(r){j("RemoteStore","Failed to raise snapshot:",r),await fs(n,r)}}async function fs(n,e,t){if(!ur(e))throw e;n.L_.add(1),await fr(n),n.q_.set("Offline"),t||(t=()=>uu(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{j("RemoteStore","Retrying IndexedDB access"),await t(),n.L_.delete(1),await Vs(n)})}function gu(n,e){return e().catch(t=>fs(n,t,e))}async function Ns(n){const e=H(n),t=St(e);let r=e.O_.length>0?e.O_[e.O_.length-1].batchId:-1;for(;Xm(e);)try{const s=await Om(e.localStore,r);if(s===null){e.O_.length===0&&t.o_();break}r=s.batchId,Zm(e,s)}catch(s){await fs(e,s)}vu(e)&&yu(e)}function Xm(n){return Gt(n)&&n.O_.length<10}function Zm(n,e){n.O_.push(e);const t=St(n);t.r_()&&t.V_&&t.m_(e.mutations)}function vu(n){return Gt(n)&&!St(n).n_()&&n.O_.length>0}function yu(n){St(n).start()}async function eg(n){St(n).p_()}async function tg(n){const e=St(n);for(const t of n.O_)e.m_(t.mutations)}async function ng(n,e,t){const r=n.O_.shift(),s=uo.from(r,e,t);await gu(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await Ns(n)}async function rg(n,e){e&&St(n).V_&&await async function(r,s){if(function(a){return Hf(a)&&a!==C.ABORTED}(s.code)){const o=r.O_.shift();St(r).s_(),await gu(r,()=>r.remoteSyncer.rejectFailedWrite(o.batchId,s)),await Ns(r)}}(n,e),vu(n)&&yu(n)}async function Rl(n,e){const t=H(n);t.asyncQueue.verifyOperationInProgress(),j("RemoteStore","RemoteStore received new credentials");const r=Gt(t);t.L_.add(3),await fr(t),r&&t.q_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.L_.delete(3),await Vs(t)}async function sg(n,e){const t=H(n);e?(t.L_.delete(2),await Vs(t)):e||(t.L_.add(2),await fr(t),t.q_.set("Unknown"))}function _n(n){return n.K_||(n.K_=function(t,r,s){const o=H(t);return o.w_(),new Bm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:Km.bind(null,n),Ro:Qm.bind(null,n),mo:Jm.bind(null,n),d_:Ym.bind(null,n)}),n.B_.push(async e=>{e?(n.K_.s_(),bo(n)?_o(n):n.q_.set("Unknown")):(await n.K_.stop(),mu(n))})),n.K_}function St(n){return n.U_||(n.U_=function(t,r,s){const o=H(t);return o.w_(),new zm(r,o.connection,o.authCredentials,o.appCheckCredentials,o.serializer,s)}(n.datastore,n.asyncQueue,{Eo:()=>Promise.resolve(),Ro:eg.bind(null,n),mo:rg.bind(null,n),f_:tg.bind(null,n),g_:ng.bind(null,n)}),n.B_.push(async e=>{e?(n.U_.s_(),await Ns(n)):(await n.U_.stop(),n.O_.length>0&&(j("RemoteStore",`Stopping write stream with ${n.O_.length} pending writes`),n.O_=[]))})),n.U_}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Eo{constructor(e,t,r,s,o){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=r,this.op=s,this.removalCallback=o,this.deferred=new et,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(a=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,r,s,o){const a=Date.now()+r,c=new Eo(e,t,a,s,o);return c.start(r),c}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new M(C.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Io(n,e){if(nt("AsyncQueue",`${e}: ${n}`),ur(n))return new M(C.UNAVAILABLE,`${e}: ${n}`);throw n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class tn{constructor(e){this.comparator=e?(t,r)=>e(t,r)||$.comparator(t.key,r.key):(t,r)=>$.comparator(t.key,r.key),this.keyedMap=Bn(),this.sortedSet=new re(this.comparator)}static emptySet(e){return new tn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,r)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof tn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),r=e.sortedSet.getIterator();for(;t.hasNext();){const s=t.getNext().key,o=r.getNext().key;if(!s.isEqual(o))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const r=new tn;return r.comparator=this.comparator,r.keyedMap=e,r.sortedSet=t,r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(){this.W_=new re($.comparator)}track(e){const t=e.doc.key,r=this.W_.get(t);r?e.type!==0&&r.type===3?this.W_=this.W_.insert(t,e):e.type===3&&r.type!==1?this.W_=this.W_.insert(t,{type:r.type,doc:e.doc}):e.type===2&&r.type===2?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):e.type===2&&r.type===0?this.W_=this.W_.insert(t,{type:0,doc:e.doc}):e.type===1&&r.type===0?this.W_=this.W_.remove(t):e.type===1&&r.type===2?this.W_=this.W_.insert(t,{type:1,doc:r.doc}):e.type===0&&r.type===1?this.W_=this.W_.insert(t,{type:2,doc:e.doc}):B():this.W_=this.W_.insert(t,e)}G_(){const e=[];return this.W_.inorderTraversal((t,r)=>{e.push(r)}),e}}class hn{constructor(e,t,r,s,o,a,c,u,h){this.query=e,this.docs=t,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=o,this.fromCache=a,this.syncStateChanged=c,this.excludesMetadataChanges=u,this.hasCachedResults=h}static fromInitialDocuments(e,t,r,s,o){const a=[];return t.forEach(c=>{a.push({type:0,doc:c})}),new hn(e,t,tn.emptySet(t),a,r,s,!0,!1,o)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&Rs(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,r=e.docChanges;if(t.length!==r.length)return!1;for(let s=0;s<t.length;s++)if(t[s].type!==r[s].type||!t[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ig{constructor(){this.z_=void 0,this.j_=[]}H_(){return this.j_.some(e=>e.J_())}}class og{constructor(){this.queries=Cl(),this.onlineState="Unknown",this.Y_=new Set}terminate(){(function(t,r){const s=H(t),o=s.queries;s.queries=Cl(),o.forEach((a,c)=>{for(const u of c.j_)u.onError(r)})})(this,new M(C.ABORTED,"Firestore shutting down"))}}function Cl(){return new yn(n=>$c(n),Rs)}async function _u(n,e){const t=H(n);let r=3;const s=e.query;let o=t.queries.get(s);o?!o.H_()&&e.J_()&&(r=2):(o=new ig,r=e.J_()?0:1);try{switch(r){case 0:o.z_=await t.onListen(s,!0);break;case 1:o.z_=await t.onListen(s,!1);break;case 2:await t.onFirstRemoteStoreListen(s)}}catch(a){const c=Io(a,`Initialization of query '${Yt(e.query)}' failed`);return void e.onError(c)}t.queries.set(s,o),o.j_.push(e),e.Z_(t.onlineState),o.z_&&e.X_(o.z_)&&To(t)}async function bu(n,e){const t=H(n),r=e.query;let s=3;const o=t.queries.get(r);if(o){const a=o.j_.indexOf(e);a>=0&&(o.j_.splice(a,1),o.j_.length===0?s=e.J_()?0:1:!o.H_()&&e.J_()&&(s=2))}switch(s){case 0:return t.queries.delete(r),t.onUnlisten(r,!0);case 1:return t.queries.delete(r),t.onUnlisten(r,!1);case 2:return t.onLastRemoteStoreUnlisten(r);default:return}}function ag(n,e){const t=H(n);let r=!1;for(const s of e){const o=s.query,a=t.queries.get(o);if(a){for(const c of a.j_)c.X_(s)&&(r=!0);a.z_=s}}r&&To(t)}function lg(n,e,t){const r=H(n),s=r.queries.get(e);if(s)for(const o of s.j_)o.onError(t);r.queries.delete(e)}function To(n){n.Y_.forEach(e=>{e.next()})}var qi,xl;(xl=qi||(qi={})).ea="default",xl.Cache="cache";class Eu{constructor(e,t,r){this.query=e,this.ta=t,this.na=!1,this.ra=null,this.onlineState="Unknown",this.options=r||{}}X_(e){if(!this.options.includeMetadataChanges){const r=[];for(const s of e.docChanges)s.type!==3&&r.push(s);e=new hn(e.query,e.docs,e.oldDocs,r,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.na?this.ia(e)&&(this.ta.next(e),t=!0):this.sa(e,this.onlineState)&&(this.oa(e),t=!0),this.ra=e,t}onError(e){this.ta.error(e)}Z_(e){this.onlineState=e;let t=!1;return this.ra&&!this.na&&this.sa(this.ra,e)&&(this.oa(this.ra),t=!0),t}sa(e,t){if(!e.fromCache||!this.J_())return!0;const r=t!=="Offline";return(!this.options._a||!r)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}ia(e){if(e.docChanges.length>0)return!0;const t=this.ra&&this.ra.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}oa(e){e=hn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.na=!0,this.ta.next(e)}J_(){return this.options.source!==qi.Cache}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Iu{constructor(e){this.key=e}}class Tu{constructor(e){this.key=e}}class cg{constructor(e,t){this.query=e,this.Ta=t,this.Ea=null,this.hasCachedResults=!1,this.current=!1,this.da=G(),this.mutatedKeys=G(),this.Aa=qc(e),this.Ra=new tn(this.Aa)}get Va(){return this.Ta}ma(e,t){const r=t?t.fa:new Pl,s=t?t.Ra:this.Ra;let o=t?t.mutatedKeys:this.mutatedKeys,a=s,c=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,h=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(e.inorderTraversal((f,v)=>{const E=s.get(f),T=Ps(this.query,v)?v:null,R=!!E&&this.mutatedKeys.has(E.key),P=!!T&&(T.hasLocalMutations||this.mutatedKeys.has(T.key)&&T.hasCommittedMutations);let x=!1;E&&T?E.data.isEqual(T.data)?R!==P&&(r.track({type:3,doc:T}),x=!0):this.ga(E,T)||(r.track({type:2,doc:T}),x=!0,(u&&this.Aa(T,u)>0||h&&this.Aa(T,h)<0)&&(c=!0)):!E&&T?(r.track({type:0,doc:T}),x=!0):E&&!T&&(r.track({type:1,doc:E}),x=!0,(u||h)&&(c=!0)),x&&(T?(a=a.add(T),o=P?o.add(f):o.delete(f)):(a=a.delete(f),o=o.delete(f)))}),this.query.limit!==null)for(;a.size>this.query.limit;){const f=this.query.limitType==="F"?a.last():a.first();a=a.delete(f.key),o=o.delete(f.key),r.track({type:1,doc:f})}return{Ra:a,fa:r,ns:c,mutatedKeys:o}}ga(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,r,s){const o=this.Ra;this.Ra=e.Ra,this.mutatedKeys=e.mutatedKeys;const a=e.fa.G_();a.sort((f,v)=>function(T,R){const P=x=>{switch(x){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return B()}};return P(T)-P(R)}(f.type,v.type)||this.Aa(f.doc,v.doc)),this.pa(r),s=s!=null&&s;const c=t&&!s?this.ya():[],u=this.da.size===0&&this.current&&!s?1:0,h=u!==this.Ea;return this.Ea=u,a.length!==0||h?{snapshot:new hn(this.query,e.Ra,o,a,e.mutatedKeys,u===0,h,!1,!!r&&r.resumeToken.approximateByteSize()>0),wa:c}:{wa:c}}Z_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({Ra:this.Ra,fa:new Pl,mutatedKeys:this.mutatedKeys,ns:!1},!1)):{wa:[]}}Sa(e){return!this.Ta.has(e)&&!!this.Ra.has(e)&&!this.Ra.get(e).hasLocalMutations}pa(e){e&&(e.addedDocuments.forEach(t=>this.Ta=this.Ta.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.Ta=this.Ta.delete(t)),this.current=e.current)}ya(){if(!this.current)return[];const e=this.da;this.da=G(),this.Ra.forEach(r=>{this.Sa(r.key)&&(this.da=this.da.add(r.key))});const t=[];return e.forEach(r=>{this.da.has(r)||t.push(new Tu(r))}),this.da.forEach(r=>{e.has(r)||t.push(new Iu(r))}),t}ba(e){this.Ta=e.Ts,this.da=G();const t=this.ma(e.documents);return this.applyChanges(t,!0)}Da(){return hn.fromInitialDocuments(this.query,this.Ra,this.mutatedKeys,this.Ea===0,this.hasCachedResults)}}class ug{constructor(e,t,r){this.query=e,this.targetId=t,this.view=r}}class dg{constructor(e){this.key=e,this.va=!1}}class hg{constructor(e,t,r,s,o,a){this.localStore=e,this.remoteStore=t,this.eventManager=r,this.sharedClientState=s,this.currentUser=o,this.maxConcurrentLimboResolutions=a,this.Ca={},this.Fa=new yn(c=>$c(c),Rs),this.Ma=new Map,this.xa=new Set,this.Oa=new re($.comparator),this.Na=new Map,this.La=new fo,this.Ba={},this.ka=new Map,this.qa=dn.kn(),this.onlineState="Unknown",this.Qa=void 0}get isPrimaryClient(){return this.Qa===!0}}async function pg(n,e,t=!0){const r=Cu(n);let s;const o=r.Fa.get(e);return o?(r.sharedClientState.addLocalQueryTarget(o.targetId),s=o.view.Da()):s=await wu(r,e,t,!0),s}async function fg(n,e){const t=Cu(n);await wu(t,e,!0,!1)}async function wu(n,e,t,r){const s=await Lm(n.localStore,$e(e)),o=s.targetId,a=n.sharedClientState.addLocalQueryTarget(o,t);let c;return r&&(c=await mg(n,e,o,a==="current",s.resumeToken)),n.isPrimaryClient&&t&&pu(n.remoteStore,s),c}async function mg(n,e,t,r,s){n.Ka=(v,E,T)=>async function(P,x,U,N){let L=x.view.ma(U);L.ns&&(L=await wl(P.localStore,x.query,!1).then(({documents:b})=>x.view.ma(b,L)));const F=N&&N.targetChanges.get(x.targetId),k=N&&N.targetMismatches.get(x.targetId)!=null,O=x.view.applyChanges(L,P.isPrimaryClient,F,k);return kl(P,x.targetId,O.wa),O.snapshot}(n,v,E,T);const o=await wl(n.localStore,e,!0),a=new cg(e,o.Ts),c=a.ma(o.documents),u=pr.createSynthesizedTargetChangeForCurrentChange(t,r&&n.onlineState!=="Offline",s),h=a.applyChanges(c,n.isPrimaryClient,u);kl(n,t,h.wa);const f=new ug(e,t,a);return n.Fa.set(e,f),n.Ma.has(t)?n.Ma.get(t).push(e):n.Ma.set(t,[e]),h.snapshot}async function gg(n,e,t){const r=H(n),s=r.Fa.get(e),o=r.Ma.get(s.targetId);if(o.length>1)return r.Ma.set(s.targetId,o.filter(a=>!Rs(a,e))),void r.Fa.delete(e);r.isPrimaryClient?(r.sharedClientState.removeLocalQueryTarget(s.targetId),r.sharedClientState.isActiveQueryTarget(s.targetId)||await $i(r.localStore,s.targetId,!1).then(()=>{r.sharedClientState.clearQueryState(s.targetId),t&&vo(r.remoteStore,s.targetId),Bi(r,s.targetId)}).catch(cr)):(Bi(r,s.targetId),await $i(r.localStore,s.targetId,!0))}async function vg(n,e){const t=H(n),r=t.Fa.get(e),s=t.Ma.get(r.targetId);t.isPrimaryClient&&s.length===1&&(t.sharedClientState.removeLocalQueryTarget(r.targetId),vo(t.remoteStore,r.targetId))}async function yg(n,e,t){const r=Ag(n);try{const s=await function(a,c){const u=H(a),h=ue.now(),f=c.reduce((T,R)=>T.add(R.key),G());let v,E;return u.persistence.runTransaction("Locally write mutations","readwrite",T=>{let R=rt(),P=G();return u.cs.getEntries(T,f).next(x=>{R=x,R.forEach((U,N)=>{N.isValidDocument()||(P=P.add(U))})}).next(()=>u.localDocuments.getOverlayedDocuments(T,R)).next(x=>{v=x;const U=[];for(const N of c){const L=Ff(N,v.get(N.key).overlayedDocument);L!=null&&U.push(new Ht(N.key,L,Vc(L.value.mapValue),qe.exists(!0)))}return u.mutationQueue.addMutationBatch(T,h,U,c)}).next(x=>{E=x;const U=x.applyToLocalDocumentSet(v,P);return u.documentOverlayCache.saveOverlays(T,x.batchId,U)})}).then(()=>({batchId:E.batchId,changes:zc(v)}))}(r.localStore,e);r.sharedClientState.addPendingMutation(s.batchId),function(a,c,u){let h=a.Ba[a.currentUser.toKey()];h||(h=new re(J)),h=h.insert(c,u),a.Ba[a.currentUser.toKey()]=h}(r,s.batchId,t),await mr(r,s.changes),await Ns(r.remoteStore)}catch(s){const o=Io(s,"Failed to persist write");t.reject(o)}}async function Au(n,e){const t=H(n);try{const r=await Vm(t.localStore,e);e.targetChanges.forEach((s,o)=>{const a=t.Na.get(o);a&&(Y(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?a.va=!0:s.modifiedDocuments.size>0?Y(a.va):s.removedDocuments.size>0&&(Y(a.va),a.va=!1))}),await mr(t,r,e)}catch(r){await cr(r)}}function Dl(n,e,t){const r=H(n);if(r.isPrimaryClient&&t===0||!r.isPrimaryClient&&t===1){const s=[];r.Fa.forEach((o,a)=>{const c=a.view.Z_(e);c.snapshot&&s.push(c.snapshot)}),function(a,c){const u=H(a);u.onlineState=c;let h=!1;u.queries.forEach((f,v)=>{for(const E of v.j_)E.Z_(c)&&(h=!0)}),h&&To(u)}(r.eventManager,e),s.length&&r.Ca.d_(s),r.onlineState=e,r.isPrimaryClient&&r.sharedClientState.setOnlineState(e)}}async function _g(n,e,t){const r=H(n);r.sharedClientState.updateQueryState(e,"rejected",t);const s=r.Na.get(e),o=s&&s.key;if(o){let a=new re($.comparator);a=a.insert(o,Se.newNoDocument(o,z.min()));const c=G().add(o),u=new Ds(z.min(),new Map,new re(J),a,c);await Au(r,u),r.Oa=r.Oa.remove(o),r.Na.delete(e),wo(r)}else await $i(r.localStore,e,!1).then(()=>Bi(r,e,t)).catch(cr)}async function bg(n,e){const t=H(n),r=e.batch.batchId;try{const s=await km(t.localStore,e);Ru(t,r,null),Su(t,r),t.sharedClientState.updateMutationState(r,"acknowledged"),await mr(t,s)}catch(s){await cr(s)}}async function Eg(n,e,t){const r=H(n);try{const s=await function(a,c){const u=H(a);return u.persistence.runTransaction("Reject batch","readwrite-primary",h=>{let f;return u.mutationQueue.lookupMutationBatch(h,c).next(v=>(Y(v!==null),f=v.keys(),u.mutationQueue.removeMutationBatch(h,v))).next(()=>u.mutationQueue.performConsistencyCheck(h)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(h,f,c)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(h,f)).next(()=>u.localDocuments.getDocuments(h,f))})}(r.localStore,e);Ru(r,e,t),Su(r,e),r.sharedClientState.updateMutationState(e,"rejected",t),await mr(r,s)}catch(s){await cr(s)}}function Su(n,e){(n.ka.get(e)||[]).forEach(t=>{t.resolve()}),n.ka.delete(e)}function Ru(n,e,t){const r=H(n);let s=r.Ba[r.currentUser.toKey()];if(s){const o=s.get(e);o&&(t?o.reject(t):o.resolve(),s=s.remove(e)),r.Ba[r.currentUser.toKey()]=s}}function Bi(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const r of n.Ma.get(e))n.Fa.delete(r),t&&n.Ca.$a(r,t);n.Ma.delete(e),n.isPrimaryClient&&n.La.gr(e).forEach(r=>{n.La.containsKey(r)||Pu(n,r)})}function Pu(n,e){n.xa.delete(e.path.canonicalString());const t=n.Oa.get(e);t!==null&&(vo(n.remoteStore,t),n.Oa=n.Oa.remove(e),n.Na.delete(t),wo(n))}function kl(n,e,t){for(const r of t)r instanceof Iu?(n.La.addReference(r.key,e),Ig(n,r)):r instanceof Tu?(j("SyncEngine","Document no longer in limbo: "+r.key),n.La.removeReference(r.key,e),n.La.containsKey(r.key)||Pu(n,r.key)):B()}function Ig(n,e){const t=e.key,r=t.path.canonicalString();n.Oa.get(t)||n.xa.has(r)||(j("SyncEngine","New document in limbo: "+t),n.xa.add(r),wo(n))}function wo(n){for(;n.xa.size>0&&n.Oa.size<n.maxConcurrentLimboResolutions;){const e=n.xa.values().next().value;n.xa.delete(e);const t=new $(ee.fromString(e)),r=n.qa.next();n.Na.set(r,new dg(t)),n.Oa=n.Oa.insert(t,r),pu(n.remoteStore,new yt($e(ao(t.path)),r,"TargetPurposeLimboResolution",to.oe))}}async function mr(n,e,t){const r=H(n),s=[],o=[],a=[];r.Fa.isEmpty()||(r.Fa.forEach((c,u)=>{a.push(r.Ka(u,e,t).then(h=>{var f;if((h||t)&&r.isPrimaryClient){const v=h?!h.fromCache:(f=t==null?void 0:t.targetChanges.get(u.targetId))===null||f===void 0?void 0:f.current;r.sharedClientState.updateQueryState(u.targetId,v?"current":"not-current")}if(h){s.push(h);const v=go.Wi(u.targetId,h);o.push(v)}}))}),await Promise.all(a),r.Ca.d_(s),await async function(u,h){const f=H(u);try{await f.persistence.runTransaction("notifyLocalViewChanges","readwrite",v=>D.forEach(h,E=>D.forEach(E.$i,T=>f.persistence.referenceDelegate.addReference(v,E.targetId,T)).next(()=>D.forEach(E.Ui,T=>f.persistence.referenceDelegate.removeReference(v,E.targetId,T)))))}catch(v){if(!ur(v))throw v;j("LocalStore","Failed to update sequence numbers: "+v)}for(const v of h){const E=v.targetId;if(!v.fromCache){const T=f.os.get(E),R=T.snapshotVersion,P=T.withLastLimboFreeSnapshotVersion(R);f.os=f.os.insert(E,P)}}}(r.localStore,o))}async function Tg(n,e){const t=H(n);if(!t.currentUser.isEqual(e)){j("SyncEngine","User change. New user:",e.toKey());const r=await cu(t.localStore,e);t.currentUser=e,function(o,a){o.ka.forEach(c=>{c.forEach(u=>{u.reject(new M(C.CANCELLED,a))})}),o.ka.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,r.removedBatchIds,r.addedBatchIds),await mr(t,r.hs)}}function wg(n,e){const t=H(n),r=t.Na.get(e);if(r&&r.va)return G().add(r.key);{let s=G();const o=t.Ma.get(e);if(!o)return s;for(const a of o){const c=t.Fa.get(a);s=s.unionWith(c.view.Va)}return s}}function Cu(n){const e=H(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Au.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=wg.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=_g.bind(null,e),e.Ca.d_=ag.bind(null,e.eventManager),e.Ca.$a=lg.bind(null,e.eventManager),e}function Ag(n){const e=H(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=bg.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Eg.bind(null,e),e}class ms{constructor(){this.kind="memory",this.synchronizeTabs=!1}async initialize(e){this.serializer=ks(e.databaseInfo.databaseId),this.sharedClientState=this.Wa(e),this.persistence=this.Ga(e),await this.persistence.start(),this.localStore=this.za(e),this.gcScheduler=this.ja(e,this.localStore),this.indexBackfillerScheduler=this.Ha(e,this.localStore)}ja(e,t){return null}Ha(e,t){return null}za(e){return Dm(this.persistence,new Cm,e.initialUser,this.serializer)}Ga(e){return new Sm(mo.Zr,this.serializer)}Wa(e){return new jm}async terminate(){var e,t;(e=this.gcScheduler)===null||e===void 0||e.stop(),(t=this.indexBackfillerScheduler)===null||t===void 0||t.stop(),this.sharedClientState.shutdown(),await this.persistence.shutdown()}}ms.provider={build:()=>new ms};class zi{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Dl(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Tg.bind(null,this.syncEngine),await sg(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new og}()}createDatastore(e){const t=ks(e.databaseInfo.databaseId),r=function(o){return new qm(o)}(e.databaseInfo);return function(o,a,c,u){return new Hm(o,a,c,u)}(e.authCredentials,e.appCheckCredentials,r,t)}createRemoteStore(e){return function(r,s,o,a,c){return new Wm(r,s,o,a,c)}(this.localStore,this.datastore,e.asyncQueue,t=>Dl(this.syncEngine,t,0),function(){return Sl.D()?new Sl:new Um}())}createSyncEngine(e,t){return function(s,o,a,c,u,h,f){const v=new hg(s,o,a,c,u,h);return f&&(v.Qa=!0),v}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}async terminate(){var e,t;await async function(s){const o=H(s);j("RemoteStore","RemoteStore shutting down."),o.L_.add(5),await fr(o),o.k_.shutdown(),o.q_.set("Unknown")}(this.remoteStore),(e=this.datastore)===null||e===void 0||e.terminate(),(t=this.eventManager)===null||t===void 0||t.terminate()}}zi.provider={build:()=>new zi};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *//**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xu{constructor(e){this.observer=e,this.muted=!1}next(e){this.muted||this.observer.next&&this.Ya(this.observer.next,e)}error(e){this.muted||(this.observer.error?this.Ya(this.observer.error,e):nt("Uncaught Error in snapshot listener:",e.toString()))}Za(){this.muted=!0}Ya(e,t){setTimeout(()=>{this.muted||e(t)},0)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Sg{constructor(e,t,r,s,o){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=r,this.databaseInfo=s,this.user=Ae.UNAUTHENTICATED,this.clientId=xc.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this._uninitializedComponentsProvider=o,this.authCredentials.start(r,async a=>{j("FirestoreClient","Received user=",a.uid),await this.authCredentialListener(a),this.user=a}),this.appCheckCredentials.start(r,a=>(j("FirestoreClient","Received new app check token=",a),this.appCheckCredentialListener(a,this.user)))}get configuration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}terminate(){this.asyncQueue.enterRestrictedMode();const e=new et;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const r=Io(t,"Failed to shutdown persistence");e.reject(r)}}),e.promise}}async function _i(n,e){n.asyncQueue.verifyOperationInProgress(),j("FirestoreClient","Initializing OfflineComponentProvider");const t=n.configuration;await e.initialize(t);let r=t.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await cu(e.localStore,s),r=s)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Vl(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Rg(n);j("FirestoreClient","Initializing OnlineComponentProvider"),await e.initialize(t,n.configuration),n.setCredentialChangeListener(r=>Rl(e.remoteStore,r)),n.setAppCheckTokenChangeListener((r,s)=>Rl(e.remoteStore,s)),n._onlineComponents=e}async function Rg(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){j("FirestoreClient","Using user provided OfflineComponentProvider");try{await _i(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!function(s){return s.name==="FirebaseError"?s.code===C.FAILED_PRECONDITION||s.code===C.UNIMPLEMENTED:!(typeof DOMException<"u"&&s instanceof DOMException)||s.code===22||s.code===20||s.code===11}(t))throw t;an("Error using user provided cache. Falling back to memory cache: "+t),await _i(n,new ms)}}else j("FirestoreClient","Using default OfflineComponentProvider"),await _i(n,new ms);return n._offlineComponents}async function Du(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(j("FirestoreClient","Using user provided OnlineComponentProvider"),await Vl(n,n._uninitializedComponentsProvider._online)):(j("FirestoreClient","Using default OnlineComponentProvider"),await Vl(n,new zi))),n._onlineComponents}function Pg(n){return Du(n).then(e=>e.syncEngine)}async function ku(n){const e=await Du(n),t=e.eventManager;return t.onListen=pg.bind(null,e.syncEngine),t.onUnlisten=gg.bind(null,e.syncEngine),t.onFirstRemoteStoreListen=fg.bind(null,e.syncEngine),t.onLastRemoteStoreUnlisten=vg.bind(null,e.syncEngine),t}function Cg(n,e,t={}){const r=new et;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,u,h){const f=new xu({next:E=>{f.Za(),a.enqueueAndForget(()=>bu(o,v));const T=E.docs.has(c);!T&&E.fromCache?h.reject(new M(C.UNAVAILABLE,"Failed to get document because the client is offline.")):T&&E.fromCache&&u&&u.source==="server"?h.reject(new M(C.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):h.resolve(E)},error:E=>h.reject(E)}),v=new Eu(ao(c.path),f,{includeMetadataChanges:!0,_a:!0});return _u(o,v)}(await ku(n),n.asyncQueue,e,t,r)),r.promise}function xg(n,e,t={}){const r=new et;return n.asyncQueue.enqueueAndForget(async()=>function(o,a,c,u,h){const f=new xu({next:E=>{f.Za(),a.enqueueAndForget(()=>bu(o,v)),E.fromCache&&u.source==="server"?h.reject(new M(C.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):h.resolve(E)},error:E=>h.reject(E)}),v=new Eu(c,f,{includeMetadataChanges:!0,_a:!0});return _u(o,v)}(await ku(n),n.asyncQueue,e,t,r)),r.promise}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vu(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl=new Map;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Nu(n,e,t){if(!t)throw new M(C.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Dg(n,e,t,r){if(e===!0&&r===!0)throw new M(C.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Ol(n){if(!$.isDocumentKey(n))throw new M(C.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Ll(n){if($.isDocumentKey(n))throw new M(C.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Os(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(r){return r.constructor?r.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":B()}function Rt(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new M(C.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Os(n);throw new M(C.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e){var t,r;if(e.host===void 0){if(e.ssl!==void 0)throw new M(C.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new M(C.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Dg("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Vu((r=e.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(o){if(o.timeoutSeconds!==void 0){if(isNaN(o.timeoutSeconds))throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (must not be NaN)`);if(o.timeoutSeconds<5)throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (minimum allowed value is 5)`);if(o.timeoutSeconds>30)throw new M(C.INVALID_ARGUMENT,`invalid long polling timeout: ${o.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ls{constructor(e,t,r,s){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Ml({}),this._settingsFrozen=!1,this._terminateTask="notTerminated"}get app(){if(!this._app)throw new M(C.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!=="notTerminated"}_setSettings(e){if(this._settingsFrozen)throw new M(C.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Ml(e),e.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Kp;switch(r.type){case"firstParty":return new Xp(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new M(C.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask==="notTerminated"&&(this._terminateTask=this._terminate()),this._terminateTask}async _restart(){this._terminateTask==="notTerminated"?await this._terminate():this._terminateTask="notTerminated"}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const r=Nl.get(t);r&&(j("ComponentProvider","Removing Datastore"),Nl.delete(t),r.terminate())}(this),Promise.resolve()}}function kg(n,e,t,r={}){var s;const o=(n=Rt(n,Ls))._getSettings(),a=`${e}:${t}`;if(o.host!=="firestore.googleapis.com"&&o.host!==a&&an("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},o),{host:a,ssl:!1})),r.mockUserToken){let c,u;if(typeof r.mockUserToken=="string")c=r.mockUserToken,u=Ae.MOCK_USER;else{c=Eh(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const h=r.mockUserToken.sub||r.mockUserToken.user_id;if(!h)throw new M(C.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new Ae(h)}n._authCredentials=new Qp(new Cc(c,u))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bn{constructor(e,t,r){this.converter=t,this._query=r,this.type="query",this.firestore=e}withConverter(e){return new bn(this.firestore,e,this._query)}}class ke{constructor(e,t,r){this.converter=t,this._key=r,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Tt(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new ke(this.firestore,e,this._key)}}class Tt extends bn{constructor(e,t,r){super(e,t,ao(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new ke(this.firestore,null,new $(e))}withConverter(e){return new Tt(this.firestore,e,this._path)}}function jl(n,e,...t){if(n=Le(n),Nu("collection","path",e),n instanceof Ls){const r=ee.fromString(e,...t);return Ll(r),new Tt(n,null,r)}{if(!(n instanceof ke||n instanceof Tt))throw new M(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return Ll(r),new Tt(n.firestore,null,r)}}function bi(n,e,...t){if(n=Le(n),arguments.length===1&&(e=xc.newId()),Nu("doc","path",e),n instanceof Ls){const r=ee.fromString(e,...t);return Ol(r),new ke(n,null,new $(r))}{if(!(n instanceof ke||n instanceof Tt))throw new M(C.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(ee.fromString(e,...t));return Ol(r),new ke(n.firestore,n instanceof Tt?n.converter:null,new $(r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(e=Promise.resolve()){this.Pu=[],this.Iu=!1,this.Tu=[],this.Eu=null,this.du=!1,this.Au=!1,this.Ru=[],this.t_=new du(this,"async_queue_retry"),this.Vu=()=>{const r=yi();r&&j("AsyncQueue","Visibility state changed to "+r.visibilityState),this.t_.jo()},this.mu=e;const t=yi();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.Vu)}get isShuttingDown(){return this.Iu}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.fu(),this.gu(e)}enterRestrictedMode(e){if(!this.Iu){this.Iu=!0,this.Au=e||!1;const t=yi();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.Vu)}}enqueue(e){if(this.fu(),this.Iu)return new Promise(()=>{});const t=new et;return this.gu(()=>this.Iu&&this.Au?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Pu.push(e),this.pu()))}async pu(){if(this.Pu.length!==0){try{await this.Pu[0](),this.Pu.shift(),this.t_.reset()}catch(e){if(!ur(e))throw e;j("AsyncQueue","Operation failed with retryable error: "+e)}this.Pu.length>0&&this.t_.Go(()=>this.pu())}}gu(e){const t=this.mu.then(()=>(this.du=!0,e().catch(r=>{this.Eu=r,this.du=!1;const s=function(a){let c=a.message||"";return a.stack&&(c=a.stack.includes(a.message)?a.stack:a.message+`
`+a.stack),c}(r);throw nt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.du=!1,r))));return this.mu=t,t}enqueueAfterDelay(e,t,r){this.fu(),this.Ru.indexOf(e)>-1&&(t=0);const s=Eo.createAndSchedule(this,e,t,r,o=>this.yu(o));return this.Tu.push(s),s}fu(){this.Eu&&B()}verifyOperationInProgress(){}async wu(){let e;do e=this.mu,await e;while(e!==this.mu)}Su(e){for(const t of this.Tu)if(t.timerId===e)return!0;return!1}bu(e){return this.wu().then(()=>{this.Tu.sort((t,r)=>t.targetTimeMs-r.targetTimeMs);for(const t of this.Tu)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.wu()})}Du(e){this.Ru.push(e)}yu(e){const t=this.Tu.indexOf(e);this.Tu.splice(t,1)}}class gr extends Ls{constructor(e,t,r,s){super(e,t,r,s),this.type="firestore",this._queue=new Ul,this._persistenceKey=(s==null?void 0:s.name)||"[DEFAULT]"}async _terminate(){if(this._firestoreClient){const e=this._firestoreClient.terminate();this._queue=new Ul(e),this._firestoreClient=void 0,await e}}}function Vg(n,e){const t=typeof n=="object"?n:Zi(),r=typeof n=="string"?n:"(default)",s=Xi(t,"firestore").getImmediate({identifier:r});if(!s._initialized){const o=_h("firestore");o&&kg(s,...o)}return s}function Ao(n){if(n._terminated)throw new M(C.FAILED_PRECONDITION,"The client has already been terminated.");return n._firestoreClient||Ng(n),n._firestoreClient}function Ng(n){var e,t,r;const s=n._freezeSettings(),o=function(c,u,h,f){return new hf(c,u,h,f.host,f.ssl,f.experimentalForceLongPolling,f.experimentalAutoDetectLongPolling,Vu(f.experimentalLongPollingOptions),f.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,s);n._componentsProvider||!((t=s.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._componentsProvider={_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider}),n._firestoreClient=new Sg(n._authCredentials,n._appCheckCredentials,n._queue,o,n._componentsProvider&&function(c){const u=c==null?void 0:c._online.build();return{_offline:c==null?void 0:c._offline.build(u),_online:u}}(n._componentsProvider))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pn{constructor(e){this._byteString=e}static fromBase64String(e){try{return new pn(_e.fromBase64String(e))}catch(t){throw new M(C.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new pn(_e.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class So{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new M(C.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new ge(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ou{constructor(e){this._methodName=e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ro{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new M(C.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new M(C.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return J(this._lat,e._lat)||J(this._long,e._long)}}/**
 * @license
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Po{constructor(e){this._values=(e||[]).map(t=>t)}toArray(){return this._values.map(e=>e)}isEqual(e){return function(r,s){if(r.length!==s.length)return!1;for(let o=0;o<r.length;++o)if(r[o]!==s[o])return!1;return!0}(this._values,e._values)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Og=/^__.*__$/;class Lg{constructor(e,t,r){this.data=e,this.fieldMask=t,this.fieldTransforms=r}toMutation(e,t){return this.fieldMask!==null?new Ht(e,this.data,this.fieldMask,t,this.fieldTransforms):new hr(e,this.data,t,this.fieldTransforms)}}function Lu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw B()}}class Co{constructor(e,t,r,s,o,a){this.settings=e,this.databaseId=t,this.serializer=r,this.ignoreUndefinedProperties=s,o===void 0&&this.vu(),this.fieldTransforms=o||[],this.fieldMask=a||[]}get path(){return this.settings.path}get Cu(){return this.settings.Cu}Fu(e){return new Co(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Mu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.Ou(e),s}Nu(e){var t;const r=(t=this.path)===null||t===void 0?void 0:t.child(e),s=this.Fu({path:r,xu:!1});return s.vu(),s}Lu(e){return this.Fu({path:void 0,xu:!0})}Bu(e){return gs(e,this.settings.methodName,this.settings.ku||!1,this.path,this.settings.qu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}vu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Ou(this.path.get(e))}Ou(e){if(e.length===0)throw this.Bu("Document fields must not be empty");if(Lu(this.Cu)&&Og.test(e))throw this.Bu('Document fields cannot begin and end with "__"')}}class Mg{constructor(e,t,r){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=r||ks(e)}Qu(e,t,r,s=!1){return new Co({Cu:e,methodName:t,qu:r,path:ge.emptyPath(),xu:!1,ku:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function Mu(n){const e=n._freezeSettings(),t=ks(n._databaseId);return new Mg(n._databaseId,!!e.ignoreUndefinedProperties,t)}function jg(n,e,t,r,s,o={}){const a=n.Qu(o.merge||o.mergeFields?2:0,e,t,s);Fu("Data must be an object, but it was:",a,r);const c=ju(r,a);let u,h;if(o.merge)u=new Ue(a.fieldMask),h=a.fieldTransforms;else if(o.mergeFields){const f=[];for(const v of o.mergeFields){const E=Fg(e,v,t);if(!a.contains(E))throw new M(C.INVALID_ARGUMENT,`Field '${E}' is specified in your field mask but missing from your input data.`);qg(f,E)||f.push(E)}u=new Ue(f),h=a.fieldTransforms.filter(v=>u.covers(v.field))}else u=null,h=a.fieldTransforms;return new Lg(new Oe(c),u,h)}function Ug(n,e,t,r=!1){return xo(t,n.Qu(r?4:3,e))}function xo(n,e){if(Uu(n=Le(n)))return Fu("Unsupported field value:",e,n),ju(n,e);if(n instanceof Ou)return function(r,s){if(!Lu(s.Cu))throw s.Bu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.Bu(`${r._methodName}() is not currently supported inside arrays`);const o=r._toFieldTransform(s);o&&s.fieldTransforms.push(o)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.xu&&e.Cu!==4)throw e.Bu("Nested arrays are not supported");return function(r,s){const o=[];let a=0;for(const c of r){let u=xo(c,s.Lu(a));u==null&&(u={nullValue:"NULL_VALUE"}),o.push(u),a++}return{arrayValue:{values:o}}}(n,e)}return function(r,s){if((r=Le(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return Nf(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const o=ue.fromDate(r);return{timestampValue:ps(s.serializer,o)}}if(r instanceof ue){const o=new ue(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:ps(s.serializer,o)}}if(r instanceof Ro)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof pn)return{bytesValue:nu(s.serializer,r._byteString)};if(r instanceof ke){const o=s.databaseId,a=r.firestore._databaseId;if(!a.isEqual(o))throw s.Bu(`Document reference is for database ${a.projectId}/${a.database} but should be for database ${o.projectId}/${o.database}`);return{referenceValue:po(r.firestore._databaseId||s.databaseId,r._key.path)}}if(r instanceof Po)return function(a,c){return{mapValue:{fields:{__type__:{stringValue:"__vector__"},value:{arrayValue:{values:a.toArray().map(u=>{if(typeof u!="number")throw c.Bu("VectorValues must only contain numeric values.");return lo(c.serializer,u)})}}}}}}(r,s);throw s.Bu(`Unsupported field value: ${Os(r)}`)}(n,e)}function ju(n,e){const t={};return Dc(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):vn(n,(r,s)=>{const o=xo(s,e.Mu(r));o!=null&&(t[r]=o)}),{mapValue:{fields:t}}}function Uu(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof ue||n instanceof Ro||n instanceof pn||n instanceof ke||n instanceof Ou||n instanceof Po)}function Fu(n,e,t){if(!Uu(t)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(t)){const r=Os(t);throw r==="an object"?e.Bu(n+" a custom object"):e.Bu(n+" "+r)}}function Fg(n,e,t){if((e=Le(e))instanceof So)return e._internalPath;if(typeof e=="string")return $u(n,e);throw gs("Field path arguments must be of type string or ",n,!1,void 0,t)}const $g=new RegExp("[~\\*/\\[\\]]");function $u(n,e,t){if(e.search($g)>=0)throw gs(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new So(...e.split("."))._internalPath}catch{throw gs(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function gs(n,e,t,r,s){const o=r&&!r.isEmpty(),a=s!==void 0;let c=`Function ${e}() called with invalid data`;t&&(c+=" (via `toFirestore()`)"),c+=". ";let u="";return(o||a)&&(u+=" (found",o&&(u+=` in field ${r}`),a&&(u+=` in document ${s}`),u+=")"),new M(C.INVALID_ARGUMENT,c+n+u)}function qg(n,e){return n.some(t=>t.isEqual(e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qu{constructor(e,t,r,s,o){this._firestore=e,this._userDataWriter=t,this._key=r,this._document=s,this._converter=o}get id(){return this._key.path.lastSegment()}get ref(){return new ke(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Bg(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Do("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Bg extends qu{data(){return super.data()}}function Do(n,e){return typeof e=="string"?$u(n,e):e instanceof So?e._internalPath:e._delegate._internalPath}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zg(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new M(C.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class ko{}class Hg extends ko{}function Gg(n,e,...t){let r=[];e instanceof ko&&r.push(e),r=r.concat(t),function(o){const a=o.filter(u=>u instanceof Vo).length,c=o.filter(u=>u instanceof Ms).length;if(a>1||a>0&&c>0)throw new M(C.INVALID_ARGUMENT,"InvalidQuery. When using composite filters, you cannot use more than one filter at the top level. Consider nesting the multiple filters within an `and(...)` statement. For example: change `query(query, where(...), or(...))` to `query(query, and(where(...), or(...)))`.")}(r);for(const s of r)n=s._apply(n);return n}class Ms extends Hg{constructor(e,t,r){super(),this._field=e,this._op=t,this._value=r,this.type="where"}static _create(e,t,r){return new Ms(e,t,r)}_apply(e){const t=this._parse(e);return Bu(e._query,t),new bn(e.firestore,e.converter,Oi(e._query,t))}_parse(e){const t=Mu(e.firestore);return function(o,a,c,u,h,f,v){let E;if(h.isKeyField()){if(f==="array-contains"||f==="array-contains-any")throw new M(C.INVALID_ARGUMENT,`Invalid Query. You can't perform '${f}' queries on documentId().`);if(f==="in"||f==="not-in"){$l(v,f);const T=[];for(const R of v)T.push(Fl(u,o,R));E={arrayValue:{values:T}}}else E=Fl(u,o,v)}else f!=="in"&&f!=="not-in"&&f!=="array-contains-any"||$l(v,f),E=Ug(c,a,v,f==="in"||f==="not-in");return ce.create(h,f,E)}(e._query,"where",t,e.firestore._databaseId,this._field,this._op,this._value)}}function Wg(n,e,t){const r=e,s=Do("where",n);return Ms._create(s,r,t)}class Vo extends ko{constructor(e,t){super(),this.type=e,this._queryConstraints=t}static _create(e,t){return new Vo(e,t)}_parse(e){const t=this._queryConstraints.map(r=>r._parse(e)).filter(r=>r.getFilters().length>0);return t.length===1?t[0]:Fe.create(t,this._getOperator())}_apply(e){const t=this._parse(e);return t.getFilters().length===0?e:(function(s,o){let a=s;const c=o.getFlattenedFilters();for(const u of c)Bu(a,u),a=Oi(a,u)}(e._query,t),new bn(e.firestore,e.converter,Oi(e._query,t)))}_getQueryConstraints(){return this._queryConstraints}_getOperator(){return this.type==="and"?"and":"or"}}function Fl(n,e,t){if(typeof(t=Le(t))=="string"){if(t==="")throw new M(C.INVALID_ARGUMENT,"Invalid query. When querying with documentId(), you must provide a valid document ID, but it was an empty string.");if(!Fc(e)&&t.indexOf("/")!==-1)throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying a collection by documentId(), you must provide a plain document ID, but '${t}' contains a '/' character.`);const r=e.path.child(ee.fromString(t));if(!$.isDocumentKey(r))throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying a collection group by documentId(), the value provided must result in a valid document path, but '${r}' is not because it has an odd number of segments (${r.length}).`);return al(n,new $(r))}if(t instanceof ke)return al(n,t._key);throw new M(C.INVALID_ARGUMENT,`Invalid query. When querying with documentId(), you must provide a valid string or a DocumentReference, but it was: ${Os(t)}.`)}function $l(n,e){if(!Array.isArray(n)||n.length===0)throw new M(C.INVALID_ARGUMENT,`Invalid Query. A non-empty array is required for '${e.toString()}' filters.`)}function Bu(n,e){const t=function(s,o){for(const a of s)for(const c of a.getFlattenedFilters())if(o.indexOf(c.op)>=0)return c.op;return null}(n.filters,function(s){switch(s){case"!=":return["!=","not-in"];case"array-contains-any":case"in":return["not-in"];case"not-in":return["array-contains-any","in","not-in","!="];default:return[]}}(e.op));if(t!==null)throw t===e.op?new M(C.INVALID_ARGUMENT,`Invalid query. You cannot use more than one '${e.op.toString()}' filter.`):new M(C.INVALID_ARGUMENT,`Invalid query. You cannot use '${e.op.toString()}' filters with '${t.toString()}' filters.`)}class Kg{convertValue(e,t="none"){switch(qt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return ae(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes($t(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 11:return this.convertObject(e.mapValue,t);case 10:return this.convertVectorValue(e.mapValue);default:throw B()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const r={};return vn(e,(s,o)=>{r[s]=this.convertValue(o,t)}),r}convertVectorValue(e){var t,r,s;const o=(s=(r=(t=e.fields)===null||t===void 0?void 0:t.value.arrayValue)===null||r===void 0?void 0:r.values)===null||s===void 0?void 0:s.map(a=>ae(a.doubleValue));return new Po(o)}convertGeoPoint(e){return new Ro(ae(e.latitude),ae(e.longitude))}convertArray(e,t){return(e.values||[]).map(r=>this.convertValue(r,t))}convertServerTimestamp(e,t){switch(t){case"previous":const r=ro(e);return r==null?null:this.convertValue(r,t);case"estimate":return this.convertTimestamp(er(e));default:return null}}convertTimestamp(e){const t=At(e);return new ue(t.seconds,t.nanos)}convertDocumentKey(e,t){const r=ee.fromString(e);Y(lu(r));const s=new tr(r.get(1),r.get(3)),o=new $(r.popFirst(5));return s.isEqual(t)||nt(`Document ${o} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qg(n,e,t){let r;return r=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,r}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class zu extends qu{constructor(e,t,r,s,o,a){super(e,t,r,s,a),this._firestore=e,this._firestoreImpl=e,this.metadata=o}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new Xr(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const r=this._document.data.field(Do("DocumentSnapshot.get",e));if(r!==null)return this._userDataWriter.convertValue(r,t.serverTimestamps)}}}class Xr extends zu{data(e={}){return super.data(e)}}class Jg{constructor(e,t,r,s){this._firestore=e,this._userDataWriter=t,this._snapshot=s,this.metadata=new Hn(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(r=>{e.call(t,new Xr(this._firestore,this._userDataWriter,r.key,r,new Hn(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new M(C.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(s,o){if(s._snapshot.oldDocs.isEmpty()){let a=0;return s._snapshot.docChanges.map(c=>{const u=new Xr(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Hn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);return c.doc,{type:"added",doc:u,oldIndex:-1,newIndex:a++}})}{let a=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(c=>o||c.type!==3).map(c=>{const u=new Xr(s._firestore,s._userDataWriter,c.doc.key,c.doc,new Hn(s._snapshot.mutatedKeys.has(c.doc.key),s._snapshot.fromCache),s.query.converter);let h=-1,f=-1;return c.type!==0&&(h=a.indexOf(c.doc.key),a=a.delete(c.doc.key)),c.type!==1&&(a=a.add(c.doc),f=a.indexOf(c.doc.key)),{type:Yg(c.type),doc:u,oldIndex:h,newIndex:f}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Yg(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return B()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Xg(n){n=Rt(n,ke);const e=Rt(n.firestore,gr);return Cg(Ao(e),n._key).then(t=>tv(e,n,t))}class Hu extends Kg{constructor(e){super(),this.firestore=e}convertBytes(e){return new pn(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new ke(this.firestore,null,t)}}function ql(n){n=Rt(n,bn);const e=Rt(n.firestore,gr),t=Ao(e),r=new Hu(e);return zg(n._query),xg(t,n._query).then(s=>new Jg(e,r,n,s))}function Zg(n,e,t){n=Rt(n,ke);const r=Rt(n.firestore,gr),s=Qg(n.converter,e,t);return Gu(r,[jg(Mu(r),"setDoc",n._key,s,n.converter!==null,t).toMutation(n._key,qe.none())])}function ev(n){return Gu(Rt(n.firestore,gr),[new co(n._key,qe.none())])}function Gu(n,e){return function(r,s){const o=new et;return r.asyncQueue.enqueueAndForget(async()=>yg(await Pg(r),s,o)),o.promise}(Ao(n),e)}function tv(n,e,t){const r=t.docs.get(e._key),s=new Hu(n);return new zu(n,s,e._key,r,new Hn(t.hasPendingWrites,t.fromCache),e.converter)}(function(e,t=!0){(function(s){gn=s})(mn),on(new Ut("firestore",(r,{instanceIdentifier:s,options:o})=>{const a=r.getProvider("app").getImmediate(),c=new gr(new Jp(r.getProvider("auth-internal")),new ef(r.getProvider("app-check-internal")),function(h,f){if(!Object.prototype.hasOwnProperty.apply(h.options,["projectId"]))throw new M(C.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new tr(h.options.projectId,f)}(a,s),a);return o=Object.assign({useFetchStreams:t},o),c._setSettings(o),c},"PUBLIC").setMultipleInstances(!0)),It(nl,"4.7.3",e),It(nl,"4.7.3","esm2017")})();function No(n,e){var t={};for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&e.indexOf(r)<0&&(t[r]=n[r]);if(n!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,r=Object.getOwnPropertySymbols(n);s<r.length;s++)e.indexOf(r[s])<0&&Object.prototype.propertyIsEnumerable.call(n,r[s])&&(t[r[s]]=n[r[s]]);return t}function Wu(){return{"dependent-sdk-initialized-before-auth":"Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."}}const nv=Wu,Ku=new ar("auth","Firebase",Wu());/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const vs=new Ji("@firebase/auth");function rv(n,...e){vs.logLevel<=W.WARN&&vs.warn(`Auth (${mn}): ${n}`,...e)}function Zr(n,...e){vs.logLevel<=W.ERROR&&vs.error(`Auth (${mn}): ${n}`,...e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function st(n,...e){throw Oo(n,...e)}function ze(n,...e){return Oo(n,...e)}function Qu(n,e,t){const r=Object.assign(Object.assign({},nv()),{[e]:t});return new ar("auth","Firebase",r).create(e,{appName:n.name})}function Mt(n){return Qu(n,"operation-not-supported-in-this-environment","Operations that alter the current user are not supported in conjunction with FirebaseServerApp")}function Oo(n,...e){if(typeof n!="string"){const t=e[0],r=[...e.slice(1)];return r[0]&&(r[0].appName=n.name),n._errorFactory.create(t,...r)}return Ku.create(n,...e)}function q(n,e,...t){if(!n)throw Oo(e,...t)}function Je(n){const e="INTERNAL ASSERTION FAILED: "+n;throw Zr(e),new Error(e)}function it(n,e){n||Je(e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Hi(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.href)||""}function sv(){return Bl()==="http:"||Bl()==="https:"}function Bl(){var n;return typeof self<"u"&&((n=self.location)===null||n===void 0?void 0:n.protocol)||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function iv(){return typeof navigator<"u"&&navigator&&"onLine"in navigator&&typeof navigator.onLine=="boolean"&&(sv()||Ah()||"connection"in navigator)?navigator.onLine:!0}function ov(){if(typeof navigator>"u")return null;const n=navigator;return n.languages&&n.languages[0]||n.language||null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vr{constructor(e,t){this.shortDelay=e,this.longDelay=t,it(t>e,"Short delay should be less than long delay!"),this.isMobile=Ih()||Sh()}get(){return iv()?this.isMobile?this.longDelay:this.shortDelay:Math.min(5e3,this.shortDelay)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Lo(n,e){it(n.emulator,"Emulator should always be set here");const{url:t}=n.emulator;return e?`${t}${e.startsWith("/")?e.slice(1):e}`:t}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ju{static initialize(e,t,r){this.fetchImpl=e,t&&(this.headersImpl=t),r&&(this.responseImpl=r)}static fetch(){if(this.fetchImpl)return this.fetchImpl;if(typeof self<"u"&&"fetch"in self)return self.fetch;if(typeof globalThis<"u"&&globalThis.fetch)return globalThis.fetch;if(typeof fetch<"u")return fetch;Je("Could not find fetch implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static headers(){if(this.headersImpl)return this.headersImpl;if(typeof self<"u"&&"Headers"in self)return self.Headers;if(typeof globalThis<"u"&&globalThis.Headers)return globalThis.Headers;if(typeof Headers<"u")return Headers;Je("Could not find Headers implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}static response(){if(this.responseImpl)return this.responseImpl;if(typeof self<"u"&&"Response"in self)return self.Response;if(typeof globalThis<"u"&&globalThis.Response)return globalThis.Response;if(typeof Response<"u")return Response;Je("Could not find Response implementation, make sure you call FetchProvider.initialize() with an appropriate polyfill")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const av={CREDENTIAL_MISMATCH:"custom-token-mismatch",MISSING_CUSTOM_TOKEN:"internal-error",INVALID_IDENTIFIER:"invalid-email",MISSING_CONTINUE_URI:"internal-error",INVALID_PASSWORD:"wrong-password",MISSING_PASSWORD:"missing-password",INVALID_LOGIN_CREDENTIALS:"invalid-credential",EMAIL_EXISTS:"email-already-in-use",PASSWORD_LOGIN_DISABLED:"operation-not-allowed",INVALID_IDP_RESPONSE:"invalid-credential",INVALID_PENDING_TOKEN:"invalid-credential",FEDERATED_USER_ID_ALREADY_LINKED:"credential-already-in-use",MISSING_REQ_TYPE:"internal-error",EMAIL_NOT_FOUND:"user-not-found",RESET_PASSWORD_EXCEED_LIMIT:"too-many-requests",EXPIRED_OOB_CODE:"expired-action-code",INVALID_OOB_CODE:"invalid-action-code",MISSING_OOB_CODE:"internal-error",CREDENTIAL_TOO_OLD_LOGIN_AGAIN:"requires-recent-login",INVALID_ID_TOKEN:"invalid-user-token",TOKEN_EXPIRED:"user-token-expired",USER_NOT_FOUND:"user-token-expired",TOO_MANY_ATTEMPTS_TRY_LATER:"too-many-requests",PASSWORD_DOES_NOT_MEET_REQUIREMENTS:"password-does-not-meet-requirements",INVALID_CODE:"invalid-verification-code",INVALID_SESSION_INFO:"invalid-verification-id",INVALID_TEMPORARY_PROOF:"invalid-credential",MISSING_SESSION_INFO:"missing-verification-id",SESSION_EXPIRED:"code-expired",MISSING_ANDROID_PACKAGE_NAME:"missing-android-pkg-name",UNAUTHORIZED_DOMAIN:"unauthorized-continue-uri",INVALID_OAUTH_CLIENT_ID:"invalid-oauth-client-id",ADMIN_ONLY_OPERATION:"admin-restricted-operation",INVALID_MFA_PENDING_CREDENTIAL:"invalid-multi-factor-session",MFA_ENROLLMENT_NOT_FOUND:"multi-factor-info-not-found",MISSING_MFA_ENROLLMENT_ID:"missing-multi-factor-info",MISSING_MFA_PENDING_CREDENTIAL:"missing-multi-factor-session",SECOND_FACTOR_EXISTS:"second-factor-already-in-use",SECOND_FACTOR_LIMIT_EXCEEDED:"maximum-second-factor-count-exceeded",BLOCKING_FUNCTION_ERROR_RESPONSE:"internal-error",RECAPTCHA_NOT_ENABLED:"recaptcha-not-enabled",MISSING_RECAPTCHA_TOKEN:"missing-recaptcha-token",INVALID_RECAPTCHA_TOKEN:"invalid-recaptcha-token",INVALID_RECAPTCHA_ACTION:"invalid-recaptcha-action",MISSING_CLIENT_TYPE:"missing-client-type",MISSING_RECAPTCHA_VERSION:"missing-recaptcha-version",INVALID_RECAPTCHA_VERSION:"invalid-recaptcha-version",INVALID_REQ_TYPE:"invalid-req-type"};/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const lv=new vr(3e4,6e4);function Mo(n,e){return n.tenantId&&!e.tenantId?Object.assign(Object.assign({},e),{tenantId:n.tenantId}):e}async function En(n,e,t,r,s={}){return Yu(n,s,async()=>{let o={},a={};r&&(e==="GET"?a=r:o={body:JSON.stringify(r)});const c=lr(Object.assign({key:n.config.apiKey},a)).slice(1),u=await n._getAdditionalHeaders();u["Content-Type"]="application/json",n.languageCode&&(u["X-Firebase-Locale"]=n.languageCode);const h=Object.assign({method:e,headers:u},o);return wh()||(h.referrerPolicy="no-referrer"),Ju.fetch()(Xu(n,n.config.apiHost,t,c),h)})}async function Yu(n,e,t){n._canInitEmulator=!1;const r=Object.assign(Object.assign({},av),e);try{const s=new uv(n),o=await Promise.race([t(),s.promise]);s.clearNetworkTimeout();const a=await o.json();if("needConfirmation"in a)throw zr(n,"account-exists-with-different-credential",a);if(o.ok&&!("errorMessage"in a))return a;{const c=o.ok?a.errorMessage:a.error.message,[u,h]=c.split(" : ");if(u==="FEDERATED_USER_ID_ALREADY_LINKED")throw zr(n,"credential-already-in-use",a);if(u==="EMAIL_EXISTS")throw zr(n,"email-already-in-use",a);if(u==="USER_DISABLED")throw zr(n,"user-disabled",a);const f=r[u]||u.toLowerCase().replace(/[_\s]+/g,"-");if(h)throw Qu(n,f,h);st(n,f)}}catch(s){if(s instanceof ot)throw s;st(n,"network-request-failed",{message:String(s)})}}async function cv(n,e,t,r,s={}){const o=await En(n,e,t,r,s);return"mfaPendingCredential"in o&&st(n,"multi-factor-auth-required",{_serverResponse:o}),o}function Xu(n,e,t,r){const s=`${e}${t}?${r}`;return n.config.emulator?Lo(n.config,s):`${n.config.apiScheme}://${s}`}class uv{constructor(e){this.auth=e,this.timer=null,this.promise=new Promise((t,r)=>{this.timer=setTimeout(()=>r(ze(this.auth,"network-request-failed")),lv.get())})}clearNetworkTimeout(){clearTimeout(this.timer)}}function zr(n,e,t){const r={appName:n.name};t.email&&(r.email=t.email),t.phoneNumber&&(r.phoneNumber=t.phoneNumber);const s=ze(n,e,r);return s.customData._tokenResponse=t,s}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function dv(n,e){return En(n,"POST","/v1/accounts:delete",e)}async function Zu(n,e){return En(n,"POST","/v1/accounts:lookup",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jn(n){if(n)try{const e=new Date(Number(n));if(!isNaN(e.getTime()))return e.toUTCString()}catch{}}async function hv(n,e=!1){const t=Le(n),r=await t.getIdToken(e),s=jo(r);q(s&&s.exp&&s.auth_time&&s.iat,t.auth,"internal-error");const o=typeof s.firebase=="object"?s.firebase:void 0,a=o==null?void 0:o.sign_in_provider;return{claims:s,token:r,authTime:Jn(Ei(s.auth_time)),issuedAtTime:Jn(Ei(s.iat)),expirationTime:Jn(Ei(s.exp)),signInProvider:a||null,signInSecondFactor:(o==null?void 0:o.sign_in_second_factor)||null}}function Ei(n){return Number(n)*1e3}function jo(n){const[e,t,r]=n.split(".");if(e===void 0||t===void 0||r===void 0)return Zr("JWT malformed, contained fewer than 3 sections"),null;try{const s=fc(t);return s?JSON.parse(s):(Zr("Failed to decode base64 JWT payload"),null)}catch(s){return Zr("Caught error parsing JWT payload as JSON",s==null?void 0:s.toString()),null}}function zl(n){const e=jo(n);return q(e,"internal-error"),q(typeof e.exp<"u","internal-error"),q(typeof e.iat<"u","internal-error"),Number(e.exp)-Number(e.iat)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ir(n,e,t=!1){if(t)return e;try{return await e}catch(r){throw r instanceof ot&&pv(r)&&n.auth.currentUser===n&&await n.auth.signOut(),r}}function pv({code:n}){return n==="auth/user-disabled"||n==="auth/user-token-expired"}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fv{constructor(e){this.user=e,this.isRunning=!1,this.timerId=null,this.errorBackoff=3e4}_start(){this.isRunning||(this.isRunning=!0,this.schedule())}_stop(){this.isRunning&&(this.isRunning=!1,this.timerId!==null&&clearTimeout(this.timerId))}getInterval(e){var t;if(e){const r=this.errorBackoff;return this.errorBackoff=Math.min(this.errorBackoff*2,96e4),r}else{this.errorBackoff=3e4;const s=((t=this.user.stsTokenManager.expirationTime)!==null&&t!==void 0?t:0)-Date.now()-3e5;return Math.max(0,s)}}schedule(e=!1){if(!this.isRunning)return;const t=this.getInterval(e);this.timerId=setTimeout(async()=>{await this.iteration()},t)}async iteration(){try{await this.user.getIdToken(!0)}catch(e){(e==null?void 0:e.code)==="auth/network-request-failed"&&this.schedule(!0);return}this.schedule()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gi{constructor(e,t){this.createdAt=e,this.lastLoginAt=t,this._initializeTime()}_initializeTime(){this.lastSignInTime=Jn(this.lastLoginAt),this.creationTime=Jn(this.createdAt)}_copy(e){this.createdAt=e.createdAt,this.lastLoginAt=e.lastLoginAt,this._initializeTime()}toJSON(){return{createdAt:this.createdAt,lastLoginAt:this.lastLoginAt}}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function ys(n){var e;const t=n.auth,r=await n.getIdToken(),s=await ir(n,Zu(t,{idToken:r}));q(s==null?void 0:s.users.length,t,"internal-error");const o=s.users[0];n._notifyReloadListener(o);const a=!((e=o.providerUserInfo)===null||e===void 0)&&e.length?ed(o.providerUserInfo):[],c=gv(n.providerData,a),u=n.isAnonymous,h=!(n.email&&o.passwordHash)&&!(c!=null&&c.length),f=u?h:!1,v={uid:o.localId,displayName:o.displayName||null,photoURL:o.photoUrl||null,email:o.email||null,emailVerified:o.emailVerified||!1,phoneNumber:o.phoneNumber||null,tenantId:o.tenantId||null,providerData:c,metadata:new Gi(o.createdAt,o.lastLoginAt),isAnonymous:f};Object.assign(n,v)}async function mv(n){const e=Le(n);await ys(e),await e.auth._persistUserIfCurrent(e),e.auth._notifyListenersIfCurrent(e)}function gv(n,e){return[...n.filter(r=>!e.some(s=>s.providerId===r.providerId)),...e]}function ed(n){return n.map(e=>{var{providerId:t}=e,r=No(e,["providerId"]);return{providerId:t,uid:r.rawId||"",displayName:r.displayName||null,email:r.email||null,phoneNumber:r.phoneNumber||null,photoURL:r.photoUrl||null}})}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vv(n,e){const t=await Yu(n,{},async()=>{const r=lr({grant_type:"refresh_token",refresh_token:e}).slice(1),{tokenApiHost:s,apiKey:o}=n.config,a=Xu(n,s,"/v1/token",`key=${o}`),c=await n._getAdditionalHeaders();return c["Content-Type"]="application/x-www-form-urlencoded",Ju.fetch()(a,{method:"POST",headers:c,body:r})});return{accessToken:t.access_token,expiresIn:t.expires_in,refreshToken:t.refresh_token}}async function yv(n,e){return En(n,"POST","/v2/accounts:revokeToken",Mo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nn{constructor(){this.refreshToken=null,this.accessToken=null,this.expirationTime=null}get isExpired(){return!this.expirationTime||Date.now()>this.expirationTime-3e4}updateFromServerResponse(e){q(e.idToken,"internal-error"),q(typeof e.idToken<"u","internal-error"),q(typeof e.refreshToken<"u","internal-error");const t="expiresIn"in e&&typeof e.expiresIn<"u"?Number(e.expiresIn):zl(e.idToken);this.updateTokensAndExpiration(e.idToken,e.refreshToken,t)}updateFromIdToken(e){q(e.length!==0,"internal-error");const t=zl(e);this.updateTokensAndExpiration(e,null,t)}async getToken(e,t=!1){return!t&&this.accessToken&&!this.isExpired?this.accessToken:(q(this.refreshToken,e,"user-token-expired"),this.refreshToken?(await this.refresh(e,this.refreshToken),this.accessToken):null)}clearRefreshToken(){this.refreshToken=null}async refresh(e,t){const{accessToken:r,refreshToken:s,expiresIn:o}=await vv(e,t);this.updateTokensAndExpiration(r,s,Number(o))}updateTokensAndExpiration(e,t,r){this.refreshToken=t||null,this.accessToken=e||null,this.expirationTime=Date.now()+r*1e3}static fromJSON(e,t){const{refreshToken:r,accessToken:s,expirationTime:o}=t,a=new nn;return r&&(q(typeof r=="string","internal-error",{appName:e}),a.refreshToken=r),s&&(q(typeof s=="string","internal-error",{appName:e}),a.accessToken=s),o&&(q(typeof o=="number","internal-error",{appName:e}),a.expirationTime=o),a}toJSON(){return{refreshToken:this.refreshToken,accessToken:this.accessToken,expirationTime:this.expirationTime}}_assign(e){this.accessToken=e.accessToken,this.refreshToken=e.refreshToken,this.expirationTime=e.expirationTime}_clone(){return Object.assign(new nn,this.toJSON())}_performRefresh(){return Je("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function dt(n,e){q(typeof n=="string"||typeof n>"u","internal-error",{appName:e})}class Ye{constructor(e){var{uid:t,auth:r,stsTokenManager:s}=e,o=No(e,["uid","auth","stsTokenManager"]);this.providerId="firebase",this.proactiveRefresh=new fv(this),this.reloadUserInfo=null,this.reloadListener=null,this.uid=t,this.auth=r,this.stsTokenManager=s,this.accessToken=s.accessToken,this.displayName=o.displayName||null,this.email=o.email||null,this.emailVerified=o.emailVerified||!1,this.phoneNumber=o.phoneNumber||null,this.photoURL=o.photoURL||null,this.isAnonymous=o.isAnonymous||!1,this.tenantId=o.tenantId||null,this.providerData=o.providerData?[...o.providerData]:[],this.metadata=new Gi(o.createdAt||void 0,o.lastLoginAt||void 0)}async getIdToken(e){const t=await ir(this,this.stsTokenManager.getToken(this.auth,e));return q(t,this.auth,"internal-error"),this.accessToken!==t&&(this.accessToken=t,await this.auth._persistUserIfCurrent(this),this.auth._notifyListenersIfCurrent(this)),t}getIdTokenResult(e){return hv(this,e)}reload(){return mv(this)}_assign(e){this!==e&&(q(this.uid===e.uid,this.auth,"internal-error"),this.displayName=e.displayName,this.photoURL=e.photoURL,this.email=e.email,this.emailVerified=e.emailVerified,this.phoneNumber=e.phoneNumber,this.isAnonymous=e.isAnonymous,this.tenantId=e.tenantId,this.providerData=e.providerData.map(t=>Object.assign({},t)),this.metadata._copy(e.metadata),this.stsTokenManager._assign(e.stsTokenManager))}_clone(e){const t=new Ye(Object.assign(Object.assign({},this),{auth:e,stsTokenManager:this.stsTokenManager._clone()}));return t.metadata._copy(this.metadata),t}_onReload(e){q(!this.reloadListener,this.auth,"internal-error"),this.reloadListener=e,this.reloadUserInfo&&(this._notifyReloadListener(this.reloadUserInfo),this.reloadUserInfo=null)}_notifyReloadListener(e){this.reloadListener?this.reloadListener(e):this.reloadUserInfo=e}_startProactiveRefresh(){this.proactiveRefresh._start()}_stopProactiveRefresh(){this.proactiveRefresh._stop()}async _updateTokensIfNecessary(e,t=!1){let r=!1;e.idToken&&e.idToken!==this.stsTokenManager.accessToken&&(this.stsTokenManager.updateFromServerResponse(e),r=!0),t&&await ys(this),await this.auth._persistUserIfCurrent(this),r&&this.auth._notifyListenersIfCurrent(this)}async delete(){if(vt(this.auth.app))return Promise.reject(Mt(this.auth));const e=await this.getIdToken();return await ir(this,dv(this.auth,{idToken:e})),this.stsTokenManager.clearRefreshToken(),this.auth.signOut()}toJSON(){return Object.assign(Object.assign({uid:this.uid,email:this.email||void 0,emailVerified:this.emailVerified,displayName:this.displayName||void 0,isAnonymous:this.isAnonymous,photoURL:this.photoURL||void 0,phoneNumber:this.phoneNumber||void 0,tenantId:this.tenantId||void 0,providerData:this.providerData.map(e=>Object.assign({},e)),stsTokenManager:this.stsTokenManager.toJSON(),_redirectEventId:this._redirectEventId},this.metadata.toJSON()),{apiKey:this.auth.config.apiKey,appName:this.auth.name})}get refreshToken(){return this.stsTokenManager.refreshToken||""}static _fromJSON(e,t){var r,s,o,a,c,u,h,f;const v=(r=t.displayName)!==null&&r!==void 0?r:void 0,E=(s=t.email)!==null&&s!==void 0?s:void 0,T=(o=t.phoneNumber)!==null&&o!==void 0?o:void 0,R=(a=t.photoURL)!==null&&a!==void 0?a:void 0,P=(c=t.tenantId)!==null&&c!==void 0?c:void 0,x=(u=t._redirectEventId)!==null&&u!==void 0?u:void 0,U=(h=t.createdAt)!==null&&h!==void 0?h:void 0,N=(f=t.lastLoginAt)!==null&&f!==void 0?f:void 0,{uid:L,emailVerified:F,isAnonymous:k,providerData:O,stsTokenManager:b}=t;q(L&&b,e,"internal-error");const m=nn.fromJSON(this.name,b);q(typeof L=="string",e,"internal-error"),dt(v,e.name),dt(E,e.name),q(typeof F=="boolean",e,"internal-error"),q(typeof k=="boolean",e,"internal-error"),dt(T,e.name),dt(R,e.name),dt(P,e.name),dt(x,e.name),dt(U,e.name),dt(N,e.name);const g=new Ye({uid:L,auth:e,email:E,emailVerified:F,displayName:v,isAnonymous:k,photoURL:R,phoneNumber:T,tenantId:P,stsTokenManager:m,createdAt:U,lastLoginAt:N});return O&&Array.isArray(O)&&(g.providerData=O.map(_=>Object.assign({},_))),x&&(g._redirectEventId=x),g}static async _fromIdTokenResponse(e,t,r=!1){const s=new nn;s.updateFromServerResponse(t);const o=new Ye({uid:t.localId,auth:e,stsTokenManager:s,isAnonymous:r});return await ys(o),o}static async _fromGetAccountInfoResponse(e,t,r){const s=t.users[0];q(s.localId!==void 0,"internal-error");const o=s.providerUserInfo!==void 0?ed(s.providerUserInfo):[],a=!(s.email&&s.passwordHash)&&!(o!=null&&o.length),c=new nn;c.updateFromIdToken(r);const u=new Ye({uid:s.localId,auth:e,stsTokenManager:c,isAnonymous:a}),h={uid:s.localId,displayName:s.displayName||null,photoURL:s.photoUrl||null,email:s.email||null,emailVerified:s.emailVerified||!1,phoneNumber:s.phoneNumber||null,tenantId:s.tenantId||null,providerData:o,metadata:new Gi(s.createdAt,s.lastLoginAt),isAnonymous:!(s.email&&s.passwordHash)&&!(o!=null&&o.length)};return Object.assign(u,h),u}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Hl=new Map;function Xe(n){it(n instanceof Function,"Expected a class definition");let e=Hl.get(n);return e?(it(e instanceof n,"Instance stored in cache mismatched with class"),e):(e=new n,Hl.set(n,e),e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class td{constructor(){this.type="NONE",this.storage={}}async _isAvailable(){return!0}async _set(e,t){this.storage[e]=t}async _get(e){const t=this.storage[e];return t===void 0?null:t}async _remove(e){delete this.storage[e]}_addListener(e,t){}_removeListener(e,t){}}td.type="NONE";const Gl=td;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function es(n,e,t){return`firebase:${n}:${e}:${t}`}class rn{constructor(e,t,r){this.persistence=e,this.auth=t,this.userKey=r;const{config:s,name:o}=this.auth;this.fullUserKey=es(this.userKey,s.apiKey,o),this.fullPersistenceKey=es("persistence",s.apiKey,o),this.boundEventHandler=t._onStorageEvent.bind(t),this.persistence._addListener(this.fullUserKey,this.boundEventHandler)}setCurrentUser(e){return this.persistence._set(this.fullUserKey,e.toJSON())}async getCurrentUser(){const e=await this.persistence._get(this.fullUserKey);return e?Ye._fromJSON(this.auth,e):null}removeCurrentUser(){return this.persistence._remove(this.fullUserKey)}savePersistenceForRedirect(){return this.persistence._set(this.fullPersistenceKey,this.persistence.type)}async setPersistence(e){if(this.persistence===e)return;const t=await this.getCurrentUser();if(await this.removeCurrentUser(),this.persistence=e,t)return this.setCurrentUser(t)}delete(){this.persistence._removeListener(this.fullUserKey,this.boundEventHandler)}static async create(e,t,r="authUser"){if(!t.length)return new rn(Xe(Gl),e,r);const s=(await Promise.all(t.map(async h=>{if(await h._isAvailable())return h}))).filter(h=>h);let o=s[0]||Xe(Gl);const a=es(r,e.config.apiKey,e.name);let c=null;for(const h of t)try{const f=await h._get(a);if(f){const v=Ye._fromJSON(e,f);h!==o&&(c=v),o=h;break}}catch{}const u=s.filter(h=>h._shouldAllowMigration);return!o._shouldAllowMigration||!u.length?new rn(o,e,r):(o=u[0],c&&await o._set(a,c.toJSON()),await Promise.all(t.map(async h=>{if(h!==o)try{await h._remove(a)}catch{}})),new rn(o,e,r))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Wl(n){const e=n.toLowerCase();if(e.includes("opera/")||e.includes("opr/")||e.includes("opios/"))return"Opera";if(id(e))return"IEMobile";if(e.includes("msie")||e.includes("trident/"))return"IE";if(e.includes("edge/"))return"Edge";if(nd(e))return"Firefox";if(e.includes("silk/"))return"Silk";if(ad(e))return"Blackberry";if(ld(e))return"Webos";if(rd(e))return"Safari";if((e.includes("chrome/")||sd(e))&&!e.includes("edge/"))return"Chrome";if(od(e))return"Android";{const t=/([a-zA-Z\d\.]+)\/[a-zA-Z\d\.]*$/,r=n.match(t);if((r==null?void 0:r.length)===2)return r[1]}return"Other"}function nd(n=Pe()){return/firefox\//i.test(n)}function rd(n=Pe()){const e=n.toLowerCase();return e.includes("safari/")&&!e.includes("chrome/")&&!e.includes("crios/")&&!e.includes("android")}function sd(n=Pe()){return/crios\//i.test(n)}function id(n=Pe()){return/iemobile/i.test(n)}function od(n=Pe()){return/android/i.test(n)}function ad(n=Pe()){return/blackberry/i.test(n)}function ld(n=Pe()){return/webos/i.test(n)}function Uo(n=Pe()){return/iphone|ipad|ipod/i.test(n)||/macintosh/i.test(n)&&/mobile/i.test(n)}function _v(n=Pe()){var e;return Uo(n)&&!!(!((e=window.navigator)===null||e===void 0)&&e.standalone)}function bv(){return Rh()&&document.documentMode===10}function cd(n=Pe()){return Uo(n)||od(n)||ld(n)||ad(n)||/windows phone/i.test(n)||id(n)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ud(n,e=[]){let t;switch(n){case"Browser":t=Wl(Pe());break;case"Worker":t=`${Wl(Pe())}-${n}`;break;default:t=n}const r=e.length?e.join(","):"FirebaseCore-web";return`${t}/JsCore/${mn}/${r}`}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ev{constructor(e){this.auth=e,this.queue=[]}pushCallback(e,t){const r=o=>new Promise((a,c)=>{try{const u=e(o);a(u)}catch(u){c(u)}});r.onAbort=t,this.queue.push(r);const s=this.queue.length-1;return()=>{this.queue[s]=()=>Promise.resolve()}}async runMiddleware(e){if(this.auth.currentUser===e)return;const t=[];try{for(const r of this.queue)await r(e),r.onAbort&&t.push(r.onAbort)}catch(r){t.reverse();for(const s of t)try{s()}catch{}throw this.auth._errorFactory.create("login-blocked",{originalMessage:r==null?void 0:r.message})}}}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Iv(n,e={}){return En(n,"GET","/v2/passwordPolicy",Mo(n,e))}/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tv=6;class wv{constructor(e){var t,r,s,o;const a=e.customStrengthOptions;this.customStrengthOptions={},this.customStrengthOptions.minPasswordLength=(t=a.minPasswordLength)!==null&&t!==void 0?t:Tv,a.maxPasswordLength&&(this.customStrengthOptions.maxPasswordLength=a.maxPasswordLength),a.containsLowercaseCharacter!==void 0&&(this.customStrengthOptions.containsLowercaseLetter=a.containsLowercaseCharacter),a.containsUppercaseCharacter!==void 0&&(this.customStrengthOptions.containsUppercaseLetter=a.containsUppercaseCharacter),a.containsNumericCharacter!==void 0&&(this.customStrengthOptions.containsNumericCharacter=a.containsNumericCharacter),a.containsNonAlphanumericCharacter!==void 0&&(this.customStrengthOptions.containsNonAlphanumericCharacter=a.containsNonAlphanumericCharacter),this.enforcementState=e.enforcementState,this.enforcementState==="ENFORCEMENT_STATE_UNSPECIFIED"&&(this.enforcementState="OFF"),this.allowedNonAlphanumericCharacters=(s=(r=e.allowedNonAlphanumericCharacters)===null||r===void 0?void 0:r.join(""))!==null&&s!==void 0?s:"",this.forceUpgradeOnSignin=(o=e.forceUpgradeOnSignin)!==null&&o!==void 0?o:!1,this.schemaVersion=e.schemaVersion}validatePassword(e){var t,r,s,o,a,c;const u={isValid:!0,passwordPolicy:this};return this.validatePasswordLengthOptions(e,u),this.validatePasswordCharacterOptions(e,u),u.isValid&&(u.isValid=(t=u.meetsMinPasswordLength)!==null&&t!==void 0?t:!0),u.isValid&&(u.isValid=(r=u.meetsMaxPasswordLength)!==null&&r!==void 0?r:!0),u.isValid&&(u.isValid=(s=u.containsLowercaseLetter)!==null&&s!==void 0?s:!0),u.isValid&&(u.isValid=(o=u.containsUppercaseLetter)!==null&&o!==void 0?o:!0),u.isValid&&(u.isValid=(a=u.containsNumericCharacter)!==null&&a!==void 0?a:!0),u.isValid&&(u.isValid=(c=u.containsNonAlphanumericCharacter)!==null&&c!==void 0?c:!0),u}validatePasswordLengthOptions(e,t){const r=this.customStrengthOptions.minPasswordLength,s=this.customStrengthOptions.maxPasswordLength;r&&(t.meetsMinPasswordLength=e.length>=r),s&&(t.meetsMaxPasswordLength=e.length<=s)}validatePasswordCharacterOptions(e,t){this.updatePasswordCharacterOptionsStatuses(t,!1,!1,!1,!1);let r;for(let s=0;s<e.length;s++)r=e.charAt(s),this.updatePasswordCharacterOptionsStatuses(t,r>="a"&&r<="z",r>="A"&&r<="Z",r>="0"&&r<="9",this.allowedNonAlphanumericCharacters.includes(r))}updatePasswordCharacterOptionsStatuses(e,t,r,s,o){this.customStrengthOptions.containsLowercaseLetter&&(e.containsLowercaseLetter||(e.containsLowercaseLetter=t)),this.customStrengthOptions.containsUppercaseLetter&&(e.containsUppercaseLetter||(e.containsUppercaseLetter=r)),this.customStrengthOptions.containsNumericCharacter&&(e.containsNumericCharacter||(e.containsNumericCharacter=s)),this.customStrengthOptions.containsNonAlphanumericCharacter&&(e.containsNonAlphanumericCharacter||(e.containsNonAlphanumericCharacter=o))}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Av{constructor(e,t,r,s){this.app=e,this.heartbeatServiceProvider=t,this.appCheckServiceProvider=r,this.config=s,this.currentUser=null,this.emulatorConfig=null,this.operations=Promise.resolve(),this.authStateSubscription=new Kl(this),this.idTokenSubscription=new Kl(this),this.beforeStateQueue=new Ev(this),this.redirectUser=null,this.isProactiveRefreshEnabled=!1,this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION=1,this._canInitEmulator=!0,this._isInitialized=!1,this._deleted=!1,this._initializationPromise=null,this._popupRedirectResolver=null,this._errorFactory=Ku,this._agentRecaptchaConfig=null,this._tenantRecaptchaConfigs={},this._projectPasswordPolicy=null,this._tenantPasswordPolicies={},this.lastNotifiedUid=void 0,this.languageCode=null,this.tenantId=null,this.settings={appVerificationDisabledForTesting:!1},this.frameworks=[],this.name=e.name,this.clientVersion=s.sdkClientVersion}_initializeWithPersistence(e,t){return t&&(this._popupRedirectResolver=Xe(t)),this._initializationPromise=this.queue(async()=>{var r,s;if(!this._deleted&&(this.persistenceManager=await rn.create(this,e),!this._deleted)){if(!((r=this._popupRedirectResolver)===null||r===void 0)&&r._shouldInitProactively)try{await this._popupRedirectResolver._initialize(this)}catch{}await this.initializeCurrentUser(t),this.lastNotifiedUid=((s=this.currentUser)===null||s===void 0?void 0:s.uid)||null,!this._deleted&&(this._isInitialized=!0)}}),this._initializationPromise}async _onStorageEvent(){if(this._deleted)return;const e=await this.assertedPersistence.getCurrentUser();if(!(!this.currentUser&&!e)){if(this.currentUser&&e&&this.currentUser.uid===e.uid){this._currentUser._assign(e),await this.currentUser.getIdToken();return}await this._updateCurrentUser(e,!0)}}async initializeCurrentUserFromIdToken(e){try{const t=await Zu(this,{idToken:e}),r=await Ye._fromGetAccountInfoResponse(this,t,e);await this.directlySetCurrentUser(r)}catch(t){console.warn("FirebaseServerApp could not login user with provided authIdToken: ",t),await this.directlySetCurrentUser(null)}}async initializeCurrentUser(e){var t;if(vt(this.app)){const a=this.app.settings.authIdToken;return a?new Promise(c=>{setTimeout(()=>this.initializeCurrentUserFromIdToken(a).then(c,c))}):this.directlySetCurrentUser(null)}const r=await this.assertedPersistence.getCurrentUser();let s=r,o=!1;if(e&&this.config.authDomain){await this.getOrInitRedirectPersistenceManager();const a=(t=this.redirectUser)===null||t===void 0?void 0:t._redirectEventId,c=s==null?void 0:s._redirectEventId,u=await this.tryRedirectSignIn(e);(!a||a===c)&&(u!=null&&u.user)&&(s=u.user,o=!0)}if(!s)return this.directlySetCurrentUser(null);if(!s._redirectEventId){if(o)try{await this.beforeStateQueue.runMiddleware(s)}catch(a){s=r,this._popupRedirectResolver._overrideRedirectResult(this,()=>Promise.reject(a))}return s?this.reloadAndSetCurrentUserOrClear(s):this.directlySetCurrentUser(null)}return q(this._popupRedirectResolver,this,"argument-error"),await this.getOrInitRedirectPersistenceManager(),this.redirectUser&&this.redirectUser._redirectEventId===s._redirectEventId?this.directlySetCurrentUser(s):this.reloadAndSetCurrentUserOrClear(s)}async tryRedirectSignIn(e){let t=null;try{t=await this._popupRedirectResolver._completeRedirectFn(this,e,!0)}catch{await this._setRedirectUser(null)}return t}async reloadAndSetCurrentUserOrClear(e){try{await ys(e)}catch(t){if((t==null?void 0:t.code)!=="auth/network-request-failed")return this.directlySetCurrentUser(null)}return this.directlySetCurrentUser(e)}useDeviceLanguage(){this.languageCode=ov()}async _delete(){this._deleted=!0}async updateCurrentUser(e){if(vt(this.app))return Promise.reject(Mt(this));const t=e?Le(e):null;return t&&q(t.auth.config.apiKey===this.config.apiKey,this,"invalid-user-token"),this._updateCurrentUser(t&&t._clone(this))}async _updateCurrentUser(e,t=!1){if(!this._deleted)return e&&q(this.tenantId===e.tenantId,this,"tenant-id-mismatch"),t||await this.beforeStateQueue.runMiddleware(e),this.queue(async()=>{await this.directlySetCurrentUser(e),this.notifyAuthListeners()})}async signOut(){return vt(this.app)?Promise.reject(Mt(this)):(await this.beforeStateQueue.runMiddleware(null),(this.redirectPersistenceManager||this._popupRedirectResolver)&&await this._setRedirectUser(null),this._updateCurrentUser(null,!0))}setPersistence(e){return vt(this.app)?Promise.reject(Mt(this)):this.queue(async()=>{await this.assertedPersistence.setPersistence(Xe(e))})}_getRecaptchaConfig(){return this.tenantId==null?this._agentRecaptchaConfig:this._tenantRecaptchaConfigs[this.tenantId]}async validatePassword(e){this._getPasswordPolicyInternal()||await this._updatePasswordPolicy();const t=this._getPasswordPolicyInternal();return t.schemaVersion!==this.EXPECTED_PASSWORD_POLICY_SCHEMA_VERSION?Promise.reject(this._errorFactory.create("unsupported-password-policy-schema-version",{})):t.validatePassword(e)}_getPasswordPolicyInternal(){return this.tenantId===null?this._projectPasswordPolicy:this._tenantPasswordPolicies[this.tenantId]}async _updatePasswordPolicy(){const e=await Iv(this),t=new wv(e);this.tenantId===null?this._projectPasswordPolicy=t:this._tenantPasswordPolicies[this.tenantId]=t}_getPersistence(){return this.assertedPersistence.persistence.type}_updateErrorMap(e){this._errorFactory=new ar("auth","Firebase",e())}onAuthStateChanged(e,t,r){return this.registerStateListener(this.authStateSubscription,e,t,r)}beforeAuthStateChanged(e,t){return this.beforeStateQueue.pushCallback(e,t)}onIdTokenChanged(e,t,r){return this.registerStateListener(this.idTokenSubscription,e,t,r)}authStateReady(){return new Promise((e,t)=>{if(this.currentUser)e();else{const r=this.onAuthStateChanged(()=>{r(),e()},t)}})}async revokeAccessToken(e){if(this.currentUser){const t=await this.currentUser.getIdToken(),r={providerId:"apple.com",tokenType:"ACCESS_TOKEN",token:e,idToken:t};this.tenantId!=null&&(r.tenantId=this.tenantId),await yv(this,r)}}toJSON(){var e;return{apiKey:this.config.apiKey,authDomain:this.config.authDomain,appName:this.name,currentUser:(e=this._currentUser)===null||e===void 0?void 0:e.toJSON()}}async _setRedirectUser(e,t){const r=await this.getOrInitRedirectPersistenceManager(t);return e===null?r.removeCurrentUser():r.setCurrentUser(e)}async getOrInitRedirectPersistenceManager(e){if(!this.redirectPersistenceManager){const t=e&&Xe(e)||this._popupRedirectResolver;q(t,this,"argument-error"),this.redirectPersistenceManager=await rn.create(this,[Xe(t._redirectPersistence)],"redirectUser"),this.redirectUser=await this.redirectPersistenceManager.getCurrentUser()}return this.redirectPersistenceManager}async _redirectUserForId(e){var t,r;return this._isInitialized&&await this.queue(async()=>{}),((t=this._currentUser)===null||t===void 0?void 0:t._redirectEventId)===e?this._currentUser:((r=this.redirectUser)===null||r===void 0?void 0:r._redirectEventId)===e?this.redirectUser:null}async _persistUserIfCurrent(e){if(e===this.currentUser)return this.queue(async()=>this.directlySetCurrentUser(e))}_notifyListenersIfCurrent(e){e===this.currentUser&&this.notifyAuthListeners()}_key(){return`${this.config.authDomain}:${this.config.apiKey}:${this.name}`}_startProactiveRefresh(){this.isProactiveRefreshEnabled=!0,this.currentUser&&this._currentUser._startProactiveRefresh()}_stopProactiveRefresh(){this.isProactiveRefreshEnabled=!1,this.currentUser&&this._currentUser._stopProactiveRefresh()}get _currentUser(){return this.currentUser}notifyAuthListeners(){var e,t;if(!this._isInitialized)return;this.idTokenSubscription.next(this.currentUser);const r=(t=(e=this.currentUser)===null||e===void 0?void 0:e.uid)!==null&&t!==void 0?t:null;this.lastNotifiedUid!==r&&(this.lastNotifiedUid=r,this.authStateSubscription.next(this.currentUser))}registerStateListener(e,t,r,s){if(this._deleted)return()=>{};const o=typeof t=="function"?t:t.next.bind(t);let a=!1;const c=this._isInitialized?Promise.resolve():this._initializationPromise;if(q(c,this,"internal-error"),c.then(()=>{a||o(this.currentUser)}),typeof t=="function"){const u=e.addObserver(t,r,s);return()=>{a=!0,u()}}else{const u=e.addObserver(t);return()=>{a=!0,u()}}}async directlySetCurrentUser(e){this.currentUser&&this.currentUser!==e&&this._currentUser._stopProactiveRefresh(),e&&this.isProactiveRefreshEnabled&&e._startProactiveRefresh(),this.currentUser=e,e?await this.assertedPersistence.setCurrentUser(e):await this.assertedPersistence.removeCurrentUser()}queue(e){return this.operations=this.operations.then(e,e),this.operations}get assertedPersistence(){return q(this.persistenceManager,this,"internal-error"),this.persistenceManager}_logFramework(e){!e||this.frameworks.includes(e)||(this.frameworks.push(e),this.frameworks.sort(),this.clientVersion=ud(this.config.clientPlatform,this._getFrameworks()))}_getFrameworks(){return this.frameworks}async _getAdditionalHeaders(){var e;const t={"X-Client-Version":this.clientVersion};this.app.options.appId&&(t["X-Firebase-gmpid"]=this.app.options.appId);const r=await((e=this.heartbeatServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getHeartbeatsHeader());r&&(t["X-Firebase-Client"]=r);const s=await this._getAppCheckToken();return s&&(t["X-Firebase-AppCheck"]=s),t}async _getAppCheckToken(){var e;const t=await((e=this.appCheckServiceProvider.getImmediate({optional:!0}))===null||e===void 0?void 0:e.getToken());return t!=null&&t.error&&rv(`Error while retrieving App Check token: ${t.error}`),t==null?void 0:t.token}}function Fo(n){return Le(n)}class Kl{constructor(e){this.auth=e,this.observer=null,this.addObserver=Oh(t=>this.observer=t)}get next(){return q(this.observer,this.auth,"internal-error"),this.observer.next.bind(this.observer)}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $o={async loadJS(){throw new Error("Unable to load external scripts")},recaptchaV2Script:"",recaptchaEnterpriseScript:"",gapiScript:""};function Sv(n){$o=n}function Rv(n){return $o.loadJS(n)}function Pv(){return $o.gapiScript}function Cv(n){return`__${n}${Math.floor(Math.random()*1e6)}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function xv(n,e){const t=Xi(n,"auth");if(t.isInitialized()){const s=t.getImmediate(),o=t.getOptions();if(as(o,e??{}))return s;st(s,"already-initialized")}return t.initialize({options:e})}function Dv(n,e){const t=(e==null?void 0:e.persistence)||[],r=(Array.isArray(t)?t:[t]).map(Xe);e!=null&&e.errorMap&&n._updateErrorMap(e.errorMap),n._initializeWithPersistence(r,e==null?void 0:e.popupRedirectResolver)}function kv(n,e,t){const r=Fo(n);q(r._canInitEmulator,r,"emulator-config-failed"),q(/^https?:\/\//.test(e),r,"invalid-emulator-scheme");const s=!1,o=dd(e),{host:a,port:c}=Vv(e),u=c===null?"":`:${c}`;r.config.emulator={url:`${o}//${a}${u}/`},r.settings.appVerificationDisabledForTesting=!0,r.emulatorConfig=Object.freeze({host:a,port:c,protocol:o.replace(":",""),options:Object.freeze({disableWarnings:s})}),Nv()}function dd(n){const e=n.indexOf(":");return e<0?"":n.substr(0,e+1)}function Vv(n){const e=dd(n),t=/(\/\/)?([^?#/]+)/.exec(n.substr(e.length));if(!t)return{host:"",port:null};const r=t[2].split("@").pop()||"",s=/^(\[[^\]]+\])(:|$)/.exec(r);if(s){const o=s[1];return{host:o,port:Ql(r.substr(o.length+1))}}else{const[o,a]=r.split(":");return{host:o,port:Ql(a)}}}function Ql(n){if(!n)return null;const e=Number(n);return isNaN(e)?null:e}function Nv(){function n(){const e=document.createElement("p"),t=e.style;e.innerText="Running in emulator mode. Do not use with production credentials.",t.position="fixed",t.width="100%",t.backgroundColor="#ffffff",t.border=".1em solid #000000",t.color="#b50000",t.bottom="0px",t.left="0px",t.margin="0px",t.zIndex="10000",t.textAlign="center",e.classList.add("firebase-emulator-warning"),document.body.appendChild(e)}typeof console<"u"&&typeof console.info=="function"&&console.info("WARNING: You are using the Auth Emulator, which is intended for local testing only.  Do not use with production credentials."),typeof window<"u"&&typeof document<"u"&&(document.readyState==="loading"?window.addEventListener("DOMContentLoaded",n):n())}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hd{constructor(e,t){this.providerId=e,this.signInMethod=t}toJSON(){return Je("not implemented")}_getIdTokenResponse(e){return Je("not implemented")}_linkToIdToken(e,t){return Je("not implemented")}_getReauthenticationResolver(e){return Je("not implemented")}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function sn(n,e){return cv(n,"POST","/v1/accounts:signInWithIdp",Mo(n,e))}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ov="http://localhost";class Bt extends hd{constructor(){super(...arguments),this.pendingToken=null}static _fromParams(e){const t=new Bt(e.providerId,e.signInMethod);return e.idToken||e.accessToken?(e.idToken&&(t.idToken=e.idToken),e.accessToken&&(t.accessToken=e.accessToken),e.nonce&&!e.pendingToken&&(t.nonce=e.nonce),e.pendingToken&&(t.pendingToken=e.pendingToken)):e.oauthToken&&e.oauthTokenSecret?(t.accessToken=e.oauthToken,t.secret=e.oauthTokenSecret):st("argument-error"),t}toJSON(){return{idToken:this.idToken,accessToken:this.accessToken,secret:this.secret,nonce:this.nonce,pendingToken:this.pendingToken,providerId:this.providerId,signInMethod:this.signInMethod}}static fromJSON(e){const t=typeof e=="string"?JSON.parse(e):e,{providerId:r,signInMethod:s}=t,o=No(t,["providerId","signInMethod"]);if(!r||!s)return null;const a=new Bt(r,s);return a.idToken=o.idToken||void 0,a.accessToken=o.accessToken||void 0,a.secret=o.secret,a.nonce=o.nonce,a.pendingToken=o.pendingToken||null,a}_getIdTokenResponse(e){const t=this.buildRequest();return sn(e,t)}_linkToIdToken(e,t){const r=this.buildRequest();return r.idToken=t,sn(e,r)}_getReauthenticationResolver(e){const t=this.buildRequest();return t.autoCreate=!1,sn(e,t)}buildRequest(){const e={requestUri:Ov,returnSecureToken:!0};if(this.pendingToken)e.pendingToken=this.pendingToken;else{const t={};this.idToken&&(t.id_token=this.idToken),this.accessToken&&(t.access_token=this.accessToken),this.secret&&(t.oauth_token_secret=this.secret),t.providerId=this.providerId,this.nonce&&!this.pendingToken&&(t.nonce=this.nonce),e.postBody=lr(t)}return e}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{constructor(e){this.providerId=e,this.defaultLanguageCode=null,this.customParameters={}}setDefaultLanguage(e){this.defaultLanguageCode=e}setCustomParameters(e){return this.customParameters=e,this}getCustomParameters(){return this.customParameters}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class yr extends pd{constructor(){super(...arguments),this.scopes=[]}addScope(e){return this.scopes.includes(e)||this.scopes.push(e),this}getScopes(){return[...this.scopes]}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ht extends yr{constructor(){super("facebook.com")}static credential(e){return Bt._fromParams({providerId:ht.PROVIDER_ID,signInMethod:ht.FACEBOOK_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ht.credentialFromTaggedObject(e)}static credentialFromError(e){return ht.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ht.credential(e.oauthAccessToken)}catch{return null}}}ht.FACEBOOK_SIGN_IN_METHOD="facebook.com";ht.PROVIDER_ID="facebook.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pt extends yr{constructor(){super("google.com"),this.addScope("profile")}static credential(e,t){return Bt._fromParams({providerId:pt.PROVIDER_ID,signInMethod:pt.GOOGLE_SIGN_IN_METHOD,idToken:e,accessToken:t})}static credentialFromResult(e){return pt.credentialFromTaggedObject(e)}static credentialFromError(e){return pt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthIdToken:t,oauthAccessToken:r}=e;if(!t&&!r)return null;try{return pt.credential(t,r)}catch{return null}}}pt.GOOGLE_SIGN_IN_METHOD="google.com";pt.PROVIDER_ID="google.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ft extends yr{constructor(){super("github.com")}static credential(e){return Bt._fromParams({providerId:ft.PROVIDER_ID,signInMethod:ft.GITHUB_SIGN_IN_METHOD,accessToken:e})}static credentialFromResult(e){return ft.credentialFromTaggedObject(e)}static credentialFromError(e){return ft.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e||!("oauthAccessToken"in e)||!e.oauthAccessToken)return null;try{return ft.credential(e.oauthAccessToken)}catch{return null}}}ft.GITHUB_SIGN_IN_METHOD="github.com";ft.PROVIDER_ID="github.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class mt extends yr{constructor(){super("twitter.com")}static credential(e,t){return Bt._fromParams({providerId:mt.PROVIDER_ID,signInMethod:mt.TWITTER_SIGN_IN_METHOD,oauthToken:e,oauthTokenSecret:t})}static credentialFromResult(e){return mt.credentialFromTaggedObject(e)}static credentialFromError(e){return mt.credentialFromTaggedObject(e.customData||{})}static credentialFromTaggedObject({_tokenResponse:e}){if(!e)return null;const{oauthAccessToken:t,oauthTokenSecret:r}=e;if(!t||!r)return null;try{return mt.credential(t,r)}catch{return null}}}mt.TWITTER_SIGN_IN_METHOD="twitter.com";mt.PROVIDER_ID="twitter.com";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fn{constructor(e){this.user=e.user,this.providerId=e.providerId,this._tokenResponse=e._tokenResponse,this.operationType=e.operationType}static async _fromIdTokenResponse(e,t,r,s=!1){const o=await Ye._fromIdTokenResponse(e,r,s),a=Jl(r);return new fn({user:o,providerId:a,_tokenResponse:r,operationType:t})}static async _forOperation(e,t,r){await e._updateTokensIfNecessary(r,!0);const s=Jl(r);return new fn({user:e,providerId:s,_tokenResponse:r,operationType:t})}}function Jl(n){return n.providerId?n.providerId:"phoneNumber"in n?"phone":null}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _s extends ot{constructor(e,t,r,s){var o;super(t.code,t.message),this.operationType=r,this.user=s,Object.setPrototypeOf(this,_s.prototype),this.customData={appName:e.name,tenantId:(o=e.tenantId)!==null&&o!==void 0?o:void 0,_serverResponse:t.customData._serverResponse,operationType:r}}static _fromErrorAndOperation(e,t,r,s){return new _s(e,t,r,s)}}function fd(n,e,t,r){return(e==="reauthenticate"?t._getReauthenticationResolver(n):t._getIdTokenResponse(n)).catch(o=>{throw o.code==="auth/multi-factor-auth-required"?_s._fromErrorAndOperation(n,o,e,r):o})}async function Lv(n,e,t=!1){const r=await ir(n,e._linkToIdToken(n.auth,await n.getIdToken()),t);return fn._forOperation(n,"link",r)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function Mv(n,e,t=!1){const{auth:r}=n;if(vt(r.app))return Promise.reject(Mt(r));const s="reauthenticate";try{const o=await ir(n,fd(r,s,e,n),t);q(o.idToken,r,"internal-error");const a=jo(o.idToken);q(a,r,"internal-error");const{sub:c}=a;return q(n.uid===c,r,"user-mismatch"),fn._forOperation(n,s,o)}catch(o){throw(o==null?void 0:o.code)==="auth/user-not-found"&&st(r,"user-mismatch"),o}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function jv(n,e,t=!1){if(vt(n.app))return Promise.reject(Mt(n));const r="signIn",s=await fd(n,r,e),o=await fn._fromIdTokenResponse(n,r,s);return t||await n._updateCurrentUser(o.user),o}function Uv(n,e,t,r){return Le(n).onIdTokenChanged(e,t,r)}function Fv(n,e,t){return Le(n).beforeAuthStateChanged(e,t)}const bs="__sak";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class md{constructor(e,t){this.storageRetriever=e,this.type=t}_isAvailable(){try{return this.storage?(this.storage.setItem(bs,"1"),this.storage.removeItem(bs),Promise.resolve(!0)):Promise.resolve(!1)}catch{return Promise.resolve(!1)}}_set(e,t){return this.storage.setItem(e,JSON.stringify(t)),Promise.resolve()}_get(e){const t=this.storage.getItem(e);return Promise.resolve(t?JSON.parse(t):null)}_remove(e){return this.storage.removeItem(e),Promise.resolve()}get storage(){return this.storageRetriever()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const $v=1e3,qv=10;class gd extends md{constructor(){super(()=>window.localStorage,"LOCAL"),this.boundEventHandler=(e,t)=>this.onStorageEvent(e,t),this.listeners={},this.localCache={},this.pollTimer=null,this.fallbackToPolling=cd(),this._shouldAllowMigration=!0}forAllChangedKeys(e){for(const t of Object.keys(this.listeners)){const r=this.storage.getItem(t),s=this.localCache[t];r!==s&&e(t,s,r)}}onStorageEvent(e,t=!1){if(!e.key){this.forAllChangedKeys((a,c,u)=>{this.notifyListeners(a,u)});return}const r=e.key;t?this.detachListener():this.stopPolling();const s=()=>{const a=this.storage.getItem(r);!t&&this.localCache[r]===a||this.notifyListeners(r,a)},o=this.storage.getItem(r);bv()&&o!==e.newValue&&e.newValue!==e.oldValue?setTimeout(s,qv):s()}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t&&JSON.parse(t))}startPolling(){this.stopPolling(),this.pollTimer=setInterval(()=>{this.forAllChangedKeys((e,t,r)=>{this.onStorageEvent(new StorageEvent("storage",{key:e,oldValue:t,newValue:r}),!0)})},$v)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}attachListener(){window.addEventListener("storage",this.boundEventHandler)}detachListener(){window.removeEventListener("storage",this.boundEventHandler)}_addListener(e,t){Object.keys(this.listeners).length===0&&(this.fallbackToPolling?this.startPolling():this.attachListener()),this.listeners[e]||(this.listeners[e]=new Set,this.localCache[e]=this.storage.getItem(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&(this.detachListener(),this.stopPolling())}async _set(e,t){await super._set(e,t),this.localCache[e]=JSON.stringify(t)}async _get(e){const t=await super._get(e);return this.localCache[e]=JSON.stringify(t),t}async _remove(e){await super._remove(e),delete this.localCache[e]}}gd.type="LOCAL";const Bv=gd;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class vd extends md{constructor(){super(()=>window.sessionStorage,"SESSION")}_addListener(e,t){}_removeListener(e,t){}}vd.type="SESSION";const yd=vd;/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function zv(n){return Promise.all(n.map(async e=>{try{return{fulfilled:!0,value:await e}}catch(t){return{fulfilled:!1,reason:t}}}))}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class js{constructor(e){this.eventTarget=e,this.handlersMap={},this.boundEventHandler=this.handleEvent.bind(this)}static _getInstance(e){const t=this.receivers.find(s=>s.isListeningto(e));if(t)return t;const r=new js(e);return this.receivers.push(r),r}isListeningto(e){return this.eventTarget===e}async handleEvent(e){const t=e,{eventId:r,eventType:s,data:o}=t.data,a=this.handlersMap[s];if(!(a!=null&&a.size))return;t.ports[0].postMessage({status:"ack",eventId:r,eventType:s});const c=Array.from(a).map(async h=>h(t.origin,o)),u=await zv(c);t.ports[0].postMessage({status:"done",eventId:r,eventType:s,response:u})}_subscribe(e,t){Object.keys(this.handlersMap).length===0&&this.eventTarget.addEventListener("message",this.boundEventHandler),this.handlersMap[e]||(this.handlersMap[e]=new Set),this.handlersMap[e].add(t)}_unsubscribe(e,t){this.handlersMap[e]&&t&&this.handlersMap[e].delete(t),(!t||this.handlersMap[e].size===0)&&delete this.handlersMap[e],Object.keys(this.handlersMap).length===0&&this.eventTarget.removeEventListener("message",this.boundEventHandler)}}js.receivers=[];/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function qo(n="",e=10){let t="";for(let r=0;r<e;r++)t+=Math.floor(Math.random()*10);return n+t}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hv{constructor(e){this.target=e,this.handlers=new Set}removeMessageHandler(e){e.messageChannel&&(e.messageChannel.port1.removeEventListener("message",e.onMessage),e.messageChannel.port1.close()),this.handlers.delete(e)}async _send(e,t,r=50){const s=typeof MessageChannel<"u"?new MessageChannel:null;if(!s)throw new Error("connection_unavailable");let o,a;return new Promise((c,u)=>{const h=qo("",20);s.port1.start();const f=setTimeout(()=>{u(new Error("unsupported_event"))},r);a={messageChannel:s,onMessage(v){const E=v;if(E.data.eventId===h)switch(E.data.status){case"ack":clearTimeout(f),o=setTimeout(()=>{u(new Error("timeout"))},3e3);break;case"done":clearTimeout(o),c(E.data.response);break;default:clearTimeout(f),clearTimeout(o),u(new Error("invalid_response"));break}}},this.handlers.add(a),s.port1.addEventListener("message",a.onMessage),this.target.postMessage({eventType:e,eventId:h,data:t},[s.port2])}).finally(()=>{a&&this.removeMessageHandler(a)})}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function He(){return window}function Gv(n){He().location.href=n}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function _d(){return typeof He().WorkerGlobalScope<"u"&&typeof He().importScripts=="function"}async function Wv(){if(!(navigator!=null&&navigator.serviceWorker))return null;try{return(await navigator.serviceWorker.ready).active}catch{return null}}function Kv(){var n;return((n=navigator==null?void 0:navigator.serviceWorker)===null||n===void 0?void 0:n.controller)||null}function Qv(){return _d()?self:null}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bd="firebaseLocalStorageDb",Jv=1,Es="firebaseLocalStorage",Ed="fbase_key";class _r{constructor(e){this.request=e}toPromise(){return new Promise((e,t)=>{this.request.addEventListener("success",()=>{e(this.request.result)}),this.request.addEventListener("error",()=>{t(this.request.error)})})}}function Us(n,e){return n.transaction([Es],e?"readwrite":"readonly").objectStore(Es)}function Yv(){const n=indexedDB.deleteDatabase(bd);return new _r(n).toPromise()}function Wi(){const n=indexedDB.open(bd,Jv);return new Promise((e,t)=>{n.addEventListener("error",()=>{t(n.error)}),n.addEventListener("upgradeneeded",()=>{const r=n.result;try{r.createObjectStore(Es,{keyPath:Ed})}catch(s){t(s)}}),n.addEventListener("success",async()=>{const r=n.result;r.objectStoreNames.contains(Es)?e(r):(r.close(),await Yv(),e(await Wi()))})})}async function Yl(n,e,t){const r=Us(n,!0).put({[Ed]:e,value:t});return new _r(r).toPromise()}async function Xv(n,e){const t=Us(n,!1).get(e),r=await new _r(t).toPromise();return r===void 0?null:r.value}function Xl(n,e){const t=Us(n,!0).delete(e);return new _r(t).toPromise()}const Zv=800,ey=3;class Id{constructor(){this.type="LOCAL",this._shouldAllowMigration=!0,this.listeners={},this.localCache={},this.pollTimer=null,this.pendingWrites=0,this.receiver=null,this.sender=null,this.serviceWorkerReceiverAvailable=!1,this.activeServiceWorker=null,this._workerInitializationPromise=this.initializeServiceWorkerMessaging().then(()=>{},()=>{})}async _openDb(){return this.db?this.db:(this.db=await Wi(),this.db)}async _withRetries(e){let t=0;for(;;)try{const r=await this._openDb();return await e(r)}catch(r){if(t++>ey)throw r;this.db&&(this.db.close(),this.db=void 0)}}async initializeServiceWorkerMessaging(){return _d()?this.initializeReceiver():this.initializeSender()}async initializeReceiver(){this.receiver=js._getInstance(Qv()),this.receiver._subscribe("keyChanged",async(e,t)=>({keyProcessed:(await this._poll()).includes(t.key)})),this.receiver._subscribe("ping",async(e,t)=>["keyChanged"])}async initializeSender(){var e,t;if(this.activeServiceWorker=await Wv(),!this.activeServiceWorker)return;this.sender=new Hv(this.activeServiceWorker);const r=await this.sender._send("ping",{},800);r&&!((e=r[0])===null||e===void 0)&&e.fulfilled&&!((t=r[0])===null||t===void 0)&&t.value.includes("keyChanged")&&(this.serviceWorkerReceiverAvailable=!0)}async notifyServiceWorker(e){if(!(!this.sender||!this.activeServiceWorker||Kv()!==this.activeServiceWorker))try{await this.sender._send("keyChanged",{key:e},this.serviceWorkerReceiverAvailable?800:50)}catch{}}async _isAvailable(){try{if(!indexedDB)return!1;const e=await Wi();return await Yl(e,bs,"1"),await Xl(e,bs),!0}catch{}return!1}async _withPendingWrite(e){this.pendingWrites++;try{await e()}finally{this.pendingWrites--}}async _set(e,t){return this._withPendingWrite(async()=>(await this._withRetries(r=>Yl(r,e,t)),this.localCache[e]=t,this.notifyServiceWorker(e)))}async _get(e){const t=await this._withRetries(r=>Xv(r,e));return this.localCache[e]=t,t}async _remove(e){return this._withPendingWrite(async()=>(await this._withRetries(t=>Xl(t,e)),delete this.localCache[e],this.notifyServiceWorker(e)))}async _poll(){const e=await this._withRetries(s=>{const o=Us(s,!1).getAll();return new _r(o).toPromise()});if(!e)return[];if(this.pendingWrites!==0)return[];const t=[],r=new Set;if(e.length!==0)for(const{fbase_key:s,value:o}of e)r.add(s),JSON.stringify(this.localCache[s])!==JSON.stringify(o)&&(this.notifyListeners(s,o),t.push(s));for(const s of Object.keys(this.localCache))this.localCache[s]&&!r.has(s)&&(this.notifyListeners(s,null),t.push(s));return t}notifyListeners(e,t){this.localCache[e]=t;const r=this.listeners[e];if(r)for(const s of Array.from(r))s(t)}startPolling(){this.stopPolling(),this.pollTimer=setInterval(async()=>this._poll(),Zv)}stopPolling(){this.pollTimer&&(clearInterval(this.pollTimer),this.pollTimer=null)}_addListener(e,t){Object.keys(this.listeners).length===0&&this.startPolling(),this.listeners[e]||(this.listeners[e]=new Set,this._get(e)),this.listeners[e].add(t)}_removeListener(e,t){this.listeners[e]&&(this.listeners[e].delete(t),this.listeners[e].size===0&&delete this.listeners[e]),Object.keys(this.listeners).length===0&&this.stopPolling()}}Id.type="LOCAL";const ty=Id;new vr(3e4,6e4);/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ny(n,e){return e?Xe(e):(q(n._popupRedirectResolver,n,"argument-error"),n._popupRedirectResolver)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Bo extends hd{constructor(e){super("custom","custom"),this.params=e}_getIdTokenResponse(e){return sn(e,this._buildIdpRequest())}_linkToIdToken(e,t){return sn(e,this._buildIdpRequest(t))}_getReauthenticationResolver(e){return sn(e,this._buildIdpRequest())}_buildIdpRequest(e){const t={requestUri:this.params.requestUri,sessionId:this.params.sessionId,postBody:this.params.postBody,tenantId:this.params.tenantId,pendingToken:this.params.pendingToken,returnSecureToken:!0,returnIdpCredential:!0};return e&&(t.idToken=e),t}}function ry(n){return jv(n.auth,new Bo(n),n.bypassAuthState)}function sy(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Mv(t,new Bo(n),n.bypassAuthState)}async function iy(n){const{auth:e,user:t}=n;return q(t,e,"internal-error"),Lv(t,new Bo(n),n.bypassAuthState)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Td{constructor(e,t,r,s,o=!1){this.auth=e,this.resolver=r,this.user=s,this.bypassAuthState=o,this.pendingPromise=null,this.eventManager=null,this.filter=Array.isArray(t)?t:[t]}execute(){return new Promise(async(e,t)=>{this.pendingPromise={resolve:e,reject:t};try{this.eventManager=await this.resolver._initialize(this.auth),await this.onExecution(),this.eventManager.registerConsumer(this)}catch(r){this.reject(r)}})}async onAuthEvent(e){const{urlResponse:t,sessionId:r,postBody:s,tenantId:o,error:a,type:c}=e;if(a){this.reject(a);return}const u={auth:this.auth,requestUri:t,sessionId:r,tenantId:o||void 0,postBody:s||void 0,user:this.user,bypassAuthState:this.bypassAuthState};try{this.resolve(await this.getIdpTask(c)(u))}catch(h){this.reject(h)}}onError(e){this.reject(e)}getIdpTask(e){switch(e){case"signInViaPopup":case"signInViaRedirect":return ry;case"linkViaPopup":case"linkViaRedirect":return iy;case"reauthViaPopup":case"reauthViaRedirect":return sy;default:st(this.auth,"internal-error")}}resolve(e){it(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.resolve(e),this.unregisterAndCleanUp()}reject(e){it(this.pendingPromise,"Pending promise was never set"),this.pendingPromise.reject(e),this.unregisterAndCleanUp()}unregisterAndCleanUp(){this.eventManager&&this.eventManager.unregisterConsumer(this),this.pendingPromise=null,this.cleanUp()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const oy=new vr(2e3,1e4);class en extends Td{constructor(e,t,r,s,o){super(e,t,s,o),this.provider=r,this.authWindow=null,this.pollId=null,en.currentPopupAction&&en.currentPopupAction.cancel(),en.currentPopupAction=this}async executeNotNull(){const e=await this.execute();return q(e,this.auth,"internal-error"),e}async onExecution(){it(this.filter.length===1,"Popup operations only handle one event");const e=qo();this.authWindow=await this.resolver._openPopup(this.auth,this.provider,this.filter[0],e),this.authWindow.associatedEvent=e,this.resolver._originValidation(this.auth).catch(t=>{this.reject(t)}),this.resolver._isIframeWebStorageSupported(this.auth,t=>{t||this.reject(ze(this.auth,"web-storage-unsupported"))}),this.pollUserCancellation()}get eventId(){var e;return((e=this.authWindow)===null||e===void 0?void 0:e.associatedEvent)||null}cancel(){this.reject(ze(this.auth,"cancelled-popup-request"))}cleanUp(){this.authWindow&&this.authWindow.close(),this.pollId&&window.clearTimeout(this.pollId),this.authWindow=null,this.pollId=null,en.currentPopupAction=null}pollUserCancellation(){const e=()=>{var t,r;if(!((r=(t=this.authWindow)===null||t===void 0?void 0:t.window)===null||r===void 0)&&r.closed){this.pollId=window.setTimeout(()=>{this.pollId=null,this.reject(ze(this.auth,"popup-closed-by-user"))},8e3);return}this.pollId=window.setTimeout(e,oy.get())};e()}}en.currentPopupAction=null;/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ay="pendingRedirect",ts=new Map;class ly extends Td{constructor(e,t,r=!1){super(e,["signInViaRedirect","linkViaRedirect","reauthViaRedirect","unknown"],t,void 0,r),this.eventId=null}async execute(){let e=ts.get(this.auth._key());if(!e){try{const r=await cy(this.resolver,this.auth)?await super.execute():null;e=()=>Promise.resolve(r)}catch(t){e=()=>Promise.reject(t)}ts.set(this.auth._key(),e)}return this.bypassAuthState||ts.set(this.auth._key(),()=>Promise.resolve(null)),e()}async onAuthEvent(e){if(e.type==="signInViaRedirect")return super.onAuthEvent(e);if(e.type==="unknown"){this.resolve(null);return}if(e.eventId){const t=await this.auth._redirectUserForId(e.eventId);if(t)return this.user=t,super.onAuthEvent(e);this.resolve(null)}}async onExecution(){}cleanUp(){}}async function cy(n,e){const t=hy(e),r=dy(n);if(!await r._isAvailable())return!1;const s=await r._get(t)==="true";return await r._remove(t),s}function uy(n,e){ts.set(n._key(),e)}function dy(n){return Xe(n._redirectPersistence)}function hy(n){return es(ay,n.config.apiKey,n.name)}async function py(n,e,t=!1){if(vt(n.app))return Promise.reject(Mt(n));const r=Fo(n),s=ny(r,e),a=await new ly(r,s,t).execute();return a&&!t&&(delete a.user._redirectEventId,await r._persistUserIfCurrent(a.user),await r._setRedirectUser(null,e)),a}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fy=10*60*1e3;class my{constructor(e){this.auth=e,this.cachedEventUids=new Set,this.consumers=new Set,this.queuedRedirectEvent=null,this.hasHandledPotentialRedirect=!1,this.lastProcessedEventTime=Date.now()}registerConsumer(e){this.consumers.add(e),this.queuedRedirectEvent&&this.isEventForConsumer(this.queuedRedirectEvent,e)&&(this.sendToConsumer(this.queuedRedirectEvent,e),this.saveEventToCache(this.queuedRedirectEvent),this.queuedRedirectEvent=null)}unregisterConsumer(e){this.consumers.delete(e)}onEvent(e){if(this.hasEventBeenHandled(e))return!1;let t=!1;return this.consumers.forEach(r=>{this.isEventForConsumer(e,r)&&(t=!0,this.sendToConsumer(e,r),this.saveEventToCache(e))}),this.hasHandledPotentialRedirect||!gy(e)||(this.hasHandledPotentialRedirect=!0,t||(this.queuedRedirectEvent=e,t=!0)),t}sendToConsumer(e,t){var r;if(e.error&&!wd(e)){const s=((r=e.error.code)===null||r===void 0?void 0:r.split("auth/")[1])||"internal-error";t.onError(ze(this.auth,s))}else t.onAuthEvent(e)}isEventForConsumer(e,t){const r=t.eventId===null||!!e.eventId&&e.eventId===t.eventId;return t.filter.includes(e.type)&&r}hasEventBeenHandled(e){return Date.now()-this.lastProcessedEventTime>=fy&&this.cachedEventUids.clear(),this.cachedEventUids.has(Zl(e))}saveEventToCache(e){this.cachedEventUids.add(Zl(e)),this.lastProcessedEventTime=Date.now()}}function Zl(n){return[n.type,n.eventId,n.sessionId,n.tenantId].filter(e=>e).join("-")}function wd({type:n,error:e}){return n==="unknown"&&(e==null?void 0:e.code)==="auth/no-auth-event"}function gy(n){switch(n.type){case"signInViaRedirect":case"linkViaRedirect":case"reauthViaRedirect":return!0;case"unknown":return wd(n);default:return!1}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */async function vy(n,e={}){return En(n,"GET","/v1/projects",e)}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yy=/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/,_y=/^https?/;async function by(n){if(n.config.emulator)return;const{authorizedDomains:e}=await vy(n);for(const t of e)try{if(Ey(t))return}catch{}st(n,"unauthorized-domain")}function Ey(n){const e=Hi(),{protocol:t,hostname:r}=new URL(e);if(n.startsWith("chrome-extension://")){const a=new URL(n);return a.hostname===""&&r===""?t==="chrome-extension:"&&n.replace("chrome-extension://","")===e.replace("chrome-extension://",""):t==="chrome-extension:"&&a.hostname===r}if(!_y.test(t))return!1;if(yy.test(n))return r===n;const s=n.replace(/\./g,"\\.");return new RegExp("^(.+\\."+s+"|"+s+")$","i").test(r)}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Iy=new vr(3e4,6e4);function ec(){const n=He().___jsl;if(n!=null&&n.H){for(const e of Object.keys(n.H))if(n.H[e].r=n.H[e].r||[],n.H[e].L=n.H[e].L||[],n.H[e].r=[...n.H[e].L],n.CP)for(let t=0;t<n.CP.length;t++)n.CP[t]=null}}function Ty(n){return new Promise((e,t)=>{var r,s,o;function a(){ec(),gapi.load("gapi.iframes",{callback:()=>{e(gapi.iframes.getContext())},ontimeout:()=>{ec(),t(ze(n,"network-request-failed"))},timeout:Iy.get()})}if(!((s=(r=He().gapi)===null||r===void 0?void 0:r.iframes)===null||s===void 0)&&s.Iframe)e(gapi.iframes.getContext());else if(!((o=He().gapi)===null||o===void 0)&&o.load)a();else{const c=Cv("iframefcb");return He()[c]=()=>{gapi.load?a():t(ze(n,"network-request-failed"))},Rv(`${Pv()}?onload=${c}`).catch(u=>t(u))}}).catch(e=>{throw ns=null,e})}let ns=null;function wy(n){return ns=ns||Ty(n),ns}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ay=new vr(5e3,15e3),Sy="__/auth/iframe",Ry="emulator/auth/iframe",Py={style:{position:"absolute",top:"-100px",width:"1px",height:"1px"},"aria-hidden":"true",tabindex:"-1"},Cy=new Map([["identitytoolkit.googleapis.com","p"],["staging-identitytoolkit.sandbox.googleapis.com","s"],["test-identitytoolkit.sandbox.googleapis.com","t"]]);function xy(n){const e=n.config;q(e.authDomain,n,"auth-domain-config-required");const t=e.emulator?Lo(e,Ry):`https://${n.config.authDomain}/${Sy}`,r={apiKey:e.apiKey,appName:n.name,v:mn},s=Cy.get(n.config.apiHost);s&&(r.eid=s);const o=n._getFrameworks();return o.length&&(r.fw=o.join(",")),`${t}?${lr(r).slice(1)}`}async function Dy(n){const e=await wy(n),t=He().gapi;return q(t,n,"internal-error"),e.open({where:document.body,url:xy(n),messageHandlersFilter:t.iframes.CROSS_ORIGIN_IFRAMES_FILTER,attributes:Py,dontclear:!0},r=>new Promise(async(s,o)=>{await r.restyle({setHideOnLeave:!1});const a=ze(n,"network-request-failed"),c=He().setTimeout(()=>{o(a)},Ay.get());function u(){He().clearTimeout(c),s(r)}r.ping(u).then(u,()=>{o(a)})}))}/**
 * @license
 * Copyright 2020 Google LLC.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ky={location:"yes",resizable:"yes",statusbar:"yes",toolbar:"no"},Vy=500,Ny=600,Oy="_blank",Ly="http://localhost";class tc{constructor(e){this.window=e,this.associatedEvent=null}close(){if(this.window)try{this.window.close()}catch{}}}function My(n,e,t,r=Vy,s=Ny){const o=Math.max((window.screen.availHeight-s)/2,0).toString(),a=Math.max((window.screen.availWidth-r)/2,0).toString();let c="";const u=Object.assign(Object.assign({},ky),{width:r.toString(),height:s.toString(),top:o,left:a}),h=Pe().toLowerCase();t&&(c=sd(h)?Oy:t),nd(h)&&(e=e||Ly,u.scrollbars="yes");const f=Object.entries(u).reduce((E,[T,R])=>`${E}${T}=${R},`,"");if(_v(h)&&c!=="_self")return jy(e||"",c),new tc(null);const v=window.open(e||"",c,f);q(v,n,"popup-blocked");try{v.focus()}catch{}return new tc(v)}function jy(n,e){const t=document.createElement("a");t.href=n,t.target=e;const r=document.createEvent("MouseEvent");r.initMouseEvent("click",!0,!0,window,1,0,0,0,0,!1,!1,!1,!1,1,null),t.dispatchEvent(r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Uy="__/auth/handler",Fy="emulator/auth/handler",$y=encodeURIComponent("fac");async function nc(n,e,t,r,s,o){q(n.config.authDomain,n,"auth-domain-config-required"),q(n.config.apiKey,n,"invalid-api-key");const a={apiKey:n.config.apiKey,appName:n.name,authType:t,redirectUrl:r,v:mn,eventId:s};if(e instanceof pd){e.setDefaultLanguage(n.languageCode),a.providerId=e.providerId||"",Nh(e.getCustomParameters())||(a.customParameters=JSON.stringify(e.getCustomParameters()));for(const[f,v]of Object.entries({}))a[f]=v}if(e instanceof yr){const f=e.getScopes().filter(v=>v!=="");f.length>0&&(a.scopes=f.join(","))}n.tenantId&&(a.tid=n.tenantId);const c=a;for(const f of Object.keys(c))c[f]===void 0&&delete c[f];const u=await n._getAppCheckToken(),h=u?`#${$y}=${encodeURIComponent(u)}`:"";return`${qy(n)}?${lr(c).slice(1)}${h}`}function qy({config:n}){return n.emulator?Lo(n,Fy):`https://${n.authDomain}/${Uy}`}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ii="webStorageSupport";class By{constructor(){this.eventManagers={},this.iframes={},this.originValidationPromises={},this._redirectPersistence=yd,this._completeRedirectFn=py,this._overrideRedirectResult=uy}async _openPopup(e,t,r,s){var o;it((o=this.eventManagers[e._key()])===null||o===void 0?void 0:o.manager,"_initialize() not called before _openPopup()");const a=await nc(e,t,r,Hi(),s);return My(e,a,qo())}async _openRedirect(e,t,r,s){await this._originValidation(e);const o=await nc(e,t,r,Hi(),s);return Gv(o),new Promise(()=>{})}_initialize(e){const t=e._key();if(this.eventManagers[t]){const{manager:s,promise:o}=this.eventManagers[t];return s?Promise.resolve(s):(it(o,"If manager is not set, promise should be"),o)}const r=this.initAndGetManager(e);return this.eventManagers[t]={promise:r},r.catch(()=>{delete this.eventManagers[t]}),r}async initAndGetManager(e){const t=await Dy(e),r=new my(e);return t.register("authEvent",s=>(q(s==null?void 0:s.authEvent,e,"invalid-auth-event"),{status:r.onEvent(s.authEvent)?"ACK":"ERROR"}),gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER),this.eventManagers[e._key()]={manager:r},this.iframes[e._key()]=t,r}_isIframeWebStorageSupported(e,t){this.iframes[e._key()].send(Ii,{type:Ii},s=>{var o;const a=(o=s==null?void 0:s[0])===null||o===void 0?void 0:o[Ii];a!==void 0&&t(!!a),st(e,"internal-error")},gapi.iframes.CROSS_ORIGIN_IFRAMES_FILTER)}_originValidation(e){const t=e._key();return this.originValidationPromises[t]||(this.originValidationPromises[t]=by(e)),this.originValidationPromises[t]}get _shouldInitProactively(){return cd()||rd()||Uo()}}const zy=By;var rc="@firebase/auth",sc="1.7.9";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hy{constructor(e){this.auth=e,this.internalListeners=new Map}getUid(){var e;return this.assertAuthConfigured(),((e=this.auth.currentUser)===null||e===void 0?void 0:e.uid)||null}async getToken(e){return this.assertAuthConfigured(),await this.auth._initializationPromise,this.auth.currentUser?{accessToken:await this.auth.currentUser.getIdToken(e)}:null}addAuthTokenListener(e){if(this.assertAuthConfigured(),this.internalListeners.has(e))return;const t=this.auth.onIdTokenChanged(r=>{e((r==null?void 0:r.stsTokenManager.accessToken)||null)});this.internalListeners.set(e,t),this.updateProactiveRefresh()}removeAuthTokenListener(e){this.assertAuthConfigured();const t=this.internalListeners.get(e);t&&(this.internalListeners.delete(e),t(),this.updateProactiveRefresh())}assertAuthConfigured(){q(this.auth._initializationPromise,"dependent-sdk-initialized-before-auth")}updateProactiveRefresh(){this.internalListeners.size>0?this.auth._startProactiveRefresh():this.auth._stopProactiveRefresh()}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gy(n){switch(n){case"Node":return"node";case"ReactNative":return"rn";case"Worker":return"webworker";case"Cordova":return"cordova";case"WebExtension":return"web-extension";default:return}}function Wy(n){on(new Ut("auth",(e,{options:t})=>{const r=e.getProvider("app").getImmediate(),s=e.getProvider("heartbeat"),o=e.getProvider("app-check-internal"),{apiKey:a,authDomain:c}=r.options;q(a&&!a.includes(":"),"invalid-api-key",{appName:r.name});const u={apiKey:a,authDomain:c,clientPlatform:n,apiHost:"identitytoolkit.googleapis.com",tokenApiHost:"securetoken.googleapis.com",apiScheme:"https",sdkClientVersion:ud(n)},h=new Av(r,s,o,u);return Dv(h,t),h},"PUBLIC").setInstantiationMode("EXPLICIT").setInstanceCreatedCallback((e,t,r)=>{e.getProvider("auth-internal").initialize()})),on(new Ut("auth-internal",e=>{const t=Fo(e.getProvider("auth").getImmediate());return(r=>new Hy(r))(t)},"PRIVATE").setInstantiationMode("EXPLICIT")),It(rc,sc,Gy(n)),It(rc,sc,"esm2017")}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ky=5*60,Qy=vc("authIdTokenMaxAge")||Ky;let ic=null;const Jy=n=>async e=>{const t=e&&await e.getIdTokenResult(),r=t&&(new Date().getTime()-Date.parse(t.issuedAtTime))/1e3;if(r&&r>Qy)return;const s=t==null?void 0:t.token;ic!==s&&(ic=s,await fetch(n,{method:s?"POST":"DELETE",headers:s?{Authorization:`Bearer ${s}`}:{}}))};function Yy(n=Zi()){const e=Xi(n,"auth");if(e.isInitialized())return e.getImmediate();const t=xv(n,{popupRedirectResolver:zy,persistence:[ty,Bv,yd]}),r=vc("authTokenSyncURL");if(r&&typeof isSecureContext=="boolean"&&isSecureContext){const o=new URL(r,location.origin);if(location.origin===o.origin){const a=Jy(o.toString());Fv(t,a,()=>a(t.currentUser)),Uv(t,c=>a(c))}}const s=mc("auth");return s&&kv(t,`http://${s}`),t}function Xy(){var n,e;return(e=(n=document.getElementsByTagName("head"))===null||n===void 0?void 0:n[0])!==null&&e!==void 0?e:document}Sv({loadJS(n){return new Promise((e,t)=>{const r=document.createElement("script");r.setAttribute("src",n),r.onload=e,r.onerror=s=>{const o=ze("internal-error");o.customData=s,t(o)},r.type="text/javascript",r.charset="UTF-8",Xy().appendChild(r)})},gapiScript:"https://apis.google.com/js/api.js",recaptchaV2Script:"https://www.google.com/recaptcha/api.js",recaptchaEnterpriseScript:"https://www.google.com/recaptcha/enterprise.js?render="});Wy("Browser");const te={},Zy={apiKey:(te==null?void 0:te.VITE_FIREBASE_API_KEY)||"AIzaSy_MOCK_API_KEY_PARA_DESENVOLVIMENTO",authDomain:(te==null?void 0:te.VITE_FIREBASE_AUTH_DOMAIN)||"detran-dist-projetos.firebaseapp.com",projectId:(te==null?void 0:te.VITE_FIREBASE_PROJECT_ID)||"detran-dist-projetos",storageBucket:(te==null?void 0:te.VITE_FIREBASE_STORAGE_BUCKET)||"detran-dist-projetos.appspot.com",messagingSenderId:(te==null?void 0:te.VITE_FIREBASE_MESSAGING_SENDER_ID)||"1234567890",appId:(te==null?void 0:te.VITE_FIREBASE_APP_ID)||"1:1234567890:web:abcdef"},Un=!(te!=null&&te.VITE_FIREBASE_API_KEY)||(te==null?void 0:te.VITE_FIREBASE_API_KEY.includes("MOCK"));let Ti,je,e_;try{Ti=Lp().length===0?bc(Zy):Zi(),je=Vg(Ti),e_=Yy(Ti)}catch(n){console.warn("Aviso ao inicializar Firebase:",n.message)}const zo="dist_app_",t_={projetos:[{id:"proj_01",nome:"Integração Sistema de Fiscalização Eletrônica",areaGestora:"DIST - Divisão de Integração Setorial",descricao:"Projeto prioritário de integração de dados e radares entre DETRAN, CET e DER para unificação da fiscalização eletrônica.",entesExternos:["CET","DER","Polícia Rodoviária"],areasDetranEnvolvidas:["DIST - Divisão de Integração Setorial","DTI - Diretoria de Tecnologia da Informação","CGIT - Coordenação Geral de Infraestrutura e Tecnologia"],objetivo:"Interligar os sistemas de monitoramento de tráfego e autuação eletrônica dos órgãos conveniados.",escopo:"Desenvolvimento de APIs seguras, padronização de protocolos de troca de dados e painel de acompanhamento.",dataInicio:"2026-02-01",previsaoEncerramento:"2026-12-15",distHabilitado:!0,criadoEm:"2026-02-01T10:00:00Z",criadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"},atualizadoEm:"2026-03-10T14:30:00Z",atualizadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"}},{id:"proj_02",nome:"Modernização do Cadastro de Condutores",areaGestora:"DSV - Diretoria de Segurança Veicular",descricao:"Modernização estrutural do fluxo de validação biométrica de condutores com postos descentralizados Poupatempo.",entesExternos:["Poupatempo","Prodesp"],areasDetranEnvolvidas:["DSV - Diretoria de Segurança Veicular","DTI - Diretoria de Tecnologia da Informação"],objetivo:"Reduzir o tempo de emissão da CNH e integrar validação biométrica em tempo real.",escopo:"Migração de banco legado, implantação de novos fluxos de biometria e capacitação das unidades.",dataInicio:"2026-01-15",previsaoEncerramento:"2026-09-30",distHabilitado:!0,criadoEm:"2026-01-15T09:00:00Z",criadoPor:{uid:"usr_02",nome:"Mariana Costa (DSV)"},atualizadoEm:"2026-03-05T11:00:00Z",atualizadoPor:{uid:"usr_02",nome:"Mariana Costa (DSV)"}},{id:"proj_03",nome:"Renovação do Parque de Servidores",areaGestora:"DTI - Diretoria de Tecnologia da Informação",descricao:"Atualização de infraestrutura de hardware no data center do Detran-SP.",entesExternos:["Fornecedores de Hardware"],areasDetranEnvolvidas:["DTI - Diretoria de Tecnologia da Informação","CGIT - Coordenação Geral de Infraestrutura e Tecnologia"],objetivo:"Substituição de servidores obsoletos para garantir alta disponibilidade.",escopo:"Aquisição, instalação e migração de cargas de trabalho.",dataInicio:"2026-03-01",previsaoEncerramento:"2026-08-31",distHabilitado:!1,criadoEm:"2026-03-01T08:30:00Z",criadoPor:{uid:"usr_03",nome:"Fernando Lima (DTI)"},atualizadoEm:"2026-03-01T08:30:00Z",atualizadoPor:{uid:"usr_03",nome:"Fernando Lima (DTI)"}}],contatos:[{id:"cont_01",projetoId:"proj_01",nome:"Roberto Antunes",cargo:"Coordenador de Tráfego",area:"CET - Companhia de Engenharia de Tráfego",email:"roberto.antunes@cetsp.com.br",criadoEm:"2026-02-05T10:00:00Z",atualizadoEm:"2026-02-05T10:00:00Z"},{id:"cont_02",projetoId:"proj_01",nome:"Ana Paula Ferreira",cargo:"Especialista em TI",area:"DER - Depto de Estradas de Rodagem",email:"apferreira@der.sp.gov.br",criadoEm:"2026-02-06T14:30:00Z",atualizadoEm:"2026-02-06T14:30:00Z"},{id:"cont_03",projetoId:"proj_02",nome:"Juliana Mendes",cargo:"Supervisora de Operações",area:"Poupatempo / Prodesp",email:"jmendes@prodesp.sp.gov.br",criadoEm:"2026-01-20T11:00:00Z",atualizadoEm:"2026-01-20T11:00:00Z"}],diagnosticos:[{id:"diag_proj_01",projetoId:"proj_01",classificacao:"requer_atencao",situacaoAtual:"O convênio com o DER aguarda assinatura jurídica há 3 semanas, gerando risco de atraso na homologação da API.",recomendacoesProximosPassos:"Agendar reunião com a consultoria jurídica da Secretaria e alinhar aditivo de prazo de 15 dias.",areasResponsaveisExecucao:["DIST - Divisão de Integração Setorial","Presidência / Gabinete"],atualizadoEm:"2026-03-10T14:30:00Z",atualizadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"}},{id:"diag_proj_02",projetoId:"proj_02",classificacao:"em_andamento",situacaoAtual:"Piloto de validação biométrica concluído com 98% de assertividade nas unidades selecionadas.",recomendacoesProximosPassos:"Iniciar o plano de roll-out gradual para os postos do interior a partir do próximo mês.",areasResponsaveisExecucao:["DSV - Diretoria de Segurança Veicular","COORD - Coordenadorias Regionais"],atualizadoEm:"2026-03-05T11:00:00Z",atualizadoPor:{uid:"usr_02",nome:"Mariana Costa (DSV)"}}],riscos:[{id:"risk_01",projetoId:"proj_01",numero:1,titulo:"Atraso na liberação de portas de firewall pelo parceiro externo",areaResponsavel:"CGIT - Coordenação Geral de Infraestrutura e Tecnologia",descricao:"Dificuldade de alinhamento com a equipe de infraestrutura da CET para liberação do tráfego seguro.",probabilidade:2,impacto:3,pontuacao:6,classificacao:"Alto",criadoEm:"2026-02-10T14:00:00Z",criadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"},atualizadoEm:"2026-02-10T14:00:00Z",atualizadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"}},{id:"risk_02",projetoId:"proj_01",numero:2,titulo:"Instabilidade transitória na rede local durante testes de carga",areaResponsavel:"DTI - Diretoria de Tecnologia da Informação",descricao:"Picos de consumo de banda durante os disparos automatizados de telemetria.",probabilidade:2,impacto:2,pontuacao:4,classificacao:"Moderado",criadoEm:"2026-02-15T16:00:00Z",criadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"},atualizadoEm:"2026-02-15T16:00:00Z",atualizadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"}},{id:"risk_03",projetoId:"proj_01",numero:3,titulo:"Pequenas divergências na formatação de CEP nos cadastros",areaResponsavel:"DIST - Divisão de Integração Setorial",descricao:"Campos sem máscara estrita na base legada que podem exigir conversão no parser.",probabilidade:1,impacto:2,pontuacao:2,classificacao:"Baixo",criadoEm:"2026-02-20T10:00:00Z",criadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"},atualizadoEm:"2026-02-20T10:00:00Z",atualizadoPor:{uid:"usr_01",nome:"Carlos Silva (DIST)"}},{id:"risk_04",projetoId:"proj_02",numero:1,titulo:"Indisponibilidade pontual de kits biométricos em postos remotos",areaResponsavel:"DSV - Diretoria de Segurança Veicular",descricao:"Equipamentos pendentes de reposição por falha física.",probabilidade:1,impacto:3,pontuacao:3,classificacao:"Moderado",criadoEm:"2026-02-18T11:00:00Z",criadoPor:{uid:"usr_02",nome:"Mariana Costa (DSV)"},atualizadoEm:"2026-02-18T11:00:00Z",atualizadoPor:{uid:"usr_02",nome:"Mariana Costa (DSV)"}}],historico:[{id:"hist_01",timestamp:"2026-02-01T10:00:00Z",usuario:{uid:"usr_01",nome:"Carlos Silva (DIST)",email:"carlos.silva@detran.sp.gov.br"},acao:"CRIAR_PROJETO",entidade:"projeto",entidadeId:"proj_01",projetoId:"proj_01",detalhes:'Projeto "Integração Sistema de Fiscalização Eletrônica" cadastrado com módulo DIST ativado.'},{id:"hist_02",timestamp:"2026-02-10T14:00:00Z",usuario:{uid:"usr_01",nome:"Carlos Silva (DIST)",email:"carlos.silva@detran.sp.gov.br"},acao:"CRIAR_RISCO",entidade:"risco",entidadeId:"risk_01",projetoId:"proj_01",detalhes:'Risco #1 "Atraso na liberação de portas de firewall" mapeado com classificação Alto (P:2, I:3).'},{id:"hist_03",timestamp:"2026-03-10T14:30:00Z",usuario:{uid:"usr_01",nome:"Carlos Silva (DIST)",email:"carlos.silva@detran.sp.gov.br"},acao:"SALVAR_DIAGNOSTICO",entidade:"diagnostico",entidadeId:"diag_proj_01",projetoId:"proj_01",detalhes:'Diagnóstico DIST atualizado para "Requer Atenção".'}]},oc=new Map,Is={getItem(n){return typeof localStorage<"u"?localStorage.getItem(n):oc.get(n)||null},setItem(n,e){typeof localStorage<"u"?localStorage.setItem(n,e):oc.set(n,String(e))}};function n_(){["projetos","diagnosticos","riscos","contatos","historico"].forEach(n=>{const e=zo+n;Is.getItem(e)||Is.setItem(e,JSON.stringify(t_[n]))})}n_();function Fn(n){try{const e=Is.getItem(zo+n);return e?JSON.parse(e):[]}catch(e){return console.error(`Erro ao ler coleção local ${n}:`,e),[]}}function ac(n,e){try{Is.setItem(zo+n,JSON.stringify(e))}catch(t){console.error(`Erro ao gravar coleção local ${n}:`,t)}}const ve={async getAll(n){if(!Un&&je)try{const e=jl(je,n);return(await ql(e)).docs.map(r=>({id:r.id,...r.data()}))}catch(e){console.warn(`Firestore getAll("${n}") falhou, usando fallback:`,e.message)}return Fn(n)},async getById(n,e){if(!Un&&je)try{const r=bi(je,n,e),s=await Xg(r);return s.exists()?{id:s.id,...s.data()}:null}catch(r){console.warn(`Firestore getById("${n}", "${e}") falhou, usando fallback:`,r.message)}return Fn(n).find(r=>r.id===e)||null},async getByProjetoId(n,e){if(!Un&&je)try{const r=jl(je,n),s=Gg(r,Wg("projetoId","==",e));return(await ql(s)).docs.map(a=>({id:a.id,...a.data()}))}catch(r){console.warn("Firestore getByProjetoId falhou, usando fallback:",r.message)}return Fn(n).filter(r=>r.projetoId===e)},async save(n,e){const t=e.id||`${n.slice(0,4)}_${Date.now()}`,r={...e,id:t};if(!Un&&je)try{const a=bi(je,n,t);return await Zg(a,r,{merge:!0}),r}catch(a){console.warn(`Firestore save("${n}") falhou, usando fallback:`,a.message)}const s=Fn(n),o=s.findIndex(a=>a.id===t);return o>=0?s[o]={...s[o],...r}:s.push(r),ac(n,s),r},async remove(n,e){if(!Un&&je)try{const s=bi(je,n,e);return await ev(s),!0}catch(s){console.warn(`Firestore remove("${n}") falhou, usando fallback:`,s.message)}const r=Fn(n).filter(s=>s.id!==e);return ac(n,r),!0}},lc="historico",Ge={async registrarLog({usuario:n,acao:e,entidade:t,entidadeId:r,projetoId:s,detalhes:o}){const a={id:`hist_${Date.now()}_${Math.random().toString(36).substr(2,4)}`,timestamp:new Date().toISOString(),usuario:{uid:(n==null?void 0:n.uid)||"anonimo",nome:(n==null?void 0:n.nome)||"Usuário Não Identificado",email:(n==null?void 0:n.email)||""},acao:e,entidade:t,entidadeId:r||"",projetoId:s||"",detalhes:o||""};try{await ve.save(lc,a)}catch(c){console.error("Falha ao registrar log de histórico:",c)}},async listarLogs(){return(await ve.getAll(lc)).sort((e,t)=>new Date(t.timestamp)-new Date(e.timestamp))}},Hr="projetos",Ne={validarDatas(n,e){if(!n||!e)return!0;const t=r=>typeof r=="string"&&/^\d{4}-\d{2}-\d{2}$/.test(r.trim());if(t(n)&&t(e)&&new Date(e)<new Date(n))throw new Error("A previsão de encerramento não pode ser anterior à data de início do projeto.");return!0},async listarProjetos(){return(await ve.getAll(Hr)).sort((e,t)=>(t.atualizadoEm||"").localeCompare(e.atualizadoEm||""))},async obterPorId(n){return n?await ve.getById(Hr,n):null},async salvarProjeto(n,e){var u;if(!n.nome||!n.nome.trim())throw new Error("O nome do projeto é obrigatório.");this.validarDatas(n.dataInicio,n.previsaoEncerramento);const t=!n.id,r=new Date().toISOString(),s=t?null:await this.obterPorId(n.id);let o=n.distHabilitado;if(s&&s.distHabilitado!==o&&!ws())throw new Error("Permissão negada: Seu perfil não tem autorização para alterar a configuração do módulo DIST.");const a={...n,nome:n.nome.trim(),descricao:((u=n.descricao)==null?void 0:u.trim())||"",distHabilitado:!!o,atualizadoEm:r,atualizadoPor:{uid:(e==null?void 0:e.uid)||"anonimo",nome:(e==null?void 0:e.nome)||"Usuário",email:(e==null?void 0:e.email)||""}};t&&(a.criadoEm=r,a.criadoPor=a.atualizadoPor);const c=await ve.save(Hr,a);if(t)await Ge.registrarLog({usuario:e,acao:"CRIAR_PROJETO",entidade:"projeto",entidadeId:c.id,projetoId:c.id,detalhes:`Projeto "${c.nome}" cadastrado com módulo DIST ${c.distHabilitado?"Habilitado":"Desabilitado"}.`});else{let h=`Projeto "${c.nome}" atualizado.`;s&&s.distHabilitado!==c.distHabilitado&&(h=`Módulo DIST ${c.distHabilitado?"habilitado":"desabilitado"} no projeto "${c.nome}" (dados preservados).`),await Ge.registrarLog({usuario:e,acao:"EDITAR_PROJETO",entidade:"projeto",entidadeId:c.id,projetoId:c.id,detalhes:h})}return c},async excluirProjeto(n,e){const t=await this.obterPorId(n);return t?(await ve.remove(Hr,n),await Ge.registrarLog({usuario:e,acao:"EXCLUIR_PROJETO",entidade:"projeto",entidadeId:n,projetoId:n,detalhes:`Projeto "${t.nome}" foi removido do sistema.`}),!0):!1}};let rs=null,ss=null;function jt({title:n,content:e,footerHtml:t="",maxWidth:r="650px",onClose:s=null}){Re(),ss=document.activeElement;const o=document.getElementById("modal-container");if(!o)return;const a=document.createElement("div");a.className="modal-backdrop",a.setAttribute("tabindex","-1");const c=document.createElement("div");c.className="modal-box",c.style.maxWidth=r,c.setAttribute("role","dialog"),c.setAttribute("aria-modal","true"),c.setAttribute("aria-labelledby","modal-heading"),c.innerHTML=`
    <div class="modal-header">
      <h2 id="modal-heading" class="section-title">${n}</h2>
      <button type="button" class="btn-close-modal" id="btn-modal-close" aria-label="Fechar janela">
        <span class="material-symbols-outlined">close</span>
      </button>
    </div>
    <div class="modal-body" id="modal-body-content"></div>
    ${t?`<div class="modal-footer">${t}</div>`:""}
  `,a.appendChild(c),o.appendChild(a),o.setAttribute("aria-hidden","false");const u=c.querySelector("#modal-body-content");typeof e=="string"?u.innerHTML=e:e instanceof HTMLElement&&u.appendChild(e),requestAnimationFrame(()=>{a.classList.add("open")});const h=()=>{s&&s(),Re()};c.querySelector("#btn-modal-close").addEventListener("click",h),a.addEventListener("click",E=>{E.target===a&&h()});const v=E=>{E.key==="Escape"&&h()};return document.addEventListener("keydown",v),rs={backdrop:a,keyHandler:v,onClose:s},setTimeout(()=>{const E=c.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');E.length>0&&E[0].focus()},50),c}function Re(){if(!rs)return;const{backdrop:n,keyHandler:e}=rs;document.removeEventListener("keydown",e),n.classList.remove("open"),setTimeout(()=>{n.parentNode&&n.parentNode.removeChild(n);const t=document.getElementById("modal-container");t&&!t.hasChildNodes()&&t.setAttribute("aria-hidden","true")},200),ss&&typeof ss.focus=="function"&&ss.focus(),rs=null}function zt(n){const{isDirty:e}=oe();if(!e){n();return}const s=jt({title:"Descartar alterações?",content:`
    <div style="display: flex; gap: 14px; align-items: flex-start;">
      <span class="material-symbols-outlined" style="color: var(--color-warning); font-size: 32px;">warning</span>
      <div>
        <h3 style="font-size: 15px; margin-bottom: 6px; color: var(--text-main);">Alterações não salvas detectadas</h3>
        <p style="color: var(--text-secondary); line-height: 1.5; font-size: 13px;">
          Existem dados modificados neste formulário que ainda não foram gravados. Se você sair agora, essas modificações serão perdidas.
        </p>
      </div>
    </div>
  `,footerHtml:`
    <button type="button" class="btn btn-secondary" id="btn-cancel-discard">Continuar editando</button>
    <button type="button" class="btn btn-danger" id="btn-confirm-discard">Descartar e prosseguir</button>
  `,maxWidth:"500px"}),o=s.querySelector("#btn-cancel-discard"),a=s.querySelector("#btn-confirm-discard");o.addEventListener("click",()=>{Re()}),a.addEventListener("click",()=>{De(!1),Re(),n()})}const r_="/assets/logo_horizontal-piKHg2KE.png",s_="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAADBCAYAAABIZ7vSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAoKSURBVHhe7d1fbxNXGsfx3zMOSRsRMEsESkFpUiiiKiLQN9DwChYuloQmEuQVLFzsdcL9SoRXEKJNCqEXCVJViRUqjpCW3qAYVmiRUMFBSBQVgZH404bYz16EYyYHO/bYM/b8+X0kJHLGl1+N5xw/TgQnL/ZhFX2g9WZPZOwl8p9gZG4CgnH7ArlpFpA8FHkAtyGSgxZyaPski+ljefvVVDsG2CjVPESyUCxCJIdUIYPpEzn7ZVQeAwyCah6QDKCLUCeD749n7ZfQGgbYDKp5AAsQZxGpTQt82/6AAbaCYgEiVxgj4NgL1ASCo4BOobDyAiNz8xi9fMp+SVLwDhgW5m1anfNJembkHTAsRNIQOQVHlzA6dz0pd0UGGE6DgE5hZO4hRi6dxsn5tP2CuGCAYSbog8g5rP75ECNzE3EMkQFGgUgagvE4hsgAo6QU4spSXJ4RGWAUCfoAncLopSWMXBy0L0cJA4w0OQRxrmNkbh4nL0ZyookBxoHgKFZlCSOXTtuXwo4BxsXaOeI5jM5dx3eXD9mXw4oBxs8gHI3M3ZABxpW5G4b82ZABxtsgVmUJo5eO2hfCggHGnUgakHmMzp2zL4UBA0yO02tvyeH6FIUBJssgVleWwrRLZoBJI+iDFEMz7sUAk0gkvfZRXusjZICJplMYuTRlrzYTA0w6kVOtjJABUksjZIC0pkURMkD6oAURMkBar8kRMkD6WBMjZIBUXpMiZIBUmcipoA+rGSBVoVNBjnMxQKpOMRXUAAMDpOpE0hCdD2KUiwFSbQR9KKzM28uNYoDkxSBG5ibsxUYwQPJGMO7nb2NggFQH8e15kAGSdyJpv54HGSDVa9CPL78zQGrEeKNffGeAVD+RNApOQ58XM0BqVENvxQyQ/DBe766YAVLjRNJY/bOuX/3BAMkfIqfqOaBmgOQfcTz/xS0GSH4a9DrAygDJX6qe7oIMkPwl6PNyF2SA5D8Pd0EGSP7zcBdkgBSMGu+CDJCCUeNdkAFScGq4CzJACo6gr9qnI07Xlk6kUil7ncgnzt/tFTdn7/5eHBjYg55d3QyR/Cc4utHQqgMAqZSDns+6cWBgDz7v70F7xyb7dUT1W3UqbkbWPQOmUg62d2/FgYMMkXx10l4wKm5CTIj79veiq6vTvkxUO0FfpV9wVDFAY3NXJ77c34t9+3uR3tZlXyaqjeKv9hJqCdDY3NWJL/buwoGDe7C9e6t9maiao+XG9msO0Gjv2ITP+3tw4CB3zuSBSBqFdx+9DXsO0Gjv2FTaOTNEqokWv7WX6g7QMEc4A998yZ0zVePfHbAc9xEOd870EZG0vRv2NUBje/fW0s6ZIdJ6su5tOJAADXOE89XX/dw50xpd/zYcaIDGp50dpZ3z9u6t3LAkmaDP/dlwUwI0Skc43DknWyFVGtFqaoCGe/hhd+9O7pyTxnUc05IAjVTKwY6d2zj8kDSC0t8caWmAbhx+SBI5ZD6WC02ABocfEmL1j0MIY4AGhx/izhlEmAM0OPwQWwOIQoAGhx9iRrQPUQrQ4PBDXEi4nwFr4R5++LTzE/syhd13lw9FOkBje/dWfPV1H49wokYK6VgEaHD4IWqcwVgFaNjDDxResQzQMEc4A9/s4845nAZiHaDB4YeQEsTrGbAaDj+EjSYrQDdzhPPF3t3cObeMxOMYphHpbZs5/NBCiQ/Q4PBDazBAi3v4YcfOv3DnHDAGWEF7xybs7t3B4YeAMcAqOPwQLAboAYcf/McA6+AefmCIjWGAdSi8W8Hvv97D8n/+jT9+e2hfJg8YoAeFdyv47d5/cffqFTy+cwsrb17bLyGPGGANVt68xuM7t3D36hU8+d8dFN6t2C+hOjHADay8eY3lWzdx9+oCfv/1HsMLAAMs49Wzp3jwyyLuXl3A80cP7MvkIwbo8urZU9y/cQ33b1zDyyeP7csUAAYI4PmjB7j380+4f+MaXj17al+mACU6wOePHuDu1QUs37qJty9f2JepCRIXoDlKufPjD1i+dZNHKa2VSUyA7jM8HqWER+wDNEcpd378geGFjWoutgG+ffmidIbHo5SwkuXYBWiOUu79/BPDCz3NxybAl08el87weJQSFZqNfIDmKOXBL4sML2raEM1nQDMOZc7weJQSUdMnohUgx6FiJYOoHMNwHCqGVHMIe4Ach4q12whrgK+ePeUZXuxpFmEL0D0OxfBibvZEeJ4BOQ6VNGt3P7Q6QI5DJZVkzP+aHuCHoxSe4SWXLpr/NS1AexyK4SVYqqN5d0COQ9F6msX0sbz5KbAA3Wd43NFSicoV94++B2iOUhgelaWy4P7RtwA5DkVVKXL4/njpCAZ+BMhxKKqdljYfRl0BFt6trDvD446WaiJY9/wHrwG6j1IYHnmimsfM8LrnP9Qa4Mqb1/xKIzVG5IK9hGoBuo9SGB41pCjT9hIqBchxKPJVmd2vsS5AjkNRMPS8vWI4eH+UwjM8CkxbR9nnPwBIPX3bNfjyyeNB7mjr1NG19o/KU72Af/1tzl42yj4DEvlGnYpvv2CAFLBMpc2HwQApOFo8ay/ZGCAFRLPmi0cbYYAUkI2f/QwGSP5T5DBzvOLRixsDpAAUx+yVShgg+S1Ty7OfwQDJXzXsfN0YIPlHseDl7gcGSL5RzaOteMZeroYBkk/kPKZP5OzVahggNU6Rw+zQhL1cCwZIPqj92MXGAKlRk143Hm4MkOqnyCHV7unYxcYAqQHFMfcvGqoHA6R6NfTWazBAqoNmMTPk+cyvHAZI3qjmUXTq3vXaGCB5I86ZamP2XjBA8mKy1jm/WjFAqlXGr+c+NwZI1a2d9x2zl/3AAGljqnmoHGv0vK8SBkgbU+eIn5sOGwOkDchYkPGBAVJlMub3jrccBkhlNCc+MED6iOJss+IDA6R1VM/UO9lcLwZI78kYZocn7dWgMUBq6jOfjQEmXuviAwNMMNU8inK4lfGBASaVZoP+hKNWDDB5Mkh1hCI+MMDEmcTM0JGgBgvqwQCTQDUP6LEg5vkaxQBjT7No08Pl/lJlGDDAOFOcxczw4Xp+aVCzMMA4UuSgxSPN/litHgwwfibR1n7Yjy+NNwMDjA3NQotHMDN0Jky73GoYYNSp5qF6BjPDkbnruTHAKFO9gLaO/lZMsfiFAUZTBkU5jNnhhn87VasxwGjJvH/OC81HaY1igNHwIbwIPudthAGGmeqFuIZnMMCwUc0DmESq2I/Z4bG4hmcwwPDIvP9exra1s7zwfnzmJwbYSoocFGeRKvZjZuhIq6eTW4EBNp1mAUyuHaMM9WN2aCIpd7tyRL79xwRExu0LVKMtn0G39NirH6jmAckAuog2XUhybOUwwEbZAZaCw22g6Olv5yYRA2yI5tC1K6dbehYhmkVKs7zDecMAK9IcgPcxSQ6qywCgcDJAIY/Ff8bik4hW+z+Z/AlsIgHDawAAAABJRU5ErkJggg==";function i_(){const n=document.getElementById("sidebar-container");if(!n)return;const e=()=>{const{activeTab:t,activeProject:r,sidebarCollapsed:s}=oe(),o=r?!!r.distHabilitado:null;n.innerHTML=`
      <div class="sidebar-header">
        <a href="#dashboard" class="sidebar-brand" id="brand-link" aria-label="Detran-SP">
          <div class="sidebar-brand-logo-wrap">
            <img src="${r_}" alt="Detran.SP" class="sidebar-logo-expanded" />
            <img src="${s_}" alt="Detran.SP" class="sidebar-logo-collapsed" />
          </div>
        </a>
        <button type="button" class="btn-toggle-sidebar" id="btn-toggle-sidebar" aria-label="${s?"Expandir menu lateral":"Colapsar menu lateral"}">
          <span class="material-symbols-outlined">${s?"chevron_right":"chevron_left"}</span>
        </button>
      </div>

      <ul class="sidebar-nav" role="tablist">
        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="dashboard"?"active":""}" data-tab="dashboard" role="tab" aria-selected="${t==="dashboard"}">
            <span class="material-symbols-outlined">dashboard</span>
            <span class="nav-tab-label">Dashboard</span>
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="info-gerais"?"active":""}" data-tab="info-gerais" role="tab" aria-selected="${t==="info-gerais"}">
            <span class="material-symbols-outlined">description</span>
            <span class="nav-tab-label">Informações Gerais</span>
          </button>
        </li>

        <li class="nav-section-title">Módulo DIST</li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="visao-geral"?"active":""}" data-tab="visao-geral" role="tab" aria-selected="${t==="visao-geral"}">
            <span class="material-symbols-outlined">visibility</span>
            <span class="nav-tab-label">Visão Geral do Projeto</span>
            ${r&&!r.distHabilitado?'<span class="nav-tab-badge" title="Módulo DIST desabilitado para este projeto">Inativo</span>':""}
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="diagnostico"?"active":""}" data-tab="diagnostico" role="tab" aria-selected="${t==="diagnostico"}">
            <span class="material-symbols-outlined">fact_check</span>
            <span class="nav-tab-label">Diagnóstico DIST</span>
            ${r&&!r.distHabilitado?'<span class="nav-tab-badge" title="Módulo DIST desabilitado para este projeto">Inativo</span>':""}
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="matriz-riscos"?"active":""}" data-tab="matriz-riscos" role="tab" aria-selected="${t==="matriz-riscos"}">
            <span class="material-symbols-outlined">grid_view</span>
            <span class="nav-tab-label">Matriz de Riscos</span>
            ${r&&!r.distHabilitado?'<span class="nav-tab-badge" title="Módulo DIST desabilitado para este projeto">Inativo</span>':""}
          </button>
        </li>

        <li class="nav-section-title">Portfólio & Auditoria</li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="projetos"?"active":""}" data-tab="projetos" role="tab" aria-selected="${t==="projetos"}">
            <span class="material-symbols-outlined">folder_open</span>
            <span class="nav-tab-label">Projetos</span>
          </button>
        </li>

        <li class="nav-tab-item" role="presentation">
          <button type="button" class="nav-tab-link ${t==="historico"?"active":""}" data-tab="historico" role="tab" aria-selected="${t==="historico"}">
            <span class="material-symbols-outlined">history</span>
            <span class="nav-tab-label">Histórico & Auditoria</span>
          </button>
        </li>
      </ul>

      <div class="sidebar-footer">
        <div class="dist-module-pill ${o===!0?"active":"inactive"}" title="${o===!0?"Módulo DIST ativo no projeto selecionado":"Selecione um projeto com DIST ativo"}">
          <span class="dist-indicator-dot"></span>
          <span>${o===!0?"DIST Habilitado":r?"DIST Não Habilitado":"Sem Projeto Ativo"}</span>
        </div>
      </div>
    `,n.querySelectorAll(".nav-tab-link").forEach(u=>{u.addEventListener("click",h=>{const f=u.getAttribute("data-tab");zt(()=>{Ot(f)})})});const a=n.querySelector("#btn-toggle-sidebar");a&&a.addEventListener("click",()=>{uh()});const c=n.querySelector("#brand-link");c&&c.addEventListener("click",u=>{u.preventDefault(),zt(()=>Ot("dashboard"))})};e(),_t("tabChange",e),_t("projectChange",e),_t("sidebarChange",()=>{const{sidebarCollapsed:t}=oe(),r=document.getElementById("app");t?r.classList.add("sidebar-collapsed"):r.classList.remove("sidebar-collapsed"),e()})}const cc=[{uid:"usr_01_dist_gestor",nome:"Carlos Silva (DIST)",email:"carlos.silva@detran.sp.gov.br",perfil:"gestor_dist"},{uid:"usr_02_admin",nome:"Administrador do Sistema",email:"admin@detran.sp.gov.br",perfil:"admin"},{uid:"usr_03_editor",nome:"Mariana Costa (DSV)",email:"mariana.costa@detran.sp.gov.br",perfil:"editor"},{uid:"usr_04_leitor",nome:"Consulta Somente Leitura",email:"leitor@detran.sp.gov.br",perfil:"leitor"}];async function o_(){const n=document.getElementById("header-container");if(!n)return;const e=async()=>{const{activeTab:t,activeProject:r,activeProjectId:s,currentUser:o}=oe(),a=await Ne.listarProjetos(),u={dashboard:"Dashboard Executivo","info-gerais":"Informações Gerais do Projeto","visao-geral":"Visão Geral do Projeto",projetos:"Gestão de Projetos Interinstitucionais",diagnostico:"Diagnóstico DIST","matriz-riscos":"Matriz de Riscos 3x3",historico:"Histórico & Trilha de Auditoria"}[t]||"Painel de Acompanhamento";n.innerHTML=`
      <div class="header-left">
        <div>
          <span style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); font-weight: var(--font-weight-bold); letter-spacing: 0.5px;">
            Acompanhamento • DSV
          </span>
          <h2 style="font-size: 16px; font-weight: var(--font-weight-bold); color: var(--text-main); margin-top: 2px;">
            ${u}
          </h2>
        </div>
      </div>

      <div class="header-right">
        <!-- Seletor de Projeto Ativo -->
        <div class="project-active-selector" title="Selecione o projeto ativo para filtrar as abas">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 18px;">folder</span>
          <select id="select-active-project" class="project-selector-dropdown" aria-label="Selecione o projeto ativo">
            <option value="">-- Selecionar Projeto --</option>
            ${a.map(v=>`
              <option value="${v.id}" ${v.id===s?"selected":""}>
                ${v.nome} ${v.distHabilitado?"★":""}
              </option>
            `).join("")}
          </select>
          ${r?`
            <span class="badge ${r.distHabilitado?"badge-success":"badge-neutral"}" style="font-size: 10px; padding: 2px 6px;">
              ${r.distHabilitado?"DIST Ativo":"DIST Inativo"}
            </span>
          `:""}
        </div>

        <!-- Perfil do Usuário e Seletor de Simulação de Papel -->
        <div class="user-profile-badge">
          <span class="material-symbols-outlined" style="color: var(--text-secondary); font-size: 20px;">account_circle</span>
          <div style="display: flex; flex-direction: column; text-align: left;">
            <select id="select-user-role" style="border: none; background: transparent; font-weight: var(--font-weight-semibold); font-size: 12px; color: var(--text-main); cursor: pointer; outline: none;" aria-label="Simular usuário e perfil">
              ${cc.map(v=>`
                <option value="${v.uid}" ${v.uid===(o==null?void 0:o.uid)?"selected":""}>
                  ${v.nome} (${v.perfil.toUpperCase()})
                </option>
              `).join("")}
            </select>
          </div>
          <span class="role-tag">${o==null?void 0:o.perfil}</span>
        </div>
      </div>
    `;const h=n.querySelector("#select-active-project");h&&h.addEventListener("change",v=>{const E=v.target.value;zt(async()=>{if(!E)Ze(null);else{const T=await Ne.obterPorId(E);Ze(T)}})});const f=n.querySelector("#select-user-role");f&&f.addEventListener("change",v=>{const E=v.target.value,T=cc.find(R=>R.uid===E);T&&dh(T)})};await e(),_t("tabChange",e),_t("projectChange",e),_t("userChange",e)}const wi="diagnosticos",a_={em_estruturacao:"Em estruturação",em_andamento:"Em andamento",requer_atencao:"Requer atenção",requer_decisao_estrategica:"Requer decisão estratégica",concluido:"Concluído"},Ki={async obterPorProjeto(n){if(!n)return null;const e=await ve.getByProjetoId(wi,n);if(e.length===0)return null;const t=e[0];return t.classificacao==="estavel"&&(t.classificacao="em_andamento"),t},async listarTodos(){return(await ve.getAll(wi)).map(e=>({...e,classificacao:e.classificacao==="estavel"?"em_andamento":e.classificacao}))},async salvarDiagnostico(n,e){if(!n.projetoId)throw new Error("Identificador do projeto é obrigatório para cadastrar diagnóstico.");const t=new Date().toISOString(),r=await this.obterPorProjeto(n.projetoId),s={...n,id:r?r.id:n.id||`diag_${n.projetoId}`,atualizadoEm:t,atualizadoPor:{uid:(e==null?void 0:e.uid)||"anonimo",nome:(e==null?void 0:e.nome)||"Usuário",email:(e==null?void 0:e.email)||""}},o=await ve.save(wi,s),a=a_[o.classificacao]||o.classificacao;return await Ge.registrarLog({usuario:e,acao:"SALVAR_DIAGNOSTICO",entidade:"diagnostico",entidadeId:o.id,projetoId:o.projetoId,detalhes:`Diagnóstico DIST atualizado. Classificação: "${a}".`}),o}},Gr="riscos";function Ts(n,e){const t=Math.max(1,Math.min(3,parseInt(n,10)||1)),r=Math.max(1,Math.min(3,parseInt(e,10)||1)),s=t*r;let o="Baixo";return s>=6?o="Alto":s>=3?o="Moderado":o="Baixo",{pontuacao:s,classificacao:o,p:t,i:r}}const Vt={async listarPorProjeto(n){return n?(await ve.getByProjetoId(Gr,n)).sort((t,r)=>(t.numero||0)-(r.numero||0)):[]},async listarTodos(){return await ve.getAll(Gr)},async salvarRisco(n,e){if(!n.projetoId)throw new Error("Todo risco deve estar obrigatoriamente vinculado a um projeto.");const{pontuacao:t,classificacao:r,p:s,i:o}=Ts(n.probabilidade,n.impacto),a=!n.id,c=new Date().toISOString();let u=n.numero;a&&(u=(await this.listarPorProjeto(n.projetoId)).reduce((T,R)=>Math.max(T,R.numero||0),0)+1);const h={...n,numero:u,probabilidade:s,impacto:o,pontuacao:t,classificacao:r,atualizadoEm:c,atualizadoPor:{uid:(e==null?void 0:e.uid)||"anonimo",nome:(e==null?void 0:e.nome)||"Usuário"}};a&&(h.criadoEm=c,h.criadoPor=h.atualizadoPor);const f=await ve.save(Gr,h);return await Ge.registrarLog({usuario:e,acao:a?"CRIAR_RISCO":"EDITAR_RISCO",entidade:"risco",entidadeId:f.id,projetoId:f.projetoId,detalhes:`Risco #${f.numero} "${f.titulo}" ${a?"cadastrado":"atualizado"} (P:${f.probabilidade}, I:${f.impacto}, Pontuação:${f.pontuacao} - ${f.classificacao}).`}),f},async excluirRisco(n,e){const r=(await this.listarTodos()).find(s=>s.id===n);return r?(await ve.remove(Gr,n),await Ge.registrarLog({usuario:e,acao:"EXCLUIR_RISCO",entidade:"risco",entidadeId:n,projetoId:r.projetoId,detalhes:`Risco #${r.numero} "${r.titulo}" foi excluído.`}),!0):!1}};async function Ad(n){n.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 12px;">
      <div>
        <h1 class="page-title">Painel de Acompanhamento</h1>
        <p class="subtitle">Visão consolidada de projetos interinstitucionais, diagnósticos e exposição a riscos.</p>
      </div>
      <button type="button" class="btn btn-primary" id="btn-novo-projeto-dash">
        <span class="material-symbols-outlined">add</span> Novo Projeto
      </button>
    </div>

    <!-- Grid de KPIs Principais -->
    <div class="kpi-grid">
      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Projetos Acompanhados</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">folder</span></div>
        </div>
        <div class="kpi-value" id="kpi-total-projetos">...</div>
        <div class="kpi-desc">Total de projetos cadastrados no portfólio</div>
      </div>

      <div class="kpi-card kpi-warning">
        <div class="kpi-header">
          <span class="kpi-label">Requerem Atenção</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">priority_high</span></div>
        </div>
        <div class="kpi-value" id="kpi-projetos-atencao">...</div>
        <div class="kpi-desc">Classificados como "Requer atenção" ou "Decisão estratégica"</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-header">
          <span class="kpi-label">Riscos Mapeados</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">grid_view</span></div>
        </div>
        <div class="kpi-value" id="kpi-total-riscos">...</div>
        <div class="kpi-desc">Total de riscos catalogados na Matriz</div>
      </div>

      <div class="kpi-card kpi-danger">
        <div class="kpi-header">
          <span class="kpi-label">Riscos Altos</span>
          <div class="kpi-icon-wrap"><span class="material-symbols-outlined">warning</span></div>
        </div>
        <div class="kpi-value" id="kpi-riscos-altos">...</div>
        <div class="kpi-desc">Riscos de alta severidade (Score 6 ou 9)</div>
      </div>
    </div>

    <!-- Seção de Portfólio e Exposição a Riscos -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(360px, 1fr)); gap: 20px; margin-bottom: 24px;">
      
      <!-- Card: Situação do Portfólio -->
      <div class="card">
        <div class="card-header">
          <div class="card-title-group">
            <span class="material-symbols-outlined">donut_large</span>
            <h3 class="card-title">Situação do Portfólio</h3>
          </div>
          <span class="tag" id="tag-total-port">...</span>
        </div>

        <div id="portfolio-chart-container" style="display: flex; flex-direction: column; gap: 10px; margin-top: 10px;">
          <!-- Barras de distribuição geradas via JS -->
        </div>
      </div>

      <!-- Card: Exposição a Riscos -->
      <div class="card">
        <div class="card-header">
          <div class="card-title-group">
            <span class="material-symbols-outlined">analytics</span>
            <h3 class="card-title">Exposição a Riscos</h3>
          </div>
          <span class="tag" id="tag-proporcao-altos">...</span>
        </div>

        <div id="risk-exposure-container" style="display: flex; flex-direction: column; gap: 14px; margin-top: 10px;">
          <!-- Estatísticas de riscos geradas via JS -->
        </div>
      </div>
    </div>

    <!-- Tabela do Portfólio com Ação Inteligente -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">view_list</span>
          <h3 class="card-title">Projetos em Acompanhamento</h3>
        </div>
        <span style="font-size: 12px; color: var(--text-muted);">
          Clique em uma linha para abrir a Visão Geral (módulo DIST ativo) ou Informações Gerais (inativo)
        </span>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="table-dashboard-projects">
          <thead>
            <tr>
              <th>Nome do Projeto</th>
              <th>Entes Externos</th>
              <th>Módulo DIST</th>
              <th>Situação (Diagnóstico)</th>
              <th style="text-align: center;">Riscos</th>
              <th style="text-align: right;">Ação</th>
            </tr>
          </thead>
          <tbody id="tbody-dashboard-projects">
            <tr><td colspan="6" style="text-align: center; padding: 24px;">Carregando projetos...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;const[e,t,r]=await Promise.all([Ne.listarProjetos(),Ki.listarTodos(),Vt.listarTodos()]),s=e.length,o=new Map(t.map(m=>[m.projetoId,m]));let a=0,c=0,u=0,h=0,f=0,v=0;e.forEach(m=>{const g=o.get(m.id);!g||!g.classificacao?v++:g.classificacao==="em_estruturacao"?a++:g.classificacao==="em_andamento"||g.classificacao==="estavel"?c++:g.classificacao==="requer_atencao"?u++:g.classificacao==="requer_decisao_estrategica"?h++:g.classificacao==="concluido"?f++:v++});const E=u+h,T=r.length,R=r.filter(m=>m.classificacao==="Alto").length,P=r.filter(m=>m.classificacao==="Moderado").length,x=r.filter(m=>m.classificacao==="Baixo").length,U=T>0?Math.round(R/T*100):0;document.getElementById("kpi-total-projetos").textContent=s,document.getElementById("kpi-projetos-atencao").textContent=E,document.getElementById("kpi-total-riscos").textContent=T,document.getElementById("kpi-riscos-altos").textContent=R,document.getElementById("tag-total-port").textContent=`${s} projetos`,document.getElementById("tag-proporcao-altos").textContent=`${U}% alta criticidade`;const N=m=>s>0?Math.round(m/s*100):0,L=(m,g,_,I)=>`
    <div style="display: flex; flex-direction: column; gap: 4px;">
      <div style="display: flex; justify-content: space-between; font-size: 12px;">
        <span style="font-weight: var(--font-weight-semibold); color: var(--text-main);">${m}</span>
        <span style="font-weight: var(--font-weight-bold);">${g} (${I}%)</span>
      </div>
      <div style="width: 100%; height: 8px; background: #e2e8f0; border-radius: 999px; overflow: hidden;">
        <div style="width: ${I}%; height: 100%; border-radius: 999px; background-color: ${_};"></div>
      </div>
    </div>
  `,F=document.getElementById("portfolio-chart-container");F.innerHTML=`
    ${L("Em estruturação",a,"#0284c7",N(a))}
    ${L("Em andamento",c,"var(--color-success)",N(c))}
    ${L("Requer atenção",u,"var(--color-warning)",N(u))}
    ${L("Requer decisão estratégica",h,"var(--color-danger)",N(h))}
    ${L("Concluído",f,"#4338ca",N(f))}
    ${L("Pendente de Diagnóstico",v,"var(--color-neutral)",N(v))}
  `;const k=document.getElementById("risk-exposure-container");k.innerHTML=`
    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; text-align: center;">
      <div style="padding: 12px; background: var(--color-success-bg); border-radius: 8px; border: 1px solid var(--color-success-border);">
        <div style="font-size: 18px; font-weight: var(--font-weight-extrabold); color: var(--color-success);">${x}</div>
        <div style="font-size: 11px; font-weight: var(--font-weight-bold); text-transform: uppercase; color: var(--color-success);">Baixos</div>
      </div>
      <div style="padding: 12px; background: var(--color-warning-bg); border-radius: 8px; border: 1px solid var(--color-warning-border);">
        <div style="font-size: 18px; font-weight: var(--font-weight-extrabold); color: var(--color-warning);">${P}</div>
        <div style="font-size: 11px; font-weight: var(--font-weight-bold); text-transform: uppercase; color: var(--color-warning);">Moderados</div>
      </div>
      <div style="padding: 12px; background: var(--color-danger-bg); border-radius: 8px; border: 1px solid var(--color-danger-border);">
        <div style="font-size: 18px; font-weight: var(--font-weight-extrabold); color: var(--color-danger);">${R}</div>
        <div style="font-size: 11px; font-weight: var(--font-weight-bold); text-transform: uppercase; color: var(--color-danger);">Altos</div>
      </div>
    </div>

    <!-- Barra composta de proporção -->
    <div style="margin-top: 10px;">
      <div style="font-size: 12px; color: var(--text-secondary); margin-bottom: 6px; display: flex; justify-content: space-between;">
        <span>Composição do Perfil de Risco</span>
        <span style="font-weight: var(--font-weight-bold);">${T} riscos no total</span>
      </div>
      <div style="display: flex; height: 12px; border-radius: 999px; overflow: hidden; background: #e2e8f0;">
        <div style="width: ${T>0?x/T*100:0}%; background: var(--color-success);" title="Baixos: ${x}"></div>
        <div style="width: ${T>0?P/T*100:0}%; background: var(--color-warning);" title="Moderados: ${P}"></div>
        <div style="width: ${T>0?R/T*100:0}%; background: var(--color-danger);" title="Altos: ${R}"></div>
      </div>
      <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--text-muted); margin-top: 4px;">
        <span>Baixo (${T>0?Math.round(x/T*100):0}%)</span>
        <span>Moderado (${T>0?Math.round(P/T*100):0}%)</span>
        <span>Alto (${U}%)</span>
      </div>
    </div>
  `;const O=document.getElementById("tbody-dashboard-projects");if(e.length===0)O.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">Nenhum projeto cadastrado no momento.</td></tr>';else{O.innerHTML=e.map(g=>{const _=o.get(g.id),I=r.filter(pe=>pe.projetoId===g.id),w=I.filter(pe=>pe.classificacao==="Alto").length,y=Array.isArray(g.entesExternos)&&g.entesExternos.length>0?g.entesExternos.join(", "):"Não informado";let se='<span class="badge badge-neutral">Pendente</span>';return _&&_.classificacao&&(_.classificacao==="em_estruturacao"?se='<span class="badge" style="background: #e0f2fe; color: #0369a1;">Em estruturação</span>':_.classificacao==="em_andamento"||_.classificacao==="estavel"?se='<span class="badge badge-success">Em andamento</span>':_.classificacao==="requer_atencao"?se='<span class="badge badge-warning">Requer atenção</span>':_.classificacao==="requer_decisao_estrategica"?se='<span class="badge badge-danger">Decisão estratégica</span>':_.classificacao==="concluido"&&(se='<span class="badge" style="background: #e0e7ff; color: #3730a3;">Concluído</span>')),`
        <tr style="cursor: pointer;" data-proj-id="${g.id}" class="row-dashboard-project">
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--color-primary);">${g.nome}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">${g.descricao||g.objetivo||""}</div>
          </td>
          <td style="max-width: 160px; font-size: 12px; color: var(--text-secondary);">${y}</td>
          <td>
            <span class="badge ${g.distHabilitado?"badge-success":"badge-neutral"}">
              ${g.distHabilitado?"Habilitado":"Desabilitado"}
            </span>
          </td>
          <td>${se}</td>
          <td style="text-align: center;">
            <span style="font-weight: var(--font-weight-semibold);">${I.length}</span>
            ${w>0?`<span class="badge badge-danger" style="margin-left: 6px; font-size: 10px;">${w} altos</span>`:""}
          </td>
          <td style="text-align: right;">
            <button type="button" class="btn btn-secondary btn-sm btn-open-project" data-proj-id="${g.id}">
              <span>Acessar</span>
              <span class="material-symbols-outlined" style="font-size: 14px;">arrow_forward</span>
            </button>
          </td>
        </tr>
      `}).join("");const m=g=>{const _=e.find(I=>I.id===g);_&&zt(()=>{Ze(_),_.distHabilitado?Ot("visao-geral"):Ot("info-gerais")})};n.querySelectorAll(".row-dashboard-project").forEach(g=>{g.addEventListener("click",()=>{const _=g.getAttribute("data-proj-id");m(_)})}),n.querySelectorAll(".btn-open-project").forEach(g=>{g.addEventListener("click",_=>{_.stopPropagation();const I=g.getAttribute("data-proj-id");m(I)})})}const b=n.querySelector("#btn-novo-projeto-dash");b&&b.addEventListener("click",()=>{zt(()=>{Ot("projetos"),window.__ABRIR_MODAL_NOVO_PROJETO=!0})})}function ne(n,e="info",t=4e3){const r=document.getElementById("toast-container");if(!r)return;const s=document.createElement("div");s.className=`toast toast-${e}`,s.setAttribute("role","alert");const a={success:"check_circle",warning:"warning",danger:"error",info:"info"}[e]||"info";s.innerHTML=`
    <span class="material-symbols-outlined toast-icon" aria-hidden="true">${a}</span>
    <div class="toast-message">${n}</div>
    <button type="button" class="btn-close-modal" aria-label="Fechar notificação" style="margin-left: auto; width: 24px; height: 24px;">
      <span class="material-symbols-outlined" style="font-size: 16px;">close</span>
    </button>
  `;const c=s.querySelector("button"),u=()=>{s.style.opacity="0",s.style.transform="translateX(100%)",setTimeout(()=>{s.parentNode&&s.parentNode.removeChild(s)},250)};c.addEventListener("click",u),r.appendChild(s),t>0&&setTimeout(u,t)}const l_=["DIST - Divisão de Integração Setorial","DSV - Diretoria de Segurança Veicular","CGIT - Coordenação Geral de Infraestrutura e Tecnologia","CGEST - Coordenação Geral de Estratégia","DTI - Diretoria de Tecnologia da Informação","COORD - Coordenadorias Regionais","Presidência / Gabinete"];let Sd=[...l_];function br(){return[...Sd]}function Rd(){const n=[...Sd];return n.includes("Compartilhada / interáreas")||n.push("Compartilhada / interáreas"),n}async function Pd(n){var s;const{activeProject:e}=oe();ws();const t=br();if(!e){n.innerHTML=`
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <div>
          <h1 class="page-title">Informações Gerais</h1>
          <p class="subtitle">Cadastre um novo projeto institucional ou selecione um existente no cabeçalho.</p>
        </div>
      </div>

      <div class="card" style="padding: 32px 24px; text-align: center; max-width: 600px; margin: 40px auto;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-primary); margin-bottom: 12px;">folder_special</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Cadastrar Novo Projeto</h2>
        <p style="color: var(--text-secondary); font-size: 13.5px; line-height: 1.5; margin-bottom: 24px;">
          Nenhum projeto está selecionado no momento. Você pode iniciar o cadastro básico de um novo projeto institucional preenchendo as informações gerais abaixo.
        </p>
        <button type="button" class="btn btn-primary" id="btn-iniciar-novo-proj">
          <span class="material-symbols-outlined">add</span> Iniciar Novo Projeto
        </button>
      </div>
    `,(s=n.querySelector("#btn-iniciar-novo-proj"))==null||s.addEventListener("click",()=>{uc(n,{nome:"",areaGestora:t[0]||"DSV - Diretoria de Segurança Veicular",descricao:"",distHabilitado:!0,isNovo:!0})});return}const r=await Ne.obterPorId(e.id)||e;uc(n,r)}function uc(n,e){var c;const t=!!e.isNovo,r=ws(),s=br();n.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">${t?"Cadastrar Novo Projeto":e.nome}</h1>
          ${t?"":`
            <span class="badge ${e.distHabilitado?"badge-success":"badge-neutral"}">
              ${e.distHabilitado?"Módulo DIST Habilitado":"Módulo DIST Desabilitado"}
            </span>
          `}
        </div>
        <p class="subtitle">Informações cadastrais essenciais do projeto institucional DSV.</p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-salvar-info-gerais">
          <span class="material-symbols-outlined">save</span> ${t?"Gravar Novo Projeto":"Gravar Informações"}
        </button>
      </div>
    </div>

    <!-- Banner Informativo da Regra do Módulo DIST -->
    ${!t&&!e.distHabilitado?`
      <div class="banner-warning" style="margin-bottom: 24px;">
        <span class="material-symbols-outlined" style="font-size: 24px;">info</span>
        <div>
          <strong>Módulo DIST Desativado:</strong> As páginas analíticas (Visão Geral do Projeto, Diagnóstico DIST e Matriz de Riscos) estão desabilitadas para este projeto. Suas informações gerais permanecem ativas e incluídas no Dashboard.
        </div>
      </div>
    `:""}

    <form id="form-info-gerais" class="card" style="display: flex; flex-direction: column; gap: 20px;">
      <div class="card-header" style="padding-bottom: 12px; margin-bottom: 0;">
        <div class="card-title-group">
          <span class="material-symbols-outlined">badge</span>
          <h3 class="card-title">Cadastro Básico do Projeto</h3>
        </div>
        <span style="font-size: 11.5px; color: var(--text-muted);">Campos com * são de preenchimento obrigatório</span>
      </div>

      <!-- Nome do Projeto -->
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="info-nome">Nome do Projeto <span class="required">*</span></label>
        <input type="text" id="info-nome" class="form-input" value="${e.nome||""}" required placeholder="Ex: Modernização do Sistema de Fiscalização">
        <span class="form-hint">Deve identificar o projeto no menu, no cabeçalho e no Dashboard. É sincronizado com a Visão Geral.</span>
      </div>

      <!-- Área Gestora -->
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="info-area-gestora">Área Gestora (Detran/DSV) <span class="required">*</span></label>
        <select id="info-area-gestora" class="form-select" required>
          ${s.map(u=>`
            <option value="${u}" ${u===(e.areaGestora||"DIST - Divisão de Integração Setorial")?"selected":""}>${u}</option>
          `).join("")}
        </select>
        <span class="form-hint">Seleção da unidade gestora a partir do cadastro institucional padronizado.</span>
      </div>

      <!-- Descrição -->
      <div class="form-group" style="margin-bottom: 0;">
        <label class="form-label" for="info-descricao">Descrição do Projeto <span class="required">*</span></label>
        <textarea id="info-descricao" class="form-textarea" rows="4" required placeholder="Apresente resumidamente a proposta, justificativa e o contexto institucional deste projeto...">${e.descricao||""}</textarea>
        <span class="form-hint">Texto descritivo consolidado com a síntese das ações institucionais.</span>
      </div>

      <!-- Utilizar Módulo DIST -->
      <div style="background: var(--bg-hover-subtle); padding: 16px; border-radius: var(--radius-button); border: 1px solid var(--border-color); margin-top: 6px;">
        <label class="custom-checkbox-label">
          <input type="checkbox" id="info-dist-habilitado" class="custom-checkbox" 
            ${e.distHabilitado!==!1?"checked":""} 
            ${r?"":"disabled"}>
          <span style="font-weight: var(--font-weight-bold); font-size: 13.5px; color: var(--text-main);">
            Utilizar módulo de acompanhamento DIST
          </span>
        </label>
        <p style="font-size: 12px; color: var(--text-secondary); margin-top: 6px; margin-left: 28px; line-height: 1.5;">
          Quando habilitada, disponibiliza a <strong>Visão Geral do Projeto</strong>, o <strong>Diagnóstico DIST</strong> e a <strong>Matriz de Riscos</strong>. Quando desabilitada, mantém disponíveis as Informações Gerais e sua participação no Dashboard. A desativação preserva integralmente os registros já realizados.
          ${r?"":'<br><strong style="color: var(--color-warning);">* Apenas perfis autorizados (Administrador ou Gestor DIST) podem alterar esta configuração.</strong>'}
        </p>
      </div>

      <!-- Rodapé com Metadados de Auditoria -->
      ${t?"":`
        <div style="display: flex; justify-content: space-between; align-items: center; padding-top: 16px; border-top: 1px solid var(--border-color-light); font-size: 11.5px; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
          <div>
            Última gravação: <strong>${e.atualizadoEm?new Date(e.atualizadoEm).toLocaleString("pt-BR"):"Não registrada"}</strong>
            ${(c=e.atualizadoPor)!=null&&c.nome?` por <strong>${e.atualizadoPor.nome}</strong>`:""}
          </div>
          <div>ID: <code>${e.id}</code></div>
        </div>
      `}
    </form>
  `;const o=n.querySelector("#form-info-gerais"),a=n.querySelector("#btn-salvar-info-gerais");o.querySelectorAll("input, select, textarea").forEach(u=>{u.addEventListener("input",()=>De(!0)),u.addEventListener("change",()=>De(!0))}),a.addEventListener("click",async()=>{const u=n.querySelector("#info-nome").value.trim();if(!u){ne("O nome do projeto é obrigatório.","warning"),n.querySelector("#info-nome").focus();return}const h=n.querySelector("#info-area-gestora").value,f=n.querySelector("#info-descricao").value.trim(),v=n.querySelector("#info-dist-habilitado"),E=v?v.checked:!0;try{a.disabled=!0,a.innerHTML='<span class="material-symbols-outlined">hourglass_empty</span> Gravando...';const{currentUser:T}=oe(),R={...e,nome:u,areaGestora:h,descricao:f,distHabilitado:E};t&&delete R.isNovo;const P=await Ne.salvarProjeto(R,T);Ze(P),De(!1),ne("Informações gerais do projeto gravadas com sucesso!","success"),Pd(n)}catch(T){ne(`Erro ao gravar: ${T.message}`,"danger")}finally{a.disabled=!1,a.innerHTML=`<span class="material-symbols-outlined">save</span> ${t?"Gravar Novo Projeto":"Gravar Informações"}`}})}const Wr="contatos",c_=/^[^\s@]+@[^\s@]+\.[^\s@]+$/,$n={validarEmail(n){return!n||typeof n!="string"?!1:c_.test(n.trim())},async listarPorProjeto(n){return n?(await ve.getByProjetoId(Wr,n)).sort((t,r)=>(t.nome||"").localeCompare(r.nome||"")):[]},async obterPorId(n){return n?await ve.getById(Wr,n):null},async salvarContato(n,e){var f,v,E,T;if(!n.projetoId)throw new Error("Identificador do projeto é obrigatório para cadastrar contato.");const t=(f=n.nome)==null?void 0:f.trim();if(!t)throw new Error("O nome do contato é obrigatório.");const r=(v=n.email)==null?void 0:v.trim().toLowerCase();if(!r)throw new Error("O e-mail institucional é obrigatório.");if(!this.validarEmail(r))throw new Error("Formato de e-mail inválido. Utilize um endereço válido como nome@detran.sp.gov.br.");const o=(await this.listarPorProjeto(n.projetoId)).find(R=>{var P;return((P=R.email)==null?void 0:P.toLowerCase())===r&&R.id!==n.id});if(o)throw new Error(`O e-mail "${r}" já está cadastrado para o contato "${o.nome}" neste projeto.`);const a=!n.id,c=new Date().toISOString(),u={...n,nome:t,email:r,cargo:((E=n.cargo)==null?void 0:E.trim())||"",area:((T=n.area)==null?void 0:T.trim())||"",atualizadoEm:c,atualizadoPor:{uid:(e==null?void 0:e.uid)||"anonimo",nome:(e==null?void 0:e.nome)||"Usuário"}};a&&(u.criadoEm=c,u.criadoPor=u.atualizadoPor);const h=await ve.save(Wr,u);return await Ge.registrarLog({usuario:e,acao:a?"CRIAR_CONTATO":"EDITAR_CONTATO",entidade:"contato",entidadeId:h.id,projetoId:h.projetoId,detalhes:`Contato "${h.nome}" (${h.email}) ${a?"cadastrado":"atualizado"} no projeto.`}),h},async excluirContato(n,e){const t=await this.obterPorId(n);return t?(await ve.remove(Wr,n),await Ge.registrarLog({usuario:e,acao:"EXCLUIR_CONTATO",entidade:"contato",entidadeId:n,projetoId:t.projetoId,detalhes:`Contato "${t.nome}" (${t.email}) foi removido do projeto.`}),!0):!1}};async function Cd(n){const{activeProject:e}=oe();if(!e){n.innerHTML=`
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto no cabeçalho ou na aba "Projetos" para visualizar a visão geral do projeto.</p>
        </div>
      </div>
    `;return}if(!e.distHabilitado){n.innerHTML=`
      <div class="card" style="text-align: center; padding: 40px 24px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-warning); margin-bottom: 12px;">lock</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Módulo DIST Não Habilitado</h2>
        <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 20px; line-height: 1.5;">
          A Visão Geral do Projeto está disponível apenas para projetos com o módulo de acompanhamento DIST ativo.
          O projeto <strong>"${e.nome}"</strong> pode ser configurado na aba "Projetos" por um usuário autorizado.
        </p>
        <span class="badge badge-neutral">Módulo DIST Desativado</span>
      </div>
    `;return}const t=await Ne.obterPorId(e.id)||e,r=await $n.listarPorProjeto(t.id),s=br(),o=new Set(Array.isArray(t.areasDetranEnvolvidas)?t.areasDetranEnvolvidas:[]),a=Array.isArray(t.entesExternos)&&t.entesExternos.length>0?t.entesExternos.join(", "):t.entesExternos||"Nenhum informado";n.innerHTML=`
    <!-- Cabeçalho Limpo e Arejado (Abordagem Clean) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">${t.nome}</h1>
          <span class="badge badge-success">Módulo DIST Ativo</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text-muted); flex-wrap: wrap;">
          <span>Área Gestora: <strong style="color: var(--text-main);">${t.areaGestora||"DSV"}</strong></span>
          <span>•</span>
          <span>Entes Externos: <strong style="color: var(--text-main);">${a}</strong></span>
        </div>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-gravar-info-projeto">
          <span class="material-symbols-outlined">save</span> Gravar Informações
        </button>
      </div>
    </div>

    <!-- BLOCO 1: Informações do Projeto -->
    <div class="card" style="margin-bottom: 24px;">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">assignment</span>
          <h3 class="card-title">Informações do Projeto & Escopo</h3>
        </div>
      </div>

      <form id="form-visao-geral" style="display: flex; flex-direction: column; gap: 20px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="vg-nome">Nome do Projeto <span class="required">*</span></label>
          <input type="text" id="vg-nome" class="form-input" value="${t.nome||""}" required placeholder="Nome oficial do projeto">
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="vg-entes">Entes Externos Envolvidos</label>
            <input type="text" id="vg-entes" class="form-input" 
              value="${Array.isArray(t.entesExternos)?t.entesExternos.join(", "):t.entesExternos||""}" 
              placeholder="Ex: CET, DER, Polícia Rodoviária (separar por vírgula)">
            <span class="form-hint">Órgãos públicos ou entidades parceiras externas.</span>
          </div>

          <!-- Caixa Expansível de Áreas Detran Envolvidas -->
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label">Áreas Detran Envolvidas</label>
            <div class="expandable-select" id="vg-areas-expandable">
              <button type="button" class="expandable-select-trigger" id="vg-trigger-areas" aria-haspopup="listbox" aria-expanded="false">
                <span class="trigger-text" id="vg-trigger-text">Selecione as áreas envolvidas...</span>
                <span class="trigger-count" id="vg-trigger-count" style="display: none;">0</span>
                <span class="material-symbols-outlined trigger-icon">expand_more</span>
              </button>

              <div class="expandable-select-dropdown" id="vg-dropdown-areas">
                <div class="expandable-select-actions">
                  <span style="font-weight: var(--font-weight-bold); color: var(--text-secondary);">Catálogo Institucional</span>
                  <div style="display: flex; gap: 6px; align-items: center;">
                    <button type="button" class="expandable-select-btn-action" id="vg-btn-marcar-todas">Marcar todas</button>
                    <span style="color: #cbd5e1;">|</span>
                    <button type="button" class="expandable-select-btn-action" id="vg-btn-limpar-todas">Limpar</button>
                  </div>
                </div>

                <div class="expandable-select-list">
                  ${s.map(k=>{const O=o.has(k);return`
                      <label class="expandable-select-item ${O?"is-selected":""}" data-area="${k}">
                        <input type="checkbox" value="${k}" ${O?"checked":""}>
                        <span>${k}</span>
                      </label>
                    `}).join("")}
                </div>
              </div>
            </div>

            <!-- Tags interativas removíveis das áreas selecionadas -->
            <div class="selected-tags-wrap" id="vg-selected-tags"></div>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="vg-inicio">Data ou Período de Início</label>
            <input type="text" id="vg-inicio" class="form-input" 
              value="${t.dataInicio||""}" 
              placeholder="Ex: 2026-02-01 ou '1º semestre de 2026'">
            <span class="form-hint">Aceita data específica (AAAA-MM-DD) ou período estimado.</span>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="vg-fim">Previsão de Encerramento</label>
            <input type="text" id="vg-fim" class="form-input" 
              value="${t.previsaoEncerramento||""}" 
              placeholder="Ex: 2026-12-15 ou 'Dezembro de 2026'">
            <span class="form-hint">Quando houver datas exatas, a conclusão não pode ser anterior ao início.</span>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="vg-objetivo">Objetivo do Projeto</label>
          <textarea id="vg-objetivo" class="form-textarea" rows="3" placeholder="Descreva os resultados pretendidos com o projeto...">${t.objetivo||""}</textarea>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="vg-escopo">Escopo do Projeto</label>
          <textarea id="vg-escopo" class="form-textarea" rows="4" placeholder="Descreva as atividades, entregas e limites do projeto...">${t.escopo||""}</textarea>
        </div>
      </form>
    </div>

    <!-- BLOCO 2: Pontos Focais e Contatos -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">contact_phone</span>
          <h3 class="card-title">Pontos Focais e Contatos Institucionais</h3>
        </div>
        <button type="button" class="btn btn-secondary btn-sm" id="btn-novo-contato">
          <span class="material-symbols-outlined">person_add</span> Cadastrar Contato
        </button>
      </div>

      <div id="contatos-container">
        <!-- Renderizado dinamicamente -->
      </div>
    </div>
  `;const c=n.querySelector("#vg-areas-expandable"),u=n.querySelector("#vg-trigger-areas"),h=n.querySelector("#vg-trigger-text"),f=n.querySelector("#vg-trigger-count"),v=n.querySelector("#vg-dropdown-areas"),E=n.querySelector("#vg-selected-tags"),T=n.querySelector("#vg-btn-marcar-todas"),R=n.querySelector("#vg-btn-limpar-todas"),P=()=>{const k=o.size;if(k===0)h.textContent="Selecione as áreas envolvidas...",h.classList.add("placeholder"),f.style.display="none";else if(k===1){const O=Array.from(o)[0];h.textContent=O,h.classList.remove("placeholder"),f.textContent="1",f.style.display="inline-flex"}else h.textContent=`${k} áreas selecionadas`,h.classList.remove("placeholder"),f.textContent=String(k),f.style.display="inline-flex";v.querySelectorAll(".expandable-select-item").forEach(O=>{const b=O.getAttribute("data-area"),m=o.has(b),g=O.querySelector('input[type="checkbox"]');g&&(g.checked=m),m?O.classList.add("is-selected"):O.classList.remove("is-selected")}),k===0?E.innerHTML="":(E.innerHTML=Array.from(o).map(O=>`
        <div class="selected-tag-pill">
          <span>${O}</span>
          <button type="button" class="selected-tag-remove" data-area="${O}" title="Remover ${O}">
            <span class="material-symbols-outlined" style="font-size: 14px;">close</span>
          </button>
        </div>
      `).join(""),E.querySelectorAll(".selected-tag-remove").forEach(O=>{O.addEventListener("click",b=>{b.stopPropagation();const m=O.getAttribute("data-area");o.delete(m),De(!0),P()})}))};u.addEventListener("click",k=>{k.stopPropagation();const O=c.classList.toggle("is-open");u.setAttribute("aria-expanded",O?"true":"false")});const x=k=>{c.contains(k.target)||(c.classList.remove("is-open"),u.setAttribute("aria-expanded","false"))};document.addEventListener("click",x),v.querySelectorAll(".expandable-select-item").forEach(k=>{k.addEventListener("click",O=>{if(O.target.tagName!=="INPUT"){const g=k.querySelector('input[type="checkbox"]');g&&(g.checked=!g.checked)}const b=k.querySelector('input[type="checkbox"]'),m=k.getAttribute("data-area");b.checked?o.add(m):o.delete(m),De(!0),P()})}),T.addEventListener("click",k=>{k.stopPropagation(),s.forEach(O=>o.add(O)),De(!0),P()}),R.addEventListener("click",k=>{k.stopPropagation(),o.clear(),De(!0),P()}),P();const U=k=>{const O=n.querySelector("#contatos-container");if(O){if(k.length===0){O.innerHTML=`
        <div style="text-align: center; padding: 32px 16px; background: var(--bg-hover-subtle); border-radius: var(--radius-card); border: 1px dashed var(--border-color);">
          <span class="material-symbols-outlined" style="font-size: 32px; color: var(--text-muted); margin-bottom: 6px;">contacts</span>
          <div style="font-weight: var(--font-weight-semibold); color: var(--text-main); font-size: 13.5px;">Nenhum contato cadastrado</div>
          <p style="font-size: 12px; color: var(--text-muted); margin-top: 4px;">Clique em "Cadastrar Contato" acima para associar pontos focais a este projeto.</p>
        </div>
      `;return}O.innerHTML=`
      <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(290px, 1fr)); gap: 14px;">
        ${k.map(b=>`
          <div class="card" style="padding: 16px 18px; background: #ffffff; border: 1px solid var(--border-color); display: flex; flex-direction: column; justify-content: space-between; gap: 12px; box-shadow: var(--shadow-sm);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
                <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13.5px;">
                  ${b.nome}
                </div>
                <div style="display: flex; gap: 4px;">
                  <button type="button" class="btn btn-secondary btn-sm btn-editar-contato" data-id="${b.id}" title="Editar contato" style="padding: 3px 6px;">
                    <span class="material-symbols-outlined" style="font-size: 15px;">edit</span>
                  </button>
                  <button type="button" class="btn btn-secondary btn-sm btn-excluir-contato" data-id="${b.id}" title="Remover contato" style="padding: 3px 6px; color: var(--color-danger);">
                    <span class="material-symbols-outlined" style="font-size: 15px;">delete</span>
                  </button>
                </div>
              </div>

              ${b.cargo?`<div style="font-size: 12px; color: var(--text-secondary); margin-top: 2px;">${b.cargo}</div>`:""}
              ${b.area?`<div style="font-size: 11.5px; color: var(--color-primary); font-weight: var(--font-weight-semibold); margin-top: 4px;"><span class="tag" style="font-size: 10.5px;">${b.area}</span></div>`:""}
            </div>

            <div style="border-top: 1px solid var(--border-color-light); padding-top: 10px; font-size: 12px; display: flex; align-items: center; gap: 6px;">
              <span class="material-symbols-outlined" style="font-size: 16px; color: var(--text-muted);">mail</span>
              <a href="mailto:${b.email}" style="color: var(--color-primary); text-decoration: none; word-break: break-all;">
                ${b.email}
              </a>
            </div>
          </div>
        `).join("")}
      </div>
    `,O.querySelectorAll(".btn-editar-contato").forEach(b=>{b.addEventListener("click",()=>{const m=b.getAttribute("data-id"),g=k.find(_=>_.id===m);g&&F(g)})}),O.querySelectorAll(".btn-excluir-contato").forEach(b=>{b.addEventListener("click",async()=>{const m=b.getAttribute("data-id"),g=k.find(_=>_.id===m);if(g&&confirm(`Deseja remover o vínculo do contato "${g.nome}" com este projeto?`)){const{currentUser:_}=oe();await $n.excluirContato(m,_),ne(`Contato "${g.nome}" removido.`,"info");const I=await $n.listarPorProjeto(t.id);U(I)}})})}};U(r),n.querySelector("#form-visao-geral").querySelectorAll("input, textarea").forEach(k=>{k.addEventListener("input",()=>De(!0))});const L=n.querySelector("#btn-gravar-info-projeto");L.addEventListener("click",async()=>{const k=n.querySelector("#vg-nome").value.trim();if(!k){ne("O nome do projeto é obrigatório.","warning");return}const O=n.querySelector("#vg-entes").value,b=O?O.split(",").map(y=>y.trim()).filter(Boolean):[],m=Array.from(o),g=n.querySelector("#vg-inicio").value.trim(),_=n.querySelector("#vg-fim").value.trim(),I=n.querySelector("#vg-objetivo").value.trim(),w=n.querySelector("#vg-escopo").value.trim();try{L.disabled=!0,L.innerHTML='<span class="material-symbols-outlined">hourglass_empty</span> Gravando...';const{currentUser:y}=oe(),se=await Ne.salvarProjeto({...t,nome:k,entesExternos:b,areasDetranEnvolvidas:m,dataInicio:g,previsaoEncerramento:_,objetivo:I,escopo:w},y);Ze(se),De(!1),ne("Informações e escopo do projeto gravados com sucesso!","success"),Cd(n)}catch(y){ne(y.message,"danger")}finally{L.disabled=!1,L.innerHTML='<span class="material-symbols-outlined">save</span> Gravar Informações'}});const F=(k=null)=>{const O=!!k,b=`
      <form id="form-modal-contato" style="display: flex; flex-direction: column; gap: 14px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mc-nome">Nome Completo <span class="required">*</span></label>
          <input type="text" id="mc-nome" class="form-input" value="${(k==null?void 0:k.nome)||""}" required placeholder="Ex: Roberto Antunes">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-cargo">Cargo ou Função</label>
            <input type="text" id="mc-cargo" class="form-input" value="${(k==null?void 0:k.cargo)||""}" placeholder="Ex: Coordenador de Tráfego">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="mc-area">Área ou Organização</label>
            <input type="text" id="mc-area" class="form-input" value="${(k==null?void 0:k.area)||""}" placeholder="Ex: CET / DER / DSV">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="mc-email">E-mail Institucional <span class="required">*</span></label>
          <input type="email" id="mc-email" class="form-input" value="${(k==null?void 0:k.email)||""}" required placeholder="Ex: nome@orgao.sp.gov.br">
          <span class="form-hint">O e-mail deve ter formato válido e não pode ser duplicado neste projeto.</span>
        </div>
      </form>
    `,m=`
      <button type="button" class="btn btn-secondary" id="btn-cancelar-contato">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-salvar-contato">
        <span class="material-symbols-outlined">save</span> ${O?"Salvar Contato":"Cadastrar Contato"}
      </button>
    `,g=jt({title:O?`Editar Contato: ${k.nome}`:"Cadastrar Ponto Focal / Contato",content:b,footerHtml:m,maxWidth:"540px"});g.querySelector("#btn-cancelar-contato").addEventListener("click",Re),g.querySelector("#btn-salvar-contato").addEventListener("click",async()=>{const _=g.querySelector("#mc-nome").value.trim(),I=g.querySelector("#mc-cargo").value.trim(),w=g.querySelector("#mc-area").value.trim(),y=g.querySelector("#mc-email").value.trim(),{currentUser:se}=oe();try{await $n.salvarContato({...k||{},projetoId:t.id,nome:_,cargo:I,area:w,email:y},se),Re(),ne(`Contato "${_}" gravado com sucesso!`,"success");const pe=await $n.listarPorProjeto(t.id);U(pe)}catch(pe){ne(pe.message,"danger")}})};n.querySelector("#btn-novo-contato").addEventListener("click",()=>{F(null)})}async function u_(n){n.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
      <div>
        <h1 class="page-title">Projetos do Portfólio</h1>
        <p class="subtitle">Consulte, cadastre e gerencie projetos interinstitucionais da DSV e parametrização DIST.</p>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-abrir-novo-projeto">
          <span class="material-symbols-outlined">add</span> Novo Projeto
        </button>
      </div>
    </div>

    <!-- Barra de Filtros e Busca -->
    <div class="card" style="padding: 14px 18px; margin-bottom: 20px;">
      <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input type="text" id="filtro-busca-projeto" class="form-input" placeholder="Buscar por nome, entes ou objetivo..." style="padding-left: 36px;">
          <span class="material-symbols-outlined" style="position: absolute; left: 10px; top: 11px; color: var(--text-muted); font-size: 18px;">search</span>
        </div>

        <div style="min-width: 180px;">
          <select id="filtro-modulo-dist" class="form-select">
            <option value="todos">Todos os Módulos DIST</option>
            <option value="habilitado">Apenas DIST Habilitado</option>
            <option value="desabilitado">Apenas DIST Desabilitado</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tabela de Projetos -->
    <div class="table-responsive">
      <table class="data-table" id="tabela-projetos">
        <thead>
          <tr>
            <th>Nome do Projeto</th>
            <th>Área Gestora</th>
            <th>Entes Externos</th>
            <th>Módulo DIST</th>
            <th>Período</th>
            <th style="text-align: right;">Ações</th>
          </tr>
        </thead>
        <tbody id="tbody-projetos">
          <tr><td colspan="6" style="text-align: center; padding: 24px;">Carregando projetos...</td></tr>
        </tbody>
      </table>
    </div>
  `;let e=await Ne.listarProjetos();const t=a=>{const c=n.querySelector("#tbody-projetos"),{activeProjectId:u}=oe();if(a.length===0){c.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 28px; color: var(--text-muted);">Nenhum projeto encontrado para os filtros selecionados.</td></tr>';return}c.innerHTML=a.map(h=>{const f=h.id===u,v=Array.isArray(h.entesExternos)?h.entesExternos.join(", "):h.entesExternos||"Nenhum";return`
        <tr class="${f?"row-active":""}">
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13.5px;">
              ${h.nome}
              ${f?'<span class="badge badge-primary" style="margin-left: 6px; font-size: 10px;">Ativo</span>':""}
            </div>
            <div style="font-size: 11.5px; color: var(--text-muted); max-width: 320px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
              ${h.objetivo||"Sem objetivo informado"}
            </div>
          </td>
          <td><span class="tag">${h.areaGestora||"DSV"}</span></td>
          <td style="max-width: 160px; font-size: 12px; color: var(--text-secondary);">${v}</td>
          <td>
            <span class="badge ${h.distHabilitado?"badge-success":"badge-neutral"}">
              ${h.distHabilitado?"Habilitado":"Desabilitado"}
            </span>
          </td>
          <td style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">
            ${h.dataInicio?new Date(h.dataInicio).toLocaleDateString("pt-BR"):"—"} até 
            ${h.previsaoEncerramento?new Date(h.previsaoEncerramento).toLocaleDateString("pt-BR"):"—"}
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button type="button" class="btn btn-secondary btn-sm btn-detalhes-projeto" data-id="${h.id}" title="Expandir detalhes completos">
              <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
            </button>
            <button type="button" class="btn ${f?"btn-primary":"btn-outline"} btn-sm btn-selecionar-projeto" data-id="${h.id}" title="Tornar este projeto ativo na navegação">
              <span>${f?"Selecionado":"Selecionar"}</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm btn-editar-projeto" data-id="${h.id}" title="Editar projeto">
              <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
            </button>
          </td>
        </tr>
      `}).join(""),c.querySelectorAll(".btn-detalhes-projeto").forEach(h=>{h.addEventListener("click",()=>{const f=h.getAttribute("data-id"),v=e.find(E=>E.id===f);v&&s(v)})}),c.querySelectorAll(".btn-selecionar-projeto").forEach(h=>{h.addEventListener("click",()=>{const f=h.getAttribute("data-id"),v=e.find(E=>E.id===f);v&&zt(()=>{Ze(v),ne(`Projeto "${v.nome}" agora está ativo.`,"info"),t(r())})})}),c.querySelectorAll(".btn-editar-projeto").forEach(h=>{h.addEventListener("click",()=>{const f=h.getAttribute("data-id"),v=e.find(E=>E.id===f);v&&o(v)})})},r=()=>{var u,h;const a=((u=n.querySelector("#filtro-busca-projeto"))==null?void 0:u.value.toLowerCase().trim())||"",c=((h=n.querySelector("#filtro-modulo-dist"))==null?void 0:h.value)||"todos";return e.filter(f=>{var T,R;const v=!a||((T=f.nome)==null?void 0:T.toLowerCase().includes(a))||((R=f.objetivo)==null?void 0:R.toLowerCase().includes(a))||Array.isArray(f.entesExternos)&&f.entesExternos.some(P=>P.toLowerCase().includes(a)),E=c==="todos"||c==="habilitado"&&f.distHabilitado||c==="desabilitado"&&!f.distHabilitado;return v&&E})};n.querySelector("#filtro-busca-projeto").addEventListener("input",()=>{t(r())}),n.querySelector("#filtro-modulo-dist").addEventListener("change",()=>{t(r())});const s=a=>{const c=Array.isArray(a.areasDetranEnvolvidas)&&a.areasDetranEnvolvidas.length>0?a.areasDetranEnvolvidas.map(E=>`<span class="tag" style="margin-right: 4px; margin-bottom: 4px;">${E}</span>`).join(""):'<span style="color: var(--text-muted);">Nenhuma área informada</span>',u=Array.isArray(a.entesExternos)&&a.entesExternos.length>0?a.entesExternos.map(E=>`<span class="tag" style="margin-right: 4px; margin-bottom: 4px;">${E}</span>`).join(""):'<span style="color: var(--text-muted);">Nenhum ente informado</span>',h=`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color-light); padding-bottom: 12px;">
          <div>
            <span class="badge ${a.distHabilitado?"badge-success":"badge-neutral"}">
              ${a.distHabilitado?"Módulo DIST Habilitado":"Módulo DIST Desabilitado"}
            </span>
          </div>
          <span style="font-size: 12px; color: var(--text-muted);">Área Gestora: <strong>${a.areaGestora||"DSV"}</strong></span>
        </div>

        <div>
          <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Objetivo</h4>
          <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-main);">${a.objetivo||"Não informado"}</p>
        </div>

        <div>
          <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Escopo</h4>
          <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-main);">${a.escopo||"Não informado"}</p>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
          <div>
            <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Entes Externos</h4>
            <div style="display: flex; flex-wrap: wrap;">${u}</div>
          </div>
          <div>
            <h4 style="font-size: 12px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Áreas Detran Envolvidas</h4>
            <div style="display: flex; flex-wrap: wrap;">${c}</div>
          </div>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 12px; color: var(--text-muted); border-top: 1px solid var(--border-color-light); padding-top: 12px;">
          <span>Início: <strong>${a.dataInicio||"—"}</strong></span>
          <span>Previsão de Fim: <strong>${a.previsaoEncerramento||"—"}</strong></span>
        </div>
      </div>
    `,v=jt({title:a.nome,content:h,footerHtml:`
      <button type="button" class="btn btn-secondary" id="btn-modal-detalhes-fechar">Fechar</button>
      <button type="button" class="btn btn-primary" id="btn-modal-detalhes-ativar">
        <span class="material-symbols-outlined">folder</span> Ativar e Navegar
      </button>
    `,maxWidth:"620px"});v.querySelector("#btn-modal-detalhes-fechar").addEventListener("click",Re),v.querySelector("#btn-modal-detalhes-ativar").addEventListener("click",()=>{Re(),zt(()=>{Ze(a),a.distHabilitado?Ot("visao-geral"):Ot("info-gerais")})})},o=(a=null)=>{const c=!!a,u=br(),h=ws(),f=Array.isArray(a==null?void 0:a.areasDetranEnvolvidas)?a.areasDetranEnvolvidas:[],v=`
      <form id="form-projeto" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-nome">Nome do Projeto <span class="required">*</span></label>
          <input type="text" id="form-nome" class="form-input" value="${(a==null?void 0:a.nome)||""}" required placeholder="Ex: Modernização do Sistema X">
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-area-gestora">Área Gestora <span class="required">*</span></label>
            <select id="form-area-gestora" class="form-select" required>
              ${u.map(R=>`
                <option value="${R}" ${R===((a==null?void 0:a.areaGestora)||"DIST - Divisão de Integração Setorial")?"selected":""}>${R}</option>
              `).join("")}
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-data-inicio">Data de Início</label>
            <input type="date" id="form-data-inicio" class="form-input" value="${(a==null?void 0:a.dataInicio)||""}">
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-previsao-fim">Previsão de Encerramento</label>
            <input type="date" id="form-previsao-fim" class="form-input" value="${(a==null?void 0:a.previsaoEncerramento)||""}">
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-entes-externos">Entes Externos</label>
            <input type="text" id="form-entes-externos" class="form-input" placeholder="Ex: CET, DER (separar por vírgula)"
              value="${Array.isArray(a==null?void 0:a.entesExternos)?a.entesExternos.join(", "):(a==null?void 0:a.entesExternos)||""}">
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Áreas Detran Envolvidas (Lista Institucional)</label>
          <div class="chips-container" id="form-chips-areas">
            ${u.map(R=>{const P=f.includes(R);return`
                <button type="button" class="chip-selectable ${P?"selected":""}" data-area="${R}">
                  <span class="material-symbols-outlined" style="font-size: 14px;">${P?"check":"add"}</span>
                  <span>${R}</span>
                </button>
              `}).join("")}
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-objetivo">Objetivo do Projeto</label>
          <textarea id="form-objetivo" class="form-textarea" rows="2" placeholder="Descreva os objetivos principais...">${(a==null?void 0:a.objetivo)||""}</textarea>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-escopo">Escopo do Projeto</label>
          <textarea id="form-escopo" class="form-textarea" rows="3" placeholder="Detalhamento das entregas e limites do escopo...">${(a==null?void 0:a.escopo)||""}</textarea>
        </div>

        <!-- Regra de Configuração do Módulo DIST -->
        <div style="background: var(--bg-hover-subtle); padding: 14px; border-radius: var(--radius-button); border: 1px solid var(--border-color);">
          <label class="custom-checkbox-label">
            <input type="checkbox" id="form-dist-habilitado" class="custom-checkbox" 
              ${a?a.distHabilitado?"checked":"":"checked"}
              ${h?"":"disabled"}>
            <span style="font-weight: var(--font-weight-bold); font-size: 13px;">Utilizar módulo de acompanhamento DIST</span>
          </label>
          <p style="font-size: 11.5px; color: var(--text-muted); margin-top: 6px; margin-left: 28px;">
            Quando ativado, disponibiliza a Visão Geral, Diagnóstico DIST e Matriz de Riscos para este projeto. A desativação preserva todos os registros já realizados no banco de dados.
            ${h?"":'<br><strong style="color: var(--color-warning);">* Restrito a perfis autorizados (Administrador ou Gestor DIST).</strong>'}
          </p>
        </div>
      </form>
    `,E=`
      <button type="button" class="btn btn-secondary" id="btn-cancelar-form">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-salvar-form">
        <span class="material-symbols-outlined">save</span> ${c?"Salvar Alterações":"Cadastrar Projeto"}
      </button>
    `,T=jt({title:c?`Editar: ${a.nome}`:"Cadastrar Novo Projeto",content:v,footerHtml:E,maxWidth:"680px"});T.querySelectorAll("#form-chips-areas .chip-selectable").forEach(R=>{R.addEventListener("click",()=>{R.classList.toggle("selected");const P=R.querySelector(".material-symbols-outlined");P.textContent=R.classList.contains("selected")?"check":"add"})}),T.querySelector("#btn-cancelar-form").addEventListener("click",Re),T.querySelector("#btn-salvar-form").addEventListener("click",async()=>{const R=T.querySelector("#form-nome").value.trim();if(!R){ne("O nome do projeto é obrigatório.","warning");return}const P=T.querySelector("#form-area-gestora").value,x=T.querySelector("#form-data-inicio").value,U=T.querySelector("#form-previsao-fim").value,N=T.querySelector("#form-entes-externos").value,L=N?N.split(",").map(_=>_.trim()).filter(Boolean):[],F=[];T.querySelectorAll("#form-chips-areas .chip-selectable.selected").forEach(_=>{F.push(_.getAttribute("data-area"))});const k=T.querySelector("#form-objetivo").value.trim(),O=T.querySelector("#form-escopo").value.trim(),m=T.querySelector("#form-dist-habilitado").checked,{currentUser:g}=oe();try{const _={...a||{},nome:R,areaGestora:P,dataInicio:x,previsaoEncerramento:U,entesExternos:L,areasDetranEnvolvidas:F,objetivo:k,escopo:O,distHabilitado:m},I=await Ne.salvarProjeto(_,g);Re(),ne(`Projeto "${I.nome}" salvo com sucesso!`,"success"),e=await Ne.listarProjetos(),t(r());const{activeProjectId:w}=oe();w===I.id&&Ze(I)}catch(_){ne(_.message,"danger")}})};n.querySelector("#btn-abrir-novo-projeto").addEventListener("click",()=>{o(null)}),window.__ABRIR_MODAL_NOVO_PROJETO&&(window.__ABRIR_MODAL_NOVO_PROJETO=!1,o(null)),t(e)}async function Qi(n){var U;const{activeProject:e}=oe();if(!e){n.innerHTML=`
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto no topo da página ou na aba "Projetos" para registrar ou visualizar o Diagnóstico DIST.</p>
        </div>
      </div>
    `;return}if(!e.distHabilitado){n.innerHTML=`
      <div class="card" style="text-align: center; padding: 40px 24px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-warning); margin-bottom: 12px;">lock</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Módulo DIST Não Habilitado</h2>
        <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 20px; line-height: 1.5;">
          O projeto <strong>"${e.nome}"</strong> está configurado sem o módulo de acompanhamento DIST ativo.
          Para habilitar a análise de diagnóstico e matriz de riscos, configure a flag "Utilizar módulo de acompanhamento DIST" na aba de Projetos (requer perfil autorizado).
        </p>
        <span class="badge badge-neutral">Dados históricos preservados no banco de dados</span>
      </div>
    `;return}const t=await Ne.obterPorId(e.id)||e,r=await Ki.obterPorProjeto(t.id),s=br(),o=Rd(),a=(r==null?void 0:r.classificacao)||"em_andamento",c=Array.isArray(r==null?void 0:r.areasResponsaveisExecucao)?r.areasResponsaveisExecucao:[],u=Array.isArray(t.entesExternos)&&t.entesExternos.length>0?t.entesExternos.join(", "):t.entesExternos||"Nenhum informado";Array.isArray(t.areasDetranEnvolvidas)&&t.areasDetranEnvolvidas.length>0&&t.areasDetranEnvolvidas.join(", "),n.innerHTML=`
    <!-- Cabeçalho Limpo e Arejado (Abordagem Clean) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">Diagnóstico DIST: ${t.nome}</h1>
          <span class="badge badge-success">Módulo DIST Ativo</span>
        </div>
        <p class="subtitle" style="margin-bottom: 8px;">Análise técnica sobre a situação, gargalos, recomendações e catalogação de riscos.</p>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text-muted); flex-wrap: wrap;">
          <span>Área Gestora: <strong style="color: var(--text-main);">${t.areaGestora||"DSV"}</strong></span>
          <span>•</span>
          <span>Entes Externos: <strong style="color: var(--text-main);">${u}</strong></span>
          <span>•</span>
          <span>Responsável Técnico: <strong style="color: var(--text-main);">${((U=r==null?void 0:r.atualizadoPor)==null?void 0:U.nome)||"Aguardando primeiro registro"}</strong></span>
          <span>•</span>
          <span>Última atualização: <strong style="color: var(--text-main);">${r!=null&&r.atualizadoEm?new Date(r.atualizadoEm).toLocaleDateString("pt-BR"):"Sem registros"}</strong></span>
        </div>
      </div>
    </div>

    <!-- BLOCO 1: Diagnóstico DIST -->
    <div class="card" style="margin-bottom: 28px;">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">fact_check</span>
          <h3 class="card-title">Análise Técnica & Classificação do Projeto</h3>
        </div>
        <button type="button" class="btn btn-primary btn-sm" id="btn-salvar-diagnostico">
          <span class="material-symbols-outlined">save</span> Gravar Diagnóstico
        </button>
      </div>

      <form id="form-diagnostico" style="display: flex; flex-direction: column; gap: 20px;">
        
        <!-- Classificação do Diagnóstico (5 Categorias Oficiais) -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Classificação do Diagnóstico DIST <span class="required">*</span></label>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(190px, 1fr)); gap: 10px; margin-top: 6px;">
            
            <!-- 1. Em estruturação -->
            <label class="diag-option-card ${a==="em_estruturacao"?"selected-estruturacao":""}">
              <input type="radio" name="diag-classificacao" value="em_estruturacao" ${a==="em_estruturacao"?"checked":""}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: #0284c7;">Em estruturação</div>
                <div style="font-size: 11px; color: var(--text-muted);">Definição inicial de escopo ou governança</div>
              </div>
            </label>

            <!-- 2. Em andamento -->
            <label class="diag-option-card ${a==="em_andamento"?"selected-andamento":""}">
              <input type="radio" name="diag-classificacao" value="em_andamento" ${a==="em_andamento"?"checked":""}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: var(--color-success);">Em andamento</div>
                <div style="font-size: 11px; color: var(--text-muted);">Execução dentro do fluxo previsto</div>
              </div>
            </label>

            <!-- 3. Requer atenção -->
            <label class="diag-option-card ${a==="requer_atencao"?"selected-atencao":""}">
              <input type="radio" name="diag-classificacao" value="requer_atencao" ${a==="requer_atencao"?"checked":""}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: var(--color-warning);">Requer atenção</div>
                <div style="font-size: 11px; color: var(--text-muted);">Gargalos operacionais ou riscos moderados</div>
              </div>
            </label>

            <!-- 4. Requer decisão estratégica -->
            <label class="diag-option-card ${a==="requer_decisao_estrategica"?"selected-decisao":""}">
              <input type="radio" name="diag-classificacao" value="requer_decisao_estrategica" ${a==="requer_decisao_estrategica"?"checked":""}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: var(--color-danger);">Requer decisão estratégica</div>
                <div style="font-size: 11px; color: var(--text-muted);">Bloqueios críticos e necessidade de alinhamento superior</div>
              </div>
            </label>

            <!-- 5. Concluído -->
            <label class="diag-option-card ${a==="concluido"?"selected-concluido":""}">
              <input type="radio" name="diag-classificacao" value="concluido" ${a==="concluido"?"checked":""}>
              <div>
                <div style="font-weight: var(--font-weight-bold); font-size: 12.5px; color: #4338ca;">Concluído</div>
                <div style="font-size: 11px; color: var(--text-muted);">Entregas finalizadas e projeto encerrado</div>
              </div>
            </label>

          </div>
        </div>

        <!-- Situação Atual -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="diag-situacao">Situação Atual <span class="required">*</span></label>
          <textarea id="diag-situacao" class="form-textarea" rows="4" required placeholder="Descreva o andamento atual, pendências, entregas recentes e contexto da articulação institucional...">${(r==null?void 0:r.situacaoAtual)||""}</textarea>
          <span class="form-hint">Avaliação qualitativa do cenário operacional e executivo.</span>
        </div>

        <!-- Recomendações e Próximos Passos -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="diag-recomendacoes">Recomendações e Próximos Passos <span class="required">*</span></label>
          <textarea id="diag-recomendacoes" class="form-textarea" rows="4" required placeholder="Ações recomendadas pela área de Integração para mitigar problemas e encaminhar as soluções...">${(r==null?void 0:r.recomendacoesProximosPassos)||""}</textarea>
        </div>

        <!-- Áreas Responsáveis pela Execução -->
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label">Áreas Responsáveis pela Execução das Recomendações</label>
          <div class="chips-container" id="diag-chips-areas" style="max-height: 120px; overflow-y: auto;">
            ${s.map(N=>{const L=c.includes(N);return`
                <button type="button" class="chip-selectable ${L?"selected":""}" data-area="${N}">
                  <span class="material-symbols-outlined" style="font-size: 14px;">${L?"check":"add"}</span>
                  <span>${N}</span>
                </button>
              `}).join("")}
          </div>
          <span class="form-hint">Selecione uma ou mais áreas institucionais encarregadas dos encaminhamentos.</span>
        </div>
      </form>
    </div>

    <!-- BLOCO 2: Cadastro de Risco Integrado (Requisito Seção 5) -->
    <div class="card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">add_alert</span>
          <h3 class="card-title">Cadastro de Risco do Projeto</h3>
        </div>
        <span style="font-size: 12px; color: var(--text-muted);">
          Os riscos cadastrados aqui alimentam a Matriz de Riscos 3x3 e o Dashboard
        </span>
      </div>

      <form id="form-cadastro-risco-diag" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="diag-risco-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="diag-risco-titulo" class="form-input" required placeholder="Ex: Atraso na liberação de portas de firewall pelo parceiro externo">
          <span class="form-hint">Identificação breve e clara do evento de risco.</span>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="diag-risco-area">Área Responsável <span class="required">*</span></label>
            <select id="diag-risco-area" class="form-select" required>
              ${o.map(N=>`
                <option value="${N}" ${N==="DIST - Divisão de Integração Setorial"?"selected":""}>${N}</option>
              `).join("")}
            </select>
          </div>

          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="diag-risco-p">Probabilidade (1 a 3) <span class="required">*</span></label>
              <select id="diag-risco-p" class="form-select">
                <option value="1">1 — Baixa</option>
                <option value="2" selected>2 — Média</option>
                <option value="3">3 — Alta</option>
              </select>
            </div>

            <div class="form-group" style="margin-bottom: 0;">
              <label class="form-label" for="diag-risco-i">Impacto (1 a 3) <span class="required">*</span></label>
              <select id="diag-risco-i" class="form-select">
                <option value="1">1 — Baixo</option>
                <option value="2" selected>2 — Médio</option>
                <option value="3">3 — Alto</option>
              </select>
            </div>
          </div>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="diag-risco-desc">Descrição do Risco</label>
          <textarea id="diag-risco-desc" class="form-textarea" rows="3" placeholder="Explique o risco, possíveis consequências, causas raízes e impacto no projeto..."></textarea>
        </div>

        <div style="display: flex; justify-content: space-between; align-items: center; background: var(--bg-hover); padding: 12px 16px; border-radius: var(--radius-button); border: 1px solid var(--border-color); flex-wrap: wrap; gap: 10px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 12.5px; font-weight: var(--font-weight-semibold);">Pontuação Calculada:</span>
            <span id="diag-preview-score" class="badge badge-warning">2 × 2 = 4 pts (Moderado)</span>
          </div>

          <button type="button" class="btn btn-primary" id="btn-adicionar-risco-diag">
            <span class="material-symbols-outlined">add_task</span> Adicionar Risco
          </button>
        </div>
      </form>
    </div>
  `;const h=document.createElement("style");h.textContent=`
    .diag-option-card {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border: 2px solid var(--border-color);
      border-radius: var(--radius-card);
      background: #ffffff;
      cursor: pointer;
      transition: var(--transition-fast);
    }
    .diag-option-card:hover {
      border-color: #cbd5e1;
      background: var(--bg-hover-subtle);
    }
    .diag-option-card.selected-estruturacao {
      border-color: #0284c7;
      background: #f0f9ff;
    }
    .diag-option-card.selected-andamento {
      border-color: var(--color-success);
      background: var(--color-success-bg);
    }
    .diag-option-card.selected-atencao {
      border-color: var(--color-warning);
      background: var(--color-warning-bg);
    }
    .diag-option-card.selected-decisao {
      border-color: var(--color-danger);
      background: var(--color-danger-bg);
    }
    .diag-option-card.selected-concluido {
      border-color: #4338ca;
      background: #eef2ff;
    }
  `,n.appendChild(h);const f=n.querySelector("#form-diagnostico"),v=n.querySelector("#btn-salvar-diagnostico");f.querySelectorAll("input, textarea").forEach(N=>{N.addEventListener("input",()=>De(!0)),N.addEventListener("change",()=>De(!0))}),f.querySelectorAll('input[name="diag-classificacao"]').forEach(N=>{N.addEventListener("change",()=>{De(!0),Qi(n)})}),n.querySelectorAll("#diag-chips-areas .chip-selectable").forEach(N=>{N.addEventListener("click",()=>{N.classList.toggle("selected");const L=N.querySelector(".material-symbols-outlined");L.textContent=N.classList.contains("selected")?"check":"add",De(!0)})}),v.addEventListener("click",async()=>{var O;const N=n.querySelector("#diag-situacao").value.trim(),L=n.querySelector("#diag-recomendacoes").value.trim();if(!N||!L){ne("Por favor, preencha a situação atual e as recomendações.","warning");return}const F=((O=n.querySelector('input[name="diag-classificacao"]:checked'))==null?void 0:O.value)||"em_andamento",k=[];n.querySelectorAll("#diag-chips-areas .chip-selectable.selected").forEach(b=>{k.push(b.getAttribute("data-area"))});try{v.disabled=!0,v.innerHTML='<span class="material-symbols-outlined">hourglass_empty</span> Salvando...';const{currentUser:b}=oe();await Ki.salvarDiagnostico({projetoId:t.id,classificacao:F,situacaoAtual:N,recomendacoesProximosPassos:L,areasResponsaveisExecucao:k},b),De(!1),ne("Diagnóstico DIST registrado com sucesso!","success"),Qi(n)}catch(b){ne(`Erro ao gravar diagnóstico: ${b.message}`,"danger")}finally{v.disabled=!1,v.innerHTML='<span class="material-symbols-outlined">save</span> Gravar Diagnóstico'}});const E=n.querySelector("#diag-risco-p"),T=n.querySelector("#diag-risco-i"),R=n.querySelector("#diag-preview-score"),P=()=>{const N=parseInt(E.value,10),L=parseInt(T.value,10),{pontuacao:F,classificacao:k}=Ts(N,L),O=k==="Alto"?"badge-danger":k==="Moderado"?"badge-warning":"badge-success";R.className=`badge ${O}`,R.textContent=`${N} × ${L} = ${F} pts (${k})`};E.addEventListener("change",P),T.addEventListener("change",P),P();const x=n.querySelector("#btn-adicionar-risco-diag");x.addEventListener("click",async()=>{const N=n.querySelector("#diag-risco-titulo").value.trim();if(!N){ne("O título do risco é obrigatório.","warning"),n.querySelector("#diag-risco-titulo").focus();return}const L=n.querySelector("#diag-risco-area").value,F=n.querySelector("#diag-risco-desc").value.trim(),k=parseInt(E.value,10),O=parseInt(T.value,10),{currentUser:b}=oe();try{x.disabled=!0,x.innerHTML='<span class="material-symbols-outlined">hourglass_empty</span> Salvando...';const m=await Vt.salvarRisco({projetoId:t.id,titulo:N,areaResponsavel:L,descricao:F,probabilidade:k,impacto:O},b);ne(`Risco #${m.numero} adicionado com sucesso!`,"success"),n.querySelector("#diag-risco-titulo").value="",n.querySelector("#diag-risco-desc").value="",E.value="2",T.value="2",P()}catch(m){ne(`Erro ao adicionar risco: ${m.message}`,"danger")}finally{x.disabled=!1,x.innerHTML='<span class="material-symbols-outlined">add_task</span> Adicionar Risco'}})}async function d_(n){const{activeProject:e}=oe();if(!e){n.innerHTML=`
      <div class="banner-info">
        <span class="material-symbols-outlined" style="font-size: 28px;">info</span>
        <div>
          <h3 style="font-size: 15px; margin-bottom: 4px;">Nenhum projeto ativo selecionado</h3>
          <p style="font-size: 13px;">Selecione um projeto no topo da página ou na aba "Projetos" para gerenciar sua Matriz de Riscos.</p>
        </div>
      </div>
    `;return}if(!e.distHabilitado){n.innerHTML=`
      <div class="card" style="text-align: center; padding: 40px 24px;">
        <span class="material-symbols-outlined" style="font-size: 48px; color: var(--color-warning); margin-bottom: 12px;">lock</span>
        <h2 class="section-title" style="margin-bottom: 8px;">Módulo DIST Não Habilitado</h2>
        <p style="color: var(--text-secondary); max-width: 560px; margin: 0 auto 20px; line-height: 1.5;">
          A Matriz de Riscos requer a ativação do módulo de acompanhamento DIST para o projeto <strong>"${e.nome}"</strong>.
          Os dados já catalogados estão preservados com segurança.
        </p>
        <span class="badge badge-neutral">Módulo DIST Desativado</span>
      </div>
    `;return}const t=await Ne.obterPorId(e.id)||e,r=Array.isArray(t.entesExternos)&&t.entesExternos.length>0?t.entesExternos.join(", "):t.entesExternos||"Nenhum informado",s=Array.isArray(t.areasDetranEnvolvidas)&&t.areasDetranEnvolvidas.length>0?t.areasDetranEnvolvidas.join(", "):"Nenhuma selecionada";n.innerHTML=`
    <!-- Cabeçalho Limpo e Arejado (Abordagem Clean) -->
    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
      <div>
        <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 6px;">
          <h1 class="page-title">Matriz de Riscos: ${t.nome}</h1>
          <span class="badge badge-success">Módulo DIST Ativo</span>
        </div>
        <p class="subtitle" style="margin-bottom: 8px;">Mapeamento qualitativo de probabilidade e impacto para antecipação de ameaças aos objetivos do projeto.</p>
        <div style="display: flex; align-items: center; gap: 12px; font-size: 12.5px; color: var(--text-muted); flex-wrap: wrap;">
          <span>Área Gestora: <strong style="color: var(--text-main);">${t.areaGestora||"DSV"}</strong></span>
          <span>•</span>
          <span>Entes Externos: <strong style="color: var(--text-main);">${r}</strong></span>
          <span>•</span>
          <span>Áreas Envolvidas: <strong style="color: var(--text-main);">${s}</strong></span>
        </div>
      </div>

      <div style="display: flex; gap: 10px;">
        <button type="button" class="btn btn-primary" id="btn-cadastrar-risco">
          <span class="material-symbols-outlined">add_alert</span> Mapear Novo Risco
        </button>
      </div>
    </div>

    <!-- Metodologia e Escalas (Conforme Seção 6) -->
    <div class="methodology-box">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div style="display: flex; align-items: center; gap: 8px; font-weight: var(--font-weight-bold); font-size: 13px; color: var(--text-main);">
          <span class="material-symbols-outlined" style="color: var(--color-primary); font-size: 20px;">info</span>
          <span>Metodologia de Classificação Institucional</span>
        </div>
        <span style="font-size: 11.5px; color: var(--text-muted);">
          Fórmula: <strong>Pontuação = Probabilidade (1 a 3) × Impacto (1 a 3)</strong>
        </span>
      </div>

      <div class="methodology-grid">
        <div class="methodology-item">
          <div class="methodology-indicator indicator-baixo"></div>
          <div>
            <div style="font-weight: var(--font-weight-bold); font-size: 12px; color: var(--color-success);">Risco Baixo (Score 1 ou 2)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Monitoramento rotineiro pela equipe</div>
          </div>
        </div>

        <div class="methodology-item">
          <div class="methodology-indicator indicator-moderado"></div>
          <div>
            <div style="font-weight: var(--font-weight-bold); font-size: 12px; color: var(--color-warning);">Risco Moderado (Score 3 ou 4)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Acompanhamento tático e plano de mitigação</div>
          </div>
        </div>

        <div class="methodology-item">
          <div class="methodology-indicator indicator-alto"></div>
          <div>
            <div style="font-weight: var(--font-weight-bold); font-size: 12px; color: var(--color-danger);">Risco Alto (Score 6 ou 9)</div>
            <div style="font-size: 11px; color: var(--text-muted);">Alerta executivo e intervenção prioritária</div>
          </div>
        </div>
      </div>

      <div style="font-size: 11.5px; color: var(--text-muted); margin-top: 10px; padding-top: 8px; border-top: 1px solid var(--border-color-light);">
        * <em>Nota metodológica:</em> Na escala discreta de 1 a 3, as pontuações <strong>5, 7 e 8 não são resultados possíveis</strong>.
      </div>
    </div>

    <!-- Matriz 3x3 Interativa -->
    <div class="matrix-container">
      <!-- Eixo Y Vertical Label -->
      <div class="matrix-y-axis-label">
        ▲ Probabilidade (1 a 3)
      </div>

      <div class="matrix-content-wrapper">
        <div class="matrix-grid-3x3" id="matrix-grid">
          <!-- Células geradas via script -->
        </div>

        <!-- Eixo X Horizontal Label -->
        <div style="text-align: center; font-size: 12px; font-weight: var(--font-weight-bold); color: var(--text-secondary); text-transform: uppercase; letter-spacing: 1px; margin-top: 10px;">
          Impacto (1 a 3) ►
        </div>
      </div>
    </div>

    <!-- Lista de Riscos Mapeados -->
    <div class="card risks-list-card">
      <div class="card-header">
        <div class="card-title-group">
          <span class="material-symbols-outlined">format_list_numbered</span>
          <h3 class="card-title">Riscos Mapeados do Projeto</h3>
        </div>
        <span class="tag" id="tag-total-riscos-proj">...</span>
      </div>

      <div class="table-responsive">
        <table class="data-table" id="tabela-riscos-mapeados">
          <thead>
            <tr>
              <th style="width: 70px;">Nº</th>
              <th>Título & Descrição</th>
              <th>Área Responsável</th>
              <th style="text-align: center;">P × I</th>
              <th>Classificação</th>
              <th style="text-align: right;">Ações</th>
            </tr>
          </thead>
          <tbody id="tbody-riscos-mapeados">
            <tr><td colspan="6" style="text-align: center; padding: 20px;">Carregando riscos...</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  `;let o=await Vt.listarPorProjeto(e.id);const a=()=>{const v=n.querySelector("#matrix-grid");v.innerHTML="";const E=[{valor:3,label:"3 - Alta"},{valor:2,label:"2 - Média"},{valor:1,label:"1 - Baixa"}],T=[{valor:1,label:"1 - Baixo"},{valor:2,label:"2 - Médio"},{valor:3,label:"3 - Alto"}];E.forEach(P=>{const x=document.createElement("div");x.className="axis-row-header",x.textContent=P.label,v.appendChild(x),T.forEach(U=>{const{pontuacao:N,classificacao:L}=Ts(P.valor,U.valor),F=document.createElement("div");F.className=`matrix-cell cell-${L.toLowerCase()}`,F.setAttribute("data-p",P.valor),F.setAttribute("data-i",U.valor);const k=o.filter(b=>b.probabilidade===P.valor&&b.impacto===U.valor);F.innerHTML=`
          <span class="matrix-cell-score">${N} pts</span>
          <div class="matrix-cell-label">${L}</div>
          <div class="matrix-chips-wrapper" id="cell-chips-${P.valor}-${U.valor}"></div>
        `;const O=F.querySelector(`#cell-chips-${P.valor}-${U.valor}`);k.forEach(b=>{const m=document.createElement("button");m.type="button",m.className=`risk-chip chip-${L.toLowerCase()}`,m.setAttribute("title",`#${b.numero}: ${b.titulo} (Clique para ver detalhes)`),m.setAttribute("aria-label",`Risco #${b.numero}: ${b.titulo}`),m.innerHTML=`<span>#${b.numero}</span>`,m.addEventListener("click",g=>{g.stopPropagation(),h(b)}),O.appendChild(m)}),F.addEventListener("click",()=>{k.length>0?k.length===1?h(k[0]):u(k,P.valor,U.valor,L):f(null,P.valor,U.valor)}),v.appendChild(F)})});const R=document.createElement("div");R.className="axis-corner-empty",v.appendChild(R),T.forEach(P=>{const x=document.createElement("div");x.className="axis-col-header",x.textContent=P.label,v.appendChild(x)})},c=()=>{const v=n.querySelector("#tbody-riscos-mapeados");if(n.querySelector("#tag-total-riscos-proj").textContent=`${o.length} riscos cadastrados`,o.length===0){v.innerHTML='<tr><td colspan="6" style="text-align: center; padding: 24px; color: var(--text-muted);">Nenhum risco catalogado para este projeto. Utilize o botão acima para adicionar.</td></tr>';return}v.innerHTML=o.map(E=>{const T=E.classificacao==="Alto"?"badge-danger":E.classificacao==="Moderado"?"badge-warning":"badge-success";return`
        <tr>
          <td><span class="risk-chip chip-${E.classificacao.toLowerCase()}" style="cursor: default;">#${E.numero}</span></td>
          <td>
            <div style="font-weight: var(--font-weight-bold); color: var(--text-main); font-size: 13px;">${E.titulo}</div>
            <div class="risk-table-item-desc" title="${E.descricao||""}">${E.descricao||"Sem descrição"}</div>
          </td>
          <td><span class="tag">${E.areaResponsavel||"Não informada"}</span></td>
          <td style="text-align: center; font-weight: var(--font-weight-bold); font-size: 13px;">
            ${E.probabilidade} × ${E.impacto} = <span style="color: var(--color-primary);">${E.pontuacao}</span>
          </td>
          <td>
            <span class="badge ${T}">${E.classificacao}</span>
          </td>
          <td style="text-align: right; white-space: nowrap;">
            <button type="button" class="btn btn-secondary btn-sm btn-ver-risco" data-id="${E.id}" title="Ver detalhes completos">
              <span class="material-symbols-outlined" style="font-size: 16px;">visibility</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm btn-editar-risco" data-id="${E.id}" title="Editar risco">
              <span class="material-symbols-outlined" style="font-size: 16px;">edit</span>
            </button>
            <button type="button" class="btn btn-secondary btn-sm btn-excluir-risco" data-id="${E.id}" title="Excluir risco" style="color: var(--color-danger);">
              <span class="material-symbols-outlined" style="font-size: 16px;">delete</span>
            </button>
          </td>
        </tr>
      `}).join(""),v.querySelectorAll(".btn-ver-risco").forEach(E=>{E.addEventListener("click",()=>{const T=E.getAttribute("data-id"),R=o.find(P=>P.id===T);R&&h(R)})}),v.querySelectorAll(".btn-editar-risco").forEach(E=>{E.addEventListener("click",()=>{const T=E.getAttribute("data-id"),R=o.find(P=>P.id===T);R&&f(R)})}),v.querySelectorAll(".btn-excluir-risco").forEach(E=>{E.addEventListener("click",async()=>{const T=E.getAttribute("data-id"),R=o.find(P=>P.id===T);if(R&&confirm(`Deseja realmente excluir o Risco #${R.numero} ("${R.titulo}")?`)){const{currentUser:P}=oe();await Vt.excluirRisco(T,P),ne(`Risco #${R.numero} excluído.`,"info"),o=await Vt.listarPorProjeto(e.id),a(),c()}})})},u=(v,E,T,R)=>{const P=`
      <div>
        <p style="font-size: 13px; color: var(--text-secondary); margin-bottom: 14px;">
          Esta célula (Probabilidade ${E} × Impacto ${T} = ${E*T} pts • <strong>${R}</strong>) possui <strong>${v.length} riscos</strong> vinculados:
        </p>
        <div style="display: flex; flex-direction: column; gap: 8px;">
          ${v.map(N=>`
            <div style="display: flex; align-items: center; justify-content: space-between; padding: 10px 14px; background: var(--bg-hover); border-radius: var(--radius-button); border: 1px solid var(--border-color);">
              <div style="display: flex; align-items: center; gap: 10px;">
                <span class="risk-chip chip-${R.toLowerCase()}">#${N.numero}</span>
                <span style="font-weight: var(--font-weight-bold); font-size: 13px;">${N.titulo}</span>
              </div>
              <button type="button" class="btn btn-outline btn-sm btn-item-ver-detalhe" data-id="${N.id}">
                Ver Detalhes
              </button>
            </div>
          `).join("")}
        </div>
      </div>
    `,U=jt({title:`Riscos na Célula P:${E} × I:${T}`,content:P,footerHtml:`
      <button type="button" class="btn btn-secondary" id="btn-close-multi-modal">Fechar</button>
    `,maxWidth:"560px"});U.querySelector("#btn-close-multi-modal").addEventListener("click",Re),U.querySelectorAll(".btn-item-ver-detalhe").forEach(N=>{N.addEventListener("click",()=>{Re();const L=N.getAttribute("data-id"),F=v.find(k=>k.id===L);F&&h(F)})})},h=v=>{var x;const E=v.classificacao==="Alto"?"badge-danger":v.classificacao==="Moderado"?"badge-warning":"badge-success",T=`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-color-light); padding-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span class="risk-chip chip-${v.classificacao.toLowerCase()}" style="font-size: 13px; padding: 4px 10px;">#${v.numero}</span>
            <span class="badge ${E}">${v.classificacao}</span>
          </div>
          <span style="font-size: 13px; font-weight: var(--font-weight-bold); color: var(--color-primary);">
            Pontuação: ${v.probabilidade} × ${v.impacto} = ${v.pontuacao} pts
          </span>
        </div>

        <div>
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 4px;">Área Responsável</h4>
          <span class="tag" style="font-size: 12.5px;">${v.areaResponsavel||"Não informada"}</span>
        </div>

        <div>
          <h4 style="font-size: 11px; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px;">Descrição do Risco</h4>
          <p style="font-size: 13.5px; line-height: 1.6; color: var(--text-main); background: var(--bg-hover-subtle); padding: 12px 16px; border-radius: var(--radius-button); border: 1px solid var(--border-color-light);">
            ${v.descricao||"Nenhuma descrição detalhada informada."}
          </p>
        </div>

        <div style="display: flex; justify-content: space-between; font-size: 11.5px; color: var(--text-muted); border-top: 1px solid var(--border-color-light); padding-top: 12px;">
          <span>Registrado em: <strong>${v.criadoEm?new Date(v.criadoEm).toLocaleDateString("pt-BR"):"—"}</strong></span>
          <span>Por: <strong>${((x=v.atualizadoPor)==null?void 0:x.nome)||"Usuário"}</strong></span>
        </div>
      </div>
    `,P=jt({title:`Risco #${v.numero}: ${v.titulo}`,content:T,footerHtml:`
      <button type="button" class="btn btn-secondary" id="btn-modal-risco-fechar">Fechar</button>
      <button type="button" class="btn btn-primary" id="btn-modal-risco-editar">
        <span class="material-symbols-outlined">edit</span> Editar Risco
      </button>
    `,maxWidth:"600px"});P.querySelector("#btn-modal-risco-fechar").addEventListener("click",Re),P.querySelector("#btn-modal-risco-editar").addEventListener("click",()=>{Re(),f(v)})},f=(v=null,E=2,T=2)=>{const R=!!v,P=Rd(),x=v?v.probabilidade:E,U=v?v.impacto:T,N=`
      <form id="form-cad-risco" style="display: flex; flex-direction: column; gap: 16px;">
        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-risco-titulo">Título do Risco <span class="required">*</span></label>
          <input type="text" id="form-risco-titulo" class="form-input" value="${(v==null?void 0:v.titulo)||""}" required placeholder="Ex: Incompatibilidade no esquema de dados da API">
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-risco-area">Área Responsável <span class="required">*</span></label>
          <select id="form-risco-area" class="form-select" required>
            ${P.map(g=>`
              <option value="${g}" ${g===((v==null?void 0:v.areaResponsavel)||"DIST - Divisão de Integração Setorial")?"selected":""}>${g}</option>
            `).join("")}
          </select>
        </div>

        <div class="form-group" style="margin-bottom: 0;">
          <label class="form-label" for="form-risco-desc">Descrição Detalhada do Risco</label>
          <textarea id="form-risco-desc" class="form-textarea" rows="3" placeholder="Contextualize os fatores de risco, gatilhos e possíveis consequências...">${(v==null?void 0:v.descricao)||""}</textarea>
        </div>

        <!-- Seleção de Probabilidade e Impacto -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 14px;">
          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-risco-p">Probabilidade (1 a 3) <span class="required">*</span></label>
            <select id="form-risco-p" class="form-select">
              <option value="1" ${x===1?"selected":""}>1 - Baixa (Raro acontecer)</option>
              <option value="2" ${x===2?"selected":""}>2 - Média (Pode ocorrer)</option>
              <option value="3" ${x===3?"selected":""}>3 - Alta (Frequente / Muito provável)</option>
            </select>
          </div>

          <div class="form-group" style="margin-bottom: 0;">
            <label class="form-label" for="form-risco-i">Impacto (1 a 3) <span class="required">*</span></label>
            <select id="form-risco-i" class="form-select">
              <option value="1" ${U===1?"selected":""}>1 - Baixo (Impacto desprezível)</option>
              <option value="2" ${U===2?"selected":""}>2 - Médio (Atrasos recuperáveis)</option>
              <option value="3" ${U===3?"selected":""}>3 - Alto (Compromete entregas/escopo)</option>
            </select>
          </div>
        </div>

        <!-- Preview Dinâmico do Cálculo de Classificação -->
        <div id="preview-score-box" style="padding: 12px 16px; border-radius: var(--radius-button); background: var(--bg-hover); display: flex; justify-content: space-between; align-items: center; border: 1px solid var(--border-color);">
          <span style="font-size: 12.5px; font-weight: var(--font-weight-semibold);">Pontuação Calculada:</span>
          <span id="preview-score-badge" class="badge">...</span>
        </div>
      </form>
    `,L=`
      <button type="button" class="btn btn-secondary" id="btn-cancel-risco">Cancelar</button>
      <button type="button" class="btn btn-primary" id="btn-salvar-risco">
        <span class="material-symbols-outlined">save</span> ${R?"Salvar Risco":"Cadastrar Risco"}
      </button>
    `,F=jt({title:R?`Editar Risco #${v.numero}`:"Cadastrar Risco no Projeto",content:N,footerHtml:L,maxWidth:"600px"}),k=F.querySelector("#form-risco-p"),O=F.querySelector("#form-risco-i"),b=F.querySelector("#preview-score-badge"),m=()=>{const g=parseInt(k.value,10),_=parseInt(O.value,10),{pontuacao:I,classificacao:w}=Ts(g,_),y=w==="Alto"?"badge-danger":w==="Moderado"?"badge-warning":"badge-success";b.className=`badge ${y}`,b.textContent=`${g} × ${_} = ${I} pts (${w})`};k.addEventListener("change",m),O.addEventListener("change",m),m(),F.querySelector("#btn-cancel-risco").addEventListener("click",Re),F.querySelector("#btn-salvar-risco").addEventListener("click",async()=>{const g=F.querySelector("#form-risco-titulo").value.trim();if(!g){ne("O título do risco é obrigatório.","warning");return}const _=F.querySelector("#form-risco-area").value,I=F.querySelector("#form-risco-desc").value.trim(),w=parseInt(k.value,10),y=parseInt(O.value,10),{currentUser:se}=oe();try{const pe={...v||{},projetoId:e.id,titulo:g,areaResponsavel:_,descricao:I,probabilidade:w,impacto:y},Fs=await Vt.salvarRisco(pe,se);Re(),ne(`Risco #${Fs.numero} salvo com sucesso!`,"success"),o=await Vt.listarPorProjeto(e.id),a(),c()}catch(pe){ne(pe.message,"danger")}})};n.querySelector("#btn-cadastrar-risco").addEventListener("click",()=>{f(null)}),a(),c()}async function h_(n){n.innerHTML=`
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 14px;">
      <div>
        <h1 class="page-title">Histórico & Trilha de Auditoria</h1>
        <p class="subtitle">Registro cronológico de todas as ações, autoria de alterações e governança dos projetos.</p>
      </div>

      <div>
        <button type="button" class="btn btn-secondary" id="btn-atualizar-historico">
          <span class="material-symbols-outlined">refresh</span> Atualizar Log
        </button>
      </div>
    </div>

    <!-- Barra de Filtros -->
    <div class="card" style="padding: 14px 18px; margin-bottom: 20px;">
      <div style="display: flex; gap: 14px; flex-wrap: wrap; align-items: center;">
        <div style="flex: 1; min-width: 240px; position: relative;">
          <input type="text" id="filtro-busca-historico" class="form-input" placeholder="Buscar por detalhes, usuário ou ação..." style="padding-left: 36px;">
          <span class="material-symbols-outlined" style="position: absolute; left: 10px; top: 11px; color: var(--text-muted); font-size: 18px;">search</span>
        </div>

        <div style="min-width: 180px;">
          <select id="filtro-entidade-historico" class="form-select">
            <option value="todas">Todas as Entidades</option>
            <option value="projeto">Projetos</option>
            <option value="diagnostico">Diagnósticos</option>
            <option value="risco">Riscos</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Tabela de Histórico -->
    <div class="table-responsive">
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 170px;">Data & Hora</th>
            <th>Usuário Responsável</th>
            <th>Ação</th>
            <th>Entidade</th>
            <th>Detalhamento da Operação</th>
          </tr>
        </thead>
        <tbody id="tbody-historico">
          <tr><td colspan="5" style="text-align: center; padding: 24px;">Carregando histórico...</td></tr>
        </tbody>
      </table>
    </div>
  `;let e=await Ge.listarLogs();const t=s=>{const o=n.querySelector("#tbody-historico");if(s.length===0){o.innerHTML='<tr><td colspan="5" style="text-align: center; padding: 28px; color: var(--text-muted);">Nenhum registro de histórico encontrado.</td></tr>';return}const a={CRIAR_PROJETO:'<span class="badge badge-success">Criar Projeto</span>',EDITAR_PROJETO:'<span class="badge badge-primary">Editar Projeto</span>',EXCLUIR_PROJETO:'<span class="badge badge-danger">Excluir Projeto</span>',SALVAR_DIAGNOSTICO:'<span class="badge badge-warning">Diagnóstico</span>',CRIAR_RISCO:'<span class="badge badge-success">Novo Risco</span>',EDITAR_RISCO:'<span class="badge badge-primary">Editar Risco</span>',EXCLUIR_RISCO:'<span class="badge badge-danger">Excluir Risco</span>'};o.innerHTML=s.map(c=>{var f,v;const u=c.timestamp?new Date(c.timestamp).toLocaleString("pt-BR"):"—",h=a[c.acao]||`<span class="badge badge-neutral">${c.acao}</span>`;return`
        <tr>
          <td style="font-size: 12px; color: var(--text-secondary); white-space: nowrap;">
            ${u}
          </td>
          <td>
            <div style="font-weight: var(--font-weight-semibold); color: var(--text-main); font-size: 12.5px;">
              ${((f=c.usuario)==null?void 0:f.nome)||"Usuário"}
            </div>
            <div style="font-size: 11px; color: var(--text-muted);">${((v=c.usuario)==null?void 0:v.email)||""}</div>
          </td>
          <td>${h}</td>
          <td><span class="tag" style="text-transform: capitalize;">${c.entidade}</span></td>
          <td style="font-size: 13px; line-height: 1.4; color: var(--text-body);">
            ${c.detalhes||"Sem detalhes informados"}
          </td>
        </tr>
      `}).join("")},r=()=>{var a,c;const s=((a=n.querySelector("#filtro-busca-historico"))==null?void 0:a.value.toLowerCase().trim())||"",o=((c=n.querySelector("#filtro-entidade-historico"))==null?void 0:c.value)||"todas";return e.filter(u=>{var v,E,T,R;const h=!s||((v=u.detalhes)==null?void 0:v.toLowerCase().includes(s))||((T=(E=u.usuario)==null?void 0:E.nome)==null?void 0:T.toLowerCase().includes(s))||((R=u.acao)==null?void 0:R.toLowerCase().includes(s)),f=o==="todas"||u.entidade===o;return h&&f})};n.querySelector("#filtro-busca-historico").addEventListener("input",()=>{t(r())}),n.querySelector("#filtro-entidade-historico").addEventListener("change",()=>{t(r())}),n.querySelector("#btn-atualizar-historico").addEventListener("click",async()=>{e=await Ge.listarLogs(),t(r())}),t(e)}const p_={dashboard:Ad,"info-gerais":Pd,"visao-geral":Cd,projetos:u_,diagnostico:Qi,"matriz-riscos":d_,historico:h_};async function is(){var r;const n=document.getElementById("view-container");if(!n)return;const{activeTab:e}=oe(),t=p_[e]||Ad;n.innerHTML=`
    <div style="display: flex; align-items: center; justify-content: center; min-height: 240px; color: var(--text-muted); gap: 10px;">
      <span class="material-symbols-outlined" style="font-size: 24px; animation: spin 1s infinite linear;">progress_activity</span>
      <span>Carregando dados...</span>
    </div>
  `;try{await t(n)}catch(s){console.error(`Erro ao renderizar view "${e}":`,s),n.innerHTML=`
      <div class="card" style="padding: 24px; border-left: 4px solid var(--color-danger);">
        <h3 style="color: var(--color-danger); margin-bottom: 8px;">Erro ao carregar a página</h3>
        <p style="color: var(--text-secondary); font-size: 13px;">${s.message}</p>
        <button type="button" class="btn btn-secondary btn-sm mt-12" id="btn-retry-view">Tentar novamente</button>
      </div>
    `,(r=n.querySelector("#btn-retry-view"))==null||r.addEventListener("click",is)}}async function dc(){i_(),await o_();const n=await Ne.listarProjetos();n.length>0&&!oe().activeProject&&Ze(n[0]),await is(),_t("tabChange",()=>{is(),window.scrollTo({top:0,behavior:"smooth"})}),_t("projectChange",()=>{const{activeTab:t}=oe();["info-gerais","visao-geral","diagnostico","matriz-riscos","dashboard"].includes(t)&&is()});const e=document.createElement("style");e.textContent=`
    @keyframes spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    .bg-success { background-color: var(--color-success) !important; }
    .bg-warning { background-color: var(--color-warning) !important; }
    .bg-danger { background-color: var(--color-danger) !important; }
    .bg-neutral { background-color: var(--color-neutral) !important; }
  `,document.head.appendChild(e)}document.readyState==="loading"?document.addEventListener("DOMContentLoaded",dc):dc();
//# sourceMappingURL=index-l3lyCBtT.js.map
