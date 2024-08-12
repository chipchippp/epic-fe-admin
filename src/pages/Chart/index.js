function Chart() {
    return (
      <>
    <div className="content-wrapper">
  <div className="row">
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Line chart</h4>
          <canvas id="lineChart" />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Bar chart</h4>
          <canvas id="barChart" />
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Area chart</h4>
          <canvas id="areaChart" />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Doughnut chart</h4>
          <canvas id="doughnutChart" />
        </div>
      </div>
    </div>
  </div>
  <div className="row">
    <div className="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Pie chart</h4>
          <canvas id="pieChart" />
        </div>
      </div>
    </div>
    <div className="col-lg-6 grid-margin grid-margin-lg-0 stretch-card">
      <div className="card">
        <div className="card-body">
          <h4 className="card-title">Scatter chart</h4>
          <canvas id="scatterChart" />
        </div>
      </div>
    </div>
  </div>
</div>

      </>
    );

}

export default Chart;
