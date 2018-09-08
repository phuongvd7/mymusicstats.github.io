function welcomeFn(){var g=document.getElementById("userName").value;""==g?UIkit.notification({message:"<span uk-icon='icon: warning'></span> Error! Enter a Last.fm user name.",status:"danger"}):UIkit.notification({message:"<span uk-icon='icon: check'></span> Visualising your data now. Scroll down if on a mobile device.",status:"primary"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key=6e616452b7c762a15256272ddb774c56&user="+g+"&format=json",function(e){var i=e.user.realname,u="<b>"+e.user.playcount+"</b>",t=e.user.playcount,a=e.user.registered.unixtime,c=e.user.image[2]["#text"],o=new Date(1e3*a),n=o.getFullYear(),l="<b>"+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][o.getMonth()]+" "+o.getDate()+", "+n+"</b>!",r=new Date(1e3*a),s=new Date,m="<b>"+Math.round(Math.abs((r.getTime()-s.getTime())/864e5))+"</b>",d="<b>"+(t/Math.round(Math.abs((r.getTime()-s.getTime())/864e5))).toFixed()+"</b>";$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&nowplaying=true&api_key=6e616452b7c762a15256272ddb774c56&user="+g+"&format=json",function(e){var t="<b>"+e.recenttracks.track[0].name+"</b>",a=e.recenttracks.track[0].date["#text"],o=e.recenttracks.track[0].url,n=e.recenttracks.track[0].image[2]["#text"],r="<b>"+e.recenttracks.track[0].artist["#text"]+"</b>",s="<b>"+e.recenttracks.track[0].album["#text"]+"</b>";document.getElementById("welcome").innerHTML="Hi "+i,document.getElementById("totalScrobbles").innerHTML="You have heard a total of "+u+" songs since joining Last.fm on "+l+" It means "+m+" days have elapsed since then! Oh, it also means that you have listened to "+d+" songs per day! Keep it up.",document.getElementById("image").src=c,$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+g+"&format=json",function(e){var a="";$.each(e.toptracks.track,function(e,t){a+="<li><b>"+t.name+"</b> - Play count : "+t.playcount+"</li>"}),document.getElementById("toptentracksLabel").innerHTML="Your Top 10 Most Played Songs: -",$("#toptentracks").empty(),$("#toptentracks").append(a),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+g+"&format=json",function(e){var a="";$.each(e.topartists.artist,function(e,t){a+="<li><b>"+t.name+"</b> - Play count : "+t.playcount+"</li>"}),document.getElementById("toptenArtistsLabel").innerHTML="Your Top 10 Most Played Artists: -",$("#toptenartists").empty(),$("#toptenartists").append(a),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+g+"&format=json",function(e){var a="";$.each(e.topalbums.album,function(e,t){a+="<li><b>"+t.name+"</b> - Play count : "+t.playcount+"</li>"}),document.getElementById("toptenAlbumsLabel").innerHTML="Your Top 10 Most Played Albums: -",$("#toptenalbums").empty(),$("#toptenalbums").append(a)})})});document.getElementById("recentTracks").innerHTML='<i class="fas fa-play"></i> Your last played song is : '+t+" by : "+r+" from the Album : "+s,document.getElementById("lastplayed").src=n,document.getElementById("lastplayedsongdetails").hidden=!1,document.getElementById("lastplayedsongtitle").innerHTML=t,document.getElementById("lastplayedsongtime").innerHTML="Played on : "+a,document.getElementById("lastplayedsongdescription").innerHTML="Artist : "+r+" Album : "+s+". To read more about the song, click the link below.",document.getElementById("lastplayedsonglink").innerHTML=o})})}function drawChart(){var e=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+e+"&format=json",function(e){var t=new google.visualization.DataTable;t.addColumn("string","Song Title"),t.addColumn("number","Play Count");for(var a=0;a<e.toptracks.track.length;a++){t.addRow([e.toptracks.track[a].name,parseInt(e.toptracks.track[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedtracks")).draw(t,{title:"Most Played Tracks. (Hover mouse to see the title.)",hAxis:{textPosition:"none"},chartArea:{width:"85%",height:"78%"},legend:{position:"bottom"}})}document.getElementById("top20tracksLabel").innerHTML="And here are your Top 20 Most Played Songs: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+e+"&format=json",function(e){var t=new google.visualization.DataTable;t.addColumn("string","Artist"),t.addColumn("number","Play Count");for(var a=0;a<e.topartists.artist.length;a++){t.addRow([e.topartists.artist[a].name,parseInt(e.topartists.artist[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedartists")).draw(t,{title:"Most Heard Artists. (Hover mouse to see the title.)",chartArea:{width:"85%",height:"78%"},legend:"bottom",hAxis:{textPosition:"none"}})}document.getElementById("top20artistsLabel").innerHTML="And here are your Top 20 Most Heard Artists: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+e+"&format=json",function(e){var t=new google.visualization.DataTable;t.addColumn("string","Album"),t.addColumn("number","Play Count");for(var a=0;a<e.topalbums.album.length;a++){t.addRow([e.topalbums.album[a].name,parseInt(e.topalbums.album[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedalbums")).draw(t,{title:"Most Heard Albums. (Hover mouse to see the title.)",chartArea:{width:"85%",height:"78%"},legend:"bottom",hAxis:{textPosition:"none"}})}document.getElementById("top20albumsLabel").innerHTML="And here are your Top 20 Most Heard Albums: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptags&limit=5&api_key=6e616452b7c762a15256272ddb774c56&user="+e+"&format=json",function(e){var t=new google.visualization.DataTable;t.addColumn("string","Tags/Genre"),t.addColumn("number","Count");for(var a=0;a<e.toptags.tag.length;a++){t.addRow([e.toptags.tag[a].name,parseInt(e.toptags.tag[a].count)]);new google.visualization.PieChart(document.getElementById("toptags")).draw(t,{title:"Top Tags/Genre. (Hover mouse to see the title.)",chartArea:{width:"85%",height:"95%"},pieSliceText:"label",legend:"none",pieHole:.4})}document.getElementById("toptagsLabel").innerHTML="Your Top Tags/Genre: -"})}function fetchNumber(){var a=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&api_key=6e616452b7c762a15256272ddb774c56&user="+a+"&format=json",function(e){$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&api_key=6e616452b7c762a15256272ddb774c56&user="+a+"&format=json",function(e){$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&api_key=6e616452b7c762a15256272ddb774c56&user="+a+"&format=json",function(e){var t=e.topalbums["@attr"].total;document.getElementById("numuniquealbums").innerHTML="Albums : "+t});var t=e.topartists["@attr"].total;document.getElementById("numuniqueartists").innerHTML="Artists : "+t+" "});var t=e.toptracks["@attr"].total;document.getElementById("numunique").innerHTML="In case you want to know how many distinct Tracks/Artists/Albums you have listened to, here the data is.",document.getElementById("numuniquetracks").innerHTML="Tracks :  "+t+" "})}function scrobblesDaily(){var e=document.getElementById("userName").value,t=(new Date).setUTCHours(0,0,0,0)/1e3;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=6e616452b7c762a15256272ddb774c56&user="+e+"&from="+t+"&format=json",function(e){var t="<b>"+e.recenttracks["@attr"].total+"</b>";document.getElementById("todaysscrobbles").innerHTML="You have listened to "+t+" songs today."})}function uniqueTracks(){var e="https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+document.getElementById("userName").value+"&format=json",a=new XMLHttpRequest,n=new XMLHttpRequest;a.open("GET",e),n.open("GET","https://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=6e616452b7c762a15256272ddb774c56&limit=10&format=json"),a.responseType="json",n.responseType="json";var r=[],s=[];a.onload=function(){for(var e=0;e<10;e++){var t=a.response.toptracks.track[e].name;r.push(t)}},a.send(),n.onload=function(){for(var e=0;e<10;e++){var t=n.response.tracks.track[e].name;s.push(t)}var a=$(s).not(r).get();document.getElementById("trackuniqueness").innerHTML="Unique-O-Meter",document.getElementById("diff").innerHTML="Your listening taste uniqueness quotient is <b>"+10*a.length+"</b>. It means "+(10-a.length)+" of your top 10 tracks match the global top 10!";var o=google.visualization.arrayToDataTable([["Label","Value"],["Uniqueness",10*a.length]]);new google.visualization.Gauge(document.getElementById("uniquetracksguage")).draw(o,{redFrom:90,redTo:100,yellowFrom:75,yellowTo:90,minorTicks:5})},n.send()}function uniqueArtists(){var e="https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+document.getElementById("userName").value+"&format=json",a=new XMLHttpRequest,n=new XMLHttpRequest;a.open("GET",e),n.open("GET","https://ws.audioscrobbler.com/2.0/?method=chart.gettopartists&api_key=6e616452b7c762a15256272ddb774c56&limit=10&format=json"),a.responseType="json",n.responseType="json";var r=[],s=[];a.onload=function(){for(var e=0;e<10;e++){var t=a.response.topartists.artist[e].name;r.push(t)}},a.send(),n.onload=function(){for(var e=0;e<10;e++){var t=n.response.artists.artist[e].name;s.push(t)}var a=$(s).not(r).get();document.getElementById("artistuniqueness").innerHTML="Unique-O-Meter",document.getElementById("artist_diff").innerHTML="Your Artist/Singer uniqueness quotient is <b>"+10*a.length+"</b>. It means "+(10-a.length)+" of your top 10 Artists match the global top 10!";var o=google.visualization.arrayToDataTable([["Label","Value"],["Uniqueness",10*a.length]]);new google.visualization.Gauge(document.getElementById("uniqueartistsguage")).draw(o,{redFrom:90,redTo:100,yellowFrom:75,yellowTo:90,minorTicks:5})},n.send()}function firstSong(){var o=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&page=200000&api_key=6e616452b7c762a15256272ddb774c56&user="+o+"&format=json",function(e){var t=e.recenttracks["@attr"].totalPages,a="https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&api_key=6e616452b7c762a15256272ddb774c56&user="+o+"&page="+t+"&format=json";$.getJSON(a,function(e){var t=e.recenttracks.track[e.recenttracks.track.length-1].name,a=e.recenttracks.track[e.recenttracks.track.length-1].artist["#text"],o=e.recenttracks.track[e.recenttracks.track.length-1].album["#text"],n=e.recenttracks.track[e.recenttracks.track.length-1].date["#text"],r=e.recenttracks.track[e.recenttracks.track.length-1].image[2]["#text"];document.getElementById("firstsongmessage").innerHTML="<U>Details of your first scrobbled song.<U>",document.getElementById("firstsongname").innerHTML="<b>Title : </b>"+t,document.getElementById("firstartistname").innerHTML="<b>Artist : </b>"+a,document.getElementById("firstalbumname").innerHTML="<b>Album : </b>"+o,document.getElementById("firstsongdate").innerHTML="<b>Date : </b>"+n,document.getElementById("firstsongimage").src=r})})}google.charts.load("current",{packages:["corechart"]}),google.charts.load("current",{packages:["gauge"]}),google.charts.load("current",{packages:["gauge"]});