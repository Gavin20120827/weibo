<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>微博系统--登录</title>
<script type="text/javascript" src="__JS__/jquery.js"></script>
<script type="text/javascript" src="__JS__/jquery.ui.js"></script>
<script type="text/javascript" src="__JS__/jquery.validate.js"></script>
<script type="text/javascript" src="__JS__/jquery.form.js"></script>
<script type="text/javascript" src="__JS__/login.js"></script>
<link rel="stylesheet" href="__CSS__/jquery.ui.css">
<link rel="stylesheet" href="__CSS__/login.css">
<script type="text/javascript">
var ThinkPHP = {
	'MODULE' : '__MODULE__',
	'IMG' : '__PUBLIC__/{:MODULE_NAME}/img',
};
</script>
</head>
<body>


<div id="header"></div>

<div id="main">
	<form id="login">
		<div class="top">
			<input type="text" name="user" placeholder="用户名">
			<input type="password" name="password" placeholder="密码">
			<input type="submit" name="submit" value="登录">
		</div>
		<div class="bottom">
			<a href="javascript:void(0)" id="reg_link">注册新用户</a>
			<a href="javascript:void(0)">忘记密码？</a>
		</div>
	</form>
</div>

<div id="footer"></div>
<p class="footer_text">&copy;2009-2014 瓢城 Web 俱乐部. Powered by ThinkPHP.</p>

<form id="register">
	<ol class="reg_errors"></ol>
	<p>
		<label for="username">帐号：</label>
		<input type="text" name="username" class="text" id="username" placeholder="昵称，不小于两位！">
		<span class="star">*</span>
	</p>
	<p>
		<label for="pass">密码：</label>
		<input type="password" name="password" class="text" id="password" placeholder="密码，不小于6位！" />
		<span class="star">*</span>
	</p>
		<p>
		<label for="repassword">确认：</label>
		<input type="password" name="repassword" class="text" id="repassword" placeholder="密码，不小于6位！" />
		<span class="star">*</span>
	</p>
	<p>
		<label for="email">邮箱：</label>
		<input type="text" name="email" class="text" id="email" placeholder="电子邮件，用于找回密码！" />
		<span class="star">*</span>
	</p>
</form>

<div id="loading">数据交互中......</div>



<form id="verify_register">
	<ol class="ver_error"></ol>
	<p>
		<label for="verify">验证码：</label>
		<input type="text" name="verify" class="text" id="verify" />
		<span class="star">*</span>
		<a href="javascript:void(0)" class="changeimg">换一换</a>
	</p>
	<p><img src="{:U('verify')}" class="verifyimg changeimg"></p>
</form>

</body>
</html>