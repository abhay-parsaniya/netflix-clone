import React from 'react'
import { useRecoilValue } from 'recoil'
import { movieListState } from '../../atoms/modalAtom'
import Row from '../../components/Row'

const MyList = () => {
    const movie_ListState = useRecoilValue(movieListState)
  return (
    <div>
        <Row title="My List" movies={movie_ListState}/>
    </div>
  )
}

export default MyList