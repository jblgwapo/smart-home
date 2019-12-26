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
Charts.init();




console.log(Appliance.dataTotal());


// TEst

console.log(navigator.onLine);





// test end
});





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
  range: function(start, end){
    var arr=[];
    for(i=start; i<end; i++) {arr.push(this.date(i))};
    return arr;
  },
  months:['Jan ','Feb ','Mar ','Apr ','May ','Jun ','Jul ','Aug ','Sep ','Oct ','Nov ','Dec '],
  days:['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
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
      log12262019:[32,45,67,98,123,53,12,78,56,90,123,10],
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
     log12262019:[32,45,67,98,123,53,12,78,56,90,123,10],
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
    log12262019:[32,45,67,98,123,53,12,78,56,90,123,10],
    log12252019:[45,32,45,76,89,32,12,65,34,87,90,100],
    log12242019:[32,45,67,98,123,53,12,78,56,90,123,10],
   }
  }
],




};






//OBJ for appliances

var Appliance = {
  init: function(){
    for(i=0; i<Home.appliance.length; i++){
      var article =
      `<article><header>${Home.appliance[i].name}
      <label class="switch"><input type="checkbox" ${(Home.appliance[i].status=='on'?'checked':'')}><span class="slider"></span></label></header>
      <lu><li>Serial Key: ${btoa(Home.appliance[i].serial).replace('=','')}</li>
      <li>Automation:<select><option>Beta</option></select></li>
      <li>Consumption: ${this.consumption(i)} Watts</li>
      </lu></article>`;
      $('#appliances').append(article);

    }

  },
  names: function(){
    var name = [];
    for(i=0; i<Home.appliance.length; i++){
      name.push(Home.appliance[i].name);
    }
    return name;
  },
  consumption:function(i, offset=0){ /* total consumption of an appliance for a day, returns a number */
    var arr =this.data(i,offset);
    if (arr==null) return 0;
    consumption=0; arr.map((val)=>{ consumption+=val;})
    return consumption;
  },
  weekly:function(index=0,offset=0){ /* Weekly power consumption of an appliance */
      var arr = [];
      for (var i = offset; i > (offset-7) ; i--) {
        arr.push(this.consumption(index,i));
      }
      return arr;
  },
  data: function(index, offset=0){ /* Hourly data of an appliance for a selected day: Select day using offset, returns an array */
    try { temp =  Home.appliance[index].consumption[Time.log(offset)];}
    catch (e) { temp = [0];}
    finally { return temp; }
  },

  /* Function for total consumptions of all appliances in a day ( Hourly manner) */
  dataTotal:function(offset=0){
    var data = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(i=0;i<Home.appliance.length; i++){
      var temp = this.data(i,offset);
        for(x=0;x<24;x++){
          data[x] += (temp[x]||0);
        }
        return data;
    }
  },
  weeklyTotal:function(offset=0){
    var data = [0,0,0,0,0,0,0];
    for(i=0;i<Home.appliance.length; i++){
      var temp = this.weekly(i,offset);
        for(x=0;x<7;x++){
          data[x] += (temp[x]||0);
        }
        return data;
    }
  },
  todayDistribution: function(offset=0){
    var data = [];
    for(i=0;i<Home.appliance.length; i++){
      data.push(this.consumption(i, offset));
        }
        return data;
  }

}


var Charts = {
  init: function(){


    Charts['chart'] = new ApexCharts(document.querySelector('#chart'), this.options(Appliance.weeklyTotal()));
    Charts['chart'].render();
    asd = 1;
    var A = setInterval( function(){
      if(asd==1) {Charts['chart'].updateOptions(Charts.options(Appliance.dataTotal())); asd=0;}
      else{
        Charts['chart'].updateOptions(Charts.options(Appliance.weeklyTotal()));
        asd=1;

    } },10000);
    this.renderDonut();
  },
  renderDonut: function(){
    Charts['donut'] = new ApexCharts(
      document.querySelector('#donut'),
      {
        chart: { height: 350, type: 'donut', },
        stroke: {show: true, width: 0.7, colors: ['black']},
        series: Appliance.todayDistribution(),
        xaxis: { categories: [], labels:{show:true}},
        plotOptions:{pie:{donut:{labels:{show:true,total:{showAlways:true,show:true}}}}},
        labels:Appliance.names(),
        tooltip: { y: { formatter: function (val) { return "" + val + "W"}}}
    });
    Charts['donut'].render();


  },

  options:function(data){
      var template = {
          chart: { height: 350, type: System.data.chartType, },
          plotOptions: {
              bar: { horizontal: false, columnWidth: '77%', endingShape: 'rounded'},
              },
          dataLabels: { enabled: false },
          stroke: {curve:'smooth', show: true, width: 0.7, colors: ['black']},
          series: [],
          xaxis: { categories: [], labels:{show:true}},
          legend:{show:false},
          //yaxis: {},
          fill:{ colors: [ ()=> { var hexDigits = new Array ("0","1","2","3","4","5","6","7","8","9","a","b","c","d","e","f"); rgb = $('li[selected]').css('color'); rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/); hex='#'; for(i=1;i<=3;i++){ hex+=isNaN(rgb[i]) ? "00" : hexDigits[(rgb[i] - rgb[i] % 16) / 16] + hexDigits[rgb[i] % 16];} return hex;}, '#aaa']},
          tooltip: { y: { formatter: function (val) { return "" + val + "W"}}}
      }
      template.series = [{ name:'Power Consumption', data:data }];
      switch (data.length) {
          case 24:
            template.xaxis.categories = Time.hours; template.xaxis.labels.show = false;
            break;
          case 30:
            template.xaxis.categories = Time.range(-30,0); template.xaxis.labels.show = false;
            break;
        default:
          template.xaxis.categories  = Time.days;

      }

        return template;
    },








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
