<?php
namespace Home\Controller;
use Think\Controller;
use Think\Verify;

class LoginController extends Controller {
	public function index() {
		$this->display();
	}
	
	
	//验证码生成.内置的函数。1表示第一个
	//只需要这一个方法就好了。在浏览器直接访问这个方法，就可以输出验证码。用U方法在tpl中放在《img》标签中就好了
	public function verify() {
	    ob_clean();
	    $verify = new Verify();
	    $verify ->entry(1);
	}
}