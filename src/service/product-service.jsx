import Mutil from 'util/mm.jsx';

const _mm=new Mutil();
class Product{
    //获取用户列表
    getProductList(listParam){
        let url='',data={};
        if(listParam.listType==='list'){
            url='/manage/product/list.do';
            data.pageNum=listParam.pageNum;
        }else if(listParam.listType==='search'){
            url='/manage/product/search.do';
            data.pageNum=listParam.pageNum;
            data[listParam.searchType]=listParam.keyword;
        }
        return _mm.request({
            type:'post',
            url:url,
            data:data
        })
    }
    //变更商品销售状态
    setProductStatus(productInfo){
        return _mm.request({
            type:'post',
            url:'/manage/product/set_sale_status.do',
            data:productInfo
        })
    }
    //保存时检查数据
    checkProduct(product){
        let result={
            status:true,
            msg:'验证通过'
        };
        //商品名称验证
        if(typeof product.name!='string'||product.name.length===0){
            return {
                status:false,
                msg:'商品名称不能为空'
            }
        }
        //商品描述验证
        if(typeof product.subTitle!='string'||product.subTitle.length===0){
            return {
                status:false,
                msg:'商品描述不能为空'
            }
        }
        //商品价格必须为大于0的数字
        if(typeof product.price!='number'||!(product.price>0)){
            return {
                status:false,
                msg:'请输入正确的商品价格'
            }
        }
        //商品库存必须为大于等于0的数字
        if(typeof product.stock!='number'||!(product.stock>=0)){
            return {
                status:false,
                msg:'请输入正确的库存数量'
            }
        }
        //品类ID
        if(typeof product.categoryId!='number'||!(product.categoryId>0)){
            return {
                status:false,
                msg:'请选择商品品类'
            }
        }
        return result;
    }
    //保存商品数据
    saveProduct(product){
        return _mm.request({
            type:'post',
            url:'/manage/product/save.do',
            data:product
        })
    }
    //品类相关
    getCategoryList(parentCategoryId){
        return _mm.request({
            type:'post',
            url:'/manage/category/get_category.do',
            data:{
                categoryId:parentCategoryId||0
            }
        })
    }
}
export default Product;