$(document).ready(function(){

  console.log(btoa('jale\''));
console.log(atob(''));
  // Setup Infos
  var data = JSON.parse(localStorage.getItem('credentials'));
  if( data==null ){ Modal.slide('Let\'s Get Started.','User Name:<input type="text" id="_username"><br>Home Serial Key<input type="text" id="_home-serial"><br><button onclick="SmartHomeSetup()">Submit</button>', 'Modal.alert(\'Please Complete the details\')'); return;}
    $('#username').val(data.username); $('#serial').val(data.serial);


System.init();
Appliance.init();
  // Graphs





console.log(Appliance.weeklyChartData(-1));


// TEst

console.log(navigator.onLine);





// test end
});
const total = arr => arr.reduce((a,b) => a + b, 0);




var Time = {
  log: function(index=0){
    date = new Date;
    date.setDate(date.getDate() + index);
    return 'log'+Number(date.getMonth()+1)+date.getDate()+Number(1900+date.getYear());
  },
  date: function(index=0){
    date = new Date;
    date.setDate(date.getDate() + index);
    return this.months[date.getMonth()]+date.getDate();
  },
  days: function(offset=0){
    date = new Date;
    date.setDate(date.getDate() -6 + offset);
    arr=[];
    for (var i = 0; i <7; i++) {
      arr.push(this.day[date.getDay()])
      date.setDate(date.getDate() +1);
    }
    return arr;
  },

  range: function(start, end){
    var arr=[];
    for(i=start; i<end; i++) {arr.push(this.date(i))};
    return arr;
  },
  months:['Jan ','Feb ','Mar ','Apr ','May ','Jun ','Jul ','Aug ','Sep ','Oct ','Nov ','Dec '],
  day:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
  hours: ['1:00 AM','2:00 AM','3:00 AM','4:00 AM','5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 NN','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM','11:00 PM','12:00 AM' ],
}





// Setup Functions
function SmartHomeSetup(){
  var username = $('#_username').val();
  var serial = $('#_home-serial').val();
  localStorage.setItem('credentials', JSON.stringify({username:username, serial:serial}));
  location.reload();
};



// All Data about the home. Format in here


var Home = {
  appliance:[
    {
    name:'Refrigerator', /* User Defined */
    type:'switch',
    status:'on', /* Remote */
    serial:'@#4as',
    automation:[1230,0730],
    consumption:{
      log12282019:[10,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12],
      log12262019:[100,20,30,40,50,60,70,10,123,321,123,23],
      log12252019:[21,23,54,65,23,76,98,122,89,21,34,78],
      log12242019:[45,32,45,76,89,32,12,65,34,87,90,100],
     }
    },
    {
    name:'Aircon', /* User Defined */
    type:'switch',
    status:true, /* Remote */
    serial:'rocks',
    timer:'off',
    consumption:{
      log12282019:[45,32,45,76,89,32,12,65,34,87,90,100],
      log12262019:[32,45,67,98,123,0,0,0,0,0,0,53,12,78,56,90,123,10],
      log12252019:[45,32,45,76,89,32,12,65,34,87,90,100],
      log12242019:[32,45,67,98,123,53,12,78,56,90,123,10],
     }
   },{
   name:'Fan', /* User Defined */
   type:'switch',
   status:true, /* Remote */
   serial:'staph',
   timer:'off',
   consumption:{
     log12282019:[32,45,67,98,123,53,12,78,56,90,123,10],
     log12262019:[232,45,90,70,55,100,43,90,65,9,100,120,232,45,90,70,55,100,43,90,65,9,100,120],
     log12252019:[45,32,45,76,89,32,12,65,34,87,90,100],
     log12242019:[32,45,67,98,123,53,12,78,56,90,123,10],
    }
  },{
  name:'Lights', /* User Defined */
  type:'switch',
  status:true, /* Remote */
  serial:'oleds',
  timer:'off',
  consumption:{
    log12262019:[0,0,0,0,0,12,21,43,34,32,1,54,56,87,78,67,10],
    log12252019:[45,32,45,76,89,32,12,65,34,87,90,100],
    log12242019:[32,45,67,98,123,53,12,78,56,90,123,10],
   }
  }
],

camera:[{
  name:'ESP CAM',
  lightsCapable:'yes',
  serial:'Qa!e6',
  socket:'wss://6b1c4d39.jp.ngrok.io/wss'
}],


};






//OBJ for appliances

