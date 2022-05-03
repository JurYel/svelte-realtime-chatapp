<script>
    import {db} from "./firebase";
    import {collectionData} from "rxfire/firestore";
    import {startWith} from "rxjs/operators";

    export let user;
    export let logout;

    let message = "";

    const query = db.collection("chats").orderBy("sentAt");
    const chats = collectionData(query, "id").pipe(startWith([]));

    function sendMessage(){
        db.collection("chats").add({
            uid: user.uid,
            message: message,
            avatar: user.photoURL,
            sentAt: +new Date()
        });
        message = "";
    }
</script>

<style>

</style>

<main>
    <div class="header">
        <div class="logo">Chatroom</div>
        <button on:click={logout}>Logout</button>
    </div>
    <div class="messages"></div>
    <div class="form">
        <input type="tel" name="" bind:value={message} id="">
        <button on:click={sendMessage}>
            <i class="fa fa-paper-plane"></i>
        </button>
    </div>
</main>