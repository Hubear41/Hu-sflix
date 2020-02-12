import React from "react";
import ShowThumbnail from "../show_thumbnail/show_thumbnail_container";
import PageIndicators from "./page_indicators";
import ShowDetail from "../shows_gallery/show_detail_container";

class ShowRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      rowWidth: window.innerWidth
    };

    this.rowRef = React.createRef();
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    this._isMounted = false;
    window.removeEventListener("resize", this.handleResize);
  }

  createShowRowItem(show, rowNum, videos, genres, idx) {
    if (!show) {
      return null;
    }

    const genreList = [];
    const previewVideo = videos[show.preview_id];

    show.genre_ids.forEach(id => {
      genreList.push(genres[id]);
    });

    return (
      <ShowThumbnail
        key={`${show.id}${rowNum}`}
        thumbnailNum={idx}
        show={show}
        preview={previewVideo}
        genres={genreList}
        rowRef={this.rowRef}
      />
    );
  }

  _calcRowThumbnailCount() {
    if (window.innerWidth < 500) {
      return 2;
    } else if (window.innerWidth < 800) {
      return 3;
    } else if (window.innerWidth < 1100) {
      return 4;
    } else if (window.innerHeight < 1400) {
      return 5;
    } else {
      return 6;
    }
  }

  handleResize() {
    if (this._isMounted && this.state.rowWidth !== window.innerWidth) {
      this.setState({ rowWidth: window.innerWidth });
    }
  }

  render() {
    const {
      shows,
      rowNum,
      genreName,
      galleryType,
      genres,
      videos
    } = this.props;
    const { currentPage } = this.state;

    const showList = [];
    const rowHeader =
      galleryType === "WITH_BANNER" ? <h2>{genreName}</h2> : null;

    const pageCount = Math.ceil(shows.length / this._calcRowThumbnailCount());

    shows.forEach((show, idx) => {
      showList.push(this.createShowRowItem(show, rowNum, videos, genres, idx));
    });

    return (
      <li id={`row-${rowNum}`} className="show-rows-wrapper">
        {rowHeader}

        <PageIndicators currentPage={currentPage} pageCount={pageCount} />

        <ul className="show-row" ref={this.rowRef}>
          {showList}
        </ul>
        {/* <div
          className="next-page-button"
          onClick={this.moveToSliderPage(currentPage + 1)}
        ></div> */}
        {/* <ShowDetail  /> */}
      </li>
    );
  }
}

export default ShowRow;
