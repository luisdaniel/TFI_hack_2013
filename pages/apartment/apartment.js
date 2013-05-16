(function() {

  var VIDEO_FADE_DURATION = 1000;

  function prepareVolumeTweening () {
    var volumeTweenElements = [];
    var volumeLoopTimeout = -1;

    function volumeLoop () {
      var changed = false;

      volumeTweenElements.forEach(function (obj) {
        if (obj) {
          changed = obj.processVolumeTween() ? true : changed;
        }
      });

      volumeLoopTimeout = setTimeout(volumeLoop, 10);
    }

    return {
      start: function () {
        volumeLoop();
      },
      stop: function () {
        clearTimeout(volumeLoopTimeout);
      },
      prepareVolumeTweenForElement: function (element, startVolume) {
        var _targetVolume;
        element.volume = _targetVolume = startVolume || 0;

        var startTime, originalVolume;

        element.processVolumeTween = function () {
          var time = Date.now();
          var dt = time - startTime;

          var newVolume = originalVolume < _targetVolume ? _targetVolume - originalVolume * dt : originalVolume - _targetVolume * dt;

          if (newVolume !== element.volume) {
            element.volume = newVolume;
            return true;
          }
          volumeTweenElements.splice(volumeTweenElements.indexOf(element), 1);
          return false;
        }
        Object.defineProperty(element, 'targetVolume', {
          get: function() {
            return _targetVolume;
          },
          set: function (val) {
            originalVolume = _targetVolume;
            startTime = Date.now();
            if (volumeTweenElements.indexOf(element) === -1) {
              volumeTweenElements.push(element);              
            }
            _targetVolume = val;
          }
        });
      }
    }
  }

  function init(e) {
    var leftButton = document.querySelector('#left-button');
    var rightButton = document.querySelector('#right-button');

    var backgroundVideo = document.querySelector('video[data-video="background"]');
    var kitchenVideo = document.querySelector('video[data-video="kitchen"]');
    var rightVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="right"]'));
    var leftVideos = Array.prototype.slice.call(document.querySelectorAll('video[data-video="left"]'));
    var videoContainer = document.querySelector('#video-container');
    var centerVideos = [backgroundVideo, kitchenVideo];
    var videos = centerVideos.concat(rightVideos).concat(leftVideos);

    var videoContainerIndex = 0;

    function stopOtherVideos (videos) {
      videos.forEach(function (video) {
        video.pause();
      });
    }

    function playPositionedVideo () {
      var newIndex;
      switch(videoContainerIndex) {
        case -1:
          newIndex = Math.floor(Math.random()*rightVideos.length);
          stopOtherVideos([kitchenVideo]);
          rightVideos[newIndex].hidden = false;
          rightVideos[newIndex].play();
        break;

        case 0:
          stopOtherVideos(rightVideos.concat(leftVideos));
          if (Math.random() > .5) {
            kitchenVideo.hidden = false;
            kitchenVideo.play();
          }
        break;

        case 1:
          newIndex = Math.floor(Math.random()*leftVideos.length);
          stopOtherVideos([kitchenVideo]);
          leftVideos[newIndex].hidden = false;
          leftVideos[newIndex].play();
        break;
      }
    }

    function onLeftButtonClick (e) {
      videoContainerIndex = Math.min(videoContainerIndex + 1, 1);
      playPositionedVideo();
      videoContainer.style.left = 50 + videoContainerIndex * 100 + '%';

      if (videoContainerIndex === 1) {
        leftButton.classList.add('hidden');
        leftButton.removeEventListener('click', onLeftButtonClick, false);
      }
      else if (videoContainerIndex === 0) {
        rightButton.classList.remove('hidden');
        rightButton.addEventListener('click', onRightButtonClick, false);        
      }
    }

    function onRightButtonClick (e) {
      videoContainerIndex = Math.max(videoContainerIndex - 1, -1);
      playPositionedVideo();
      videoContainer.style.left = 50 + videoContainerIndex * 100 + '%';

      if (videoContainerIndex === -1) {
        rightButton.classList.add('hidden');
        rightButton.removeEventListener('click', onRightButtonClick, false);
      }
      else if (videoContainerIndex === 0) {
        leftButton.classList.remove('hidden');
        leftButton.addEventListener('click', onLeftButtonClick, false);        
      }
    }

    leftButton.addEventListener('click', onLeftButtonClick, false);
    rightButton.addEventListener('click', onRightButtonClick, false);

    function positionVideo () {
      var aspectRatio = backgroundVideo.videoWidth / backgroundVideo.videoHeight;
      var scale = 1;

      videoContainer.style.width = backgroundVideo.videoWidth + 'px';
      videoContainer.style.height = backgroundVideo.videoHeight + 'px';
      videoContainer.style.marginLeft = -backgroundVideo.videoWidth / 2 + 'px';
      videoContainer.style.marginTop = -backgroundVideo.videoHeight / 2 + 'px';

      if (window.innerWidth / backgroundVideo.videoWidth * backgroundVideo.videoHeight < window.innerHeight) {
        scale = window.innerHeight / backgroundVideo.videoHeight;
      }
      else {
        scale = window.innerWidth / backgroundVideo.videoWidth;
      }

      videoContainer.style.transform = videoContainer.style.WebkitTransform = videoContainer.style.MozTransform = 
        videoContainer.style.webkitTransform = videoContainer.style.mozTransform = 'scale(' + scale + ')';

    }

    Popcorn.plugin('step', {
      start: function () {
        ++numSteps;
      }
    });

    Popcorn.plugin('floor', {
      start: function () {
        ++numFloors;
        floorAudioController.resetFloorIndex();
        floorCounterSpan.innerHTML = numFloors;
      }
    });

    var assets = videos;

    util.loader.ensureLoaded(assets, function(){
      window.addEventListener('resize', positionVideo, false);
      positionVideo();
      
      var volumeTweenController = prepareVolumeTweening();

      volumeTweenController.start();

      rightVideos.concat(leftVideos).concat(kitchenVideo).forEach(function (video) {
        volumeTweenController.prepareVolumeTweenForElement(video, 0);
      });

      volumeTweenController.prepareVolumeTweenForElement(backgroundVideo, 1);

      backgroundVideo.play();
    });
  }

  document.addEventListener('DOMContentLoaded', init, false);
}());