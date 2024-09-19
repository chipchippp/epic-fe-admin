import BarChart from './barChart';

function Chart() {
    return (
      <div className="content-wrapper">
        <div className="row mb-4">
          <div className="col-12">
            <div className="d-flex justify-content-between align-items-center">
              <h3 className="font-weight-bold">Chart Aamir</h3>
              <h6 className="font-weight-normal mb-0">
                All systems are running smoothly! You have
                <span className="text-primary"> 3 unread alerts!</span>
              </h6>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">
            <BarChart />
          </div>
        </div>
        </div>
    );

}

export default Chart;
