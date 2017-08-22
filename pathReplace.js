(function($) {
  var href = $('head link[href]').eq(0).attr('href');
  var regExp1 = /^[\.\.\/]*[a-zA-Z0-9]{0}/;
  var regExp2 = /^http:\/\/[a-zA-Z0-9_\.]*\//;
  var rPath = '';
  if(regExp1.test(href)){
    rPath = regExp1.exec(href)[0];
  }else if(regExp2.test(href)){
    rPath = regExp2.exec(href)[0];
  }
  Array.prototype.slice.call($('#footer [src]')).forEach(function(item, index, arr) {
    $(item).attr('src', rPath.concat($(item).attr('src')));
  });
  Array.prototype.slice.call($('#footer [href]')).forEach(function(item, index, arr) {
    $(item).attr('href', rPath.concat($(item).attr('href')));
  });
})(jQuery)
