$(document).ready(function(){

  // Tab Functionalities
  $('nav li').click(function(){
    var target = $(this).index();
      $('body > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
      $('main section').each(function(i){if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
      $('nav li').each(function(i){if(i==target){ $(this).attr('selected', ''); return; } $(this).removeAttr('selected');});
    });

  // Setup Infos
  var data = JSON.parse(localStorage.getItem('credentials'));
  if( data==null ){ Modal.slide('Let\'s Get Started.','User Name:<input type="text" id="_username"><br>Home Serial Key<input type="text" id="_home-serial"><br><button onclick="SmartHomeSetup()">Submit</button>', 'Modal.alert(\'Please Complete the details\')'); return;}
    $('#username').val(data.username); $('#serial').val(data.serial);



console.log(navigator.onLine);
// TEst
graph('today');
graph('weekly');
graph('monthly');







// test end
});



// Setup Functions
function SmartHomeSetup(){
  var username = $('#_username').val();
  var serial = $('#_home-serial').val();
  localStorage.setItem('credentials', JSON.stringify({username:username, serial:serial}));
  location.reload();
};





//Graph Functions
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







//Appliance Functions
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


// Settings Functions
  function saveSettings(){
    localStorage.setItem('settings',JSON.stringify({theme:$('#theme').val(), chartDivision:$('#chartDivision').val() }));
  }


  function colorPick(){
    var color = $('#theme').val();
    $('body').get(0).style.setProperty("--theme",`var(--${color})`);
  };





// Modals
var Modal = {
  container:function(content, button='cancel', type='cancel'){ return `<div class="modal" id="modal-${this.count}"><div class="modal-container" id="container-${this.count}">${content} <button class="modal-${type}" onclick="Modal.close(${this.count})">${button}</button></div></div>`; },
  text:function(content){ return `<p class="modal-content">${content}</p>` },
  button:function(label, callback){ return `<button onclick="${callback}; Modal.close(${this.count})">${label}</button>`},
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
  slide: function(header, content, close='default'){
    if (close=='default'){ close=`Modal.close(${this.count})`; }
    var temp = `<div class="modal" id="modal-${this.count}"><div class="slide-container" id="container-${this.count}"><div class="slide-header"><h3>${header}</h3><div class="slide-close" onclick="${close}">close</div></div><div class="slide-content">${content}</div></div></div>`;

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
