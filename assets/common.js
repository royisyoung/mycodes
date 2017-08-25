(function(window, document, $){
  $('#xTree').on('click', 'span.shrink-btn', function(ev){
    ev.stopPropagation();
    // console.log('this is shrink-btn', this);
    var p = $(this).parent();
    var li = p.parent();
    var ul = li.children('ul');

    // $(li).addClass('hidden');
    // 存在 return 0 false
    // 不存在 return -1 true
    // console.log($(li).attr('class'));
    if($(li).attr('class') && $(li).attr('class').indexOf('hidden') !== -1){
      //存在
      $(li).removeClass('hidden');
    }else{
      //不存在
      $(li).addClass('hidden');
    }
    // console.log(li.children().find('ul[class="hide"]'));
  })
  $('#xTree').on('click', 'i.edit-btn', function(ev){
    ev.stopPropagation();
    console.log('this is edit-btn', this);
  })
})(window, document, $)