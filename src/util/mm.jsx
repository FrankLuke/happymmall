class MUtil{
    request(param){
        return new Promise((resolve,reject)=>{
            $.ajax({
                type:param.type||'get',
                url:param.url||'',
                dataType:param.dataType||'json',
                data:param.data||null,
                success(res){
                    console.log(res);
                },
                error(err){
                    console.log(err);    
                }
            })
        })
    }
}
export default MUtil;