var Appliance = {
  init: function(){
    hours=''; minutes='';
    for(i=0;i<=12;i++){
      hours+='<option value="'+(i*100)+'">'+i+'</option>';
    }
    for(i=0;i<60;i++){
      minutes+='<option value="'+(i*100)+'">'+i+'</option>';
    }

    for(i=0; i<Home.appliance.length; i++){
      var appliance =
      `<article><header>${Home.appliance[i].name}
      <label class="switch"><input type="checkbox" ${(Home.appliance[i].status=='on'?'checked':'')}><span class="slider"></span></label></header>
      <lu><li>Serial Key: ${btoa(Home.appliance[i].serial).replace('=','')}</li>
      <li>Type: ${Home.appliance[i].type}</li>
      <li>Automation:<br><select class="third">${hours}</select> <select class="third">${minutes}</select> <select class="third"><option>AM</option><option>PM</option></select></li>
      <li>Consumption: ${this.consumption(i)} Watts today</li>
      </lu></article>`;
      $('#appliances').append(appliance);
    }
    for(i=0; i<Home.camera.length;i++){
      var camera =
      `<article> <header>${Home.camera[i].name}</header>
          <div style="width:100%;"><img id="${btoa(Home.camera[i].serial).replace('=','')}" style="max-width:640px; max-height:480px; width:100%; height:auto;"></div>
        <script> const img = document.querySelector('#${btoa(Home.camera[i].serial).replace('=','')}'); const WS_URL = '${Home.camera[i].socket}'; const ws = new WebSocket(WS_URL); ws.onerror = function() {}; let urlObject; ws.onmessage = message => { const arrayBuffer = message.data; if(urlObject){ URL.revokeObjectURL(urlObject);} urlObject = URL.createObjectURL(new Blob([arrayBuffer])); delete arrayBuffer; delete message; img.src = urlObject;} </script>
      </article>`;
      $('#camera').append(camera);

    }

  },
  names: function(){
    var name = [];
    for(i=0; i<Home.appliance.length; i++){
      name.push(Home.appliance[i].name);
    }
    return name;
  },
  oldest: function(){
    var dates = [];
    for(i=0;i<Home.appliance.length;i++){
      Object.keys(Home.appliance[i].consumption).map(val=>{dates.push(val)});
    }
    dates.sort()
    return dates[0];
  },
  data: function(index, offset=0){ /* Hourly data of an appliance for a selected day: Select day using offset, returns an array */
    temp =  Home.appliance[index].consumption[Time.log(offset)];
    return (temp==null? [0]: temp);
  },
  consumption: function(index, offset=0){
    return total(this.data(index,offset));
  },

  dayChartData: function(offset=0){
    var data=[]; var sum = Array(24).fill(0);

    for(i=0; i<Home.appliance.length; i++){
      data[i]=(this.data(i, offset));
      data[i].map((val, idx)=>{ sum[idx] += val;});
    }
    data.push(sum);
    return data;
  },

  weeklyChartData: function(offset=0){
    var data = []; sum = Array(7).fill(0)
    for(i=0; i<Home.appliance.length; i++){
      data[i]=[];
      for(index=0; index<7; index++){
        data[i].push (total(this.data(i, index+offset-6)));
      }
      data[i].map((val, idx)=>{ sum[idx] += val;});
    }
    data.push(sum);
    return data;
  },
  monthlyChartData: function(offset=0){
    var data = []; sum = Array(30).fill(0)
    for(i=0; i<Home.appliance.length; i++){
      data[i]=[];
      for(index=0; index<30; index++){
        data[i].push (total(this.data(i, index+offset-29)));
      }
      data[i].map((val, idx)=>{ sum[idx] += val;});
    }
    data.push(sum);
    return data;

  },

}


