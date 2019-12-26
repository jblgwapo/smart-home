$(document).ready(function(){

  console.log(btoa('jale\''));
console.log(atob(''));
  // Setup Infos
  var data = JSON.parse(localStorage.getItem('credentials'));
  if( data==null ){ Modal.slide('Let\'s Get Started.','User Name:<input type="text" id="_username"><br>Home Serial Key<input type="text" id="_home-serial"><br><button onclick="SmartHomeSetup()">Submit</button>', 'Modal.alert(\'Please Complete the details\')'); return;}
    $('#username').val(data.username); $('#serial').val(data.serial);

System.init();
  // Graphs
  Home['today'] = new ApexCharts(
    document.querySelector('#todayCharts'),
    options([{name:'Today',data:[123,123,123,123,432,123,321,432,123,234,123,412,0,0,0,0,0,0,0,0,0,0,0,0]},{name:'Yesterday',data:[0,0,0,0,0,0,0,0,0,0,0,0,123,123,123,123,432,123,321,432,123,234,123,412]}], 'today')
  );

  Home['weekly'] = new ApexCharts(
    document.querySelector('#weeklyCharts'),
    options([{name:'Power Consumption',data:[123,123,123,321,321,123,321]}], 'weekly')
  );

  Home['monthly'] = new ApexCharts(
    document.querySelector('#monthlyCharts'),
    options([{name:'Power Consumption',data:[123,123,123,321,321,321,31,23,123,213,12,32,12,32,12,322,12,312,3,12,3,213,122,3,213,12,123,12,21,31,21]}], 'monthly')
  );


Home['today'].render();
Home['weekly'].render();
Home['monthly'].render();

setTimeout(
  ()=>{
Home['weekly'].updateOptions(
  options([{name:'Power Consumption',data:[321,231,123,23,123,231,123]}], 'weekly')
)},
3000
);


// TEst

console.log(navigator.onLine);





// test end
});











// Setup Functions
function SmartHomeSetup(){
  var username = $('#_username').val();
  var serial = $('#_home-serial').val();
  localStorage.setItem('credentials', JSON.stringify({username:username, serial:serial}));
  location.reload();
};



// All Data about the home. Format in here


var Home = {
  appliances:[
    {
    name:'Refrigerator', /* User Defined */
    type:'switch',
    status:'ON', /* Remote */
    serial:'@#4as',
    automation:{on:[1230,0015], off:[1330,0634]}
    },
    {
    name:'Aircon', /* User Defined */
    type:'switch',
    status:'ON', /* Remote */
    serial:'@#4as',
    timer:'Off',
    }
],

  log12262019:[
    {serial:'Qa!e6', data:[100,20,30,40,50,60,70,10,123,321,123,23]},
    {serial:'sdafg', data:[32,45,67,98,123,53,12,78,56,90,123,10]},
  ],
  log12252019:[
    {serial:'Qa!e6', data:[100,20,30,40,50,60,70,10,123,321,123,23]},
    {serial:'sdafg', data:[32,45,67,98,123,53,12,78,56,90,123,10]},
  ],





};






//OBJ for appliances

var Appliance = {
  init: function(){



  }


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

var options= function(series, type){
  var template = {
      chart: { height: 350, type: System.data.chartType, },
      plotOptions: {
          bar: { horizontal: false, columnWidth: '77%', endingShape: 'rounded'},
          },
      dataLabels: { enabled: false },
      stroke: { curve:'smooth', show: true, width: 0.7, colors: ['black'] },
      series: series,
      xaxis: { categories: [], labels:{show:true}},
      //yaxis: {},
      fill:{ colors: [ ()=> { var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); rgb = $('li[selected]').css('color'); rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); hex='#'; for(i=1;i<=3;i++){ hex+=isNaN(rgb[i]) ? "00" : hexDigits[(rgb[i] - rgb[i] % 16) / 16] + hexDigits[rgb[i] % 16];} return hex;}, '#aaa']},
      tooltip: { y: { formatter: function (val) { return "" + val + "W"}}}
  }

    switch (type) {
      case 'monthly':
        var month = ['Jan ','Feb ','Mar ','Apr ','May ','Jun ','Jul ','Aug ','Sep ','Oct ','Nov ','Dec '];
        date = new Date;
        days = [];
        date.setDate(date.getDate() - 30);
        for (var i = 30; i >0; i--) {
          days.push(month[date.getMonth()]+date.getDate());
          date.setDate(date.getDate() + 1);
        }
        days.push('Today');
        template.xaxis.categories = days;
        template.xaxis.labels.show = false;
        break;
      case 'weekly':
        template.xaxis.categories = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
        break;
      case 'today':
        template.xaxis.categories = ['1:00 AM','2:00 AM','3:00 AM','4:00 AM','5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 NN','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM','11:00 PM','12:00 AM', ];
        template.xaxis.labels.show = false;
      default:
    }
    return template;

}



//    *******
//    *     *
//    *     *
//    *     *
//    *     *
//    *     *
//    ******* B J E C T S

// Settings Functions
var System = {
  init: function(){
    // Tab Functionalities
    $('nav li').click(function(){
      var target = $(this).index();
        localStorage.setItem('tab', target);
        $('body > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('main section').each(function(i){if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('nav li').each(function(i){if(i==target){ $(this).attr('selected', ''); return; } $(this).removeAttr('selected');});
      });
      $('nav li').eq(Number(localStorage.getItem('tab'))).trigger('click');
    // Pull
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings==null){ this.save(); settings=JSON.parse(localStorage.getItem('settings')); };
    System.data = settings;
    //Restore Settings
    Object.keys(settings).map(val =>{ $(`#${val}`).val(settings[val]);});
    // Listen
    $('.settings').on('change', function(event){ event.stopPropagation(); event.stopImmediatePropagation(); System.save(); });
    // Initialize
    System.exec();
  },data:{},
  save: function(){
    this.data = {
      theme:$('#theme').val(),
      chartType:$('#chartType').val(),
      chartRender:$('#chartRender').val(),
    }
    console.log(this.data);
    localStorage.setItem('settings',JSON.stringify(this.data));
    System.exec();
  },
  exec: function(){
      Object.values(this.methods).map(value => { value.call(); });
  },
  methods: {
    colorPick:function(){
      $('body').get(0).style.setProperty("--accent",`var(--${System.data.theme})`);
    },
    graphMode: function(){

      if($('#todayCharts').html().trim()=='') return;
    location.reload();
    }

  }, //End of methods

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
    if (close=='default'){ close=`Modal.slideOut(${this.count})`; }
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
  slideOut: function(id){
    $('#container-'+id).animate( {marginTop:'9vh'}, 100).animate( {marginTop:'100vh'}, 150, function(){
      $('#modal-'+id).animate( {opacity:'0'}, 100).remove();
    });
  }
};
