const initState ={
    posts:[],
    users:[],
    token: localStorage.getItem('token')?localStorage.getItem('token'):'',
    username: localStorage.getItem('username')?localStorage.getItem('username'):'',
  }

  
const Reducer = (state = initState, action) => {
    switch (action.type) {
        case 'USERS':
            return {...state,users:[...state.users,...action.users]}
        case 'POSTS':
            return {...state,posts:[...action.posts,...state.posts]}
        case 'USERNAME':
            return {...state,username:action.username}
        case 'TOKEN':
            return {...state,token:action.token}
        case 'CLEAR':
            return {...state,token:'',username:''}
        case 'DELETE':
            const posts = state.posts.filter((post)=>post.id!==action.id)
            return {...state,posts:posts}
        case 'EDIT':
            let Posts = state.posts;
            let objIndex = Posts.findIndex((obj => obj.id == action.id));
            Posts[objIndex]['body'] = action.body;
            return {...state,posts:Posts}
        default:
            return state
    }
}
  
export default Reducer