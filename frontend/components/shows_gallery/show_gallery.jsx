import React from "react";
import ShowRows from "./show_rows";
import Footer from "../footer/footer";
import BannerVideo from "../banner_video/banner_video_container";

class ShowGallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      previewId: null
    };
  }

  componentDidMount() {
    this._isMounted = true;

    const { genreId, galleryType, query } = this.props;

    if (galleryType === "SEARCH") {
      this.props
        .search(query)
        .then(() => {
          setTimeout(() => {
            this.props.stopLoading();
          }, 500);
        })
        .fail(() => {
          this.props.stopLoading();
        });
    } else {
      this.props
        .requestAllShows(genreId)
        .then(() => {
          setTimeout(() => {
            this.props.stopLoading();
          }, 1000);
        })
        .fail(() => {
          this.props.stopLoading();
        });
    }
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.location.pathname !== this.props.location.pathname ||
      prevProps.query !== this.props.query
    ) {
      const { genreId, galleryType, location } = this.props;

      if (galleryType === "SEARCH") {
        const query = new URLSearchParams(location.search).get("q");

        /// add loading start and stop
        this.props.search(query).then(() => {
          this.props.stopLoading();
        });
      } else {
        /// add loading start and stop
        this.props.requestAllShows(genreId).then(() => {
          this.props.stopLoading();
        });
      }

      if (this._isMounted) this.setState({ previewId: null });
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  static getDerivedStateFromProps(props, state) {
    // we use <= 1 because we could leave show watch and have 1 show in state
    // we still would need to fetch all the shows
    if (
      props.galleryType === "SEARCH" ||
      state.previewId !== null ||
      props.shows.length <= 1
    ) {
      return { previewId: state.previewId };
    }
    let previewId = null;
    let found = false;

    while (!found && props.shows.length !== 0) {
      const randomId = Math.floor(Math.random() * (props.shows.length - 1));
      const currShow = props.shows[randomId];

      if (currShow !== undefined && currShow.director !== "Nelicia Low") {
        if (currShow.title !== "Ling") {
          found = true;
          previewId = randomId;
        }
      }
    }

    return { previewId };
  }

  createRows() {
    const { shows, genres, mylistShowIds } = this.props;
    const showsPerRow = {};
    let mainGenres = [];

    // setup mylist row to be the same size as mylistids
    if (mylistShowIds.length > 0) {
      showsPerRow["My List"] = Array.from(
        { length: mylistShowIds.length },
        () => null
      );
    }

    // find genres that have enough shows to fill a row
    Object.values(genres).forEach(genre => {
      if (
        genre.name !== "Movie" &&
        genre.name !== "TV Show" &&
        genre.name !== "Recently Added" &&
        genre.shows_with_genre_ids.length >= 6
      ) {
        showsPerRow[genre.name] = [];
        mainGenres.push(genre);
      }
    });

    shows.forEach(show => {
      if (mylistShowIds.includes(show.id)) {
        const myListIdx = mylistShowIds.indexOf(show.id);
        showsPerRow["My List"][myListIdx] = show;
      }

      mainGenres.forEach(genre => {
        if (show.genre_ids.includes(genre.id)) {
          showsPerRow[genre.name].push(show);
        }
      });
    });

    // remove any null values left in the My List row
    showsPerRow["My List"] = showsPerRow["My List"].filter(el => el !== null);

    return showsPerRow;
  }

  createUnorderedRows() {
    const { shows } = this.props;
    const showsPerRow = {};
    let currRow = [];
    let numRows = 0;

    for (let idx1 = 0; idx1 < shows.length; idx1++) {
      const currShow = shows[idx1];
      currRow.push(currShow);

      if (currRow.length >= 6) {
        showsPerRow[numRows] = currRow;
        currRow = [];
        numRows++;
      } else if (idx1 === shows.length - 1) {
        showsPerRow[numRows] = currRow;
      }
    }

    return showsPerRow;
  }

  render() {
    const { shows, videos, genres, galleryType, query, loading } = this.props;
    if (loading === true) return null;

    if (shows.length <= 0 && galleryType === "SEARCH") {
      return (
        <>
          <section className="show-gallery-index-wrapper no-results">
            <article className="no-results-content">
              <span>{`Your search for "${query}" did not have any matches.`}</span>
              <span>Suggestions:</span>
              <ul>
                <li>Try different keywords</li>
                <li>Looking for a movie or TV show?</li>
                <li>Try using a movie, TV show title, or a director</li>
                <li>Try a genre, like comedy, romance, or drama</li>
              </ul>
            </article>
          </section>
          <footer className="gallery-footer">
            <Footer />
          </footer>
        </>
      );
    }

    let showsPerRow = null,
      previewShow = null,
      showRowsList = [];
    if (shows.length > 0) {
      showsPerRow =
        galleryType === "WITH_BANNER"
          ? this.createRows()
          : this.createUnorderedRows();
      previewShow =
        galleryType === "WITH_BANNER" ? shows[this.state.previewId] : null;

      if (
        showsPerRow["My List"] !== undefined &&
        showsPerRow["My List"].length > 0
      ) {
        showRowsList.push(
          <ShowRows
            key={"row0"}
            rowNum={0}
            shows={showsPerRow["My List"]}
            genreName={"My List"}
            videos={videos}
            genres={genres}
            galleryType={galleryType}
          />
        );
      }

      const otherRows = Object.keys(showsPerRow).map((genreName, idx) => {
        if (genreName !== "My List") {
          return (
            <ShowRows
              key={"row" + (idx + 1)}
              rowNum={idx + 1}
              shows={showsPerRow[genreName]}
              genreName={genreName}
              videos={videos}
              genres={genres}
              galleryType={galleryType}
            />
          );
        } else {
          return null;
        }
      });
      showRowsList = showRowsList.concat(otherRows);
    }

    const galleryStyle = galleryType === "WITH_BANNER" ? null : { top: "12vh" };
    const marginStyle =
      galleryType === "MY_LIST" ? { paddingTop: "5vh" } : null;

    return (
      <section className="show-gallery-index-wrapper">
        {galleryType === "WITH_BANNER" && previewShow ? (
          <BannerVideo
            show={previewShow}
            // stopLoading={this.props.stopLoading}
          />
        ) : null}

        <section className="gallery-index-wrapper" style={galleryStyle}>
          {galleryType === "MY_LIST" ? (
            <h1 className="my-list-header">My List</h1>
          ) : null}

          <ul
            className="show-gallery-index"
            id="gallery-index-bg"
            style={marginStyle}
          >
            {showRowsList}
          </ul>

          <footer className="gallery-footer">
            <Footer />
          </footer>
        </section>
      </section>
    );
  }
}

export default ShowGallery;
