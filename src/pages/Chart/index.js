import BarChart from './barChart';
import { ToastContainer } from 'react-toastify';

function Chart() {
    return (
        <div className="content-wrapper">
            <div className="row">
                <div className="col-12">
                    <BarChart />
                </div>
            </div>
            {/* <ToastContainer /> */} 
        </div>
    );
}

export default Chart;
