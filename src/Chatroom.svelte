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