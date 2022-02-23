mrjson_internal = {
  pending: 0,
  req: [],
  url: [],
  parser: null
};


mrjson = [];

function mrjson_handle() {
  for (var i = 0; i < mrjson_internal.req.length; i++) {

    if ( !mrjson_internal.url[i].src.localeCompare(this.responseURL) ) { 

      mrjson_internal.url[i].innerHTML = this.responseText;
      mrjson[mrjson_internal.url[i].dataset.index] = JSON.parse(this.responseText);

      mrjson_internal.pending--;
      
      mrjson_internal.url[i].class = mrjson_internal.url[i].class + " mrjson-loaded";

      if ( !mrjson_internal.pending ) {
        mrjson_internal.parser(mrjson_internal.result);
        return;
      }
      break;
    }
  }
}

function mrjson_send(parser = function(data){console.log(data);}) {
  mrjson_internal.url = document.getElementsByClassName('mrjson');

  mrjson_internal.parser = parser;

  console.log("urls found: " + mrjson_internal.url.length);

  for (var i = 0; i < mrjson_internal.url.length; i++) {
    if ( mrjson_internal.url[i].src == "" ) {
      mrjson[mrjson_internal.url[i].dataset.index] = JSON.parse(mrjson_internal.url[i].innerHTML);

      console.log("Data present: " + i);
    } else {
      mrjson_internal.req[i] = new XMLHttpRequest();
      mrjson_internal.req[i].onload = mrjson_handle; 
      mrjson_internal.req[i].open("GET", mrjson_internal.url[i].src, true);
      mrjson_internal.req[i].send();
      mrjson_internal.pending++;
      
      console.log("requesting: " + i);
    }
  }
}