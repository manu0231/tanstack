import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const fetchData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/tasks')
    return response.data.taskList
  } catch (error) {
    throw new Error('Failed to fetch tasks')
  }
}

const ReactQuery = () => {
  const taskQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: () => fetchData(),
  })

  if (taskQuery.isLoading) {
    return <div>Loading</div>
  }

  if (taskQuery.isError) {
    return <div>Error: {taskQuery.error.message}</div>
  }

  const handleCheckboxChange = (taskId) => {
    // No need to update the state or make any API call here.
    // We are only toggling the strike-through style based on the checkbox state.
    // The state will be managed by the UI only.
  }

  return (
    <div>
      {taskQuery.data.map((item) => (
        <div
          key={item.id}
          style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
        >
          <input
            type="checkbox"
            checked={item.isDone}
            onChange={() => handleCheckboxChange(item.id)}
          />
          {item.title}
        </div>
      ))}
    </div>
  )
}

export default ReactQuery
