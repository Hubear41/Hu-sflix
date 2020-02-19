import React from "react";
import ShowThumbnail from "../show_thumbnail/show_thumbnail_container";
import RowSlider from "./row_slider";
import * as ThumbnailUtil from "../../util/thumbnail_util";

class ShowRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      screenSize: window.innerWidth,
      tileOffset: 0
    };

    this.rowRef = React.createRef();
    this.handleResize = this.handleResize.bind(this);
    this.handleLeftClick = this.handleLeftClick.bind(this);
    this.handleRightClick = this.handleRightClick.bind(this);
    this.handleTransitionEnd = this.handleTransitionEnd.bind(this);
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

    const { tileOffset } = this.state;
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
        offset={tileOffset}
      />
    );
  }

  handleResize() {
    if (this._isMounted && this.state.screenSize !== window.innerWidth) {
      this.setState({ screenSize: window.innerWidth });
    }
  }

  handleLeftClick() {
    const { currentPage } = this.state;

    // prevent the thumbnails from expanding during transition
    this.rowRef.current.style.pointerEvents = "none";

    if (currentPage > 1) {
      if (currentPage === 2) {
        this.setState({ currentPage: 1, tileOffset: 0 });
      } else {
        this.setState({ currentPage: currentPage - 1 });
      }
    }
  }

  handleRightClick() {
    const { currentPage } = this.state;
    const { shows } = this.props;

    // prevent the thumbnails from expanding during transition
    this.rowRef.current.style.pointerEvents = "none";

    const pageCount = ThumbnailUtil.getPageCount(
      shows.length,
      window.innerWidth
    );

    if (currentPage <= pageCount) {
      if (currentPage !== pageCount - 1) {
        this.setState({ currentPage: currentPage + 1 });
      } else {
        const remainingTiles =
          shows.length -
          currentPage * ThumbnailUtil.getThumbnailCount(window.innerWidth);

        this.setState({
          currentPage: currentPage + 1,
          tileOffset: remainingTiles
        });
      }
    }
  }

  handleTransitionEnd(e) {
    this.rowRef.current.style.removeProperty("pointer-events");
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
    const { currentPage, tileOffset } = this.state;

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
              rowRef={this.rowRef}
              leftClick={this.handleLeftClick}
              rightClick={this.handleRightClick}
            />

            <div
              className={`row-slider page-${currentPage} offset-${tileOffset}`}
              onTransitionEnd={this.handleTransitionEnd}
            >
              <ul className="show-row" ref={this.rowRef}>
                {showList}
              </ul>
            </div>
          </div>
        </li>
      );
    }
  }
}

export default ShowRow;
