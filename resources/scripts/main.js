$(document).ready(function(){
  $('nav li').click(function(){
    var target = $(this).index();
      // Disable All

      $('main > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
      $('main section').each(function(i){if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
      $('nav li').each(function(i){if(i==target){ $(this).attr('selected', ''); return; } $(this).removeAttr('selected');});
      // Select One
      //$('header section').eq(target).attr('active','');
      //$('main section').eq(target).attr('active','');
      //$('nav li').eq(target).attr('active','');
    });



    var timeout = 2;
    var sec=0;
    var a= setInterval( function(){
      sec++;
      if(sec==timeout){ //$('div[alert]').attr('active',''); }
      }
    },1000
  );





console.log(navigator.onLine);






});


function graphColumn(title, className, items){
  if(items<=2)return;
  content=``;
  for(i=0;i<items;i++){
    content+=`<div column><div column-fill class="${className}"></div></div>`;
  }
  var template = `<header>${title}</header><div graph items="${items}>${content}</div>"`;
  return template;
}

function toggleSwitchRequest(target){
  event.preventDefault();
  if(!navigator.onLine) {console.log('Youre offline' + navigator.onLine); return;}
  var toggle = Number($(`#${target}`).prop('checked'));
  console.log(toggle);
  requestUrl = `/toggle.php?toggle=${target}&value=${toggle}`
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "POST", requestUrl, false ); // false for synchronous request
  xmlHttp.send( null );
  console.log('response: ' + xmlHttp.responseText + Boolean(xmlHttp.responseText));
  $(`#${target}`).prop('checked', Boolean(xmlHttp.responseText));
}

function interface_alert(alert){
  $('.modal').html(`<div modal><div backdrop onclick="closeAlert()"></div><div alert>${alert}</div><span>Click anywhere to continue</span></div>`);
}
function closeAlert(){
  $('.modal').html('');
}


var Modal = {
  alert: function(message){
    $('div[alert] article').html(message);
    $('div[alert]').attr('active','').animate({opacity:1}, 200, function(){
      //Callback
      $('div[alert] center').stop().animate({ marginTop:'28vh' },150).animate({ marginTop:'30vh' },100);
      $('div[alert]').click(function (e) {
        if ($(e.target.tagName).is('article')){return;}
        $('div[alert] center').animate({marginTop:'100vh'}, 100, function(){
          //Callback
          $('div[alert]').animate({opacity:0}, 150).removeAttr('active'); });
          $('div[alert]').unbind();
    });
  })},
  slider: function(){
    //Open

    $('div[slider]').attr('active','');

      $('div[slider]').attr('active','').animate({scrollTop: ($('div[slider]').height()) }, 200);
    //Bind
    setTimeout( function(){
      $('div[slider]').bind('scroll', function() {
        var scroll = $('div[slider]').scrollTop();
        var height = $(window).height();
        $('div[backdrop]').css({opacity:(0.9*scroll)/height});
          if(scroll==0){
            $('div[slider]').removeAttr('active').unbind();
          }
        });// bind
      },50);//timeout
      },
  sliderOnload:false,
  prompt: function(message, callback){
    $('div[prompt] p').html(message);
    $('div[prompt]').attr('active','').animate({opacity:1}, 200, function(){
      //Callback
      $('div[prompt] center').stop().animate({ marginTop:'28vh' },150).animate({ marginTop:'30vh' },100);
    });
    $('span[prompt-submit]').click( function(){ console.log('span'); $('div[prompt] center').animate({marginTop:'100vh'}, 100, ()=>{ $('div[prompt]').animate({opacity:0}, 150).removeAttr('active'); }); callback($('[prompt-response]').val()); return;});
    $('span[prompt-cancel]').click( function(){ console.log('span'); $('div[prompt] center').animate({marginTop:'100vh'}, 100, ()=>{ $('div[prompt]').animate({opacity:0}, 150).removeAttr('active'); $('[prompt-response]').val(''); }); });
  },

};
