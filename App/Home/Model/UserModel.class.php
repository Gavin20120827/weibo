<?php
namespace Home\Model;
use Think\Model;

class UserModel extends Model {
    
    //批量验证.可以同时验证多个字段，否则第一个未通过，后边的不会验证
//     protected $patchValidate = TRUE;
    
    //用户表自动验证
    protected $_validate = array(
        //所有的都用负数代替，在客户端输出
        //-1，账号长度不合法！
        array('username','2,20','-1',self::EXISTS_VALIDATE,'length'),
        //-2,密码长度不合法！
        array('password','6,30','-2',self::EXISTS_VALIDATE,'length'),
        //-3，密码和密码确认不一致
        array('repassword','password','-3',self::EXISTS_VALIDATE,'confirm'),
        //-4，'邮箱格式不正确！
        array('email','email','-4',self::EXISTS_VALIDATE),
        //-5,账号被占用！
        array('username','','-5',self::EXISTS_VALIDATE,'unique',self::MODEL_INSERT),
        //-6,邮箱被占用！
        array('email','','-6',self::EXISTS_VALIDATE,'unique',self::MODEL_INSERT),
        //-7验证码错误
        array('verify','check_verify','-7',self::EXISTS_VALIDATE,'function'),
    );
    
    
    
    //用户表自动完成
    protected $_auto = array(       
        array('password','sha1',self::MODEL_BOTH,'function'),
        array('create_time','time',self::MODEL_INSERT,'function'),     
    );
    
    
    //验证数据
    public function checkField($field,$type){
        $data = array();
        switch ($type){
            case 'username':
                $data['username'] = $field;
                break;
            case 'email':
                $data['email'] = $field;
                break;
            case 'verify':
                $data['verify'] = $field;
                break;
            default:
                return 0;
        }
        return $this->create($data)?1:$this->getError();
    
    }
    
        
    //注册一条用户
    //其中的repassword，只是为了验证（controller中同样需要获取这个字段）
    //在create中会被自动过滤(因为他只是表单字段，非数据表字段)
    public function register($username,$password,$repassword,$email,$verify){    
        $data = array(          
            'username'=>$username,
            'password'=>$password,
            'repassword'=>$repassword,
            'email'=>$email,
            'verify'=>$verify,
        );
        
         
        //数据创建，执行数据验证和自动完成。如果验证失败或者完成失败，返回的是false。
        //如果成功，生成的是数据对象
        if ($this->create($data)){
            //新增数据库
            $uid = $this->add();
            //新增成功，默认的返回值是id。否则返回0
            return $uid ? $uid :0;
        }else {
            
            //验证不通过的时候，输出验证错误信息
//             print_r($this->getError()) ;
               return $this->getError();
        }
    }
	

	
	
}