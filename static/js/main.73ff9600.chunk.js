(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{28:function(e,t,n){e.exports=n(43)},33:function(e,t,n){},37:function(e,t,n){},43:function(e,t,n){"use strict";n.r(t);var a=n(0),l=n.n(a),s=n(6),r=n.n(s),c=(n(33),n(15)),o=n(16),i=n(25),u=n(17),m=n(26),d=n(8),h=n(18),y=(n(35),n(37),n(3)),f=n(19),b=n(45),g=n(46),v=n(47),p=n(48),E=n(20);function w(){var e=Object(h.a)(["\n  list-style: none;\n  padding: 0;\n  font-size: 0.9rem;\n"]);return w=function(){return e},e}var C=new Audio("./MM_ClockTower_Bell.wav"),k=E.a.ul(w()),B=function(e){function t(e){var n;return Object(c.a)(this,t),n=Object(i.a)(this,Object(u.a)(t).call(this,e)),Object(y.f)(Object(d.a)(Object(d.a)(n)),{cycleStats:{},timeLeft:0,dayOrNight:"",soundEnabled:!0,bounties:[],bellPlayed:!1,solarisBounties:[],themeButtonClass:"btn btn-light",themeToggle:!0,themes:{dark:{color:"#cccccc",bgcolor:"#1c1e27",themeButtonClass:"btn btn-light"},light:{color:"#1c1e27",bgcolor:"#cccccc",themeButtonClass:"btn btn-dark"}}}),n.timeInterval=null,n.updateCetusCycle(),setInterval(function(){0===n.bounties.length&&n.updateCetusCycle()},6e4),n}return Object(m.a)(t,e),Object(o.a)(t,[{key:"render",value:function(){var e=this;return this.cycleStats&&l.a.createElement("div",null,l.a.createElement("div",{className:"d-flex justify-content-end m-3"},l.a.createElement("button",{type:"button",className:this.themeButtonClass,onClick:function(){var t=e.themeToggle?"light":"dark";document.documentElement.style.setProperty("--bg-color",e.themes[t].bgcolor),document.documentElement.style.setProperty("--color",e.themes[t].color),e.themeButtonClass=e.themes[t].themeButtonClass,e.themeToggle=!e.themeToggle}},"Invert colors")),l.a.createElement("div",{className:"cycle-stats"},l.a.createElement("p",null,"Currently it is: ",this.dayOrNight),l.a.createElement("p",null,"Time left:"," ",0!==this.timeLeft?function(e){var t=(e=(e-e%1e3)/1e3)%60,n=(e=(e-t)/60)%60;return(e-n)/60+":"+(n<10?"0"+n:n)+":"+(t<10?"0"+t:t)}(this.timeLeft):"awaiting update..."),l.a.createElement(b.a,{type:"switch",id:"soundToggle",name:"soundToggle",label:"Enable sound on nightfall",defaultChecked:!0,onChange:function(t){e.soundEnabled=t.currentTarget.checked}})),l.a.createElement("div",null,l.a.createElement(g.a,{className:"text-center"},l.a.createElement("h4",{className:"mt-5 mb-2"},"Cetus Bounties"),l.a.createElement(v.a,{className:"mt-4"},this.bounties&&Array.isArray(this.bounties.jobs)&&this.bounties.jobs.map(function(e,t){return l.a.createElement(p.a,{key:t},l.a.createElement("h5",null,e.type),Array.isArray(e.rewardPool)&&l.a.createElement(k,null,e.rewardPool.map(function(e,t){return l.a.createElement("li",{key:t},e)})))}))),l.a.createElement(g.a,{className:"text-center"},l.a.createElement("h4",{className:"mt-5 mb-2"},"Fortuna Bounties"),l.a.createElement(v.a,{className:"mt-4"},this.solarisBounties&&Array.isArray(this.solarisBounties.jobs)&&this.solarisBounties.jobs.map(function(e,t){return l.a.createElement(p.a,{key:t},l.a.createElement("h5",null,e.type),Array.isArray(e.rewardPool)&&l.a.createElement(k,null,e.rewardPool.map(function(e,t){return l.a.createElement("li",{key:t},e)})))})))))}},{key:"updateCetusCycle",value:function(){var e=this;fetch("https://api.warframestat.us/pc").then(function(e){return e.json()}).then(function(t){var n=t.cetusCycle;e.cycleStats=n,e.bellPlayed=!1,e.cycleStats&&(e.dayOrNight=e.cycleStats.isDay?"day":"night"),console.log(e.cycleStats,new Date),e.updateTimeLeft(),e.timeInterval&&clearInterval(e.timeInterval),e.timeLeft<0?(clearInterval(e.timeInterval),e.timeLeft=0,e.timeInterval=setInterval(function(){e.updateCetusCycle()},2e4)):e.timeInterval=setInterval(function(){e.updateTimeLeft(),e.timeLeft<0&&(clearInterval(e.timeInterval),e.updateCetusCycle())},250);try{var a=t.syndicateMissions.find(function(e){return"Ostrons"===e.syndicate});e.bounties=a,console.log(t.syndicateMissions);var l=t.syndicateMissions.find(function(e){return"Solaris United"===e.syndicate});e.solarisBounties=l}catch(s){console.warn("Bounties not found")}}).catch(function(){setTimeout(function(){e.updateCetusCycle()},3e4)})}},{key:"updateTimeLeft",value:function(){this.timeLeft=new Date(this.cycleStats.expiry).getTime()-Date.now(),this.cycleStats&&"day"===this.dayOrNight&&this.soundEnabled&&this.timeLeft<5e3&&this.timeLeft>0&&!this.bellPlayed&&(C.play(),this.bellPlayed=!0)}}]),t}(a.Component);var j=Object(f.a)(B);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(l.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[28,2,1]]]);
//# sourceMappingURL=main.73ff9600.chunk.js.map