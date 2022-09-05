import { DocumentData } from 'firebase/firestore'
import { useState } from 'react'
import { Movie } from '../../typings'

export const useList = (movie: Movie | DocumentData | null) => {
    const [list, setList] = useState<Movie[] | DocumentData[] | null>([]);

    
  return list
}
