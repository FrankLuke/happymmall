import React from 'react';
import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm=new Mutil();
const _product=new Product();
import './category-selector.scss';

class CategorySelector extends React.Component {
    constructor(props){
        super(props);
        this.state={
            firstCategoryList:[],
            firstCategoryId:0,
            secondCategoryList:[],
            secondCategoryId:0
        }
    }
    componentDidMount(){
        this.loadFirstCategory();
    }
    componentWillReceiveProps(nextProps){
        let categoryIdChange=this.props.categoryId!==nextProps.categoryId,
            parentCategoryIdChange=this.props.parentCategoryId!==nextProps.parentCategoryId;
        //数据没有发生变化的时候，不做处理
        if(!categoryIdChange&&!parentCategoryIdChange){
            return;
        }
        //假如只有一级品类
        if(nextProps.parentCategoryId===0){
            this.setState({
                firstCategoryId:nextProps.categoryId,
                secondCategoryId:0
            })
        }
        //有两级品类
        else{
            this.setState({
                firstCategoryId:nextProps.parentCategoryId,
                secondCategoryId:nextProps.categoryId
            },()=>{
                parentCategoryIdChange&&this.loadSecondCategory();
            })
        }
    }
    //加载一级分类
    loadFirstCategory(){
        _product.getCategoryList().then(res=>{
            this.setState({
                firstCategoryList:res
            });
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }
    //加载二级品类
    loadSecondCategory(){
        _product.getCategoryList(this.state.firstCategoryId).then(res=>{
            this.setState({
                secondCategoryList:res
            });
        },errMsg=>{
            _mm.errorTips(errMsg);
        })
    }
    //选择一级品类
    onFirstCategoryChange(){
        if(this.props.readOnly){
            return;
        }
        let newValue=e.target.value||0;
        this.setState({
            firstCategoryId:newValue,
            secondCategoryId:0,
            secondCategoryList:[]
        },()=>{
            //更新二级品类
            this.loadSecondCategory();
            this.onPropsCategoryChange();
        })
    }
    //选择二级品类
    onSecondCategoryChange(){
        if(this.props.readOnly){
            return;
        }
        let newValue=e.target.value||0;
        this.setState({
            secondCategoryId:newValue
        },()=>{
            this.onPropsCategoryChange();
        })
    }
    //传给父组件选中的结果
    onPropsCategoryChange(){
        //判断props里的回调函数是否存在
        let categoryChangable=typeof this.props.onCategoryChange==='function';
        //如果有二级品类
        if(this.state.secondCategoryId){
            categoryChangable&&this.props.onCategoryChange(this.state.secondCategoryId,this.state.firstCategoryId);
        }
        //如果只有一级品类
        else{
            categoryChangable&&this.props.onCategoryChange(this.state.firstCategoryId,0);
        }
    }
    render() {
        return (
            <div className="col-md-8">
                <select className="form-control cate-select"
                    value={this.state.firstCategoryId}
                    readOnly={this.state.readOnly}
                    onChange={e=>this.onFirstCategoryChange(e)}>
                    <option value="">请选择一级分类</option>
                    {
                        this.state.firstCategoryList.map(
                            (category,index)=><option key={index} value={category.id}>{category.name}</option>)
                    }
                </select>
                {this.state.secondCategoryList.length>0?
                    (<select className="form-control cate-select"
                        value={this.state.secondCategoryId}
                        readOnly={this.state.readOnly}
                        onChange={e=>this.onSecondCategoryChange(e)}>
                        <option value="">请选择二级分类</option>
                        {
                            this.state.firstCategoryList.map(
                                (category,index)=><option key={index} value={category.id}>{category.name}</option>)
                        }
                    </select>):null
                }
            </div>
        )
    }
}

export default CategorySelector;