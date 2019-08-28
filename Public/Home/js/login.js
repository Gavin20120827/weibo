// 1、required，有d
// 2、messages，有s
// 3、username，需要与字段name对应
// 4、要记得写逗号



$(function () {
	
	//登录页背景随机
	var rand = Math.floor(Math.random() * 5) + 1;
/*
	$('body')
	.css('background','url(' + ThinkPHP['IMG'] + '/login_bg' + rand + '.jpg) no-repeat')
	.css('background-size', '100%');
*/
	
	//登录页的按钮
	$('#login input[type="submit"]').button();
	
	//创建注册对话框
	$('#register').dialog({
		width : 430,
		height : 380,
		title : '注册新用户',
		modal : true,
		resizable : false,
		autoOpen : false,
		closeText : '关闭',
		buttons : [{
			text : '提交',
			click : function (e) {
				$(this).submit();
			}
		}],
	}).validate({

		//等待提交
		submitHandler : function (form) {
			//打开验证码
			$('#verify_register').dialog('open');

			$(form).ajaxSubmit({
				url : ThinkPHP['MODULE'] + '/User/register',
				type : 'POST',

				beforeSubmit:function(){
					$('#loading').dialog('open');
					//widget获得dialog的对象，然后可以使用find。找到第二个button（第一个是关闭，第二个才是提交的按钮）
					$('#register').dialog('widget').find('button').eq(1).button('disable');
				},

				success:function(responseText){
					if (responseText) {
						$('#register').dialog('widget').find('button').eq(1).button('enable');
						$('#loading').css('background', 'url(' + ThinkPHP['IMG']+ '/success.gif) no-repeat 20px center').html('数据新增成功...');
						//设置延迟关闭
						setTimeout(function(){
							$('#loading').dialog('close');
							$('#register').dialog('close');
							//重置表单，不然如果未刷新浏览器的话，重新点击注册的时候，上次的数据还会保留
							$('#register').resetForm();
							//关闭以后，重新换回去
							$('#register span.star').html('*').removeClass('succ');
                            //关闭以后，重新换回去
                            $('#loading').css('background', 'url(' + ThinkPHP['IMG']+ '/loading.gif) no-repeat 20px center').html('数据交互中...');
						},1000);

					}

				},

			});
		},



		//ol是需要在tpl中创建的。表示放到ol中
		//li不需要在tpl中创建。可以在css中设置css的值
		errorLabelContainer:'ol.reg_errors',
		wrapper:'li',

		showErrors:function(errorMap,errorList){
			// console.log(errorList);可以尝试打印，是错误信息
		     
		     //计算错误的数量
		     var errors = this.numberOfInvalids();
		     //自动调整dialog的高度
		     if (errors > 0) {
		     	$('#register').dialog('option','height',errors*20+380);
		     }else {
		     	$('#register').dialog('option','height',380);
		     };

             //默认的错误输出方式
		     this.defaultShowErrors();
		},

		//错的话，红色框
		highlight:function(element,errorClass){
			$(element).css('border','1px solid red');

			//调整错误提示。element指的是input，parent指的是p
			$(element).parent().find('span').html('*').removeClass('succ');
		},


		//正确以后
		unhighlight:function(element,errorClass){
			//正确以后，调整回原来的框
			$(element).css('border','1px solid #ccc');

			//正确以后，*号变为勾——联动css中设置span.succ的class
			//element本身指的是input，先转到父节点p，然后find后代节点的span。
			$(element).parent().find('span').html('&nbsp;').addClass('succ');
		},






		rules:{
			username:{
				required:true,
				rangelength : [2,10],
				remote:{
					url:ThinkPHP['MODULE'] + '/User/checkUserName',
					type:'post',
					beforeSend : function(){
						$('#username').next().html('&nbsp;').removeClass('succ').addClass('loading');
					},
					complete:function(jqXHR,textStatus){
						if(jqXHR.responseText=='true'){
							$('#username').next().html('&nbsp;').removeClass('loading').addClass('succ');
						}else {
							$('#username').next().html('*').removeClass('loading').removeClass('succ');
						}
					},
				},

				
			},
			password:{
				required:true,
				rangelength : [6,20]
			},
			repassword:{
				required:true,
				equalTo:'#password',
			},
			email:{
				required:true,
				email:true,
				remote:{
					url:ThinkPHP['MODULE'] + '/User/checkEmail',
					type:'post',
					beforeSend : function(){
						$('#email').next().html('&nbsp;').removeClass('succ').addClass('loading');
					},
					complete:function(jqXHR,textStatus){
						if(jqXHR.responseText=='true'){
							$('#email').next().html('&nbsp;').removeClass('loading').addClass('succ');
						}else {
							$('#email').next().html('*').removeClass('loading').removeClass('succ');
						}
					},
				}
			},
		},


		messages:{
			username:{
				required:'用户名不得为空！',
				rangelength:jQuery.format('账号长度需要在{0}-{1}之间！'),
				remote:'账号被占用',
			},
			password:{
				required:'密码不得为空',
				rangelength:jQuery.format('密码长度需要在{0}-{1}之间！'),
			},
			repassword:{
				required:'密码确认不得为空',
				equalTo:'密码与密码确认不一致',
			},
			email:{
				required:'邮箱不得为空',
				email:'邮箱格式不正确',
				remote:'邮箱被占用',
			},
		},

	});
	
	//点击注册
	$('#reg_link').click(function () {
		$('#register').dialog('open');
	});



	//数据加载中的的对话框
	$('#loading').dialog({
		autoOpen : false,
        modal : true,
        closeOnEscape : false,
        resizable : false,
        draggable : false,
        width : 180,
        height : 40,
 //隐藏标题栏
	}).parent().find('.ui-widget-header').hide();




	//验证码的对话框
	//在等待提交的地方打开
	$('#verify_register').dialog({
		autoOpen:false,
		width:290,
		height:300,
		modal:true,
		title:'请输入验证码',
		resizale:false,
		closeText:'关闭',
		buttons:[{
			text:'完成',
			//表单中没有submit，用了这个，相当于submit
			click:function(e){
				$(this).submit();
			},
			//调整button位置
			style:'right:85px',
		}],
		close:function(){
			$('#register').dialog('widget').find('button').eq(1).button('enable');
		},
	});


	//随机刷新验证码

$('.changeimg').click(function(){
	var verifyimg = $('.verifyimg').attr('src');
	$('.verifyimg').attr('src',verifyimg+'?random='+Math.random());
});













	
});