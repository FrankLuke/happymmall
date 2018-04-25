import React from 'react';

import PageTitle from '../../component/page-title/index.jsx';
class Home extends React.Component {
    render() {
        return (
            <div id="page-wrapper">
                <PageTitle title="首页123">
                    <button className="btn btn-warning">WARN</button>
                    <h2>AAA</h2>
                </PageTitle>
                <div className="row">
                    <div className="col-md-12">
                        
                    </div>
                </div>
            </div>
        );
    }
}
export default Home;