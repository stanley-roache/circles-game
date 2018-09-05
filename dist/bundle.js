!function(t){var i={};function e(o){if(i[o])return i[o].exports;var s=i[o]={i:o,l:!1,exports:{}};return t[o].call(s.exports,s,s.exports,e),s.l=!0,s.exports}e.m=t,e.c=i,e.d=function(t,i,o){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:o})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var o=Object.create(null);if(e.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var s in t)e.d(o,s,function(i){return t[i]}.bind(null,s));return o},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=1)}([function(t,i){window.GLOBALS={blobs:[],windowSize:{horizontal:0,vertical:0},keyState:{left:!1,right:!1,down:!1,up:!1},gameState:{gravity:!1,repulsion:!1,drag:!0,borderBounce:!0,borderTeleport:!1},player:null,pairwiseForceStrength:1,viewDistance:200,initialSize:10,initialPos:[50,50],speedUp:.5,diagonal:1/Math.sqrt(2),maxPop:10,drag:.004,appetite:5e-4,G:.5,R:-.5,minSize:10,borderElasticity:.005,fps:50}},function(t,i,e){"use strict";e.r(i);e(0);const o=5;let s=[],r=0;for(let t=0;t<o;t++)s.push(new Audio("sounds/bubble_pop.mp3"));function n(){return document.getElementById("game-display")}let{windowSize:a,keyState:h,gameState:l,player:d,pairwiseForceStrength:c,viewDistance:p,initialSize:u,initialPos:y,speedUp:v,diagonal:g,maxPop:w,drag:f,appetite:b,G:m,R:M,minSize:k,borderElasticity:S,fps:D}=window.GLOBALS;class z{constructor(t,i,e=[0,0],o=!1,s=[0,0]){this.radius=t,this.mass=Math.pow(t,3),this.position=i,this.velocity=e,this.force=[0,0],this.isPlayer=o,this.pairwiseForce=s,this.moving=!1,this.blobDiv=document.createElement("div"),this.blobDiv.classList.add("blob"),n().appendChild(this.blobDiv),o&&(this.blobDiv.id="player")}update(){this.move(),l.drag&&this.viscosity(),this.accelerate(),l.borderTeleport&&this.teleport(),l.borderBounce&&this.borderBounce(),this.updateDiv(),(l.gravity||l.repulsion)&&(this.pairwiseForce=[0,0])}updatePlayerForce(){h.up?h.left?this.force=[-g,g]:h.right?this.force=[g,g]:this.force=[0,1]:h.down?h.left?this.force=[-g,-g]:h.right?this.force=[g,-g]:this.force=[0,-1]:h.right?this.force=[1,0]:h.left?this.force=[-1,0]:this.force=[0,0]}blobWander(){this.moving&&Math.random()>.95&&this.newRandomDirection(),Math.random()>.993&&this.toggleMoving()}newRandomDirection(){let t=2*Math.random()*Math.PI,i=Math.random();this.force[0]=Math.cos(t)*i,this.force[1]=Math.sin(t)*i}toggleMoving(){this.moving=!this.moving}getAbsVel(){return Math.sqrt(Math.pow(this.velocity[0],2)+Math.pow(this.velocity[1],2))}updateDiv(){this.blobDiv.style.left=this.position[0]-this.radius+"px",this.blobDiv.style.bottom=this.position[1]-this.radius+"px",this.blobDiv.style.height=2*this.radius+"px",this.blobDiv.style.width=2*this.radius+"px"}move(){this.position[0]+=this.velocity[0],this.position[1]+=this.velocity[1]}viscosity(){this.velocity[0]*=1-f*Math.sqrt(this.radius)*Math.abs(this.velocity[0]),this.velocity[1]*=1-f*Math.sqrt(this.radius)*Math.abs(this.velocity[1])}hunger(){this.radius>k&&(this.radius*=1-b)}getRadius(){return this.radius}getMass(){return this.mass}getVel(){return this.velocity}getPos(){return this.position}getForce(){return this.force}setForce(t){this.force=t}adjustVelocityBy(t){this.velocity[0]+=t[0],this.velocity[1]+=t[1]}adjustPositionBy(t){this.position[0]+=t[0],this.position[1]+=t[1]}accelerate(){l.drag&&(this.velocity[0]+=v*this.force[0],this.velocity[1]+=v*this.force[1]),(l.gravity||l.repulsion)&&(this.velocity[0]+=this.pairwiseForce[0]/this.mass,this.velocity[1]+=this.pairwiseForce[1]/this.mass)}borderBounce(){this.position[0]<-this.radius?this.velocity[0]-=S*(this.position[0]+this.radius):this.position[0]>this.radius+a.horizontal&&(this.velocity[0]-=S*(this.position[0]-this.radius-a.horizontal)),this.position[1]<-this.radius?this.velocity[1]-=S*(this.position[1]+this.radius):this.position[1]>this.radius+a.vertical&&(this.velocity[1]-=S*(this.position[1]-this.radius-a.vertical))}teleport(){this.position[0]=(this.position[0]+a.horizontal)%a.horizontal,this.position[1]=(this.position[1]+a.vertical)%a.vertical}deleteDiv(){this.blobDiv.parentNode.removeChild(this.blobDiv)}biggerThan(t){return this.radius>=t.radius}consume(t,i=!1){const e=Math.pow(t.radius,3)/(Math.pow(this.radius,3)+Math.pow(t.radius,3));let n=[this.position[0]+(t.position[0]-this.position[0])*e,this.position[1]+(t.position[1]-this.position[1])*e],a=[this.velocity[0]+(t.velocity[0]-this.velocity[0])*e,this.velocity[1]+(t.velocity[1]-this.velocity[1])*e],h=Math.pow(Math.pow(this.radius,3)+Math.pow(t.radius,3),1/3);return t.deleteDiv(),this.deleteDiv(),s[r=(r+1)%o].play(),new z(h,n,a,i)}setOpacity(t){this.blobDiv.style.opacity=t}static getDistance(t,i,e){const o=Math.sqrt(Math.pow(t.position[0]-i.position[0],2)+Math.pow(t.position[1]-i.position[1],2));return e?o:o-(t.radius+i.radius)}static pairwiseInteraction(t,i){if(l.gravity||l.repulsion){const e=z.getDistance(t,i,!0);let o=c*t.mass*i.mass/Math.pow(e,2);const s=(o*=l.gravity?m:M)*(t.position[0]-i.position[0])/e,r=o*(t.position[1]-i.position[1])/e;t.pairwiseForce[0]-=s,t.pairwiseForce[1]-=r,i.pairwiseForce[0]+=s,i.pairwiseForce[1]+=r}}}let{blobs:C,windowSize:P,keyState:F,gameState:B,player:x,viewDistance:O,initialSize:L,initialPos:j,maxPop:T,fps:E}=window.GLOBALS;function I(){document.getElementById("instructions").classList.toggle("hidden")}function _(){x=null,I(),C.forEach(t=>{t.setOpacity(1)})}function R(t=.8*L*Math.pow(5,Math.pow(Math.random(),2)),i=function(){let t,i=4*Math.random();t=i<1?[0,P.vertical*i]:i<2?[P.horizontal*(i-1),0]:i<3?[P.horizontal,P.vertical*(i-2)]:[P.horizontal*(i-3),0];return t}(),e=[4*Math.random()-2,4*Math.random()-2]){let o=new z(t,i,e,!1);C.push(o)}window.iteration=function(){C.length<T&&Math.random()>.99&&R(),x&&(x.update(),O=10*L+5*x.radius);for(var t=[],i=0;i<C.length;i++)if(C[i]){if(C[i].blobWander(),C[i].update(),x){let t=z.getDistance(x,C[i],!1);if(t<0){if(x.biggerThan(C[i])){var e=x.getForce();(x=x.consume(C[i],!0)).setForce(e),C[i]=null;continue}C[i]=C[i].consume(x),_()}else C[i].setOpacity(Math.max(1-t/O,0)),z.pairwiseInteraction(x,C[i])}for(var o=i+1;o<C.length;o++)C[o]&&(z.getDistance(C[i],C[o],!1)<0?(C[i].biggerThan(C[o])?C[i]=C[i].consume(C[o]):C[i]=C[o].consume(C[i]),C[o]=null):z.pairwiseInteraction(C[i],C[o]));t.push(C[i])}C=t},window.updateWindowSize=function(){let t=n().getBoundingClientRect();P.horizontal=t.width,P.vertical=t.height,j=[P.horizontal/2,P.vertical/2]},window.keyDown=function(t){39===t.keyCode?F.right=!0:37===t.keyCode?F.left=!0:38===t.keyCode?F.up=!0:40===t.keyCode?F.down=!0:71===t.keyCode?(B.gravity=!0,B.repulsion=!1):82===t.keyCode?(B.gravity=!1,B.repulsion=!0):70===t.keyCode&&(B.drag=!1),x&&x.updatePlayerForce()},window.keyUp=function(t){39===t.keyCode?F.right=!1:37===t.keyCode?F.left=!1:38===t.keyCode?F.up=!1:40===t.keyCode?F.down=!1:71===t.keyCode?(B.gravity=!1,pairwiseForceStrength=0):82===t.keyCode?(B.repulsion=!1,pairwiseForceStrength=0):70===t.keyCode?B.drag=!0:84===t.keyCode?(B.borderTeleport=!B.borderTeleport,B.borderTeleport&&(B.borderBounce=!1)):66===t.keyCode?(B.borderBounce=!B.borderBounce,B.borderBounce&&(B.borderTeleport=!1)):90===t.keyCode?function(){let t=[0,0],i=[0,0],e=0,o=x?C.concat([x]):C;for(let s=0;s<o.length;s++){let r=o[s].getMass(),n=o[s].getVel(),a=o[s].getPos();e+=r,t[0]+=n[0]*r,t[1]+=n[1]*r,i[0]+=a[0]*r,i[1]+=a[1]*r}let s=[-t[0]/e,-t[1]/e],r=[j[0]-i[0]/e,j[1]-i[1]/e];for(let t=0;t<o.length;t++)o[t].adjustVelocityBy(s),o[t].adjustPositionBy(r)}():65===t.keyCode&&R(),x&&x.updatePlayerForce()},window.keyPress=function(t){32===t.keyCode&&(x||(x=new z(L,j.slice(),[0,0],!0),I()))},window.onload=function(){updateWindowSize(),document.addEventListener("keydown",keyDown,!1),document.addEventListener("keyup",keyUp,!1),document.addEventListener("keypress",keyPress,!1),window.addEventListener("resize",updateWindowSize,!1),I(),setInterval(iteration,1e3/E)}}]);
//# sourceMappingURL=bundle.js.map