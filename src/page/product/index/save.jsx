import React from 'react';
import PageTitle from 'component/page-title/index.jsx';
import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CategorySelector from './category-selector.jsx';
import FileUploader from 'util/file-uploader/index.jsx';
import RichEditor from 'util/rich-editor/index.jsx';
import './save.scss';
const _mm=new Mutil();
const _product=new Product();

class ProductSave extends React.Component {
    constructor(props){
        super(props);
        this.state={
            id:this.props.match.params.pid,
            name:'',
            subTitle:'',
            categoryId:0,
            parentCategoryId:0,
            subImages:[],
            price:'',
            stock:'',
            detail:'',
            status:1//商品状态默认为在售
        }
    }
    componentDidMount(){
        this.loadProduct();
    }
    //加载商品详情
    loadProduct(){
        //有id的时候，表明是编辑功能，需要表单回填
        if(this.state.id){
            _product.getProduct(this.state.id).then(res=>{
                let images=res.subImages.split(',');
                res.subImages=images.map(imgUri=>{
                    return {
                        uri:imgUri,
                        url:res.imageHost+imgUri
                    }
                })
                res.defalutDetail=res.detail;
                this.setState(res);
            },err=>{
                _mm.errorTips(err);
            })
        }
    }
    //普通输入框变化
    onValueChange(e){
        let name=e.target.name,
            value=e.target.value.trim();
        this.setState({
            [name]:value
        });
    }
    //品类选择器变化
    onCategoryChange(categoryId,parentCategoryId){
        this.setState({
            categoryId:categoryId,
            parentCategoryId:parentCategoryId
        })
    }
    //上传图片成功
    onUploadSuccess(res){
        let subImages=this.state.subImages;
        subImages.push(res);
        this.setState({
            subImages:subImages
        })
    }
    //上传图片失败
    onUploadError(err){
        _mm.errorTips(err);
    }
    //删除图片
    onImageDelete(e){
        let index=parseInt(e.target.getAttribute('index')),
            subImages=this.state.subImages;
            subImages.splice(index,1);
            this.setState({
                subImages:subImages
            })
    }
    //富文本编辑器
    onRichEditorChange(value){
        console.log(value);
        this.setState({
            detail:value
        });
    }
    getSubImagesString(){
        return this.state.subImages.map(image=>image.uri).join(',');
    }
    //提交表单
    onSubmit(e){
        let product={
            name:this.state.name,
            subTitle:this.state.subTitle,
            categoryId:parseInt(this.state.categoryId),
            subImages:this.getSubImagesString(),
            price:parseFloat(this.state.price),
            stock:parseInt(this.state.stock),
            detail:this.state.detail,
            status:this.state.status
        },
        productCheckResult=_product.checkProduct(product);
        console.log(product);
        if(this.state.id){
            product.id=this.state.id;
        }
        //表单验证成功
        if(productCheckResult.status){
            _product.saveProduct(product).then(res=>{
                _mm.successTips(err);
                this.props.history.push('/product/index');
            },err=>{
                _mm.errorTips(err);
            })
        }
        //表单验证失败
        else{
            _mm.errorTips(productCheckResult.msg); 
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title={this.state.id?"编辑商品":"添加商品"}/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-4">
                            <input type="text" className="form-control" 
                                placeholder="请输入商品名称"
                                name="name"
                                value={this.state.name}
                                onChange={e=>{this.onValueChange(e)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-4">
                            <input type="text" className="form-control" 
                            placeholder="请输入商品描述"
                            name="subTitle"
                            value={this.state.subTitle}
                            onChange={e=>{this.onValueChange(e)}}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            onCategoryChange={
                            (categoryId,parentCategoryId)=>{
                                this.onCategoryChange(categoryId,parentCategoryId);
                            }}/>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                placeholder="价格"
                                name="price"
                                value={this.state.price}
                                onChange={e=>{this.onValueChange(e)}}/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <input type="number" className="form-control" 
                                placeholder="库存"
                                name="stock"
                                value={this.state.stock}
                                onChange={e=>{this.onValueChange(e)}}/>                        
                                <span className="input-group-addon">件</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品图片</label>
                        <div className="col-md-10">
                            {
                                this.state.subImages.length
                                    ?this.state.subImages.map(
                                        (image,index)=>(
                                        <div className="img-content" key={index}>
                                            <img className="img" src={image.url}/>
                                            <i className="fa fa-close"
                                                index={index}
                                                onClick={e=>{this.onImageDelete(e)}}
                                                ></i>
                                        </div>
                                    )
                                    ):(<div>请选择图片</div>)
                            }
                        </div>
                        <div className="col-md-offset-2 col-md-10 file-upload-con">
                            <FileUploader
                                onSuccess={res=>{this.onUploadSuccess(res)}}
                                onError={err=>{this.onUploadError(err)}}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10">
                            <RichEditor
                                detail={this.state.detail} 
                                defalutDetail={this.state.defalutDetail} 
                                onValueChange={(value)=>{this.onRichEditorChange(value)}} />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-10">
                            <button type="submit" className="btn btn-primary"
                            onClick={e=>this.onSubmit(e)}>提交</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductSave;