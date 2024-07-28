
export default function ImageSlider() {
  return (
    <div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img src="/banner1.jpg" className="d-block w-100" alt="banner"  style={{height:'600px'}} />
          </div>
          <div className="carousel-item">
            <img src="/banner2.jpg" className="d-block w-100" alt="banner" style={{height:'600px'}} />
          </div>
          <div className="carousel-item">
            <img src="/banner3.jpg" className="d-block w-100" alt="banner"  style={{height:'600px'}}/>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}
