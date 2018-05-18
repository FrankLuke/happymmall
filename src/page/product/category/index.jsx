import React from 'react';
import {Link} from 'react-router-dom';
import TableList from 'util/table-list/index.jsx';
import PageTitle from 'component/page-title/index.jsx';
import Mutil from 'util/mm.jsx';
import Product from 'service/product-service.jsx';

const _mm=new Mutil();
const _product=new Product();
class CategoryList extends React.Component {
    constructor(props){
        super(props);
        this.state={
            list:[],
            parentCategoryId:this.props.match.params.categoryId
        }
    }
    componentDidMount(){
        this.loadCategoryList();
    }
    componentDidUpdate(prevProps,prevState){
        let oldPath=prevProps.location.pathname,
            newPath=this.props.location.pathname,
            newId=this.props.match.params.categoryId||0;
        if(oldPath!==newPath){
            this.setState({
                parentCategoryId:newId
            },()=>{
                this.loadCategoryList();
            })
        }

    }
    loadCategoryList(){
        _product.getCategoryList(this.state.pageNum).then(res=>{
            this.setState({
                list:res
            });
        },errMsg=>{
            this.setState({
                list:[]
            });
            _mm.errorTips(errMsg);
        });
    }
    //更新品类名字
    onUpdataName(categoryId,categoryName){
        let newName=window.prompt('请输入新的品类名称',categoryName);
        if(newName){
            _product.updateCategoryName({
                categoryId:categoryId,
                categoryName:newName
            }).then(res=>{
                _mm.successTips(res);
                this.loadCategoryList();
            },err=>{
                _mm.errorTips(err);
            })
        }
    }
    render() {
        let listBody=this.state.list.map((category,index)=>{
            return (
                <tr key={index}>
                    <td>{category.id}</td>
                    <td>{category.name}</td>
                    <td>
                        <a className="opera"
                            onClick={e=>{this.onUpdataName(categoryId,categoryName)}}>修改名称</a>
                        {
                            category.parentId===0?
                                <Link to={`/product-category/index${category.id}`}>查看子品类</Link>
                                :null
                            }
                    </td>
                </tr>
            );
        });
        return (
            <div id="page-wrapper">
                <PageTitle title="品类列表">
                    <div className="page-header-right">
                        <Link className="btn btn-primary" to="/product-category/add">
                            <i className="fa fa-plus"></i>
                            <span>添加品类</span>
                        </Link>
                    </div>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        <p>父品类ID：{this.state.parentCategoryId}</p>
                    </div>
                </div>
                <TableList tableHeads={['品类ID','品类名称','操作']}>
                    {listBody}
                </TableList>
               </div>
        );
    }
}
export default CategoryList;