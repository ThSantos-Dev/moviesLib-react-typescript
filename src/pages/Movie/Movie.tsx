// Styles
import styles from './Movie.module.css'

// Hooks
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

// Icons
import { 
  BsGraphUp,
  BsWallet2,
  BsHourglassSplit,
  BsFillFileEarmarkTextFill
} from 'react-icons/bs'

// Components
import MovieCard from '../../components/MovieCard/MovieCard'
import MovieInfo, { EAditionalClass } from '../../components/MovieInfo/MovieInfo';

// Redux
import { getMovie } from './../../slices/movieSlice';


const Movie = () => {
  // Resgatando o id do filme da URL
  const {id} = useParams<string>()

  // Resgatando os states do reducer
  const {movie, loading, error} = useSelector((state: any) => state.movie)

  // Instanciando o dispatch para poder utilizar as funções do reducer
  const dispatch: any = useDispatch()

  // Carregando dados do filme 
  useEffect(() => {
    // Validação para verificar se o id está vazio
    if(!id) return

    // Disparando a função do reducer para buscar detalhes de um filme com base no ID
    dispatch(getMovie(id))
  }, [id])

  // Função responsável por formatar o valor do orçamento e lucro para uma moeda - no caso $ dólar americano
  const formatCurrency = (number: number): string => {
    if(!number) return ""

    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD"
    })
  }

  if(loading) {
    return <p>Carregando...</p>
  }


  return (
    <div className={styles.movie_page}>
      {movie && (
        <>
          <MovieCard movie={movie} showLink={false} moviePage={true}/>
          <p className="tagline">{movie.tagline}</p>

          <MovieInfo title='Orçamento:' icon={<BsWallet2 />} info={formatCurrency(movie.budget)}/>
          <MovieInfo title="Receita:" icon={<BsGraphUp />} info={formatCurrency(movie.revenue)}/>
          <MovieInfo title="Duração:" icon={<BsHourglassSplit />} info={`${movie.runtime} minutos`} />
          <MovieInfo title="Descrição:" icon={<BsFillFileEarmarkTextFill />} info={movie.overview} aditionalClass={EAditionalClass.DESCRIPTION} />

        </>
      ) }
    </div>
  )
}

export default Movie