import React from 'react';
import PageTitle from '../../../component/page-title/index.jsx';
import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';
import CategorySelector from './category-selector.jsx';
import './save.scss';
const _mm=new Mutil();
const _product=new Product();

class ProductDetail extends React.Component {
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
                this.setState(res);
            },err=>{
                _mm.errorTips(err);
            })
        }
    }
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="添加商品"/>
                <div className="form-horizontal">
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品名称</label>
                        <div className="col-md-4">
                            <p className="form-control-static">{this.state.name}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品描述</label>
                        <div className="col-md-4">
                            <p className="form-control-static">{this.state.subTitle}</p>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">所属分类</label>
                        <CategorySelector 
                            readOnly
                            categoryId={this.state.categoryId}
                            parentCategoryId={this.state.parentCategoryId}
                            />
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品价格</label>
                        <div className="col-md-3">
                            <div className="input-group">
                                <p className="form-control-static">{this.state.price}</p>
                                <input type="number" className="form-control"
                                    value={this.state.price} readOnly/>
                                <span className="input-group-addon">元</span>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品库存</label>
                        <div className="col-md-3">
                            <div className="input-group">
                            <input type="number" className="form-control"
                                    value={this.state.stock} readOnly/>                        
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
                                                ></i>
                                        </div>
                                    )
                                    ):(<div>暂无图片</div>)
                            }
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-md-2 control-label">商品详情</label>
                        <div className="col-md-10" dangerouslySetInnerHTML={{__html:this.state.detail}}></div>
                    </div>
                </div>
            </div>
        );
    }
}
export default ProductDetail;