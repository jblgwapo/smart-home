$(document).ready(function(){


console.log(btoa('jale\''));
console.log(atob(''));
  // Setup Infos

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    $('body').html('');
    Modal.slide('Install the app first', 'The app must be installed first before you can run it.');  return;
  }

  var data = JSON.parse(localStorage.getItem('credentials'));
  if( data==null ){ Modal.slide('Let\'s Get Started.','User Name:<input type="text" id="_username"><br>Home Serial Key<input type="text" id="_home-serial"><br><button onclick="System.setup()">Submit</button>', 'Modal.alert(\'Please Complete the details\')'); return;}
    $('#username').val(data.username); $('#serial').val(data.serial);


System.init();
Appliance.init();
Charts.init();
  // Graphs

Socket.init();



//console.log(Appliance.weeklyChartData(-1));


// TEst
/*
var asd = new WebSocket('wss://smart-home.local:443');



asd.onerror = function(e) {console.log(e);};

asd.onmessage = function(message){ console.log(message.data);  }
asd.onopen = (e)=>{
  asd.send('data');
  asd.send('{"hello":"server"}');
}
*/







//end test
console.log(navigator.onLine);
});


function httpGet(theUrl)
{
    if (window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
        if (xmlhttp.readyState==4 && xmlhttp.status==200)
        {
            return xmlhttp.responseText;
        }
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();
}





const total = arr => arr.reduce((a,b) => a + b, 0);




var Time = {
  log: function(index=0){
    date = new Date;
    date.setDate(date.getDate() + index);
    var y = 1900+date.getYear();
    var m = (date.getMonth()+1);
    var d = date.getDate();

    return `log${y}${(m<10 ? '0'+m : m)}${(d<10 ? '0'+d : d)}`;
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
  hours: function(i){
    return ['1:00 AM','2:00 AM','3:00 AM','4:00 AM','5:00 AM','6:00 AM','7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 NN','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM','7:00 PM','8:00 PM','9:00 PM','10:00 PM','11:00 PM','12:00 AM' ].splice(0,i);
  },
}



 var Socket = {
   status:{
     Local:{isOnline:false, token:null},
     Global:{isOnline:false, token:null},
   },
   Local:{ /* Local placeholder */},
   Global:{ /* Global placeholder */},
   init: function(){
     var queue = localStorage.getItem('queue');
     try {
       queue = JSON.parse(queue);
       if(queue==null){queue=[]};
     } catch (e) {
       queue = [];
     } finally {
       this.queue = queue;
       localStorage.setItem('queue', JSON.stringify(this.queue));
     }
     //Init sockets
     this.localHander();
   },
   localHander: function(){
     // Local Setup
     var Local = new WebSocket('wss://smart-home-beta.local:4300');
     Local.onerror = function(e) {
     };
     Local.onmessage = function(message){
       //console.log(message.data);
       //Callback on wrong server
       try {
        var server_request = JSON.parse(message.data);
       } catch (e) {
         Local.close();
         console.log('Server does not comply to standards: ' + JSON.stringify(message.data));
         return;
       }
       //Callback on server error

       if(!server_request.hasOwnProperty('status')&& !server_request.hasOwnProperty('type')){
         console.log('Rejected Message From Server');
         console.log('Message: ' + message);
         return; }


       var user_request = Socket.handler(server_request);
       // Request verification
       if(typeof(user_request)=='object') Local.send(JSON.stringify(user_request));
     }
     Local.onopen = (e)=>{
       //Modal.alert('Local is Online!');
       console.log('Local is online');
       $('#_status_').html('local connection');
       this.status.Local==true;
     }

       // Disconnection
     Local.onclose = function(e) {
      console.log('Local is offline. Reconnect will be attempted in 1 second.', e.reason);
      $('#_status_').html('No Connection. ' + e.reason);
      setTimeout(function() {
          Socket.localHander();
        }, 1000);
      };
    Local.onerror = function(err) {
        console.error('Local encountered error: ', err.message, 'Closing Local');
        $('#_error_').html(err.message)
        Local.close();
        return;
      }
   },
   handler: function(server_request, type='Local'){
     var user_request ='';
     switch (server_request.type) {
       case 'handshake':
          // Get serial
          var key = JSON.parse(localStorage.getItem('credentials')).serial;
          //Send Serial
          var user_request = {
            type:'serial',
            key:key
          };
         break;
       case 'acknowledge':
           if(server_request.status=='Local'){ Socket.status.Local.token = server_request.token }
           if(server_request.status=='Global'){ Socket.status.Global.token = server_request.token }
           user_request['status']='OK';
           var user_request={
             type:'fetch',
             status:Socket.status[type].token
           }
       break;
      case 'data':
          //fetch response
          if(server_request.status=='No data')return;
          try {
            Home = server_request.status; //JSON.parse(server_request.status)
          } catch (e) {
            console.log('Data parse error: ' + e);
            console.log(server_request.status);
            return;
          }
          //console.log(JSON.stringify(server_request));
          localStorage.setItem('Home', JSON.stringify(Home) );
          console.log('New Data');
          Charts.render();
          Appliance.init()
        break;
      case 'notify':
          var user_request={
            type:'fetch',
            status:Socket.status[type].token
          }
          break;

      case 'remove':

        break;

       default: return;
     }
     console.log('Message to server:' + JSON.stringify(user_request));
    return user_request;
   },



   pushData: function(data){
     this.queue.push(data);
     localStorage.setItem('queue', JSON.stringify(this.queue));
   },
   queue:[],





 };




// All Data about the home. Format in here
// Warning False Values are used as a placeholder
var Home = {
  appliance:[
    {
    name:'Refrigerator', /* User Defined */
    type:'switch',
    status:'on', /* Remote */
    serial:'@#4as', /* NRF serial key mockup */
    automation_enabled:true, /* Automation is active */
    automation:['12:30 AM','12:00 PM'], /* Automation Time when active */
    consumption:{
      /* Format: log year month day : logYYYYMMDD   */
      /* 24 hour format / hourly data for an appliance */
      log20200111:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123},
     }
    },
    {
    name:'Aircon', /* User Defined */
    type:'switch',
    status:true, /* Remote */
    serial:'rocks',
    automation_enabled:false,
    automation:['07:00 PM','03:00 AM'],
    consumption:{
      log20200111:{data:[23,45,56,45,34,50,40,23,20,10,43,43,43,23,3,12], total:123},
     }
   },{
   name:'Fan', /* User Defined */
   type:'switch',
   status:true, /* Remote */
   serial:'staph',
   automation_enabled:false,
   automation:['',''], /* Default Automation time */
   consumption:{
     log20200111:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123},
    }
  },{
  name:'Lights', /* User Defined */
  type:'switch',
  status:true, /* Remote */
  serial:'oleds',
  automation_enabled:false,
  automation:['',''],
  consumption:{
    log20200111:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123},
   }
  }
],


