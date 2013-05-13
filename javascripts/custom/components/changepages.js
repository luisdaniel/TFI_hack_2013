var pages=[];

            pages[0]="pages/1.html";
            // pages[1]="pages/2.html";
            // pages[2]="pages/3.html";
            // pages[3]="pages/4.html";
            // pages[4]="pages/5.html";

            var pagetitles=[];

            pagetitles[0]="Introduction";
            // pagetitles[1]="Tile";
            // pagetitles[2]="Tile";
            // pagetitles[3]="Tile";
            // pagetitles[4]="Tile";

            var sceneFrameList = [
              ["pages/1/1.html", "pages/1/2.html", "pages/1/3.html", "pages/1/7.html"]
            ];

            var frames = [];

            function framesList(value){
              frames = sceneFrameList[value];
            };


            // page navigation code

            var pageIndex = 0,
            frameIndex = 0,
            // lightboxIndex = 0,
            end = pages.length - 1,
            // frameEnd = frames.length - 1,
            pageview = $(".pageview"),
            pageview_width = 0,
            frameview = $(".frameview").first(),
            nextbutton = $(".nextbutton"),
            prevbutton = $(".prevbutton"),
            chapters = $(".chapters"),
            pagecounter = $(".pagecounter"),
            pagetitle = $(".pagetitle"),
            framecounter = $(".framecounter"),
            overlay = $('.overlay'),
            body = $("body"),
            navList = $("#mainnav"),
            filmStripLooping = false;



            function hideNavNext() {nextbutton.addClass('hidden');}
            function showNavNext() {nextbutton.removeClass('hidden');}
            function hideNavPrev() {prevbutton.addClass('hidden');}
            function showNavPrev() {prevbutton.removeClass('hidden');}
            function hideNav() {nextbutton.addClass('hidden'); prevbutton.addClass('hidden');}
            function showNav() {nextbutton.removeClass('hidden'); prevbutton.removeClass('hidden');}


            // Fills the navigation with the appropriate links and dropdowns
            $.each(pages, function(pageNumber){
                  framesList(pageNumber);
                  var navPage = $('<li/>').appendTo(navList);
                  var navPageLink = $('<a/>').text(pagetitles[pageNumber]).attr('onClick', 'changePage('+ pageNumber +')').appendTo(navPage);

                  if (frames.length > 1) {
                    navPage.addClass('has-dropdown');
                    var navPageList = $('<ul />').addClass('dropdown').appendTo(navPage);

                    $.each(frames, function(frameNumber){
                          var navFrame = $('<li/>').appendTo(navPageList);
                          var navFrameLink = $('<a/>').text('Page ' + (frameNumber + 1)).attr('onClick', 'changePage('+ pageNumber +', ' +frameNumber +')').appendTo(navFrame);
                    });
                  };  
            });


            function changeFrame(value) {
              frameview = $(".frameview").first();
    
              framesList(pageIndex);

              frameEnd = 0;
              if (frames.length > 1) { frameEnd = frames.length - 1; };

              
                if (value==="next") {        frameIndex===frameEnd ? frameIndex=0 : frameIndex++;
                } else if (value==="prev") { frameIndex===0 ? frameIndex=frameEnd : frameIndex--;
                } else if (value==="first"){ frameIndex = 0
                } else if (value==="last"){  frameIndex = frameEnd
                } else {                     frameIndex = parseInt(value);
                }


                frameview.fadeOut('fast', function() { 
                  changeSound();
                    frameview.removeClass('loaded').load(frames[frameIndex], function() { 
                        frameview.show();
                    }); 
                });

                framecounter.text((frameIndex+1) + "/" + (frameEnd+1));

                if(pageIndex === end && frameIndex === frameEnd){ hideNavNext(); showNavPrev(); }
                else if (pageIndex === 0 && frameIndex === 0)   { showNavNext(); hideNavPrev(); }
                else                                            { showNav(); }

            }


            function changePage(value, frame) {

                if (value==="next") {        pageIndex===end ? pageIndex=0 : pageIndex++;
                } else if (value==="prev") { pageIndex===0 ? pageIndex=end : pageIndex--;
                } else if (value==="first"){ pageIndex = 0
                } else if (value==="last"){  pageIndex = end
                } else {                     pageIndex = parseInt(value);
                }

                framesList(pageIndex);
                
                pageview.fadeOut('fast', function() { 
                    pageview.removeClass('loaded').load(pages[pageIndex], function() {
                        frame ? changeFrame(frame) : changeFrame('0');
                        pageview.fadeIn();
                    }); 
                });

                pagetitle.text(pagetitles[pageIndex]);
              
            }

        function next() { 
            if (frameIndex !== frameEnd) { changeFrame('next'); } 
            else if(pageIndex < end){ changePage('next'); }
        }; 

        function prev() { 
            if (frameIndex !== 0) { changeFrame('prev'); } 
            else if(pageIndex > 0){ changePage('prev', 'last');}
        };


        //hacky way im showing/hiding elements located in the persistant level (page)
        function showElementsOnFrame(){
          $('.show-frames').each(function(){
            var $tempObject = $(this),
            frames = $tempObject.data('show-frames');
            $tempObject.addClass('hidden'); 
            frames = frames + ","
            frames = frames.split(",");
            
              for (a in frames ) {
                frames[a] = parseInt(frames[a], 10);
              }

            if ( $.inArray((frameIndex+1), frames) > -1) { 
              $tempObject.removeClass('hidden');  
            };
            

          });
        }
