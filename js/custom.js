$(function(){
  setTimeout(function(){$('.lead').slideUp('slow');},30000);
  $('audio').mediaelementplayer({
    success: function (mediaElement, domObject) {
      mediaElement.addEventListener('ended', function (e) {
        mejsPlayNext(e.target);
        },
        false);
      },
    error: function () {
      alert('Sorry, an error has occurred. Try refreshing the page.');
    },
    enableAutosize: true,
    keyActions: []
  });

  $('.mejs-list li :not a').click(function() {
    $(this).addClass('current').siblings().removeClass('current');
    var audio_src = $(this).data('file');
    $('audio#mejs:first').each(function(){
      this.player.pause();
      this.player.setSrc(audio_src);
      this.player.play();
    });
  });
});

function mejsPlayNext(currentPlayer) {
  if ($('.mejs-list li.current').length > 0){ // get the .current song
    var current_item = $('.mejs-list li.current:first'); // :first is added if we have few .current classes
    var audio_src = $(current_item).next().data('file');
    $(current_item).next().addClass('current').siblings().removeClass('current');
  }
  else { // if there is no .current class
    var current_item = $('.mejs-list li:first'); // get :first if we don't have .current class
    var audio_src = $(current_item).next().data('file');
    $(current_item).next().addClass('current').siblings().removeClass('current');
  }

  if( $(current_item).is(':last-child') ) { // if it is last - stop playing
    $(current_item).removeClass('current');
  }
  else {
    currentPlayer.setSrc(audio_src);
    currentPlayer.play();
  }
}
