import service from '@/axios'

export function login(username, password, emailcode){
    return service.post("/admin/login", {
        username,
        password,
        emailcode,
    })
}

export function getUserInfo(){
    return service.post("/admin/userInfo")
}

export function sendEmailcode(username, password){
    return service.post("/admin/sendemailcode",{
        username,
        password,
    })
}

export function getAbout(){
    return service.get("/api/about")
}