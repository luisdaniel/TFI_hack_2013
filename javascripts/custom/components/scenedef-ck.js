function getCurrentFrameUrl(){return _pages.getFrames(_pageIndex)[_frameIndex].url}var Pages=function(){var e=[{url:"pages/1.html",title:"Introduction",transition:"fade",sound:{urls:["assets/1/sound/1.background_audio_track_full.mp3"],loop:!0,buffer:!0,autoplay:!1,fadein:800},frames:[{url:"pages/1/1.html",sound:{urls:["assets/1/sound/1.1_background.wav.mp3","assets/1/sound/1.1_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[]},{url:"pages/1/2.html",sound:{urls:["assets/1/sound/1.2_background.wav.mp3","assets/1/sound/1.2_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[]},{url:"pages/1/3.html",sound:{urls:["assets/1/sound/1.3_background.wav.mp3","assets/1/sound/1.3_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[{urls:["1.3_narrative.wav.mp3","1.3_narrative.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:3e3}]},{url:"pages/1/4.html",sound:{urls:["assets/1/sound/1.4_background.wav.mp3","assets/1/sound/1.4_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[]},{url:"pages/1/5.html",sound:{urls:["assets/1/sound/1.5_background.wav.mp3","assets/1/sound/1.5_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[{urls:["1.5_narrative.wav.mp3","1.5_narrative.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:3e3}]},{url:"pages/1/6.html",sound:{urls:["assets/1/sound/1.6_background.wav.mp3","assets/1/sound/1.6_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/7.html",sound:{urls:["assets/1/sound/1.7_background.wav.mp3","assets/1/sound/1.7_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[{urls:["1.7_narrative_a.wav.mp3","1.7_narrative_a.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:3e3},{urls:["1.7_narrative_b.wav.mp3","1.7_narrative_b.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:3e3}]},{url:"pages/1/8.html",sound:{urls:["assets/1/sound/1.8_background.wav.mp3","assets/1/sound/1.8_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800}},{url:"pages/1/9.html",sound:{urls:["assets/1/sound/1.9_background.wav.mp3","assets/1/sound/1.9_background.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:800},narration:[{urls:["1.9_narrative.wav.mp3","1.9_narrative.oga"],loop:!1,buffer:!0,autoplay:!1,fadein:0,delay:3e3}]}]},{url:"pages/2.html",title:"The Stairs",frames:[{url:"pages/2/1.html"}]},{url:"pages/4.html",title:"Apartment",frames:[{url:"pages/4/1.html"}]},{url:"pages/5.html",title:"Tile",frames:[{url:"pages/5/1.html"},{url:"pages/5/2.html"},{url:"pages/5/3.html"}]}];this.pageCount=function(){return e.length};this.getPageInfo=function(t){return e[t]};this.getPageTitle=function(t){return e[t].title};this.getTransition=function(t){return e[t].transition||"fade"};this.getPageUrl=function(t){return e[t].url};this.getFrameSound=function(t,n){return e[t].frames[n].sound};this.getPageSound=function(t,n){return e[t].sound};this.getFrameNarration=function(t,n){return e[t].frames[n].narration};this.getFrames=function(t){return e[t].frames};this.getFrameCount=function(t){return e[t].frames.length}},_pages=new Pages;