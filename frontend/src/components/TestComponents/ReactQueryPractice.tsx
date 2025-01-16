import { useMutation, useQuery, QueryClient } from "@tanstack/react-query";

const POSTS = [
  {id: 1, title: "Hello World"},
  {id: 2, title: "Hello World 2"},
]

const ReactQueryPractice = () => {
  const queryClient = new QueryClient();
  console.log(POSTS)

  const postsQuery = useQuery({
    queryKey: ["endpoint"],
    queryFn: async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return POSTS;
    }
  });
  
  const newPostMutation = useMutation({
    mutationFn: async (title:string) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      POSTS.push({id: POSTS.length + 1, title});
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["endpoint"] });
    }
  })
  return (
    <div>
      {postsQuery.data?.map(post => (
        <div key={post.id}>{post.id} {post.title} </div>
      ))}
      <button onClick={() => newPostMutation.mutate("New Post")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        add post
      </button>
    </div>
  )
}
export default ReactQueryPractice