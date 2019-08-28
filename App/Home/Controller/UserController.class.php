<?php
namespace Home\Controller;
use Think\Controller;
use Home\Model\UserModel;
use Think\Model;


class UserController extends Controller {
	
	//注册行为返回给Ajax
    public function register(){
        //只能通过ajax提交才有效，如果直接访问控制器，提示非法访问
        if (IS_AJAX){
            sleep(1);
            
            //这里就是普通的实例化model，然后执行里边的方法
//            $User = new UserModel();
            $User = D('user');
           $uid =  $User->register(I('post.username'),I('post.password'),I('post.repassword'),I('post.email'));         
           echo $uid;
        }else {
            $this->error('非法操作—禁止直接访问User');
        }
    }
    
    
    //ajax验证数据，账号返回给ajax
    public function checkUserName(){
        if (IS_AJAX){
            sleep(1);
          $User = D('User');
          $uid  = $User->checkField(I('post.username'),'username');
          echo $uid >0 ? 'true' : 'false';
            
           
        }
    }
    
    
    //ajax验证数据，邮箱返回给ajax
    public function checkEmail(){
        if (IS_AJAX){
            sleep(1);
            $User = D('User');
            $uid =  $User->checkField(I('post.email'),'email');
            echo $uid > 0 ? 'true':'false';
        }
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}