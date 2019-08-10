<template>
    <div>
        <div class="container text-center">
            <h1>Firebase Auth Test</h1>
            <div class="row justify-content-center mt-5">
                <div class="col-4">
                    <button type="button" class="btn btn-primary" @click="authPop">使用google註冊(Popup)</button>
                </div>
                <div class="col-4">
                    <button type="button" class="btn btn-primary" @click="">disabled</button>
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <div class="col-4">
                    <button type="button" class="btn btn-primary" @click="getCurrentUser">查詢當前使用者</button>
                </div>
                <div class="col-4">
                    <button type="button" class="btn btn-danger" @click="signOut">登出</button>
                </div>
            </div>
            <div class="row justify-content-center mt-5">
                <div class="col-4">
                    <button type="button" class="btn btn-primary" @click="toIndex">前往首頁</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    
export default {
    data() {
        return {

        }
    },
    methods: {
        authPop() {
            this.$store.dispatch('authPop');
        },
        getCurrentUser() {  
            this.$store.dispatch('getCurrentUser')
        },
        signOut() {
            firebase.auth().signOut().then(function() {
                // Sign-out successful.
                sessionStorage.clear();
                console.log("User signOut")
            }).catch(function(error) {
                // An error happened.
                return error;
            });
        },
        toIndex() {
            this.$router.push("/index")
        }
    },
}
</script>