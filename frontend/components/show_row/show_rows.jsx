import React from "react";
import ShowThumbnail from "../show_thumbnail/show_thumbnail_container";
import RowSlider from "./row_slider";
import * as ThumbnailUtil from "../../util/thumbnail_util";
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
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
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

  handleResize() {
    if (this._isMounted && this.state.rowWidth !== window.innerWidth) {
      this.setState({ rowWidth: window.innerWidth });
    }
  }

  handleLeftClick() {
    const { currentPage } = this.state;

    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  }

  handleRightClick() {
    const { currentPage } = this.state;
    const { shows } = this.props;

    if (
      currentPage <= ThumbnailUtil.getPageCount(shows.length, window.innerWidth)
    ) {
      this.setState({ currentPage: currentPage + 1 });
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

    shows.forEach((show, idx) => {
      showList.push(this.createShowRowItem(show, rowNum, videos, genres, idx));
    });

    if (galleryType !== "WITH_BANNER") {
      return (
        <li id={`row-${rowNum}`} className="show-rows-wrapper">
          {rowHeader}

          <ul className="show-row" ref={this.rowRef}>
            {showList}
          </ul>

          {/* <ShowDetail  /> */}
        </li>
      );
    } else {
      return (
        <li id={`row-${rowNum}`} className="show-rows-wrapper">
          {rowHeader}

          <div className="row-slider-wrapper">
            <RowSlider
              currentPage={currentPage}
              pageCount={ThumbnailUtil.getPageCount(
                shows.length,
                window.innerWidth
              )}
              leftClick={this.handleLeftClick}
              rightClick={this.handleRightClick}
            />

            <div className={`row-slider page-${currentPage}`}>
              <ul className="show-row" ref={this.rowRef}>
                {showList}
              </ul>
            </div>
          </div>

          {/* <ShowDetail  /> */}
        </li>
      );
    }
  }
}

export default ShowRow;
