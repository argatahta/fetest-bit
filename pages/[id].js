import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import MoviesAPI from "../api/movies";

function ItemDetail({ title, value, className }) {
  return (
    <div className={`flex flex-row ${className}`}>
      <p className="font-bold text-gray-600 mr-2">{title}: </p>
      <p className="text-gray-600">{value ? value : "-"}</p>
    </div>
  )
}

export default function MovieDetail({ id }) {
  const router = useRouter();
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("")

  useEffect(() => {
    getMovie()
  }, []);

  const getMovie = async () => {
    setError("");
    setLoading(true);
    console.log({ id })
    try {
      const result = await MoviesAPI.getMovieDetail(id);
      if (result.data.Response !== "False") {
        const movieData = result.data ?? {}
        setData(movieData);
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
    <Layout className="bg-gray-200" >
      <div className="sm:px-4 flex flex-col mx-auto max-w-3xl">
        {loading ? (
          <p className="my-5 self-center">Loading...</p>
        ) : (
            <div className="flex flex-col bg-white min-h-screen">
              <div className="flex flex-row justify-around px-10 py-5 bg-gray-800">
                <div className="flex flex-col text-white max-w-lg">
                  <h1 className="text-4xl mb-1">{data.Title} <span className="whitespace-nowrap text-gray-400 text-xl"> ({data.Year})</span> </h1>
                  <div className="flex flex-row">
                    <p className="text-gray-400"> {data.Rated} | {data.Runtime} | {data.Country} | {data.Released} ({data.Country})</p>
                  </div>
                </div>
                <div className="flex flex-row self-center">
                  <svg className="w-12 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="yellow">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <div className="flex flex-col">
                    <p className="text-white text-4xl">{data.imdbRating}<span className="text-gray-500 text-base">/10</span></p>
                    <p className="text-gray-400">{data.imdbVotes}</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row p-5 bg-gray-100 border-b border-gray-300">
                <img className="flex h-auto w-96" src={data.Poster} />
                <div className="flex flex-col px-5">
                  <p className="mb-5">{data.Plot} </p>
                  <div className="flex flex-col">
                    <ItemDetail
                      title={"Director"}
                      value={data.Director}
                    />
                    <ItemDetail
                      title={"Writer"}
                      value={data.Writer}
                    />
                    <ItemDetail
                      title={"Stars"}
                      value={data.Actors}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col p-5">
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Production"}
                  value={data.Production}
                />
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Genre"}
                  value={data.Genre}
                />
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Language"}
                  value={data.Language}
                />
                <ItemDetail
                  className="border-b border-gray-200 py-2"
                  title={"Box Office"}
                  value={data.BoxOffice}
                />
              </div>

            </div>
          )}


      </div>

    </Layout>
  )
}

export async function getServerSideProps({ params }) {
  const id = params.id;
  return {
    props: { id }
  }
}
