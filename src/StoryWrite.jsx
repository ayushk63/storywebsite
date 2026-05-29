import React from "react";
import axios from 'axios';
import { useCookies } from "react-cookie";
import storywriting2 from './Images/storywriting2.webp';

function StoryWrite() {
    let [cookies] = useCookies(['username']);
    
    let [title, setTitle] = React.useState("");
    let [author, setAuthor] = React.useState("");
    let [story, setStory] = React.useState("");
    let [genre, setGenre] = React.useState("");

    React.useEffect(() => {
        setAuthor(cookies['username']);
    }, [cookies]);

    const publishStory = async () => {
        try {
            const response = await axios.post("https://storywebsite-r3kv.onrender.com/story/publish", {
                title,
                author,
                genre,
                story
            });

            console.log("Successfully published story");

            Navigate("/profile");
        } catch(error) {
            console.log(error);
        }
    }

    return (
        <div className="StoryWrite">
            <div id = 'theStoryDiv'>
                <div id = 'writeStoryDiv'>
                    <h3>Write Your Story</h3>
                    <form id = 'storyForm'>
                        <label className="label">Title</label><br />
                        <input type = 'text' placeholder="Write Story Title...." id = 'titleInput'
                        onChange={(e) => setTitle(e.target.value)} className="input" /><br /><br />
                        <label className = 'label'>Genre</label><br />
                        <input type = 'text' placeholder="Write Genre...." id = 'genreInput'
                        onChange={(e) => setGenre(e.target.value)} className="input" /><br /><br />
                        <label className="label">Story</label><br />
                        <textarea rows={8} cols={40} placeholder="Write Your Story Here...." id = 'storyInput'
                        onChange={(e) => setStory(e.target.value)} /><br /><br />
                        <button id = 'publishButton' onClick={publishStory}>Publish</button>
                    </form>
                </div>
                <div id = 'storyDiv2'>
                    <div id = 'enjoyWriting'>Enjoy Writing!</div>
                    <img src = { storywriting2 } id = 'storyWritingImage2' />
                </div>
            </div>
        </div>
    );
}

export default StoryWrite;