import { useQueryClient } from '@tanstack/react-query'

const Another = () => {
  const queryClient = useQueryClient()

  // Access the data from the cache
  const taskQueryData = queryClient.getQueryData(['tasks'])

  // Render the data
  return (
    <div>
      {taskQueryData.map((item) => (
        <div
          key={item.id}
          style={{ textDecoration: item.isDone ? 'line-through' : 'none' }}
        >
          {item.title}
        </div>
      ))}
    </div>
  )
}

export default Another
