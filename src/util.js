


export function getRedirectPath({type,avatar}) {
    // 根据用户信息 返回跳转地址
    // user.type  /boss  /genius
    // user.avater /bossinfo /geniusinfo
    let url = type === "boos"?"/boos":'/genius';
    if(!avatar){
        url+= 'info';
    }

    return url;
}