var Charts = {
  inti:false,
  activate: function(){
    this.updateView();







  },
  changeView: function(){
    series = (Appliance.names()); series.push('Home');
    var target = $('#chartView').val();

    if(target=='compare'){
      for(i=0; i<series.length;i++){ if(series[i]=='Home'){Charts['chart'].hideSeries(series[i]); continue}; Charts['chart'].showSeries(series[i]);
    }
      return;
    }
    for(i=0; i<series.length;i++){
      if (series[i]==target) {Charts['chart'].showSeries(series[i]); continue}
      Charts['chart'].hideSeries(series[i]);
    }
  },
  updateView: function(){
    var target = $('#chartDate').val().trim();
    $('#chartView').html(`<option value="Home">Home</option>`);
    Appliance.names().map(val => { $('#chartView').append(`<option value="${val}">${val}</option>`); })
    $('#chartView').append(`<option value="compare">Compare</option>`);
    var offset = Number($('#chartOffset').val());
    this.offset=offset;
    $('#chartOffset').html('');
    var end = Appliance.oldest();

    for (var i = 0; Time.log(i)!=end; i--) {
      $('#chartOffset').append(`<option value="${i}" ${(offset==i ? 'selected':'') }>${Time.date(i)}</option>`);
    }



    switch (target) {
      case 'thisDay':
        this.render(Appliance.dayChartData(offset));
        this.changeView();
        break;
        case 'thisWeek':
        this.render(Appliance.weeklyChartData(offset));
        this.changeView();
          break;
          case 'thisMonth':
          this.render(Appliance.monthlyChartData(offset));
          this.changeView();
            break;
      default:
    };

  },

  offset:0,
  render: function(data){
    //Charts
    var template = {
        chart: { height: 350, type: System.data.chartType}, plotOptions: { bar: { horizontal: false, columnWidth: '77%', endingShape: 'flat'},},
        dataLabels: { enabled: false }, stroke: {curve:'smooth', show: true, width: 0.7, colors: ['black']}, series: [],
        xaxis: { categories: [], labels:{show:true, style:{fontSize:'9px'}}}, legend:{show:false},
        theme:{monochrome:{enabled:true,}}, fill:{ colors: [ ()=> { var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); rgb = $('li[selected]').css('color'); rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); hex='#'; for(i=1;i<=3;i++){ hex+=isNaN(rgb[i]) ? "00" : hexDigits[(rgb[i] - rgb[i] % 16) / 16] + hexDigits[rgb[i] % 16];} return hex;}, '#aaa']},
        tooltip: { y: { formatter: function (val) { return "" + (val||0) + "W"}}}
    }
    var names = Appliance.names().concat(['Home']);
    for (var i = 0; i < data.length; i++) {
      template.series.push({name:names[i], data:data[i]});
    }
    switch (data[0].length) {
        case 7:
        template.xaxis.categories  = Time.days(this.offset);
          break;
        case 30:
          template.xaxis.categories = Time.range(this.offset-30,this.offset); template.xaxis.labels.show = false;
          break;
      default:
      template.xaxis.categories = Time.hours;
    }

    if (typeof(Charts['chart'])=='undefined'){ Charts['chart'] = new ApexCharts( document.querySelector('#chart'), template ); Charts['chart'].render();}
    else{Charts['chart'].updateOptions(template);}



      //Donut

      var log = {
        Total_Consumption:0,
        Cost_Per_Watt:0,
        Average_Consumption:0,
        Average_Electrical_Cost:0,
        Total_Cost:'',
        Most_Used_Appliance:'',
        //appliances:[],
        //consumption:[],
      };
      log.Cost_Per_Watt = Number(System.data.cost);
     data[data.length-1].map( (val) => { log.Average_Consumption += val/(data.length-1); } )
     log.Average_Electrical_Cost = (log.Average_Consumption*log.Cost_Per_Watt)+  (data[data.length-1].length==24? ' pesos per hour':' pesos per day' );
     log.Average_Consumption += (data[data.length-1].length==24? 'W per hour':'per day' );


    for(i=0; i<data.length; i++){data[i]=(total(data[i]));}

    log.Total_Consumption = data.pop();
    log.Total_Cost = log.Total_Consumption*log.Cost_Per_Watt;
    var idx=0; var peak=0;
    data.map((val,index)=>{ if(val>peak){ idx=index; peak=val;} })
    log.Most_Used_Appliance = Home.appliance[idx].name;
    log.Total_Cost+=' pesos';
    $('#computations').html( '<header>Computations</header>')
    $('#computations').append('<lu>');
    Object.keys(log).map( val => { $('#computations').append( '<li>'+val.replace('_',' ').replace('_',' ') + ': ' + log[val] + '</li><br>');  } );
    $('#computations').append('</lu>');

      var template = {
        chart: { height: 400, type: 'donut', },
        stroke: {show: true, width: 0.7, colors: ['black']},
        series: data,
        xaxis: { categories: [], labels:{show:true}},
        legend:{position:'bottom'},
        plotOptions:{pie:{donut:{labels:{show:true,total:{showAlways:true,show:true}}}}},
        labels:Appliance.names(),
        tooltip: { y: { formatter: function (val) { return "" + val + "W"}}}
    };
    if (typeof(Charts['donut'])=='undefined'){ Charts['donut'] = new ApexCharts( document.querySelector('#donut'),template); Charts['donut'].render(); }
    else{ Charts['donut'].updateOptions(template);}
  },
};






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
    // Tab Functionalities
    $('nav li').click(function(){
      var target = $(this).index();
        localStorage.setItem('tab', target);
        $('body > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('main section').each(function(i){if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('nav li').each(function(i){if(i==target){ $(this).attr('selected', ''); return; } $(this).removeAttr('selected');});
        if(target==0){ Charts.activate();}
      });
      $('nav li').eq(Number(localStorage.getItem('tab'))).trigger('click');
  },data:{},
  save: function(){
    this.data = {
      theme:$('#theme').val(),
      chartType:$('#chartType').val(),
      cost:$('#cost').val(),

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

      if($('#chart').html().trim()=='') return;
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
