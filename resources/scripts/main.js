$(document).ready(function(){
  //init
    (function () {
        'use strict';

        var module = {
            options: [],
            header: [navigator.platform, navigator.userAgent, navigator.appVersion, navigator.vendor, window.opera],
            dataos: [
                { name: 'Windows Phone', value: 'Windows Phone', version: 'OS' },
                { name: 'Windows', value: 'Win', version: 'NT' },
                { name: 'iPhone', value: 'iPhone', version: 'OS' },
                { name: 'iPad', value: 'iPad', version: 'OS' },
                { name: 'Kindle', value: 'Silk', version: 'Silk' },
                { name: 'Android', value: 'Android', version: 'Android' },
                { name: 'PlayBook', value: 'PlayBook', version: 'OS' },
                { name: 'BlackBerry', value: 'BlackBerry', version: '/' },
                { name: 'Macintosh', value: 'Mac', version: 'OS X' },
                { name: 'Linux', value: 'Linux', version: 'rv' },
                { name: 'Palm', value: 'Palm', version: 'PalmOS' }
            ],
            databrowser: [
                { name: 'Chrome', value: 'Chrome', version: 'Chrome' },
                { name: 'Firefox', value: 'Firefox', version: 'Firefox' },
                { name: 'Safari', value: 'Safari', version: 'Version' },
                { name: 'Internet Explorer', value: 'MSIE', version: 'MSIE' },
                { name: 'Opera', value: 'Opera', version: 'Opera' },
                { name: 'BlackBerry', value: 'CLDC', version: 'CLDC' },
                { name: 'Mozilla', value: 'Mozilla', version: 'Mozilla' }
            ],
            init: function () {
                var agent = this.header.join(' '),
                    os = this.matchItem(agent, this.dataos),
                    browser = this.matchItem(agent, this.databrowser);

                return { os: os, browser: browser };
            },
            matchItem: function (string, data) {
                var i = 0,
                    j = 0,
                    html = '',
                    regex,
                    regexv,
                    match,
                    matches,
                    version;

                for (i = 0; i < data.length; i += 1) {
                    regex = new RegExp(data[i].value, 'i');
                    match = regex.test(string);
                    if (match) {
                        regexv = new RegExp(data[i].version + '[- /:;]([\\d._]+)', 'i');
                        matches = string.match(regexv);
                        version = '';
                        if (matches) { if (matches[1]) { matches = matches[1]; } }
                        if (matches) {
                            matches = matches.split(/[._]+/);
                            for (j = 0; j < matches.length; j += 1) {
                                if (j === 0) {
                                    version += matches[j] + '.';
                                } else {
                                    version += matches[j];
                                }
                            }
                        } else {
                            version = '0';
                        }
                        return {
                            name: data[i].name,
                            version: parseFloat(version)
                        };
                    }
                }
                return { name: 'unknown', version: 0 };
            }
        };

        var e = module.init();
        System.device = {
            os:`${e.os.name} ${e.os.version}`, browser:e.browser.name
        }
    }());





  // Setup Infos

  const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
  }
  // Detects if device is in standalone mode
  const isInStandaloneMode = () => ('standalone' in window.navigator) && (window.navigator.standalone);

  // Checks if should display install popup notification:
  if (isIos() && !isInStandaloneMode()) {
    //$('body').html('');
    //Modal.slide('Install the app first', 'The app must be installed first before you can run it.');  return;
  }

System.init();


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
    return ['12 MN','1 AM','2 AM','3 AM','4 AM','5 AM','6 AM','7 AM','8 AM','9 AM','10 AM','11 AM','12 NN','1 PM','2 PM','3 PM','4 PM','5 PM','6 PM','7 PM','8 PM','9 PM','10 PM','11 PM' ].splice(0,i);
  },
}



 var Socket = {
   status:{
     isOnline:false,
     token:0,
   },
   // b8caa513.jp.ngrok.io
   Sockets:{
     Local:'wss://smart-home-beta.local:417/ws',
     Global:'wss://smart-home.local:417/ws',
   //Global:'wss://3d5b85af.jp.ngrok.io',
   //Global:'wss://839298fc.jp.ngrok.io/ws'
 },
   //Sockets:{Local:'ws://localhost:417', Global:'wss://smart-home.local:7000'},
   mode:'Local',
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
     Socket.getGlobal();
     Socket.connectionHandler();
   },
   getGlobal: function(){
     var url = "https://script.google.com/macros/s/AKfycbxRNGjh4HadFn__jIp_tSmp5Tf_hQdhCJlWTwzxiRFx4n9jjI4c/exec?action=read";
     $.getJSON(url, function (json) {
       var link = '';
           for (var i = 0; i < json.records.length; i++) {
                   if( json.records[i].ID == System.serial){
                     link = json.records[i].NAME;
                   }
               }
               Socket.Sockets.Global = `wss://${link}.jp.ngrok.io/ws`;
       })
       .fail(function(){
         Socket.getGlobalHolder = setTimeout( function(){Socket.getGlobal();}, 5000);
        }
       )
   },
   connectionHandler: function(){
     // Local Setup
     try {
       Socket['wss'] = new WebSocket(Socket.Sockets[Socket.mode]);
     } catch (e) {console.error('Socket error: '+ this.mode); return}
       //console.log('Connecting to '+ Socket.Sockets[Socket.mode]);
     Socket.wss.onmessage = function(message){
       //console.log(message.data);
       //Callback on wrong server
       try {
        var server_request = JSON.parse(message.data);
       } catch (e) {
         Socket.wss.close();
         console.log('Server does not comply to standards: ' + JSON.stringify(message.data));
         return;
       }
       //Callback on server error
       if(!server_request.hasOwnProperty('code')&& !server_request.hasOwnProperty('data')){
         console.log('Rejected Message From Server');
         console.log('Message: ' + JSON.stringify(message));
         return; }


       var user_request = Socket.handler(server_request);
       // Request verification
       if(typeof(user_request)=='object') Socket.wss.send(JSON.stringify(user_request));
     }
     Socket.wss.onopen = (e) =>{
       var user_request = {
         code:( System.login ? 'serial' : 'login' ),
         key:System.serial,
         userdata:System.userdata
       };
       Socket.wss.send(JSON.stringify(user_request));
       if(System.login==false){
         Modal.slideOut(0);
         Appliance.init();
         Charts.init();
         CCTV.init();
       }


       //Modal.alert('Local is Online!');
       console.log(Socket.mode + ' is connected!');
       $('.system-status').each( function(){$(this).html(Socket.mode); $(this).css({color:'green'});});

       Socket.status.isOnline=true;
       //Loop through queue
       setTimeout( () => {
         try {
           Socket.queue.map( req => {
             req.status = Socket.status.token;
             console.log(req);
             Socket.wss.send(JSON.stringify(req));
           })
           Socket.queue = [];
         } catch (e) {}
       }, 1000);
     }

       // Disconnection
    Socket.wss.onerror = function(err) {
      Socket.wss.close();
      }
    Socket.wss.onclose = function(e) {
     //console.log(`${Socket.mode} is offline. Searching for socket.`, e.reason);
     $('.system-status').each( function(){$(this).html('Offline'); $(this).css({color:'red'});});
       Socket.status.isOnline=false;
       Socket.search();
       //Socket.search();
     };
   },

   handler: function(server_request, type=this.mode){
     var user_request ='';
     console.log('Server: '+server_request.code);
     switch (server_request.code) {
       case 'handshake':
          var credentials = JSON.parse(localStorage.getItem('credentials'));
          var user_request = {
            code:( System.login ? 'serial' : 'login' ),
            key:System.serial,
            userdata:System.userdata
          };
         break;
      case 'login':
            System.userdata.token = server_request.token;
            localStorage.setItem('userdata',JSON.stringify(System.userdata))
            location.reload();
          break;
       case 'acknowledge':
           Socket.status.token = server_request.token
           var user_request={
             code:'fetch',
             stamp:Socket.status.token
           }
       break;
       case 'destroy':
            //Destroys localStorage
            localStorage.clear();
            window.location.reload();
       break;
      case 'data':

          if(server_request.data=='No data')return;
          try {
            //check for file
            if(server_request.data.appliance.length==0){ console.log('No appliance: ' + JSON.stringify(server_request));}
            Home = server_request.data; //JSON.parse(server_request.data)
          } catch (e) {
            console.log('Data parse error: ' + e);
            console.log( JSON.stringify(server_request));
            return;
          }
          //console.log(JSON.stringify(server_request));
          localStorage.setItem('Home', JSON.stringify(Home) );
          console.log('New Data');
          Charts.render();
          setTimeout(function(){
            Appliance.init();
            CCTV.updateNames()
          },150)
        break;
      case 'notify':
          var user_request= { code:'fetch', data:Socket.status.token }
        break;
      case 'notification':
          Modal.alert(server_request.data);
        break;
      case 'snap':
            //var serial = server_request.serial;
            //console.log(serial);
            setTimeout( function(){
              //var frame = URL.createObjectURL(new Blob([server_request.data[0].data]));
              console.log('Snap');
              console.log(server_request.serial);

              $(`#${server_request.serial}_cctv`).attr('src', 'data:image/jpg;base64,'+server_request.data);
              //$('#UWEhZTY_cctv').attr('src',frame);
            },100);
          break;
      case 'live':
            $('#cctv_feed').attr('src', 'data:image/jpg;base64,'+server_request.data);
      break;
      case 'devices':
            var list = '';
            System.logged_devices = server_request.data;
            server_request.data.map(device=>{
              list+=`<li style="padding:7px; font-size:1em; ${System.userdata.token==device.token? 'color:green;':''}" onclick="System.view_device('${device.token}')">${device.os}</li>`;
            })
            $('#logged_devices').html(`<ul>${list}</ul>`)
      break;
       default:
       return;
     }
     console.log('Message to server:' + JSON.stringify(user_request));
    return user_request;
   },

   search: function(){
     setTimeout(function() { if(Socket.status.isOnline){return;} try { Socket.wss.close(); } catch (e) {} },3000);
     setTimeout(function() {
       if(Socket.mode=='Local'){ Socket.mode='Global'; }//console.log('Switched to global');}
       else{Socket.mode='Local';
       //console.log('Switched to local');
     }
        Socket.connectionHandler();
       }, 1000);
   },
   request: function(request){
     // Accepts object !important
     Socket.queue.push(request);
     //localStorage.setItem('queue',JSON.stringify(Socket.queue));
       try {
         Socket.queue.map( req => {
           req.stamp = Socket.status.token;
           console.log(req.stamp);
           console.log(JSON.stringify(req));
           console.log(JSON.stringify(req));
           Socket.wss.send(JSON.stringify(req));
         })
         Socket.queue = [];
         //localStorage.setItem('queue',JSON.stringify(Socket.queue));
       } catch (e) {}

   },
   register: function(){


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
    serial:'aWsadef', /* NRF serial key mockup */
    socket:1,
    automation_enabled:true, /* Automation is active */
    automation:['12:30 AM','12:00 PM'], /* Automation Time when active */
    consumption:{
      /* Format: log year month day : logYYYYMMDD   */
      /* 24 hour format / hourly data for an appliance */
      log20200612:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123},
     }
    },
    {
    name:'Aircon', /* User Defined */
    type:'switch',
    status:true, /* Remote */
    serial:'gltsFga',
    socket:2,
    automation_enabled:false,
    automation:['07:00 PM','03:00 AM'],
    consumption:{
      log20200612:{data:[23,45,56,45,34,50,40,23,20,10,43,43,43,23,3,12], total:123},
     }
   },{
   name:'Fan', /* User Defined */
   type:'switch',
   status:true, /* Remote */
   serial:'staphss',
   socket:1,
   automation_enabled:false,
   automation:['',''], /* Default Automation time */
   consumption:{
     log20200612:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123},
    }
  },{
  name:'Lights', /* User Defined */
  type:'switch',
  status:true, /* Remote */
  serial:'oledstx',
  socket:2,
  automation_enabled:false,
  automation:['',''],
  consumption:{
    log20200612:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123},

   }
  }
],


