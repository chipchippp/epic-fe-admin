function FooterAdmin() {
    return (
        <>
        {/*Start Back To Top Button*/}
        <a href="javaScript:void();" className="back-to-top">
          <i className="fa fa-angle-double-up" />{" "}
        </a>
       
        <div className="right-sidebar">
          <div className="switcher-icon">
            <i className="zmdi zmdi-settings zmdi-hc-spin" />
          </div>
          <div className="right-sidebar-content">
            <p className="mb-0">Gaussion Texture</p>
            <hr />
            <ul className="switcher">
              <li id="theme1" />
              <li id="theme2" />
              <li id="theme3" />
              <li id="theme4" />
              <li id="theme5" />
              <li id="theme6" />
            </ul>
            <p className="mb-0">Gradient Background</p>
            <hr />
            <ul className="switcher">
              <li id="theme7" />
              <li id="theme8" />
              <li id="theme9" />
              <li id="theme10" />
              <li id="theme11" />
              <li id="theme12" />
              <li id="theme13" />
              <li id="theme14" />
              <li id="theme15" />
            </ul>
          </div>
        </div>
      </>      
    );
}

export default FooterAdmin;
