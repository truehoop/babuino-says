 var proxyUrl = "http://html2canvas.appspot.com";
            $(function(){
                var iframe,d;
                $('#b-generate').click(function(){
                    var url = "http://dl.dropbox.com/u/520159/myOwn/example1/assets/www/index.html";
                    $('#content').append($('<img />').attr('src','img/img-thing.jpg').css('margin-top',40));                    
                    var urlParts = document.createElement('a');
                    urlParts.href = url;                    
                    $.ajax({
                        data: {
                            xhr2:false,
                            url:urlParts.href                            
                        },
                        url: proxyUrl,
                        dataType: "jsonp",
                        success: function(html){
                            iframe = document.createElement('iframe');
                            $(iframe).css({
                                'visibility':'hidden'
                            }).width(300).height(300);
                            $('#content').append(iframe);
                            d = iframe.contentWindow.document;
                            d.open();                            
                            $(iframe.contentWindow).load(function(){
                                var date = new Date();
                                var message,
                                timeoutTimer,
                                timer = date.getTime();
                                var body = $(iframe).contents().find('body')[0];
                                var preload = html2canvas.Preload(body, {
                                    "complete": function(images){                
                                        var queue = html2canvas.Parse(body, images);
                                        var canvas = $(html2canvas.Renderer(queue));
                                        var finishTime = new Date();
                                     $("#content").empty().append(canvas);
                                   }
                                });
                                    });									
                                    $('base').attr('href',urlParts.protocol+"//"+urlParts.hostname+"/");
                                    var base = "<base href='"+urlParts.protocol+"//"+urlParts.hostname+"/' />";
                                    var headIdx = html.indexOf('<head');
                                    var endHeadIdx = html.indexOf('>', headIdx);
                                    html = html.substring(0, endHeadIdx + 1) + base + html.substring(endHeadIdx + 1);
                                    d.write(html);
                                    d.close();                         
                                }       
                            });
                        });
                    });