// Home Power Consumption
/* same as appliance but uses the total value of all appliance */
consumption:{
    log20200612:{data:[10.23,50,70,60,80,50,40,30,20,10,23,120,40,130,170,12], total:123}
},


/* camera object */
camera:[{
  name:'ESP CAM',
  lightsCapable:'yes',
  serial:'UWEhZTY',
  socket:'wss://6b1c4d39.jp.ngrok.io/wss'
}],
};




var CCTV = {
  init: function(){
    $('#camera').html('');
    Home.camera.map( cctv=>{
      var camera =
      `<article><header><span onclick="CCTV.options('${cctv.serial}')" id="camera_${cctv.serial}">${cctv.name}</span></header>
          <div style="width:100%;"><img id="${cctv.serial}_cctv" style="height:200px; width:auto;"><br><button onclick="CCTV.live('${cctv.serial}')">Live</button></div>
      </article>`;
      $('#camera').append(camera);
      //Socket.request({type:'frame', data:0, serial:cctv.serial });
    })
    $('#camera').append('<article><header>Add a CCTV<button onclick="CCTV.addWindow()">ADD</button></header><b>Instructions:</b><p>1. Plug your device<br>2. Press the add button above this instructions.<br>3. Insert the serial key.<br>4. Wait for the confirmation.</p></article>');
  },
  update: function(serial, data){


  },
  addWindow: function(){
    Modal.confirm('<b>Insert CCTV Serial Key</b><br><input id="_cctv_serial_key"></input>', 'CCTV.add()');
  },
  //Rename, remove and toggle
  add: function(){
    serial = $('#_cctv_serial_key').val();
    if(serial.length!=8){Modal.alert('Invalid serial'); return}
      Socket.request({code:'register', data:0, serial:serial, device:'cctv' });
  },
  remove: function(serial){
    Socket.request({code:'remove', data:0, serial:serial , item:'cctv'});
    Modal.close(Modal.count-2);
  },
  options:function(serial){
    Home.camera.map(val=>{
      if(val.serial==serial){
        Modal.alert(`<a onclick="CCTV.remove('${serial}')" style="float:right; color:red;">remove</a><br><input type="text" id="camera-rename" value="${val.name}" onchange="CCTV.rename('${serial}', this.value)">`);
      }
    });

  },
  updateNames:function() {
      Home.camera.map(val=>{
        $(`#camera_${val.serial}`).html(val.name);
      });
  },
  renamePrompt:function(serial){
    Home.camera.map(val=>{
      if(val.serial==serial){
        Modal.confirm(`<input type="text" id="camera-rename" value="${val.name}">`,`CCTV.rename('${serial}', $('#camera-rename').val());`)
      }
    });
  },
  rename: function(serial, newName){
    Home.camera.map((cam)=>{
      if(cam.serial==serial){
        Socket.request({code:'rename', data:0, name:newName, serial:cam.serial, socket:'---', device:'camera' })
      }
    })
  },

  live: function(serial){
    this.data.serial = serial;
    Socket.request({code:'feed', intent:'start', data:'---', serial:serial})
    Modal.slide('Live Feed:',
      `<center style="position:relative"><div id="cctv_feed_box">
      <input type="range" id="x" min="0" max="180"  oninput="CCTV.servo('X'+(180-this.value))">
      <input type="range" id="y" min="0" max="180"  oninput="CCTV.servo('Y'+this.value)">
      <img src="resources/images/cctv_placeholder.png" id="cctv_feed" style="width:100%; height:auto;"></div></center>
      <button onclick="CCTV.request('lights')">Lights</button>
      `, `CCTV.stop();`
    );

  },
  stop: function(){
    Socket.request({code:'feed', intent:'stop', data:'---', serial:'---' });
    clearInterval(CCTV.servo_x); clearInterval(CCTV.servo_y);
  },
  servo: function(code){
    if(this.data.servo){
      this.timer = setTimeout( function(){
      CCTV.request(code);
      CCTV.data.servo = true;
      } ,100);
      this.data.servo = false
    }
  },

  data:{ lights:1, servo:true, serial:null},
  request: function(code){
    if (code=='lights'){
      this.data.lights++;
      code = (this.data.lights%2==0? '#1':'#0' )
    }
    serial = this.data.serial;
    Socket.request({code:'feed', intent:'send', data:code, serial:serial})
  },


};




