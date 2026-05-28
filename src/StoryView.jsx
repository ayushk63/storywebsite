import React from "react";
import axios from "axios";
import Navbar from './Navbar.jsx';
import historicalfiction from './Images/historicalfiction.jpg';
import action from './Images/action.jpeg';
import horror from './Images/ghost.jpg';
import mystery from './Images/mystery.jpg';

function StoryView() {
    let [title, setTitle] = React.useState("");
    let [author, setAuthor] = React.useState("");
    let [genre, setGenre] = React.useState("");
    let [story, setStory] = React.useState("");
    let [storyTitle, setStoryTitle] = React.useState("");
    let [numLikes, setNumLikes] = React.useState("");
    let [newComment, setNewComment] = React.useState("");
    let [comments, setComments] = React.useState([]);
    let [stories, setStories] = React.useState([]);
    let [selectedStory, setSelectedStory] = React.useState(null);
    
    const viewComments = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/story/viewcomments",
                {
                    params: { title }
                }
            );

            setComments(response.data.data.comments);
        } catch (error) {
            console.log(error);
        }
    }

    const viewStory = async () => {
        try {
            const response = await axios.get(
                "http://localhost:3000/story/findstorybytitle",
                {
                    params: { title }
                }
            );

            setAuthor("Author: " + response.data.data.story.author);
            setGenre("Genre: " + response.data.data.story.genre);
            setStory("Story: " + response.data.data.story.story);
            setStoryTitle("Title: " + response.data.data.story.title);
            setNumLikes("Likes: " + response.data.data.story.numLikes);

            let likeButton = document.getElementById('likeButton');
            let commentDiv = document.getElementById('commentDiv');
            let viewStoryDiv = document.getElementById('storyViewDiv');
            likeButton.style.display = 'block';
            commentDiv.style.display = 'block';
            viewStoryDiv.style.display = 'block';

            viewComments();
        } catch(error) {
            console.log(error);
        }
    }

    const likeStory = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/story/likestory",
                {
                    title
                }
            );

            await viewStory();
        } catch (error) {
            console.log(error);
        }
    }

    const postComment = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/story/postcomment",
                {
                    title,
                    comment: newComment
                }
            );

            viewComments();
        } catch (error) {
            console.log(error);
        }
    }

    const viewStoriesByGenre = async (viewGenre) => {
        try {
            const response = await axios.get(
                "http://localhost:3000/story/findstoriesbygenre",
                {
                    params: { genre: viewGenre }
                }
            );

            setStories(response.data.data.stories);
        } catch (error) {
            console.log(error);
        }
    }

    const showGenreStory = async (genreStoryTitle) => {
        try {
            const response = await axios.get(
                "http://localhost:3000/story/findstorybytitle",
                {
                    params: { title: genreStoryTitle }
                }
            );

            setTitle(genreStoryTitle);
            setSelectedStory(response.data.data.story);

            let likeButton2 = document.getElementById('likeButton2');
            likeButton2.style.display = 'block';

            viewComments();
        } catch (error) {
            console.log(error);
        }
    }

    const likeStory2 = async () => {
        try {
            const response = await axios.post(
                "http://localhost:3000/story/likestory",
                {
                    title
                }
            );

            await showGenreStory(title);
        } catch (error) {
            console.log(error);
        }
    }


    /*React.useEffect(() => {
        viewComments();
    }, [comments]);*/

    return (
        <div className="StoryView">
            <Navbar />
            <div id = 'searchDiv'>
                <label className = 'label'>Title</label><br />
                <input type = 'text' className="input" placeholder = 'Enter story title....' 
                id = 'viewTitleInput' onChange={(e) => setTitle(e.target.value)} /><br /><br />
                <button id = 'searchButton' onClick={viewStory}>SEARCH</button>
            </div>
                <br /><br />
            <div id = 'storyViewDiv' style={{ display: 'none' }}>
                <div>{storyTitle}</div>
                <div>{author}</div>
                <div>{genre}</div>
                <div>{story}</div>
                <div>{numLikes}</div>
            </div>
            <br />
            <button id = 'likeButton' onClick={likeStory} style = {{ 
                display: 'none',
                marginLeft: 512
             }}>LIKE</button><br />
            <div id = 'commentDiv' style = {{ display: "none" }}>
                <div>Write a comment</div><br />
                <input type = 'text' placeholder="Write a comment...." id = 'commentInput'
                onChange={(e) => setNewComment(e.target.value)} /><br /><br />
                <button id = 'commentButton' onClick={postComment}>POST COMMENT</button><br /><br />
                <div id = 'commentHeading'>Comments</div>
                <div>{comments.map((comment) => (
                    <div className="commentDiv2">{comment}</div>
                ))}</div><br /><br />
            </div>
            <div id = 'genreDiv'>
                <div id = 'genreHeading'>Genres</div>
                <div id = 'genreRow'>
                    <div className = 'genreCard'>
                        <div className="genreLabel">Horror</div>
                        <img src = {horror} className="genreImage" /><br />
                        <button className = 'genreButton' onClick = {() => viewStoriesByGenre("horror")}>SEARCH HORROR</button>
                    </div>
                    <div className = 'genreCard'>
                        <div className="genreLabel">Action</div>
                        <img src = {action} className="genreImage" /><br />
                        <button className="genreButton" onClick={() => viewStoriesByGenre("action")}>SEARCH ACTION</button>
                    </div>
                    <div className = 'genreCard'>
                        <div className = 'genreLabel'>Historical Fiction</div>
                        <img src = {historicalfiction} className="genreImage" /><br />
                        <button className="genreButton" onClick={() => viewStoriesByGenre("historicalfiction")}>SEARCH HISTORICAL FICTION</button>
                    </div>
                    <div className = 'genreCard'>
                        <div className="genreLabel">Mystery</div>
                        <img src = {mystery} className="genreImage" /><br />
                        <button className="genreButton" onClick={() => viewStoriesByGenre("mystery")}>SEARCH MYSTERY</button>
                    </div>
                </div>
            </div>
            <div id = 'genreResultDiv'>
                {stories.map((story) => (
                    <div className = 'genreStoryDiv'>
                        <div className = 'genreStoryTitle'>{story.title}</div>
                        <button className = 'genreStoryButton'
                        onClick = {() => showGenreStory(story.title)}>READ</button>
                        {selectedStory && selectedStory.title === story.title && (
                            <div className = 'genreStory'>
                                <div>Title: {selectedStory.title}</div>
                                <div>Author: {selectedStory.author}</div>
                                <div>Story: {selectedStory.story}</div>
                                <div>Likes: {selectedStory.numLikes}</div><br />
                                <button id = 'likeButton2' onClick={likeStory2} style = {{ 
                                    display: 'none',
                                    marginLeft: 512
                                }}>LIKE</button><br />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default StoryView;