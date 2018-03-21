<template>
    <section>
        <meta-promised :promise="promise">
            <template slot="pending">
                请求中
            </template>
            <template slot-scope="scope" slot="then">
                <div>{{scope.msg}}</div>
            </template>
            <template slot-scope="scope" slot="catch">
                <div style="color:red;">{{scope.err}}</div>
            </template>
        </meta-promised>

    </section>
</template>

<script>
export default{
    data(){
        let promise = new Promise((resolve,reject)=>{
            setTimeout(()=>{
                if(Math.random()>0.5){
                    resolve({msg:"123成功"})
                }else{
                    reject({err:"456失败"})
                }

            },3000)
        });


        return {
            promise
        }
    },
    created(){
        setTimeout(()=>{
            this.promise = new Promise((resolve,reject)=>{
                if(Math.random()>0.5){
                    resolve({msg:"abc成功"})
                }else{
                    reject({err:"def失败"})
                }
            });
        },2000);

    }
}
</script>