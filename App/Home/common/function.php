<?php


//检测验证码
//$code指的就是验证码，id指的是第几个
function check_verify($code,$id=1){
    
    //因为是函数，所以直接把命名空间写在里边
    $Verify = new Think\Verify;
    
    //不重置。因为前后端需要验证两次
    $Verify->reset = FALSE;
    
    return $Verify->check($code,$id);
}