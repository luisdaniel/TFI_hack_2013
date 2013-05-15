
            var currentFrameNarration = null,
                currentFrameBackground = null;
                currentPageBackground = null;

            // page background audio
            function changePageBackground(info) { 
              if (currentPageBackground)
                currentPageBackground.fadeOut(0, 400);
              if (!info) return; 

              currentPageBackground = new Howl(info);
              currentPageBackground.fadeIn(1, info.fadein || 800); 
            }

            function changeFrameBackground(info) { 
              if (currentFrameBackground)
                currentFrameBackground.fadeOut(0, 400);
              if (!info) return; 

              currentFrameBackground = new Howl(info);
              currentFrameBackground.fadeIn(1, info.fadein || 800); 
            }

            function delayAudio(cfa, si) {
              // todo track timer to cancel
              setTimeout( 
                function () { 
                  cfa.fadeIn(1, si.fadein || 0); 
                },
                si.delay
              );
            }

            // frame background audio
            function changeFrameNarration(info) { 
              // cancel current frame audio instances
              if (currentFrameNarration) {
                currentFrameNarration.fadeOut(0,400);
              }

              if (!info) return; 

              if (Array.isArray(info)) {
                for (var i=0; i< info.length; i++) {
                  var si = info[i]; 
                  if (si.played) continue;
                  currentFrameNarration = new Howl(si);
                  if (si.delay) {
                    delayAudio(currentFrameNarration, si);
                  }
                  else  
                    currentFrameNarration.fadeIn(1, si.fadein || 0); 
                }
              }
              else {
                if (info.played) return;
                info.played = true;
                currentFrameNarration = new Howl(info);
                currentFrameNarration.fadeIn(1, info.fadein || 0); 
              }
            }

            function toggleSound(){
              if (soundEnabled) {
                soundEnabled = false;
                Howler.mute();
                $('.audio').text('Enable Audio');
              } else{
                soundEnabled = true;
                Howler.unmute();
                $('.audio').text('Disable Audio')
              };
            }