import type { ActionFunction } from 'remix'
import { Link, redirect } from 'remix'
export const action: ActionFunction = ({ request }) => {
    console.log('submtting the form')
    return redirect('/posts')
}

function NewPost() {
    return (
        <div>
            <Link to="/posts">Back</Link>
            this is a new post page
        </div>
    )
}

export default NewPost
