import Api from '../Services/AxiosServices';

const apiClient = {
    async get(url:any){
            return Api.get(url);
    },

    async post(url:any, body:any, contentType:string = 'application/json'){
        return Api.post(url,body,{
            headers:{
                'Content-Type': 'application/json'
            }
        })
    },

    async put(url:any, body:any, contentType:string = 'application/json'){
        return Api.put(url,body,{
            headers:{
                'Content-Type': contentType
            }
        })
    },

    async delete(url:any){
        return Api.delete(url)
    },

}

export default apiClient;