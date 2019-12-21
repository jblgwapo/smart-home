$(document).ready(function(){
  $('nav li').click(function(){
    var target = $(this).index();
      // Disable All

      $('body > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
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
// TEst
graph('today');
graph('weekly');
graph('monthly');







// test end
});



function graph(mode='today', chart){
  var chartTemplate = {
      chart: { height: 350, type: 'bar', },
      plotOptions: {
          bar: { horizontal: false, columnWidth: '55%', endingShape: 'rounded'},
          },
      dataLabels: { enabled: false },
      stroke: { show: true, width: 2, colors: ['transparent'] },
      series: [
        { name: 'Refrigerator',   data: [44, 55, 57, 56, 61, 58, 63, 60, 66,] },
        { name: 'Lamp',           data: [76, 85, 101, 98, 87, 90, 91, 114, 94] },
        { name: 'Aircon',         data: [35, 41, 36, 26, 45, 48, 52, 53, 41]}
      ],
      xaxis: { categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],},
      yaxis: {},
      fill: {opacity: 1 },
      tooltip: { y: { formatter: function (val) { return "" + val + " kW"}}}
  }


  switch (mode) {
    case 'today': chartTemplate.xaxis.categories = ['1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm'];  break;
    case 'weekly': chartTemplate.xaxis.categories = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu','Fri','Sat'];  break;
    case 'monthly': chartTemplate.xaxis.categories = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];  break;
    default:
  }
  new ApexCharts( document.querySelector(`#${mode}Charts`), chartTemplate ).render();


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
  container:function(content, button='cancel', type='cancel'){ return `<div class="modal" id="modal-${this.count}"><div class="modal-container" id="container-${this.count}">${content} <button class="modal-${type}" onclick="Modal.close(${this.count})">${button}</button></div></div>`; },
  text:function(content){ return `<p class="modal-content">${content}</p>` },
  button:function(label, callback){ return `<button class="modal-button" onclick="${callback}; Modal.close(${this.count})">${label}</button>`},
  count:0,
  alert:function(message){
    $('body').append(this.container(this.text(message), 'Okay', 'button'));
    var id = Modal.count; Modal.count++;
    //Animate
    $('#modal-'+id).animate( {opacity:'1'}, 100, function(){
      $('#container-'+id).animate( {maxHeight:'50vh', maxWidth:'700px'}, 100,);
    });
  },

  confirm:function(message,onclick){
    $('body').append(this.container(this.text(message) + this.button('okay', onclick) ));
    var id = Modal.count; Modal.count++;
    //Animate
    $('#modal-'+id).animate( {opacity:'1'}, 100, function(){
      $('#container-'+id).animate( {maxHeight:'80vh', maxWidth:'700px'}, 100);
    });

  },
  prompt:function(header, message, onclick){
    $('body').append(this.container(`<h2>${header}</h2>` + this.text(message) + `<input type="text" id="modal-response-${this.count}"></input>` + this.button('Submit', onclick+`($('#modal-response-${this.count}').val())` )));
    var id = Modal.count; Modal.count++;
    //Animate
    $('#modal-'+id).animate( {opacity:'1'}, 100, function(){
      $('#container-'+id).animate( {maxHeight:'80vh', maxWidth:'700px'}, 100);
    });
  },
  options:function(header,message,label, method){
    var list='';
    for(i=0; i<method.length; i++){
      list+=this.button(label[i], method[i]);
    }
    $('body').append(this.container(`<h2>${header}</h2>` + this.text(message) + list ));
    var id = Modal.count; Modal.count++;
    //Animate
    $('#modal-'+id).animate( {opacity:'1'}, 100, function(){
      $('#container-'+id).animate( {maxHeight:'80vh', maxWidth:'700px'}, 100);
    });

  },
  slide: function(header){
    var content = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    var temp = `<div class="modal" id="modal-${this.count}"><div class="slide-container" id="container-${this.count}"><div class="slide-header"><h3>${header}</h3><div class="slide-close" onclick="Modal.close(${this.count})">close</div></div><div class="slide-content">${content}</div></div></div>`;

    $('body').append(temp);

    var id = Modal.count; Modal.count++;
    //Animate
    $('#modal-'+id).animate( {opacity:'1'}, 100, function(){
      $('#container-'+id).animate( {marginTop:'9vh'}, 100).animate( {marginTop:'10vh'}, 100);
    });

  },
  close: function(id){
    console.log('close: '+id);
    $('#container-'+id).animate( {height:'0', width:'0'}, 100, function(){
      $('#modal-'+id).animate( {opacity:'0'}, 100).remove();
    });

  },
};
