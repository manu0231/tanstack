import { useEffect, useState } from 'react'
import { useTimer } from './useTimer'

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

const SearchCocktail = () => {
  // Declare state
  const initialValues = { drink: '' }
  const [values, setValues] = useState(initialValues)
//   const [drink, setDrink] = useState('')
  const debouncedSearchTerm = useDebounce(initialValues.drink, 500)

  const handleChange = (event) => {
    setValues((prevValues) => ({
      ...prevValues,
      [event.target.name]: event.target.value,
    }))
  }

  //   console.log(values)
//   console.log(drink)
  return (
    <>
      <h1>Search Cocktail</h1>
      <input
        type="text"
        placeholder="Search Cocktail"
        name="drink"
        value={values.drink}
        onChange={handleChange}
      />

      {/* <input
        type="text"
        placeholder="Search Cocktail"
        name="drink"
        value={drink}
        onChange={(event) => setDrink(event.target.value)}
      /> */}
    </>
  )
}

export default SearchCocktail