// Home Power Consumption
/* same as appliance but uses the total value of all appliance */
consumption:{
    log20200111:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123}
},


/* camera object */
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

    $('#appliances').html('');
    for(i=0; i<Home.appliance.length; i++){
      var appliance =
      `<article><header>${Home.appliance[i].name}
      <label class="switch"><input type="checkbox" ${(Home.appliance[i].status=='on'?'checked':'')} onchange="Appliance.toggle('${btoa(Home.appliance[i].serial).replace('=','')}')"><span class="slider"></span></label></header>
      <lu><li>Serial Key: ${btoa(Home.appliance[i].serial).replace('=','')}</li>
      <li>Type: ${Home.appliance[i].type}</li>
      <li>Consumption: ${'sample'} Watts today</li><br>
      <li>Automation: ${(Home.appliance[i].automation_enabled ? 'enabled' : 'disabled')}<br>
      <button onclick="Appliance.configure('${(Home.appliance[i].serial)}')" style=" font-size:0.7em;">Configure</button>
      </li>
      <li>Turn on every: ${(Home.appliance[i].automation_enabled ? Home.appliance[i].automation[1] : 'disabled')}</li>
      <li>Turn off every: ${(Home.appliance[i].automation_enabled ? Home.appliance[i].automation[0] : 'disabled')}</li>
      </lu><br>
      </article>`;
      $('#appliances').append(appliance);
    }
    $('#camera').html('');
    Home.camera.map( cctv=>{
      var serial = btoa(cctv.serial).replace('=','')+'_cctv';
      var camera =
      `<article><header>${cctv.name}</header>
          <div style="width:100%;"><img id="${serial}" style="max-width:640px; max-height:480px; width:100%; height:auto;"></div>
        <script>
          var ${serial+'img'} = document.querySelector('#${serial}');
          var ${serial} = new WebSocket(${cctv.socket});
          ${serial}.onerror = function() { ${serial}.close()}; let urlObject;
          ${serial}.onmessage = message => { const arrayBuffer = message.data; if(urlObject){ URL.revokeObjectURL(urlObject);} urlObject = URL.createObjectURL(new Blob([arrayBuffer]));
          delete arrayBuffer; delete message;
          ${serial+'img'}.src = urlObject;}
          </script>
      </article>`;
      $('#camera').append(camera);
    });

  },
  names: function(){
    var name = [];
    for(i=0; i<Home.appliance.length; i++){
      name.push(Home.appliance[i].name);
    }
    return name;
  },
  data:function(offset=0,sample=1){
    // Container
    data = {log:[], total:[], daily:[]};
    // loop through samples needed\

    //offset = 0-offset;
    //console.log('Time: ' + Time.log(offset-sample)+':'+Home.consumption.hasOwnProperty(Time.log(-0-offset)));
    //Home
    var log=[]; var total = 0; var daily =[];
    for (var i = offset-sample+1; i <= offset; i++) {
      var stamp = Time.log(i);
      if(!Home.consumption.hasOwnProperty(stamp)){ log.push([0]); daily.push(0); continue;}
      log.push(Home.consumption[stamp].data);
       daily.push(Home.consumption[stamp].total);
    }
    data.log.push(log); data.daily.push(daily);
    log=[]; daily=[];
    //Each appliance
    Home.appliance.map(val=>{
      log=[];total=0; daily=[]
      for (var i = offset-sample+1; i <= offset; i++) {
        var stamp = Time.log(i);
        if(!val.consumption.hasOwnProperty(stamp)){ log.push([0]); daily.push(0);}
        else {
          log.push(val.consumption[stamp].data);
           daily.push(val.consumption[stamp].total);
           total+=val.consumption[stamp].total;
        }

      }
      data.log.push(log); data.total.push(total); data.daily.push(daily);
    });
    console.log(data);
      return data;
  },

  oldest: function(){
    var dates = [];
    for(i=0;i<Home.appliance.length;i++){
      dates = dates.concat(Object.keys(Home.appliance[i].consumption))
    }
    dates.sort()
    if(dates[0]==null) return [Time.log()];
    return dates[0];
  },

  configure: function(serial){
    var appliance;
    var hours=''; var minutes='';
    for(i=1;i<=12;i++){
      hours+='<option value="'+(i<10 ? '0'+ i:i )+'">'+(i<10 ? '0'+ i:i )+'</option>';
    }
    for(i=0;i<60;i++){
      minutes+='<option value="'+(i<10 ? '0'+ i:i )+'">'+(i<10 ? '0'+ i:i )+'</option>';
    }
    Home.appliance.map( val =>{ if(val.serial==serial) appliance=val; })
    Modal.alert( `<b style="font-size:1.5em;">${appliance.name}</b><br><br>
      Automation:
      <select id="_automation_enabled" onchange="Appliance.updateConfig('${appliance.serial}')">
      <option value="on">Enabled</option>
      <option value="off" ${((appliance.automation_enabled==false)? 'selected':'')}>Disabled</option>
      </select>

      Turn On time:<br>
      <select class="third" id="_on_hour">${hours}</select onchange="Appliance.updateConfig('${appliance.serial}')"> :
      <select class="third" id="_on_min">${minutes}</select onchange="Appliance.updateConfig('${appliance.serial}')">
      <select class="third" id="_on_label" onchange="Appliance.updateConfig('${appliance.serial}')"><option value="AM">AM</option><option value="PM">PM</option></select><br>

      Turn Off time:<br>
      <select class="third" id="_off_hour">${hours}</select onchange="Appliance.updateConfig('${appliance.serial}')"> :
      <select class="third" id="_off_min">${minutes}</select onchange="Appliance.updateConfig('${appliance.serial}')">
      <select class="third" id="_off_label" onchange="Appliance.updateConfig('${appliance.serial}')"><option value="AM">AM</option><option value="PM">PM</option></select><br>
      `);
      $('#_on_hour').val(appliance.automation[1].slice(0,2));
      $('#_on_min').val(appliance.automation[1].slice(3,5));
      $('#_on_label').val(appliance.automation[1].slice(6,9));
      $('#_off_hour').val(appliance.automation[0].slice(0,2));
      $('#_off_min').val(appliance.automation[0].slice(3,5));
      $('#_off_label').val(appliance.automation[0].slice(6,9));
  },
  // Apps
  updateConfig:function(serial){
    Home.appliance.map( val =>{
      console.log((val.serial==serial));
      if(val.serial==serial) {
        val.automation_enabled = String($('#_automation_enabled').val());
        val.automation[0] = `${$('#_off_hour').val()}:${$('#_off_min').val()} ${$('#_off_label').val()}`;
        val.automation[1] = `${$('#_on_hour').val()}:${$('#_on_min').val()} ${$('#_on_label').val()}`;
        console.log(val);
      }
    });

  },

  toggle: function(serial){
    serial = atob(serial+'=');
    Home.appliance.map(val=>{
      if(val.serial){  }

    })
  },
}


