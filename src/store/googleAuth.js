   
// set provider
var provider = new firebase.auth.GoogleAuthProvider();

export default {
    state: {

    },
    actions: {
        authPop({ commit }) {
            firebase.auth().signInWithPopup(provider).then(function(result) {
                // 可以獲得 Google 提供 token，token可透過 Google API 獲得其他數據。  
                let user = result.user;
                return user;
            }).then((user) => {

                // 登記資料
                const {displayName : userName,  uid: userID  } = user;
                commit('USER', {userName, userID});
                localStorage.setItem('user', JSON.stringify({userName, userID}));

                // 驗證帳戶姓名
                var IDRef = firebase.database().ref("/identity/");

                IDRef.child(userName).once("value").then(function(snapshot) {    
                    // 取得使用者工作清單
                    var userRef = firebase.database().ref(`${userID}`);
                    if( !snapshot.val() ) {
                        // 若為新用戶
                        // 登記資料
                        IDRef.child(userName).set({
                            "name"   : userName,
                            "userID" : userID
                        }).catch((error) => error);
                        // 新建工作清單
                        var date = new Date();
                        var timeStamp = date.getTime();
                        userRef.push({
                            timeStamp,
                            work: "歡迎使用 Tomado",
                            isComplete: false
                        })
                        console.log("hello new User")
                    }
                })   
            }).catch(function(err) {
                    return err;
                })
        },
        // getCurrentUser({ commit }) {  
        //     const user = firebase.auth().currentUser;
        //     if(user) {
        //         const {displayName : userName,  uid: userID  } = user;
        //         commit('USER', {userName, userID})
        //         sessionStorage.setItem('user', JSON.stringify({userName, userID}));
        //     }else {
        //         console.log('未登入')
        //         return "";
        //     }    
        // },
    },
    mutations: {

    },
    getters: {

    }
}