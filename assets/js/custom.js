$(document).ready(function(){
    //Function
    tooltipshow();

    //Menu Js
    $('.menu_trigger').click(function(){
        $('body').toggleClass('sidebar_reduced');
        $('html').toggleClass('cm_overflow');

        tooltipshow();
    }); 

    $('.close_trigger, .cm-overlay').click(function(){
        $('body').removeClass('sidebar_reduced');
        $('html').removeClass('cm_overflow');
    }); 

    //DropDown js
    $('.dropdown-menu li a').click(function(){
        var drop_item = $(this).text()
        $(this).parents('.dropdown').find('.btn').text(drop_item);
    }); 
    
    //Tab js
    $('.cm_tab li a').click(function(){
        var tab_item = $(this).attr('data-tab')
        $('.' + tab_item).addClass('active').siblings('.cm_tab_contain').removeClass('active');
    });

    //Accordion Menu js
    $('.accordion_menu_wrap > a').click(function(){
        $(this).parents('.accordion_menu_wrap').find('.accordion_menu_info').slideToggle();
    });

    //Modal_menu js
    $('.top_menu ul li a').click(function(){
        $(this).addClass('active').parents('li').siblings().find('a').removeClass('active')
        var data_menu = $(this).attr('data-menu')
        $('.' + data_menu).slideToggle().siblings().hide();
        $('.third_menu div').hide();
        $('.sec_menu ul li a').removeClass('active');
    });

    $('.sec_menu ul li a').click(function(){
        $(this).addClass('active').parents('li').siblings().find('a').removeClass('active')
        var data_menu = $(this).attr('data-menu')
        $('.' + data_menu).slideToggle().siblings().hide();
        $('.third_menu ul li a').removeClass('active');
    });

    $('.third_menu ul li a').click(function(){
        $(this).addClass('active').parents('li').siblings().find('a').removeClass('active')
    });

    //Product path(Link) js
    var myModalEl = document.getElementById('product_list')
    myModalEl.addEventListener('hidden.bs.modal', function (event) {
        var first_menu = $('.top_menu ul li a.active').text();
        var sec_menu = $('.sec_menu ul li a.active').text();
        var third_menu = $('.third_menu ul li a.active').text();
        
        $('.catagory_parth').html('')

        if((first_menu.length > 0) && (sec_menu.length > 0) && (third_menu.length > 0)){
            var link = `<a href="#0">${first_menu}</a> <span>></span> <a href="#0">${sec_menu}</a> <span>></span> <a href="#0">${third_menu}</a>`;
        }
        else if((first_menu.length > 0) && (sec_menu.length > 0)){
            var link = `<a href="#0">${first_menu}</a> <span>></span> <a href="#0">${sec_menu}</a>`;
        }
        else{
            var link = `<a href="#0">${first_menu}</a>`;
        }

        $('.catagory_parth').html(link)

        var first_menu = '';
        var sec_menu = '';
        var third_menu = '';
    })

    //image upload js
    $('.upload_file input[type=file]').on('input change propertychange', function() {
        var file = $(this).get(0).files[0];
        
        if(file){
            var reader = new FileReader();
            var upload_main = $(this).parents('.upload_file');
            
            reader.onload = function(){
                upload_main.find('.previewImgs img').attr("src", reader.result);
            }
            reader.readAsDataURL(file);
        }

        var ext = $(this).val().split('.').pop().toLowerCase();

        if($.inArray(ext, ['gif','png','jpg','jpeg']) == -1) {
            $(this).parents('.upload_file').find('.previewImg').hide();
            $(this).parents('.upload_file').find('.plus_img').hide();
            $(this).parents('.upload_file').find('p.extraction').show();
        }
        else{
            $(this).parents('.upload_file').find('.previewImg').show();
            $(this).parents('.upload_file').find('.plus_img').hide();
            $(this).parents('.upload_file').find('p.extraction').hide();
        }
    });

    // video js
    $(".play").click(function(){
        $('.video_bm').find('video').get(0).play();
        $(this).hide();
    });

    var vids = $("video"); 
    $.each(vids, function(){
        this.controls = false; 
    }); 

    $("video").click(function() {
      //console.log(this); 
      if (this.paused) {
        this.play();
        $(this).parents('.video_bm').find('.play').hide();
      } else {
        this.pause();
        $(this).parents('.video_bm').find('.play').show();
      }
    }); 
});


 //Tooltips
 function tooltipshow(){
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))

    if( $('body').hasClass('sidebar_reduced') ){
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl)
          })
    }
    else{
        $('[data-bs-toggle="tooltip"]').tooltip('dispose') 
    }
}


// Image Upload
$(document).ready(function() {
	
    var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });
});



// doughnut  chart
anychart.onDocumentReady(function () {
  
    // add data
    var data = anychart.data.set([
      [ 34],
      [ 21],
      [ 15],
      [11],
      
    ]);
    
    // create a pie chart with the data
    var chart = anychart.pie(data);
    
    // set the chart radius making a donut chart
    chart.innerRadius('55%')
  
    // create a color palette
    var palette = anychart.palettes.distinctColors();
   
    // set the colors according to the brands
    palette.items([
      { color: '#1dd05d' },
      { color: '#000000' },
      { color: '#00a3da' },
      { color: '#156ef2' },
     
    ]);
  
    // apply the donut chart color palette
    chart.palette(palette);
    
    // set the position of labels
    chart.labels().format('{%x} — {%y}%').fontSize(16);
    
    // disable the legend
    chart.legend(false);
    
    // format the donut chart tooltip
    chart.tooltip().format('Market share: {%PercentValue}%');
  
    // create a standalone label
    var label = anychart.standalones.label();
  
    // configure the label settings

    // set the label as the center content
    chart.center().content(label);
    
    // set container id for the chart
    chart.container('container');
    
    // initiate chart drawing
    chart.draw();
  
  });
 