var Charts = {
  //chartView chartDate chartOffset
  init: function(){
    var chartView = $('#chartView').on('change', function() {
      Charts.select();
    });
    var chartDate = $('#chartDate').on('change', function() {
      Charts.render();
    });
    var chartOffset = $('#chartOffset').on('change', function() {
      Charts.render();
    });

  },

  render:async function(){
    // get values as a draft
    var chartView = $('#chartView').val();
    var chartDate = $('#chartDate').val();
    var chartOffset = $('#chartOffset').val();
    // defaults
    var chartViewSelected = (chartView=='no_data' ? 'Home' : chartView)
    var chartDateSelected = (chartDate=='no_data' ? 'Today' : chartDate)
    var chartOffsetSelected = (chartOffset=='no_data' ? 0 : Number(chartOffset))
    // create select list from data
    //Appliances
    var appliance = ['Home'].concat(Appliance.names()).concat(['Compare']);
    var temp='';
    appliance.map(val => { temp+=`<option value="${val}" ${(val==chartViewSelected ? 'selected': '' )}>${val}</option>`});
    $('#chartView').html(temp);
    // View
    var options = ['Today', 'Weekly','Monthly'];
    var temp='';
    options.map(val => { temp+=`<option value="${val}" ${(val==chartDateSelected ? 'selected': '' )}>${val}</option>`})
    $('#chartDate').html(temp);
    // Dates list
    var temp='';
    var limit = Appliance.oldest();
    for (var i = 0; i > -30; i--) {
      var stamp = Time.log(i);
      temp+=`<option value="${i}" ${(i==chartOffsetSelected ? 'selected': '' )}>${Time.date(i)}</option>`;
      if(stamp==limit) {break;}
    }
    $('#chartOffset').html(temp);
    // Main chart
    //Object
    var main = {
        chart: { height: 350, type: System.data.chartType}, plotOptions: { bar: { horizontal: false, columnWidth: '77%', endingShape: 'flat'},},
        dataLabels: { enabled: false }, stroke: {curve:'smooth', show: true, width: 0.7, colors: ['black']}, series: [],
        xaxis: { categories: [], labels:{show:true, style:{fontSize:'9px'}}}, legend:{show:false},
        theme:{monochrome:{enabled:true,}}, fill:{ colors: [ ()=> { var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); rgb = $('li[selected]').css('color'); rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); hex='#'; for(i=1;i<=3;i++){ hex+=isNaN(rgb[i]) ? "00" : hexDigits[(rgb[i] - rgb[i] % 16) / 16] + hexDigits[rgb[i] % 16];} return hex;}, '#aaa']},
        tooltip: { y: { formatter: function (val) { return "" + (val||0) + "W"}}}
    }

    //Prepare Data
    switch (chartDateSelected) {
      case 'Weekly':
          Appliance.data(chartOffsetSelected, sample=7,limit=limit).daily.map((data, i)=>{
            main.series.push({name:appliance[i], data:data})
          });
          main.xaxis.categories = Time.days(chartOffsetSelected);
          //console.log();
        break;
      case 'Monthly':
          Appliance.data(chartOffsetSelected, sample=30,limit=limit).daily.map((data, i)=>{
            main.series.push({name:appliance[i], data:data})
          });
          main.xaxis.categories = Time.range(chartOffsetSelected-30,chartOffsetSelected);
        break;
      default:

      Appliance.data(chartOffsetSelected,sample=1,limit=limit).log.map((data, i)=>{
        main.series.push({name:appliance[i], data:data[0]});

      });
      main.xaxis.categories=(Time.hours(main.series[0].data.length));
    }
    //console.log('Main object: '+JSON.stringify(main.series));



    //Donut chart
    //console.log(data);
    var template = {
      chart: { height: 400, type: 'donut', },
      stroke: {show: true, width: 0.7, colors: ['black']},
      series: data.total,
      xaxis: { categories: [], labels:{show:true}},
      legend:{position:'bottom'},
      plotOptions:{pie:{donut:{labels:{show:true,total:{showAlways:true,show:true}}}}},
      labels:Appliance.names(),
      tooltip: { y: { formatter: function (val) { return "" + (val/1000).toFixed(2) + "kW"}}}
      };
      //End of donut

      // Render Charts
      setTimeout(
        function(){
          if (typeof(Charts['chart'])=='undefined'){ Charts['chart'] = new ApexCharts( document.querySelector('#chart'), main ); Charts['chart'].render();}
          else{ Charts['chart'].updateOptions(main);}
          Charts.select();
        }
      ,50);
      setTimeout(
        function(){
          if (typeof(Charts['donut'])=='undefined'){ Charts['donut'] = new ApexCharts( document.querySelector('#donut'),template); Charts['donut'].render(); }
          else{ Charts['donut'].updateOptions(template);}}
      ,100);

      //  console.log('ad');

      var most =0;
      var max=0;
      var power =0;
      data.total.map( (val,index)=>{
        power+=val;
        if(max<val){max=val; most=index}
      }
      );


      var price = System.data.cost;
      // Computations
      var log = [
        {name:'Total Power Consumption', value:power/1000, unit:'kW'},
        {name:'Estimated Cost', value:(price*1).toFixed(2), unit:'Pesos / kW'},
        {name:'Estimated Price', value:(power/1000*price).toFixed(2), unit:'Pesos'},

        {name:'', value:'', unit:''},
        {name:'Most Used Appliance', value:appliance[most+1], unit:''},
        {name:`${appliance[most+1]} Power Consumption`, value:max/1000, unit:'Kw Hour'},
      ];
      var temp = '';
    log.map(val=>{
      temp += `<tr><td>${val.name}</td><td><b>${ val.value } ${val.unit}</b></td></tr>`
    });
    $('#computations').html(temp);
  },
  select: function(){
    // get values as a draft
    var chartView = $('#chartView').val();
    // defaults
    var chartViewSelected = (chartView=='no_data' ? 'Home' : chartView)

    var series = ['Home'].concat(Appliance.names());

    if(chartViewSelected=='Compare'){
      for(i=0; i<series.length;i++){ if(series[i]=='Home'){Charts['chart'].hideSeries(series[i]); continue}; Charts['chart'].showSeries(series[i]);
    }
      return;
    }
    for(i=0; i<series.length;i++){
      if (series[i]==chartViewSelected) {Charts['chart'].showSeries(series[i]); continue}
      this['chart'].hideSeries(series[i]);
    }
  },



};












