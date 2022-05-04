<script>
    import {db} from "./firebase.js";
    import { query, collection, orderBy, addDoc } from "firebase/firestore";
    import {collectionData} from "rxfire/firestore";
    import {startWith} from "rxjs/operators";

    export let user;
    export let logout;

    let message = "";

    const queryRes = query(collection(db, "chats"), orderBy("sentAt"));
    const chats = collectionData(queryRes, "id").pipe(startWith([]));

    async function sendMessage(){
        try{
            const chatRef = await addDoc(collection(db, "chats"), {
                uid: user.uid,
                message: message,
                avatar: user.photoURL,
                sentAt: +new Date()
            });
            message = "";
            console.log("Chat Document written with ID: ", chatRef.id);
        } catch(e) {
            console.error("Error adding document: ", e);
        }
    }
</script>

<style>
    main {
        height: 100%;
    }

    /* Chat Header */
    .header {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0px 10px;
        border-bottom: 1px solid #ddd;
    }

    .header .logo{
        font-size: 15px;
        font-weight: 600;
        color: #111;
    }

    .header button {
        background: transparent;
        padding: 5px 10px;
        border: 1px solid #ddd;
        color: #555;
        font-size: 15px;
        cursor: pointer;
    }

    .form {
        display: flex;
        width: 100%;
        height: 40px;
        border-top: 1px solid #ddd;
    }

    .form input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        color: #111;
        padding: 10px;
    }

    .form button {
        padding: 10px;
        font-size: 20px;
        color: #555;
        background: transparent;
        outline: none;
        border: none;
        cursor: pointer;
    }

    .messages {
        width: 100%;
        height: calc(100% - 90px);
        padding: 10px;
        overflow-y: auto;
    }

    .messages::-webkit-scrollbar {
        width: 4px;
        background: #fff;
    }

    .message::-webkit-scrollbar-thumb{
        width: 4px;
        background: #888;
    }

    .messages .message {
        margin: 10px 0px; 
        display: flex;
    }

    .messages .my-message{
        justify-content: flex-end;
    }

    .messages .message .avatar {
        width: 30px;
        height: 30px;
        margin-right: 8px;
    }

    .messages .message .text {
        padding: 10px;
        background: #f0f4f7;
        color: #555;
        font-size: 13px;
        font-weight: 600;
        max-width: fit-content;
        flex: 1;
        border-radius: 5px;
    }

    .messages .message .avatar img{
        width: 100%;
        height: 100%;
    }

    .message .my-message .text{
        background: #555;
        color: #fff;
    }
</style>

<main>
    <div class="header">
        <div class="logo">Chatroom</div>
        <button on:click={logout}>Logout</button>
    </div>
    <div class="messages">
        {#each $chats as chat}
            {#if user.uid == chat.uid}
                <div class="message my-message">
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {:else}
                <div class="message other-message">
                    <div class="avatar">
                        <img src="{chat.avatar}" alt="">
                    </div>
                    <div class="text">
                        {chat.message}
                    </div>
                </div>
            {/if}
        {/each}
    </div>
    <div class="form">
        <input type="text" name="" bind:value={message} id="">
        <button on:click={sendMessage}>
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</main>