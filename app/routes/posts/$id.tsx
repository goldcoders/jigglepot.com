import { useParams } from 'remix'
function Post() {
    const params = useParams()
    return (
        <div>
            <h1>Post with ID: {params.id}</h1>
        </div>
    )
}

export default Post
