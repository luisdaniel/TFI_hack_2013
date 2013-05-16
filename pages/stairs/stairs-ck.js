(function(){function v(){var e,t,n=a.videoWidth/a.videoHeight;if(window.innerHeight*n<window.innerWidth){e=window.innerWidth;t=e/n}else{t=window.innerHeight;e=t*n}a.width=e;a.height=t;a.style.width=e+"px";a.style.height=t+"px";a.style.top=window.innerHeight/2-t/2+"px";a.style.left=window.innerWidth/2-e/2+"px"}function m(){function n(){var r=!1;e.forEach(function(e){e&&(r=e.processVolumeTween()?!0:r)});t=setTimeout(n,10)}var e=[],t=-1;return{start:function(){n()},stop:function(){clearTimeout(t)},prepareVolumeTweenForElement:function(t,n){var r,i;t.volume=r=i=n||0;t.processVolumeTween=function(){i-=(i-t.targetVolume)*.15;var n=Math.round(i*1e3)/1e3;if(n!==t.volume){t.volume=n;return!0}e.splice(e.indexOf(t),1);return!1};Object.defineProperty(t,"targetVolume",{get:function(){return r},set:function(n){e.indexOf(t)===-1&&e.push(t);r=n}})}}}function g(){function s(){if(r.currentTime>r.duration-.2){var o=r.targetVolume,u=r.volume,a=r;setTimeout(function(){a.pause();a.currentTime=0},100);n=(n+1)%2;r=i[n];r.volume=u;r.targetVolume=o;r.play()}e||(t=setTimeout(s,100))}var e=!1,t,n=0,r,i=[document.querySelector("audio[data-background]"),document.querySelector("audio[data-background]").cloneNode(!0)];h.prepareVolumeTweenForElement(i[0],0);h.prepareVolumeTweenForElement(i[1],0);r=i[0];return{start:function(){r.play();s();e=!1},stop:function(){clearTimeout(t);r.pause();e=!0},fadeOut:function(){r.targetVolume=0},fadeIn:function(){r.targetVolume=1}}}function y(){var e=0,n=null,r=[];Array.prototype.forEach.call(document.querySelectorAll("audio[data-floor]"),function(e){var t=Number(e.getAttribute("data-floor"));r[t]=r[t]||[];r[t].push(e);h.prepareVolumeTweenForElement(e,0)});return{resetFloorIndex:function(){e=0},playFloorAudio:function(i){if(!n&&r[l]){n=r[l][e++];n&&setTimeout(function(){n.volume=0;n.targetVolume=1;n.play();n.addEventListener("ended",function(e){n=null;i(e)},!1)},t)}}}}function b(e){function r(){var i=n;t-=(t-c)*.15;n=Math.round(t);n!==i&&(e.innerHTML=n);setTimeout(r,10)}var t=0,n=0;r()}function w(t){var i=document.querySelector("#progress-button"),w=document.querySelector("#progress-explanation"),E=document.querySelector("#stair-counter"),S=document.querySelector("#floor-counter"),x=S.querySelector("span");a=document.querySelector("video");var T=JSON.parse(document.querySelector("#step-data").innerHTML),N=JSON.parse(document.querySelector("#floor-data").innerHTML);Popcorn.plugin("step",{start:function(){++c}});Popcorn.plugin("floor",{start:function(){++l;d.resetFloorIndex();x.innerHTML=l}});var C=[].concat(document.querySelector("audio")).concat(document.querySelector("video"));util.loader.ensureLoaded(C,function(){function x(e){e.preventDefault();if(!t){t=!0;a.play();a.classList.remove("paused");p.fadeOut()}}function C(i){i.preventDefault();if(l===-1&&!c){a.classList.add("paused");l=setTimeout(function(){if(!c){t=!1;a.pause();l=-1;p.fadeIn();function e(){setTimeout(function(){t||d.playFloorAudio(e)},n+Math.round(Math.random()*r))}d.playFloorAudio(e)}},e)}}function k(e){C(e);window.removeEventListener("mouseup",k,!1);window.top.removeEventListener("mouseup",k,!1)}function L(e){w.classList.add("hidden");x(e);window.addEventListener("mouseup",k,!1);window.top.addEventListener("mouseup",k,!1)}var t=!1,l=-1,c=!1;window.addEventListener("resize",v,!1);v();f=Popcorn(a,{});f.cue(s,function(){E.classList.remove("hidden");S.classList.remove("hidden");a.classList.add("paused");setTimeout(function(){i.addEventListener("mousedown",L,!1);a.pause();i.classList.remove("hidden");setTimeout(function(){w.classList.remove("hidden")},500)},1e3)});f.cue(o,function(){i.classList.add("hidden");setTimeout(function(){E.classList.add("hidden");S.classList.add("hidden")},2e3);i.removeEventListener("mousedown",L,!1);window.top.removeEventListener("mouseup",k,!1);a.play();a.classList.remove("paused")});f.cue(u,function(){document.querySelector("#skip-notice").classList.remove("hidden");window.top.addEventListener("keydown",function e(t){if(t.which===32){c=!0;document.querySelector("#skip-notice").classList.add("hidden");w.classList.add("hidden");a.currentTime=o;a.play();window.top.removeEventListener("keydown",e,!1)}},!1)});T.forEach(function(e){f.step({start:Popcorn.util.toSeconds(e,24)})});N.forEach(function(e){f.floor({start:e})});a.classList.add("full-opacity");h=m();d=y();p=g();b(E.querySelector("span"));h.start();p.start();a.play()})}var e=1e3,t=500,n=1500,r=3e3,i=24,s=20+19/i,o=105+0/i,u=10,a,f,l=1,c=0,h,p,d;document.addEventListener("DOMContentLoaded",w,!1)})();