//    *******
//    *     *
//    *     *
//    *     *
//    *     *
//    *     *
//    ******* B J E C T S

// Settings Functions
var System = {
  setup: function(){
    var username = $('#_username').val();
    var serial = $('#_home-serial').val();
    localStorage.setItem('credentials', JSON.stringify({username:username, serial:serial}));
    location.reload();
  },

  init: function(){
    // Pull
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings==null){ this.save(); settings=JSON.parse(localStorage.getItem('settings')); };
    System.data = settings;
    //Restore Settings
    Object.keys(settings).map(val =>{ $(`#${val}`).val(settings[val]);});
    // Listen
    $('.settings').on('change', function(event){ event.stopPropagation(); event.stopImmediatePropagation(); System.save(); });
    //Setup Home
    var home = localStorage.getItem('Home');
    if(home==null || home==''){
      localStorage.setItem('Home', JSON.stringify(Home));
    }
    else{
      Home = JSON.parse(home);
    }


    // Initialize
    System.exec();
    // Tab Functionalities
    $('nav li').click(function(){
      var target = $(this).index();
        localStorage.setItem('tab', target);
        $('body > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('main section').each(function(i){if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('nav li').each(function(i){if(i==target){ $(this).attr('selected', ''); return; } $(this).removeAttr('selected');});
        if(target==0){ setTimeout(function(){Charts.render()},50);}
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
  },
  update: function(){
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.filter(function(cacheName) {
          return true;
          // Return true if you want to remove this cache,
          // but remember that caches are shared across
          // the whole origin
        }).map(function(cacheName) {
          return caches.delete(cacheName);
        })
      );
    })
  location.reload();
  console.log('Reload');
  },
  //End of methods

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
      $('#container-'+id).animate( {maxHeight:'80vh', maxWidth:'700px'}, 100,);
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
      $('#container-'+id).animate( {marginTop:'4vh'}, 100).animate( {marginTop:'5vh'}, 100);
    });

  },
  close: function(id){
    console.log('close: '+id);
    $('#container-'+id).animate( {height:'0', width:'0'}, 100, function(){
      $('#modal-'+id).animate( {opacity:'0'}, 100).remove();
    });

  },
  slideOut: function(id){
    $('#container-'+id).animate( {marginTop:'4vh'}, 100).animate( {marginTop:'100vh'}, 150, function(){
      $('#modal-'+id).animate( {opacity:'0'}, 100).remove();
    });
  }
};
