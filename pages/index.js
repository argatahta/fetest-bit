
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import ImageModal from "../components/ImageModal"
import SearchInput from "../components/SearchInput";
import MovieCard from "../components/MovieCard";
import Layout from "../components/Layout";
import Header from "../components/Header";
import MoviesAPI from "../api/movies";

import { saveMovies, saveSearch, clearMovie } from "../redux/actions/movies"

export default function Home() {

  const router = useRouter();
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const search = useSelector(state => state.movies.search);
  const movies = useSelector(state => state.movies.data);
  const page = useSelector(state => state.movies.page);
  const totalResult = useSelector(state => state.movies.totalResult)

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name == "search") {
      dispatch(saveSearch(value))
    };
  }

  const handleScroll = () => {
    const scrollTop = document?.documentElement?.scrollTop ?? document.body.scrollTop

    const scrollHeight = document?.documentElement?.scrollHeight ?? document.body.scrollHeight

    if (scrollTop + window.innerHeight + 10 >= scrollHeight) {
      setLoadMore(true);
    }
  }

  useEffect(() => {
    setLoadMore(false);
    //get data
    const moviesCurrentTotal = movies.length
    if (moviesCurrentTotal > 0 && moviesCurrentTotal < totalResult && !loading) {
      getMovies()
    }
  }, [loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getMovies = async (isSearch) => {
    setError("");
    setLoading(true)
    try {
      const pages = isSearch ? 1 : parseInt(page) + 1
      const result = await MoviesAPI.getMovies({ filter: search, page: pages });
      if (result.data.Response !== "False") {
        const datas = result.data?.Search ?? []
        const updatedData = isSearch ? datas : movies.concat(datas)
        const totalResults = result.data?.totalResults
        dispatch(saveMovies({ data: updatedData, totalResult: totalResults, page: pages }))
      } else {
        console.log(result.data.Error)
        setError(result.data.Error)
      }
      setLoading(false);
    } catch (error) {
      setError(error ?? "Error");
      setLoading(false);
    }
  }

  return (
    <Layout>
      <ImageModal
        open={isModalOpen}
        imageUrl={imageUrl}
        onCloseModal={() => setIsModalOpen(false)}
      />
      <Header>
        <div className="flex flex-row">
          <SearchInput
            id="search"
            name="search"
            placeholder="Search movie"
            value={search}
            onSearchClick={(e) => {
              e && e.preventDefault()
              if(search) {
                dispatch(clearMovie())
                getMovies(true)
              }
            }}
            onChange={onChange}
          />
        </div>
      </Header>

      <div className="px-4 flex flex-col mx-auto max-w-3xl pt-20">
        {movies.length > 0 && (
          movies.map((data) => (
            <MovieCard
              imageUrl={data.Poster}
              title={data.Title}
              years={data.Year}
              onMovieClick={() => router.push(`/${data.imdbID}`)}
              onImageClick={(image) => {
                setImageUrl(image)
                setIsModalOpen(true)
              }}
            />
          ))
        )}

        {movies.length == 0 && !loading && !error && (
          <p className="my-5 text-lg">Please search for a movie</p>
        )}

        {loading && (
          <p className="my-5 self-center">Loading...</p>
        )}

        {error && (
          <p className="my-5 self-center text-red-600">{error}</p>
        )}      
        </div>

    </Layout>
  )
}
