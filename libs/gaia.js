$(document).ready(function () 
{

    var list = document.getElementById('allnature');

    var naturevids = document.getElementsByTagName('video');
    var nbofvids = naturevids.length;

    for(var v=0; v<nbofvids; v++)
    {
      // getting tags
      var classlist = naturevids[v].className.split(' ');
      var categories =  classlist; //classlist.filter(function (x) {return x !== 'd-none'});
      // hiding handwritten content
      $(naturevids[v]).addClass('d-none');


      var _id = 'video' + v;
      var _contentid = 'content' + v;
      var elem = "<div class=\"accordion-item " + categories.join(' ') + "\"> \
        <h2 class=accordion-header id=" + _id + ">  \
          <button class=\"accordion-button collapsed\" type=button data-bs-toggle=collapse \
          data-bs-target=#" + _contentid + " aria-expanded=false aria-controls=" + _contentid +  "> " +
          $(naturevids[v]).attr('title') + " </button> </h2> \
          <div id=\"" + _contentid + "\" class=\"accordion-collapse collapse\" aria-labelledby=" + _id + "> \
            <div class=accordion-body data-src=" + $(naturevids[v]).attr('link') + ">  <br>" + naturevids[v].innerHTML + "</div> </div> \
        </div>";

      list.innerHTML += elem;
    }


    // loading video only when accordion item is clicked (better loading)
    $('.accordion-item').click(function(){
          if($(this).find('video').length == 0){
            var ebody = $(this).find('.accordion-body');
            var link = ebody.attr("data-src");
            var htmlcode = "<video width=640 height=264 class=\"video-js vjs-default-skin\" controls \
                              data-setup='{ \"techOrder\": [\"youtube\", \"html5\"] }' poster=../media/Monad.png> <source src=" + link + 
                              " type=video/mp4> </video>";
            ebody.prepend(htmlcode);
          }
      
    });


      /////////////////////////filters///////////////////////////
      cats = [];
      for (var s = 0; s < nbofvids; s++) {
          // getting tags
          var classlist = naturevids[s].className.split(' ');
          var categories = classlist.filter(function (x) {return x !== 'd-none'});

          // appending tags for filter bar
          for (var k =0 ; k < categories.length ; k++) {
              cats.push(categories[k]);
          }
          cats = [...new Set(cats)];
      }


      // setting filters
      for (var k=0; k<cats.length;k++)
      {
          var badge = $("<span class='badge bg-success'>").text(cats[k]);

          $('#filters').append(badge[0]);
          $('#filters').append(' ');
      }

      // filtering
      var videoitems = document.getElementsByClassName('accordion-item');

      $(".badge").css('cursor', 'pointer');
      var alreadyselectedtags = [];
      $('.badge').click(function()
      {
          var tag = $(this).text();
          // hide all vieos (generated accordion items)
          $('.accordion-item').hide();

          if ($(this).hasClass('bg-success'))
          {
              // adding selected tag
              alreadyselectedtags.push(tag);

              $(this).removeClass('bg-success');
              $(this).addClass('bg-danger');

              $('.accordion-item').each(function(index){
                  if(alreadyselectedtags.every(c => [...this.classList].includes(c))) $(this).show();
                  else $(this).hide();
              });
          }
          else if ($(this).hasClass('bg-danger'))
          {
              // removing deselected tag
              alreadyselectedtags = alreadyselectedtags.filter(function(elem){
                  return elem != tag;
              });

              $(this).removeClass('bg-danger');
              $(this).addClass('bg-success');

              $('.accordion-item').each(function(index){
                      if(alreadyselectedtags.every(c => [...this.classList].includes(c))) $(this).show();
                      else $(this).hide();
              });

          }
          
          if (alreadyselectedtags.length==0)
              $('.accordion-item').show();

      });


      // button coloring
      var buts = $(".accordion-button");
      for (var i = 0; i < buts.length; i++) {
          var r = 0; var g = 0; var b = 0;

          if ($(buts[i]).parents()[0].id.search("video") >= 0) {
              r = 50; g = 100; b = 200;
          }
          buts[i].style.backgroundColor = "rgb(" + r + ", " + g + ", " + b + ")";
      }
  
      /////////////////////////end of filters///////////////////////////////


    function randShuffle(){
        var cards = $(".accordion-item");
        // random reordering
        for(var i = 0; i < cards.length; i++){
            var target = Math.floor(Math.random() * cards.length -1) + 1;
            var target2 = Math.floor(Math.random() * cards.length -1) +1;
            cards.eq(target).before(cards.eq(target2));
        }

        // random coloring
        var buts = $(".accordion-button");
        for(var i = 0; i < buts.length; i++){

            var r = Math.floor(Math.random()*255);
            var g = Math.floor(Math.random()*255);
            var b = Math.floor(Math.random()*255);

            buts[i].style.backgroundColor="rgb("+r+", "+g+", "+b+")";
        }
    }

    randShuffle();
    $('#cardshuffle').click(function(){
        randShuffle();
    });

    
});