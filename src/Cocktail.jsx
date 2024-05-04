import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'
import styled from 'styled-components'

const BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php'

// Custom debounce hook
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

// Fetch cocktail data function
const fetchCocktails = async (searchTerm) => {
  const response = await axios.get(`${BASE_URL}?s=${searchTerm}`)
  return response.data.drinks || []
}

// Styled Components
const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Roboto', sans-serif;
`

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const CocktailList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
`

const CocktailItem = styled.li`
  background-color: #f5f5f5;
  border-radius: 4px;
  padding: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`

const CocktailImage = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
`

const CocktailName = styled.span`
  margin-top: 10px;
  font-weight: bold;
  text-align: center;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`

const PaginationButton = styled.button`
  padding: 8px 16px;
  margin: 0 5px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

const Cocktail = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const debouncedSearchTerm = useDebounce(searchTerm, 500)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const handleSearchTermChange = useCallback((value) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to the first page when search term changes
  }, [])

  // Fetch cocktail data using TanStack Query and Axios
  const { data, isLoading, isError } = useQuery({
    queryKey: ['cocktails', debouncedSearchTerm],
    queryFn: () => fetchCocktails(debouncedSearchTerm),
    enabled: !!debouncedSearchTerm.trim(),
    keepPreviousData: true,
  })

  const totalPages = Math.ceil((data?.length || 0) / itemsPerPage)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem)

  if (isLoading) {
    return <p>Loading...</p>
  }

  if (isError) {
    return <p>Error fetching cocktails.</p>
  }

  return (
    <Container>
      <Input
        type="text"
        placeholder="Search for cocktails..."
        value={searchTerm}
        onChange={(e) => handleSearchTermChange(e.target.value)}
      />

      {currentItems && currentItems.length > 0 ? (
        <>
          <p>{data?.length} cocktails found</p>
          <CocktailList>
            {currentItems.map((cocktail) => (
              <CocktailItem key={cocktail.idDrink}>
                <CocktailImage
                  src={cocktail.strDrinkThumb}
                  alt={cocktail.strDrink}
                />
                <CocktailName>{cocktail.strDrink}</CocktailName>
              </CocktailItem>
            ))}
          </CocktailList>
          <Pagination>
            <PaginationButton
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Previous
            </PaginationButton>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationButton
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
              >
                {index + 1}
              </PaginationButton>
            ))}
            <PaginationButton
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </PaginationButton>
          </Pagination>
        </>
      ) : searchTerm.trim() === '' ? (
        <p>Please enter a search term to find cocktails.</p>
      ) : (
        <p>No cocktails found</p>
      )}
    </Container>
  )
}

export default Cocktail