//OBJ for appliances

var Appliance = {
  init: function(){

    $('#appliances').html('');
    Home.appliance.map( appliance =>{
      var total = 0;
      try {
        total = appliance.consumption[Time.log()].total;
      } catch (e) {}

      var serial = appliance.serial;

      var temp =
      `<article><header>
      <span onclick="Appliance.options('${serial}',${appliance.socket})" style="cursor:pointer;">
      <div style="height:0.5em; width:0.5em; background:${appliance.online?'green':'red'}; border-radius:0.5em; display:inline-block;"></div>
      ${appliance.name}
      </span>
      <label class="switch" ${(appliance.type=="Monitor"? 'style="display:none;"':'')}><input type="checkbox" ${(appliance.status==true?'checked':'')} onchange="Appliance.toggle('${serial}',${appliance.socket})"><span class="slider"></span></label></header>
      <ul><li>Serial Key: ${ serial }:${ appliance.socket }</li>
      <li>Type: ${appliance.type}</li>
      <li>Consumption: ${ total } Watts today</li><br>
      <div ${(appliance.type=="Monitor"? 'style="display:none;"':'')}>
      <li>Automation: ${(appliance.automation_enabled ? 'enabled' : 'disabled')}

      </li>
      <li>Turn on every: ${(appliance.automation_enabled ? appliance.automation[1] : 'disabled')}</li>
      <li>Turn off every: ${(appliance.automation_enabled ? appliance.automation[0] : 'disabled')}</li>
      </div>
      </ul><br>
      <button onclick="Appliance.configure('${(serial)}',${appliance.socket})" style="font-size:0.7em; ${(appliance.type=="Monitor"? 'display:none;':'')}">Configure</button>

      </article>`;
      $('#appliances').append(temp);
    });
    $('#appliances').append('<article><header>Add a Smart Socket<button onclick="Appliance.addWindow()">ADD</button></header><b>Instructions:</b><p>1. Plug your device<br>2. Press the add button above this instructions.<br>3. Insert the serial key.<br>4. Wait for the confirmation.</p></article>');
  },
  names: function(){
    var name = [];
    Home.appliance.map( val=>{name.push(val.name);});
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

  configure: function(serial, socket){
    var appliance;
    var hours=''; var minutes='';
    for(i=1;i<=12;i++){
      hours+='<option value="'+(i<10 ? '0'+ i:i )+'">'+(i<10 ? '0'+ i:i )+'</option>';
    }
    for(i=0;i<60;i++){
      minutes+='<option value="'+(i<10 ? '0'+ i:i )+'">'+(i<10 ? '0'+ i:i )+'</option>';
    }
    Home.appliance.map( val =>{ if(val.serial==serial && val.socket==socket) appliance=val; })
    if(!appliance) {Modal.alert('None Found '+serial); return;}
    Modal.alert( `<b style="font-size:1.5em;">${appliance.name}</b><a style="float:right; color:red; cursor:pointer;" onclick="Appliance.removePrompt('${serial}')">remove</a><br><br>
      Automation:
      <select id="_automation_enabled" onchange="Appliance.updateConfig('${serial}',${appliance.socket})">
      <option value="1">Enabled</option>
      <option value="0" ${((appliance.automation_enabled==false)? 'selected':'')}>Disabled</option>
      </select>

      Turn On time:<br>
      <select class="third" id="_on_hour" onchange="Appliance.updateConfig('${serial}',${appliance.socket})">${hours}</select> :
      <select class="third" id="_on_min" onchange="Appliance.updateConfig('${serial}',${appliance.socket})">${minutes}</select >
      <select class="third" id="_on_label" onchange="Appliance.updateConfig('${serial}',${appliance.socket})"><option value="AM">AM</option><option value="PM">PM</option></select><br>

      Turn Off time:<br>
      <select class="third" id="_off_hour" onchange="Appliance.updateConfig('${serial}',${appliance.socket})">${hours}</select> :
      <select class="third" id="_off_min" onchange="Appliance.updateConfig('${serial}',${appliance.socket})">${minutes}</select>
      <select class="third" id="_off_label" onchange="Appliance.updateConfig('${serial}',${appliance.socket})"><option value="AM">AM</option><option value="PM">PM</option></select><br>
      `);
      $('#_on_hour').val(appliance.automation[1].slice(0,2));
      $('#_on_min').val(appliance.automation[1].slice(3,5));
      $('#_on_label').val(appliance.automation[1].slice(6,9));
      $('#_off_hour').val(appliance.automation[0].slice(0,2));
      $('#_off_min').val(appliance.automation[0].slice(3,5));
      $('#_off_label').val(appliance.automation[0].slice(6,9));

      $('#_on_hour').on('change', function(){Appliance.updateConfig(appliance.serial, appliance.socket)} );
      $('#_on_min').on('change', function(){Appliance.updateConfig(appliance.serial, appliance.socket)} );
      $('#_on_label').on('change', function(){Appliance.updateConfig(appliance.serial, appliance.socket)} );
      $('#_off_hour').on('change', function(){Appliance.updateConfig(appliance.serial, appliance.socket)} );
      $('#_off_min').on('change', function(){Appliance.updateConfig(appliance.serial, appliance.socket)} );
      $('#_off_label').on('change', function(){Appliance.updateConfig(appliance.serial, appliance.socket)} );

  },
  // Apps
  updateConfig:function(serial, socket){
    console.log('S: '+socket);
    console.log(serial);
    Home.appliance.map( val =>{
      console.log((val.serial==serial));
      if(val.serial==serial) {
        val.automation_enabled = Boolean(Number($('#_automation_enabled').val()));
        console.log('Automation:'+Boolean($('#_automation_enabled').val()));
        val.automation[0] = `${$('#_off_hour').val()}:${$('#_off_min').val()} ${$('#_off_label').val()}`;
        val.automation[1] = `${$('#_on_hour').val()}:${$('#_on_min').val()} ${$('#_on_label').val()}`;
        Socket.request({code:'automation', serial:val.serial, socket:val.socket, data:0, automation_enabled:val.automation_enabled, automation:val.automation})
        console.log(val);
      }
    });
  },
  removePrompt: function(serial){

    var appliances = '';
    Home.appliance.map(val=>{
      if(val.serial==serial){
        appliances+=`<li>${val.name}</li>`
      }
    });
    if(appliances=='')return;
    Modal.confirm(`
      <b style="height:1.2em">Are you sure you want to remove this socket?</b><br>
      Serial: ${serial}<br>
      <em>The socket includes the following</em>:<lu>${appliances}</lu>
      `, `Appliance.remove('${serial}')`);
  },
  addWindow: function(){
    Modal.confirm('<b>Insert Socket Serial Key</b><br><input id="_appliance_serial_key"></input>', 'Appliance.add()');
  },
  //Rename, remove and toggle
  add: function(){
    serial = $('#_appliance_serial_key').val();
    if(serial.length!=7){Modal.alert('Invalid serial'); return}
    try {
      atob(serial+'=');
      console.log('reg:'+serial);
      Socket.request({code:'register', data:0, serial:serial, device:'appliance' });
    } catch (e) {
      Modal.alert('Invalid serial');
    } finally {
      return;
    }
  },
  remove: function(serial){

    Socket.request({code:'remove', data:0, serial:serial , item:'appliance'});
    Modal.close(Modal.count-2);
  },
  options: function(serial,socket){
    Home.appliance.map(val=>{
      if(val.serial==serial && val.socket==socket){
        Modal.alert(`<a onclick="" style="float:right; color:red;">remove</a><br><input type="text" id="appliance-rename" value="${val.name}" onchange="Appliance.rename('${serial}','${socket}',this.value)">`);}
    });

  },

  rename:function(serial, socket, newName){
    console.log('Rename: '+newName );
    Home.appliance.map(val=>{
      if(val.serial==serial && val.socket==socket){
        console.log('Rename: '+ serial +' ' + socket);
        console.log('Rename:'+newName);
        Socket.request({code:'rename', data:0, name:newName, serial:val.serial, socket:val.socket, device:'appliance' })
      }
    })
  },
  toggle: function(serial, socket){

    console.log('Toggle:'+serial+':'+socket);
    Home.appliance.map(val=>{
      if(val.serial==serial && val.socket==socket){
        Socket.request({code:'toggle', data:0, state:Boolean(!val.status), serial:val.serial, socket:val.socket  })
      }
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
        yaxis: { labels:{ formatter:function(val){ return val.toFixed(0) + 'W'; }}},
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
    console.log('Main object: '+JSON.stringify(main.series));



    //Donut chart
    //console.log(data);
    var template = {
      chart: { height: 400, type: 'donut', },
      stroke: {show: true, width: 0.7, colors: ['black']},
      series: data.total,
      xaxis: { categories: [], labels:{show:true}},
      legend:{position:'bottom'},
      plotOptions:{pie:{donut:{labels:{show:true,total:{showAlways:true,show:true,
        formatter:function(w){
          var val = w.globals.seriesTotals.reduce((a, b) => {
              return a + b
            }, 0)
          return (val>1000 ? (val).toFixed(2)+' kW' : (val).toFixed(2)+' W');
      }} }  }}},
      labels:Appliance.names(),
      tooltip: { y: { formatter: function (val) { return "" + (val/1000).toFixed(2) + "kW" }}}
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
        {name:'Total Power Consumption', value:(power>500 ? (power/1000).toFixed(2): (power).toFixed(2) ), unit:(power>500 ? 'kW': 'W' )},
        {name:'Estimated Cost', value:(price*1).toFixed(2), unit:'Pesos / kW'},
        {name:'Estimated Price', value:(power/1000*price).toFixed(2), unit:'Pesos'},

        {name:'', value:'', unit:''},
        {name:'Most Used Appliance', value:appliance[most+1], unit:''},
        {name:`${appliance[most+1]} Power Consumption`, value:(max>500 ? (max/1000).toFixed(2): (max).toFixed(2) ), unit:(max>500 ? 'kW': 'W' )},
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
      try {
        if (series[i]==chartViewSelected) {Charts['chart'].showSeries(series[i]); continue}
        this['chart'].hideSeries(series[i]);
      } catch (e) {

      }
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
  price:{ company:[], cost:[]},
  setup: function(){
    Modal.slide('<div id="slide_up_title">Welcome</div>',
    `
    <div id="_home_key" style="display:block;">
      <b>Home key:</b>
      <input id="_home_serial" value="amFsZSc">
      <button onclick="System.connect()">Submit</button>
    </div>
    <div id="_home_login" style="display:none;">
      Username:
        <input id="login_username" value="admin">
      Password:
        <input id="login_password" type="password" value="12345678">
      <button onclick="System.register()">Submit</button>
    </div>
    `,
    `Modal.alert('You must login first');return;`);
    //localStorage.setItem('credentials', JSON.stringify({username:username, email:email, serial:serial, }));
    //location.reload();
    //Decode link
    //Set link in socket
  },
  connect:function(){
    System.serial = $('#_home_serial').val();
    Socket.getGlobal();
    var url = "https://script.google.com/macros/s/AKfycbxRNGjh4HadFn__jIp_tSmp5Tf_hQdhCJlWTwzxiRFx4n9jjI4c/exec?action=read";
    $.getJSON(url, function (json) {
      var link = '';
          for (var i = 0; i < json.records.length; i++) {
                  if( json.records[i].ID == System.serial){
                    link = json.records[i].NAME;
                  }
              }
              if(link==''){ Modal.alert('Smart Home Serial not recognized...') }
              Socket.Sockets.Global = `wss://${link}.jp.ngrok.io/ws`;

      })
      .fail(function(){})
      $('#_home_key').css({display:'none'});
      $('#_home_login').css({display:'block'});
  },
  register: function(){
    //Get system serial
    System.login=false;
    System.userdata = {
      username:$('#login_username').val(),
      password:$('#login_password').val(),
      device:System.device,
      serial:$('#_home_serial').val(),
      stamp:0
    }
    localStorage.setItem('userdata',JSON.stringify(System.userdata));
    System.serial = System.userdata.serial;
    Socket.init();
  },

  init: function(){
    // Tab Functionalities
    $('nav li').click(function(){
      var target = $(this).index();
        localStorage.setItem('tab', target);
        $('body > header').each(function(i){ if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('section').each(function(i){if(i==target){ $(this).attr('active', ''); return; } $(this).removeAttr('active');});
        $('nav li').each(function(i){if(i==target){ $(this).attr('selected', ''); return; } $(this).removeAttr('selected');});
        if(target==0){ setTimeout(function(){Charts.render()},50);}
      });
      $('nav li').eq(Number(localStorage.getItem('tab'))).trigger('click');


    // Pull
    var settings = JSON.parse(localStorage.getItem('settings'));
    if (settings==null){ this.save(); settings=JSON.parse(localStorage.getItem('settings')); };
    System.data = settings;
    try {
      var temp = JSON.parse(localStorage.getItem('userdata'));
    } catch (e) {
      console.log(e);
    }

    console.log(temp);
    if (temp==null){
      //System.setup()
      return;
    };

    System.login = true;
    System.serial= temp.serial;
    System.userdata= temp;

    $('#username_display').html(this.userdata.username);
    $('#serial_display').html(this.userdata.serial);


    var temp = JSON.parse(localStorage.getItem('token'));
    if (temp==null){ /*System destroy*/ };
    System.token = temp;
    //Restore Settings
    Object.keys(settings).map(val =>{ $(`#${val}`).val(settings[val]);});
    System.exec();
    // Listen

    try {
      var temp = JSON.parse(localStorage.getItem('prices'));
    } catch (e) {
      System.price.cost = [10];
      System.price.company = ['Default'];
    }



    $('#cost').val();

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
    //System.getPrices();

    // Init for other main features
    Appliance.init();
    Charts.init();
      // Graphs
    Socket.init();
    CCTV.init();
  },data:{},serial:'',
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
  users: function(){
    Socket.request({code:'devices', username:System.userdata.username });
    Modal.slide('Logged devices', '<div id="logged_devices"></div>');

  },
  view_device: function(token){
    System.logged_devices.map(device=>{
      if(device.token==token){
        Modal.alert(`<h1>Device details</h1>${device.os}<br>${device.browser}<br>${device.token}<br><a onclick="System.logout_device('${device.token}')">Log out from device</a><br>`);
      }
    })
  },
  logout_device:function(token){
    System.logged_devices.map(device=>{
      if(device.token==token){
        Socket.request({code:'logout', username:System.userdata.username ,device:token });
      }
    });
  },
  getPrices: function(){
    var url = "https://script.google.com/macros/s/AKfycbyucHu8ueH2GEzJWZV-azOiqShX2Um3t2MT00hM/exec?action=read";
    $.getJSON(url, function (json) {
      var prices = '';
          System.price.cost = [];
          System.price.company = [];
          localStorage.setItem('prices', json.records)
          json.records.map(val=>{
            System.prices.cost.push(val.NAME);
            System.prices.company.push(val.ID);
            prices+=`<option value="${val.ID}" id="elecrical-${val.NAME}" >${val.ID} (${val.NAME} pesos/kW)</option>`
          })
            prices+='<option value="0">Custom</option>';
              $('#priceSelector').html(prices);
      })
      .fail(function(){
        System.prices = setTimeout( function(){System.getPrices();}, 15000);
       }
      )
  },
  setPrice: function(){
    var price = Number($('#priceSelector').val());
    if(price==0){
      $('#cost').css({display:'block'});
    }
    else{
      for (var i = 'custom'; i < System.prices.company.length; i++) {
        System.data.price = System.prices.cost[i];
      }
      $('#cost').val(price);
      $('#cost').css({display:'none'});
    }
  },

  destroy: function(){
    localStorage.clear()
    location.reload();
  }



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
  slide: function(header, content, callback='', exit=true){
    var close = callback +  (exit==true ? `Modal.slideOut(${this.count})`: '');
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



const debug = function(text) {

  console.log(text);
}
