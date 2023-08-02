import React from 'react'
import CreatePostComponent from '../createPostComponent/CreatePostComponent'
import Posts from '../postsComponent/PostsComponent'
import './CenterLane.css'

const CenterLane = () => {
  return (
    <div className="CenterLane">
        <CreatePostComponent/>
        <Posts/>
    </div>
  )
}

export default CenterLane