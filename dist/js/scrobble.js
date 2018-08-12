function welcomeFn(){var b=document.getElementById("userName").value;""==b?UIkit.notification({message:"<span uk-icon='icon: warning'></span> Error! Enter a Last.fm user name.",status:"danger"}):UIkit.notification({message:"<span uk-icon='icon: check'></span> Visualising your data now. Scroll down if on a mobile device.",status:"primary"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getinfo&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var e=t.user.name,a="<b>"+t.user.playcount+"</b>",o=t.user.playcount,n=t.user.registered.unixtime,s=t.user.image[2]["#text"],r=new Date(1e3*n),i=r.getFullYear(),l="<b>"+["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+", "+i+"</b>!",u=new Date(1e3*n),c=new Date,m="<b>"+Math.round(Math.abs((u.getTime()-c.getTime())/864e5))+"</b>",d="<b>"+(o/Math.round(Math.abs((u.getTime()-c.getTime())/864e5))).toFixed()+"</b>";$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&nowplaying=true&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var e="<b>"+t.recenttracks.track[0].name+"</b>",a=t.recenttracks.track[0].image[2]["#text"],o="<b>"+t.recenttracks.track[0].artist["#text"]+"</b>",n="<b>"+t.recenttracks.track[0].album["#text"]+"</b>";$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var a="";$.each(t.toptracks.track,function(t,e){a+="<li><b>"+e.name+"</b> - Play count : "+e.playcount+"</li>"}),document.getElementById("toptentracksLabel").innerHTML="Your Top 10 Most Played Songs: -",$("#toptentracks").append(a),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var a="";$.each(t.topartists.artist,function(t,e){a+="<li><b>"+e.name+"</b> - Play count : "+e.playcount+"</li>"}),document.getElementById("toptenArtistsLabel").innerHTML="Your Top 10 Most Played Artists: -",$("#toptenartists").append(a),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=10&api_key=6e616452b7c762a15256272ddb774c56&user="+b+"&format=json",function(t){var a="";$.each(t.topalbums.album,function(t,e){a+="<li><b>"+e.name+"</b> - Play count : "+e.playcount+"</li>"}),document.getElementById("toptenAlbumsLabel").innerHTML="Your Top 10 Most Played Albums: -",$("#toptenalbums").append(a)})})}),document.getElementById("recentTracks").innerHTML="Your last played song is : "+e+" by : "+o+" from the Album : "+n,document.getElementById("lastplayed").src=a}),document.getElementById("welcome").innerHTML="Hi "+e,document.getElementById("totalScrobbles").innerHTML="You have heard a total of "+a+" songs since joining Last.fm on "+l+" It means "+m+" days have elapsed since then! Oh, it also means that you have listened to "+d+" songs per day! Keep it up.",document.getElementById("image").src=s})}function drawChart(){var t=document.getElementById("userName").value;$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Song Title"),e.addColumn("number","Play Count");for(var a=0;a<t.toptracks.track.length;a++){e.addRow([t.toptracks.track[a].name,parseInt(t.toptracks.track[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedtracks")).draw(e,{title:"Most Played Tracks. (Hover mouse to see the title.)",hAxis:{textPosition:"none"},chartArea:{width:"93%",height:"78%"},legend:{position:"bottom"}})}document.getElementById("top20tracksLabel").innerHTML="And here are your Top 20 Most Played Songs: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Artist"),e.addColumn("number","Play Count");for(var a=0;a<t.topartists.artist.length;a++){e.addRow([t.topartists.artist[a].name,parseInt(t.topartists.artist[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedartists")).draw(e,{title:"Most Heard Artists. (Hover mouse to see the title.)",legend:"bottom",chartArea:{width:"93%",height:"78%"},hAxis:{textPosition:"none"}})}document.getElementById("top20artistsLabel").innerHTML="And here are your Top 20 Most Heard Artists: -"}),$.getJSON("https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&limit=20&api_key=6e616452b7c762a15256272ddb774c56&user="+t+"&format=json",function(t){var e=new google.visualization.DataTable;e.addColumn("string","Album"),e.addColumn("number","Play Count");for(var a=0;a<t.topalbums.album.length;a++){e.addRow([t.topalbums.album[a].name,parseInt(t.topalbums.album[a].playcount)]);new google.visualization.ColumnChart(document.getElementById("mostplayedalbums")).draw(e,{title:"Most Heard Albums. (Hover mouse to see the title.)",legend:"bottom",chartArea:{width:"93%",height:"78%"},hAxis:{textPosition:"none"}})}document.getElementById("top20albumsLabel").innerHTML="And here are your Top 20 Most Heard Albums: -"})}google.charts.load("current",{packages:["corechart"]});