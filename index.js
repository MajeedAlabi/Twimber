import { tweetsData } from "./data.js";
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

//LISTENING TO CLICKS ON THE PAGE
document.addEventListener("click", function(e){
    if(e.target.dataset.like){
        handleLikeBtn(e.target.dataset.like)
    }
    else if(e.target.dataset.retweet){
        handleRetweetBtn(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyBtn(e.target.dataset.reply)
    }
    else if(e.target.id === "tweet-btn"){
        tweetInputBtn()
    }
})

//CONTROLLING LIKE BUTTON
function handleLikeBtn(tweetId){
    const targetObject = tweetsData.filter(function(tweet){
        return tweetId === tweet.uuid
    })[0]

    if(targetObject.isLiked){
        targetObject.likes--
    }else{
        targetObject.likes++
    }
    targetObject.isLiked = !targetObject.isLiked
    render()
}

//CONTROLLING RETWEET BUTTON
function handleRetweetBtn(tweetId){
    const targetObject = tweetsData.filter(function(tweet){
        return tweetId === tweet.uuid
    })[0]

    if(targetObject.isRetweeted){
        targetObject.retweets--
    }else{
        targetObject.retweets++
    }
    targetObject.isRetweeted = !targetObject.isRetweeted
    render()
}

//CONTROLLING REPLY BUTTON
function handleReplyBtn(tweetId){
    document.getElementById(`replies-${tweetId}`).classList.toggle("hidden")
}

//CONTROLLING TWEET BUTTON
function tweetInputBtn(){
    const tweetInput = document.getElementById("tweet-input")

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Scrimba`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4()
        })
    render()
    tweetInput.value = ''
    }
}

//GETTING FEED HTML
function getFeedHtml() {
    let feedHtml = ""

    tweetsData.forEach(function (tweet){
        let likedClass = ""

        if(tweet.isLiked){
            likedClass = "liked"
        }

        let retweetClass = ""

        if(tweet.isRetweeted){
            retweetClass = "retweeted"
        }

        let repliesHtml = ""

        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=`
                <div class="tweet-reply">
                    <div class="tweet-inner">
                        <img src="${reply.profilePic}" class="profile-pic">
                        <div>
                            <p class="handle">${reply.handle}</p>
                            <p class="tweet-text">${reply.tweetText}</p>
                        </div>
                    </div>
                </div>`
            })
        }


        feedHtml += `
        <div class="tweet">
            <div class="tweet-inner">
                <img src="${tweet.profilePic}" class="profile-pic">
                <div>
                    <p class="handle">${tweet.handle}</p>
                    <p class="tweet-text">${tweet.tweetText}</p>
                    <div class="tweet-details">
                        <span class="tweet-detail">
                            <i class="fa-regular fa-comment-dots"
                            data-reply="${tweet.uuid}"></i>
                            ${tweet.replies.length}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-heart ${likedClass}"
                            data-like = "${tweet.uuid}"
                            ></i>
                            ${tweet.likes}
                        </span>
                        <span class="tweet-detail">
                            <i class="fa-solid fa-retweet ${retweetClass}"
                            data-retweet = "${tweet.uuid}"
                            ></i>
                            ${tweet.retweets}
                        </span>
                    </div>   
                </div>            
            </div>
            <div class="hidden" id="replies-${tweet.uuid}">
                ${repliesHtml}
            </div>   
        </div>`
    })
    return feedHtml
}

//RENDER THE HTML
function render() {
    document.getElementById("feed").innerHTML = getFeedHtml()
}

render()






















 